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

export type RegistrationInsertPayload = {
  classType: ApplicantClass;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  foodAllergy: string;
  healthNote: string;
  otherNote: string;
  consentPrivacy: boolean;
  consentParent: boolean;
  consentPhotoVideo: boolean;
};

export type RegistrationUpdatePayload = {
  status?: ApplicantStatus;
  organizerNotes?: string;
  enrolled?: boolean;
};

export type RegistrationDataMode = "supabase" | "mock";
