import { ProjectForm } from "@/components/admin/ProjectForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  return <ProjectForm mode="edit" projectId={id} />;
}
