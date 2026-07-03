import Link from "next/link";
import {
  CardPanel,
  PageContainer,
  PrimaryButton,
  SecondaryButton,
  SectionWrapper,
  StatusBadge,
} from "@/components/ui-foundations";

const registrationOptions = [
  {
    href: "/jelentkezes/a",
    label: "A osztály jelentkezés",
    title: "A osztály",
    description:
      "Jelentkezési felület az A osztályba érkező diákoknak, a későbbi részletes adatlap helyével.",
  },
  {
    href: "/jelentkezes/b",
    label: "B osztály jelentkezés",
    title: "B osztály",
    description:
      "Külön belépési pont a B osztály gólyáinak, hogy a megfelelő jelentkezési folyamatba érkezzenek.",
  },
  {
    href: "/jelentkezes/ny",
    label: "NY osztály jelentkezés",
    title: "NY osztály",
    description:
      "A nyelvi előkészítő osztály tanulói számára kialakított jelentkezési oldal előkészítése.",
  },
];

const navigationLinks = [
  { href: "/jelentkezes/a", label: "A osztály" },
  { href: "/jelentkezes/b", label: "B osztály" },
  { href: "/jelentkezes/ny", label: "NY osztály" },
  { href: "/admin", label: "Admin" },
];

export default function HomePage() {
  return (
    <PageContainer>
      <div className="flex min-h-screen flex-col">
        <SectionWrapper className="pb-4">
          <CardPanel className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[color:var(--border-strong)] bg-[color:var(--surface-subtle)] text-base font-semibold text-foreground">
                DG
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Dobó Gólyatábor
                </p>
                <p className="text-sm text-muted-foreground">Jelentkezési rendszer</p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
              {navigationLinks.map((item) => (
                <SecondaryButton key={item.href} href={item.href}>
                  {item.label}
                </SecondaryButton>
              ))}
            </nav>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-5">
              <StatusBadge tone="accent">Publikus nyitóoldal</StatusBadge>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.7rem]">
                Üdvözlünk a Dobó Gólyatábor hivatalos jelentkezési felületén.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Ezen az oldalon indul majd a teljes online jelentkezési folyamat a leendő dobós
                gólyák számára. Most a publikus felület alapjai készültek el: jól áttekinthető
                kezdőoldal, külön jelentkezési útvonalak és hely az adminisztrációs oldalnak.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryButton href="/jelentkezes/a">Jelentkezés indítása</PrimaryButton>
                <SecondaryButton href="/admin">Admin előnézet</SecondaryButton>
              </div>
            </div>

            <CardPanel className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Mire szolgál ez a rendszer?
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#314a3f]" />
                  <span>Osztályonként külön indítható jelentkezés a pontosabb folyamatokhoz.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#314a3f]" />
                  <span>Magyar nyelvű nyitóoldal a tanulóknak és a szervezőknek.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#314a3f]" />
                  <span>Előkészített route-struktúra a későbbi űrlapokhoz és adminhoz.</span>
                </li>
              </ul>
            </CardPanel>
          </div>
          </CardPanel>
        </SectionWrapper>

        <SectionWrapper className="pt-2">
          <div className="grid gap-4 lg:grid-cols-3">
          {registrationOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="group"
            >
              <CardPanel className="h-full p-6 transition group-hover:border-[#cfd6d2]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Jelentkezés
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                  {option.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{option.description}</p>
                <div className="mt-6">
                  <span className="inline-flex items-center rounded-[8px] border border-[color:var(--border-strong)] bg-[color:var(--surface-subtle)] px-4 py-2 text-sm font-semibold text-foreground transition group-hover:bg-white">
                    {option.label}
                  </span>
                </div>
              </CardPanel>
            </Link>
          ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-2">
          <CardPanel className="bg-[color:var(--surface-subtle)] px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Következő fejlesztési kör
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                A route-ok már készen állnak a tényleges jelentkezési oldalak és az admin felület
                fogadására.
              </h2>
            </div>
            <div className="rounded-[10px] border border-[color:var(--border)] bg-white p-6 text-sm leading-7 text-muted-foreground">
              Ebben a fázisban csak a statikus publikus UI készült el. Nem került még be
              adatbázis, hitelesítés vagy admin funkcionalitás, így a következő lépések tisztán
              ezekre épülhetnek majd.
            </div>
          </div>
          </CardPanel>
        </SectionWrapper>
      </div>
    </PageContainer>
  );
}
