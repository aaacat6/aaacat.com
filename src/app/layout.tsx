import type { Metadata } from "next";
import Script from "next/script";
import React from "react";
import "./globals.css";
import { Zain } from "next/font/google";

const zain = Zain({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-zain",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "AAACAT",
  description: "AAACAT - WEB3",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${zain.className} min-h-screen bg-background text-2xl text-foreground antialiased`}
      >
        <Script src="/theme.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
