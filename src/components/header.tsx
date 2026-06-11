import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import React from "react";

const navLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Header({ nav }: { nav?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <nav className="flex min-h-8 items-center gap-4 md:gap-6">{nav}</nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

export function InvestNav() {
  return (
    <>
      <Link href="/" className={navLinkClass}>
        返回首页
      </Link>
      <span className="text-border">/</span>
      <Link href="/invest" className={navLinkClass}>
        所有研报
      </Link>
    </>
  );
}
