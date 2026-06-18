"use client";

import { useEffect, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, Loader2, X } from "lucide-react";

/* ─── Toast ─── */

export type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

export function Toast({
  toast,
  onClose,
  autoDismissMs = 4000,
}: {
  toast: ToastState;
  onClose: () => void;
  autoDismissMs?: number;
}) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, autoDismissMs);
    return () => clearTimeout(timer);
  }, [toast, onClose, autoDismissMs]);

  if (!toast) return null;

  const success = toast.type === "success";

  return (
    <div
      className={`fixed right-4 top-4 z-[180] max-w-sm rounded-xl border p-4 text-sm shadow-2xl shadow-black/40 backdrop-blur-sm transition-all duration-300 ${
        success
          ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-50"
          : "border-red-500/30 bg-red-950/90 text-red-50"
      }`}
    >
      <div className="flex gap-3">
        {success ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
        ) : (
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{success ? "Saved" : "Error"}</p>
          <p className="mt-0.5 break-words text-sm opacity-90">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md opacity-60 transition hover:opacity-100"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ─── Page Layout ─── */

export function PageHeading({
  title,
  description,
  action,
  badge,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-400/80">
          Admin
        </p>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
          {badge}
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {action}
    </div>
  );
}

/* ─── Badges ─── */

export function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
        active
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          : "border-slate-700 bg-slate-800/60 text-slate-500"
      }`}
    >
      <span
        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-400" : "bg-slate-600"
        }`}
      />
      {label}
    </span>
  );
}

export function CountBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-800 px-2 text-xs font-semibold tabular-nums text-slate-400">
      {count}
    </span>
  );
}

/* ─── Confirm Dialog ─── */

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  loading = false,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-slate-700/80 bg-slate-950 p-6 shadow-2xl shadow-black/50">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── States ─── */

export function SkeletonRows({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-xl border border-slate-800/60 bg-slate-900/50"
        />
      ))}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-700/70 bg-slate-900/30 p-10 text-center">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function ErrorState({
  title = "Failed to load",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-8 text-center">
      <AlertTriangle className="mx-auto h-8 w-8 text-red-400" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm text-red-300/80">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

/* ─── Form Section ─── */

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rounded-xl border border-slate-800/70 bg-slate-900/20 p-5">
      <legend className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </legend>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/* ─── Health Warning ─── */

export function HealthWarning({
  warnings,
}: {
  warnings: string[];
}) {
  if (warnings.length === 0) return null;
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-amber-300">
            {warnings.length === 1 ? "1 content issue" : `${warnings.length} content issues`}
          </p>
          <ul className="mt-2 space-y-1">
            {warnings.map((w) => (
              <li key={w} className="text-xs text-amber-200/80">
                · {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Info Panel ─── */

export function InfoPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
      <div className="text-xs leading-relaxed text-blue-200/80">{children}</div>
    </div>
  );
}

/* ─── Sticky Action Bar ─── */

export function StickyActionBar({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="sticky bottom-0 z-30 -mx-4 mt-6 flex items-center justify-end gap-3 border-t border-slate-800/80 bg-slate-950/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {children}
    </div>
  );
}

/* ─── Style tokens ─── */

export const inputClass =
  "w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 hover:border-slate-600";

export const textareaClass = `${inputClass} min-h-32 resize-y`;

export const panelClass =
  "rounded-xl border border-slate-800/70 bg-slate-950/80 p-5 shadow-lg shadow-black/10";

/* ─── Buttons ─── */

export const btnPrimary =
  "inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-400 active:bg-emerald-600 disabled:cursor-wait disabled:opacity-70 shadow-sm shadow-emerald-500/20";

export const btnSecondary =
  "inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-600 disabled:opacity-60";

export const btnDanger =
  "inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:opacity-60";

export const btnGhost =
  "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 disabled:opacity-60";
