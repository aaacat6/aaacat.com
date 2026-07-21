import ThemeToggle from "@/components/theme-toggle";
import React from "react";

export function Header({ nav }: { nav?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <nav className="flex min-h-8 items-center gap-4 md:gap-6">{nav}</nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
