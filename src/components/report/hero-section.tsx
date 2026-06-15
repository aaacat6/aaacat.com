import { Eye, TrendingUp } from "lucide-react";
import { Badge } from "@/components/report/ui/badge";
import { FadeIn } from "@/components/report/fade-in";
import { StatCard } from "@/components/report/stat-card";
import type { InvestDoc } from "@/lib/invest-shared";
import type { ReportStat } from "@/lib/invest-report";

export function HeroSection({
  doc,
  stats,
  quoteDate,
  verdict,
  actionBadge,
  conclusionBody,
}: {
  doc: InvestDoc;
  stats: ReportStat[];
  quoteDate?: string;
  verdict: string;
  actionBadge: string;
  conclusionBody: string;
}) {
  const ticker = doc.meta.target.match(/（([^）]+)）/)?.[1];

  return (
    <header className="pb-4">
      <FadeIn>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{doc.meta.industry}</Badge>
          <Badge variant="secondary">{doc.meta.market}</Badge>
          {ticker && <Badge variant="outline">{ticker}</Badge>}
          {doc.meta.updatedAt && (
            <span className="text-xs text-muted-foreground">
              更新日期：{doc.meta.updatedAt}
            </span>
          )}
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {doc.title}
        </h1>
        {doc.meta.positioning && (
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {doc.meta.positioning}
          </p>
        )}
      </FadeIn>

      {doc.meta.conclusion && (
        <FadeIn delay={0.1}>
          <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 dark:border-amber-800/60 dark:bg-amber-950/30 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-600 text-white">
                <Eye className="size-5" aria-hidden />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <p className="text-lg font-bold text-amber-900 dark:text-amber-200">
                    {verdict}
                  </p>
                  <Badge className="border-transparent bg-amber-600 text-white hover:bg-amber-600">
                    {actionBadge}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-amber-900/90 dark:text-amber-100/90 sm:text-[15px]">
                  {conclusionBody}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {stats.length > 0 && (
        <FadeIn delay={0.2}>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="size-3.5" aria-hidden />
            {quoteDate
              ? `行情口径截至 ${quoteDate} 收盘；关键财务事实以官方财报为准`
              : "关键估值指标摘自投研笔记，请以官方财报为准"}
          </p>
        </FadeIn>
      )}
    </header>
  );
}
