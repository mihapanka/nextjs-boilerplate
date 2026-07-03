"use client";

import { useState } from "react";
import { Applicant, ApplicantStatus, RegistrationDataMode } from "@/lib/registration-types";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import { DetailPanel } from "@/components/admin/detail-panel";
import {
  CardPanel,
  FieldLabel,
  HelperText,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
} from "@/components/ui-foundations";

const statuses: ApplicantStatus[] = [
  "új jelentkezés",
  "visszaigazolva",
  "hiányos adat",
  "beiratkozásra vár",
  "beiratkozott",
  "lemondta",
  "várólista",
];

export function ApplicantDetailClient({
  applicant,
  mode,
  error,
}: {
  applicant: Applicant;
  mode: RegistrationDataMode;
  error: string | null;
}) {
  const [status, setStatus] = useState<ApplicantStatus>(applicant.status);
  const [organizerNotes, setOrganizerNotes] = useState(applicant.organizerNotes);
  const [enrolled, setEnrolled] = useState(applicant.enrolled);
  const [lastUpdated, setLastUpdated] = useState(applicant.lastUpdated);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    setSaveError(null);

    try {
      const response = await fetch(`/api/registrations/${applicant.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          organizerNotes,
          enrolled,
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        mode?: RegistrationDataMode;
        error?: string;
        applicant?: Applicant | null;
      };

      if (!response.ok || !result.ok) {
        setSaveError(result.error ?? "A módosítások mentése nem sikerült.");
        return;
      }

      if (result.applicant) {
        setStatus(result.applicant.status);
        setOrganizerNotes(result.applicant.organizerNotes);
        setEnrolled(result.applicant.enrolled);
        setLastUpdated(result.applicant.lastUpdated);
      }

      if (result.mode === "mock") {
        setSaveMessage(
          "Minta módban fut a felület, ezért a változás csak ezen a képernyőn látszik, de az űrlap mentési folyamata rendben lefutott."
        );
        setLastUpdated(new Intl.DateTimeFormat("hu-HU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()));
      } else {
        setSaveMessage("A módosítások sikeresen elmentve a Supabase adatbázisba.");
      }
    } catch {
      setSaveError("Hálózati hiba történt a mentés közben. Kérjük, próbáld újra.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {mode === "mock" ? (
        <CardPanel className="p-5">
          <StatusBadge tone="accent">Minta mód</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A Supabase környezeti változói hiányoznak, ezért ez az adatlap mintaadatokkal működik.
          </p>
        </CardPanel>
      ) : null}

      {error ? (
        <CardPanel className="p-5">
          <StatusBadge>Betöltési figyelmeztetés</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{error}</p>
        </CardPanel>
      ) : null}

      {saveMessage ? (
        <CardPanel className="p-5">
          <StatusBadge tone="accent">Mentés kész</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{saveMessage}</p>
        </CardPanel>
      ) : null}

      {saveError ? (
        <CardPanel className="p-5">
          <StatusBadge>Mentési hiba</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{saveError}</p>
        </CardPanel>
      ) : null}

      <CardPanel className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Jelentkező részletei
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {applicant.studentName}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {applicant.classType} osztály • utolsó módosítás: {lastUpdated}
            </p>
          </div>
          <AdminStatusBadge status={status} />
        </div>
      </CardPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <DetailPanel title="Diák adatai">
          <InfoList
            rows={[
              ["Név", applicant.studentName],
              ["Osztály", applicant.classType],
              ["Email", applicant.studentEmail],
              ["Telefonszám", applicant.studentPhone || "Nincs megadva"],
              ["Beiratkozott", enrolled ? "Igen" : "Nem"],
            ]}
          />
        </DetailPanel>

        <DetailPanel title="Szülő / gondviselő adatai">
          <InfoList
            rows={[
              ["Név", applicant.guardianName],
              ["Email", applicant.guardianEmail || "Nincs megadva"],
              ["Telefonszám", applicant.guardianPhone],
            ]}
          />
        </DetailPanel>

        <DetailPanel title="Étkezési és egészségügyi információk">
          <InfoList
            rows={[
              ["Allergia / ételérzékenység", applicant.allergies || "Nincs megadva"],
              ["Egészségügyi megjegyzés", applicant.healthNotes || "Nincs megadva"],
              ["Egyéb fontos információ", applicant.additionalNotes || "Nincs megadva"],
            ]}
          />
        </DetailPanel>

        <DetailPanel title="Hozzájárulások">
          <InfoList
            rows={[
              ["Adatkezelési tájékoztató", applicant.acceptsPrivacy ? "Elfogadva" : "Nincs elfogadva"],
              [
                "Szülői tudomásulvétel",
                applicant.guardianAcknowledgement ? "Megerősítve" : "Nincs megerősítve",
              ],
              ["Fotó / videó hozzájárulás", applicant.mediaConsent ? "Igen" : "Nem"],
            ]}
          />
        </DetailPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <DetailPanel title="Aktuális státusz">
          <label className="block">
            <FieldLabel>Státusz módosítása</FieldLabel>
            <HelperText>
              A kiválasztott státusz a mentés után a Supabase bejegyzésben is frissül.
            </HelperText>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as ApplicantStatus)}
              className="mt-3 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#24473a] focus:ring-4 focus:ring-[#16372b]/8"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-5 flex items-center gap-3 rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] px-4 py-3">
            <input
              type="checkbox"
              checked={enrolled}
              onChange={(event) => setEnrolled(event.target.checked)}
              className="h-4 w-4 rounded border-[color:var(--border-strong)]"
            />
            <span className="text-sm font-semibold text-foreground">Beiratkozott</span>
          </label>
        </DetailPanel>

        <DetailPanel title="Szervezői megjegyzések">
          <label className="block">
            <FieldLabel>Jegyzet</FieldLabel>
            <HelperText>
              A szervezői megjegyzések itt szerkeszthetők és menthetők a jelentkező rekordjára.
            </HelperText>
            <textarea
              value={organizerNotes}
              onChange={(event) => setOrganizerNotes(event.target.value)}
              rows={6}
              className="mt-3 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-[color:var(--muted-foreground)] focus:border-[#24473a] focus:ring-4 focus:ring-[#16372b]/8"
            />
          </label>
        </DetailPanel>
      </div>

      <DetailPanel title="Email előzmények">
        <div className="space-y-4">
          {applicant.emailHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">Még nincs rögzített email előzmény.</p>
          ) : (
            applicant.emailHistory.map((item) => (
              <div
                key={item.id}
                className="rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4"
              >
                <p className="font-semibold text-foreground">{item.subject}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.sentAt}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p>
              </div>
            ))
          )}
        </div>
      </DetailPanel>

      <div className="flex flex-wrap gap-3">
        <SecondaryButton href="/admin/jelentkezok">Vissza a jelentkezők listájához</SecondaryButton>
        <PrimaryButton type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Mentés folyamatban..." : "Módosítások mentése"}
        </PrimaryButton>
      </div>
    </div>
  );
}

function InfoList({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className="space-y-3">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-1 border-b border-[color:var(--border)] pb-3 last:border-b-0 last:pb-0 md:grid-cols-[0.85fr_1.15fr]"
        >
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-sm leading-6 text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}
