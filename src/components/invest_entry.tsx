import Link from "next/link";
import React from "react";

export function InvestEntry() {
  return (
    <div className="w-full max-w-md px-6 mb-10">
      <h2 className="mb-4 text-center text-sm uppercase tracking-widest text-muted-foreground">
        投研
      </h2>
      <Link
        href="/invest"
        className="group flex items-center gap-4 rounded-lg border border-border px-5 py-4 transition-colors duration-200 hover:bg-accent/50"
      >
        <div className="shrink-0 text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M3 3v18h18" />
            <path d="M7 16l4-6 4 3 5-8" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold">全部投研</h3>
          <p className="text-sm leading-snug text-muted-foreground">
            多选市场、行业标签筛选投研笔记。
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </div>
  );
}
