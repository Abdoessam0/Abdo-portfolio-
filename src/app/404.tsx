import Link from "next/link";
import { Home } from "lucide-react";

export default function Custom404() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12">
      <div className="text-center">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full border border-accent/40 bg-accent/10 backdrop-blur">
          <div className="flex h-full items-center justify-center text-3xl font-semibold text-accent">404</div>
        </div>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-base text-muted">
          The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-canvas transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Home size={16} />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
