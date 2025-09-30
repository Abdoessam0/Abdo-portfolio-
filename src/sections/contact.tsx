"use client";

import * as React from "react";
import { Container } from "../components/ui/container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Button } from "../components/ui/Button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = React.useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || !message) {
            setStatus("Please fill in all fields.");
            return;
        }

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        });
        const data = await res.json();
        setStatus(data?.ok ? "Message sent!" : "Something went wrong.");
        form.reset();
    }

    return (
        <section id="contact" className="py-20">
            <Container>
                <SectionTitle>Contact</SectionTitle>
                <div className="grid md:grid-cols-2 gap-8">
                    <form onSubmit={onSubmit} className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
                        <div>
                            <label className="block text-sm text-text/80">Name</label>
                            <input name="name" className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text placeholder:text-text/50 outline-none focus:ring-2 focus:ring-accent" placeholder="Your name" />
                        </div>
                        <div>
                            <label className="block text-sm text-text/80">Email</label>
                            <input type="email" name="email" className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text placeholder:text-text/50 outline-none focus:ring-2 focus:ring-accent" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm text-text/80">Message</label>
                            <textarea name="message" rows={4} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text placeholder:text-text/50 outline-none focus:ring-2 focus:ring-accent" placeholder="How can I help?" />
                        </div>
                        <Button type="submit">Send</Button>
                        {status && <p className="text-sm text-text/80">{status}</p>}
                    </form>
                    <div className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4">
                        <p className="text-text/90">Find me on:</p>
                        <div className="mt-3 flex gap-3">
                            <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-text/10"><Github className="size-5 text-text" /></a>
                            <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-text/10"><Linkedin className="size-5 text-text" /></a>
                            <a href="mailto:example@email.com" aria-label="Email" className="p-2 rounded-lg hover:bg-text/10"><Mail className="size-5 text-text" /></a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}


