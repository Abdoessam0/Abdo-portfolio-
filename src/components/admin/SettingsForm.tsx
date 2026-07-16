"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Save } from "lucide-react";
import {
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
import { PORTFOLIO_OWNER_NAME } from "@/data/profile";
import type { AdminProfileSettings } from "@/lib/admin-types";

type SettingsFormValue = Omit<AdminProfileSettings, "id" | "created_at" | "updated_at">;

const emptySettings: SettingsFormValue = {
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

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsFormValue>(emptySettings);
  const [saved, setSaved] = useState<SettingsFormValue>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(saved);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetch("/api/admin/settings", { cache: "no-store" });

      if (!response.ok) {
        setToast({ type: "error", message: await readError(response) });
        setLoading(false);
        return;
      }

      const data = (await response.json()) as AdminProfileSettings;
      const parsed: SettingsFormValue = {
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
      setLoading(false);
    };

    void load();
  }, []);

  const reset = () => setSettings(saved);

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
    const parsed: SettingsFormValue = {
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

  const set = (field: keyof SettingsFormValue) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSettings((c) => ({ ...c, [field]: e.target.value }));

  return (
    <>
      <PageHeading
        title="Profile Settings"
        description="Manage public profile settings stored in MySQL. Public pages use these values with hardcoded fallback."
      />

      {loading ? (
        <SkeletonRows rows={6} />
      ) : (
        <form id="settings-form" onSubmit={save}>
          {/* Core Identity */}
          <div className={`${panelClass} mb-4`}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Core Identity</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-300">
                Name <span className="text-red-400">*</span>
                <input value={settings.name} onChange={set("name")} required className={inputClass} placeholder={PORTFOLIO_OWNER_NAME} />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-300">
                Email <span className="text-red-400">*</span>
                <input type="email" value={settings.email} onChange={set("email")} required className={inputClass} placeholder="you@example.com" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
                Headline <span className="text-red-400">*</span>
                <input value={settings.headline} onChange={set("headline")} required className={inputClass} placeholder="Software Engineer / Full-Stack Developer" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
                Bio
                <textarea value={settings.bio} onChange={set("bio")} className={textareaClass} placeholder="A short bio shown on your public profile." />
              </label>
            </div>
          </div>

          {/* Links */}
          <div className={`${panelClass} mb-4`}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Links & URLs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-300">
                GitHub URL
                <input value={settings.github_url} onChange={set("github_url")} className={inputClass} placeholder="https://github.com/username" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-300">
                LinkedIn URL
                <input value={settings.linkedin_url} onChange={set("linkedin_url")} className={inputClass} placeholder="https://linkedin.com/in/username" />
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
                  onSuccess={() => setToast({ type: "success", message: "CV uploaded. Save settings to publish this CV URL." })}
                  uploadLabel="Upload new CV"
                  currentLinkLabel="View current CV"
                  disabled={saving}
                />
              </div>
            </div>
          </div>

          {/* Social Contact */}
          <div className={`${panelClass} mb-4`}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Social & Contact</h2>
            <div className="grid gap-4 md:grid-cols-2">
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
            </div>
          </div>

          {/* Branding */}
          <div className={`${panelClass} mb-4`}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Branding</h2>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Footer text
              <input value={settings.footer_text} onChange={set("footer_text")} className={inputClass} placeholder="Software Engineer building websites, dashboards, and platforms." />
            </label>
          </div>

          {/* Sticky save bar */}
          <StickyActionBar>
            {isDirty && (
              <span className="mr-auto text-xs text-amber-400">Unsaved changes</span>
            )}
            <button
              type="button"
              onClick={reset}
              disabled={!isDirty || saving}
              className={btnSecondary}
            >
              Reset
            </button>
            <button
              id="settings-save-btn"
              type="submit"
              disabled={saving || !isDirty}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-400 active:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </StickyActionBar>
        </form>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
