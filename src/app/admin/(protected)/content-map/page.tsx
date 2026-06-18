import Link from "next/link";
import { CheckCircle2, Database, ExternalLink, FileCode, FolderKanban } from "lucide-react";
import { PageHeading, panelClass } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

type ContentSource = "db" | "static" | "phase2";
type EditLink = { label: string; href: string };

type ContentRow = {
  section: string;
  description: string;
  source: ContentSource;
  file?: string;
  editLinks?: EditLink[];
  note?: string;
};

const contentMap: ContentRow[] = [
  // DB-backed
  {
    section: "Profile - Name, Headline, Bio",
    description: "Your public name, professional headline, and about text.",
    source: "db",
    editLinks: [
      { label: "Settings", href: "/admin/settings" },
      { label: "Quick Edit", href: "/admin/quick-edit" },
    ],
  },
  {
    section: "Profile - Email",
    description: "Contact email shown publicly.",
    source: "db",
    editLinks: [
      { label: "Settings", href: "/admin/settings" },
      { label: "Quick Edit", href: "/admin/quick-edit" },
    ],
  },
  {
    section: "Profile - GitHub / LinkedIn / CV URL",
    description: "Social links and resume URL used in contact, header, and the CV page. CV PDFs can be uploaded from Settings or Quick Edit.",
    source: "db",
    editLinks: [
      { label: "Settings", href: "/admin/settings" },
      { label: "Quick Edit", href: "/admin/quick-edit" },
    ],
  },
  {
    section: "WhatsApp / Instagram / Twitter URLs",
    description: "Social contact links (extended settings, Phase 1 addition).",
    source: "db",
    editLinks: [
      { label: "Settings", href: "/admin/settings" },
      { label: "Quick Edit", href: "/admin/quick-edit" },
    ],
  },
  {
    section: "Footer Text",
    description: "Short description text shown in the public site footer.",
    source: "db",
    editLinks: [
      { label: "Settings", href: "/admin/settings" },
      { label: "Quick Edit", href: "/admin/quick-edit" },
    ],
  },
  {
    section: "Projects",
    description: "Title, description, category, tech stack, thumbnail, live/GitHub URL, publish/featured state.",
    source: "db",
    editLinks: [{ label: "Projects", href: "/admin/projects" }],
  },
  {
    section: "Project Images",
    description: "Gallery images for each project (image URL, alt text, order). Supports file upload while creating or editing projects.",
    source: "db",
    editLinks: [{ label: "Projects", href: "/admin/projects" }],
    note: "Edit inside each project's edit page in the Project Images section.",
  },
  {
    section: "Skills",
    description: "Skill names, categories, visibility, and display order.",
    source: "db",
    editLinks: [{ label: "Skills", href: "/admin/skills" }],
  },
  {
    section: "Experience",
    description: "Company, role, location, dates, description, stack, and visibility.",
    source: "db",
    editLinks: [{ label: "Experience", href: "/admin/experience" }],
  },
  {
    section: "Education",
    description: "School, degree, location, dates, and visibility.",
    source: "db",
    editLinks: [{ label: "Education", href: "/admin/education" }],
  },
  {
    section: "Certificates",
    description: "Certificate title, issuer, date, uploaded file or URL, and visibility.",
    source: "db",
    editLinks: [{ label: "Certificates", href: "/admin/certificates" }],
  },

  // Static / i18n
  {
    section: "Hero Headline & Subtitle",
    description: "The main heading and subheading on the homepage hero section.",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "English keys: dict.en.headline, dict.en.sub",
  },
  {
    section: "CTA Button Labels",
    description: "Labels for main action buttons (View Work, Download CV, Let's Talk).",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "English keys: dict.en.cta1, dict.en.cta2, dict.en.cta3",
  },
  {
    section: "Navigation Labels",
    description: "Navigation bar link text (About, Projects, Experience, etc.).",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "English keys: dict.en.nav",
  },
  {
    section: "About Section Story",
    description: "The story paragraphs in the About section.",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "English keys: dict.en.about.story",
  },
  {
    section: "Contact Section Copy",
    description: "Contact section heading, availability text, channel descriptions.",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "English keys: dict.en.contact",
  },
  {
    section: "Skills Section Copy",
    description: "Skills section headings, AI workflow section, category summaries.",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "English keys: dict.en.skills",
  },
  {
    section: "Hero Proof Strip / Trusted-By",
    description: "The proof strip below the hero CTA and 'Trusted by' logos.",
    source: "static",
    file: "src/data/profile.ts",
    note: "Keys: PROFILE.hero.proofStrip, PROFILE.hero.trustedBy",
  },
  {
    section: "Contact Channels (display values)",
    description: "Phone number display, WhatsApp URL used in About/Contact sections.",
    source: "static",
    file: "src/data/profile.ts",
    note: "Keys: PROFILE.contact.channels. Also update PROFILE.socials.whatsapp.",
  },
  {
    section: "Founder / Kolaytec Section",
    description: "Kolaytec case study panel text and links.",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "English keys: dict.en.founder",
  },
  {
    section: "Project CTA Panel",
    description: "The call-to-action panel at the bottom of the projects section.",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "Keys: dict.en.projectCta — includes email and WhatsApp display href",
  },
  {
    section: "Footer 'Built With' text",
    description: "The technology attribution text in the footer.",
    source: "static",
    file: "src/lib/i18n.ts",
    note: "Keys: dict.en.footer.builtWith",
  },

  // Phase 2
  {
    section: "FAQ / Services / Pricing",
    description: "Not currently in the codebase as editable content.",
    source: "phase2",
    note: "Phase 2: requires new DB tables, API routes, and public page wiring.",
  },
  {
    section: "Chatbot / Quick Chips",
    description: "Chatbot reply chips or quick action shortcuts.",
    source: "phase2",
    note: "Phase 2: requires new DB tables and chatbot integration.",
  },
  {
    section: "Locations / Places",
    description: "Editable location/branch data.",
    source: "phase2",
    note: "Phase 2: requires new DB tables.",
  },
];

