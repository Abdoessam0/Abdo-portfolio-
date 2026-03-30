"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";

export type CompactMediaItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
        <div className="absolute inset-0 rounded-[1.55rem] bg-[linear-gradient(145deg,rgba(95,132,232,0.16),rgba(111,205,245,0.08),rgba(12,18,32,0.04))] blur-xl" />
        <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[rgba(9,15,28,0.88)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.src}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                width={activeItem.width}
                height={activeItem.height}
                sizes={imageSizes}
                priority={priority && activeIndex === 0}
                unoptimized={Boolean(isSvg)}
                className={`aspect-[16/11] w-full ${
                  isSvg ? "bg-[#f5f7fa] p-5 object-contain" : "object-cover"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_44%,rgba(6,10,20,0.76)_100%)]" />

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/60 hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/60 hover:text-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}

          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-[rgba(7,11,22,0.72)] px-3 py-2.5 backdrop-blur-xl">
            <p className="text-xs leading-5 text-soft">{activeItem.alt}</p>
          </div>
        </div>
      </div>

      {items.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto rounded-[1.2rem] border border-white/8 bg-[rgba(10,16,29,0.72)] p-2">
          {items.map((item, index) => {
            const thumbIsSvg = item.src.endsWith(".svg");

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border transition-all sm:h-14 sm:w-20 ${
                  index === activeIndex
                    ? "border-brand-glow ring-1 ring-brand-glow/30"
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
                    thumbIsSvg
                      ? "bg-[#f5f7fa] p-2 object-contain"
                      : "object-cover"
                  }`}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
