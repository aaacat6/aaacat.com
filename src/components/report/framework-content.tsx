"use client";

import {
  Activity,
  ArrowUpCircle,
  CalendarClock,
  Gavel,
  Lightbulb,
  ListChecks,
  MinusCircle,
  PlusCircle,
  Scale,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { FadeIn } from "@/components/report/fade-in";
import { SubHeading } from "@/components/report/section-heading";
import { Badge } from "@/components/report/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/report/ui/card";
import { parseFramework, type ParsedFramework } from "@/lib/invest-framework";
import { slugifySection } from "@/lib/invest-sections";

function emphasizePhrase(text: string, phrase: string) {
  if (!text.includes(phrase)) return text;
  const [before, after] = text.split(phrase);
  return (
    <>
      {before}
      <span className="font-semibold">{phrase}</span>
      {after}
    </>
  );
}

function BulletList({
  items,
  tone = "default",
}: {
  items: string[];
  tone?: "default" | "emerald" | "red" | "blue";
}) {
  const dotClass =
    tone === "emerald"
      ? "text-emerald-600"
      : tone === "red"
        ? "text-red-600"
        : tone === "blue"
          ? "text-blue-600"
          : "text-blue-600";

  return (
    <ul className="space-y-2 text-sm leading-normal text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className={`shrink-0 font-bold ${dotClass}`}>·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AssumptionsSection({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <>
      <SubHeading id={slugifySection("关键假设")} title="关键假设" />
      <FadeIn>
        <div className="space-y-3">
          {items.map((text, index) => (
            <div
              key={text}
              className="flex items-start gap-4 rounded-lg border border-border p-3"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                {index + 1}
              </div>
              <p className="pt-1 text-sm leading-normal text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </>
  );
}

function RisksSection({ risks }: { risks: ParsedFramework["risks"] }) {
  if (risks.length === 0) return null;

  return (
    <>
      <SubHeading id={slugifySection("相关风险")} title="相关风险" />
      <FadeIn>
        <div className="divide-y divide-red-100 overflow-hidden rounded-xl border border-red-200 dark:divide-red-900/30 dark:border-red-900/50">
          {risks.map((risk) => (
            <div
              key={risk.cat}
              className="flex flex-col gap-2 bg-card p-3 sm:flex-row sm:items-start sm:gap-5"
            >
              <Badge variant="destructive" className="shrink-0 self-start">
                {risk.cat}
              </Badge>
              <p className="text-sm leading-normal text-muted-foreground">
                {risk.text}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </>
  );
}

function ThoughtsSection({ data }: { data: ParsedFramework }) {
  const hasContent =
    data.bullish.length > 0 ||
    data.bearish.length > 0 ||
    data.divergence.bull ||
    data.divergence.bear ||
    data.judgment;

  if (!hasContent) return null;

  return (
    <>
      <SubHeading id={slugifySection("自己想法")} title="自己想法" />

      {(data.bullish.length > 0 || data.bearish.length > 0) && (
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.bullish.length > 0 && (
              <Card size="sm" className="border-emerald-200 shadow-none dark:border-emerald-900/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="size-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
                    <CardTitle className="text-sm text-emerald-800 dark:text-emerald-300">
                      看多理由
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <BulletList items={data.bullish} tone="emerald" />
                </CardContent>
              </Card>
            )}
            {data.bearish.length > 0 && (
              <Card size="sm" className="border-red-200 shadow-none dark:border-red-900/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="size-4 text-red-700 dark:text-red-400" aria-hidden />
                    <CardTitle className="text-sm text-red-800 dark:text-red-300">
                      看空理由
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <BulletList items={data.bearish} tone="red" />
                </CardContent>
              </Card>
            )}
          </div>
        </FadeIn>
      )}

      {(data.divergence.bull || data.divergence.bear) && (
        <FadeIn>
          <Card size="sm" className="mt-4 shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Scale className="size-4 text-blue-700 dark:text-blue-400" aria-hidden />
                <CardTitle className="text-sm">市场分歧</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-normal text-muted-foreground">
              {data.divergence.bull && (
                <p>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    多方：
                  </span>
                  {data.divergence.bull}
                </p>
              )}
              {data.divergence.bear && (
                <p>
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    空方：
                  </span>
                  {data.divergence.bear}
                </p>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {data.judgment && (
        <FadeIn>
          <div className="mt-4 rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-800/60 dark:bg-blue-950/30">
            <div className="flex items-start gap-3">
              <Lightbulb
                className="mt-0.5 size-5 shrink-0 text-blue-700 dark:text-blue-400"
                aria-hidden
              />
              <div>
                <p className="mb-1.5 text-sm font-bold text-blue-900 dark:text-blue-200">
                  我的判断
                </p>
                <p className="text-sm leading-normal text-blue-900/90 dark:text-blue-100/90">
                  {data.judgment}
                  {data.judgmentHighlight && (
                    <>
                      ；
                      {emphasizePhrase(
                        data.judgmentHighlight,
                        "不适合新资金在高位追入"
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </>
  );
}

function FutureWatchSection({ data }: { data: ParsedFramework }) {
  const hasTriggers =
    data.buyTrigger || data.addTrigger || data.sellTriggers.length > 0;
  const hasContent =
    data.verifyList.length > 0 ||
    data.trackList.length > 0 ||
    hasTriggers ||
    data.nextReview;

  if (!hasContent) return null;

  return (
    <>
      <SubHeading id={slugifySection("未来关注")} title="未来关注" />

      {(data.verifyList.length > 0 || data.trackList.length > 0) && (
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.verifyList.length > 0 && (
              <Card size="sm" className="shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ListChecks className="size-4 text-blue-700 dark:text-blue-400" aria-hidden />
                    <CardTitle className="text-sm">需要验证的假设</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <BulletList items={data.verifyList} tone="blue" />
                </CardContent>
              </Card>
            )}
            {data.trackList.length > 0 && (
              <Card size="sm" className="shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-blue-700 dark:text-blue-400" aria-hidden />
                    <CardTitle className="text-sm">关键跟踪指标</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <BulletList items={data.trackList} tone="blue" />
                </CardContent>
              </Card>
            )}
          </div>
        </FadeIn>
      )}

      {hasTriggers && (
        <FadeIn>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {data.buyTrigger && (
              <Card
                size="sm"
                className="border-emerald-200 bg-emerald-50/40 shadow-none dark:border-emerald-900/50 dark:bg-emerald-950/20"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ArrowUpCircle className="size-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
                    <CardTitle className="text-sm text-emerald-800 dark:text-emerald-300">
                      买入触发条件
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-normal text-muted-foreground">
                  {data.buyTrigger}
                </CardContent>
              </Card>
            )}
            {data.addTrigger && (
              <Card
                size="sm"
                className="border-blue-200 bg-blue-50/40 shadow-none dark:border-blue-900/50 dark:bg-blue-950/20"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PlusCircle className="size-4 text-blue-700 dark:text-blue-400" aria-hidden />
                    <CardTitle className="text-sm text-blue-800 dark:text-blue-300">
                      加仓触发条件
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-normal text-muted-foreground">
                  {data.addTrigger}
                </CardContent>
              </Card>
            )}
            {data.sellTriggers.length > 0 && (
              <Card
                size="sm"
                className="border-red-200 bg-red-50/40 shadow-none dark:border-red-900/50 dark:bg-red-950/20"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MinusCircle className="size-4 text-red-700 dark:text-red-400" aria-hidden />
                    <CardTitle className="text-sm text-red-800 dark:text-red-300">
                      减仓/卖出触发条件
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-normal text-muted-foreground">
                  <ul className="space-y-1.5">
                    {data.sellTriggers.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </FadeIn>
      )}

      {data.nextReview && (
        <FadeIn>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-border p-3">
            <CalendarClock
              className="mt-0.5 size-4 shrink-0 text-blue-700 dark:text-blue-400"
              aria-hidden
            />
            <p className="text-sm leading-normal text-muted-foreground">
              <span className="font-semibold text-foreground">下次复盘时间：</span>
              {data.nextReview}
            </p>
          </div>
        </FadeIn>
      )}
    </>
  );
}

function DecisionSection({ decision }: { decision: ParsedFramework["decision"] }) {
  const hasContent =
    decision.conclusion || decision.action || decision.reviews.length > 0;
  if (!hasContent) return null;

  return (
    <>
      <SubHeading id={slugifySection("决策")} title="决策" />
      <FadeIn>
        <Card className="border-amber-300 shadow-none dark:border-amber-800/60">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gavel className="size-4 text-amber-700 dark:text-amber-400" aria-hidden />
              <CardTitle className="text-base text-amber-900 dark:text-amber-200">
                结论与执行
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-normal">
            {decision.conclusion && (
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">结论：</span>
                {decision.conclusion}
                {decision.conclusionHighlight && (
                  <>
                    ；
                    <span className="font-semibold text-amber-800 dark:text-amber-300">
                      {decision.conclusionHighlight}
                    </span>
                  </>
                )}
                。
              </p>
            )}
            {decision.action && (
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">执行动作：</span>
                {decision.action}
              </p>
            )}
            {decision.reviews.length > 0 && (
              <div className="border-t border-border pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  复盘记录
                </p>
                {decision.reviews.map((review, index) => (
                  <div key={`${review.date}-${index}`} className="flex gap-3">
                    <div className="flex flex-col items-center" aria-hidden>
                      <div className="mt-1.5 size-2.5 rounded-full bg-blue-600" />
                      {index < decision.reviews.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="mb-1 text-sm font-semibold text-foreground">
                        {review.date} · {review.title}
                      </p>
                      <p className="text-[13px] leading-normal text-muted-foreground">
                        {review.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </>
  );
}

export function FrameworkSectionContent({ body }: { body: string }) {
  const data = parseFramework(body);

  return (
    <>
      <AssumptionsSection items={data.assumptions} />
      <RisksSection risks={data.risks} />
      <ThoughtsSection data={data} />
      <FutureWatchSection data={data} />
      <DecisionSection decision={data.decision} />
    </>
  );
}
