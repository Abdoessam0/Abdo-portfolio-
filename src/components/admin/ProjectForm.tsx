"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ImagePlus, Loader2, Save, Trash2, Upload } from "lucide-react";
import {
  ConfirmDialog,
  EmptyState,
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
import type { AdminProject, AdminProjectImage } from "@/lib/admin-types";

type ProjectFormValue = Omit<AdminProject, "id" | "created_at" | "updated_at">;

type ProjectWithImages = AdminProject & {
  images: AdminProjectImage[];
};

type ProjectImageItem = AdminProjectImage & {
  staged?: boolean;
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

function formValueFromProject(project: AdminProject): ProjectFormValue {
  return {
    title: project.title,
    slug: project.slug,
    short_description: project.short_description,
    long_description: project.long_description,
    category: project.category,
    tech_stack: project.tech_stack,
    thumbnail_url: project.thumbnail_url,
    live_url: project.live_url,
    github_url: project.github_url,
    featured: project.featured,
    published: project.published,
    order_index: project.order_index,
  };
}

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
  const [savedProject, setSavedProject] = useState<ProjectFormValue>(emptyProject);
  const [images, setImages] = useState<ProjectImageItem[]>([]);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [imageForm, setImageForm] = useState(emptyImage);
  const [imageUploadMode, setImageUploadMode] = useState<"url" | "upload">("url");
  const [editingImage, setEditingImage] = useState<ProjectImageItem | null>(null);
  const [imageSaving, setImageSaving] = useState(false);
  const [deleteImageTarget, setDeleteImageTarget] = useState<ProjectImageItem | null>(null);
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(false);

  const isDirty = JSON.stringify(project) !== JSON.stringify(savedProject) || (mode === "create" && images.length > 0);

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
      const fv = formValueFromProject(data);
      setProject(fv);
      setSavedProject(fv);
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

    if (mode === "create" && images.length > 0) {
      const attachedImages: ProjectImageItem[] = [];

      for (const image of images) {
        const imageResponse = await fetch(`/api/admin/projects/${saved.id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: image.image_url,
            alt_text: image.alt_text,
            order_index: image.order_index,
          }),
        });

        if (!imageResponse.ok) {
          setSaving(false);
          setToast({
            type: "error",
            message: `Project saved, but an image could not be attached: ${await readError(imageResponse)}`,
          });
          router.replace(`/admin/projects/${saved.id}/edit`);
          return;
        }

        attachedImages.push((await imageResponse.json()) as AdminProjectImage);
      }

      setImages(attachedImages);
    }

    const fv = formValueFromProject(saved);
    setProject(fv);
    setSavedProject(fv);
    setSaving(false);
    setToast({ type: "success", message: mode === "create" && images.length > 0 ? "Project and images saved." : "Project saved." });

    if (mode === "create") {
      router.replace(`/admin/projects/${saved.id}/edit`);
    }
  };

  const deleteCurrentProject = async () => {
    if (!projectId) return;
    setDeletingProject(true);

    const response = await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setDeletingProject(false);
      return;
    }

    setToast({ type: "success", message: "Project deleted." });
    setDeletingProject(false);
    setDeleteProjectOpen(false);
    router.replace("/admin/projects");
  };

  const startEditImage = (image: ProjectImageItem) => {
    setEditingImage(image);
    setImageForm({
      image_url: image.image_url,
      alt_text: image.alt_text,
      order_index: image.order_index,
    });
    setImageUploadMode("url");
  };

  const resetImageForm = () => {
    setEditingImage(null);
    setImageForm(emptyImage);
    setImageUploadMode("url");
  };

  const saveImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageForm.image_url.trim()) {
      setToast({ type: "error", message: "Image URL is required. Upload a file or enter a URL." });
      return;
    }

    if (mode === "create") {
      const stagedImage: ProjectImageItem = {
        id: editingImage?.id ?? -Date.now(),
        project_id: 0,
        image_url: imageForm.image_url,
        alt_text: imageForm.alt_text,
        order_index: imageForm.order_index,
        created_at: null,
        updated_at: null,
        staged: true,
      };

      setImages((current) => {
        if (editingImage) {
          return current.map((item) => (item.id === editingImage.id ? stagedImage : item)).sort((a, b) => a.order_index - b.order_index);
        }

        return [...current, stagedImage].sort((a, b) => a.order_index - b.order_index);
      });

      if (!project.thumbnail_url.trim()) {
        updateProjectField("thumbnail_url", imageForm.image_url);
      }

      setToast({ type: "success", message: editingImage ? "Image updated. Save the project to keep it." : "Image staged. Save the project to attach it." });
      resetImageForm();
      return;
    }

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
    if (!deleteImageTarget) return;

    if (deleteImageTarget.staged || mode === "create") {
      setImages((current) => current.filter((item) => item.id !== deleteImageTarget.id));
      setToast({ type: "success", message: "Staged image removed." });
      setDeleteImageTarget(null);
      return;
    }

    if (!projectId) return;

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

      <form id="project-form" onSubmit={saveProject} className={`${panelClass} grid gap-4 md:grid-cols-2`}>
        <label className="space-y-2 text-sm font-medium text-slate-300">
          Title <span className="text-red-400">*</span>
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
          Short description <span className="text-red-400">*</span>
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
        <div className="space-y-3 text-sm font-medium text-slate-300">
          <label className="block space-y-2">
            <span>Thumbnail URL</span>
            <input
              value={project.thumbnail_url}
              onChange={(event) => updateProjectField("thumbnail_url", event.target.value)}
              placeholder="/uploads/projects/image.jpg or https://..."
              className={inputClass}
            />
          </label>
          <AdminFileUpload
            category="projects"
            value={project.thumbnail_url}
            onChange={(url) => updateProjectField("thumbnail_url", url)}
            onError={(message) => setToast({ type: "error", message })}
            onSuccess={() => setToast({ type: "success", message: "Project image uploaded. Save the project to keep this thumbnail URL." })}
            uploadLabel="Upload project thumbnail"
            currentLinkLabel="View current thumbnail"
            disabled={saving}
          />
        </div>
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

        {/* Delete project */}
        <div className="md:col-span-2">
          {mode === "edit" ? (
            <button
              type="button"
              onClick={() => setDeleteProjectOpen(true)}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-400/10 disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete project
            </button>
          ) : null}
        </div>

        {/* Sticky save bar */}
        <div className="md:col-span-2">
          <StickyActionBar>
            {isDirty && (
              <span className="mr-auto text-xs text-amber-400">Unsaved changes</span>
            )}
            <Link href="/admin/projects" className={btnSecondary}>
              Cancel
            </Link>
            <button
              id="project-save-btn"
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-400 active:bg-emerald-600 disabled:cursor-wait disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              {saving ? "Saving…" : mode === "edit" ? "Save Changes" : "Save Project"}
            </button>
          </StickyActionBar>
        </div>
      </form>

      {/* Project Images */}
      {mode === "edit" || mode === "create" ? (
        <section className={`${panelClass} mt-6`}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Project Images</h2>
            <p className="mt-1 text-sm text-slate-400">
              {mode === "create"
                ? "Upload or enter image URLs now. They will be attached when you save the new project."
                : "Upload images from your device or enter image URLs. Images are stored in the DB and displayed on the public project page."}
            </p>
          </div>

          {/* Image input form */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="mb-3 flex gap-2 text-sm">
              <button
                type="button"
                onClick={() => setImageUploadMode("url")}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${imageUploadMode === "url" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-500 hover:text-slate-300"}`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setImageUploadMode("upload")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition ${imageUploadMode === "upload" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-500 hover:text-slate-300"}`}
              >
                <Upload className="h-3.5 w-3.5" />
                Upload from device
              </button>
            </div>

            <form onSubmit={saveImage} className="grid gap-4 md:grid-cols-[1fr_1fr_120px_auto]">
              <div className="space-y-2 text-sm font-medium text-slate-300">
                {imageUploadMode === "url" ? (
                  <>
                    Image URL
                    <input
                      value={imageForm.image_url}
                      onChange={(event) => setImageForm((current) => ({ ...current, image_url: event.target.value }))}
                      placeholder="/uploads/projects/image.jpg or https://..."
                      className={inputClass}
                    />
                  </>
                ) : (
                  <>
                    Upload image
                    <AdminFileUpload
                      category="projects"
                      value={imageForm.image_url}
                      onChange={(url) => setImageForm((current) => ({ ...current, image_url: url }))}
                      onError={(message) => setToast({ type: "error", message })}
                      onSuccess={() => setToast({ type: "success", message: "Image uploaded. Add it below to keep it with this project." })}
                      uploadLabel="Upload project image"
                      currentLinkLabel="View selected image"
                      disabled={imageSaving || saving}
                    />
                    {imageForm.image_url && (
                      <p className="mt-1 break-all font-mono text-[11px] text-emerald-400">Selected: {imageForm.image_url}</p>
                    )}
                  </>
                )}
              </div>
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
                  id="image-add-btn"
                  type="submit"
                  disabled={imageSaving || !imageForm.image_url.trim()}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-bold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {imageSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                  {imageSaving ? "Saving…" : editingImage ? "Update" : "Add"}
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
          </div>

          {/* Images grid */}
          <div className="mt-5">
            {images.length === 0 ? (
              <EmptyState title="No images yet" description="Upload a file or add an image URL above." />
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
                        <p className="mt-1 font-mono text-xs text-slate-500 break-all">{image.image_url}</p>
                        <p className="mt-0.5 font-mono text-xs text-slate-600">
                          Order {image.order_index}
                          {image.staged ? " - staged until project save" : ""}
                        </p>
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
        open={deleteProjectOpen}
        title="Delete project?"
        description={`This deletes "${project.title || "this project"}" and its stored image URLs from MySQL.`}
        loading={deletingProject}
        onCancel={() => setDeleteProjectOpen(false)}
        onConfirm={deleteCurrentProject}
      />
      <ConfirmDialog
        open={Boolean(deleteImageTarget)}
        title={deleteImageTarget?.staged ? "Remove staged image?" : "Delete image?"}
        description={deleteImageTarget?.staged ? "This removes the staged image from the new project form." : "This removes the image URL record from this project after confirmation."}
        onCancel={() => setDeleteImageTarget(null)}
        onConfirm={deleteImage}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
