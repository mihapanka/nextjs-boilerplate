import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dobó Gólyatábor jelentkezés",
  description:
    "Online jelentkezési rendszer a Dobó Gólyatábor szervezésének támogatására.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
