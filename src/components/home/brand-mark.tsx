type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className = "" }: BrandMarkProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-brand/25 via-accent-cyan/18 to-accent-amber/12 shadow-glow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
        <span className="relative font-heading text-sm font-semibold tracking-[-0.08em] text-white">
          {"</>"}
        </span>
      </div>
      {compact ? null : (
        <div className="flex flex-col leading-none">
          <span className="font-heading text-[0.92rem] font-semibold tracking-[0.01em] text-white">
            Abdelrahman
          </span>
          <span className="mt-0.5 text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            Frontend Engineer
          </span>
        </div>
      )}
    </div>
  );
}
