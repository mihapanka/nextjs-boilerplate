import Link from "next/link";

export default function AClassRegistrationPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(199,109,67,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(77,109,92,0.22),transparent_26%),linear-gradient(180deg,#f6f0e2_0%,#efe6d4_100%)] px-6 py-10">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-[#fffdf8]/90 p-8 shadow-[0_24px_80px_rgba(20,49,39,0.12)] backdrop-blur md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#436852]">
          Jelentkezés / A osztály
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#143127]">
          A osztály jelentkezés
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#436852]">
          Ez lesz az A osztály jelentkezési oldala. A tényleges űrlap és az adatok rögzítése egy
          későbbi fejlesztési körben kerül ide.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#143127] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c76d43]"
        >
          Vissza a nyitóoldalra
        </Link>
      </section>
    </main>
  );
}
