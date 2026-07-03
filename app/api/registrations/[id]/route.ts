import { NextResponse } from "next/server";
import { updateRegistration } from "@/lib/registrations";
import { ApplicantStatus } from "@/lib/registration-types";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      status?: ApplicantStatus;
      organizerNotes?: string;
      enrolled?: boolean;
    };

    const result = await updateRegistration(id, body);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, mode: result.mode, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, mode: result.mode, applicant: result.applicant });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Ismeretlen hiba történt a mentés során.",
      },
      { status: 500 }
    );
  }
}
