import { ImageResponse } from "next/og";
import { getContentBySlug } from "@/lib/api/public";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;

  let title = "Arquitetura";
  try {
    const content = await getContentBySlug(slug);
    if (content.type === "ARCHITECTURE") title = content.title;
  } catch {
    // fallback silencioso
  }

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
          fontSize: "18px",
          marginBottom: "12px",
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        leonardosr.com.br · Arquitetura
      </p>
      <h1
        style={{
          color: "#ececec",
          fontSize: title.length > 60 ? "40px" : "52px",
          fontWeight: 600,
          lineHeight: 1.2,
          margin: "0 0 20px",
        }}
      >
        {title}
      </h1>
      <p style={{ color: "#9ca3af", fontSize: "22px", margin: 0 }}>
        leonardosr.com.br
      </p>
    </div>,
    size,
  );
}
