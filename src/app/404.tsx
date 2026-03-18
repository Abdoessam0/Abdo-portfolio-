import Link from "next/link";
import { Home } from "lucide-react";

export default function Custom404() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12">
      <div className="section-frame w-full max-w-xl p-8 text-center">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur">
          <div className="flex h-full items-center justify-center text-3xl font-semibold text-brand-glow">
            404
          </div>
        </div>
        <h1 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-base leading-8 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-canvas transition hover:bg-brand-glow"
          >
            <Home size={16} />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
