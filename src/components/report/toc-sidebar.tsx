"use client";

import Link from "next/link";
import { FileText, LayoutGrid, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReportTocItem } from "@/lib/invest-report";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function TocLinks({
  items,
  activeId,
  onNavigate,
}: {
  items: ReportTocItem[];
  activeId: string;
  onNavigate?: () => void;
}) {
  const isParentActive = (item: ReportTocItem) =>
    activeId === item.id ||
    item.children?.some((child) => child.id === activeId);

  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => {
              scrollTo(item.id);
              onNavigate?.();
            }}
            className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
              isParentActive(item)
                ? "bg-blue-50 font-semibold text-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
          {item.children && isParentActive(item) && (
            <ul className="mb-1 ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2">
              {item.children.map((child) => (
                <li key={child.id}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollTo(child.id);
                      onNavigate?.();
                    }}
                    className={`w-full rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                      activeId === child.id
                        ? "bg-blue-50/60 font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-300"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {child.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function SidebarNavFooter({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-2 border-t border-border pt-4">
      <Link
        href="/invest"
        onClick={onNavigate}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        <LayoutGrid className="size-4" aria-hidden />
        所有研报
      </Link>
      <Link
        href="/"
        onClick={onNavigate}
        className="block px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        返回首页
      </Link>
    </div>
  );
}

export function TocSidebar({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: ReportTocItem[];
}) {
  const allIds = items.flatMap((item) => [
    item.id,
    ...(item.children?.map((child) => child.id) ?? []),
  ]);
  const [activeId, setActiveId] = useState(allIds[0] ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (allIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    for (const id of allIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [allIds]);

  return (
    <>
      <nav
        aria-label="目录"
        className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r border-border bg-card lg:block"
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
          <div className="flex size-8 items-center justify-center rounded-md bg-blue-700 text-white">
            <FileText className="size-4" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight">{title}</p>
            {subtitle && (
              <p className="truncate text-[11px] leading-tight text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex h-[calc(100vh-4rem)] flex-col overflow-y-auto p-4">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            目录
          </p>
          <TocLinks items={items} activeId={activeId} />

          <div className="mt-auto">
            <SidebarNavFooter />
          </div>
        </div>
      </nav>

      <div className="sticky top-0 z-40 border-b border-border bg-card lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-blue-700 text-white">
              <FileText className="size-3.5" aria-hidden />
            </div>
            <p className="truncate text-sm font-bold">{title}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Link
              href="/invest"
              className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              所有研报
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "关闭目录" : "打开目录"}
              aria-expanded={mobileOpen}
              className="flex size-9 items-center justify-center rounded-md transition-colors hover:bg-muted"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav
            aria-label="目录"
            className="max-h-[60vh] overflow-y-auto border-t border-border bg-card px-3 py-3"
          >
            <TocLinks
              items={items}
              activeId={activeId}
              onNavigate={() => setMobileOpen(false)}
            />
            <SidebarNavFooter onNavigate={() => setMobileOpen(false)} />
          </nav>
        )}
      </div>
    </>
  );
}
