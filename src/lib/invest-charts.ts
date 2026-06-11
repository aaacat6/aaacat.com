export interface RevenueChartItem {
  segment: string;
  revenue: number;
  yoy: string;
}

export interface PeerValuationItem {
  company: string;
  ps: number;
  range: string;
}

export interface StretchBarData {
  label: string;
  current: number;
  currentLabel: string;
  histLow: number;
  histHigh: number;
  histLabel: string;
  max: number;
}

export interface UpsideDownside {
  upside?: string;
  downside?: string;
}

export interface HeroStat {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "warning" | "positive" | "negative";
}

export interface HeroStatsResult {
  stats: HeroStat[];
  quoteDate?: string;
}

export interface RevenueOffsetNote {
  foundry: number;
  offset: number;
  net: number;
  yoy: string;
}

interface MarkdownTable {
  headers: string[];
  rows: string[][];
  raw: string;
}

function extractFirstTable(block: string): MarkdownTable | null {
  const lines = block.split("\n");
  const tableLines: string[] = [];
  let inTable = false;

  for (const line of lines) {
    if (line.trim().startsWith("|")) {
      inTable = true;
      tableLines.push(line);
      continue;
    }
    if (inTable) break;
  }

  if (tableLines.length < 2) return null;
  return parseMarkdownTable(tableLines.join("\n"));
}

function parseMarkdownTable(text: string): MarkdownTable | null {
  const lines = text.split("\n").filter((line) => line.trim().startsWith("|"));
  if (lines.length < 2) return null;

  const parseRow = (line: string) =>
    line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

  return {
    headers: parseRow(lines[0]),
    rows: lines.slice(2).map(parseRow),
    raw: lines.join("\n"),
  };
}

function extractBlock(content: string, heading: string): string | null {
  const match = content.match(
    new RegExp(`##\\s*${heading}[\\s\\S]*?(?=\\n## |$)`)
  );
  return match?.[0] ?? null;
}

