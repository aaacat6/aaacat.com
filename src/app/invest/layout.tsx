import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "投研笔记",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${notoSansSc.className} min-h-screen text-[15px] leading-relaxed antialiased md:text-base`}
    >
      {children}
    </div>
  );
}
