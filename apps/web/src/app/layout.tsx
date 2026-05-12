import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { safeFetch } from "@/lib/api/errors";
import { getProfile, getSeoSettings } from "@/lib/api/public";
import { buildBaseMetadata } from "@/lib/seo/build-metadata";
import { buildPersonSchema, buildWebSiteSchema } from "@/lib/seo/json-ld";
import { fontVariables } from "./fonts";
import "./globals.css";

const FALLBACK_SEO = {
  defaultTitle: "Leonardo Silva Ribeiro | React, Next.js e Spring Boot",
  defaultDescription:
    "Site pessoal, portfólio profissional e hub de conteúdos técnicos sobre React, Next.js, Java e Spring Boot.",
  defaultLocale: "pt_BR",
  defaultAuthorName: "Leonardo Silva Ribeiro",
  defaultOgImageUrl: null,
  siteUrl: "https://leonardosr.com.br",
  mediaCdnBaseUrl: "",
  twitterHandle: null,
  robotsPolicy: "disallow_admin",
  googleVerification: null,
  bingVerification: null,
};

const FALLBACK_PROFILE = {
  id: 0,
  displayName: "Leonardo Silva Ribeiro",
  professionalTitle: "React, Next.js e Spring Boot",
  headline: "Arquitetura e desenvolvimento web moderno.",
  shortBio: "Portfólio profissional e hub de conteúdo técnico.",
  fullBio: "Perfil em carregamento.",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await safeFetch(getSeoSettings, FALLBACK_SEO, "layout.seo");
  return buildBaseMetadata(seo);
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [seo, profile] = await Promise.all([
    safeFetch(getSeoSettings, FALLBACK_SEO, "layout.seo"),
    safeFetch(getProfile, FALLBACK_PROFILE, "layout.profile"),
  ]);

  return (
    <html lang="pt-BR" suppressHydrationWarning style={fontVariables.style}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=document.cookie.match(/lsr-theme=([^;]+)/);document.documentElement.setAttribute('data-theme',t&&t[1]==='light'?'light':'dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <JsonLd data={buildPersonSchema(profile, seo)} />
        <JsonLd data={buildWebSiteSchema(seo)} />
        <div className="page-shell">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
