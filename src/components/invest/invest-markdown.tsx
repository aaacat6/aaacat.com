import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

interface InvestMarkdownProps {
  content: string;
  variant?: "section" | "inline";
}

const sectionComponents: Components = {
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground/60"
      {...props}
    >
      {children}
    </a>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mb-4 mt-8 flex scroll-mt-24 items-center gap-3 text-base font-semibold text-foreground first:mt-0 md:text-lg"
      {...props}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mb-2 mt-5 scroll-mt-24 text-sm font-semibold text-foreground/90"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="my-3 leading-relaxed text-foreground/85" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-3 space-y-2 pl-0" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-3 list-decimal space-y-2 pl-5" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="flex gap-2.5 leading-relaxed text-foreground/85 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-foreground/25 before:content-[''] [&>p]:my-0"
      {...props}
    >
      {children}
    </li>
  ),
  table: ({ children, ...props }) => (
    <div className="invest-table-wrap my-5">
      <table {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/60" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-border/60 px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-border/40 px-4 py-3 align-top text-sm leading-relaxed"
      {...props}
    >
      {children}
    </td>
  ),
  hr: () => null,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
};

const inlineComponents: Components = {
  ...sectionComponents,
  p: ({ children, ...props }) => (
    <p className="my-1 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-1 space-y-1 pl-0" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li className="flex gap-2 leading-relaxed before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-foreground/30 before:content-['']" {...props}>
      {children}
    </li>
  ),
};

export function InvestMarkdown({
  content,
  variant = "section",
}: InvestMarkdownProps) {
  const className =
    variant === "inline" ? "invest-inline-prose" : "invest-section-prose";

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={variant === "section" ? [rehypeSlug] : []}
        components={variant === "inline" ? inlineComponents : sectionComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
