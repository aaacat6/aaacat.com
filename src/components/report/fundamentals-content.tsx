"use client";

import type { ReactNode } from "react";
import {
  Box,
  Briefcase,
  Building2,
  Factory,
  History,
  Landmark,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/report/fade-in";
import { ReportMarkdown } from "@/components/report/report-markdown";
import { SubHeading } from "@/components/report/section-heading";
import { Badge } from "@/components/report/ui/badge";
import { Card, CardContent } from "@/components/report/ui/card";
import {
  extractTableMarkdown,
  splitMarkdownByH3,
  type FundamentalsBlock,
} from "@/lib/invest-fundamentals";
import { splitMarkdownByH2 } from "@/lib/invest-charts";
import { slugifySection } from "@/lib/invest-sections";

const OVERVIEW_ICONS: Record<string, LucideIcon> = {
  所在行业: Building2,
  主营业务: Briefcase,
  商业模式: Factory,
  "主要客户/渠道": Users,
  客户集中度: Box,
  管理层: UserCog,
  持股比例: Landmark,
  背景: History,
};

function getOverviewIcon(title: string): LucideIcon {
  return OVERVIEW_ICONS[title] ?? Building2;
}

function OverviewCards({ blocks }: { blocks: FundamentalsBlock[] }) {
  return (
    <FadeIn>
      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map((card) => {
          const Icon = getOverviewIcon(card.title);
          return (
            <Card key={card.title} size="sm" className="shadow-none">
              <CardContent className="py-3">
                <div className="mb-2.5 flex items-center gap-2">
                  <Icon
                    className="size-4 text-blue-700 dark:text-blue-400"
                    aria-hidden
                  />
                  <p className="text-sm font-semibold">{card.title}</p>
                </div>
                <ul className="space-y-1.5 text-sm leading-normal text-muted-foreground">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="shrink-0 text-border">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </FadeIn>
  );
}

function IndustryBadges({ blocks }: { blocks: FundamentalsBlock[] }) {
  return (
    <FadeIn>
      <div className="space-y-3">
        {blocks.map((row) => (
          <div
            key={row.title}
            className="rounded-lg border border-border p-3 sm:flex sm:items-start sm:gap-6"
          >
            <p className="mb-2 w-32 shrink-0 text-sm font-semibold sm:mb-0">
              {row.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {row.items.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="font-normal text-muted-foreground"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

function CompetitivenessTable({ body }: { body: string }) {
  const table = extractTableMarkdown(body);
  if (!table) return null;

  return (
    <FadeIn>
      <ReportMarkdown content={table} animate={false} />
    </FadeIn>
  );
}

export function FundamentalsSectionContent({
  body,
  operations,
}: {
  body: string;
  operations: (blockBody: string) => ReactNode;
}) {
  const blocks = splitMarkdownByH2(body);

  return (
    <>
      {blocks.map((block, index) => (
        <div key={block.title || index}>
          <SubHeading id={slugifySection(block.title)} title={block.title} />

          {block.title === "公司概况" && (
            <OverviewCards blocks={splitMarkdownByH3(block.body)} />
          )}

          {block.title === "行业分析" && (
            <IndustryBadges blocks={splitMarkdownByH3(block.body)} />
          )}

          {block.title === "公司竞争力" && (
            <CompetitivenessTable body={block.body} />
          )}

          {block.title === "经营分析" && operations(block.body)}

          {block.title &&
            !["公司概况", "行业分析", "公司竞争力", "经营分析"].includes(
              block.title
            ) && (
              <FadeIn delay={index > 0 ? 0.05 : 0}>
                <ReportMarkdown
                  content={`## ${block.title}\n${block.body}`}
                  animate={false}
                />
              </FadeIn>
            )}
        </div>
      ))}
    </>
  );
}
