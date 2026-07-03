"use client";

import { useMemo, useState } from "react";
import { Applicant, RegistrationDataMode } from "@/lib/registration-types";
import { CardPanel, FieldLabel, StatusBadge } from "@/components/ui-foundations";
import { AdminStatusBadge } from "@/components/admin/status-badge";

export function EnrollmentPageClient({
  applicants,
  mode,
  error,
}: {
  applicants: Applicant[];
  mode: RegistrationDataMode;
  error: string | null;
}) {
  const [classFilter, setClassFilter] = useState("összes");
  const [localEnrolled, setLocalEnrolled] = useState<Record<string, boolean>>(
    Object.fromEntries(applicants.map((applicant) => [applicant.id, applicant.enrolled]))
  );
  const [savingIds, setSavingIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const visibleApplicants = useMemo(() => {
    return applicants.filter(
      (applicant) => classFilter === "összes" || applicant.classType === classFilter
    );
  }, [applicants, classFilter]);

  const handleToggle = async (id: string, checked: boolean) => {
    setLocalEnrolled((current) => ({
      ...current,
      [id]: checked,
    }));
    setSavingIds((current) => [...current, id]);
    setFeedback(null);
    setSaveError(null);

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrolled: checked }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        mode?: RegistrationDataMode;
        error?: string;
        applicant?: Applicant | null;
      };

      if (!response.ok || !result.ok) {
        setSaveError(result.error ?? "A beiratkozási állapot mentése nem sikerült.");
        setLocalEnrolled((current) => ({
          ...current,
          [id]: !checked,
        }));
        return;
      }

      if (result.applicant) {
        setLocalEnrolled((current) => ({
          ...current,
          [id]: result.applicant?.enrolled ?? checked,
        }));
      }

      setFeedback(
        result.mode === "mock"
          ? "Minta módban fut a felület, ezért a változás most csak helyben látható."
          : "A beiratkozási állapot sikeresen frissült a Supabase adatbázisban."
      );
    } catch {
      setSaveError("Hálózati hiba történt a beiratkozási állapot mentése közben.");
      setLocalEnrolled((current) => ({
        ...current,
        [id]: !checked,
      }));
    } finally {
      setSavingIds((current) => current.filter((item) => item !== id));
    }
  };

  return (
    <div className="space-y-6">
      {mode === "mock" ? (
        <CardPanel className="p-5">
          <StatusBadge tone="accent">Minta mód</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A Supabase környezeti változók hiánya miatt ez a nézet most mintaadatokkal működik.
          </p>
        </CardPanel>
      ) : null}

      {error ? (
        <CardPanel className="p-5">
          <StatusBadge>Betöltési hiba</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{error}</p>
        </CardPanel>
      ) : null}

      {feedback ? (
        <CardPanel className="p-5">
          <StatusBadge tone="accent">Mentés kész</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{feedback}</p>
        </CardPanel>
      ) : null}

      {saveError ? (
        <CardPanel className="p-5">
          <StatusBadge>Mentési hiba</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{saveError}</p>
        </CardPanel>
      ) : null}

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
        {visibleApplicants.length === 0 ? (
          <CardPanel className="p-5 text-sm text-muted-foreground">
            Jelenleg nincs olyan jelentkező, aki megfelel a kiválasztott szűrőnek.
          </CardPanel>
        ) : null}

        {visibleApplicants.map((applicant) => {
          const hasSpecialNotes =
            Boolean(applicant.allergies) || applicant.status === "hiányos adat";
          const isSaving = savingIds.includes(applicant.id);

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
                  disabled={isSaving}
                  onChange={(event) => handleToggle(applicant.id, event.target.checked)}
                  className="h-4 w-4 rounded border-[color:var(--border-strong)]"
                />
                <span className="text-sm font-semibold text-foreground">
                  {isSaving ? "Mentés..." : "Beiratkozott"}
                </span>
              </label>
            </CardPanel>
          );
        })}
      </div>
    </div>
  );
}
