"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Edit3, Eye, EyeOff, ImageIcon, Plus, Search, Star, Trash2 } from "lucide-react";
import {
  ConfirmDialog,
  EmptyState,
  PageHeading,
  SkeletonRows,
  StatusBadge,
  Toast,
  type ToastState,
  inputClass,
  panelClass,
} from "@/components/admin/AdminUi";
import type { AdminProject } from "@/lib/admin-types";

async function readError(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Request failed with HTTP ${response.status}`;
}

export function ProjectList() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [published, setPublished] = useState("");
  const [featured, setFeatured] = useState("");
  const [toast, setToast] = useState<ToastState>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminProject | null>(null);
  const [deleting, setDeleting] = useState(false);

  const listUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (published) params.set("published", published);
    if (featured) params.set("featured", featured);
    const query = params.toString();
    return query ? `/api/admin/projects?${query}` : "/api/admin/projects";
  }, [featured, published, search]);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    const response = await fetch(listUrl, { cache: "no-store" });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setLoading(false);
      return;
    }

    const data = (await response.json()) as { items: AdminProject[] };
    setProjects(data.items);
    setLoading(false);
  }, [listUrl]);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  const patchProject = async (project: AdminProject, patch: Partial<Pick<AdminProject, "featured" | "published" | "order_index">>) => {
    const response = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      return;
    }

    const saved = (await response.json()) as AdminProject;
    setProjects((current) => current.map((item) => (item.id === saved.id ? saved : item)));
    setToast({ type: "success", message: "Project updated." });
  };

  const deleteProject = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    const response = await fetch(`/api/admin/projects/${deleteTarget.id}`, { method: "DELETE" });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setDeleting(false);
      return;
    }

    setProjects((current) => current.filter((project) => project.id !== deleteTarget.id));
    setToast({ type: "success", message: "Project deleted." });
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <>
      <PageHeading
        title="Projects"
        description="Create, edit, publish, feature, reorder, and manage portfolio project records without changing the public hardcoded project pages."
        action={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add project
          </Link>
        }
      />

      <div className={`${panelClass} mb-5`}>
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, slug, category, or description"
              className={`${inputClass} pl-9`}
            />
          </label>
          <select value={published} onChange={(event) => setPublished(event.target.value)} className={inputClass}>
            <option value="">All publish states</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select value={featured} onChange={(event) => setFeatured(event.target.value)} className={inputClass}>
            <option value="">All feature states</option>
            <option value="featured">Featured</option>
            <option value="standard">Not featured</option>
          </select>
        </div>
      </div>

      <section className={panelClass}>
        {loading ? (
          <SkeletonRows rows={7} />
        ) : projects.length === 0 ? (
          <EmptyState title="No projects found" description="Create a project or adjust the filters to see existing records." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-3 font-semibold">Project</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Order</th>
                  <th className="px-3 py-3 font-semibold">Links</th>
                  <th className="px-3 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {projects.map((project) => (
                  <tr key={project.id} className="align-top">
                    <td className="px-3 py-4">
                      <div className="flex gap-3">
                        <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                          {project.thumbnail_url ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={project.thumbnail_url} alt="" className="h-full w-full object-cover" />
                            </>
                          ) : (
                            <ImageIcon className="h-5 w-5 text-slate-600" aria-hidden="true" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{project.title}</p>
                          <p className="mt-1 font-mono text-xs text-slate-500">/{project.slug}</p>
                          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{project.short_description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="space-y-2 px-3 py-4">
                      <StatusBadge active={project.published} label={project.published ? "Published" : "Draft"} />
                      <StatusBadge active={project.featured} label={project.featured ? "Featured" : "Standard"} />
                    </td>
                    <td className="px-3 py-4">
                      <input
                        type="number"
                        value={project.order_index}
                        onChange={(event) => {
                          const value = Number(event.target.value || 0);
                          setProjects((current) =>
                            current.map((item) => (item.id === project.id ? { ...item, order_index: value } : item)),
                          );
                        }}
                        onBlur={(event) => patchProject(project, { order_index: Number(event.target.value || 0) })}
                        className="w-20 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 font-mono text-xs text-slate-200 outline-none focus:border-emerald-400"
                      />
                    </td>
                    <td className="px-3 py-4 text-xs text-slate-400">
                      {project.live_url ? <p>Live</p> : null}
                      {project.github_url ? <p>GitHub</p> : null}
                      {!project.live_url && !project.github_url ? <p>None</p> : null}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => patchProject(project, { published: !project.published })}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
                          aria-label={project.published ? "Unpublish project" : "Publish project"}
                        >
                          {project.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => patchProject(project, { featured: !project.featured })}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
                          aria-label={project.featured ? "Remove featured" : "Mark featured"}
                        >
                          <Star className={`h-4 w-4 ${project.featured ? "fill-emerald-300 text-emerald-300" : ""}`} />
                        </button>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
                          aria-label="Edit project"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(project)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/30 text-red-200 transition hover:bg-red-400/10"
                          aria-label="Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project?"
        description="This deletes the project record and its stored image URLs from the admin database after confirmation."
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteProject}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
