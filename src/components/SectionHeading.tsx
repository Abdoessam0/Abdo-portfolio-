type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionHeading = ({ id, eyebrow, title, description }: SectionHeadingProps) => (
  <div id={id} className="space-y-3">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
    <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
    {description ? <p className="max-w-2xl text-sm text-muted">{description}</p> : null}
  </div>
);

export default SectionHeading;
