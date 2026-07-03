import { ReactNode } from "react";
import { PageContainer, SectionWrapper, SecondaryButton } from "@/components/ui-foundations";

const adminNav = [
  { href: "/admin", label: "Áttekintés" },
  { href: "/admin/jelentkezok", label: "Jelentkezők" },
  { href: "/admin/beiratkozas", label: "Beiratkozás" },
  { href: "/admin/beallitasok", label: "Beállítások" },
];

export function AdminLayout({
  eyebrow,
  title,
  description,
  children,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <PageContainer>
      <SectionWrapper className="pb-4">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{description}</p>
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </header>

          <nav className="flex flex-wrap gap-3">
            {adminNav.map((item) => (
              <SecondaryButton key={item.href} href={item.href}>
                {item.label}
              </SecondaryButton>
            ))}
          </nav>

          {children}
        </div>
      </SectionWrapper>
    </PageContainer>
  );
}
