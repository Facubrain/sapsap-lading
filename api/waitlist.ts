import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;
const adminRecipients = process.env.WAITLIST_ADMIN_EMAILS;
const fromEmail = process.env.WAITLIST_FROM_EMAIL ?? process.env.RESEND_DEFAULT_FROM ?? "SAPSAP <waitlist@sapsap.com>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "*";

  if (allowedOrigin === "*" || (origin && allowedOrigin.split(",").map((value) => value.trim()).includes(origin))) {
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

  if (!resend || !audienceId) {
    return res.status(500).json({ message: "Resend no está configurado" });
  }

  const { email } = (req.body ?? {}) as { email?: string };

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Ingresa un correo válido" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const result = await resend.contacts.create({
      email: normalizedEmail,
      audienceId,
    });

    let isDuplicate = false;
    if (result.error) {
      if (result.error.message?.includes("already exists")) {
        isDuplicate = true;
      } else {
        throw new Error(result.error.message);
      }
    }

    // Enviar correo de notificación a los administradores si está configurado
    if (adminRecipients) {
      const adminEmails = adminRecipients
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean);

      if (adminEmails.length > 0) {
        const timestamp = new Date().toLocaleString('es-ES', {
          timeZone: 'America/Mexico_City',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        const formatHtml = (email: string, isDuplicate: boolean) => `
          <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; color: #0f172a;">
            <h1 style="font-size: 20px; margin-bottom: 12px;">${isDuplicate ? 'Reintento de registro' : 'Nuevo registro'} en la lista de espera</h1>
            <p style="margin-bottom: 24px;">Un usuario se ha ${isDuplicate ? 'vuelto a registrar' : 'registrado'} en la lista de espera de SAPSAP.</p>
            <table style="border-collapse: collapse; width: 100%;">
              <tbody>
                <tr>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600;">Email</td>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600;">Fecha de registro</td>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0;">${timestamp}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600;">Estado</td>
                  <td style="padding: 12px 16px; border: 1px solid #e2e8f0;">${isDuplicate ? 'Ya existía en la lista' : 'Nuevo registro'}</td>
                </tr>
              </tbody>
            </table>
            <p style="margin-top: 24px; font-size: 13px; color: #475569;">Este usuario está esperando acceso prioritario a SAPSAP.</p>
          </div>
        `;

        await resend.emails.send({
          from: fromEmail,
          to: adminEmails,
          subject: `${isDuplicate ? 'Reintento de registro' : 'Nuevo registro'} en waitlist — ${normalizedEmail}`,
          html: formatHtml(normalizedEmail, isDuplicate),
        });
      }
    }

    return res.status(200).json({ ok: true, duplicate: isDuplicate });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error inesperado";
    if (message.toLowerCase().includes("already")) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    return res.status(500).json({ message });
  }
}
