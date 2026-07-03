"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import {
  CardPanel,
  FieldLabel,
  FormInput,
  HelperText,
  PageContainer,
  PrimaryButton,
  SectionWrapper,
  SecondaryButton,
  StatusBadge,
} from "@/components/ui-foundations";

type ClassKey = "a" | "b" | "ny";

type RegistrationFlowProps = {
  classKey: ClassKey;
  classLabel: string;
  intro: string;
};

type FormData = {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  schoolClass: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  allergies: string;
  healthNotes: string;
  additionalNotes: string;
  acceptsPrivacy: boolean;
  guardianAcknowledgement: boolean;
  mediaConsent: boolean;
};

const stepTitles = [
  "Diák adatai",
  "Szülő / gondviselő adatai",
  "Étkezési és egészségügyi információk",
  "Hozzájárulások",
  "Ellenőrzés és beküldés",
];

export function RegistrationFlow({
  classKey,
  classLabel,
  intro,
}: RegistrationFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    schoolClass: classLabel.replace(" osztály", ""),
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
    allergies: "",
    healthNotes: "",
    additionalNotes: "",
    acceptsPrivacy: false,
    guardianAcknowledgement: false,
    mediaConsent: false,
  });

  const progressPercent = useMemo(
    () => Math.round(((step + 1) / stepTitles.length) * 100),
    [step]
  );

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const validateStep = (currentStep: number) => {
    const nextErrors: string[] = [];

    if (currentStep === 0) {
      if (!formData.studentName.trim()) nextErrors.push("Add meg a diák teljes nevét.");
      if (!formData.studentEmail.trim()) nextErrors.push("Add meg a diák e-mail-címét.");
      if (!formData.studentPhone.trim()) nextErrors.push("Add meg a diák telefonszámát.");
    }

    if (currentStep === 1) {
      if (!formData.guardianName.trim()) {
        nextErrors.push("Add meg a szülő vagy gondviselő nevét.");
      }
      if (!formData.guardianEmail.trim()) {
        nextErrors.push("Add meg a szülő vagy gondviselő e-mail-címét.");
      }
      if (!formData.guardianPhone.trim()) {
        nextErrors.push("Add meg a szülő vagy gondviselő telefonszámát.");
      }
    }

    if (currentStep === 3) {
      if (!formData.acceptsPrivacy) {
        nextErrors.push("Az adatkezelési tájékoztató elfogadása szükséges.");
      }
      if (!formData.guardianAcknowledgement) {
        nextErrors.push("A szülői tudomásulvétel megerősítése szükséges.");
      }
    }

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(current + 1, stepTitles.length - 1));
  };

  const previousStep = () => {
    setErrors([]);
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep(step)) return;
    router.push(`/jelentkezes/visszaigazolas?osztaly=${classKey}`);
  };

  return (
    <PageContainer>
      <SectionWrapper className="py-4">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <CardPanel className="h-fit p-6">
            <StatusBadge tone="accent">Jelentkezés / {classLabel}</StatusBadge>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {classLabel} jelentkezési lap
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{intro}</p>

            <div className="mt-8 rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">Előrehaladás</span>
                <span className="text-muted-foreground">
                  {step + 1}. lépés / {stepTitles.length}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[color:var(--border)]">
                <div
                  className="h-2 rounded-full bg-[#16372b] transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <ol className="mt-8 space-y-3">
              {stepTitles.map((title, index) => {
                const active = index === step;
                const done = index < step;

                return (
                  <li
                    key={title}
                    className={`rounded-[10px] border p-4 ${
                      active
                        ? "border-[color:var(--border-strong)] bg-[color:var(--surface-subtle)]"
                        : "border-[color:var(--border)] bg-white"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-[10px] text-sm font-semibold ${
                          done || active
                            ? "bg-[#16372b] text-white"
                            : "bg-[color:var(--surface-subtle)] text-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {index === 0 && "Alapvető elérhetőségek és osztály."}
                          {index === 1 && "Kapcsolattartó szülő vagy gondviselő adatai."}
                          {index === 2 && "Fontos egészségügyi és étkezési tudnivalók."}
                          {index === 3 && "Szükséges nyilatkozatok és hozzájárulások."}
                          {index === 4 && "Átnézés, ellenőrzés, beküldés."}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8">
              <SecondaryButton href="/">Vissza a nyitóoldalra</SecondaryButton>
            </div>
          </CardPanel>

          <CardPanel className="p-6 sm:p-8">
            <div className="border-b border-[color:var(--border)] pb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {stepTitles[step]}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Töltsd ki az alábbi adatokat nyugodtan, átlátható lépésekben. A jelenlegi verzió
                csak a felhasználói felületet modellezi, az adatok nem kerülnek szerverre.
              </p>
            </div>

            {errors.length > 0 ? (
              <div className="mt-6 rounded-[10px] border border-[#ead9cf] bg-[#fcf8f6] p-4 text-sm text-[#8a4424]">
                <p className="font-semibold">Még néhány mezőt ellenőrizni kell:</p>
                <ul className="mt-2 space-y-1">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8">
              {step === 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  <FieldGroup
                    label="Teljes név"
                    helper="A diák neve úgy, ahogyan a jelentkezésben szerepeljen."
                  >
                    <FormInput
                      value={formData.studentName}
                      onChange={(event) => updateField("studentName", event.target.value)}
                      placeholder="Például: Kovács Anna"
                    />
                  </FieldGroup>
                  <FieldGroup
                    label="Email cím"
                    helper="Ide érkezhet később a visszaigazolás és a tájékoztató."
                  >
                    <FormInput
                      type="email"
                      value={formData.studentEmail}
                      onChange={(event) => updateField("studentEmail", event.target.value)}
                      placeholder="pelda@email.hu"
                    />
                  </FieldGroup>
                  <FieldGroup
                    label="Telefonszám"
                    helper="A diák saját elérhetősége, ha van."
                  >
                    <FormInput
                      type="tel"
                      value={formData.studentPhone}
                      onChange={(event) => updateField("studentPhone", event.target.value)}
                      placeholder="+36 30 123 4567"
                    />
                  </FieldGroup>
                  <FieldGroup
                    label="Osztály"
                    helper="Az útvonal alapján automatikusan kitöltve."
                  >
                    <FormInput value={formData.schoolClass} readOnly />
                  </FieldGroup>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  <FieldGroup
                    label="Szülő / gondviselő neve"
                    helper="Ő lesz az elsődleges kapcsolattartó."
                  >
                    <FormInput
                      value={formData.guardianName}
                      onChange={(event) => updateField("guardianName", event.target.value)}
                      placeholder="Például: Kovács Éva"
                    />
                  </FieldGroup>
                  <FieldGroup
                    label="Szülő / gondviselő email címe"
                    helper="Ezen az email címen is elérhető a család."
                  >
                    <FormInput
                      type="email"
                      value={formData.guardianEmail}
                      onChange={(event) => updateField("guardianEmail", event.target.value)}
                      placeholder="szulo@email.hu"
                    />
                  </FieldGroup>
                  <div className="md:col-span-2">
                    <FieldGroup
                      label="Szülő / gondviselő telefonszáma"
                      helper="Olyan számot adj meg, amelyen szükség esetén gyorsan elérhetünk."
                    >
                      <FormInput
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={(event) => updateField("guardianPhone", event.target.value)}
                        placeholder="+36 20 555 1111"
                      />
                    </FieldGroup>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-5">
                  <TextAreaGroup
                    label="Ételérzékenység / allergia"
                    helper="Bármilyen étkezéssel kapcsolatos érzékenység vagy allergia."
                    value={formData.allergies}
                    onChange={(value) => updateField("allergies", value)}
                    placeholder="Például: mogyoróallergia, laktózérzékenység"
                  />
                  <TextAreaGroup
                    label="Egészségügyi megjegyzés"
                    helper="Minden olyan tudnivaló, ami a tábor biztonságos megszervezéséhez fontos."
                    value={formData.healthNotes}
                    onChange={(value) => updateField("healthNotes", value)}
                    placeholder="Például: rendszeresen szedett gyógyszer, terhelhetőség"
                  />
                  <TextAreaGroup
                    label="Egyéb fontos információ"
                    helper="Minden más, amit jó, ha a szervezők előre tudnak."
                    value={formData.additionalNotes}
                    onChange={(value) => updateField("additionalNotes", value)}
                    placeholder="Például: külön figyelmet igénylő helyzet vagy fontos körülmény"
                  />
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-4">
                  <CheckboxRow
                    checked={formData.acceptsPrivacy}
                    onChange={(checked) => updateField("acceptsPrivacy", checked)}
                    label="Elfogadom az adatkezelési tájékoztatót."
                    helper="A végleges rendszerben ez a nyilatkozat a tényleges adatkezelési dokumentumhoz kapcsolódik majd."
                  />
                  <CheckboxRow
                    checked={formData.guardianAcknowledgement}
                    onChange={(checked) => updateField("guardianAcknowledgement", checked)}
                    label="A szülő / gondviselő tudomásul veszi a jelentkezést."
                    helper="A jelentkezés leadásához ez a megerősítés szükséges."
                  />
                  <CheckboxRow
                    checked={formData.mediaConsent}
                    onChange={(checked) => updateField("mediaConsent", checked)}
                    label="Hozzájárulok fotó- és videófelvételek készítéséhez."
                    helper="Ez a mező opcionális."
                    optional
                  />
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-6">
                  <SummaryBlock
                    title="Diák adatai"
                    rows={[
                      ["Teljes név", formData.studentName],
                      ["Email cím", formData.studentEmail],
                      ["Telefonszám", formData.studentPhone],
                      ["Osztály", formData.schoolClass],
                    ]}
                  />
                  <SummaryBlock
                    title="Szülő / gondviselő adatai"
                    rows={[
                      ["Név", formData.guardianName],
                      ["Email cím", formData.guardianEmail],
                      ["Telefonszám", formData.guardianPhone],
                    ]}
                  />
                  <SummaryBlock
                    title="Étkezési és egészségügyi információk"
                    rows={[
                      ["Ételérzékenység / allergia", formData.allergies],
                      ["Egészségügyi megjegyzés", formData.healthNotes],
                      ["Egyéb fontos információ", formData.additionalNotes],
                    ]}
                  />
                  <SummaryBlock
                    title="Hozzájárulások"
                    rows={[
                      ["Adatkezelési tájékoztató", formData.acceptsPrivacy ? "Elfogadva" : "Nincs elfogadva"],
                      ["Szülői tudomásulvétel", formData.guardianAcknowledgement ? "Megerősítve" : "Nincs megerősítve"],
                      ["Fotó / videó hozzájárulás", formData.mediaConsent ? "Engedélyezve" : "Nincs megadva"],
                    ]}
                  />
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <PrimaryButton
                  type="button"
                  onClick={previousStep}
                  disabled={step === 0}
                  className="bg-white text-foreground border-[color:var(--border-strong)] hover:bg-[color:var(--surface-subtle)]"
                >
                  Vissza
                </PrimaryButton>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {step < stepTitles.length - 1 ? (
                    <PrimaryButton type="button" onClick={nextStep}>
                      Tovább
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton type="submit">Jelentkezés beküldése</PrimaryButton>
                  )}
                </div>
              </div>
            </form>
          </CardPanel>
        </div>
      </SectionWrapper>
    </PageContainer>
  );
}

function FieldGroup({
  label,
  helper,
  children,
}: {
  label: string;
  helper: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <HelperText>{helper}</HelperText>
      {children}
    </label>
  );
}

function TextAreaGroup({
  label,
  helper,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <HelperText>{helper}</HelperText>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="mt-3 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-[color:var(--muted-foreground)] focus:border-[#24473a] focus:ring-4 focus:ring-[#16372b]/8"
      />
    </label>
  );
}

function CheckboxRow({
  checked,
  onChange,
  label,
  helper,
  optional = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  helper: string;
  optional?: boolean;
}) {
  return (
    <label className="flex gap-4 rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-[color:var(--border-strong)]"
      />
      <span>
        <span className="block text-sm font-semibold text-foreground">
          {label}
          {optional ? (
            <span className="ml-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              opcionális
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-sm leading-6 text-muted-foreground">{helper}</span>
      </span>
    </label>
  );
}

function SummaryBlock({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, string]>;
}) {
  return (
    <section className="rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-5">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={`${title}-${label}`}
            className="grid gap-1 border-b border-[color:var(--border)] pb-3 last:border-b-0 last:pb-0 md:grid-cols-[0.9fr_1.1fr]"
          >
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-sm leading-6 text-foreground">{value || "Nincs megadva"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
