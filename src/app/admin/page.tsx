"use client";

import * as React from "react";
import { defaultContent, loadContent, saveContent, clearContent, type SiteContent } from "../../lib/content";

export default function AdminPage() {
  const [form, setForm] = React.useState<SiteContent>(loadContent());
  const [saved, setSaved] = React.useState<string | null>(null);

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveContent(form);
    setSaved("Saved. Refresh the site to see changes.");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setForm({ ...defaultContent, ...parsed });
      } catch {}
    };
    reader.readAsText(file);
  }

  function resetAll() {
    clearContent();
    setForm(defaultContent);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 md:px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Admin</h1>
      <p className="text-sm text-text/80">Update content. Stored locally in your browser for now.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">Basics</h2>
          <div>
            <label className="block text-sm text-text/80">Name</label>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          </div>
          <div>
            <label className="block text-sm text-text/80">Subline</label>
            <input value={form.subline} onChange={(e) => update("subline", e.target.value)} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-text/80">GitHub URL</label>
              <input value={form.socials.github} onChange={(e) => update("socials", { ...form.socials, github: e.target.value })} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
            </div>
            <div>
              <label className="block text-sm text-text/80">LinkedIn URL</label>
              <input value={form.socials.linkedin} onChange={(e) => update("socials", { ...form.socials, linkedin: e.target.value })} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-text/80">Email</label>
            <input value={form.socials.email || ""} onChange={(e) => update("socials", { ...form.socials, email: e.target.value })} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          </div>
          <div>
            <label className="block text-sm text-text/80">Profile Image URL</label>
            <input value={form.profileImage} onChange={(e) => update("profileImage", e.target.value)} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          </div>
          <div>
            <label className="block text-sm text-text/80">CV URL</label>
            <input value={form.cvUrl} onChange={(e) => update("cvUrl", e.target.value)} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          </div>
        </section>

        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">About</h2>
          <div>
            <label className="block text-sm text-text/80">Location</label>
            <input value={form.about.location} onChange={(e) => update("about", { ...form.about, location: e.target.value })} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          </div>
          <div>
            <label className="block text-sm text-text/80">Languages</label>
            <input value={form.about.languages} onChange={(e) => update("about", { ...form.about, languages: e.target.value })} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          </div>
          <div>
            <label className="block text-sm text-text/80">Narrative 1</label>
            <textarea value={form.about.narrative1} onChange={(e) => update("about", { ...form.about, narrative1: e.target.value })} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" rows={3} />
          </div>
          <div>
            <label className="block text-sm text-text/80">Narrative 2</label>
            <textarea value={form.about.narrative2} onChange={(e) => update("about", { ...form.about, narrative2: e.target.value })} className="mt-1 w-full rounded-md bg-text/10 px-3 py-2 text-text" rows={3} />
          </div>
        </section>

        <div className="flex gap-3">
          <button type="submit" className="inline-flex items-center rounded-lg px-5 py-3 bg-accent text-bg shadow-glass">Save</button>
          <button type="button" onClick={resetAll} className="inline-flex items-center rounded-lg px-5 py-3 bg-bg text-text ring-1 ring-text/20">Reset</button>
          <button type="button" onClick={exportJson} className="inline-flex items-center rounded-lg px-5 py-3 bg-bg text-text ring-1 ring-text/20">Export JSON</button>
          <label className="inline-flex items-center rounded-lg px-5 py-3 bg-bg text-text ring-1 ring-text/20 cursor-pointer">
            Import JSON
            <input type="file" accept="application/json" onChange={importJson} className="hidden" />
          </label>
        </div>

        {saved && <p className="text-sm text-text/80">{saved}</p>}
      </form>
    </main>
  );
}


