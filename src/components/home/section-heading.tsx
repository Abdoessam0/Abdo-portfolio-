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
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl space-y-4 ${alignment}`.trim()}>
      <p className="pill-label">{eyebrow}</p>
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
