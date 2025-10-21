import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const resendApiKey = process.env.RESEND_API_KEY;
const adminRecipients = process.env.INFLUENCER_ADMIN_EMAILS;
const fromEmail = process.env.INFLUENCER_FROM_EMAIL ?? process.env.RESEND_DEFAULT_FROM ?? "SAPSAP <partners@sapsap.com>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const applicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  socialHandle: z.string().min(2),
  platform: z.enum(["instagram", "tiktok", "youtube", "other"]),
  niche: z.string().min(2),
  followerRange: z.enum(["10k-50k", "50k-100k", "100k-500k", "500k+"]),
  message: z.string().min(10).max(500),
});

const formatHtml = (payload: z.infer<typeof applicationSchema>) => {
  const fields = [
    ["Full name", payload.fullName],
    ["Email", payload.email],
    ["Social handle", payload.socialHandle],
    ["Primary platform", payload.platform],
    ["Niche", payload.niche],
    ["Follower range", payload.followerRange],
    ["Message", payload.message],
  ] as const;

  return `
    <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; color: #0f172a;">
      <h1 style="font-size: 20px; margin-bottom: 12px;">New Influencer Application</h1>
      <p style="margin-bottom: 24px;">A creator just applied to the SAPSAP Influencer Partnership Program.</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tbody>
          ${fields
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600;">${label}</td>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0;">${String(value).replace(/\n/g, "<br/>")}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin-top: 24px; font-size: 13px; color: #475569;">You can reply directly to this email to reach the creator.</p>
    </div>
  `;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "*";

  if (
    allowedOrigin === "*" ||
    (origin && allowedOrigin.split(",").map((value) => value.trim()).includes(origin))
  ) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin === "*" ? "*" : origin ?? "");
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!resend || !adminRecipients) {
    return res.status(500).json({ message: "Influencer application pipeline is not configured" });
  }

  const rawBody = typeof req.body === "string" ? (() => {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return null;
    }
  })() : req.body;

  if (!rawBody || typeof rawBody !== "object") {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const parsed = applicationSchema.safeParse(rawBody);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid payload" });
  }

  const payload = parsed.data;

  try {
    const adminEmails = adminRecipients
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (!adminEmails.length) {
      throw new Error("No admin recipients configured");
    }

    await resend.emails.send({
      from: fromEmail,
      to: adminEmails,
      subject: `New influencer application — ${payload.fullName}`,
      replyTo: payload.email,
      html: formatHtml(payload),
    });

    await resend.emails.send({
      to: payload.email,
      from: fromEmail,
      subject: 'We received your SAPSAP creator application',
      html: `
        <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px;">
          <h1 style="font-size: 20px; margin-bottom: 16px;">Thanks for applying, ${payload.fullName.split(' ')[0] ?? 'creator'}!</h1>
          <p style="margin-bottom: 16px;">Our partnerships team is reviewing your story idea and will reach out within 3 business days.</p>
          <p style="margin-bottom: 16px;">We\'ll also share promotional assets once we confirm your slot.</p>
          <p style="margin-bottom: 24px;">Talk soon,<br/>The SAPSAP Partnerships Team</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return res.status(500).json({ message });
  }
}
