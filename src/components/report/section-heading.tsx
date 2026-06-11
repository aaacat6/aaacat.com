export function SectionHeading({
  id,
  kicker,
  title,
  description,
}: {
  id: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
        {kicker}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

export function SubHeading({ id, title }: { id?: string; title: string }) {
  return (
    <h3
      id={id}
      className="mb-4 mt-10 flex scroll-mt-24 items-center gap-2.5 text-lg font-semibold text-foreground sm:text-xl"
    >
      <span
        className="inline-block h-5 w-1 rounded-full bg-blue-600"
        aria-hidden
      />
      {title}
    </h3>
  );
}
