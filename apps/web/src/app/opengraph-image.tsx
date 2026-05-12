import { ImageResponse } from "next/og";
import { safeFetch } from "@/lib/api/errors";
import { getProfile } from "@/lib/api/public";
import type { Profile } from "@/lib/api/types";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Leonardo Silva Ribeiro — React, Next.js e Spring Boot";

const FALLBACK: Profile = {
  id: 0,
  displayName: "Leonardo Silva Ribeiro",
  professionalTitle: "React · Next.js · Spring Boot",
  headline: "Arquitetura e desenvolvimento web moderno com clareza técnica.",
  shortBio: "",
  fullBio: "",
};

export default async function Image() {
  const profile = await safeFetch(getProfile, FALLBACK, "og.profile");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "64px",
        background: "#0d0e10",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "#d97757",
        }}
      />
      <p
        style={{
          color: "#6b7280",
          fontSize: "20px",
          marginBottom: "16px",
          fontFamily: "monospace",
        }}
      >
        leonardosr.com.br
      </p>
      <h1
        style={{
          color: "#ececec",
          fontSize: "56px",
          fontWeight: 600,
          lineHeight: 1.15,
          margin: "0 0 20px",
        }}
      >
        {profile.displayName}
      </h1>
      <p
        style={{
          color: "#9ca3af",
          fontSize: "28px",
          margin: 0,
        }}
      >
        {profile.headline}
      </p>
    </div>,
    size,
  );
}
