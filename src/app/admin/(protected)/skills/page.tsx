import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

const categories = ["Frontend", "Backend", "Database", "DevOps", "AI / Computer Vision", "Tools", "Other"];

export default function SkillsPage() {
  return (
    <AdminResourceManager
      config={{
        title: "Skills",
        description: "Add, edit, show, hide, filter, and reorder skills stored in MySQL.",
        endpoint: "/api/admin/skills",
        createLabel: "Add skill",
        emptyTitle: "No skills found",
        emptyDescription: "Add your first skill or adjust the filters.",
        searchPlaceholder: "Search skills",
        titleField: "name",
        subtitleFields: ["category", "level_label"],
        statusField: "visible",
        categoryFilter: { field: "category", options: categories },
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "category", label: "Category", type: "select", required: true, options: categories },
          { name: "level_label", label: "Level label", type: "text", placeholder: "Advanced" },
          { name: "order_index", label: "Order index", type: "number" },
          { name: "visible", label: "Visible", type: "checkbox" },
        ],
      }}
    />
  );
}
