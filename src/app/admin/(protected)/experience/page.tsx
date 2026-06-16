import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function ExperiencePage() {
  return (
    <AdminResourceManager
      config={{
        title: "Experience",
        description: "Manage work experience entries, visibility, stack, and display order.",
        endpoint: "/api/admin/experience",
        createLabel: "Add experience",
        emptyTitle: "No experience found",
        emptyDescription: "Add a work experience entry to the admin database.",
        searchPlaceholder: "Search company, role, stack, or description",
        titleField: "company",
        subtitleFields: ["role", "location", "stack"],
        statusField: "visible",
        fields: [
          { name: "company", label: "Company", type: "text", required: true },
          { name: "role", label: "Role", type: "text", required: true },
          { name: "location", label: "Location", type: "text" },
          { name: "start_date", label: "Start date", type: "date" },
          { name: "end_date", label: "End date", type: "date" },
          { name: "stack", label: "Stack", type: "text", placeholder: "React, Next.js, MySQL", fullWidth: true },
          { name: "description", label: "Description", type: "textarea", fullWidth: true },
          { name: "order_index", label: "Order index", type: "number" },
          { name: "visible", label: "Visible", type: "checkbox" },
        ],
      }}
    />
  );
}
