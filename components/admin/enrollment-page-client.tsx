"use client";

import { useMemo, useState } from "react";
import { Applicant } from "@/lib/mock-admin-data";
import { CardPanel, FieldLabel } from "@/components/ui-foundations";
import { AdminStatusBadge } from "@/components/admin/status-badge";

export function EnrollmentPageClient({ applicants }: { applicants: Applicant[] }) {
  const [classFilter, setClassFilter] = useState("összes");
  const [localEnrolled, setLocalEnrolled] = useState<Record<string, boolean>>(
    Object.fromEntries(applicants.map((applicant) => [applicant.id, applicant.enrolled]))
  );

  const visibleApplicants = useMemo(() => {
    return applicants.filter(
      (applicant) => classFilter === "összes" || applicant.classType === classFilter
    );
  }, [applicants, classFilter]);

  return (
    <div className="space-y-6">
      <CardPanel className="p-5">
        <label className="block max-w-xs">
          <FieldLabel>Osztály szűrő</FieldLabel>
          <select
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value)}
            className="mt-2 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#24473a] focus:ring-4 focus:ring-[#16372b]/8"
          >
            {["összes", "A", "B", "NY"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </CardPanel>

      <div className="space-y-4">
        {visibleApplicants.map((applicant) => {
          const hasSpecialNotes =
            Boolean(applicant.allergies) || applicant.status === "hiányos adat";

          return (
            <CardPanel
              key={applicant.id}
              className="p-5 lg:grid lg:grid-cols-[1.4fr_0.7fr_0.9fr_0.7fr] lg:items-center lg:gap-4"
            >
              <div>
                <p className="text-lg font-semibold text-foreground">{applicant.studentName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {applicant.classType} osztály • {applicant.studentEmail}
                </p>
              </div>

              <div className="mt-4 lg:mt-0">
                <AdminStatusBadge status={applicant.status} />
              </div>

              <div className="mt-4 lg:mt-0">
                <p className="text-sm font-medium text-foreground">
                  {hasSpecialNotes ? "Kiemelt megjegyzés" : "Nincs külön jelzés"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {applicant.allergies
                    ? applicant.allergies
                    : applicant.status === "hiányos adat"
                      ? "Hiányos adat"
                      : "Minden rendben"}
                </p>
              </div>

              <label className="mt-4 flex items-center gap-3 lg:mt-0 lg:justify-end">
                <input
                  type="checkbox"
                  checked={localEnrolled[applicant.id] ?? false}
                  onChange={(event) =>
                    setLocalEnrolled((current) => ({
                      ...current,
                      [applicant.id]: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-[color:var(--border-strong)]"
                />
                <span className="text-sm font-semibold text-foreground">Beiratkozott</span>
              </label>
            </CardPanel>
          );
        })}
      </div>
    </div>
  );
}
