import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leonardosr.com.br"),
  title: {
    default: "Leonardo Silva Ribeiro | React, Next.js e Spring Boot",
    template: "%s | Leonardo Silva Ribeiro",
  },
  description:
    "Site pessoal, portfólio profissional e hub de conteúdos técnicos sobre React, Next.js, Java e Spring Boot.",
  applicationName: "leonardosr.com.br",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://leonardosr.com.br",
    siteName: "Leonardo Silva Ribeiro",
    title: "Leonardo Silva Ribeiro | React, Next.js e Spring Boot",
    description:
      "Portfólio profissional e hub de conteúdos técnicos sobre arquitetura web moderna.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const theme =
    cookieStore.get("lsr-theme")?.value === "light" ? "light" : "dark";

  return (
    <html lang="pt-BR" data-theme={theme} style={fontVariables.style}>
      <body>
        <div className="page-shell">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
