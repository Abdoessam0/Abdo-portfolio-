"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { loadSection, saveSection, updateItem, deleteItem } from "@/lib/admin-api";

type Id = string | number;

type ProfileRow = {
  id?: Id;
  name?: string;
  title?: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  languages?: string;
  education?: string;
};

type ProjectRow = {
  id?: Id;
  title?: string;
  slug?: string;
  description?: string;
  live_url?: string;
  repo_url?: string;
  status?: string;
};

type ExperienceRow = {
  id?: Id;
  company?: string;
  role?: string;
  location?: string;
  summary?: string;
};

type VolunteeringRow = {
  id?: Id;
  title?: string;
  organization?: string;
  description?: string;
};

type CertificateRow = {
  id?: Id;
  name?: string;
  issuer?: string;
  issue_date?: string;
  verify_url?: string;
};

const inputClass =
  "w-full rounded-lg border border-emerald-500/30 bg-[#0f1724] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40";

const textAreaClass =
  "w-full rounded-lg border border-emerald-500/30 bg-[#0f1724] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40 min-h-[120px]";

const errClass = "text-xs text-red-400";
const okClass = "text-xs text-emerald-300";

const emptyProfile: ProfileRow = {
  name: "",
  title: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  languages: "",
  education: "",
};

const emptyProject: ProjectRow = {
  title: "",
  slug: "",
  description: "",
  live_url: "",
  repo_url: "",
  status: "draft",
};

const emptyExperience: ExperienceRow = {
  company: "",
  role: "",
  location: "",
  summary: "",
};

const emptyVolunteer: VolunteeringRow = {
  title: "",
  organization: "",
  description: "",
};

