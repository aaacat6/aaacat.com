import Link from "next/link";
import { InvestTags } from "@/components/invest/invest-tags";
import type { InvestDocListItem } from "@/lib/invest-shared";

interface InvestCardProps {
  doc: InvestDocListItem;
}

export function InvestCard({ doc }: InvestCardProps) {
  return (
    <Link
      href={`/invest/${doc.slug}`}
      className="group block rounded-xl border border-border/70 bg-card px-5 py-4 transition-colors hover:border-border hover:bg-card/80"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <InvestTags meta={doc.meta} />
            {doc.meta.updatedAt && (
              <span className="text-xs text-muted-foreground">
                {doc.meta.updatedAt}
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold leading-snug text-foreground group-hover:underline decoration-border underline-offset-4">
            {doc.meta.target || doc.title}
          </h3>

          {doc.meta.positioning && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {doc.meta.positioning}
            </p>
          )}

          {doc.meta.conclusion && (
            <p className="line-clamp-2 border-l-2 border-border pl-3 text-sm leading-relaxed text-foreground/80">
              {doc.meta.conclusion}
            </p>
          )}
        </div>

        <span className="hidden shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:block">
          →
        </span>
      </div>
    </Link>
  );
}
