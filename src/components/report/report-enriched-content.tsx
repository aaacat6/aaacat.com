"use client";

import { Info, TrendingDown, TrendingUp } from "lucide-react";
import { PeerValuationChart } from "@/components/report/charts/peer-valuation-chart";
import { RevenueChart } from "@/components/report/charts/revenue-chart";
import { ValuationStretchBar } from "@/components/report/charts/valuation-stretch-bar";
import { FrameworkSectionContent } from "@/components/report/framework-content";
import { FundamentalsSectionContent } from "@/components/report/fundamentals-content";
import { FadeIn } from "@/components/report/fade-in";
import { ReportMarkdown } from "@/components/report/report-markdown";
import { SubHeading } from "@/components/report/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/report/ui/card";
import { SourcesTable } from "@/components/report/sources-table";
import {
  extractCompanyName,
  parsePeerValuationData,
  parseRevenueChartData,
  parseRevenueOffsetNote,
  parseSourcesTable,
  parseStretchBarSummary,
  parseUpsideDownside,
  parseValuationStretchBars,
  splitAtFirstTable,
  splitMarkdownByH2,
} from "@/lib/invest-charts";

function splitOperationsSections(body: string): string[] {
  const markers = ["成本构成", "其他经营要点"];
  const parts: string[] = [];
  let rest = body;

  for (const marker of markers) {
    const idx = rest.search(new RegExp(`\\n${marker}`));
    if (idx === -1) continue;
    parts.push(rest.slice(0, idx).trim());
    rest = rest.slice(idx + 1).trim();
  }

  if (rest) parts.push(rest);
  return parts.filter(Boolean);
}

