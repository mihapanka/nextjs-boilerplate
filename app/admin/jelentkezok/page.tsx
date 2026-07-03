import { AdminLayout } from "@/components/admin/admin-layout";
import { RegistrationsPageClient } from "@/components/admin/registrations-page-client";
import { getRegistrations } from "@/lib/registrations";

export default async function AdminApplicantsPage() {
  const { applicants, mode, error } = await getRegistrations();

  return (
    <AdminLayout
      eyebrow="Admin / Jelentkezők"
      title="Jelentkezők kezelése"
      description="Az összes jelentkező egy helyen, osztály, státusz és beiratkozási állapot szerint szűrhetően."
    >
      <RegistrationsPageClient applicants={applicants} mode={mode} error={error} />
    </AdminLayout>
  );
}
