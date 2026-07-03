import { ReactNode } from "react";
import { CardPanel } from "@/components/ui-foundations";

export function FilterBar({ children }: { children: ReactNode }) {
  return <CardPanel className="p-5">{children}</CardPanel>;
}