function OperationsSubsection({ body }: { body: string }) {
  const revenueData = parseRevenueChartData(`## 经营分析\n${body}`);
  const offsetNote = parseRevenueOffsetNote(`## 经营分析\n${body}`);
  const { before, tableAndAfter } = splitAtFirstTable(body);
  const sections = splitOperationsSections(tableAndAfter);

  return (
    <>
      {before && (
        <FadeIn>
          <ReportMarkdown content={before} animate={false} />
        </FadeIn>
      )}

      {revenueData.length > 0 && (
        <FadeIn>
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">营收构成（按分部）</CardTitle>
              <CardDescription>各分部营收规模与同比增速（亿美元）</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart data={revenueData} />
              {offsetNote && (
                <div
                  className="mt-4 flex items-start gap-2.5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900/50 dark:bg-blue-950/30"
                  role="note"
                >
                  <Info
                    className="mt-0.5 size-4 shrink-0 text-blue-700 dark:text-blue-400"
                    aria-hidden
                  />
                  <p className="text-[13px] leading-relaxed text-blue-900 dark:text-blue-100">
                    <span className="font-semibold">分部不可简单相加：</span>
                    Foundry 的 {offsetNote.foundry}{" "}
                    亿营收中大部分是为自家产品部门代工的对内销售，合并报表时须抵消约{" "}
                    {offsetNote.offset} 亿美元的分部间交易，因此合并净收入约{" "}
                    {offsetNote.net} 亿美元（同比 {offsetNote.yoy}）。
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {sections.map((section, index) => (
        <FadeIn key={index} delay={index > 0 ? 0.05 : 0}>
          <ReportMarkdown
            content={section}
            animate={false}
            tableVariant={index === 0 ? "revenue" : "default"}
          />
        </FadeIn>
      ))}
    </>
  );
}

function ValuationSubsection({
  body,
  highlightCompany,
}: {
  body: string;
  highlightCompany?: string;
}) {
  const fullBlock = `## 估值分析\n${body}`;
  const stretchBars = parseValuationStretchBars(fullBlock);
  const peerData = parsePeerValuationData(fullBlock);
  const { upside, downside } = parseUpsideDownside(fullBlock);
  const fairSummary = parseStretchBarSummary(fullBlock);

  const currentSection = body.match(
    /当前估值：[\s\S]*?(?=\n同业估值对比|\n估值判断|$)/
  )?.[0];
  const peerSection = body.match(
    /同业估值对比：[\s\S]*?(?=\n估值判断|$)/
  )?.[0];
  const judgmentSection = body.match(/估值判断：[\s\S]*$/)?.[0];

  const currentTable = currentSection
    ? splitAtFirstTable(currentSection.replace(/^当前估值：\n?/, "")).tableAndAfter
    : "";
  const peerTable = peerSection
    ? splitAtFirstTable(peerSection.replace(/^同业估值对比：\n?/, "")).tableAndAfter
    : "";

  return (
    <>
      {stretchBars.length > 0 && (
        <FadeIn>
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">当前估值 vs 历史区间</CardTitle>
              <CardDescription>
                当前估值倍数已远超历史区间，由转机叙事与安全溢价驱动
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {stretchBars.map((bar) => (
                <ValuationStretchBar key={bar.label} {...bar} />
              ))}
              {fairSummary && (
                <p className="border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
                  个人判断：{fairSummary}
                </p>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {currentTable && (
        <FadeIn>
          <ReportMarkdown content={currentTable} animate={false} />
        </FadeIn>
      )}

      {peerData.length > 0 && (
        <FadeIn>
          <Card className="mt-4 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">同业估值对比（TTM P/S）</CardTitle>
              <CardDescription>
                区间取中值作图，标签显示完整区间
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PeerValuationChart
                data={peerData}
                highlightCompany={highlightCompany}
              />
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {peerTable && (
        <FadeIn>
          <ReportMarkdown
            content={peerTable}
            animate={false}
            highlightRowMatch={highlightCompany}
          />
        </FadeIn>
      )}

      {judgmentSection && !(upside || downside) && (
        <FadeIn>
          <ReportMarkdown content={judgmentSection} animate={false} />
        </FadeIn>
      )}

      {judgmentSection && (upside || downside) && (
        <>
          <FadeIn>
            <ReportMarkdown
              content={judgmentSection
                .replace(/- 上行空间[：:][\s\S]*?(?=\n- |\n*$)/, "")
                .replace(/- 下行空间[：:][\s\S]*?(?=\n- |\n*$)/, "")
                .trim()}
              animate={false}
            />
          </FadeIn>
          <FadeIn>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {upside && (
                <Card
                  size="sm"
                  className="border-emerald-200 bg-emerald-50/40 shadow-none dark:border-emerald-900/50 dark:bg-emerald-950/20"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <TrendingUp
                        className="size-4 text-emerald-700 dark:text-emerald-400"
                        aria-hidden
                      />
                      <CardTitle className="text-sm text-emerald-800 dark:text-emerald-300">
                        上行空间
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    {upside}
                  </CardContent>
                </Card>
              )}
              {downside && (
                <Card
                  size="sm"
                  className="border-red-200 bg-red-50/40 shadow-none dark:border-red-900/50 dark:bg-red-950/20"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <TrendingDown
                        className="size-4 text-red-700 dark:text-red-400"
                        aria-hidden
                      />
                      <CardTitle className="text-sm text-red-800 dark:text-red-300">
                        下行空间
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    {downside}
                  </CardContent>
                </Card>
              )}
            </div>
          </FadeIn>
        </>
      )}
    </>
  );
}

function FundamentalsContent({ body }: { body: string }) {
  return (
    <FundamentalsSectionContent
      body={body}
      operations={(blockBody) => <OperationsSubsection body={blockBody} />}
    />
  );
}

function FinancialsContent({
  body,
  highlightCompany,
}: {
  body: string;
  highlightCompany?: string;
}) {
  const blocks = splitMarkdownByH2(body);

  return (
    <>
      {blocks.map((block, index) => (
        <div key={block.title || index}>
          {block.title === "估值分析" ? (
            <>
              <SubHeading title={block.title} />
              <ValuationSubsection
                body={block.body}
                highlightCompany={highlightCompany}
              />
            </>
          ) : (
            <FadeIn delay={index > 0 ? 0.05 : 0}>
              <ReportMarkdown
                content={
                  block.title ? `## ${block.title}\n${block.body}` : block.body
                }
                animate={false}
              />
            </FadeIn>
          )}
        </div>
      ))}
    </>
  );
}

export function ReportEnrichedContent({
  sectionTitle,
  body,
  target,
}: {
  sectionTitle: string;
  body: string;
  target?: string;
}) {
  const highlightCompany = target ? extractCompanyName(target) : undefined;

  if (sectionTitle === "资料来源") {
    return <SourcesTable rows={parseSourcesTable(body)} />;
  }

  if (sectionTitle === "基本面") {
    return <FundamentalsContent body={body} />;
  }

  if (sectionTitle === "财务与估值") {
    return (
      <FinancialsContent
        body={body}
        highlightCompany={highlightCompany}
      />
    );
  }

  if (sectionTitle === "投资框架") {
    return <FrameworkSectionContent body={body} />;
  }

  return <ReportMarkdown content={body} blocks />;
}
