import { InvestDecisionGrid } from "@/components/invest/invest-decision-grid";
import { InvestMarkdown } from "@/components/invest/invest-markdown";
import {
  extractDecisionGrid,
  getSectionAccent,
  stripConclusionBlock,
  type InvestSection,
} from "@/lib/invest-sections";

const ACCENT_STYLES: Record<
  string,
  { bar: string; header: string; badge: string }
> = {
  amber: {
    bar: "bg-amber-500",
    header: "from-amber-500/8 to-transparent",
    badge: "text-amber-700 dark:text-amber-300",
  },
  sky: {
    bar: "bg-sky-500",
    header: "from-sky-500/8 to-transparent",
    badge: "text-sky-700 dark:text-sky-300",
  },
  emerald: {
    bar: "bg-emerald-500",
    header: "from-emerald-500/8 to-transparent",
    badge: "text-emerald-700 dark:text-emerald-300",
  },
  violet: {
    bar: "bg-violet-500",
    header: "from-violet-500/8 to-transparent",
    badge: "text-violet-700 dark:text-violet-300",
  },
  rose: {
    bar: "bg-rose-500",
    header: "from-rose-500/8 to-transparent",
    badge: "text-rose-700 dark:text-rose-300",
  },
  zinc: {
    bar: "bg-foreground/30",
    header: "from-muted/50 to-transparent",
    badge: "text-muted-foreground",
  },
};

export function InvestSectionSlide({ section }: { section: InvestSection }) {
  const accentKey = getSectionAccent(section.title);
  const accent = ACCENT_STYLES[accentKey];
  const isJudgment = section.title === "核心判断";
  const parsed = isJudgment ? extractDecisionGrid(section.body) : null;

  return (
    <section
      id={section.id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
    >
      <header
        className={`relative flex items-center gap-4 border-b border-border/60 bg-gradient-to-r px-5 py-4 md:px-6 ${accent.header}`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-1 ${accent.bar}`}
          aria-hidden
        />
        <span
          className={`pl-2 font-mono text-2xl font-bold tabular-nums opacity-40 ${accent.badge}`}
        >
          {String(section.index).padStart(2, "0")}
        </span>
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {section.title}
        </h2>
      </header>

      <div className="px-5 py-5 md:px-6 md:py-6">
        {isJudgment && parsed ? (
          <>
            {parsed.intro && (
              <InvestMarkdown content={stripConclusionBlock(parsed.intro)} />
            )}
            <InvestDecisionGrid items={parsed.decisions} />
            {parsed.rest && <InvestMarkdown content={parsed.rest} />}
          </>
        ) : (
          <InvestMarkdown content={section.body} />
        )}
      </div>
    </section>
  );
}
