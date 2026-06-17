"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Save } from "lucide-react";
import {
  PageHeading,
  SkeletonRows,
  Toast,
  type ToastState,
  inputClass,
  panelClass,
  textareaClass,
} from "@/components/admin/AdminUi";
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
};

async function readError(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Request failed with HTTP ${response.status}`;
}

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsFormValue>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

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
      setSettings({
        name: data.name ?? "",
        headline: data.headline ?? "",
        bio: data.bio ?? "",
        email: data.email ?? "",
        github_url: data.github_url ?? "",
        linkedin_url: data.linkedin_url ?? "",
        cv_url: data.cv_url ?? "",
      });
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
    setSettings({
      name: data.name ?? "",
      headline: data.headline ?? "",
      bio: data.bio ?? "",
      email: data.email ?? "",
      github_url: data.github_url ?? "",
      linkedin_url: data.linkedin_url ?? "",
      cv_url: data.cv_url ?? "",
    });
    setToast({ type: "success", message: "Settings updated." });
    setSaving(false);
  };

  return (
    <>
      <PageHeading
        title="Profile Settings"
        description="Manage public profile settings stored in MySQL. Public pages use these values with hardcoded fallback."
      />

      {loading ? (
        <SkeletonRows rows={6} />
      ) : (
        <form onSubmit={save} className={`${panelClass} grid gap-4 md:grid-cols-2`}>
          <label className="space-y-2 text-sm font-medium text-slate-300">
            Name
            <input
              value={settings.name}
              onChange={(event) => setSettings((current) => ({ ...current, name: event.target.value }))}
              required
              className={inputClass}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-300">
            Email
            <input
              type="email"
              value={settings.email}
              onChange={(event) => setSettings((current) => ({ ...current, email: event.target.value }))}
              required
              className={inputClass}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
            Headline
            <input
              value={settings.headline}
              onChange={(event) => setSettings((current) => ({ ...current, headline: event.target.value }))}
              required
              className={inputClass}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
            Bio
            <textarea
              value={settings.bio}
              onChange={(event) => setSettings((current) => ({ ...current, bio: event.target.value }))}
              className={textareaClass}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-300">
            GitHub URL
            <input
              value={settings.github_url}
              onChange={(event) => setSettings((current) => ({ ...current, github_url: event.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-300">
            LinkedIn URL
            <input
              value={settings.linkedin_url}
              onChange={(event) => setSettings((current) => ({ ...current, linkedin_url: event.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
            CV URL
            <input
              value={settings.cv_url}
              onChange={(event) => setSettings((current) => ({ ...current, cv_url: event.target.value }))}
              className={inputClass}
            />
          </label>
          <div className="flex justify-end md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              Save settings
            </button>
          </div>
        </form>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
