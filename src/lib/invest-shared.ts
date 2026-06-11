export interface InvestMeta {
  updatedAt: string;
  target: string;
  positioning: string;
  conclusion: string;
  market: string;
  industry: string;
}

export interface InvestHeading {
  level: number;
  text: string;
  id: string;
}

export interface InvestDoc {
  slug: string;
  title: string;
  filePath: string;
  meta: InvestMeta;
  content: string;
  headings: InvestHeading[];
}

export interface InvestDocListItem {
  slug: string;
  title: string;
  meta: InvestMeta;
}

export interface InvestTagOptions {
  markets: string[];
  industries: string[];
}

const MARKET_ACCENTS = [
  "bg-sky-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-cyan-500",
];

export function getDocTags(meta: InvestMeta): string[] {
  return [meta.market, meta.industry].filter(
    (tag) => Boolean(tag) && tag !== "未分类"
  );
}

export function filterDocsByTags(
  docs: InvestDocListItem[],
  selectedTags: string[]
): InvestDocListItem[] {
  if (selectedTags.length === 0) return docs;

  return docs.filter((doc) => {
    const docTags = getDocTags(doc.meta);
    return selectedTags.every((tag) => docTags.includes(tag));
  });
}

export function getMarketAccent(market: string): string {
  let hash = 0;
  for (let i = 0; i < market.length; i++) {
    hash = (hash + market.charCodeAt(i) * (i + 1)) % MARKET_ACCENTS.length;
  }
  return MARKET_ACCENTS[hash];
}

export const TAG_STYLES = {
  market:
    "bg-foreground/8 text-foreground ring-1 ring-inset ring-foreground/10",
  industry:
    "bg-muted text-muted-foreground ring-1 ring-inset ring-border/80",
};
