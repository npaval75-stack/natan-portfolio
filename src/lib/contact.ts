export const INQUIRY_TYPES = [
  "Project Inquiry",
  "Job Opportunity",
  "Collaboration",
  "General Inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  company?: string;
};

export type ContactFieldErrors = {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
};

export type ContactResponse =
  | { ok: true }
  | { ok: false; code: "offline" | "invalid" | "failed"; errors?: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isInquiryType(value: string): value is InquiryType {
  return (INQUIRY_TYPES as readonly string[]).includes(value);
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function validateContactPayload(input: ContactPayload): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 120) errors.name = "Name is too long.";

  if (!email) errors.email = "Enter a valid email.";
  else if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = "Enter a valid email.";

  if (!isInquiryType(input.inquiryType)) errors.inquiryType = "Select an inquiry type.";

  if (!message) errors.message = "Enter a message.";
  else if (message.length < 8) errors.message = "Message is too short.";
  else if (message.length > 5000) errors.message = "Message is too long.";

  return errors;
}
