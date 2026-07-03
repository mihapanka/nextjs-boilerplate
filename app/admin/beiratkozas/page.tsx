import { AdminLayout } from "@/components/admin/admin-layout";
import { EnrollmentPageClient } from "@/components/admin/enrollment-page-client";
import { getRegistrations } from "@/lib/registrations";

export default async function EnrollmentPage() {
  const { applicants, mode, error } = await getRegistrations();

  return (
    <AdminLayout
      eyebrow="Admin / Beiratkozás"
      title="Beiratkozási nézet"
      description="Egyszerű, laptopon is gyorsan használható felület a személyes beiratkozás és jelenléti ellenőrzés támogatására."
    >
      <EnrollmentPageClient applicants={applicants} mode={mode} error={error} />
    </AdminLayout>
  );
}
