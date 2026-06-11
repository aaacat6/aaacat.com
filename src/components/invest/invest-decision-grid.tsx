import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DecisionItem } from "@/lib/invest-sections";

const DECISION_ACCENTS: Record<string, string> = {
  动作: "border-l-amber-500 bg-amber-500/5",
  仓位: "border-l-sky-500 bg-sky-500/5",
  持有周期: "border-l-violet-500 bg-violet-500/5",
  核心理由: "border-l-emerald-500 bg-emerald-500/5",
  最大风险: "border-l-rose-500 bg-rose-500/5",
};

export function InvestDecisionGrid({ items }: { items: DecisionItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-xl border border-border/60 border-l-[3px] px-4 py-3.5 ${
            DECISION_ACCENTS[item.label] ?? "border-l-foreground/30 bg-muted/30"
          } ${item.label === "核心理由" || item.label === "最大风险" ? "sm:col-span-2" : ""}`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {item.label}
          </p>
          <div className="invest-inline-prose text-sm leading-relaxed text-foreground/90">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
