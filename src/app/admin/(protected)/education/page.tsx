import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function EducationPage() {
  return (
    <AdminResourceManager
      config={{
        title: "Education",
        description: "Manage education entries, visibility, dates, and display order.",
        endpoint: "/api/admin/education",
        createLabel: "Add education",
        emptyTitle: "No education found",
        emptyDescription: "Add an education entry to the admin database.",
        searchPlaceholder: "Search school, degree, location, or description",
        titleField: "school",
        subtitleFields: ["degree", "location"],
        statusField: "visible",
        fields: [
          { name: "school", label: "School", type: "text", required: true },
          { name: "degree", label: "Degree", type: "text", required: true },
          { name: "location", label: "Location", type: "text" },
          { name: "start_date", label: "Start date", type: "date" },
          { name: "end_date", label: "End date", type: "date" },
          { name: "description", label: "Description", type: "textarea", fullWidth: true },
          { name: "order_index", label: "Order index", type: "number" },
          { name: "visible", label: "Visible", type: "checkbox" },
        ],
      }}
    />
  );
}
