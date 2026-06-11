import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";
import { FadeIn } from "@/components/report/fade-in";
import { SubHeading } from "@/components/report/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/report/ui/table";
import { splitMarkdownByH2 } from "@/lib/invest-charts";
import { cn } from "@/lib/utils";

function yoyClassName(value: string): string {
  if (value.startsWith("+")) return "text-emerald-700 dark:text-emerald-400";
  if (value.startsWith("-")) return "text-red-700 dark:text-red-400";
  return "text-muted-foreground";
}

function buildComponents(options: {
  tableVariant?: "default" | "revenue";
  highlightRowMatch?: string;
}): Components {
  const { tableVariant = "default", highlightRowMatch } = options;

  return {
    h2: ({ children, id }) => <SubHeading id={id} title={String(children)} />,
    h3: ({ children, id }) => (
      <h4
        id={id}
        className="mb-2 mt-6 scroll-mt-24 text-sm font-semibold text-foreground"
      >
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="my-3 leading-relaxed text-muted-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex gap-2">
        <span className="shrink-0 font-bold text-blue-600 dark:text-blue-400">
          ·
        </span>
        <span>{children}</span>
      </li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-1 text-blue-700 hover:underline dark:text-blue-400"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="my-3 overflow-hidden rounded-xl border border-border text-sm leading-normal">
        <Table>{children}</Table>
      </div>
    ),
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => {
      const text = String(children);
      const isHighlight =
        highlightRowMatch &&
        text.toLowerCase().includes(highlightRowMatch.toLowerCase());
      const isTotal = /合并净收入|合并/.test(text);

      return (
        <TableRow
          className={cn(
            isHighlight && "bg-amber-50/60 dark:bg-amber-950/20",
            isTotal && "bg-muted/50 font-medium"
          )}
        >
          {children}
        </TableRow>
      );
    },
    th: ({ children }) => <TableHead>{children}</TableHead>,
    td: ({ children }) => {
      const text = String(children).trim();

      if (tableVariant === "revenue" && /^[+-]\d/.test(text)) {
        return (
          <TableCell
            className={cn(
              "align-top text-right tabular-nums",
              yoyClassName(text)
            )}
          >
            {children}
          </TableCell>
        );
      }

      return <TableCell className="align-top">{children}</TableCell>;
    },
    hr: () => null,
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  };
}

function MarkdownBody({
  content,
  animate = true,
  blocks = false,
  tableVariant,
  highlightRowMatch,
}: {
  content: string;
  animate?: boolean;
  blocks?: boolean;
  tableVariant?: "default" | "revenue";
  highlightRowMatch?: string;
}) {
  const components = buildComponents({ tableVariant, highlightRowMatch });

  if (blocks) {
    const sections = splitMarkdownByH2(content);
    return (
      <>
        {sections.map((section, index) => {
          const sectionContent = section.title
            ? `## ${section.title}\n${section.body}`
            : section.body;

          const node = (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
              components={components}
            >
              {sectionContent}
            </ReactMarkdown>
          );

          return animate ? (
            <FadeIn key={section.title || index} delay={index > 0 ? 0.05 : 0}>
              {node}
            </FadeIn>
          ) : (
            <div key={section.title || index}>{node}</div>
          );
        })}
      </>
    );
  }

  const node = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );

  if (!animate) return node;
  return <FadeIn>{node}</FadeIn>;
}

export function ReportMarkdown({
  content,
  animate = true,
  blocks = false,
  tableVariant,
  highlightRowMatch,
}: {
  content: string;
  animate?: boolean;
  blocks?: boolean;
  tableVariant?: "default" | "revenue";
  highlightRowMatch?: string;
}) {
  if (!content.trim()) return null;

  return (
    <MarkdownBody
      content={content}
      animate={animate}
      blocks={blocks}
      tableVariant={tableVariant}
      highlightRowMatch={highlightRowMatch}
    />
  );
}
