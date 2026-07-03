export type ApplicantStatus =
  | "új jelentkezés"
  | "visszaigazolva"
  | "hiányos adat"
  | "beiratkozásra vár"
  | "beiratkozott"
  | "lemondta"
  | "várólista";

export type ApplicantClass = "A" | "B" | "NY";

export type Applicant = {
  id: string;
  studentName: string;
  classType: ApplicantClass;
  status: ApplicantStatus;
  studentEmail: string;
  studentPhone: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  allergies: string;
  healthNotes: string;
  additionalNotes: string;
  enrolled: boolean;
  lastUpdated: string;
  organizerNotes: string;
  acceptsPrivacy: boolean;
  guardianAcknowledgement: boolean;
  mediaConsent: boolean;
  emailHistory: Array<{
    id: string;
    subject: string;
    sentAt: string;
    summary: string;
  }>;
};

export const applicants: Applicant[] = [
  {
    id: "a-001",
    studentName: "Kovács Anna",
    classType: "A",
    status: "új jelentkezés",
    studentEmail: "kovacs.anna@email.hu",
    studentPhone: "+36 30 111 2233",
    guardianName: "Kovács Éva",
    guardianEmail: "eva.kovacs@email.hu",
    guardianPhone: "+36 20 456 7788",
    allergies: "Laktózérzékenység",
    healthNotes: "Rendszeresen szed antihisztamint.",
    additionalNotes: "Első alkalommal jön gólyatáborba.",
    enrolled: false,
    lastUpdated: "2026-07-02 18:40",
    organizerNotes: "Telefonos megerősítés még hiányzik.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [
      {
        id: "mail-1",
        subject: "Jelentkezés fogadva",
        sentAt: "2026-07-02 18:42",
        summary: "Automatikus köszönőüzenet a beérkezett jelentkezésről.",
      },
    ],
  },
  {
    id: "a-002",
    studentName: "Tóth Benedek",
    classType: "A",
    status: "visszaigazolva",
    studentEmail: "toth.beni@email.hu",
    studentPhone: "+36 30 222 1133",
    guardianName: "Tóth Zsuzsa",
    guardianEmail: "toth.zsuzsa@email.hu",
    guardianPhone: "+36 70 555 2134",
    allergies: "",
    healthNotes: "",
    additionalNotes: "Kollégiumi férőhelyről érdeklődtek.",
    enrolled: false,
    lastUpdated: "2026-07-03 09:12",
    organizerNotes: "Minden adat rendben.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: false,
    emailHistory: [
      {
        id: "mail-2",
        subject: "Visszaigazolás elküldve",
        sentAt: "2026-07-03 09:15",
        summary: "Részletes tájékoztató a következő lépésekről.",
      },
    ],
  },
  {
    id: "a-003",
    studentName: "Szalai Gergő",
    classType: "A",
    status: "hiányos adat",
    studentEmail: "szalai.gergo@email.hu",
    studentPhone: "",
    guardianName: "Szalai Judit",
    guardianEmail: "judit.szalai@email.hu",
    guardianPhone: "+36 20 777 1221",
    allergies: "Mogyoróallergia",
    healthNotes: "EpiPen a családnál rendelkezésre áll.",
    additionalNotes: "Hiányzik a diák telefonszáma.",
    enrolled: false,
    lastUpdated: "2026-07-01 14:20",
    organizerNotes: "Hiánypótlás kérése szükséges.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [
      {
        id: "mail-3",
        subject: "Hiányzó adatok",
        sentAt: "2026-07-01 14:25",
        summary: "Kiegészítő adatbekérés a telefonszám miatt.",
      },
    ],
  },
  {
    id: "b-001",
    studentName: "Farkas Lili",
    classType: "B",
    status: "beiratkozásra vár",
    studentEmail: "farkas.lili@email.hu",
    studentPhone: "+36 30 987 6543",
    guardianName: "Farkas Kata",
    guardianEmail: "kata.farkas@email.hu",
    guardianPhone: "+36 20 111 3344",
    allergies: "",
    healthNotes: "Vegetáriánus étkezést kér.",
    additionalNotes: "",
    enrolled: false,
    lastUpdated: "2026-07-03 08:30",
    organizerNotes: "Beiratkozási időpont egyeztetve.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [
      {
        id: "mail-4",
        subject: "Beiratkozási időpont",
        sentAt: "2026-07-03 08:35",
        summary: "Személyes beiratkozási sáv megküldve.",
      },
    ],
  },
  {
    id: "b-002",
    studentName: "Nagy Márk",
    classType: "B",
    status: "beiratkozott",
    studentEmail: "nagy.mark@email.hu",
    studentPhone: "+36 30 765 4321",
    guardianName: "Nagy Eszter",
    guardianEmail: "eszter.nagy@email.hu",
    guardianPhone: "+36 70 876 5432",
    allergies: "Gluténérzékenység",
    healthNotes: "",
    additionalNotes: "Már leadták a papírokat.",
    enrolled: true,
    lastUpdated: "2026-07-03 10:18",
    organizerNotes: "Beiratkozva, karszalag kiadva.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: false,
    emailHistory: [
      {
        id: "mail-5",
        subject: "Beiratkozás rögzítve",
        sentAt: "2026-07-03 10:20",
        summary: "A beiratkozás adminisztratív lezárása megtörtént.",
      },
    ],
  },
  {
    id: "b-003",
    studentName: "Balogh Petra",
    classType: "B",
    status: "várólista",
    studentEmail: "balogh.petra@email.hu",
    studentPhone: "+36 30 112 2244",
    guardianName: "Balogh Ákos",
    guardianEmail: "balogh.akos@email.hu",
    guardianPhone: "+36 20 990 8877",
    allergies: "",
    healthNotes: "",
    additionalNotes: "Második turnus felszabadulása esetén értesíteni.",
    enrolled: false,
    lastUpdated: "2026-06-30 17:02",
    organizerNotes: "Várólistás prioritás közepes.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [],
  },
  {
    id: "b-004",
    studentName: "Molnár Zsófi",
    classType: "B",
    status: "lemondta",
    studentEmail: "molnar.zsofi@email.hu",
    studentPhone: "+36 30 554 3322",
    guardianName: "Molnár Katalin",
    guardianEmail: "katalin.molnar@email.hu",
    guardianPhone: "+36 20 114 5588",
    allergies: "Tojásallergia",
    healthNotes: "",
    additionalNotes: "Családi okból mégsem tud részt venni.",
    enrolled: false,
    lastUpdated: "2026-07-02 11:47",
    organizerNotes: "Hely felszabadult, várólistát frissíteni.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [
      {
        id: "mail-6",
        subject: "Lemondás visszaigazolva",
        sentAt: "2026-07-02 11:50",
        summary: "A lemondást adminisztrációsan lezártuk.",
      },
    ],
  },
  {
    id: "ny-001",
    studentName: "Varga Levente",
    classType: "NY",
    status: "új jelentkezés",
    studentEmail: "varga.levente@email.hu",
    studentPhone: "+36 30 101 0101",
    guardianName: "Varga Rita",
    guardianEmail: "rita.varga@email.hu",
    guardianPhone: "+36 20 505 1234",
    allergies: "",
    healthNotes: "Asztma miatt inhalátor van nála.",
    additionalNotes: "",
    enrolled: false,
    lastUpdated: "2026-07-03 07:58",
    organizerNotes: "Egészségügyi megjegyzést érdemes kiemelni.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [],
  },
  {
    id: "ny-002",
    studentName: "Kiss Dorottya",
    classType: "NY",
    status: "visszaigazolva",
    studentEmail: "kiss.dori@email.hu",
    studentPhone: "+36 30 223 3445",
    guardianName: "Kiss Zoltán",
    guardianEmail: "zoltan.kiss@email.hu",
    guardianPhone: "+36 70 444 2233",
    allergies: "Laktózérzékenység",
    healthNotes: "",
    additionalNotes: "",
    enrolled: false,
    lastUpdated: "2026-07-02 19:05",
    organizerNotes: "Tájékoztató elküldve.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: false,
    emailHistory: [
      {
        id: "mail-7",
        subject: "Tábori információk",
        sentAt: "2026-07-02 19:10",
        summary: "Általános felkészítő információk megküldve.",
      },
    ],
  },
  {
    id: "ny-003",
    studentName: "Oláh Noel",
    classType: "NY",
    status: "hiányos adat",
    studentEmail: "olah.noel@email.hu",
    studentPhone: "+36 30 998 1122",
    guardianName: "Oláh Krisztina",
    guardianEmail: "",
    guardianPhone: "+36 20 776 5544",
    allergies: "",
    healthNotes: "",
    additionalNotes: "Hiányzik a szülő e-mail-címe.",
    enrolled: false,
    lastUpdated: "2026-07-01 09:54",
    organizerNotes: "E-mail cím hiánya miatt utánkövetés kell.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [],
  },
  {
    id: "ny-004",
    studentName: "Papp Hanna",
    classType: "NY",
    status: "beiratkozásra vár",
    studentEmail: "papp.hanna@email.hu",
    studentPhone: "+36 30 414 1414",
    guardianName: "Papp Gábor",
    guardianEmail: "gabor.papp@email.hu",
    guardianPhone: "+36 20 909 8080",
    allergies: "Vegetáriánus étkezés",
    healthNotes: "",
    additionalNotes: "Külön ülésrend nem szükséges.",
    enrolled: false,
    lastUpdated: "2026-07-03 08:48",
    organizerNotes: "Beiratkozási csomag előkészítve.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [],
  },
  {
    id: "a-004",
    studentName: "Barta Máté",
    classType: "A",
    status: "beiratkozott",
    studentEmail: "barta.mate@email.hu",
    studentPhone: "+36 30 616 1717",
    guardianName: "Barta Andrea",
    guardianEmail: "andrea.barta@email.hu",
    guardianPhone: "+36 70 717 1010",
    allergies: "",
    healthNotes: "",
    additionalNotes: "Minden dokumentum leadva.",
    enrolled: true,
    lastUpdated: "2026-07-03 10:42",
    organizerNotes: "Beiratkozás sikeres, tagszám egyeztetve.",
    acceptsPrivacy: true,
    guardianAcknowledgement: true,
    mediaConsent: true,
    emailHistory: [
      {
        id: "mail-8",
        subject: "Beiratkozás lezárva",
        sentAt: "2026-07-03 10:45",
        summary: "Minden szükséges adat rögzítve.",
      },
    ],
  },
];

