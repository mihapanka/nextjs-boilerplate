"use client";

import { useState } from "react";
import { Applicant, ApplicantStatus } from "@/lib/mock-admin-data";
import { AdminStatusBadge } from "@/components/admin/status-badge";
import { DetailPanel } from "@/components/admin/detail-panel";
import { CardPanel, FieldLabel, FormInput, HelperText, PrimaryButton, SecondaryButton } from "@/components/ui-foundations";

const statuses: ApplicantStatus[] = [
  "új jelentkezés",
  "visszaigazolva",
  "hiányos adat",
  "beiratkozásra vár",
  "beiratkozott",
  "lemondta",
  "várólista",
];

export function ApplicantDetailClient({ applicant }: { applicant: Applicant }) {
  const [status, setStatus] = useState<ApplicantStatus>(applicant.status);
  const [organizerNotes, setOrganizerNotes] = useState(applicant.organizerNotes);

  return (
    <div className="space-y-6">
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
              {applicant.classType} osztály • utolsó módosítás: {applicant.lastUpdated}
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
              ["Beiratkozott", applicant.enrolled ? "Igen" : "Nem"],
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
              ["Szülői tudomásulvétel", applicant.guardianAcknowledgement ? "Megerősítve" : "Nincs megerősítve"],
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
              Ez most csak helyi UI állapot, adatbázis mentés még nincs.
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
        </DetailPanel>

        <DetailPanel title="Szervezői megjegyzések">
          <label className="block">
            <FieldLabel>Jegyzet</FieldLabel>
            <HelperText>
              Ez a mező jelenleg csak a böngészőben módosul, mentés nélkül.
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
        <PrimaryButton type="button">Változások áttekintése</PrimaryButton>
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
