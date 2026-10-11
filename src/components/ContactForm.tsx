"use client";

import { FormEvent, useState } from "react";
import {
  INQUIRY_TYPES,
  type ContactFieldErrors,
  type ContactResponse,
  validateContactPayload,
} from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "offline" | "failed";

const INITIAL = {
  name: "",
  email: "",
  inquiryType: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof typeof INITIAL>(key: K, value: (typeof INITIAL)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "failed" || status === "offline") setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validateContactPayload(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as ContactResponse;

      if (payload.ok) {
        setValues(INITIAL);
        setErrors({});
        setStatus("success");
        return;
      }

      if (payload.code === "offline") {
        setStatus("offline");
        return;
      }

      if (payload.code === "invalid" && payload.errors) {
        setErrors(payload.errors);
        setStatus("idle");
        return;
      }

      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  const sending = status === "sending";

  return (
    <section className="contact-panel" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="contact-heading">
        ESTABLISH CONTACT
      </h2>
      <p className="contact-lede">
        Have a project in mind or an opportunity to discuss? I&apos;d love to hear from you.
      </p>

      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <div className="contact-honeypot" hidden aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </div>

        <div className="contact-row">
          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-name">
              FULL NAME
            </label>
            <input
              id="contact-name"
              className={`contact-input${errors.name ? " is-invalid" : ""}`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name ? (
              <p id="contact-name-error" className="contact-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-email">
              EMAIL ADDRESS
            </label>
            <input
              id="contact-email"
              className={`contact-input${errors.email ? " is-invalid" : ""}`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email ? (
              <p id="contact-email-error" className="contact-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="contact-field">
          <label className="contact-label" htmlFor="contact-inquiry">
            INQUIRY TYPE
          </label>
          <select
            id="contact-inquiry"
            className={`contact-input contact-select${errors.inquiryType ? " is-invalid" : ""}`}
            name="inquiryType"
            value={values.inquiryType}
            onChange={(event) => update("inquiryType", event.target.value)}
            aria-invalid={Boolean(errors.inquiryType)}
            aria-describedby={errors.inquiryType ? "contact-inquiry-error" : undefined}
          >
            <option value="" disabled>
              Select inquiry type
            </option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.inquiryType ? (
            <p id="contact-inquiry-error" className="contact-error">
              {errors.inquiryType}
            </p>
          ) : null}
        </div>

        <div className="contact-field">
          <label className="contact-label" htmlFor="contact-message">
            MESSAGE
          </label>
          <textarea
            id="contact-message"
            className={`contact-input contact-textarea${errors.message ? " is-invalid" : ""}`}
            name="message"
            rows={4}
            placeholder="Tell me about your project or opportunity..."
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message ? (
            <p id="contact-message-error" className="contact-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <button className="contact-submit" type="submit" disabled={sending}>
          {sending ? "TRANSMITTING..." : "TRANSMIT MESSAGE →"}
        </button>

        {status === "success" ? (
          <p className="contact-status is-success" role="status">
            TRANSMISSION SUCCESSFUL — MESSAGE RECEIVED.
          </p>
        ) : null}
        {status === "offline" ? (
          <p className="contact-status is-offline" role="status">
            CONTACT TRANSMISSION OFFLINE — Please check back soon.
          </p>
        ) : null}
        {status === "failed" ? (
          <p className="contact-status is-failed" role="alert">
            TRANSMISSION FAILED — Please try again.
          </p>
        ) : null}
      </form>
    </section>
  );
}