export const organizerTasks = [
  "Hiánypótlás kérése a hiányos adatú jelentkezőknél.",
  "Beiratkozási idősávok véglegesítése a még várakozó családoknak.",
  "Allergiás és speciális étrendű diákok listájának egyeztetése a konyhával.",
  "Várólistás jelentkezők állapotának átnézése a felszabadult helyek alapján.",
];

export const latestRegistrations = applicants.slice(0, 5);

export const settingsDefaults = {
  campYear: "2026",
  campDate: "2026. augusztus 26–28.",
  location: "Egri Dobó István Gimnázium",
  registrationDeadlines: "A és B osztály: augusztus 10. / NY osztály: augusztus 12.",
  contactEmail: "golyatabor@dobo.hu",
  packingListUrl: "https://example.com/mit-hozz-magaddal",
  abRegistrationState: "nyitott",
  nyRegistrationState: "nyitott",
};

export function getApplicantById(id: string) {
  return applicants.find((applicant) => applicant.id === id);
}

export function getDashboardStats() {
  return {
    total: applicants.length,
    classA: applicants.filter((applicant) => applicant.classType === "A").length,
    classB: applicants.filter((applicant) => applicant.classType === "B").length,
    classNy: applicants.filter((applicant) => applicant.classType === "NY").length,
    incomplete: applicants.filter((applicant) => applicant.status === "hiányos adat").length,
    enrolled: applicants.filter((applicant) => applicant.enrolled).length,
  };
}
