# Dobó Gólyatábor regisztrációs rendszer

Ez a projekt egy Next.js alapú Dobó Gólyatábor alkalmazás, amely tartalmazza:

- publikus jelentkezési folyamatot A, B és NY osztály számára
- admin áttekintő és kezelőfelületeket
- Supabase integrációt valós jelentkezések mentéséhez és betöltéséhez
- mock fallback módot arra az esetre, ha a Supabase környezeti változók még nincsenek beállítva

## Fejlesztői indítás

Először telepítsd a függőségeket, majd indítsd a fejlesztői szervert:

```bash
npm install
npm run dev
```

Az alkalmazás alapértelmezetten a `http://localhost:3000` címen érhető el.

## Supabase beállítás

### 1. Supabase projekt létrehozása

1. Hozz létre egy új projektet a [Supabase](https://supabase.com/) felületén.
2. Nyisd meg a projekt `Settings > API` oldalát.
3. Másold ki az alábbi értékeket:
   - `Project URL`
   - `anon public` kulcs

### 2. Környezeti változók

A projekt gyökerében hozz létre egy `.env.local` fájlt az alábbi tartalommal:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Fontos:

- ne írj kulcsot közvetlenül a kódba
- a publikus kliensoldali kapcsolódáshoz csak a `NEXT_PUBLIC_SUPABASE_ANON_KEY` kulcsot használd
- a jelenlegi verzió kizárólag ezeket a környezeti változókat várja

### 3. Adatbázis séma létrehozása

A szükséges SQL a `supabase/schema.sql` fájlban található.

Lépések:

1. Nyisd meg a Supabase projekt `SQL Editor` felületét.
2. Másold be a `supabase/schema.sql` teljes tartalmát.
3. Futtasd le az SQL-t.

A séma létrehozza a `registrations` táblát az alábbi fő mezőkkel:

- `class_type`
- `status`
- `student_name`, `student_email`, `student_phone`
- `guardian_name`, `guardian_email`, `guardian_phone`
- `food_allergy`, `health_note`, `other_note`
- `consent_privacy`, `consent_parent`, `consent_photo_video`
- `organizer_notes`
- `enrolled`
- `created_at`, `updated_at`

Alapértelmezések:

- `status = 'új jelentkezés'`
- `enrolled = false`

### 4. RLS és jelenlegi hozzáférés

A mellékelt SQL egyszerű, fejlesztésbarát RLS policy-kat hoz létre, hogy:

- a publikus jelentkezési űrlap tudjon beszúrni új rekordot
- az admin felület tudjon listázni és módosítani rekordokat

Ez a jelenlegi körben még nem tartalmaz külön authentikációt vagy szigorú admin jogosultságkezelést. Ezeket egy későbbi lépésben érdemes szűkíteni.

## Hogyan működik a fallback mód

Ha bármelyik Supabase környezeti változó hiányzik, az alkalmazás nem áll le.

Ilyenkor:

- a publikus jelentkezési folyamat minta módban fut
- az admin oldalak mock adatokat mutatnak
- a felület jelzi, hogy nem élő adatforrást használ

Ez hasznos fejlesztéshez, demóhoz és UI validációhoz.

## Lokális tesztelés

### Publikus jelentkezés tesztelése

1. állítsd be a `.env.local` fájlt
2. futtasd a `supabase/schema.sql` sémát a projektedben
3. indítsd el a fejlesztői szervert: `npm run dev`
4. nyisd meg például a következő oldalt:
   - `http://localhost:3000/jelentkezes/a`
5. töltsd ki a több lépéses űrlapot
6. küldd be a jelentkezést
7. ellenőrizd, hogy a rekord megjelent-e a Supabase `registrations` táblában
8. ellenőrizd az admin oldalak egyikét:
   - `http://localhost:3000/admin`
   - `http://localhost:3000/admin/jelentkezok`
   - `http://localhost:3000/admin/beiratkozas`

### Mit kell látnod sikeres teszt esetén

- a beküldés után megjelenik a visszaigazoló oldal
- az admin dashboard valós statisztikákat mutat
- a jelentkezőlista a Supabase rekordokat tölti be
- az egyedi adatlapról menthető a státusz, a szervezői jegyzet és a beiratkozási állapot

## Jelenlegi határok

Ebben a verzióban még nincs:

- email küldés
- Supabase Auth vagy más authentikáció
- szerepkör alapú admin jogosultságkezelés
- AI funkció

A cél most az, hogy a publikus űrlap és az admin oldalak már valós Supabase adatokkal működjenek, miközben a mostani letisztult fehér UI megmarad.
