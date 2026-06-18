"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, FileText, Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import {
  getUploadCategoryConfig,
  isImageMime,
  isPdfMime,
  type UploadCategory,
  validateUploadFile,
} from "@/lib/admin-upload";

type AdminFileUploadProps = {
  category: UploadCategory;
  value: string;
  onChange: (url: string) => void;
  onError: (message: string) => void;
  onSuccess?: (url: string) => void;
  currentLinkLabel?: string;
  uploadLabel?: string;
  disabled?: boolean;
};

function inferMimeFromUrl(value: string) {
  const clean = value.split("?")[0]?.split("#")[0]?.toLowerCase() ?? "";
  if (clean.endsWith(".pdf")) return "application/pdf";
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "image/jpeg";
  if (clean.endsWith(".png")) return "image/png";
  if (clean.endsWith(".webp")) return "image/webp";
  return "";
}

function isImagePreview(value: string, mime: string) {
  return isImageMime(mime) || /\.(jpe?g|png|webp)(\?|#|$)/i.test(value);
}

export function AdminFileUpload({
  category,
  value,
  onChange,
  onError,
  onSuccess,
  currentLinkLabel = "View current file",
  uploadLabel = "Upload file",
  disabled = false,
}: AdminFileUploadProps) {
  const config = getUploadCategoryConfig(category);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);
  const [previewMime, setPreviewMime] = useState(inferMimeFromUrl(value));

  useEffect(() => {
    setPreviewUrl(value);
    setPreviewMime(inferMimeFromUrl(value));
  }, [value]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const replaceObjectUrl = (url: string | null) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = url;
  };

  const uploadFile = async (file: File) => {
    const validationError = validateUploadFile(category, file);
    if (validationError) {
      onError(validationError);
      return;
    }

    const localUrl = URL.createObjectURL(file);
    replaceObjectUrl(localUrl);
    setPreviewUrl(localUrl);
    setPreviewMime(file.type);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        onError(data?.error ?? "Upload failed.");
        setPreviewUrl(value);
        setPreviewMime(inferMimeFromUrl(value));
        return;
      }

      const data = (await response.json()) as { url: string };
      replaceObjectUrl(null);
      setPreviewUrl(data.url);
      setPreviewMime(file.type);
      onChange(data.url);
      onSuccess?.(data.url);
    } catch {
      onError("Upload failed. Check your connection and try again.");
      setPreviewUrl(value);
      setPreviewMime(inferMimeFromUrl(value));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled || uploading) return;
    const file = event.dataTransfer.files[0];
    if (file) void uploadFile(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void uploadFile(file);
  };

  const openFileDialog = () => {
    if (!disabled && !uploading) inputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openFileDialog();
  };

  const clearValue = () => {
    replaceObjectUrl(null);
    setPreviewUrl("");
    setPreviewMime("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const hasValue = Boolean(value);
  const isPdf = isPdfMime(previewMime) || previewUrl.toLowerCase().includes(".pdf");
  const imagePreview = previewUrl && isImagePreview(previewUrl, previewMime);

  return (
    <div className="space-y-2">
      {hasValue ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          {currentLinkLabel}
        </a>
      ) : null}

      <div
        role="button"
        tabIndex={disabled || uploading ? -1 : 0}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onClick={openFileDialog}
        onKeyDown={handleKeyDown}
        className={`relative flex min-h-[128px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-4 py-4 text-center transition ${
          disabled || uploading
            ? "cursor-wait border-slate-700 opacity-70"
            : "border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5"
        }`}
      >
        {imagePreview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Uploaded file preview" className="max-h-44 w-full rounded-md object-cover" />
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950/90 px-3 py-1.5 text-xs font-semibold text-slate-200">
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Replace image
            </span>
          </>
        ) : previewUrl || isPdf ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-emerald-300">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-slate-200">{isPdf ? "PDF file selected" : "File selected"}</p>
            <p className="max-w-full break-all font-mono text-[11px] text-slate-500">{value || "Local preview"}</p>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950/90 px-3 py-1.5 text-xs font-semibold text-slate-200">
              <Upload className="h-3.5 w-3.5" aria-hidden="true" />
              Replace file
            </span>
          </div>
        ) : (
          <>
            <Upload className="h-6 w-6 text-slate-500" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-slate-300">{uploadLabel}</p>
              <p className="mt-1 text-xs text-slate-500">Drop a file here or click to browse</p>
              <p className="mt-1 text-[11px] text-slate-600">{config.helperText}</p>
            </div>
          </>
        )}

        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60">
            <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden="true" />
            <span className="ml-2 text-sm font-semibold text-white">Uploading...</span>
          </div>
        ) : null}
      </div>

      {hasValue && !uploading ? (
        <button
          type="button"
          onClick={clearValue}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 underline hover:text-slate-300 disabled:opacity-60"
        >
          <X className="h-3 w-3" aria-hidden="true" />
          Remove file
        </button>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept={config.accept}
        className="hidden"
        disabled={disabled || uploading}
        onChange={handleChange}
      />
    </div>
  );
}
