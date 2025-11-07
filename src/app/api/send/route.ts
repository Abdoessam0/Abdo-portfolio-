import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { z } from "zod";
import { ContactFormEmail } from "../../emails/ContactFormEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM || !process.env.CONTACT_TO) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 503 },
      );
    }

    const { name, email, message } = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM;
    const to = process.env.CONTACT_TO.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const data = await resend.emails.send({
      from,
      to,
      subject: "Message from Portfolio Contact Form",
      replyTo: email,
      react: React.createElement(ContactFormEmail, { message, senderEmail: email, name }),
    });
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }
}


