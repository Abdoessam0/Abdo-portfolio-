import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";
import { z } from "zod";
import { ContactFormEmail } from "../../emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const BodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const { name, email, message } = parsed.data;
  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // NOTE: verify a domain in Resend and update
      to: ["abdoessammo@gmail.com"],
      subject: "Message from Portfolio Contact Form",
      reply_to: email,
      react: React.createElement(ContactFormEmail, { message, senderEmail: email, name }),
    });
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}


