import { InvestTags } from "@/components/invest/invest-tags";
import type { InvestDoc } from "@/lib/invest-shared";

interface InvestHeroProps {
  doc: InvestDoc;
}

export function InvestHero({ doc }: InvestHeroProps) {
  return (
    <header className="relative mb-10 overflow-hidden rounded-2xl border border-border/70 bg-card px-6 py-8 shadow-sm md:px-10 md:py-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-foreground/[0.03]" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-foreground/[0.02]" />

      <div className="relative space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <InvestTags meta={doc.meta} />
          {doc.meta.updatedAt && (
            <span className="text-xs text-muted-foreground">
              更新于 {doc.meta.updatedAt}
            </span>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            投研简报
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {doc.title}
          </h1>
          {doc.meta.target && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              {doc.meta.target}
            </p>
          )}
        </div>

        {doc.meta.positioning && (
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-[15px]">
            {doc.meta.positioning}
          </p>
        )}

        {doc.meta.conclusion && (
          <div className="max-w-3xl rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-5 py-4">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700/80 dark:text-amber-400/90">
              一句话结论
            </p>
            <p className="text-base font-medium leading-relaxed text-foreground md:text-lg">
              {doc.meta.conclusion}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
