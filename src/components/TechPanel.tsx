import Link from "next/link";
import type { TechPanel as TechPanelType } from "@/data/profile";

type TechPanelProps = {
  panel: TechPanelType;
};

const TechPanel = ({ panel }: TechPanelProps) => {
  return (
    <section className="flex h-full flex-col rounded-3xl border border-outline bg-panel/80 p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{panel.badge}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{panel.title}</h3>
        </div>
        <span className="rounded-full border border-accent/40 bg-surface px-3 py-1 text-xs font-semibold text-accent">
          {panel.metrics[0]?.value ?? ""}
        </span>
      </div>
      <p className="mt-3 text-sm text-ink/80">{panel.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-ink/80">
        {panel.achievements.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-ink/90">
        {panel.metrics.map((metric) => (
          <span key={`${panel.id}-${metric.label}`} className="rounded-full border border-outline px-3 py-1 text-muted">
            {metric.label}: {metric.value}
          </span>
        ))}
      </div>
      <pre className="mt-5 flex-1 rounded-2xl border border-outline/70 bg-surface p-4 font-mono text-xs leading-relaxed text-ink">
        <code>
          {panel.snippet.language.toUpperCase()}
          {"\n"}
          {panel.snippet.code}
        </code>
      </pre>
      {panel.links?.length ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {panel.links.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <Link
                key={link.href}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
};

export default TechPanel;
