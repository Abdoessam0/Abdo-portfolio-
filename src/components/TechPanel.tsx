import Link from "next/link";
import type { TechPanel as TechPanelType } from "@/data/profile";

type TechPanelProps = {
  panel: TechPanelType;
};

const TechPanel = ({ panel }: TechPanelProps) => {
  return (
    <section className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{panel.badge}</p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-900">{panel.title}</h3>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          {panel.metrics[0]?.value ?? ""}
        </span>
      </div>
      <p className="mt-3 text-sm text-zinc-700">{panel.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {panel.achievements.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-zinc-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-zinc-700">
        {panel.metrics.map((metric) => (
          <span key={`${panel.id}-${metric.label}`} className="rounded-full border border-zinc-200 px-3 py-1">
            {metric.label}: {metric.value}
          </span>
        ))}
      </div>
      <pre className="mt-5 flex-1 rounded-2xl border border-zinc-100 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-800">
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
                className="text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
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
