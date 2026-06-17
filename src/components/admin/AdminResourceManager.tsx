"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
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
  textareaClass,
} from "@/components/admin/AdminUi";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "date" | "url";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  fullWidth?: boolean;
};

export type ResourceManagerConfig = {
  title: string;
  description: string;
  endpoint: string;
  createLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  searchPlaceholder: string;
  fields: FieldConfig[];
  titleField: string;
  subtitleFields: string[];
  statusField?: string;
  categoryFilter?: {
    field: string;
    options: string[];
  };
};

type ResourceItem = Record<string, string | number | boolean | null | undefined> & {
  id: number;
};

function emptyForm(fields: FieldConfig[]) {
  return fields.reduce<Record<string, string | number | boolean>>((result, field) => {
    if (field.type === "checkbox") result[field.name] = true;
    else if (field.type === "number") result[field.name] = 0;
    else result[field.name] = "";
    return result;
  }, {});
}

function formFromItem(fields: FieldConfig[], item: ResourceItem) {
  const form = emptyForm(fields);

  for (const field of fields) {
    const value = item[field.name];
    if (field.type === "checkbox") form[field.name] = Boolean(value);
    else if (field.type === "number") form[field.name] = Number(value ?? 0);
    else form[field.name] = value === null || value === undefined ? "" : String(value);
  }

  return form;
}

