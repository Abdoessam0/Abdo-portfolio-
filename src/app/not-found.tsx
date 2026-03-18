// src/app/not-found.tsx
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="section-frame max-w-xl p-8 text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <AlertCircle className="h-10 w-10 text-brand-glow" />
        </div>

        <h1 className="mb-4 font-heading text-4xl font-semibold tracking-[-0.04em] text-white">
          404 - Page Not Found
        </h1>

        <p className="mb-8 text-base leading-8 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry though, you can find your way back home.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-canvas transition hover:bg-brand-glow"
          >
            <Home size={16} />
            Back to Home
          </Link>

          <p className="text-sm text-muted">
            Or navigate using the menu above.
          </p>
        </div>

        <div className="mt-12 opacity-30">
          <div className="mx-auto h-40 w-40 rounded-full border border-dashed border-brand/30" />
        </div>
      </div>
    </div>
  );
}
