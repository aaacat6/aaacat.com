export interface FundamentalsBlock {
  title: string;
  items: string[];
}

export function splitMarkdownByH3(content: string): FundamentalsBlock[] {
  const parts = content.split(/\n(?=### )/);

  return parts
    .map((part) => {
      const match = part.match(/^### (.+?)(?:\n|$)([\s\S]*)/);
      if (!match) return null;

      const title = match[1].trim();
      const body = match[2].trim();
      const items = parseListItems(body);

      if (items.length === 0) return null;
      return { title, items };
    })
    .filter((block): block is FundamentalsBlock => block !== null);
}

export function parseListItems(body: string): string[] {
  const items: string[] = [];

  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("|")) continue;

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      items.push(cleanItem(bullet[1]));
      continue;
    }

    for (const segment of line.split(/[；;]/)) {
      const text = cleanItem(segment);
      if (text) items.push(text);
    }
  }

  return items;
}

function cleanItem(text: string): string {
  return text.replace(/[。.]+$/g, "").trim();
}

export function extractTableMarkdown(blockBody: string): string {
  const idx = blockBody.search(/^\|/m);
  if (idx === -1) return "";
  return blockBody.slice(idx).trim();
}
