"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Github,
  ImageIcon,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import {
  ConfirmDialog,
  CountBadge,
  EmptyState,
  PageHeading,
  SkeletonRows,
  StatusBadge,
  Toast,
  type ToastState,
  btnPrimary,
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

  const patchProject = async (
    project: AdminProject,
    patch: Partial<Pick<AdminProject, "featured" | "published" | "order_index">>,
  ) => {
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
        description="Create, edit, publish, feature, reorder, and manage portfolio project records."
        badge={!loading ? <CountBadge count={projects.length} /> : undefined}
        action={
          <Link href="/admin/projects/new" className={btnPrimary}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add project
          </Link>
        }
      />

      {/* Filters */}
      <div className={`${panelClass} mb-5`}>
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, slug, category, or description"
              className={`${inputClass} pl-9`}
            />
          </label>
          <select
            value={published}
            onChange={(event) => setPublished(event.target.value)}
            className={inputClass}
          >
            <option value="">All publish states</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={featured}
            onChange={(event) => setFeatured(event.target.value)}
            className={inputClass}
          >
            <option value="">All feature states</option>
            <option value="featured">Featured</option>
            <option value="standard">Not featured</option>
          </select>
        </div>
      </div>

      {/* Project List */}
      <section className={panelClass}>
        {loading ? (
          <SkeletonRows rows={7} />
        ) : projects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description="Create a project or adjust the filters to see existing records."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800/60 text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-3 font-bold">Project</th>
                  <th className="px-3 py-3 font-bold">Status</th>
                  <th className="px-3 py-3 font-bold">Order</th>
                  <th className="px-3 py-3 font-bold">Links</th>
                  <th className="px-3 py-3 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="group align-top transition-colors hover:bg-slate-900/40"
                  >
                    {/* Project info */}
                    <td className="px-3 py-4">
                      <div className="flex gap-3">
                        <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-800/60 bg-slate-900/60">
                          {project.thumbnail_url ? (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={project.thumbnail_url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </>
                          ) : (
                            <ImageIcon
                              className="h-5 w-5 text-slate-600"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{project.title}</p>
                          <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                            /{project.slug}
                          </p>
                          {project.category ? (
                            <span className="mt-1.5 inline-block rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                              {project.category}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </td>

                    {/* Status badges */}
                    <td className="space-y-1.5 px-3 py-4">
                      <StatusBadge
                        active={project.published}
                        label={project.published ? "Published" : "Draft"}
                      />
                      <br />
                      <StatusBadge
                        active={project.featured}
                        label={project.featured ? "Featured" : "Standard"}
                      />
                    </td>

                    {/* Order index */}
                    <td className="px-3 py-4">
                      <input
                        type="number"
                        value={project.order_index}
                        onChange={(event) => {
                          const value = Number(event.target.value || 0);
                          setProjects((current) =>
                            current.map((item) =>
                              item.id === project.id ? { ...item, order_index: value } : item,
                            ),
                          );
                        }}
                        onBlur={(event) =>
                          patchProject(project, { order_index: Number(event.target.value || 0) })
                        }
                        className="w-20 rounded-lg border border-slate-700/80 bg-slate-900/80 px-2 py-1.5 font-mono text-xs text-slate-200 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20"
                      />
                    </td>

                    {/* Links */}
                    <td className="px-3 py-4">
                      <div className="flex flex-col gap-1">
                        {project.live_url ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-emerald-400 transition hover:text-emerald-300"
                          >
                            <ExternalLink className="h-3 w-3" /> Live
                          </a>
                        ) : null}
                        {project.github_url ? (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-slate-400 transition hover:text-slate-300"
                          >
                            <Github className="h-3 w-3" /> GitHub
                          </a>
                        ) : null}
                        {!project.live_url && !project.github_url ? (
                          <span className="text-xs text-slate-600">None</span>
                        ) : null}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-4">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => patchProject(project, { published: !project.published })}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 text-slate-400 transition hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-white"
                          aria-label={project.published ? "Unpublish project" : "Publish project"}
                          title={project.published ? "Unpublish" : "Publish"}
                        >
                          {project.published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => patchProject(project, { featured: !project.featured })}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 text-slate-400 transition hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-white"
                          aria-label={project.featured ? "Remove featured" : "Mark featured"}
                          title={project.featured ? "Unfeature" : "Feature"}
                        >
                          <Star
                            className={`h-4 w-4 ${project.featured ? "fill-amber-400 text-amber-400" : ""}`}
                          />
                        </button>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 text-slate-400 transition hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-white"
                          aria-label="Edit project"
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(project)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-400/70 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                          aria-label="Delete project"
                          title="Delete"
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
        description={`This deletes "${deleteTarget?.title}" and its stored image URLs from the admin database.`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteProject}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
