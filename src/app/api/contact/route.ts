import { NextResponse } from "next/server";
import {
  escapeHtml,
  type ContactPayload,
  type ContactResponse,
  validateContactPayload,
} from "@/lib/contact";
import { clientIp, contactRateLimited } from "@/lib/contactRateLimit";

export const runtime = "nodejs";

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

const DEFAULT_SENDER = "hello@natanpaval.dev";
const DEFAULT_RECIPIENT = "npaval75@gmail.com";

function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function POST(request: Request) {
  if (contactRateLimited(clientIp(request))) {
    return json({ ok: false, code: "failed" }, 429);
  }

  let body: ContactPayload;
  try {
    const parsed = (await request.json()) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return json({ ok: false, code: "invalid" }, 400);
    }
    body = parsed as ContactPayload;
  } catch {
    return json({ ok: false, code: "invalid" }, 400);
  }

  if (body.company?.trim()) {
    return json({ ok: false, code: "failed" }, 400);
  }

  const errors = validateContactPayload(body);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "invalid", errors }, 400);
  }

  if (!emailConfigured()) {
    return json({ ok: false, code: "offline" }, 503);
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const inquiryType = body.inquiryType.trim();
  const message = body.message.trim();
  const recipient = process.env.CONTACT_EMAIL?.trim() || DEFAULT_RECIPIENT;
  const sender = process.env.SENDER_EMAIL?.trim() || DEFAULT_SENDER;
  const apiKey = process.env.RESEND_API_KEY!.trim();

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeType = escapeHtml(inquiryType);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Inquiry: ${inquiryType}`,
    "",
    message,
  ].join("\n");

  const html = `
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Inquiry:</strong> ${safeType}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `[Portfolio] ${inquiryType} — ${name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      return json({ ok: false, code: "failed" }, 502);
    }

    return json({ ok: true }, 200);
  } catch {
    return json({ ok: false, code: "failed" }, 502);
  }
}
