import { AdminLayout } from "@/components/admin/admin-layout";
import { StatCard } from "@/components/admin/stat-card";
import { CardPanel, SecondaryButton } from "@/components/ui-foundations";
import { getDashboardStats, latestRegistrations, organizerTasks } from "@/lib/mock-admin-data";
import { AdminStatusBadge } from "@/components/admin/status-badge";

export default function AdminPage() {
  const stats = getDashboardStats();

  return (
    <AdminLayout
      eyebrow="Admin"
      title="Szervezői áttekintés"
      description="Ez a mockup a későbbi admin felület szerkezetét modellezi. Minden adat mintaként szerepel, de a felépítés már jól követhető a szervezők számára."
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

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <CardPanel className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Legutóbbi jelentkezések</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Gyors áttekintés a frissen kezelt vagy beérkezett jelentkezésekről.
              </p>
            </div>
            <SecondaryButton href="/admin/jelentkezok">Összes jelentkező</SecondaryButton>
          </div>

          <div className="mt-6 space-y-4">
            {latestRegistrations.map((applicant) => (
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
            ))}
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
