import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;

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

    if (result.error) {
      if (result.error.message?.includes("already exists")) {
        return res.status(200).json({ ok: true, duplicate: true });
      }

      throw new Error(result.error.message);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error inesperado";
    if (message.toLowerCase().includes("already")) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    return res.status(500).json({ message });
  }
}
