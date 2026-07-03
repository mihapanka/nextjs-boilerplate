import { CardPanel } from "@/components/ui-foundations";

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <CardPanel className="p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      {hint ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{hint}</p> : null}
    </CardPanel>
  );
}
