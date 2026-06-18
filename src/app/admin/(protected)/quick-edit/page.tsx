"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ChevronDown, ChevronUp, EyeOff, FileCode, Loader2, Save } from "lucide-react";
import {
  InfoPanel,
  PageHeading,
  SkeletonRows,
  StickyActionBar,
  Toast,
  type ToastState,
  btnSecondary,
  inputClass,
  panelClass,
  textareaClass,
} from "@/components/admin/AdminUi";
import { AdminFileUpload } from "@/components/admin/AdminFileUpload";
import type { AdminProfileSettings } from "@/lib/admin-types";

type SettingsValue = Omit<AdminProfileSettings, "id" | "created_at" | "updated_at">;

const emptySettings: SettingsValue = {
  name: "",
  headline: "",
  bio: "",
  email: "",
  github_url: "",
  linkedin_url: "",
  cv_url: "",
  whatsapp_url: "",
  instagram_url: "",
  footer_text: "",
  twitter_url: "",
};

async function readError(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Request failed with HTTP ${response.status}`;
}

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={panelClass + " mb-4"}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="text-sm font-bold text-white">{title}</h2>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500" />
        )}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

type OverviewData = {
  hiddenSkills: number;
  hiddenExperience: number;
  draftProjects: number;
};

export default function QuickEditPage() {
  const [settings, setSettings] = useState<SettingsValue>(emptySettings);
  const [saved, setSaved] = useState<SettingsValue>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [overview, setOverview] = useState<OverviewData | null>(null);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(saved);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [settingsRes, dashRes] = await Promise.all([
        fetch("/api/admin/settings", { cache: "no-store" }),
        fetch("/api/admin/dashboard", { cache: "no-store" }).catch(() => null),
      ]);

      if (settingsRes.ok) {
        const data = (await settingsRes.json()) as AdminProfileSettings;
        const parsed: SettingsValue = {
          name: data.name ?? "",
          headline: data.headline ?? "",
          bio: data.bio ?? "",
          email: data.email ?? "",
          github_url: data.github_url ?? "",
          linkedin_url: data.linkedin_url ?? "",
          cv_url: data.cv_url ?? "",
          whatsapp_url: data.whatsapp_url ?? "",
          instagram_url: data.instagram_url ?? "",
          footer_text: data.footer_text ?? "",
          twitter_url: data.twitter_url ?? "",
        };
        setSettings(parsed);
        setSaved(parsed);
      }

      if (dashRes?.ok) {
        const d = (await dashRes.json()) as OverviewData;
        setOverview(d);
      }

      setLoading(false);
    };
    void load();
  }, []);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setSaving(false);
      return;
    }

    const data = (await response.json()) as AdminProfileSettings;
    const parsed: SettingsValue = {
      name: data.name ?? "",
      headline: data.headline ?? "",
      bio: data.bio ?? "",
      email: data.email ?? "",
      github_url: data.github_url ?? "",
      linkedin_url: data.linkedin_url ?? "",
      cv_url: data.cv_url ?? "",
      whatsapp_url: data.whatsapp_url ?? "",
      instagram_url: data.instagram_url ?? "",
      footer_text: data.footer_text ?? "",
      twitter_url: data.twitter_url ?? "",
    };
    setSettings(parsed);
    setSaved(parsed);
    setToast({ type: "success", message: "Settings saved successfully." });
    setSaving(false);
  };

  const set =
    (field: keyof SettingsValue) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setSettings((c) => ({ ...c, [field]: e.target.value }));

  if (loading) {
    return (
      <>
        <PageHeading title="Quick Edit" description="Loading content…" />
        <SkeletonRows rows={6} />
      </>
    );
  }

  return (
    <>
      <PageHeading
        title="Quick Edit"
        description="Edit the most important DB-backed public content from one place. Static content shows a reference panel."
      />

      <form id="quick-edit-form" onSubmit={save}>
        {/* Profile & Contact */}
        <Section title="Profile & Contact">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Name <span className="text-red-400">*</span>
              <input value={settings.name} onChange={set("name")} required className={inputClass} placeholder="Abdo Essam" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Email <span className="text-red-400">*</span>
              <input type="email" value={settings.email} onChange={set("email")} required className={inputClass} />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
              Headline <span className="text-red-400">*</span>
              <input value={settings.headline} onChange={set("headline")} required className={inputClass} placeholder="Software Engineer / Full-Stack Developer" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
              Bio
              <textarea value={settings.bio} onChange={set("bio")} className={textareaClass} placeholder="Short bio for public profile." />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              GitHub URL
              <input value={settings.github_url} onChange={set("github_url")} className={inputClass} placeholder="https://github.com/username" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              LinkedIn URL
              <input value={settings.linkedin_url} onChange={set("linkedin_url")} className={inputClass} placeholder="https://linkedin.com/in/username" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              WhatsApp URL
              <input value={settings.whatsapp_url} onChange={set("whatsapp_url")} className={inputClass} placeholder="https://wa.me/905527508202" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Instagram URL
              <input value={settings.instagram_url} onChange={set("instagram_url")} className={inputClass} placeholder="https://instagram.com/username" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Twitter / X URL
              <input value={settings.twitter_url} onChange={set("twitter_url")} className={inputClass} placeholder="https://x.com/username" />
            </label>
            <div className="space-y-3 text-sm font-medium text-slate-300 md:col-span-2">
              <label className="block space-y-2">
                <span>CV / Resume URL</span>
                <input value={settings.cv_url} onChange={set("cv_url")} className={inputClass} placeholder="/uploads/cv/abdelrahman-mohamed-cv.pdf or https://..." />
              </label>
              <AdminFileUpload
                category="cv"
                value={settings.cv_url}
                onChange={(url) => setSettings((current) => ({ ...current, cv_url: url }))}
                onError={(message) => setToast({ type: "error", message })}
                onSuccess={() => setToast({ type: "success", message: "CV uploaded. Save changes to publish this CV URL." })}
                uploadLabel="Upload new CV"
                currentLinkLabel="View current CV"
                disabled={saving}
              />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <Section title="Footer Text">
          <label className="space-y-2 text-sm font-medium text-slate-300">
            Footer description
            <input
              value={settings.footer_text}
              onChange={set("footer_text")}
              className={inputClass}
              placeholder="Software Engineer building websites, dashboards, and platforms."
            />
          </label>
          <p className="mt-2 text-xs text-slate-500">This text appears in the public site footer.</p>
        </Section>

        {/* Visibility Overview */}
        <Section title="Visibility Overview" defaultOpen={false}>
          {overview ? (
            <div className="space-y-3">
              {overview.hiddenSkills > 0 && (
                <div className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                  <EyeOff className="h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300">{overview.hiddenSkills} hidden skill{overview.hiddenSkills > 1 ? "s" : ""}</p>
                    <p className="text-xs text-slate-500">Manage in <a href="/admin/skills" className="text-emerald-400 hover:underline">Skills</a></p>
                  </div>
                </div>
              )}
              {overview.hiddenExperience > 0 && (
                <div className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                  <EyeOff className="h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300">{overview.hiddenExperience} hidden experience item{overview.hiddenExperience > 1 ? "s" : ""}</p>
                    <p className="text-xs text-slate-500">Manage in <a href="/admin/experience" className="text-emerald-400 hover:underline">Experience</a></p>
                  </div>
                </div>
              )}
              {overview.draftProjects > 0 && (
                <div className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-900/40 px-4 py-3">
                  <EyeOff className="h-4 w-4 shrink-0 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-300">{overview.draftProjects} draft project{overview.draftProjects > 1 ? "s" : ""}</p>
                    <p className="text-xs text-slate-500">Manage in <a href="/admin/projects" className="text-emerald-400 hover:underline">Projects</a></p>
                  </div>
                </div>
              )}
              {overview.hiddenSkills === 0 && overview.hiddenExperience === 0 && overview.draftProjects === 0 && (
                <p className="text-sm text-emerald-400">✓ All skills, experience, and projects are visible.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Could not load visibility data.</p>
          )}
        </Section>

        {/* Static content reference */}
        <Section title="Static Content Reference (Read-Only)" defaultOpen={false}>
          <InfoPanel>
            The following content is <strong>hardcoded in static files</strong> — not in the database. To change it, edit the files directly in your code editor.
          </InfoPanel>

          <div className="mt-4 space-y-3">
            {[
              {
                section: "Hero headline & subtitle",
                file: "src/lib/i18n.ts",
                keys: "dict.en.headline, dict.en.sub",
              },
              {
                section: "Navigation labels",
                file: "src/lib/i18n.ts",
                keys: "dict.en.nav",
              },
              {
                section: "About section story",
                file: "src/lib/i18n.ts",
                keys: "dict.en.about.story",
              },
              {
                section: "CTA buttons",
                file: "src/lib/i18n.ts",
                keys: "dict.en.cta1, cta2, cta3",
              },
              {
                section: "Contact channels (WhatsApp display number)",
                file: "src/data/profile.ts",
                keys: "PROFILE.contact.channels",
              },
              {
                section: "Hero proof strip / trusted-by logos",
                file: "src/data/profile.ts",
                keys: "PROFILE.hero.proofStrip, PROFILE.hero.trustedBy",
              },
              {
                section: "FAQ / Services / Pricing / Chatbot chips",
                file: "— Not currently in codebase —",
                keys: "Phase 2: requires new DB tables",
              },
            ].map((row) => (
              <div key={row.section} className="rounded-lg border border-slate-800/60 bg-slate-900/30 px-4 py-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-slate-200">{row.section}</p>
                    <p className="mt-0.5 flex items-center gap-1 font-mono text-[11px] text-slate-500">
                      <FileCode className="h-3 w-3 shrink-0" />
                      {row.file}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-slate-600 sm:mt-0 sm:text-right">{row.keys}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Sticky Save Bar */}
        <StickyActionBar>
          {isDirty && (
            <span className="mr-auto text-xs text-amber-400">Unsaved changes</span>
          )}
          <button type="button" onClick={() => setSettings(saved)} disabled={!isDirty || saving} className={btnSecondary}>
            Reset
          </button>
          <button
            id="quick-edit-save-btn"
            type="submit"
            disabled={saving || !isDirty}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-400 active:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving…" : "Save All Changes"}
          </button>
        </StickyActionBar>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
