import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={joinClasses("min-h-screen bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</div>
    </main>
  );
}

export function SectionWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={joinClasses("py-6 sm:py-8", className)}>{children}</section>;
}

export function CardPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={joinClasses(
        "rounded-[14px] border border-[color:var(--border)] bg-white p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  className,
  href,
  ...props
}: ComponentPropsWithoutRef<"button"> & { href?: string }) {
  const classes = joinClasses(
    "inline-flex items-center justify-center rounded-[8px] border border-[#16372b] bg-[#16372b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24473a] disabled:cursor-not-allowed disabled:opacity-50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={joinClasses(
        "inline-flex items-center justify-center rounded-[8px] border border-[color:var(--border-strong)] bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-[color:var(--surface-subtle)]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function FormInput({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={joinClasses(
        "mt-3 w-full rounded-[10px] border border-[color:var(--border-strong)] bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-[color:var(--muted-foreground)] focus:border-[#24473a] focus:ring-4 focus:ring-[#16372b]/8",
        className
      )}
    />
  );
}

export function FieldLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={joinClasses("block text-sm font-semibold text-foreground", className)}>
      {children}
    </span>
  );
}

export function HelperText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={joinClasses("mt-1 block text-sm leading-6 text-muted-foreground", className)}>
      {children}
    </span>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}) {
  return (
    <span
      className={joinClasses(
        "inline-flex items-center rounded-[8px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "accent"
          ? "border-[#d8ddd9] bg-[#f8faf8] text-[#315446]"
          : "border-[color:var(--border)] bg-[color:var(--surface-subtle)] text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
