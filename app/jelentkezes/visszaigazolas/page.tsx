import { PageContainer, CardPanel, PrimaryButton, SectionWrapper, StatusBadge } from "@/components/ui-foundations";

const classLabels: Record<string, string> = {
  a: "A osztály",
  b: "B osztály",
  ny: "NY osztály",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ osztaly?: string }>;
}) {
  const params = await searchParams;
  const classLabel = classLabels[params.osztaly ?? ""] ?? "kiválasztott osztály";

  return (
    <PageContainer>
      <SectionWrapper>
        <CardPanel className="mx-auto max-w-3xl">
          <StatusBadge tone="accent">Jelentkezés elküldve</StatusBadge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
            Köszönjük a jelentkezést!
          </h1>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            A {classLabel.toLowerCase()} számára kitöltött minta jelentkezési lap sikeresen
            elkészült. Ebben a verzióban még nincs adatbázis vagy e-mail küldés, így ez az oldal a
            publikus sikerélményt modellezi.
          </p>

          <div className="mt-8 rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-6">
            <h2 className="text-lg font-semibold text-foreground">Mi jön ezután?</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
              <li>A későbbi verzió valódi háttérrendszerbe fogja menteni a jelentkezést.</li>
              <li>A szervezők admin felületen követhetik majd a beérkezett adatokat.</li>
              <li>A családok visszaigazoló üzenetet is kaphatnak a végleges folyamatban.</li>
            </ul>
          </div>

          <div className="mt-8">
            <PrimaryButton href="/">Vissza a nyitóoldalra</PrimaryButton>
          </div>
        </CardPanel>
      </SectionWrapper>
    </PageContainer>
  );
}
