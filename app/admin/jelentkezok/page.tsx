import { AdminLayout } from "@/components/admin/admin-layout";
import { RegistrationsPageClient } from "@/components/admin/registrations-page-client";
import { applicants } from "@/lib/mock-admin-data";

export default function AdminApplicantsPage() {
  return (
    <AdminLayout
      eyebrow="Admin / Jelentkezők"
      title="Jelentkezők kezelése"
      description="Az összes jelentkező egy helyen, osztály, státusz és beiratkozási állapot szerint szűrhetően."
    >
      <RegistrationsPageClient applicants={applicants} />
    </AdminLayout>
  );
}
