"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { InvestHeading } from "@/lib/invest-shared";

interface InvestTocProps {
  headings: InvestHeading[];
}

export function InvestToc({ headings }: InvestTocProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const visibleHeadings = headings.filter((h) => h.level === 1);
    if (visibleHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-88px 0px -60% 0px", threshold: [0, 0.25, 1] }
    );

    for (const heading of visibleHeadings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  const items = headings.filter((h) => h.level === 1);
  if (items.length === 0) return null;

  const list = (
    <ul className="space-y-0.5">
      {items.map((heading, index) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] leading-snug transition-colors",
              activeId === heading.id
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <span className="font-mono text-[10px] tabular-nums opacity-50">
              {String(index + 1).padStart(2, "0")}
            </span>
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <details className="mb-6 rounded-xl border border-border/70 bg-card p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          章节导航
        </summary>
        <nav className="mt-3">{list}</nav>
      </details>

      <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-border/70 bg-card p-4 lg:block">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          章节
        </p>
        {list}
      </nav>
    </>
  );
}
