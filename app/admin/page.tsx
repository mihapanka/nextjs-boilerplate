import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import { StatCard } from "@/components/admin/stat-card";
import { CardPanel, SecondaryButton, StatusBadge } from "@/components/ui-foundations";
import {
  getDashboardStats,
  getLatestRegistrations,
  getRegistrations,
  organizerTasks,
} from "@/lib/registrations";

export default async function AdminPage() {
  const { mode, applicants, error } = await getRegistrations();
  const stats = getDashboardStats(applicants);
  const latestRegistrations = getLatestRegistrations(applicants);

  return (
    <AdminLayout
      eyebrow="Admin"
      title="Szervezői áttekintés"
      description="Az admin felület innen már valós Supabase adatokkal is tud dolgozni, de környezeti változók nélkül továbbra is megmarad a biztonságos minta mód a felület bemutatásához."
      actions={<SecondaryButton href="/">Vissza a nyitóoldalra</SecondaryButton>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Összes jelentkező" value={stats.total} />
        <StatCard label="A osztály jelentkezők" value={stats.classA} />
        <StatCard label="B osztály jelentkezők" value={stats.classB} />
        <StatCard label="NY osztály jelentkezők" value={stats.classNy} />
        <StatCard label="Hiányos adatok" value={stats.incomplete} />
        <StatCard label="Beiratkozottak" value={stats.enrolled} />
      </div>

      <div className="grid gap-4">
        {mode === "mock" ? (
          <CardPanel className="p-5">
            <StatusBadge tone="accent">Minta mód</StatusBadge>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              A Supabase környezeti változói jelenleg nincsenek beállítva, ezért az admin
              statisztikák és listák a beépített mintaadatokból töltődnek be.
            </p>
          </CardPanel>
        ) : null}

        {error ? (
          <CardPanel className="p-5">
            <StatusBadge>Betöltési hiba</StatusBadge>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{error}</p>
          </CardPanel>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <CardPanel className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Legutóbbi jelentkezések</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Gyors áttekintés a frissen beérkezett vagy nemrég frissített jelentkezésekről.
              </p>
            </div>
            <SecondaryButton href="/admin/jelentkezok">Összes jelentkező</SecondaryButton>
          </div>

          <div className="mt-6 space-y-4">
            {latestRegistrations.length === 0 ? (
              <div className="rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4 text-sm text-muted-foreground">
                Jelenleg még nincs megjeleníthető jelentkezés.
              </div>
            ) : (
              latestRegistrations.map((applicant) => (
                <div
                  key={applicant.id}
                  className="rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{applicant.studentName}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {applicant.classType} osztály • {applicant.studentEmail}
                      </p>
                    </div>
                    <AdminStatusBadge status={applicant.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardPanel>

        <CardPanel className="p-5">
          <h2 className="text-lg font-semibold text-foreground">Szervezői teendők</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Rövid, azonnal átlátható feladatlista a napi adminisztrációhoz.
          </p>

          <ul className="mt-6 space-y-3">
            {organizerTasks.map((task) => (
              <li
                key={task}
                className="rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm leading-7 text-foreground"
              >
                {task}
              </li>
            ))}
          </ul>
        </CardPanel>
      </div>
    </AdminLayout>
  );
}
