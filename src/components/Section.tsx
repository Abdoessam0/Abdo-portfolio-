import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
};

const Section = ({ id, title, eyebrow, description, children }: SectionProps) => (
  <section id={id} className="scroll-mt-24 py-12 sm:py-16">
    <div className="space-y-6">
      <div className="space-y-3">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</p> : null}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">{title}</h2>
          {description ? <p className="text-base text-zinc-600">{description}</p> : null}
        </div>
      </div>
      {children}
    </div>
  </section>
);

export default Section;
