// src/app/not-found.tsx
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <AlertCircle className="h-10 w-10 text-accent" />
        </div>
        
        <h1 className="text-4xl font-bold text-ink mb-4">404 - Page Not Found</h1>
        
        <p className="text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry though, you can find your way back home.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-canvas transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Home size={16} />
            Back to Home
          </Link>
          
          <p className="text-sm text-muted">
            Or navigate using the menu above
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-12 opacity-20">
          <div className="mx-auto h-40 w-40 rounded-full border-2 border-dashed border-accent/30" />
        </div>
      </div>
    </div>
  );
}
