import Link from "next/link";
import {
  Activity,
  Award,
  BriefcaseBusiness,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  MapIcon,
  Pencil,
  Settings,
  Star,
  Wrench,
} from "lucide-react";
import { getDashboardOverview } from "@/lib/admin-repository";
import { isDatabaseError, toSafeDatabaseError } from "@/lib/db";
import { HealthWarning, PageHeading, panelClass } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

const dashboardErrorPanelClass =
  "rounded-xl border border-red-500/30 bg-red-500/5 p-5 shadow-lg shadow-black/10";

function formatDate(iso: string | null): string {
  if (!iso) return "No content yet";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function DashboardPage() {
  let overview: Awaited<ReturnType<typeof getDashboardOverview>>;

  try {
    overview = await getDashboardOverview();
  } catch (error) {
    if (!isDatabaseError(error)) {
      throw error;
    }

    const dbError = toSafeDatabaseError(error);
    console.error(`[admin-dashboard] code=${dbError.originalCode} category=${dbError.category}`);

    return (
      <>
        <PageHeading
          title="Dashboard"
          description="Overview of the admin database content used by the public portfolio data layer."
        />
        <section className={dashboardErrorPanelClass}>
          <h2 className="text-sm font-bold text-white">Database connection failed.</h2>
          <p className="mt-2 text-sm text-slate-300">Check DB_USER and DB_PASSWORD in your environment.</p>
          <p className="mt-3 font-mono text-xs text-red-300">{dbError.category}</p>
        </section>
      </>
    );
  }

  // Build health warnings
  const warnings: string[] = [];
  if (!overview.profileName) warnings.push("Profile name is not set — edit in Settings.");
  if (!overview.profileHeadline) warnings.push("Profile headline is empty — edit in Settings.");
  if (!overview.profileEmail) warnings.push("Contact email is missing — edit in Settings.");
  if (!overview.profileCvUrl) warnings.push("CV / Resume URL is not set — edit in Settings.");
  if (overview.hiddenSkills > 0)
    warnings.push(`${overview.hiddenSkills} skill${overview.hiddenSkills > 1 ? "s are" : " is"} hidden from the public.`);
  if (overview.hiddenExperience > 0)
    warnings.push(`${overview.hiddenExperience} experience item${overview.hiddenExperience > 1 ? "s are" : " is"} hidden from the public.`);
  if (overview.draftProjects > 0)
    warnings.push(`${overview.draftProjects} project${overview.draftProjects > 1 ? "s are" : " is"} in draft — not visible publicly.`);

  return (
    <>
      <PageHeading
        title="Dashboard"
        description="Overview of admin-managed content and quick links to edit key sections."
      />

      {/* Health warnings */}
      {warnings.length > 0 && (
        <div className="mb-6">
          <HealthWarning warnings={warnings} />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Projects */}
        <div className={`group ${panelClass} transition-all duration-200 hover:border-slate-700/80`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">Projects</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-white">{overview.totalProjects}</p>
              <p className="mt-1 text-xs text-emerald-400">{overview.publishedProjects} published</p>
              <p className="text-xs text-slate-500">{overview.draftProjects} draft · {overview.featuredProjects} featured</p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
              <FolderKanban className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            </div>
          </div>
          <Link href="/admin/projects" className="mt-4 block text-[12px] font-semibold text-emerald-400 hover:text-emerald-300">
            Manage →
          </Link>
        </div>

        {/* Skills */}
        <div className={`group ${panelClass} transition-all duration-200 hover:border-slate-700/80`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">Skills</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-white">{overview.totalSkills}</p>
              {overview.hiddenSkills > 0 ? (
                <p className="mt-1 text-xs text-amber-400">{overview.hiddenSkills} hidden</p>
              ) : (
                <p className="mt-1 text-xs text-emerald-400">All visible</p>
              )}
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
              <Wrench className="h-5 w-5 text-cyan-400" aria-hidden="true" />
            </div>
          </div>
          <Link href="/admin/skills" className="mt-4 block text-[12px] font-semibold text-cyan-400 hover:text-cyan-300">
            Manage →
          </Link>
        </div>

        {/* Experience */}
        <div className={`group ${panelClass} transition-all duration-200 hover:border-slate-700/80`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">Experience</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-white">{overview.totalExperience}</p>
              {overview.hiddenExperience > 0 ? (
                <p className="mt-1 text-xs text-amber-400">{overview.hiddenExperience} hidden</p>
              ) : (
                <p className="mt-1 text-xs text-emerald-400">All visible</p>
              )}
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
              <BriefcaseBusiness className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
          </div>
          <Link href="/admin/experience" className="mt-4 block text-[12px] font-semibold text-blue-400 hover:text-blue-300">
            Manage →
          </Link>
        </div>

        {/* Certificates */}
        <div className={`group ${panelClass} transition-all duration-200 hover:border-slate-700/80`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">Certificates</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-white">{overview.totalCertificates}</p>
              <p className="mt-1 text-xs text-slate-500">{overview.totalEducation} education records</p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
              <Award className="h-5 w-5 text-rose-400" aria-hidden="true" />
            </div>
          </div>
          <Link href="/admin/certificates" className="mt-4 block text-[12px] font-semibold text-rose-400 hover:text-rose-300">
            Manage →
          </Link>
        </div>
      </div>

      {/* Profile status + Quick actions */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Profile Status */}
        <section className={panelClass}>
          <h2 className="mb-3 text-sm font-bold text-white">Profile Status</h2>
          <div className="space-y-2">
            {[
              { label: "Name", value: overview.profileName || "—", ok: !!overview.profileName },
              { label: "Headline", value: overview.profileHeadline || "—", ok: !!overview.profileHeadline },
              { label: "Email", value: overview.profileEmail || "—", ok: !!overview.profileEmail },
              { label: "CV URL", value: overview.profileCvUrl ? "Set" : "—", ok: !!overview.profileCvUrl },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/40 px-4 py-2.5"
              >
                <span className="text-[13px] text-slate-400">{row.label}</span>
                <span className={`max-w-[180px] truncate text-right text-[13px] font-medium ${row.ok ? "text-slate-200" : "text-amber-400"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/admin/settings"
            className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <Settings className="h-3.5 w-3.5" />
            Edit in Settings
          </Link>
        </section>

        {/* Quick Actions */}
        <section className={panelClass}>
          <h2 className="mb-3 text-sm font-bold text-white">Quick Actions</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { href: "/admin/quick-edit", label: "Quick Edit", icon: Pencil, accent: "emerald" },
              { href: "/admin/projects/new", label: "New Project", icon: FolderKanban, accent: "violet" },
              { href: "/admin/skills", label: "Manage Skills", icon: Wrench, accent: "cyan" },
              { href: "/admin/experience", label: "Experience", icon: BriefcaseBusiness, accent: "blue" },
              { href: "/admin/education", label: "Education", icon: GraduationCap, accent: "indigo" },
              { href: "/admin/settings", label: "Settings", icon: Settings, accent: "slate" },
              { href: "/admin/content-map", label: "Content Map", icon: MapIcon, accent: "amber" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-[13px] font-semibold text-slate-200 transition hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-white"
                >
                  <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  {action.label}
                </Link>
              );
            })}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-slate-800/60 bg-slate-900/40 px-4 py-3 text-[13px] font-semibold text-slate-200 transition hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-white"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              View Public Site
            </a>
          </div>
        </section>
      </div>

      {/* System Status */}
      <div className="mt-6">
        <section className={panelClass}>
          <h2 className="mb-3 text-sm font-bold text-white">System Status</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/40 px-4 py-3">
              <span className="text-[13px] text-slate-300">MySQL Connection</span>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/40 px-4 py-3">
              <span className="text-[13px] text-slate-300">Last Updated</span>
              <span className="font-mono text-[12px] text-slate-400">
                {formatDate(overview.lastUpdatedContent)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/40 px-4 py-3">
              <span className="text-[13px] text-slate-300">Public Pages</span>
              <span className="text-[13px] font-semibold text-emerald-400">DB + fallback</span>
            </div>
          </div>
        </section>
      </div>

      {/* Content overview stats row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Published Projects", value: overview.publishedProjects, icon: Activity, color: "text-emerald-400" },
          { label: "Draft Projects", value: overview.draftProjects, icon: FolderKanban, color: "text-amber-400" },
          { label: "Featured", value: overview.featuredProjects, icon: Star, color: "text-violet-400" },
          { label: "Education", value: overview.totalEducation, icon: GraduationCap, color: "text-indigo-400" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`flex items-center gap-3 ${panelClass}`}>
              <Icon className={`h-5 w-5 shrink-0 ${item.color}`} aria-hidden="true" />
              <div>
                <p className="text-xl font-bold tabular-nums text-white">{item.value}</p>
                <p className="text-[11px] text-slate-500">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard nav links */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/quick-edit"
          className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[13px] font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
        >
          <LayoutDashboard className="h-4 w-4" />
          Quick Edit
        </Link>
        <Link
          href="/admin/content-map"
          className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-[13px] font-semibold text-amber-300 transition hover:bg-amber-500/20"
        >
          <MapIcon className="h-4 w-4" />
          Content Map
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-[13px] font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Public Site
        </a>
      </div>
    </>
  );
}
