import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vídeos — Leonardo Silva Ribeiro";

export default function Image() {
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
        leonardosr.com.br · Vídeos
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
        Vídeos técnicos
      </h1>
      <p style={{ color: "#9ca3af", fontSize: "28px", margin: 0 }}>
        Vídeos do YouTube com conteúdo complementar e código-fonte.
      </p>
    </div>,
    size,
  );
}
