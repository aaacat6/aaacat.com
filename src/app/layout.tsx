import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "AAACAT",
  description: "AAACAT - AI Chat Assistant and Blockchain Metrics Monitor",
  icons: {
    icon: "https://aaacat-com.oss-cn-hangzhou.aliyuncs.com/202406140504305.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${montserrat.variable}`}>{children}</body>
    </html>
  );
}
