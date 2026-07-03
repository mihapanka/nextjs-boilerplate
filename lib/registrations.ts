import { applicants as mockApplicants, organizerTasks, settingsDefaults } from "@/lib/mock-admin-data";
import {
  Applicant,
  ApplicantClass,
  ApplicantStatus,
  RegistrationDataMode,
  RegistrationInsertPayload,
  RegistrationUpdatePayload,
} from "@/lib/registration-types";
import { getSupabaseEnv } from "@/lib/supabase-env";

type RegistrationRow = {
  id: string;
  created_at: string;
  updated_at: string;
  class_type: ApplicantClass;
  status: ApplicantStatus;
  student_name: string;
  student_email: string;
  student_phone: string;
  guardian_name: string;
  guardian_email: string;
  guardian_phone: string;
  food_allergy: string;
  health_note: string;
  other_note: string;
  consent_privacy: boolean;
  consent_parent: boolean;
  consent_photo_video: boolean;
  organizer_notes: string;
  enrolled: boolean;
};

export { organizerTasks, settingsDefaults };

export async function getRegistrations() {
  const env = getSupabaseEnv();

  if (!env.isConfigured) {
    return {
      mode: "mock" as RegistrationDataMode,
      applicants: mockApplicants,
      error: null as string | null,
    };
  }

  try {
    const rows = await fetchSupabase<RegistrationRow[]>(
      "registrations?select=*&order=created_at.desc"
    );

    return {
      mode: "supabase" as RegistrationDataMode,
      applicants: rows.map(mapRowToApplicant),
      error: null as string | null,
    };
  } catch (error) {
    return {
      mode: "supabase" as RegistrationDataMode,
      applicants: [] as Applicant[],
      error: error instanceof Error ? error.message : "Nem sikerült betölteni a jelentkezéseket.",
    };
  }
}

export async function getRegistrationById(id: string) {
  const env = getSupabaseEnv();

  if (!env.isConfigured) {
    return {
      mode: "mock" as RegistrationDataMode,
      applicant: mockApplicants.find((item) => item.id === id) ?? null,
      error: null as string | null,
    };
  }

  try {
    const encodedId = encodeURIComponent(id);
    const rows = await fetchSupabase<RegistrationRow[]>(
      `registrations?select=*&id=eq.${encodedId}&limit=1`
    );

    return {
      mode: "supabase" as RegistrationDataMode,
      applicant: rows[0] ? mapRowToApplicant(rows[0]) : null,
      error: null as string | null,
    };
  } catch (error) {
    return {
      mode: "supabase" as RegistrationDataMode,
      applicant: null,
      error: error instanceof Error ? error.message : "Nem sikerült betölteni a jelentkező adatlapját.",
    };
  }
}

export async function createRegistration(payload: RegistrationInsertPayload) {
  const env = getSupabaseEnv();

  if (!env.isConfigured) {
    return {
      ok: true,
      mode: "mock" as RegistrationDataMode,
      id: `mock-${Date.now()}`,
      error: null as string | null,
    };
  }

  try {
    const rows = await fetchSupabase<RegistrationRow[]>("registrations", {
      method: "POST",
      body: JSON.stringify([
        {
          class_type: payload.classType,
          status: "új jelentkezés",
          student_name: payload.studentName,
          student_email: payload.studentEmail,
          student_phone: payload.studentPhone,
          guardian_name: payload.guardianName,
          guardian_email: payload.guardianEmail,
          guardian_phone: payload.guardianPhone,
          food_allergy: payload.foodAllergy,
          health_note: payload.healthNote,
          other_note: payload.otherNote,
          consent_privacy: payload.consentPrivacy,
          consent_parent: payload.consentParent,
          consent_photo_video: payload.consentPhotoVideo,
          organizer_notes: "",
          enrolled: false,
        },
      ]),
    });

    return {
      ok: true,
      mode: "supabase" as RegistrationDataMode,
      id: rows[0]?.id ?? null,
      error: null as string | null,
    };
  } catch (error) {
    return {
      ok: false,
      mode: "supabase" as RegistrationDataMode,
      id: null,
      error:
        error instanceof Error
          ? error.message
          : "Nem sikerült elmenteni a jelentkezést a Supabase adatbázisba.",
    };
  }
}

export async function updateRegistration(id: string, payload: RegistrationUpdatePayload) {
  const env = getSupabaseEnv();

  if (!env.isConfigured) {
    const fallbackApplicant = mockApplicants.find((item) => item.id === id) ?? null;

    return {
      ok: true,
      mode: "mock" as RegistrationDataMode,
      applicant: fallbackApplicant,
      error: null as string | null,
    };
  }

  try {
    const encodedId = encodeURIComponent(id);
    const rows = await fetchSupabase<RegistrationRow[]>(`registrations?id=eq.${encodedId}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...(payload.status ? { status: payload.status } : {}),
        ...(payload.organizerNotes !== undefined
          ? { organizer_notes: payload.organizerNotes }
          : {}),
        ...(payload.enrolled !== undefined ? { enrolled: payload.enrolled } : {}),
      }),
    });

    return {
      ok: true,
      mode: "supabase" as RegistrationDataMode,
      applicant: rows[0] ? mapRowToApplicant(rows[0]) : null,
      error: null as string | null,
    };
  } catch (error) {
    return {
      ok: false,
      mode: "supabase" as RegistrationDataMode,
      applicant: null,
      error:
        error instanceof Error
          ? error.message
          : "Nem sikerült menteni a jelentkező módosításait a Supabase felé.",
    };
  }
}

export function getDashboardStats(applicants: Applicant[]) {
  return {
    total: applicants.length,
    classA: applicants.filter((applicant) => applicant.classType === "A").length,
    classB: applicants.filter((applicant) => applicant.classType === "B").length,
    classNy: applicants.filter((applicant) => applicant.classType === "NY").length,
    incomplete: applicants.filter((applicant) => applicant.status === "hiányos adat").length,
    enrolled: applicants.filter((applicant) => applicant.enrolled).length,
  };
}

export function getLatestRegistrations(applicants: Applicant[]) {
  return applicants.slice(0, 5);
}

function mapRowToApplicant(row: RegistrationRow): Applicant {
  return {
    id: row.id,
    studentName: row.student_name,
    classType: row.class_type,
    status: row.status,
    studentEmail: row.student_email,
    studentPhone: row.student_phone ?? "",
    guardianName: row.guardian_name,
    guardianEmail: row.guardian_email,
    guardianPhone: row.guardian_phone,
    allergies: row.food_allergy ?? "",
    healthNotes: row.health_note ?? "",
    additionalNotes: row.other_note ?? "",
    enrolled: row.enrolled,
    lastUpdated: formatDateTime(row.updated_at),
    organizerNotes: row.organizer_notes ?? "",
    acceptsPrivacy: row.consent_privacy,
    guardianAcknowledgement: row.consent_parent,
    mediaConsent: row.consent_photo_video,
    emailHistory: [],
  };
}

async function fetchSupabase<T>(path: string, init?: RequestInit) {
  const env = getSupabaseEnv();

  if (!env.url || !env.anonKey) {
    throw new Error("A Supabase környezeti változói hiányoznak.");
  }

  const response = await fetch(`${env.url}/rest/v1/${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      apikey: env.anonKey,
      Authorization: `Bearer ${env.anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase hiba: ${details || response.statusText}`);
  }

  return (await response.json()) as T;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
