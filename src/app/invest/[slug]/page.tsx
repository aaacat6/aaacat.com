import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportPage } from "@/components/report/report-page";
import { getAllInvestSlugs, getInvestDocBySlug } from "@/lib/invest";

interface InvestDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInvestSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InvestDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getInvestDocBySlug(slug);
  if (!doc) return { title: "未找到" };

  return {
    title: `${doc.title} · 投研笔记`,
    description: doc.meta.conclusion || doc.meta.positioning,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function InvestDetailPage({ params }: InvestDetailPageProps) {
  const { slug } = await params;
  const doc = getInvestDocBySlug(slug);
  if (!doc) notFound();

  return <ReportPage doc={doc} />;
}