async function readError(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Request failed with HTTP ${response.status}`;
}

function sortByOrder(items: ResourceItem[]) {
  return [...items].sort((left, right) => {
    const orderDelta = Number(left.order_index ?? 0) - Number(right.order_index ?? 0);
    return orderDelta !== 0 ? orderDelta : Number(left.id) - Number(right.id);
  });
}

export function AdminResourceManager({ config }: { config: ResourceManagerConfig }) {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [toast, setToast] = useState<ToastState>(null);
  const [editing, setEditing] = useState<ResourceItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ResourceItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string | number | boolean>>(() => emptyForm(config.fields));

  const listUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (config.categoryFilter && category) params.set("category", category);
    const query = params.toString();
    return query ? `${config.endpoint}?${query}` : config.endpoint;
  }, [category, config.categoryFilter, config.endpoint, search]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const response = await fetch(listUrl, { cache: "no-store" });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setLoading(false);
      return;
    }

    const data = (await response.json()) as { items: ResourceItem[] };
    setItems(data.items);
    setLoading(false);
  }, [listUrl]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm(config.fields));
    setModalOpen(true);
  };

  const openEdit = (item: ResourceItem) => {
    setEditing(item);
    setForm(formFromItem(config.fields, item));
    setModalOpen(true);
  };

  const saveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const response = await fetch(editing ? `${config.endpoint}/${editing.id}` : config.endpoint, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setSaving(false);
      return;
    }

    const saved = (await response.json()) as ResourceItem;
    setItems((current) => {
      if (!editing) return sortByOrder([saved, ...current]);
      return sortByOrder(current.map((item) => (item.id === saved.id ? saved : item)));
    });
    setToast({ type: "success", message: editing ? "Item updated." : "Item created." });
    setSaving(false);
    setModalOpen(false);
    setEditing(null);
  };

  const deleteItem = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    const response = await fetch(`${config.endpoint}/${deleteTarget.id}`, { method: "DELETE" });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      setDeleting(false);
      return;
    }

    setItems((current) => current.filter((item) => item.id !== deleteTarget.id));
    setToast({ type: "success", message: "Item deleted." });
    setDeleting(false);
    setDeleteTarget(null);
  };

  const toggleStatus = async (item: ResourceItem) => {
    if (!config.statusField) return;

    const payload = { ...item, [config.statusField]: !Boolean(item[config.statusField]) };
    const response = await fetch(`${config.endpoint}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setToast({ type: "error", message: await readError(response) });
      return;
    }

    const saved = (await response.json()) as ResourceItem;
    setItems((current) => current.map((entry) => (entry.id === saved.id ? saved : entry)));
    setToast({ type: "success", message: Boolean(saved[config.statusField]) ? "Item is visible." : "Item is hidden." });
  };

  const updateField = (field: FieldConfig, value: string | boolean) => {
    setForm((current) => ({
      ...current,
      [field.name]: field.type === "number" ? Number(value || 0) : value,
    }));
  };

  return (
    <>
      <PageHeading
        title={config.title}
        description={config.description}
        action={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {config.createLabel}
          </button>
        }
      />

      <div className={`${panelClass} mb-5`}>
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={config.searchPlaceholder}
              className={`${inputClass} pl-9`}
            />
          </label>
          {config.categoryFilter ? (
            <select value={category} onChange={(event) => setCategory(event.target.value)} className={inputClass}>
              <option value="">All categories</option>
              {config.categoryFilter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </div>

      <section className={panelClass}>
        {loading ? (
          <SkeletonRows rows={6} />
        ) : items.length === 0 ? (
          <EmptyState title={config.emptyTitle} description={config.emptyDescription} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-3 font-semibold">Item</th>
                  <th className="px-3 py-3 font-semibold">Order</th>
                  {config.statusField ? <th className="px-3 py-3 font-semibold">Status</th> : null}
                  <th className="px-3 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {items.map((item) => {
                  const subtitle = config.subtitleFields
                    .map((field) => item[field])
                    .filter(Boolean)
                    .join(" - ");
                  const visible = config.statusField ? Boolean(item[config.statusField]) : true;

                  return (
                    <tr key={item.id} className="align-top">
                      <td className="px-3 py-4">
                        <p className="font-semibold text-white">{String(item[config.titleField] ?? "Untitled")}</p>
                        {subtitle ? <p className="mt-1 max-w-2xl text-sm text-slate-400">{subtitle}</p> : null}
                      </td>
                      <td className="px-3 py-4 font-mono text-xs text-slate-400">{String(item.order_index ?? 0)}</td>
                      {config.statusField ? (
                        <td className="px-3 py-4">
                          <StatusBadge active={visible} label={visible ? "Visible" : "Hidden"} />
                        </td>
                      ) : null}
                      <td className="px-3 py-4">
                        <div className="flex justify-end gap-2">
                          {config.statusField ? (
                            <button
                              type="button"
                              onClick={() => toggleStatus(item)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
                              aria-label={visible ? "Hide item" : "Show item"}
                            >
                              {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
                            aria-label="Edit item"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/30 text-red-200 transition hover:bg-red-400/10"
                            aria-label="Delete item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen ? (
        <div className="fixed inset-0 z-[160] overflow-y-auto bg-black/70 px-4 py-8">
          <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-700 bg-slate-950 p-5 shadow-2xl shadow-black/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{editing ? "Edit item" : config.createLabel}</h2>
                <p className="mt-1 text-sm text-slate-400">Required fields are validated before saving.</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-900"
              >
                Close
              </button>
            </div>

            <form onSubmit={saveItem} className="mt-5 grid gap-4 md:grid-cols-2">
              {config.fields.map((field) => (
                <label
                  key={field.name}
                  className={`space-y-2 text-sm font-medium text-slate-300 ${field.fullWidth || field.type === "textarea" ? "md:col-span-2" : ""}`}
                >
                  {field.label}
                  {field.type === "textarea" ? (
                    <textarea
                      value={String(form[field.name] ?? "")}
                      onChange={(event) => updateField(field, event.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className={textareaClass}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={String(form[field.name] ?? "")}
                      onChange={(event) => updateField(field, event.target.value)}
                      required={field.required}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {(field.options ?? []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <span className="flex min-h-10 items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.name])}
                        onChange={(event) => updateField(field, event.target.checked)}
                        className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-300"
                      />
                      <span className="text-sm text-slate-300">Enabled</span>
                    </span>
                  ) : (
                    <input
                      type={field.type}
                      value={String(form[field.name] ?? "")}
                      onChange={(event) => updateField(field, event.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className={inputClass}
                    />
                  )}
                </label>
              ))}

              <div className="flex justify-end gap-3 md:col-span-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 disabled:cursor-wait disabled:opacity-70"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                  {editing ? "Save Changes" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete item?"
        description="This action removes the item from the admin database after confirmation."
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteItem}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
