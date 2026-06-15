import { CoreJudgmentSection } from "@/components/report/core-judgment-section";
import { HeroSection } from "@/components/report/hero-section";
import { ReportSection } from "@/components/report/report-section";
import { ReportSeparator } from "@/components/report/separator";
import { TocSidebar } from "@/components/report/toc-sidebar";
import type { InvestDoc } from "@/lib/invest-shared";
import { parseHeroStats } from "@/lib/invest-charts";
import {
  buildReportToc,
  parseActionBadge,
  splitSectionBody,
} from "@/lib/invest-report";
import { splitInvestSections } from "@/lib/invest-sections";

export function ReportPage({ doc }: { doc: InvestDoc }) {
  const sections = splitInvestSections(doc.content);
  const tocItems = buildReportToc(doc.headings);
  const { stats, quoteDate } = parseHeroStats(doc.content);

  const judgmentSection = sections.find((section) => section.title === "核心判断");
  const judgment = judgmentSection
    ? splitSectionBody(judgmentSection)
    : { intro: "", decisions: [], body: "" };

  const { verdict, actionBadge, conclusionBody } = parseActionBadge(
    doc.meta.conclusion,
    judgment.decisions
  );

  const otherSections = sections.filter(
    (section) => section.title !== "核心判断"
  );

  const ticker = doc.meta.target.match(/（([^）]+)）/)?.[1];

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-background">
      <TocSidebar title={doc.title} subtitle={ticker} items={tocItems} />

      <main className="lg:pl-64">
        <div className="mx-auto max-w-4xl space-y-16 px-4 py-10 sm:px-8 sm:py-14">
          <HeroSection
            doc={doc}
            stats={stats}
            quoteDate={quoteDate}
            verdict={verdict}
            actionBadge={actionBadge}
            conclusionBody={conclusionBody}
          />

          {judgmentSection && (
            <>
              <ReportSeparator />
              <CoreJudgmentSection
                intro={judgment.intro}
                decisions={judgment.decisions}
                rest={judgment.body}
              />
            </>
          )}

          {otherSections.map((section) => (
            <div key={section.id}>
              <ReportSeparator />
              <ReportSection section={section} target={doc.meta.target} />
            </div>
          ))}

          <footer className="border-t border-border pt-8 pb-4 text-center">
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-muted-foreground">
              本页面内容为个人投研笔记整理，仅作学习与记录用途，不构成任何投资建议。市场有风险，投资需谨慎。
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              更新日期：{doc.meta.updatedAt || "—"} · 标的：{doc.meta.target}
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
