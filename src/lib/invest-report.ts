import type { InvestHeading } from "@/lib/invest-shared";
import { parseHeroStats } from "@/lib/invest-charts";
import {
  extractDecisionGrid,
  slugifySection,
  type InvestSection,
} from "@/lib/invest-sections";

export interface ReportTocItem {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
}

export interface ReportStat {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "warning" | "positive" | "negative";
}

const SECTION_KICKERS: Record<string, string> = {
  核心判断: "Core Judgment",
  资料来源: "Sources",
  基本面: "Fundamentals",
  "财务与估值": "Financials",
  投资框架: "Framework",
};

const SECTION_DESCRIPTIONS: Record<string, string> = {
  核心判断: "投资决策的核心结论与仓位建议。",
};

export function getSectionKicker(title: string): string {
  return SECTION_KICKERS[title] ?? "Section";
}

export function getSectionDescription(title: string): string | undefined {
  return SECTION_DESCRIPTIONS[title];
}

export function buildReportToc(headings: InvestHeading[]): ReportTocItem[] {
  const items: ReportTocItem[] = [];
  let current: ReportTocItem | null = null;

  for (const heading of headings) {
    if (heading.level === 1) {
      current = { id: heading.id, label: heading.text };
      items.push(current);
      continue;
    }

    if (heading.level === 2 && current) {
      if (!current.children) current.children = [];
      current.children.push({ id: heading.id, label: heading.text });
    }
  }

  return items;
}

export function parseValuationStats(content: string): ReportStat[] {
  return parseHeroStats(content).stats;
}

export function parseActionBadge(conclusion: string, decisions: { label: string; body: string }[]) {
  const action = decisions.find((item) => item.label === "动作")?.body ?? "";
  const actionShort = action.split(/[；;，,]/)[0]?.trim();

  const prefixMatch = conclusion.match(/^([^：:]+[）)]?)\s*[：:]\s*/);
  const verdict = prefixMatch?.[1]?.trim() ?? "观察";
  const conclusionBody = prefixMatch
    ? conclusion.slice(prefixMatch[0].length).trim()
    : conclusion.trim();

  return { verdict, actionBadge: actionShort || "观察", conclusionBody };
}

export function splitSectionBody(section: InvestSection) {
  if (section.title !== "核心判断") {
    return { intro: "", decisions: [], body: section.body };
  }

  const parsed = extractDecisionGrid(section.body);
  return {
    intro: parsed.intro,
    decisions: parsed.decisions,
    body: parsed.rest,
  };
}

export function getReportSectionId(title: string): string {
  return slugifySection(title);
}

export type { InvestSection };
