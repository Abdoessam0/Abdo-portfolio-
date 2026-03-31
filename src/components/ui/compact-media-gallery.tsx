"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";

export type CompactMediaItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
};

type CompactMediaGalleryProps = {
  items: CompactMediaItem[];
  imageSizes: string;
  className?: string;
  priority?: boolean;
};

export function CompactMediaGallery({
  items,
  imageSizes,
  className,
  priority = false,
}: CompactMediaGalleryProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  if (!activeItem) {
    return null;
  }

  const isSvg = activeItem.src.endsWith(".svg");
  const activeFit = activeItem.fit ?? (isSvg ? "contain" : "cover");
  const isPortrait = activeItem.height > activeItem.width;
  const activeAspectClass =
    activeFit === "contain" && isPortrait ? "aspect-[3/4]" : "aspect-[4/3]";

  const goPrev = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveIndex((index) => (index === 0 ? items.length - 1 : index - 1));
  };

  const goNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveIndex((index) => (index === items.length - 1 ? 0 : index + 1));
  };

  return (
    <div className={["space-y-3", className].filter(Boolean).join(" ")}>
      <div className="relative">
        <div className="absolute inset-0 rounded-[1.8rem] bg-[radial-gradient(circle_at_top_left,rgba(111,205,245,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,181,71,0.12),transparent_30%),linear-gradient(145deg,rgba(95,132,232,0.18),rgba(8,14,26,0))] blur-2xl" />
        <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,40,0.96),rgba(6,11,21,0.96))] p-2.5 sm:p-3">
          <div
            className={`relative overflow-hidden rounded-[1.3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,20,36,0.95),rgba(7,11,22,0.98))] ${activeAspectClass}`}
          >
            {!isSvg ? (
              <Image
                src={activeItem.src}
                alt=""
                fill
                sizes={imageSizes}
                priority={priority && activeIndex === 0}
                className="object-cover opacity-30 blur-2xl scale-110"
              />
            ) : null}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(4,8,16,0.52))]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.src}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.24 }}
                className="relative h-full w-full"
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes={imageSizes}
                  priority={priority && activeIndex === 0}
                  unoptimized={Boolean(isSvg)}
                  className={`h-full w-full ${
                    activeFit === "contain"
                      ? "object-contain p-4 sm:p-6"
                      : "object-cover"
                  } ${isSvg ? "bg-[#f5f7fa] p-5" : ""}`}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[rgba(6,10,20,0.62)] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-soft backdrop-blur-xl">
              <Images className="h-3.5 w-3.5 text-brand-glow" />
              Gallery
            </div>

            {items.length > 1 ? (
              <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-[rgba(6,10,20,0.62)] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-soft backdrop-blur-xl">
                {activeIndex + 1}/{items.length}
              </div>
            ) : null}

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/60 hover:text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/60 hover:text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            ) : null}

            <div className="absolute bottom-3 left-3 right-3 rounded-[1rem] border border-white/10 bg-[rgba(7,11,22,0.76)] px-3 py-3 backdrop-blur-xl">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted">
                Current frame
              </p>
              <p className="mt-1 text-xs leading-5 text-soft">
                {activeItem.alt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {items.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto rounded-[1.2rem] border border-white/8 bg-[rgba(10,16,29,0.72)] p-2.5">
          {items.map((item, index) => {
            const thumbIsSvg = item.src.endsWith(".svg");
            const thumbFit = item.fit ?? (thumbIsSvg ? "contain" : "cover");

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border transition-all sm:h-14 sm:w-20 ${
                  index === activeIndex
                    ? "border-brand-glow ring-1 ring-brand-glow/30 opacity-100"
                    : "border-white/10 opacity-70 hover:border-white/30 hover:opacity-100"
                }`}
                aria-label={item.alt}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={80}
                  height={56}
                  unoptimized={thumbIsSvg}
                  className={`h-full w-full ${
                    thumbFit === "contain"
                      ? "bg-[rgba(12,18,32,0.9)] p-1.5 object-contain"
                      : "object-cover"
                  }`}
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(4,8,16,0.32))]" />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
