import { ApplicantStatus } from "@/lib/mock-admin-data";

const styles: Record<ApplicantStatus, string> = {
  "új jelentkezés": "border-[#dce7e1] bg-[#f6faf8] text-[#305446]",
  visszaigazolva: "border-[#dce4ef] bg-[#f7f9fc] text-[#39506b]",
  "hiányos adat": "border-[#ead9cf] bg-[#fcf8f6] text-[#8a4424]",
  "beiratkozásra vár": "border-[#ece7d4] bg-[#fbfaf5] text-[#73622a]",
  beiratkozott: "border-[#d7e6dc] bg-[#f6faf7] text-[#2f5a42]",
  lemondta: "border-[#e8dddd] bg-[#fbf7f7] text-[#7d4f4f]",
  várólista: "border-[#e3e1ec] bg-[#f9f8fc] text-[#5b5577]",
};

export function AdminStatusBadge({ status }: { status: ApplicantStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-[8px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}
