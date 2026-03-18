type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
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
    <div className={`max-w-2xl space-y-3 ${alignment}`.trim()}>
      <p className="pill-label">{eyebrow}</p>
      <div className="space-y-2.5">
        <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.35rem]">
          {title}
        </h2>
        <p className="text-sm leading-7 text-muted sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
