"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLang } from "@/hooks/use-lang";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

export function FloatingWhatsApp() {
  const pathname = usePathname() ?? "/";
  const { t } = useLang();
  const { shouldReduceMotion, shouldUseLiteEffects } = useMobileOptimization();
  const pulse = !shouldReduceMotion && !shouldUseLiteEffects;

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={t.projectCta.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.floatingWhatsapp.ariaLabel}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] flex flex-row-reverse items-center gap-2 sm:bottom-6 sm:right-6"
    >
      <span
        className={[
          "relative flex h-14 w-14 items-center justify-center rounded-full bg-[#06b56b] text-white shadow-[0_4px_20px_rgba(6,181,107,0.45)] transition-transform duration-200 hover:scale-[1.04] hover:bg-[#048c55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06b56b]",
          pulse ? "story-wa-pulse" : "",
        ].join(" ")}
      >
        <MessageCircle className="h-7 w-7" aria-hidden />
      </span>
      <span className="pointer-events-none hidden max-w-[10rem] rounded-xl border border-[rgba(24,24,24,0.12)] bg-[#181818] px-3 py-2 text-center text-xs font-semibold text-white opacity-0 shadow-lg transition duration-200 sm:block sm:group-hover:opacity-100">
        {t.floatingWhatsapp.hoverLabel}
      </span>
    </a>
  );
}
