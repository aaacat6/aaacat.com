import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Zain } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";

const zain = Zain({
  subsets: ['latin'],             // 字体子集
  weight: ['400'],  // 字重选项
  display: 'swap',                // 字体显示策略
  variable: '--font-zain',     // CSS 变量名（可选）
  fallback: ['Arial', 'Helvetica', 'sans-serif'] // 字体回退链
})


export const metadata: Metadata = {
  title: "AAACAT",
  description: "AAACAT - WEB3",
  icons: {
    icon: "https://images.aaacat.com/a.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`${zain.className} text-2xl bg-white text-black dark:bg-black dark:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
