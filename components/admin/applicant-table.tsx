import Link from "next/link";
import { Applicant } from "@/lib/mock-admin-data";
import { AdminStatusBadge } from "@/components/admin/status-badge";

export function ApplicantTable({ applicants }: { applicants: Applicant[] }) {
  return (
    <div className="overflow-x-auto rounded-[14px] border border-[color:var(--border)] bg-white">
      <table className="min-w-full border-collapse">
        <thead className="bg-[color:var(--surface-subtle)]">
          <tr className="text-left">
            {[
              "Név",
              "Osztály",
              "Státusz",
              "Email",
              "Szülő email",
              "Allergia / ételérzékenység",
              "Beiratkozott",
              "Utolsó módosítás",
            ].map((heading) => (
              <th
                key={heading}
                className="border-b border-[color:var(--border)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id} className="align-top">
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm">
                <Link
                  href={`/admin/jelentkezok/${applicant.id}`}
                  className="font-semibold text-foreground hover:underline"
                >
                  {applicant.studentName}
                </Link>
              </td>
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-foreground">
                {applicant.classType}
              </td>
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm">
                <AdminStatusBadge status={applicant.status} />
              </td>
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-muted-foreground">
                {applicant.studentEmail}
              </td>
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-muted-foreground">
                {applicant.guardianEmail || "Hiányzik"}
              </td>
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-muted-foreground">
                {applicant.allergies || "Nincs"}
              </td>
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-foreground">
                {applicant.enrolled ? "Igen" : "Nem"}
              </td>
              <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-muted-foreground">
                {applicant.lastUpdated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
