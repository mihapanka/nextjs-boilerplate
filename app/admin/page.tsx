import Link from "next/link";
import { CardPanel, PageContainer, PrimaryButton, SectionWrapper } from "@/components/ui-foundations";

export default function AdminPage() {
  return (
    <PageContainer>
      <SectionWrapper>
        <CardPanel className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            Admin felület
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Ez a jövőbeli szervezői admin oldal helye. Ebben a körben csak a route struktúra készült
            el, hitelesítés és funkcionalitás nélkül.
          </p>
          <div className="mt-8">
            <PrimaryButton href="/">Vissza a nyitóoldalra</PrimaryButton>
          </div>
        </CardPanel>
      </SectionWrapper>
    </PageContainer>
  );
}
