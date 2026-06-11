import fs from "fs";
import path from "path";
import {
  type InvestDoc,
  type InvestDocListItem,
  type InvestMeta,
  type InvestTagOptions,
} from "@/lib/invest-shared";

export type {
  InvestDoc,
  InvestDocListItem,
  InvestHeading,
  InvestMeta,
  InvestTagOptions,
} from "@/lib/invest-shared";

export {
  filterDocsByTags,
  getDocTags,
  getMarketAccent,
  TAG_STYLES,
} from "@/lib/invest-shared";

const INVEST_ROOT = path.join(process.cwd(), "投研");
const SKIP_DIRS = new Set(["网页模版", "node_modules", ".obsidian"]);
const SKIP_FILES = new Set(["AGENTS.md", "模版.md", "README.md", "readme.md"]);

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "");
}

function fileToSlug(filename: string): string {
  return path.basename(filename, ".md").toLowerCase();
}

function parseMetaBlock(raw: string): Partial<InvestMeta> {
  const meta: Partial<InvestMeta> = {};

  for (const line of raw.split("\n")) {
    const trimmed = line.replace(/^>\s?/, "").trim();
    if (trimmed.startsWith("更新日期：")) {
      meta.updatedAt = trimmed.replace("更新日期：", "").trim();
    } else if (trimmed.startsWith("标的：")) {
      meta.target = trimmed.replace("标的：", "").trim();
    } else if (trimmed.startsWith("定位：")) {
      meta.positioning = trimmed.replace("定位：", "").trim();
    } else if (trimmed.startsWith("市场：")) {
      meta.market = trimmed.replace("市场：", "").trim();
    } else if (trimmed.startsWith("行业：")) {
      meta.industry = trimmed.replace("行业：", "").trim();
    } else if (trimmed.startsWith("标签：")) {
      const tags = trimmed
        .replace("标签：", "")
        .trim()
        .split(/[,，]/)
        .map((tag) => tag.trim())
        .filter(Boolean);
      if (tags[0] && !meta.market) meta.market = tags[0];
      if (tags[1] && !meta.industry) meta.industry = tags[1];
    }
  }

  return meta;
}

function parseConclusion(raw: string): string {
  const match = raw.match(/##\s*一句话结论\s*\n+([\s\S]*?)(?=\n##|\n---|\n#|$)/);
  if (!match) return "";
  return match[1].trim().replace(/\n+/g, " ");
}

function parseTitle(raw: string, fallback: string): string {
  const match = raw.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].replace(/\s*投研记录\s*$/, "").trim();
  }
  return fallback;
}

function stripFrontMatter(raw: string): string {
  let content = raw;

  content = content.replace(/^#\s+.+\n+/, "");
  content = content.replace(/(?:^|\n)(?:>\s?.+\n?)+/, "\n");
  content = content.replace(/^\s*---\s*\n/, "");

  const tocStart = content.search(/^#\s*目录\s*$/m);
  if (tocStart !== -1) {
    const afterToc = content.slice(tocStart);
    const nextSection = afterToc.search(/\n---\s*\n\s*#\s+/);
    if (nextSection !== -1) {
      content = afterToc.slice(nextSection).replace(/^\s*---\s*\n/, "");
    }
  }

  return content.trim();
}

function extractHeadings(content: string) {
  const headings: { level: number; text: string; id: string }[] = [];

  for (const line of content.split("\n")) {
    const match = line.match(/^(#{1,2})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ level, text, id: slugifyHeading(text) });
    }
  }

  return headings;
}

function isSkippedPath(filePath: string): boolean {
  const parts = filePath.split(path.sep);
  return parts.some((part) => SKIP_DIRS.has(part));
}

function collectMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".md") &&
      !SKIP_FILES.has(entry.name)
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function docPriority(filePath: string): number {
  if (isSkippedPath(filePath)) return 0;
  if (filePath.includes(`${path.sep}观察${path.sep}`)) return 3;
  if (filePath.includes(`${path.sep}等待${path.sep}`)) return 2;
  return 1;
}

function dedupeDocsBySlug(docs: InvestDoc[]): InvestDoc[] {
  const bySlug = new Map<string, InvestDoc>();

  for (const doc of docs) {
    const existing = bySlug.get(doc.slug);
    if (!existing || docPriority(doc.filePath) > docPriority(existing.filePath)) {
      bySlug.set(doc.slug, doc);
    }
  }

  return [...bySlug.values()];
}

function isPublishedDoc(doc: InvestDoc): boolean {
  return doc.meta.market !== "未分类" && doc.meta.industry !== "未分类";
}

function readDoc(filePath: string): InvestDoc {
  const raw = fs.readFileSync(filePath, "utf-8");
  const slug = fileToSlug(path.basename(filePath));
  const metaBlock = parseMetaBlock(raw);
  const conclusion = parseConclusion(raw);
  const title = parseTitle(raw, path.basename(filePath, ".md"));
  const content = stripFrontMatter(raw);
  const headings = extractHeadings(content);

  return {
    slug,
    title,
    filePath,
    meta: {
      updatedAt: metaBlock.updatedAt ?? "",
      target: metaBlock.target ?? title,
      positioning: metaBlock.positioning ?? "",
      conclusion,
      market: metaBlock.market ?? "未分类",
      industry: metaBlock.industry ?? "未分类",
    },
    content,
    headings,
  };
}

export function getAllInvestDocs(): InvestDoc[] {
  if (!fs.existsSync(INVEST_ROOT)) return [];

  return dedupeDocsBySlug(
    collectMarkdownFiles(INVEST_ROOT).map(readDoc).filter(isPublishedDoc)
  ).sort((a, b) => {
    const dateA = a.meta.updatedAt || "";
    const dateB = b.meta.updatedAt || "";
    return dateB.localeCompare(dateA);
  });
}

export function toInvestListItem(doc: InvestDoc): InvestDocListItem {
  return {
    slug: doc.slug,
    title: doc.title,
    meta: doc.meta,
  };
}

export function getInvestTagOptions(): InvestTagOptions {
  const docs = getAllInvestDocs();
  const markets = new Set<string>();
  const industries = new Set<string>();

  for (const doc of docs) {
    if (doc.meta.market && doc.meta.market !== "未分类") {
      markets.add(doc.meta.market);
    }
    if (doc.meta.industry && doc.meta.industry !== "未分类") {
      industries.add(doc.meta.industry);
    }
  }

  const sortTags = (tags: Set<string>) =>
    [...tags].sort((a, b) => a.localeCompare(b, "zh-CN"));

  return {
    markets: sortTags(markets),
    industries: sortTags(industries),
  };
}

export function getInvestDocBySlug(slug: string): InvestDoc | null {
  return getAllInvestDocs().find((doc) => doc.slug === slug) ?? null;
}

export function getAllInvestSlugs(): string[] {
  return getAllInvestDocs().map((doc) => doc.slug);
}
