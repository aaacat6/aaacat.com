import { parseListItems } from "@/lib/invest-fundamentals";
import { splitMarkdownByH2 } from "@/lib/invest-charts";

export interface FrameworkRisk {
  cat: string;
  text: string;
}

export interface FrameworkReview {
  date: string;
  title: string;
  body: string;
}

export interface FrameworkDecision {
  conclusion: string;
  conclusionHighlight?: string;
  action: string;
  reviews: FrameworkReview[];
}

export interface ParsedFramework {
  assumptions: string[];
  risks: FrameworkRisk[];
  bullish: string[];
  bearish: string[];
  divergence: { bull?: string; bear?: string };
  judgment: string;
  judgmentHighlight?: string;
  verifyList: string[];
  trackList: string[];
  buyTrigger: string;
  addTrigger: string;
  sellTriggers: string[];
  nextReview: string;
  decision: FrameworkDecision;
}

function parseAssumptions(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) =>
      line
        .replace(/^-\s*/, "")
        .replace(/^假设\s*\d+[：:]\s*/, "")
        .replace(/[。.]+$/g, "")
        .trim()
    )
    .filter(Boolean);
}

function parseRisks(body: string): FrameworkRisk[] {
  const risks: FrameworkRisk[] = [];

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    const match = trimmed.match(/^-\s*([^：:]+)[：:]\s*(.+)$/);
    if (!match) continue;
    risks.push({
      cat: match[1].trim(),
      text: match[2].replace(/[。.]+$/g, "").trim(),
    });
  }

  return risks;
}

function parseNumberedSubsections(
  body: string
): { title: string; body: string }[] {
  const parts = body.split(/\n(?=\d+\.\s)/).filter(Boolean);

  return parts
    .map((part) => {
      const match = part.match(/^\d+\.\s*(.+?)[：:]\s*([\s\S]*)$/);
      if (!match) return null;
      return { title: match[1].trim(), body: match[2].trim() };
    })
    .filter((section): section is { title: string; body: string } => !!section);
}

function parseLabeledItem(text: string, label: string): string | undefined {
  const match = text.match(new RegExp(`${label}[：:]\\s*(.+)`));
  return match?.[1]?.replace(/[。.]+$/g, "").trim();
}

function extractHighlight(text: string): {
  text: string;
  highlight?: string;
} {
  const clauseMatch = text.match(/[；;]([^；;。]+)[。.]?$/);
  if (!clauseMatch) return { text };

  const highlight = clauseMatch[1].trim();
  const main = text
    .slice(0, text.lastIndexOf(clauseMatch[1]))
    .replace(/[；;]\s*$/, "")
    .trim();

  return { text: main, highlight };
}

function parseReviewEntry(line: string): FrameworkReview | null {
  const cleaned = line.replace(/^-\s*/, "").trim();
  const match = cleaned.match(/^([\d-]+)[：:]\s*(.+)$/);
  if (!match) return null;

  const rest = match[2].trim();
  const titleSplit = rest.split(/[；;]/);
  const title = titleSplit[0]?.replace(/[。.]+$/g, "").trim() || "复盘";
  const body = titleSplit.slice(1).join("；").trim() || rest;

  return { date: match[1], title, body };
}

function parseDecision(body: string): FrameworkDecision {
  const sections = parseNumberedSubsections(body);
  let conclusion = "";
  let action = "";
  const reviews: FrameworkReview[] = [];

  for (const section of sections) {
    if (section.title === "结论") {
      conclusion = section.body.replace(/[。.]+$/g, "").trim();
    } else if (section.title === "执行动作") {
      action =
        parseListItems(section.body)[0] ??
        section.body.replace(/^-\s*/, "").replace(/[。.]+$/g, "").trim();
    } else if (section.title === "复盘记录") {
      for (const line of section.body.split("\n")) {
        const entry = parseReviewEntry(line.trim());
        if (entry) reviews.push(entry);
      }
    }
  }

  const { text, highlight } = extractHighlight(conclusion);

  return {
    conclusion: text || conclusion,
    conclusionHighlight: highlight,
    action,
    reviews,
  };
}

export function parseFramework(body: string): ParsedFramework {
  const blocks = splitMarkdownByH2(body);
  const getBlock = (title: string) =>
    blocks.find((block) => block.title === title)?.body ?? "";

  const thoughts = parseNumberedSubsections(getBlock("自己想法"));
  const future = parseNumberedSubsections(getBlock("未来关注"));

  const thoughtMap = Object.fromEntries(
    thoughts.map((section) => [section.title, section.body])
  );
  const futureMap = Object.fromEntries(
    future.map((section) => [section.title, section.body])
  );

  const divergenceItems = parseListItems(thoughtMap["市场分歧"] ?? "");
  const judgmentItems = parseListItems(thoughtMap["我的判断"] ?? "");
  const judgmentText = judgmentItems[0] ?? thoughtMap["我的判断"] ?? "";
  const judgmentParsed = extractHighlight(judgmentText.replace(/^-\s*/, ""));

  return {
    assumptions: parseAssumptions(getBlock("关键假设")),
    risks: parseRisks(getBlock("相关风险")),
    bullish: parseListItems(thoughtMap["看多理由"] ?? ""),
    bearish: parseListItems(thoughtMap["看空理由"] ?? ""),
    divergence: {
      bull: parseLabeledItem(
        divergenceItems.find((item) => item.startsWith("多方")) ?? "",
        "多方"
      ),
      bear: parseLabeledItem(
        divergenceItems.find((item) => item.startsWith("空方")) ?? "",
        "空方"
      ),
    },
    judgment: judgmentParsed.text,
    judgmentHighlight: judgmentParsed.highlight,
    verifyList: parseListItems(futureMap["需要验证的假设"] ?? ""),
    trackList: parseListItems(futureMap["关键跟踪指标"] ?? ""),
    buyTrigger: parseListItems(futureMap["买入触发条件"] ?? [])[0] ?? "",
    addTrigger: parseListItems(futureMap["加仓触发条件"] ?? [])[0] ?? "",
    sellTriggers: parseListItems(futureMap["减仓/卖出触发条件"] ?? ""),
    nextReview: parseListItems(futureMap["下次复盘时间"] ?? [])[0] ?? "",
    decision: parseDecision(getBlock("决策")),
  };
}
