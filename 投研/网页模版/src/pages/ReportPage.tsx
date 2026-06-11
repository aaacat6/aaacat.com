import React from 'react';
import { TocSidebar } from '../components/TocSidebar';
import { Separator } from '../components/Separator';
import { HeroSection } from '../components/sections/HeroSection';
import { CoreJudgmentSection } from '../components/sections/CoreJudgmentSection';
import { SourcesSection } from '../components/sections/SourcesSection';
import { FundamentalsSection } from '../components/sections/FundamentalsSection';
import { OperationsSection } from '../components/sections/OperationsSection';
import { FinancialsSection } from '../components/sections/FinancialsSection';
import { FrameworkSection } from '../components/sections/FrameworkSection';
import { useScreenInit } from '../useScreenInit.js';
export function ReportPage() {
  useScreenInit();
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <TocSidebar />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 py-10 sm:py-14 space-y-16">
          <HeroSection />
          <Separator />
          <CoreJudgmentSection />
          <Separator />
          <SourcesSection />
          <Separator />
          <div>
            <FundamentalsSection />
            <OperationsSection />
          </div>
          <Separator />
          <FinancialsSection />
          <Separator />
          <FrameworkSection />

          <footer className="border-t border-border pt-8 pb-4 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl mx-auto">
              本页面内容为个人投研笔记整理，仅作学习与记录用途，不构成任何投资建议。市场有风险，投资需谨慎。
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              更新日期：2026-06-09 · 标的：Intel Corporation（NASDAQ: INTC）
            </p>
          </footer>
        </div>
      </main>
    </div>);

}