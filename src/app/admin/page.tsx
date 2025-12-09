"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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

const getErrorMessage = (err: unknown) => (err instanceof Error ? err.message : "Error");

export default function AdminPage() {
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

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([loadProfile(), loadProjects(), loadExperience(), loadVolunteering(), loadCertificates()]);
    };
    loadAll();
  }, []);

  const loadProfile = async () => {
    setProfileMsg(null);
    const { data, error } = await supabase.from("profile").select("*").maybeSingle();
    if (error) {
      setProfileMsg(`Failed to load profile: ${error.message}`);
      console.error("Load profile error", error);
      return;
    }
    if (data) {
      setProfile({ ...emptyProfile, ...data });
    }
  };

  const saveProfile = async () => {
    setProfileMsg(null);
    const { id, ...payload } = profile;
    try {
      if (id) {
        const { error } = await supabase.from("profile").update(payload).eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from("profile").insert(payload).select().single();
        if (error) throw error;
        setProfile({ ...emptyProfile, ...data });
      }
      setProfileMsg("Saved profile");
    } catch (err) {
      const msg = getErrorMessage(err);
      setProfileMsg(`Failed to save profile: ${msg}`);
      console.error("Save profile error", err);
    }
  };

  const loadProjects = async () => {
    setProjectMsg(null);
    const { data, error } = await supabase.from("projects").select("*");
    if (error) {
      setProjectMsg(`Failed to load projects: ${error.message}`);
      console.error("Load projects error", error);
      return;
    }
    if (data) setProjects(data as ProjectRow[]);
  };

  const createProject = async () => {
    setProjectMsg(null);
    try {
      const { data, error } = await supabase.from("projects").insert(newProject).select().single();
      if (error) throw error;
      setProjects((prev) => [data as ProjectRow, ...prev]);
      setNewProject(emptyProject);
      setProjectMsg("Project created");
    } catch (err) {
      const msg = getErrorMessage(err);
      setProjectMsg(`Failed to create project: ${msg}`);
      console.error("Create project error", err);
    }
  };

  const updateProject = async (row: ProjectRow) => {
    if (!row.id) return;
    setProjectMsg(null);
    const { id, ...payload } = row;
    try {
      const { error } = await supabase.from("projects").update(payload).eq("id", id);
      if (error) throw error;
      setProjectMsg("Project updated");
    } catch (err) {
      const msg = getErrorMessage(err);
      setProjectMsg(`Failed to update project: ${msg}`);
      console.error("Update project error", err);
    }
  };

  const deleteProject = async (id?: Id) => {
    if (!id) return;
    if (!confirm("Delete this project?")) return;
    setProjectMsg(null);
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setProjectMsg("Project deleted");
    } catch (err) {
      const msg = getErrorMessage(err);
      setProjectMsg(`Failed to delete project: ${msg}`);
      console.error("Delete project error", err);
    }
  };

  const loadExperience = async () => {
    setExperienceMsg(null);
    const { data, error } = await supabase.from("experience").select("*");
    if (error) {
      setExperienceMsg(`Failed to load experience: ${error.message}`);
      console.error("Load experience error", error);
      return;
    }
    if (data) setExperience(data as ExperienceRow[]);
  };

  const addExperience = async () => {
    setExperienceMsg(null);
    try {
      const { data, error } = await supabase.from("experience").insert(newExperience).select().single();
      if (error) throw error;
      setExperience((prev) => [data as ExperienceRow, ...prev]);
      setNewExperience(emptyExperience);
      setExperienceMsg("Experience added");
    } catch (err) {
      const msg = getErrorMessage(err);
      setExperienceMsg(`Failed to add experience: ${msg}`);
      console.error("Add experience error", err);
    }
  };

  const saveExperience = async (row: ExperienceRow) => {
    if (!row.id) return;
    setExperienceMsg(null);
    const { id, ...payload } = row;
    try {
      const { error } = await supabase.from("experience").update(payload).eq("id", id);
      if (error) throw error;
      setExperienceMsg("Experience updated");
    } catch (err) {
      const msg = getErrorMessage(err);
      setExperienceMsg(`Failed to update experience: ${msg}`);
      console.error("Save experience error", err);
    }
  };

  const deleteExperience = async (id?: Id) => {
    if (!id) return;
    if (!confirm("Delete this experience?")) return;
    setExperienceMsg(null);
    try {
      const { error } = await supabase.from("experience").delete().eq("id", id);
      if (error) throw error;
      setExperience((prev) => prev.filter((e) => e.id !== id));
      setExperienceMsg("Experience deleted");
    } catch (err) {
      const msg = getErrorMessage(err);
      setExperienceMsg(`Failed to delete experience: ${msg}`);
      console.error("Delete experience error", err);
    }
  };

  const loadVolunteering = async () => {
    setVolunteerMsg(null);
    const { data, error } = await supabase.from("volunteering").select("*");
    if (error) {
      setVolunteerMsg(`Failed to load volunteering: ${error.message}`);
      console.error("Load volunteering error", error);
      return;
    }
    if (data) setVolunteering(data as VolunteeringRow[]);
  };

  const addVolunteer = async () => {
    setVolunteerMsg(null);
    try {
      const { data, error } = await supabase.from("volunteering").insert(newVolunteer).select().single();
      if (error) throw error;
      setVolunteering((prev) => [data as VolunteeringRow, ...prev]);
      setNewVolunteer(emptyVolunteer);
      setVolunteerMsg("Volunteering added");
    } catch (err) {
      const msg = getErrorMessage(err);
      setVolunteerMsg(`Failed to add volunteering: ${msg}`);
      console.error("Add volunteering error", err);
    }
  };

  const saveVolunteer = async (row: VolunteeringRow) => {
    if (!row.id) return;
    setVolunteerMsg(null);
    const { id, ...payload } = row;
    try {
      const { error } = await supabase.from("volunteering").update(payload).eq("id", id);
      if (error) throw error;
      setVolunteerMsg("Volunteering updated");
    } catch (err) {
      const msg = getErrorMessage(err);
      setVolunteerMsg(`Failed to update volunteering: ${msg}`);
      console.error("Save volunteering error", err);
    }
  };

  const deleteVolunteer = async (id?: Id) => {
    if (!id) return;
    if (!confirm("Delete this volunteering item?")) return;
    setVolunteerMsg(null);
    try {
      const { error } = await supabase.from("volunteering").delete().eq("id", id);
      if (error) throw error;
      setVolunteering((prev) => prev.filter((v) => v.id !== id));
      setVolunteerMsg("Volunteering deleted");
    } catch (err) {
      const msg = getErrorMessage(err);
      setVolunteerMsg(`Failed to delete volunteering: ${msg}`);
      console.error("Delete volunteering error", err);
    }
  };

  const loadCertificates = async () => {
    setCertificateMsg(null);
    const { data, error } = await supabase.from("certificates").select("*");
    if (error) {
      setCertificateMsg(`Failed to load certificates: ${error.message}`);
      console.error("Load certificates error", error);
      return;
    }
    if (data) setCertificates(data as CertificateRow[]);
  };

  const addCertificate = async () => {
    setCertificateMsg(null);
    try {
      const { data, error } = await supabase.from("certificates").insert(newCertificate).select().single();
      if (error) throw error;
      setCertificates((prev) => [data as CertificateRow, ...prev]);
      setNewCertificate(emptyCertificate);
      setCertificateMsg("Certificate added");
    } catch (err) {
      const msg = getErrorMessage(err);
      setCertificateMsg(`Failed to add certificate: ${msg}`);
      console.error("Add certificate error", err);
    }
  };

  const saveCertificate = async (row: CertificateRow) => {
    if (!row.id) return;
    setCertificateMsg(null);
    const { id, ...payload } = row;
    try {
      const { error } = await supabase.from("certificates").update(payload).eq("id", id);
      if (error) throw error;
      setCertificateMsg("Certificate updated");
    } catch (err) {
      const msg = getErrorMessage(err);
      setCertificateMsg(`Failed to update certificate: ${msg}`);
      console.error("Save certificate error", err);
    }
  };

  const deleteCertificate = async (id?: Id) => {
    if (!id) return;
    if (!confirm("Delete this certificate?")) return;
    setCertificateMsg(null);
    try {
      const { error } = await supabase.from("certificates").delete().eq("id", id);
      if (error) throw error;
      setCertificates((prev) => prev.filter((c) => c.id !== id));
      setCertificateMsg("Certificate deleted");
    } catch (err) {
      const msg = getErrorMessage(err);
      setCertificateMsg(`Failed to delete certificate: ${msg}`);
      console.error("Delete certificate error", err);
    }
  };

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
        {message ? <p className={message.startsWith("Failed") ? errClass : okClass}>{message}</p> : null}
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );

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
          <Section title="Profile" description="Main profile and hero information" message={profileMsg}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Name
                <input
                  className={inputClass}
                  value={profile.name ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Title
                <input
                  className={inputClass}
                  value={profile.title ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Location
                <input
                  className={inputClass}
                  value={profile.location ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Email
                <input
                  className={inputClass}
                  value={profile.email ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Phone
                <input
                  className={inputClass}
                  value={profile.phone ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Languages (comma separated)
                <input
                  className={inputClass}
                  value={profile.languages ?? ""}
                  onChange={(e) => setProfile((p) => ({ ...p, languages: e.target.value }))}
                />
              </label>
            </div>
            <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400 block">
              Short bio
              <textarea
                className={textAreaClass}
                value={profile.bio ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              />
            </label>
            <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400 block">
              Education
              <textarea
                className={textAreaClass}
                value={profile.education ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, education: e.target.value }))}
              />
            </label>
            <button
              onClick={saveProfile}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
            >
              Save Profile
            </button>
          </Section>

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
                <select
                  className={inputClass}
                  value={newProject.status ?? "draft"}
                  onChange={(e) => setNewProject((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </label>
              <button
                onClick={createProject}
                className="mt-3 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Save project
              </button>
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
                        <input
                          className={inputClass}
                          value={project.title ?? ""}
                          onChange={(e) =>
                            setProjects((prev) =>
                              prev.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p))
                            )
                          }
                        />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Slug
                        <input
                          className={inputClass}
                          value={project.slug ?? ""}
                          onChange={(e) =>
                            setProjects((prev) =>
                              prev.map((p, i) => (i === idx ? { ...p, slug: e.target.value } : p))
                            )
                          }
                        />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Live URL
                        <input
                          className={inputClass}
                          value={project.live_url ?? ""}
                          onChange={(e) =>
                            setProjects((prev) =>
                              prev.map((p, i) => (i === idx ? { ...p, live_url: e.target.value } : p))
                            )
                          }
                        />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Repo URL
                        <input
                          className={inputClass}
                          value={project.repo_url ?? ""}
                          onChange={(e) =>
                            setProjects((prev) =>
                              prev.map((p, i) => (i === idx ? { ...p, repo_url: e.target.value } : p))
                            )
                          }
                        />
                      </label>
                    </div>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Short description
                      <textarea
                        className={textAreaClass}
                        value={project.description ?? ""}
                        onChange={(e) =>
                          setProjects((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, description: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Status
                      <select
                        className={inputClass}
                        value={project.status ?? "draft"}
                        onChange={(e) =>
                          setProjects((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, status: e.target.value } : p))
                          )
                        }
                      >
                        <option value="draft">draft</option>
                        <option value="published">published</option>
                      </select>
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateProject(project)}
                        className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-emerald-400"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="rounded-lg border border-red-500/60 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>

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
              <button
                onClick={addExperience}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Add experience
              </button>
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
                        <input
                          className={inputClass}
                          value={item.company ?? ""}
                          onChange={(e) =>
                            setExperience((prev) =>
                              prev.map((p, i) => (i === idx ? { ...p, company: e.target.value } : p))
                            )
                          }
                        />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Role
                        <input
                          className={inputClass}
                          value={item.role ?? ""}
                          onChange={(e) =>
                            setExperience((prev) =>
                              prev.map((p, i) => (i === idx ? { ...p, role: e.target.value } : p))
                            )
                          }
                        />
                      </label>
                      <label className="space-y-1 text-xs uppercase tracking-wide text-slate-400">
                        Location
                        <input
                          className={inputClass}
                          value={item.location ?? ""}
                          onChange={(e) =>
                            setExperience((prev) =>
                              prev.map((p, i) => (i === idx ? { ...p, location: e.target.value } : p))
                            )
                          }
                        />
                      </label>
                    </div>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Summary
                      <textarea
                        className={textAreaClass}
                        value={item.summary ?? ""}
                        onChange={(e) =>
                          setExperience((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, summary: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveExperience(item)}
                        className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-emerald-400"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteExperience(item.id)}
                        className="rounded-lg border border-red-500/60 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>

          <Section title="Volunteering" description="Volunteering entries" message={volunteerMsg}>
            <div className="rounded-xl border border-emerald-500/10 bg-white/5 p-4 space-y-3">
              <p className="text-sm font-semibold text-emerald-300">Add new volunteering</p>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Title
                <input className={inputClass} value={newVolunteer.title ?? ""} onChange={(e) => setNewVolunteer((p) => ({ ...p, title: e.target.value }))} />
              </label>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Organization
                <input
                  className={inputClass}
                  value={newVolunteer.organization ?? ""}
                  onChange={(e) => setNewVolunteer((p) => ({ ...p, organization: e.target.value }))}
                />
              </label>
              <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                Description
                <textarea className={textAreaClass} value={newVolunteer.description ?? ""} onChange={(e) => setNewVolunteer((p) => ({ ...p, description: e.target.value }))} />
              </label>
              <button
                onClick={addVolunteer}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Add volunteering
              </button>
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
                      <input
                        className={inputClass}
                        value={item.title ?? ""}
                        onChange={(e) =>
                          setVolunteering((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Organization
                      <input
                        className={inputClass}
                        value={item.organization ?? ""}
                        onChange={(e) =>
                          setVolunteering((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, organization: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Description
                      <textarea
                        className={textAreaClass}
                        value={item.description ?? ""}
                        onChange={(e) =>
                          setVolunteering((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, description: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveVolunteer(item)}
                        className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-emerald-400"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteVolunteer(item.id)}
                        className="rounded-lg border border-red-500/60 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Section>

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
              <button
                onClick={addCertificate}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Add certificate
              </button>
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
                      <input
                        className={inputClass}
                        value={item.name ?? ""}
                        onChange={(e) =>
                          setCertificates((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, name: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Issuer
                      <input
                        className={inputClass}
                        value={item.issuer ?? ""}
                        onChange={(e) =>
                          setCertificates((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, issuer: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Issue date
                      <input
                        className={inputClass}
                        value={item.issue_date ?? ""}
                        onChange={(e) =>
                          setCertificates((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, issue_date: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <label className="block space-y-1 text-xs uppercase tracking-wide text-slate-400">
                      Verification URL
                      <input
                        className={inputClass}
                        value={item.verify_url ?? ""}
                        onChange={(e) =>
                          setCertificates((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, verify_url: e.target.value } : p))
                          )
                        }
                      />
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveCertificate(item)}
                        className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-emerald-400"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteCertificate(item.id)}
                        className="rounded-lg border border-red-500/60 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
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
