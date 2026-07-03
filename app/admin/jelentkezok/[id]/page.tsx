import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ApplicantDetailClient } from "@/components/admin/applicant-detail-client";
import { getApplicantById } from "@/lib/mock-admin-data";

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const applicant = getApplicantById(id);

  if (!applicant) {
    notFound();
  }

  return (
    <AdminLayout
      eyebrow="Admin / Jelentkezők"
      title="Jelentkező adatlap"
      description="Részletes nézet a kiválasztott jelentkező összes fontos adatáról, szervezői jegyzettel és állapotkezeléssel."
    >
      <ApplicantDetailClient applicant={applicant} />
    </AdminLayout>
  );
}
