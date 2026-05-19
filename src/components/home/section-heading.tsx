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
        {/* Eyebrow pill — warm style matching StoryHero */}
        <p className="inline-flex items-center rounded-full border border-[rgba(24,24,24,0.12)] bg-white px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a61]">
          {eyebrow}
        </p>
        <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(24,24,24,0.1)] to-transparent sm:block" />
      </div>
      <div className="space-y-2.5 sm:space-y-3">
        <h2 className="font-heading text-[1.65rem] font-black leading-[1.08] tracking-[-0.04em] text-[#181818] sm:text-section">
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-[0.92rem] leading-7 text-[#6f6a61] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
