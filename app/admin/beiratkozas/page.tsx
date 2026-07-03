import { AdminLayout } from "@/components/admin/admin-layout";
import { EnrollmentPageClient } from "@/components/admin/enrollment-page-client";
import { applicants } from "@/lib/mock-admin-data";

export default function EnrollmentPage() {
  return (
    <AdminLayout
      eyebrow="Admin / Beiratkozás"
      title="Beiratkozási nézet"
      description="Egyszerű, laptopon is gyorsan használható felület a személyes beiratkozás és jelenléti ellenőrzés támogatására."
    >
      <EnrollmentPageClient applicants={applicants} />
    </AdminLayout>
  );
}
