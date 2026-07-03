import { AdminLayout } from "@/components/admin/admin-layout";
import { SettingsPageClient } from "@/components/admin/settings-page-client";

export default function SettingsPage() {
  return (
    <AdminLayout
      eyebrow="Admin / Beállítások"
      title="Mock beállítások"
      description="A későbbi admin alapbeállítások előnézete, lokális módosítással, adatbázis és mentés nélkül."
    >
      <SettingsPageClient />
    </AdminLayout>
  );
}