function parseNumber(text: string): number | null {
  const normalized = text.replace(/,/g, "");
  const match = normalized.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function parsePsMultiple(mult: string): { ps: number; range: string } {
  const rangeMatch = mult.match(
    /约?\s*([\d.]+)\s*x\s*[–-]\s*([\d.]+)\s*x/i
  );
  if (rangeMatch) {
    const low = Number(rangeMatch[1]);
    const high = Number(rangeMatch[2]);
    return {
      ps: (low + high) / 2,
      range: `约 ${low}x – ${high}x`,
    };
  }

  const single = mult.match(/([\d.]+)\s*x/i);
  if (single) {
    const value = Number(single[1]);
    return { ps: value, range: `约 ${value}x` };
  }

  return { ps: 0, range: mult.trim() };
}

function parseHistoricalRange(note: string): { low: number; high: number } | null {
  const match = note.match(
    /(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*x/i
  );
  if (!match) return null;
  return { low: Number(match[1]), high: Number(match[2]) };
}

const REVENUE_SKIP = /小计|抵消|合并|分部间/;

export function parseRevenueChartData(content: string): RevenueChartItem[] {
  const block = extractBlock(content, "经营分析");
  if (!block) return [];

  const table = extractFirstTable(block);
  if (!table) return [];

  const segmentIdx = table.headers.findIndex((h) => /分部/.test(h));
  const revenueIdx = table.headers.findIndex((h) => /营收/.test(h));
  const yoyIdx = table.headers.findIndex((h) => /同比/.test(h));
  if (segmentIdx < 0 || revenueIdx < 0) return [];

  const items: RevenueChartItem[] = [];

  for (const row of table.rows) {
    const segment = row[segmentIdx] ?? "";
    if (REVENUE_SKIP.test(segment)) continue;

    const revenue = parseNumber(row[revenueIdx] ?? "");
    if (revenue === null || revenue <= 0) continue;

    items.push({
      segment: segment.replace(/（[^）]+）/g, "").trim(),
      revenue,
      yoy: yoyIdx >= 0 ? row[yoyIdx]?.trim() || "—" : "—",
    });
  }

  return items.slice(0, 6);
}

export function parseRevenueOffsetNote(
  content: string
): RevenueOffsetNote | null {
  const block = extractBlock(content, "经营分析");
  if (!block) return null;

  const table = extractFirstTable(block);
  if (!table) return null;

  const segmentIdx = table.headers.findIndex((h) => /分部/.test(h));
  const revenueIdx = table.headers.findIndex((h) => /营收/.test(h));
  const yoyIdx = table.headers.findIndex((h) => /同比/.test(h));
  if (segmentIdx < 0 || revenueIdx < 0) return null;

  let foundry: number | null = null;
  let offset: number | null = null;
  let net: number | null = null;
  let yoy = "+7%";

  for (const row of table.rows) {
    const segment = row[segmentIdx] ?? "";
    const revenue = parseNumber(row[revenueIdx] ?? "");

    if (/Foundry|代工/.test(segment) && revenue !== null) {
      foundry = revenue;
    }
    if (/抵消/.test(segment) && revenue !== null) {
      offset = Math.abs(revenue);
    }
    if (/合并净收入|合并/.test(segment) && revenue !== null) {
      net = revenue;
      if (yoyIdx >= 0 && row[yoyIdx]) yoy = row[yoyIdx].trim();
    }
  }

  if (foundry === null || offset === null || net === null) return null;

  return { foundry, offset, net, yoy };
}

export function parsePeerValuationData(
  content: string
): PeerValuationItem[] {
  const valuationBlock = extractBlock(content, "估值分析");
  if (!valuationBlock) return [];

  const peerSection = valuationBlock.match(
    /同业估值对比：[\s\S]*?(?=\n估值判断|\n- |\n## |$)/
  )?.[0];
  if (!peerSection) return [];

  const table = parseMarkdownTable(peerSection);
  if (!table) return [];

  const companyIdx = table.headers.findIndex((h) => /公司/.test(h));
  const multIdx = table.headers.findIndex((h) => /估值倍数|倍数/.test(h));
  if (companyIdx < 0 || multIdx < 0) return [];

  return table.rows
    .map((row) => {
      const company = row[companyIdx]?.trim();
      const mult = row[multIdx]?.trim() ?? "";
      if (!company || !mult) return null;
      const parsed = parsePsMultiple(mult);
      return {
        company,
        ps: parsed.ps,
        range: parsed.range,
      };
    })
    .filter((item): item is PeerValuationItem => item !== null && item.ps > 0);
}

export function parseValuationStretchBars(content: string): StretchBarData[] {
  const valuationBlock = extractBlock(content, "估值分析");
  if (!valuationBlock) return [];

  const currentSection = valuationBlock.match(
    /当前估值：[\s\S]*?(?=\n同业|\n估值判断|$)/
  )?.[0];
  if (!currentSection) return [];

  const table = extractFirstTable(currentSection);
  if (!table) return [];

  const metricIdx = table.headers.findIndex((h) => /指标/.test(h));
  const valueIdx = table.headers.findIndex((h) => /数值/.test(h));
  const noteIdx = table.headers.findIndex((h) => /说明/.test(h));
  if (metricIdx < 0 || valueIdx < 0) return [];

  const bars: StretchBarData[] = [];

  for (const row of table.rows) {
    const metric = row[metricIdx] ?? "";
    const value = row[valueIdx] ?? "";
    const note = noteIdx >= 0 ? row[noteIdx] ?? "" : "";
    const current = parseNumber(value);
    const hist = parseHistoricalRange(note);

    if (current === null || !hist) continue;

    if (/P\/S|市销率/i.test(metric)) {
      bars.push({
        label: "TTM P/S 市销率",
        current,
        currentLabel: value.trim(),
        histLow: hist.low,
        histHigh: hist.high,
        histLabel: `${hist.low} – ${hist.high}x`,
        max: Math.max(12, current * 1.2),
      });
    }

    if (/P\/B|市净率/i.test(metric)) {
      bars.push({
        label: "P/B 市净率",
        current,
        currentLabel: value.trim(),
        histLow: hist.low,
        histHigh: hist.high,
        histLabel: `${hist.low} – ${hist.high}x`,
        max: Math.max(6, current * 1.2),
      });
    }
  }

  return bars;
}

export function parseUpsideDownside(content: string): UpsideDownside {
  const valuationBlock = extractBlock(content, "估值分析");
  if (!valuationBlock) return {};

  const judgment = valuationBlock.match(
    /估值判断：[\s\S]*?(?=\n## |$)/
  )?.[0];
  if (!judgment) return {};

  const upside = judgment.match(/上行空间[：:]\s*(.+)/)?.[1]?.trim();
  const downside = judgment.match(/下行空间[：:]\s*(.+)/)?.[1]?.trim();

  return { upside, downside };
}

export function parseStretchBarSummary(content: string): string | undefined {
  const valuationBlock = extractBlock(content, "估值分析");
  if (!valuationBlock) return undefined;

  const judgment = valuationBlock.match(
    /估值判断：[\s\S]*?(?=\n## |$)/
  )?.[0];
  if (!judgment) return undefined;

  const fair = judgment.match(/合理估值区间[：:]\s*(.+)/)?.[1]?.trim();
  return fair;
}

export function splitAtFirstTable(body: string): {
  before: string;
  tableAndAfter: string;
} {
  const idx = body.search(/^\|/m);
  if (idx === -1) return { before: body.trim(), tableAndAfter: "" };
  return {
    before: body.slice(0, idx).trim(),
    tableAndAfter: body.slice(idx).trim(),
  };
}

export function splitMarkdownByH2(content: string): { title: string; body: string }[] {
  const parts = content.split(/\n(?=## )/);

  return parts
    .map((part) => {
      const match = part.match(/^## (.+?)(?:\n|$)([\s\S]*)/);
      if (match) {
        return { title: match[1].trim(), body: match[2].trim() };
      }
      return { title: "", body: part.trim() };
    })
    .filter((part) => part.title || part.body);
}

function extractQuoteDate(note: string): string | undefined {
  const match = note.match(/截至\s*([\d-]+)\s*收盘/);
  return match?.[1];
}

function priceSubFromNote(note: string): string | undefined {
  const paren = note.match(/[（(]([^）)]+)[）)]/);
  if (paren?.[1]?.trim()) return paren[1].trim();

  const afterDate = note.replace(/.*?截至\s*[\d-]+\s*收盘\s*/, "").trim();
  return afterDate || undefined;
}

function historicalHighNote(note: string): string | undefined {
  const match = note.match(/历史多在\s*[\d.\s\-–]+x/i);
  if (!match) return undefined;
  return `${match[0].replace(/[（(].*$/, "").trim()}，处于高位`;
}

function normalizeRangeValue(value: string): string {
  return value.replace(/^约\s*/, "").replace(/\s*-\s*/g, " – ").trim();
}

export function parseHeroStats(content: string): HeroStatsResult {
  const stats: HeroStat[] = [];
  let quoteDate: string | undefined;

  const valuationBlock = content.match(
    /##\s*估值分析[\s\S]*?(?=\n## |\n# |$)/
  )?.[0];
  if (!valuationBlock) return { stats };

  const currentSection = valuationBlock.match(
    /当前估值：[\s\S]*?(?=\n同业|\n估值判断|$)/
  )?.[0];
  if (!currentSection) return { stats };

  const table = extractFirstTable(currentSection);
  if (!table) return { stats };

  const metricIdx = table.headers.findIndex((h) => /指标/.test(h));
  const valueIdx = table.headers.findIndex((h) => /数值/.test(h));
  const noteIdx = table.headers.findIndex((h) => /说明/.test(h));
  if (metricIdx < 0 || valueIdx < 0) return { stats };

  const findRow = (pattern: RegExp) =>
    table.rows.find((row) => pattern.test(row[metricIdx] ?? ""));

  const priceRow = findRow(/^股价$/);
  if (priceRow) {
    const note = noteIdx >= 0 ? priceRow[noteIdx] ?? "" : "";
    quoteDate = extractQuoteDate(note);
    stats.push({
      label: quoteDate ? `股价（${quoteDate} 收盘）` : "股价",
      value: priceRow[valueIdx]?.trim() ?? "",
      sub: priceSubFromNote(note),
    });
  }

  const capRow = findRow(/^市值$/);
  if (capRow) {
    stats.push({
      label: "市值",
      value: capRow[valueIdx]?.trim() ?? "",
      sub: noteIdx >= 0 ? capRow[noteIdx]?.trim() : undefined,
    });
  }

  const psRow = findRow(/P\/S|市销率/i);
  if (psRow) {
    const note = noteIdx >= 0 ? psRow[noteIdx] ?? "" : "";
    stats.push({
      label: "TTM P/S 市销率",
      value: psRow[valueIdx]?.trim() ?? "",
      sub: historicalHighNote(note) ?? (note.trim() || undefined),
      tone: "warning",
    });
  }

  const rangeRow = findRow(/52\s*周区间/);
  if (rangeRow) {
    stats.push({
      label: "52 周区间",
      value: normalizeRangeValue(rangeRow[valueIdx]?.trim() ?? ""),
      sub: noteIdx >= 0 ? rangeRow[noteIdx]?.trim() : undefined,
      tone: "warning",
    });
  }

  return { stats, quoteDate };
}

export interface SourceRow {
  item: string;
  content: string;
  href?: string;
  note: string;
}

function parseMarkdownLink(text: string): { label: string; href?: string } {
  const match = text.trim().match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (match) {
    return { label: match[1].trim(), href: match[2].trim() };
  }
  return { label: text.trim() };
}

export function parseSourcesTable(body: string): SourceRow[] {
  const cleaned = body.replace(/^##\s*相关链接\s*\n*/m, "").trim();
  const table = extractFirstTable(cleaned);
  if (!table) return [];

  const itemIdx = table.headers.findIndex((h) => /项目/.test(h));
  const contentIdx = table.headers.findIndex((h) => /链接|内容/.test(h));
  const noteIdx = table.headers.findIndex((h) => /说明/.test(h));
  if (itemIdx < 0 || contentIdx < 0) return [];

  const rows: SourceRow[] = [];

  for (const row of table.rows) {
    const item = row[itemIdx]?.trim();
    const rawContent = row[contentIdx]?.trim() ?? "";
    if (!item) continue;

    const { label, href } = parseMarkdownLink(rawContent);
    const rawNote = noteIdx >= 0 ? row[noteIdx]?.trim() ?? "" : "";

    rows.push({
      item,
      content: label,
      href,
      note: rawNote || "—",
    });
  }

  return rows;
}

export function extractCompanyName(target: string): string | undefined {
  const name = target.split(/（|\(/)[0]?.trim();
  if (!name) return undefined;

  const cleaned = name
    .replace(
      /,?\s*(Inc\.?|plc|Corporation|Corp\.?|Ltd\.?|Holdings|Group)$/gi,
      ""
    )
    .trim();

  const first = cleaned.split(/\s+/)[0];
  return first || cleaned || name;
}
