type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex max-w-2xl flex-col gap-4 ${
        isCentered ? "mx-auto items-center text-center" : "items-start"
      }`}
    >
      <div
        className={`flex w-full items-center gap-3 ${
          isCentered ? "justify-center" : ""
        }`}
      >
        <p className="pill-label">{eyebrow}</p>
        <span className="hidden h-px flex-1 bg-gradient-to-r from-white/0 via-brand-glow/45 to-white/0 sm:block" />
      </div>
      <div className="space-y-3">
        <h2 className="font-heading text-section font-bold text-white">
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