const emptyCertificate: CertificateRow = {
  name: "",
  issuer: "",
  issue_date: "",
  verify_url: "",
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<ProfileRow>(emptyProfile);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [experience, setExperience] = useState<ExperienceRow[]>([]);
  const [volunteering, setVolunteering] = useState<VolunteeringRow[]>([]);
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);

  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [projectMsg, setProjectMsg] = useState<string | null>(null);
  const [experienceMsg, setExperienceMsg] = useState<string | null>(null);
  const [volunteerMsg, setVolunteerMsg] = useState<string | null>(null);
  const [certificateMsg, setCertificateMsg] = useState<string | null>(null);

  const [newProject, setNewProject] = useState<ProjectRow>(emptyProject);
  const [newExperience, setNewExperience] = useState<ExperienceRow>(emptyExperience);
  const [newVolunteer, setNewVolunteer] = useState<VolunteeringRow>(emptyVolunteer);
  const [newCertificate, setNewCertificate] = useState<CertificateRow>(emptyCertificate);

  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const markSaving = (key: string, v: boolean) => setSaving((s) => ({ ...s, [key]: v }));

  useEffect(() => {
    const loadAll = async () => {
      const [pRes, prRes, eRes, vRes, cRes] = await Promise.all([
        loadSection<ProfileRow>("profile"),
        loadSection<ProjectRow[]>("projects"),
        loadSection<ExperienceRow[]>("experience"),
        loadSection<VolunteeringRow[]>("volunteering"),
        loadSection<CertificateRow[]>("certificates"),
      ]);

      if (pRes.error) setProfileMsg(`Failed to load profile: ${pRes.error}`);
      else if (pRes.data) setProfile({ ...emptyProfile, ...pRes.data });

      if (prRes.error) setProjectMsg(`Failed to load projects: ${prRes.error}`);
      else if (prRes.data) setProjects(prRes.data);

      if (eRes.error) setExperienceMsg(`Failed to load experience: ${eRes.error}`);
      else if (eRes.data) setExperience(eRes.data);

      if (vRes.error) setVolunteerMsg(`Failed to load volunteering: ${vRes.error}`);
      else if (vRes.data) setVolunteering(vRes.data);

      if (cRes.error) setCertificateMsg(`Failed to load certificates: ${cRes.error}`);
      else if (cRes.data) setCertificates(cRes.data);

      setLoading(false);
    };
    loadAll();
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Profile                                                          */
  /* ---------------------------------------------------------------- */

  const handleSaveProfile = async () => {
    setProfileMsg(null);
    markSaving("profile", true);
    const { id, ...payload } = profile;
    const fn = id
      ? () => updateItem<ProfileRow>("profile", id, payload)
      : () => saveSection<ProfileRow>("profile", payload);
    const { data, error } = await fn();
    markSaving("profile", false);
    if (error) { setProfileMsg(`Failed to save profile: ${error}`); return; }
    if (data) setProfile({ ...emptyProfile, ...data });
    setProfileMsg("✓ Profile saved");
  };

  /* ---------------------------------------------------------------- */
  /*  Projects                                                         */
  /* ---------------------------------------------------------------- */

  const handleCreateProject = async () => {
    setProjectMsg(null);
    markSaving("newProject", true);
    const { error, data } = await saveSection<ProjectRow>("projects", newProject);
    markSaving("newProject", false);
    if (error) { setProjectMsg(`Failed to create project: ${error}`); return; }
    if (data) setProjects((prev) => [data, ...prev]);
    setNewProject(emptyProject);
    setProjectMsg("✓ Project created");
  };

  const handleUpdateProject = async (row: ProjectRow) => {
    if (!row.id) return;
    setProjectMsg(null);
    markSaving(`proj-${row.id}`, true);
    const { id, ...payload } = row;
    const { error } = await updateItem("projects", id, payload);
    markSaving(`proj-${row.id}`, false);
    if (error) { setProjectMsg(`Failed to update project: ${error}`); return; }
    setProjectMsg("✓ Project updated");
  };

  const handleDeleteProject = async (id?: Id) => {
    if (!id || !confirm("Delete this project?")) return;
    setProjectMsg(null);
    const { error } = await deleteItem("projects", id);
    if (error) { setProjectMsg(`Failed to delete project: ${error}`); return; }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setProjectMsg("✓ Project deleted");
  };

  /* ---------------------------------------------------------------- */
  /*  Experience                                                       */
  /* ---------------------------------------------------------------- */

  const handleAddExperience = async () => {
    setExperienceMsg(null);
    markSaving("newExp", true);
    const { error, data } = await saveSection<ExperienceRow>("experience", newExperience);
    markSaving("newExp", false);
    if (error) { setExperienceMsg(`Failed to add experience: ${error}`); return; }
    if (data) setExperience((prev) => [data, ...prev]);
    setNewExperience(emptyExperience);
    setExperienceMsg("✓ Experience added");
  };

  const handleSaveExperience = async (row: ExperienceRow) => {
    if (!row.id) return;
    setExperienceMsg(null);
    markSaving(`exp-${row.id}`, true);
    const { id, ...payload } = row;
    const { error } = await updateItem("experience", id, payload);
    markSaving(`exp-${row.id}`, false);
    if (error) { setExperienceMsg(`Failed to update experience: ${error}`); return; }
    setExperienceMsg("✓ Experience updated");
  };

  const handleDeleteExperience = async (id?: Id) => {
    if (!id || !confirm("Delete this experience?")) return;
    setExperienceMsg(null);
    const { error } = await deleteItem("experience", id);
    if (error) { setExperienceMsg(`Failed to delete experience: ${error}`); return; }
    setExperience((prev) => prev.filter((e) => e.id !== id));
    setExperienceMsg("✓ Experience deleted");
  };

  /* ---------------------------------------------------------------- */
  /*  Volunteering                                                     */
  /* ---------------------------------------------------------------- */

  const handleAddVolunteer = async () => {
    setVolunteerMsg(null);
    markSaving("newVol", true);
    const { error, data } = await saveSection<VolunteeringRow>("volunteering", newVolunteer);
    markSaving("newVol", false);
    if (error) { setVolunteerMsg(`Failed to add volunteering: ${error}`); return; }
    if (data) setVolunteering((prev) => [data, ...prev]);
    setNewVolunteer(emptyVolunteer);
    setVolunteerMsg("✓ Volunteering added");
  };

  const handleSaveVolunteer = async (row: VolunteeringRow) => {
    if (!row.id) return;
    setVolunteerMsg(null);
    markSaving(`vol-${row.id}`, true);
    const { id, ...payload } = row;
    const { error } = await updateItem("volunteering", id, payload);
    markSaving(`vol-${row.id}`, false);
    if (error) { setVolunteerMsg(`Failed to update volunteering: ${error}`); return; }
    setVolunteerMsg("✓ Volunteering updated");
  };

  const handleDeleteVolunteer = async (id?: Id) => {
    if (!id || !confirm("Delete this volunteering item?")) return;
    setVolunteerMsg(null);
    const { error } = await deleteItem("volunteering", id);
    if (error) { setVolunteerMsg(`Failed to delete volunteering: ${error}`); return; }
    setVolunteering((prev) => prev.filter((v) => v.id !== id));
    setVolunteerMsg("✓ Volunteering deleted");
  };

  /* ---------------------------------------------------------------- */
  /*  Certificates                                                     */
  /* ---------------------------------------------------------------- */

  const handleAddCertificate = async () => {
    setCertificateMsg(null);
    markSaving("newCert", true);
    const { error, data } = await saveSection<CertificateRow>("certificates", newCertificate);
    markSaving("newCert", false);
    if (error) { setCertificateMsg(`Failed to add certificate: ${error}`); return; }
    if (data) setCertificates((prev) => [data, ...prev]);
    setNewCertificate(emptyCertificate);
    setCertificateMsg("✓ Certificate added");
  };

  const handleSaveCertificate = async (row: CertificateRow) => {
    if (!row.id) return;
    setCertificateMsg(null);
    markSaving(`cert-${row.id}`, true);
    const { id, ...payload } = row;
    const { error } = await updateItem("certificates", id, payload);
    markSaving(`cert-${row.id}`, false);
    if (error) { setCertificateMsg(`Failed to update certificate: ${error}`); return; }
    setCertificateMsg("✓ Certificate updated");
  };

  const handleDeleteCertificate = async (id?: Id) => {
    if (!id || !confirm("Delete this certificate?")) return;
    setCertificateMsg(null);
    const { error } = await deleteItem("certificates", id);
    if (error) { setCertificateMsg(`Failed to delete certificate: ${error}`); return; }
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    setCertificateMsg("✓ Certificate deleted");
  };

  /* ---------------------------------------------------------------- */
  /*  Shared UI                                                        */
  /* ---------------------------------------------------------------- */

  const Section = ({
    title,
    description,
    message,
    children,
  }: {
    title: string;
    description?: string;
    message?: string | null;
    children: ReactNode;
  }) => (
    <section className="rounded-2xl border border-emerald-500/20 bg-white/5 p-6 shadow-md shadow-emerald-500/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {description ? <p className="text-sm text-slate-400">{description}</p> : null}
        </div>
        {message ? <p className={message.startsWith("Failed") || message.startsWith("✗") ? errClass : okClass}>{message}</p> : null}
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );

  const SaveBtn = ({ onClick, label, savingKey }: { onClick: () => void; label: string; savingKey?: string }) => (
    <button
      onClick={onClick}
      disabled={savingKey ? saving[savingKey] : false}
      className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-wait"
    >
      {savingKey && saving[savingKey] ? "Saving..." : label}
    </button>
  );

  const DeleteBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="rounded-lg border border-red-500/60 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
    >
      Delete
    </button>
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <p className="mt-4 text-sm text-slate-400">Loading admin data…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <header className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-white/5 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-300">Admin</p>
            <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
          </div>
          <Link
            href="/admin/logout"
            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500/20"
          >
            Logout
          </Link>
        </header>

        <p className="text-sm text-slate-400">Edit portfolio content from one page.</p>

        <div className="space-y-8">
          {/* ── Profile ─────────────────────────────────────────── */}
          <Section title="Profile" description="Main profile and hero information" message={profileMsg}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Name
                <input className={inputClass} value={profile.name ?? ""} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Title
                <input className={inputClass} value={profile.title ?? ""} onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))} />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Location
                <input className={inputClass} value={profile.location ?? ""} onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))} />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Email
                <input className={inputClass} value={profile.email ?? ""} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Phone
                <input className={inputClass} value={profile.phone ?? ""} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Languages (comma separated)
                <input className={inputClass} value={profile.languages ?? ""} onChange={(e) => setProfile((p) => ({ ...p, languages: e.target.value }))} />
              </label>
            </div>
            <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
              Short bio
              <textarea className={textAreaClass} value={profile.bio ?? ""} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} />
            </label>
            <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
              Education
              <textarea className={textAreaClass} value={profile.education ?? ""} onChange={(e) => setProfile((p) => ({ ...p, education: e.target.value }))} />
            </label>
            <SaveBtn onClick={handleSaveProfile} label="Save Profile" savingKey="profile" />
          </Section>

          {/* ── Projects ────────────────────────────────────────── */}
          <Section title="Projects" description="Basic project details" message={projectMsg}>
            <div className="rounded-xl border border-emerald-500/10 bg-white/5 p-4">
              <p className="mb-2 text-sm font-semibold text-emerald-300">Add new project</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                  Title
                  <input className={inputClass} value={newProject.title ?? ""} onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))} />
                </label>
                <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                  Slug
                  <input className={inputClass} value={newProject.slug ?? ""} onChange={(e) => setNewProject((p) => ({ ...p, slug: e.target.value }))} />
                </label>
                <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                  Live URL
                  <input className={inputClass} value={newProject.live_url ?? ""} onChange={(e) => setNewProject((p) => ({ ...p, live_url: e.target.value }))} />
                </label>
                <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                  Repo URL
                  <input className={inputClass} value={newProject.repo_url ?? ""} onChange={(e) => setNewProject((p) => ({ ...p, repo_url: e.target.value }))} />
                </label>
              </div>
              <label className="mt-3 block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Short description
                <textarea className={textAreaClass} value={newProject.description ?? ""} onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))} />
              </label>
              <label className="mt-3 block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Status
                <select className={inputClass} value={newProject.status ?? "draft"} onChange={(e) => setNewProject((p) => ({ ...p, status: e.target.value }))}>
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </label>
              <div className="mt-3">
                <SaveBtn onClick={handleCreateProject} label="Save project" savingKey="newProject" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-emerald-300">Existing projects</p>
              {projects.length === 0 ? (
                <p className="text-sm text-slate-400">No projects yet.</p>
              ) : (
                projects.map((project, idx) => (
                  <div key={`${project.id ?? idx}`} className="space-y-2 rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Title
                        <input className={inputClass} value={project.title ?? ""} onChange={(e) => setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p)))} />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Slug
                        <input className={inputClass} value={project.slug ?? ""} onChange={(e) => setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, slug: e.target.value } : p)))} />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Live URL
                        <input className={inputClass} value={project.live_url ?? ""} onChange={(e) => setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, live_url: e.target.value } : p)))} />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Repo URL
                        <input className={inputClass} value={project.repo_url ?? ""} onChange={(e) => setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, repo_url: e.target.value } : p)))} />
                      </label>
                    </div>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Short description
                      <textarea className={textAreaClass} value={project.description ?? ""} onChange={(e) => setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, description: e.target.value } : p)))} />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Status
                      <select className={inputClass} value={project.status ?? "draft"} onChange={(e) => setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, status: e.target.value } : p)))}>
                        <option value="draft">draft</option>
                        <option value="published">published</option>
                      </select>
                    </label>
                    <div className="flex gap-2">
                      <SaveBtn onClick={() => handleUpdateProject(project)} label="Update" savingKey={`proj-${project.id}`} />
                      <DeleteBtn onClick={() => handleDeleteProject(project.id)} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>

          {/* ── Experience ──────────────────────────────────────── */}
          <Section title="Experience" description="Work history" message={experienceMsg}>
            <div className="rounded-xl border border-emerald-500/10 bg-white/5 p-4 space-y-3">
              <p className="text-sm font-semibold text-emerald-300">Add new experience</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                  Company
                  <input className={inputClass} value={newExperience.company ?? ""} onChange={(e) => setNewExperience((p) => ({ ...p, company: e.target.value }))} />
                </label>
                <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                  Role
                  <input className={inputClass} value={newExperience.role ?? ""} onChange={(e) => setNewExperience((p) => ({ ...p, role: e.target.value }))} />
                </label>
                <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                  Location
                  <input className={inputClass} value={newExperience.location ?? ""} onChange={(e) => setNewExperience((p) => ({ ...p, location: e.target.value }))} />
                </label>
              </div>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Summary
                <textarea className={textAreaClass} value={newExperience.summary ?? ""} onChange={(e) => setNewExperience((p) => ({ ...p, summary: e.target.value }))} />
              </label>
              <SaveBtn onClick={handleAddExperience} label="Add experience" savingKey="newExp" />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-emerald-300">Existing experience</p>
              {experience.length === 0 ? (
                <p className="text-sm text-slate-400">No experience entries yet.</p>
              ) : (
                experience.map((item, idx) => (
                  <div key={`${item.id ?? idx}`} className="space-y-2 rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Company
                        <input className={inputClass} value={item.company ?? ""} onChange={(e) => setExperience((prev) => prev.map((p, i) => (i === idx ? { ...p, company: e.target.value } : p)))} />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Role
                        <input className={inputClass} value={item.role ?? ""} onChange={(e) => setExperience((prev) => prev.map((p, i) => (i === idx ? { ...p, role: e.target.value } : p)))} />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Location
                        <input className={inputClass} value={item.location ?? ""} onChange={(e) => setExperience((prev) => prev.map((p, i) => (i === idx ? { ...p, location: e.target.value } : p)))} />
                      </label>
                    </div>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Summary
                      <textarea className={textAreaClass} value={item.summary ?? ""} onChange={(e) => setExperience((prev) => prev.map((p, i) => (i === idx ? { ...p, summary: e.target.value } : p)))} />
                    </label>
                    <div className="flex gap-2">
                      <SaveBtn onClick={() => handleSaveExperience(item)} label="Update" savingKey={`exp-${item.id}`} />
                      <DeleteBtn onClick={() => handleDeleteExperience(item.id)} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>

          {/* ── Volunteering ────────────────────────────────────── */}
          <Section title="Volunteering" description="Volunteering entries" message={volunteerMsg}>
            <div className="rounded-xl border border-emerald-500/10 bg-white/5 p-4 space-y-3">
              <p className="text-sm font-semibold text-emerald-300">Add new volunteering</p>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Title
                <input className={inputClass} value={newVolunteer.title ?? ""} onChange={(e) => setNewVolunteer((p) => ({ ...p, title: e.target.value }))} />
              </label>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Organization
                <input className={inputClass} value={newVolunteer.organization ?? ""} onChange={(e) => setNewVolunteer((p) => ({ ...p, organization: e.target.value }))} />
              </label>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Description
                <textarea className={textAreaClass} value={newVolunteer.description ?? ""} onChange={(e) => setNewVolunteer((p) => ({ ...p, description: e.target.value }))} />
              </label>
              <SaveBtn onClick={handleAddVolunteer} label="Add volunteering" savingKey="newVol" />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-emerald-300">Existing volunteering</p>
              {volunteering.length === 0 ? (
                <p className="text-sm text-slate-400">No volunteering entries yet.</p>
              ) : (
                volunteering.map((item, idx) => (
                  <div key={`${item.id ?? idx}`} className="space-y-2 rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4">
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Title
                      <input className={inputClass} value={item.title ?? ""} onChange={(e) => setVolunteering((prev) => prev.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p)))} />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Organization
                      <input className={inputClass} value={item.organization ?? ""} onChange={(e) => setVolunteering((prev) => prev.map((p, i) => (i === idx ? { ...p, organization: e.target.value } : p)))} />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Description
                      <textarea className={textAreaClass} value={item.description ?? ""} onChange={(e) => setVolunteering((prev) => prev.map((p, i) => (i === idx ? { ...p, description: e.target.value } : p)))} />
                    </label>
                    <div className="flex gap-2">
                      <SaveBtn onClick={() => handleSaveVolunteer(item)} label="Update" savingKey={`vol-${item.id}`} />
                      <DeleteBtn onClick={() => handleDeleteVolunteer(item.id)} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>

          {/* ── Certificates ────────────────────────────────────── */}
          <Section title="Certificates" description="Certificates list" message={certificateMsg}>
            <div className="rounded-xl border border-emerald-500/10 bg-white/5 p-4 space-y-3">
              <p className="text-sm font-semibold text-emerald-300">Add new certificate</p>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Name
                <input className={inputClass} value={newCertificate.name ?? ""} onChange={(e) => setNewCertificate((p) => ({ ...p, name: e.target.value }))} />
              </label>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Issuer
                <input className={inputClass} value={newCertificate.issuer ?? ""} onChange={(e) => setNewCertificate((p) => ({ ...p, issuer: e.target.value }))} />
              </label>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Issue date
                <input className={inputClass} value={newCertificate.issue_date ?? ""} onChange={(e) => setNewCertificate((p) => ({ ...p, issue_date: e.target.value }))} />
              </label>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Verification URL
                <input className={inputClass} value={newCertificate.verify_url ?? ""} onChange={(e) => setNewCertificate((p) => ({ ...p, verify_url: e.target.value }))} />
              </label>
              <SaveBtn onClick={handleAddCertificate} label="Add certificate" savingKey="newCert" />
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-emerald-300">Existing certificates</p>
              {certificates.length === 0 ? (
                <p className="text-sm text-slate-400">No certificates yet.</p>
              ) : (
                certificates.map((item, idx) => (
                  <div key={`${item.id ?? idx}`} className="space-y-2 rounded-xl border border-emerald-500/10 bg-slate-900/50 p-4">
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Name
                      <input className={inputClass} value={item.name ?? ""} onChange={(e) => setCertificates((prev) => prev.map((p, i) => (i === idx ? { ...p, name: e.target.value } : p)))} />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Issuer
                      <input className={inputClass} value={item.issuer ?? ""} onChange={(e) => setCertificates((prev) => prev.map((p, i) => (i === idx ? { ...p, issuer: e.target.value } : p)))} />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Issue date
                      <input className={inputClass} value={item.issue_date ?? ""} onChange={(e) => setCertificates((prev) => prev.map((p, i) => (i === idx ? { ...p, issue_date: e.target.value } : p)))} />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Verification URL
                      <input className={inputClass} value={item.verify_url ?? ""} onChange={(e) => setCertificates((prev) => prev.map((p, i) => (i === idx ? { ...p, verify_url: e.target.value } : p)))} />
                    </label>
                    <div className="flex gap-2">
                      <SaveBtn onClick={() => handleSaveCertificate(item)} label="Update" savingKey={`cert-${item.id}`} />
                      <DeleteBtn onClick={() => handleDeleteCertificate(item.id)} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
