import {
  AlertTriangle,
  Clock,
  PieChart,
  Target,
  ThumbsUp,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/report/ui/card";
import { FadeIn } from "@/components/report/fade-in";
import { SectionHeading } from "@/components/report/section-heading";
import { ReportMarkdown } from "@/components/report/report-markdown";
import { getReportSectionId } from "@/lib/invest-report";
import type { DecisionItem } from "@/lib/invest-sections";
import { stripConclusionBlock } from "@/lib/invest-sections";

const SECTION_ID = getReportSectionId("核心判断");

const ICONS: Record<string, React.ReactNode> = {
  动作: <Target className="size-4 text-blue-700" />,
  仓位: <PieChart className="size-4 text-blue-700" />,
  持有周期: <Clock className="size-4 text-blue-700" />,
  核心理由: <ThumbsUp className="size-4 text-emerald-700" />,
  最大风险: <AlertTriangle className="size-4 text-red-700" />,
};

export function CoreJudgmentSection({
  intro,
  decisions,
  rest,
}: {
  intro: string;
  decisions: DecisionItem[];
  rest: string;
}) {
  const top = decisions.filter((item) =>
    ["动作", "仓位", "持有周期"].includes(item.label)
  );
  const bottom = decisions.filter((item) =>
    ["核心理由", "最大风险"].includes(item.label)
  );

  return (
    <section aria-labelledby={SECTION_ID}>
      <SectionHeading
        id={SECTION_ID}
        kicker="Core Judgment"
        title="核心判断"
        description="投资决策的核心结论与仓位建议。"
      />

      {intro && (
        <FadeIn>
          <ReportMarkdown content={stripConclusionBlock(intro)} />
        </FadeIn>
      )}

      {top.length > 0 && (
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-3">
            {top.map((item) => (
              <Card key={item.label} size="sm" className="shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {ICONS[item.label]}
                    <CardTitle className="text-sm">{item.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item.body}
                  </ReactMarkdown>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      )}

      {bottom.length > 0 && (
        <FadeIn delay={0.1}>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {bottom.map((item) => (
              <Card
                key={item.label}
                size="sm"
                className={`shadow-none ${
                  item.label === "核心理由"
                    ? "border-emerald-200 dark:border-emerald-900/50"
                    : "border-red-200 dark:border-red-900/50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {ICONS[item.label]}
                    <CardTitle
                      className={`text-sm ${
                        item.label === "核心理由"
                          ? "text-emerald-800 dark:text-emerald-300"
                          : "text-red-800 dark:text-red-300"
                      }`}
                    >
                      {item.label}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      ul: ({ children }) => (
                        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex gap-2">
                          <span
                            className={`shrink-0 font-bold ${
                              item.label === "核心理由"
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            ·
                          </span>
                          <span>{children}</span>
                        </li>
                      ),
                      p: ({ children }) => (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {item.body}
                  </ReactMarkdown>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      )}

      {rest && <ReportMarkdown content={rest} />}
    </section>
  );
}
