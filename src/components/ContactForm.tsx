"use client";

import * as React from "react";

type Status =
  | { state: "idle"; message: string | null }
  | { state: "loading"; message: string | null }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const initialStatus: Status = { state: "idle", message: null };

const ContactForm = () => {
  const [status, setStatus] = React.useState<Status>(initialStatus);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus({ state: "error", message: "Please fill the form completely." });
      return;
    }

    setStatus({ state: "loading", message: "Sending your note..." });

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data?.ok) {
        form.reset();
        setStatus({ state: "success", message: "Thank you. I will reply within 24 hours." });
      } else {
        setStatus({ state: "error", message: "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-zinc-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-zinc-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
          placeholder="Share the project, timelines, or context."
        />
      </div>
      <button
        type="submit"
        disabled={status.state === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:opacity-60"
      >
        {status.state === "loading" ? "Sending..." : "Send message"}
      </button>
      {status.message ? (
        <p
          className={`text-sm ${status.state === "error" ? "text-red-600" : "text-emerald-700"}`}
          aria-live="polite"
          data-state={status.state}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
};

export default ContactForm;
