type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className = "" }: BrandMarkProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(91,124,255,0.24),rgba(139,109,255,0.18),rgba(53,214,164,0.12))] shadow-glow shadow-brand/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
        <span className="relative font-heading text-sm font-semibold tracking-[-0.08em] text-white">
          {"</>"}
        </span>
      </div>
      {compact ? null : (
        <div className="flex flex-col leading-none">
          <span className="font-heading text-[0.98rem] font-semibold tracking-[0.02em] text-white">
            Abdelrahman Mohamed
          </span>
          <span className="mt-1 text-[0.72rem] uppercase tracking-[0.28em] text-soft">
            Software Engineer
          </span>
        </div>
      )}
    </div>
  );
}
