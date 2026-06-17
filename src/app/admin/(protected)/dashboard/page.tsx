import { Activity, Award, BriefcaseBusiness, FolderKanban, Settings, Star } from "lucide-react";
import { getDashboardOverview } from "@/lib/admin-repository";
import { isDatabaseError, toSafeDatabaseError } from "@/lib/db";
import { PageHeading, panelClass } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

const cards = [
  { key: "totalProjects", label: "Total projects", icon: FolderKanban },
  { key: "publishedProjects", label: "Published projects", icon: Activity },
  { key: "draftProjects", label: "Draft projects", icon: Settings },
  { key: "featuredProjects", label: "Featured projects", icon: Star },
  { key: "totalSkills", label: "Total skills", icon: Settings },
  { key: "totalExperience", label: "Experience items", icon: BriefcaseBusiness },
  { key: "totalCertificates", label: "Certificates", icon: Award },
] as const;

const dashboardErrorPanelClass =
  "rounded-lg border border-red-500/30 bg-red-500/10 p-5 shadow-xl shadow-black/15";

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
          description="Overview of the admin database content. Public portfolio pages still use the existing hardcoded data."
        />

        <section className={dashboardErrorPanelClass}>
          <p className="text-sm font-semibold text-white">Database connection failed.</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Database connection failed. Check DB_USER and DB_PASSWORD.</p>
          <p className="mt-3 font-mono text-xs text-red-300">{dbError.category}</p>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeading
        title="Dashboard"
        description="Overview of the admin database content. Public portfolio pages still use the existing hardcoded data."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className={panelClass}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{overview[card.key]}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className={`${panelClass} mt-5`}>
        <p className="text-sm font-semibold text-white">Last updated content</p>
        <p className="mt-2 font-mono text-sm text-slate-400">
          {overview.lastUpdatedContent ? new Date(overview.lastUpdatedContent).toLocaleString() : "No database content yet"}
        </p>
      </section>
    </>
  );
}
