"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ImagePlus, Loader2, Save, Trash2 } from "lucide-react";
import {
  ConfirmDialog,
  EmptyState,
  PageHeading,
  SkeletonRows,
  Toast,
  type ToastState,
  inputClass,
  panelClass,
  textareaClass,
} from "@/components/admin/AdminUi";
import type { AdminProject, AdminProjectImage } from "@/lib/admin-types";

type ProjectFormValue = Omit<AdminProject, "id" | "created_at" | "updated_at">;

type ProjectWithImages = AdminProject & {
  images: AdminProjectImage[];
};

const emptyProject: ProjectFormValue = {
  title: "",
  slug: "",
  short_description: "",
  long_description: "",
  category: "",
  tech_stack: "",
  thumbnail_url: "",
  live_url: "",
  github_url: "",
  featured: false,
  published: false,
  order_index: 0,
};

const emptyImage = {
  image_url: "",
  alt_text: "",
  order_index: 0,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 255);
}

async function readError(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Request failed with HTTP ${response.status}`;
}

export function ProjectForm({ mode, projectId }: { mode: "create" | "edit"; projectId?: string }) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectFormValue>(emptyProject);
  const [images, setImages] = useState<AdminProjectImage[]>([]);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [imageForm, setImageForm] = useState(emptyImage);
  const [editingImage, setEditingImage] = useState<AdminProjectImage | null>(null);
  const [imageSaving, setImageSaving] = useState(false);
  const [deleteImageTarget, setDeleteImageTarget] = useState<AdminProjectImage | null>(null);

  useEffect(() => {
    if (mode !== "edit" || !projectId) return;

    const loadProject = async () => {
      setLoading(true);
      const response = await fetch(`/api/admin/projects/${projectId}`, { cache: "no-store" });

      if (!response.ok) {
        setToast({ type: "error", message: await readError(response) });
        setLoading(false);
        return;
      }

      const data = (await response.json()) as ProjectWithImages;
      setProject({
        title: data.title,
        slug: data.slug,
        short_description: data.short_description,
        long_description: data.long_description,
        category: data.category,
        tech_stack: data.tech_stack,
        thumbnail_url: data.thumbnail_url,
        live_url: data.live_url,
        github_url: data.github_url,
        featured: data.featured,
        published: data.published,
        order_index: data.order_index,
      });
      setImages(data.images ?? []);
      setLoading(false);
    };

    void loadProject();
  }, [mode, projectId]);

  const updateProjectField = (name: keyof ProjectFormValue, value: string | number | boolean) => {
    setProject((current) => {
      const next = { ...current, [name]: value };
      if (name === "title" && !slugTouched) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  };

  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const response = await fetch(mode === "edit" ? `/api/admin/projects/${projectId}` : "/api/admin/projects", {
      method: mode === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setSaving(false);
      return;
    }

    const saved = (await response.json()) as AdminProject;
    setSaving(false);
    setToast({ type: "success", message: "Project saved." });

    if (mode === "create") {
      router.replace(`/admin/projects/${saved.id}/edit`);
    }
  };

  const startEditImage = (image: AdminProjectImage) => {
    setEditingImage(image);
    setImageForm({
      image_url: image.image_url,
      alt_text: image.alt_text,
      order_index: image.order_index,
    });
  };

  const resetImageForm = () => {
    setEditingImage(null);
    setImageForm(emptyImage);
  };

  const saveImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectId) return;
    setImageSaving(true);

    const response = await fetch(
      editingImage
        ? `/api/admin/projects/${projectId}/images/${editingImage.id}`
        : `/api/admin/projects/${projectId}/images`,
      {
        method: editingImage ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imageForm),
      },
    );

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setImageSaving(false);
      return;
    }

    const saved = (await response.json()) as AdminProjectImage;
    setImages((current) => {
      if (!editingImage) return [...current, saved].sort((a, b) => a.order_index - b.order_index);
      return current.map((item) => (item.id === saved.id ? saved : item)).sort((a, b) => a.order_index - b.order_index);
    });
    setToast({ type: "success", message: editingImage ? "Image updated." : "Image added." });
    setImageSaving(false);
    resetImageForm();
  };

  const deleteImage = async () => {
    if (!deleteImageTarget || !projectId) return;

    const response = await fetch(`/api/admin/projects/${projectId}/images/${deleteImageTarget.id}`, { method: "DELETE" });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      return;
    }

    setImages((current) => current.filter((item) => item.id !== deleteImageTarget.id));
    setToast({ type: "success", message: "Image deleted." });
    setDeleteImageTarget(null);
  };

  if (loading) {
    return (
      <>
        <PageHeading title="Project" description="Loading project details." />
        <SkeletonRows rows={8} />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  return (
    <>
      <PageHeading
        title={mode === "create" ? "New Project" : "Edit Project"}
        description="Manage project fields, publish state, featured state, ordering, and image URLs stored in MySQL."
        action={
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Projects
          </Link>
        }
      />

      <form onSubmit={saveProject} className={`${panelClass} grid gap-4 md:grid-cols-2`}>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          Title
          <input
            value={project.title}
            onChange={(event) => updateProjectField("title", event.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          Slug
          <input
            value={project.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateProjectField("slug", event.target.value);
            }}
            required
            className={inputClass}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          Category
          <input value={project.category} onChange={(event) => updateProjectField("category", event.target.value)} className={inputClass} />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          Order index
          <input
            type="number"
            value={project.order_index}
            onChange={(event) => updateProjectField("order_index", Number(event.target.value || 0))}
            className={inputClass}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
          Short description
          <textarea
            value={project.short_description}
            onChange={(event) => updateProjectField("short_description", event.target.value)}
            required
            className={textareaClass}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
          Long description
          <textarea
            value={project.long_description}
            onChange={(event) => updateProjectField("long_description", event.target.value)}
            className={textareaClass}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300 md:col-span-2">
          Tech stack
          <input
            value={project.tech_stack}
            onChange={(event) => updateProjectField("tech_stack", event.target.value)}
            placeholder="Next.js, TypeScript, MySQL"
            className={inputClass}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          Thumbnail URL
          <input
            value={project.thumbnail_url}
            onChange={(event) => updateProjectField("thumbnail_url", event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          Live URL
          <input value={project.live_url} onChange={(event) => updateProjectField("live_url", event.target.value)} className={inputClass} />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          GitHub URL
          <input
            value={project.github_url}
            onChange={(event) => updateProjectField("github_url", event.target.value)}
            className={inputClass}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex min-h-10 items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={project.published}
              onChange={(event) => updateProjectField("published", event.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900"
            />
            Published
          </label>
          <label className="flex min-h-10 items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={project.featured}
              onChange={(event) => updateProjectField("featured", event.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900"
            />
            Featured
          </label>
        </div>

        <div className="flex justify-end md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
            Save project
          </button>
        </div>
      </form>

      {mode === "edit" && projectId ? (
        <section className={`${panelClass} mt-6`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Project Images</h2>
              <p className="mt-1 text-sm text-slate-400">Store image URLs, alt text, and display order for this project.</p>
            </div>
          </div>

          <form onSubmit={saveImage} className="mt-5 grid gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-4 md:grid-cols-[1fr_1fr_120px_auto]">
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Image URL
              <input
                value={imageForm.image_url}
                onChange={(event) => setImageForm((current) => ({ ...current, image_url: event.target.value }))}
                required
                className={inputClass}
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Alt text
              <input
                value={imageForm.alt_text}
                onChange={(event) => setImageForm((current) => ({ ...current, alt_text: event.target.value }))}
                className={inputClass}
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-300">
              Order
              <input
                type="number"
                value={imageForm.order_index}
                onChange={(event) => setImageForm((current) => ({ ...current, order_index: Number(event.target.value || 0) }))}
                className={inputClass}
              />
            </label>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={imageSaving}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70"
              >
                {imageSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                {editingImage ? "Update" : "Add"}
              </button>
              {editingImage ? (
                <button
                  type="button"
                  onClick={resetImageForm}
                  className="h-10 rounded-lg border border-slate-700 px-3 text-sm font-semibold text-slate-200 hover:bg-slate-900"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>

          <div className="mt-5">
            {images.length === 0 ? (
              <EmptyState title="No images yet" description="Add image URLs for this project when they are ready." />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {images.map((image) => (
                  <div key={image.id} className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                    <div className="flex aspect-video items-center justify-center bg-slate-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.image_url} alt={image.alt_text || ""} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-3 p-4">
                      <div>
                        <p className="truncate text-sm font-semibold text-white">{image.alt_text || "Project image"}</p>
                        <p className="mt-1 font-mono text-xs text-slate-500">Order {image.order_index}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEditImage(image)}
                          className="flex-1 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteImageTarget(image)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-400/30 text-red-200 hover:bg-red-400/10"
                          aria-label="Delete image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteImageTarget)}
        title="Delete image?"
        description="This removes the image URL record from this project after confirmation."
        onCancel={() => setDeleteImageTarget(null)}
        onConfirm={deleteImage}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
