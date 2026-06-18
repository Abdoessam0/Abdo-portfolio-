import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function CertificatesPage() {
  return (
    <AdminResourceManager
      config={{
        title: "Certificates",
        description: "Manage certificates, issuers, links, visibility, and display order.",
        endpoint: "/api/admin/certificates",
        createLabel: "Add certificate",
        emptyTitle: "No certificates found",
        emptyDescription: "Add a certificate to the admin database.",
        searchPlaceholder: "Search certificates, issuers, or URLs",
        titleField: "title",
        subtitleFields: ["issuer", "certificate_url"],
        statusField: "visible",
        fields: [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "issuer", label: "Issuer", type: "text" },
          { name: "certificate_date", label: "Certificate date", type: "date" },
          {
            name: "certificate_url",
            label: "Certificate file or URL",
            type: "upload",
            placeholder: "/uploads/certificates/certificate.pdf or https://...",
            fullWidth: true,
            uploadCategory: "certificates",
            uploadLabel: "Upload certificate file",
            currentLinkLabel: "View current certificate",
          },
          { name: "order_index", label: "Order index", type: "number" },
          { name: "visible", label: "Visible", type: "checkbox" },
        ],
      }}
    />
  );
}
