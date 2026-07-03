"use client";

import { useState } from "react";
import { settingsDefaults } from "@/lib/mock-admin-data";
import { CardPanel, FieldLabel, FormInput, HelperText } from "@/components/ui-foundations";

export function SettingsPageClient() {
  const [settings, setSettings] = useState(settingsDefaults);

  const updateField = <K extends keyof typeof settingsDefaults>(
    key: K,
    value: (typeof settingsDefaults)[K]
  ) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SettingsPanel
        title="Alapadatok"
        fields={
          <>
            <InputBlock
              label="Aktuális tábori év"
              helper="Melyik tanévre vagy szervezési ciklusra vonatkozik az admin felület."
              value={settings.campYear}
              onChange={(value) => updateField("campYear", value)}
            />
            <InputBlock
              label="Tábor dátuma"
              helper="Publikus és belső felületeken is ez jelenhet meg."
              value={settings.campDate}
              onChange={(value) => updateField("campDate", value)}
            />
            <InputBlock
              label="Helyszín"
              helper="A tábor vagy a beiratkozás fő helyszíne."
              value={settings.location}
              onChange={(value) => updateField("location", value)}
            />
          </>
        }
      />

      <SettingsPanel
        title="Jelentkezési információk"
        fields={
          <>
            <InputBlock
              label="Jelentkezési határidők"
              helper="Lehet több osztályra bontott szöveg is."
              value={settings.registrationDeadlines}
              onChange={(value) => updateField("registrationDeadlines", value)}
            />
            <InputBlock
              label="Kapcsolattartó email"
              helper="Ide érkezhetnek a kérdések a családoktól."
              value={settings.contactEmail}
              onChange={(value) => updateField("contactEmail", value)}
            />
            <InputBlock
              label="„Mit hozz magaddal” link"
              helper="Később publikus tájékoztató linkje lehet."
              value={settings.packingListUrl}
              onChange={(value) => updateField("packingListUrl", value)}
            />
          </>
        }
      />

      <SettingsPanel
        title="Jelentkezési állapotok"
        fields={
          <>
            <SelectBlock
              label="A/B jelentkezés állapota"
              helper="A közös A és B osztályos jelentkezések nyitottsága."
              value={settings.abRegistrationState}
              onChange={(value) => updateField("abRegistrationState", value)}
              options={["nyitott", "zárt"]}
            />
            <SelectBlock
              label="NY jelentkezés állapota"
              helper="A nyelvi előkészítős útvonal külön nyitható vagy zárható."
              value={settings.nyRegistrationState}
              onChange={(value) => updateField("nyRegistrationState", value)}
              options={["nyitott", "zárt"]}
            />
          </>
        }
      />
    </div>
  );
}

function SettingsPanel({
  title,
  fields,
}: {
  title: string;
  fields: React.ReactNode;
}) {
  return (
    <CardPanel className="p-5">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-5 space-y-5">{fields}</div>
    </CardPanel>
  );
}

function InputBlock({
  label,
  helper,
  value,
  onChange,
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <HelperText>{helper}</HelperText>
      <FormInput value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectBlock({
  label,
  helper,
  value,
  onChange,
  options,
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <HelperText>{helper}</HelperText>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#24473a] focus:ring-4 focus:ring-[#16372b]/8"
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
