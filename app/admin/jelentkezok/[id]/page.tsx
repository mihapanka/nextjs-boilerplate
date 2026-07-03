import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ApplicantDetailClient } from "@/components/admin/applicant-detail-client";
import { CardPanel, StatusBadge } from "@/components/ui-foundations";
import { getRegistrationById } from "@/lib/registrations";

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { applicant, mode, error } = await getRegistrationById(id);

  if (!applicant && !error) {
    notFound();
  }

  return (
    <AdminLayout
      eyebrow="Admin / Jelentkezők"
      title="Jelentkező adatlap"
      description="Részletes nézet a kiválasztott jelentkező összes fontos adatáról, szervezői jegyzettel és állapotkezeléssel."
    >
      {error && !applicant ? (
        <CardPanel className="p-5">
          <StatusBadge>Betöltési hiba</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{error}</p>
        </CardPanel>
      ) : null}

      {applicant ? <ApplicantDetailClient applicant={applicant} mode={mode} error={error} /> : null}
    </AdminLayout>
  );
}
