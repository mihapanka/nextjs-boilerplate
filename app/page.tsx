import Link from "next/link";

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(199,109,67,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(77,109,92,0.22),transparent_26%),linear-gradient(180deg,#f6f0e2_0%,#efe6d4_100%)]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 lg:px-8 lg:py-10">
        <header className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-white/70 bg-[#fffdf8]/90 p-6 shadow-[0_24px_80px_rgba(20,49,39,0.12)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#143127] text-lg font-semibold text-white">
                DG
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#436852]">
                  Dobó Gólyatábor
                </p>
                <p className="text-sm text-[#436852]/80">Jelentkezési rendszer</p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-3 text-sm font-medium text-[#436852]">
              {navigationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[#143127]/15 bg-white/70 px-4 py-2 transition hover:border-[#143127]/40 hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-[#c76d43]/20 bg-[#c76d43]/10 px-4 py-2 text-sm font-medium text-[#a95630]">
                Publikus nyitóoldal
              </span>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#143127] sm:text-5xl lg:text-6xl">
                Üdvözlünk a Dobó Gólyatábor hivatalos jelentkezési felületén.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#436852] sm:text-lg">
                Ezen az oldalon indul majd a teljes online jelentkezési folyamat a leendő dobós
                gólyák számára. Most a publikus felület alapjai készültek el: jól áttekinthető
                kezdőoldal, külön jelentkezési útvonalak és hely az adminisztrációs oldalnak.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#143127]/10 bg-white/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#436852]">
                Mire szolgál ez a rendszer?
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#143127]/85">
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#c76d43]" />
                  <span>Osztályonként külön indítható jelentkezés a pontosabb folyamatokhoz.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#c76d43]" />
                  <span>Magyar nyelvű nyitóoldal a tanulóknak és a szervezőknek.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#c76d43]" />
                  <span>Előkészített route-struktúra a későbbi űrlapokhoz és adminhoz.</span>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          {registrationOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="group rounded-[1.75rem] border border-white/70 bg-[#fffdf8]/85 p-6 shadow-[0_24px_80px_rgba(20,49,39,0.12)] backdrop-blur transition hover:-translate-y-1 hover:border-[#c76d43]/30 hover:bg-white"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#436852]">
                Jelentkezés
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#143127]">
                {option.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#436852]">{option.description}</p>
              <div className="mt-6 inline-flex items-center rounded-full bg-[#143127] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#c76d43]">
                {option.label}
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#143127]/10 bg-[#143127] px-8 py-10 text-white shadow-[0_24px_80px_rgba(20,49,39,0.12)]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                Következő fejlesztési kör
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                A route-ok már készen állnak a tényleges jelentkezési oldalak és az admin felület
                fogadására.
              </h2>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-6 text-sm leading-7 text-white/80">
              Ebben a fázisban csak a statikus publikus UI készült el. Nem került még be
              adatbázis, hitelesítés vagy admin funkcionalitás, így a következő lépések tisztán
              ezekre épülhetnek majd.
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
