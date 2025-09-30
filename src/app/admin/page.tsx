"use client";

import * as React from "react";
import {
  defaultContent,
  loadContent,
  saveContent,
  clearContent,
  type SiteContent,
  type Project,
  type SkillsCategory,
  type ExperienceItem,
  type Certification,
} from "../../lib/content";

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
      } catch { }
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

        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">Skills</h2>
          {form.skills.map((cat, idx) => (
            <div key={idx} className="border-t border-text/10 pt-3">
              <input value={cat.title} onChange={(e) => {
                const copy = [...form.skills] as SkillsCategory[];
                copy[idx] = { ...copy[idx], title: e.target.value };
                update("skills", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text mb-2" />
              <textarea value={cat.items.join(", ")} onChange={(e) => {
                const copy = [...form.skills] as SkillsCategory[];
                copy[idx] = { ...copy[idx], items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                update("skills", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" rows={2} />
              <div className="mt-2 flex justify-end">
                <button type="button" onClick={() => {
                  const copy = form.skills.filter((_, i) => i !== idx);
                  update("skills", copy);
                }} className="text-sm text-text/70 hover:text-accent">Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => update("skills", [...form.skills, { title: "New", items: [] }])} className="inline-flex items-center rounded-lg px-3 py-2 bg-bg text-text ring-1 ring-text/20">Add Category</button>
        </section>

        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">Projects</h2>
          {form.projects.map((p, idx) => (
            <div key={idx} className="border-t border-text/10 pt-3 grid gap-2">
              <input placeholder="Title" value={p.title} onChange={(e) => {
                const copy = [...form.projects] as Project[];
                copy[idx] = { ...copy[idx], title: e.target.value };
                update("projects", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              <textarea placeholder="Description" value={p.description} onChange={(e) => {
                const copy = [...form.projects] as Project[];
                copy[idx] = { ...copy[idx], description: e.target.value };
                update("projects", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" rows={2} />
              <input placeholder="Tech (comma separated)" value={p.tech.join(", ")} onChange={(e) => {
                const copy = [...form.projects] as Project[];
                copy[idx] = { ...copy[idx], tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                update("projects", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              <input placeholder="Image URL or upload" value={p.imageUrl || ""} onChange={(e) => {
                const copy = [...form.projects] as Project[];
                copy[idx] = { ...copy[idx], imageUrl: e.target.value };
                update("projects", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              <input type="file" accept="image/*" onChange={(ev) => {
                const file = ev.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const copy = [...form.projects] as Project[];
                  copy[idx] = { ...copy[idx], imageUrl: String(reader.result) };
                  update("projects", copy);
                };
                reader.readAsDataURL(file);
              }} />
              <div className="grid md:grid-cols-2 gap-2">
                <input placeholder="Live URL" value={p.liveUrl || ""} onChange={(e) => {
                  const copy = [...form.projects] as Project[];
                  copy[idx] = { ...copy[idx], liveUrl: e.target.value };
                  update("projects", copy);
                }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
                <input placeholder="Repo URL" value={p.repoUrl || ""} onChange={(e) => {
                  const copy = [...form.projects] as Project[];
                  copy[idx] = { ...copy[idx], repoUrl: e.target.value };
                  update("projects", copy);
                }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => update("projects", form.projects.filter((_, i) => i !== idx))} className="text-sm text-text/70 hover:text-accent">Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => update("projects", [...form.projects, { title: "New Project", description: "", tech: [] }])} className="inline-flex items-center rounded-lg px-3 py-2 bg-bg text-text ring-1 ring-text/20">Add Project</button>
        </section>

        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">Experience</h2>
          {form.experience.map((e, idx) => (
            <div key={idx} className="border-t border-text/10 pt-3 grid gap-2">
              <input placeholder="Title" value={e.title} onChange={(ev) => {
                const copy = [...form.experience] as ExperienceItem[];
                copy[idx] = { ...copy[idx], title: ev.target.value };
                update("experience", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              <input placeholder="Role" value={e.role} onChange={(ev) => {
                const copy = [...form.experience] as ExperienceItem[];
                copy[idx] = { ...copy[idx], role: ev.target.value };
                update("experience", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              <textarea placeholder="Summary" value={e.summary} onChange={(ev) => {
                const copy = [...form.experience] as ExperienceItem[];
                copy[idx] = { ...copy[idx], summary: ev.target.value };
                update("experience", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" rows={2} />
              <div className="flex justify-end">
                <button type="button" onClick={() => update("experience", form.experience.filter((_, i) => i !== idx))} className="text-sm text-text/70 hover:text-accent">Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => update("experience", [...form.experience, { title: "", role: "", summary: "" }])} className="inline-flex items-center rounded-lg px-3 py-2 bg-bg text-text ring-1 ring-text/20">Add Experience</button>
        </section>

        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">Volunteering</h2>
          {form.volunteering.map((v, idx) => (
            <div key={idx} className="flex gap-2 items-center border-t border-text/10 pt-3">
              <input value={v} onChange={(e) => update("volunteering", form.volunteering.map((x, i) => (i === idx ? e.target.value : x)))} className="flex-1 rounded-md bg-text/10 px-3 py-2 text-text" />
              <button type="button" onClick={() => update("volunteering", form.volunteering.filter((_, i) => i !== idx))} className="text-sm text-text/70 hover:text-accent">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => update("volunteering", [...form.volunteering, ""])} className="inline-flex items-center rounded-lg px-3 py-2 bg-bg text-text ring-1 ring-text/20">Add Item</button>
        </section>

        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">Certifications</h2>
          {form.certifications.map((c, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-2 border-t border-text/10 pt-3">
              <input placeholder="Title" value={c.title} onChange={(e) => {
                const copy = [...form.certifications] as Certification[];
                copy[idx] = { ...copy[idx], title: e.target.value };
                update("certifications", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              <input placeholder="URL" value={c.url} onChange={(e) => {
                const copy = [...form.certifications] as Certification[];
                copy[idx] = { ...copy[idx], url: e.target.value };
                update("certifications", copy);
              }} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
              <div className="md:col-span-2 flex justify-end">
                <button type="button" onClick={() => update("certifications", form.certifications.filter((_, i) => i !== idx))} className="text-sm text-text/70 hover:text-accent">Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => update("certifications", [...form.certifications, { title: "", url: "" }])} className="inline-flex items-center rounded-lg px-3 py-2 bg-bg text-text ring-1 ring-text/20">Add Certification</button>
        </section>

        <section className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 p-4 space-y-3">
          <h2 className="font-semibold text-text">Education</h2>
          <input placeholder="Degree" value={form.education.degree} onChange={(e) => update("education", { ...form.education, degree: e.target.value })} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" />
          <textarea placeholder="Details" value={form.education.details} onChange={(e) => update("education", { ...form.education, details: e.target.value })} className="w-full rounded-md bg-text/10 px-3 py-2 text-text" rows={2} />
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


