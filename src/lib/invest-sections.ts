export interface InvestSection {
  id: string;
  title: string;
  index: number;
  body: string;
}

const SECTION_ACCENTS: Record<string, string> = {
  核心判断: "amber",
  资料来源: "sky",
  基本面: "emerald",
  "财务与估值": "violet",
  投资框架: "rose",
};

export function slugifySection(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "");
}

export function splitInvestSections(content: string): InvestSection[] {
  const chunks = content.split(/\n(?=# [^\n]+)/).filter(Boolean);

  return chunks.map((chunk, index) => {
    const titleMatch = chunk.match(/^# (.+)$/m);
    const title = titleMatch?.[1]?.trim() ?? `章节 ${index + 1}`;
    const body = chunk.replace(/^# .+\n+/, "").trim();

    return {
      id: slugifySection(title),
      title,
      index: index + 1,
      body,
    };
  });
}

export function getSectionAccent(title: string): string {
  return SECTION_ACCENTS[title] ?? "zinc";
}

export interface DecisionItem {
  label: string;
  body: string;
}

export function stripConclusionBlock(markdown: string): string {
  return markdown
    .replace(/##\s*一句话结论\s*\n+[\s\S]*?(?=\n##|$)/, "")
    .trim();
}

export function extractDecisionGrid(body: string): {
  intro: string;
  decisions: DecisionItem[];
  rest: string;
} {
  const marker = body.match(/##\s*投资决策\s*\n/);
  if (!marker || marker.index === undefined) {
    return { intro: body, decisions: [], rest: "" };
  }

  const intro = body.slice(0, marker.index).trim();
  const afterHeading = body.slice(marker.index + marker[0].length);
  const nextH2 = afterHeading.search(/\n##\s+/);
  const decisionBlock =
    nextH2 === -1 ? afterHeading : afterHeading.slice(0, nextH2);
  const rest = nextH2 === -1 ? "" : afterHeading.slice(nextH2).trim();

  const decisions: DecisionItem[] = [];
  const parts = decisionBlock.split(/\n(?=### )/);

  for (const part of parts) {
    const match = part.match(/^###\s+(.+)\n+([\s\S]*)$/);
    if (match) {
      decisions.push({
        label: match[1].trim(),
        body: match[2].trim(),
      });
    }
  }

  return { intro, decisions, rest };
}
