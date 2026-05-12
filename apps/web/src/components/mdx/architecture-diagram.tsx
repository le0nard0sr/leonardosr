type ArchitectureDiagramProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function ArchitectureDiagram({
  src,
  alt,
  caption,
}: ArchitectureDiagramProps) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- diagrama editorial; src vem do backend */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-[6px] border border-[color:var(--border)]"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-[color:var(--fg-faint)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
