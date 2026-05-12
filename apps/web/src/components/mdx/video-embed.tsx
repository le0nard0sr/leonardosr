"use client";

import { useState } from "react";

type VideoEmbedProps = {
  videoId: string;
  title?: string;
};

export function VideoEmbed({ videoId, title = "Vídeo" }: VideoEmbedProps) {
  const [activated, setActivated] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (activated) {
    return (
      <div className="my-8 aspect-video w-full overflow-hidden rounded-[6px] border border-[color:var(--border)]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      className="group relative my-8 block aspect-video w-full cursor-pointer overflow-hidden rounded-[6px] border border-[color:var(--border)]"
      aria-label={`Reproduzir: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail YouTube; lazy facade */}
      <img
        src={thumbnail}
        alt={title}
        className="h-full w-full object-cover transition group-hover:brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent)] text-white shadow-lg transition group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 h-8 w-8"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
