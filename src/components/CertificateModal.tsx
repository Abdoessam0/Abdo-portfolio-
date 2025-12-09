// src/components/CertificateModal.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Certificate } from "@/data/certificates";

type CertificateModalProps = {
  certificate: Certificate | null;
  onClose: () => void;
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

const CertificateModal = ({ certificate, onClose }: CertificateModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = Boolean(certificate);
  const fileUrl = certificate ? `/certificates/${certificate.file}` : "";
  const isPdf = useMemo(() => (certificate ? certificate.file.toLowerCase().endsWith(".pdf") : false), [certificate]);

  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector));
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "Tab") {
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!certificate) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${certificate.title} certificate`}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 py-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-5xl rounded-3xl border border-outline bg-panel shadow-card ring-1 ring-black/20"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-outline/60 p-4">
          <div>
            <p className="text-lg font-semibold text-ink">{certificate.title}</p>
            <p className="text-sm text-muted">
              {certificate.issuer} - {certificate.date}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-accent/50 px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Close
          </button>
        </div>
        <div className="h-[70vh] w-full bg-surface">
          {isPdf ? (
            <iframe
              title={`${certificate.title} PDF`}
              src={`${fileUrl}#view=FitH&pagemode=none&toolbar=0`}
              className="h-full w-full"
            />
          ) : (
            <div className="relative h-full w-full">
              <Image
                src={fileUrl}
                alt={`${certificate.title} preview`}
                fill
                sizes="(min-width: 768px) 80vw, 100vw"
                className="object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-outline/60 p-4 text-sm text-muted">
          <div className="space-y-1">
            {certificate.credentialId ? <p>ID: {certificate.credentialId}</p> : null}
            <p>{certificate.skills.join(" / ")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {certificate.verifyUrl ? (
              <Link
                href={certificate.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Verify
              </Link>
            ) : null}
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open in new tab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
