"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Award,
  BriefcaseBusiness,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Pencil,
  Settings,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/quick-edit", label: "Quick Edit", icon: Pencil },
      { href: "/admin/content-map", label: "Content Map", icon: Map },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/skills", label: "Skills", icon: Wrench },
      { href: "/admin/experience", label: "Experience", icon: BriefcaseBusiness },
      { href: "/admin/education", label: "Education", icon: GraduationCap },
      { href: "/admin/certificates", label: "Certificates", icon: Award },
    ],
  },
  {
    label: "System",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

function getInitials(label: string): string {
  return label
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

export function AdminShell({ children, userLabel }: { children: ReactNode; userLabel: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const currentPath = pathname ?? "";

  const logout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    router.replace("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) =>
    currentPath === href || currentPath.startsWith(`${href}/`);

  const sidebar = (
    <aside className="flex h-full w-[264px] flex-col border-r border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-950/95 text-slate-100 shadow-2xl shadow-black/30">
      {/* Logo */}
      <div className="flex h-[68px] items-center gap-3 border-b border-slate-800/60 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/10">
          <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-400/80">
            Portfolio
          </p>
          <p className="text-sm font-bold text-white">Admin Console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Admin navigation">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${
                      active
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-100 shadow-sm shadow-emerald-500/5"
                        : "border border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon
                      className={`h-[17px] w-[17px] shrink-0 transition-colors ${
                        active ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"
                      }`}
                      aria-hidden="true"
                    />
                    {item.label}
                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-2 border-t border-slate-800/60 p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 px-3 py-2.5 text-[13px] font-semibold text-slate-300 transition hover:border-emerald-500/30 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Public site
        </a>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2.5 text-[13px] font-bold text-slate-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          {loggingOut ? "Signing out…" : "Logout"}
        </button>
        <p className="text-center text-[10px] font-medium text-slate-700">v1.0.0 · Phase 1</p>
      </div>
    </aside>
  );

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden bg-slate-950 text-slate-100">
      <div className="flex h-full">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">{sidebar}</div>

        {/* Mobile sidebar overlay */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative h-full animate-in slide-in-from-left duration-200">
              {sidebar}
            </div>
          </div>
        ) : null}

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-slate-800/60 bg-slate-950/90 px-4 backdrop-blur-sm lg:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-300 transition hover:border-slate-600 hover:text-white lg:hidden"
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Secure Admin
                </p>
                <p className="text-sm font-semibold text-slate-200">{userLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* DB status indicator */}
              <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <span className="text-[11px] font-semibold text-emerald-300">MySQL connected</span>
              </div>

              {/* User avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-[11px] font-bold text-slate-200">
                {getInitials(userLabel)}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.06),transparent_40%),#0a0f1c]">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
