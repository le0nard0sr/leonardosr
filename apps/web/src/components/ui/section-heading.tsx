type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  compact?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  compact = false,
}: SectionHeadingProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-normal text-[color:var(--accent)]">
        {eyebrow}
      </p>
      <h2
        className={`${compact ? "mt-2 text-xl" : "mt-3 text-3xl md:text-4xl"} font-semibold leading-tight`}
      >
        {title}
      </h2>
    </div>
  );
}
