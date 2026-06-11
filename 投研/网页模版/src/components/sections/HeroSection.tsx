import React from 'react';
import { Eye, TrendingUp } from 'lucide-react';
import { Badge } from '../Badge';
import { StatCard } from '../StatCard';
import { FadeIn } from '../FadeIn';
export function HeroSection() {
  return (
    <header className="pb-4">
      <FadeIn>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="secondary">半导体</Badge>
          <Badge variant="secondary">美国市场</Badge>
          <Badge variant="outline">NASDAQ: INTC</Badge>
          <span className="text-xs text-muted-foreground">
            更新日期：2026-06-09
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
          Intel 投研记录
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          x86 CPU 龙头 + IDM 集成制造 +
          转型系统代工（Foundry）的美国半导体国家队
        </p>
      </FadeIn>

      {/* Verdict banner */}
      <FadeIn delay={0.1}>
        <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-10 shrink-0 rounded-lg bg-amber-600 text-white">
              <Eye className="size-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-lg font-bold text-amber-900">
                  观察（偏谨慎）
                </p>
                <Badge className="bg-amber-600 hover:bg-amber-600 text-white border-transparent">
                  暂不追高
                </Badge>
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed text-amber-900/90">
                转机是真的（18A
                良率改善、政府/英伟达/软银背书、资产负债表修复），但股价一年暴涨约
                5 倍、P/S 约 9x 且高于分析师平均目标价，代工仍年亏百亿美元，
                <span className="font-semibold">估值已透支尚未兑现的复苏</span>
                。
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Key stats strip */}
      <FadeIn delay={0.2}>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="股价（2026-06-05 收盘）"
            value="约 99 美元"
            sub="较 5 月初约 131 高点回落" />
          
          <StatCard label="市值" value="约 4,980 亿美元" sub="股本约 50 亿股" />
          <StatCard
            label="TTM P/S 市销率"
            value="约 9.4x"
            sub="历史多在 2-4x，处于高位"
            tone="warning" />
          
          <StatCard
            label="52 周区间"
            value="19 – 131 美元"
            sub="一年涨幅约 +480%"
            tone="warning" />
          
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingUp className="size-3.5" aria-hidden="true" />
          行情口径截至 2026-06-05 收盘；关键财务事实以 Intel 官方财报为准
        </p>
      </FadeIn>
    </header>);

}