const sourceConfig = {
  db: {
    label: "MySQL DB",
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  static: {
    label: "Static file",
    icon: FileCode,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400",
  },
  phase2: {
    label: "Phase 2",
    icon: FolderKanban,
    color: "text-slate-500",
    bg: "bg-slate-800/40 border-slate-700/40",
    dot: "bg-slate-600",
  },
};

export default function ContentMapPage() {
  const dbRows = contentMap.filter((r) => r.source === "db");
  const staticRows = contentMap.filter((r) => r.source === "static");
  const phase2Rows = contentMap.filter((r) => r.source === "phase2");

  return (
    <>
      <PageHeading
        title="Content Map"
        description="Accurate overview of where every public website section comes from and how to edit it."
      />

      {/* Legend */}
      <div className={`${panelClass} mb-6 flex flex-wrap items-center gap-4`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Legend:</p>
        {(["db", "static", "phase2"] as const).map((key) => {
          const cfg = sourceConfig[key];
          return (
            <div key={key} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
              <span className="text-[13px] font-medium text-slate-300">{cfg.label}</span>
            </div>
          );
        })}
      </div>

      {/* DB-backed section */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Database className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-emerald-400">MySQL Database - Editable from Admin</h2>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-800/70">
          <table className="min-w-full divide-y divide-slate-800/60 text-sm">
            <thead>
              <tr className="bg-slate-900/60">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Section</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">Description</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Edit In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 bg-slate-950/50">
              {dbRows.map((row) => (
                <tr key={row.section} className="transition hover:bg-slate-900/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <p className="font-semibold text-white">{row.section}</p>
                    </div>
                    {row.note && <p className="mt-0.5 pl-5 text-[11px] text-slate-500">{row.note}</p>}
                  </td>
                  <td className="hidden px-4 py-3 text-[13px] text-slate-400 md:table-cell">{row.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {row.editLinks?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[12px] font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Static file section */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <FileCode className="h-4 w-4 text-blue-400" />
          <h2 className="text-sm font-bold text-blue-400">Static Files - Edit in code editor</h2>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-800/70">
          <table className="min-w-full divide-y divide-slate-800/60 text-sm">
            <thead>
              <tr className="bg-slate-900/60">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Section</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">File</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Keys</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 bg-slate-950/50">
              {staticRows.map((row) => (
                <tr key={row.section} className="transition hover:bg-slate-900/40">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-200">{row.section}</p>
                    <p className="mt-0.5 text-[12px] text-slate-500 md:hidden font-mono">{row.file}</p>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="font-mono text-[12px] text-blue-300">{row.file}</span>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span className="font-mono text-[11px] text-slate-500">{row.note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-500">
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Open these files in VS Code to edit static content. Changes require a redeploy or dev server restart.</span>
        </div>
      </section>

      {/* Phase 2 section */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <FolderKanban className="h-4 w-4 text-slate-500" />
          <h2 className="text-sm font-bold text-slate-500">Phase 2 - Not Yet Admin-Editable</h2>
        </div>
        <div className="space-y-2">
          {phase2Rows.map((row) => (
            <div key={row.section} className="flex items-start gap-3 rounded-xl border border-slate-800/40 bg-slate-900/20 px-4 py-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-700" />
              <div>
                <p className="text-[13px] font-semibold text-slate-400">{row.section}</p>
                <p className="mt-0.5 text-[12px] text-slate-600">{row.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
