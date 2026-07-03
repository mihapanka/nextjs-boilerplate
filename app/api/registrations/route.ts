import { NextResponse } from "next/server";
import { createRegistration } from "@/lib/registrations";
import { ApplicantClass } from "@/lib/registration-types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
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

    const result = await createRegistration(body);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, mode: result.mode, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, mode: result.mode, id: result.id });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Ismeretlen hiba történt a beküldés során.",
      },
      { status: 500 }
    );
  }
}
