"use client";

import { useMemo, useState } from "react";
import { Applicant, RegistrationDataMode } from "@/lib/registration-types";
import { ApplicantTable } from "@/components/admin/applicant-table";
import { FilterBar } from "@/components/admin/filter-bar";
import { CardPanel, FieldLabel, FormInput, StatusBadge } from "@/components/ui-foundations";

export function RegistrationsPageClient({
  applicants,
  mode,
  error,
}: {
  applicants: Applicant[];
  mode: RegistrationDataMode;
  error: string | null;
}) {
  const [classFilter, setClassFilter] = useState("összes");
  const [statusFilter, setStatusFilter] = useState("összes");
  const [enrollmentFilter, setEnrollmentFilter] = useState("összes");
  const [query, setQuery] = useState("");

  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      const classMatch = classFilter === "összes" || applicant.classType === classFilter;
      const statusMatch = statusFilter === "összes" || applicant.status === statusFilter;
      const enrollmentMatch =
        enrollmentFilter === "összes" ||
        (enrollmentFilter === "beiratkozott" && applicant.enrolled) ||
        (enrollmentFilter === "nem iratkozott be" && !applicant.enrolled);

      const normalizedQuery = query.trim().toLowerCase();
      const textMatch =
        !normalizedQuery ||
        applicant.studentName.toLowerCase().includes(normalizedQuery) ||
        applicant.studentEmail.toLowerCase().includes(normalizedQuery);

      return classMatch && statusMatch && enrollmentMatch && textMatch;
    });
  }, [applicants, classFilter, statusFilter, enrollmentFilter, query]);

  return (
    <div className="space-y-6">
      {mode === "mock" ? (
        <CardPanel className="p-5">
          <StatusBadge tone="accent">Minta mód</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A lista jelenleg a beépített mintaadatokat mutatja, mert a Supabase környezeti
            változói nincsenek megadva.
          </p>
        </CardPanel>
      ) : null}

      {error ? (
        <CardPanel className="p-5">
          <StatusBadge>Betöltési hiba</StatusBadge>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{error}</p>
        </CardPanel>
      ) : null}

      <FilterBar>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <label className="block">
            <FieldLabel>Keresés</FieldLabel>
            <FormInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Név vagy email alapján"
              className="mt-2"
            />
          </label>
          <SelectField
            label="Osztály"
            value={classFilter}
            onChange={setClassFilter}
            options={["összes", "A", "B", "NY"]}
          />
          <SelectField
            label="Státusz"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              "összes",
              "új jelentkezés",
              "visszaigazolva",
              "hiányos adat",
              "beiratkozásra vár",
              "beiratkozott",
              "lemondta",
              "várólista",
            ]}
          />
          <SelectField
            label="Beiratkozás"
            value={enrollmentFilter}
            onChange={setEnrollmentFilter}
            options={["összes", "beiratkozott", "nem iratkozott be"]}
          />
        </div>
      </FilterBar>

      <ApplicantTable applicants={filteredApplicants} />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#24473a] focus:ring-4 focus:ring-[#16372b]/8"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
