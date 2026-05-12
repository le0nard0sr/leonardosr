import { ImageResponse } from "next/og";
import { ApiError } from "@/lib/api/client";
import { getProjectBySlug } from "@/lib/api/public";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export const alt = "Projeto";

export default async function Image({ params }: Props) {
  const { slug } = await params;

  let name = slug;
  let techs = "";
  try {
    const project = await getProjectBySlug(slug);
    name = project.name;
    techs = project.technologies
      .slice(0, 4)
      .map((t) => t.name)
      .join(" · ");
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
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
          fontSize: "20px",
          marginBottom: "16px",
          fontFamily: "monospace",
        }}
      >
        leonardosr.com.br · Projeto
      </p>
      <h1
        style={{
          color: "#ececec",
          fontSize: "52px",
          fontWeight: 600,
          lineHeight: 1.15,
          margin: "0 0 20px",
        }}
      >
        {name}
      </h1>
      {techs && (
        <p
          style={{
            color: "#d97757",
            fontSize: "22px",
            fontFamily: "monospace",
            margin: 0,
          }}
        >
          {techs}
        </p>
      )}
    </div>,
    size,
  );
}
