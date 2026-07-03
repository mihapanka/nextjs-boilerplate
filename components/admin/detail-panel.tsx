import { ReactNode } from "react";
import { CardPanel } from "@/components/ui-foundations";

export function DetailPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <CardPanel className="p-5">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </CardPanel>
  );
}
