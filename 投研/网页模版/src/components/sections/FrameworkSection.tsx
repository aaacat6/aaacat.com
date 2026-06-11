import React from 'react';
import {
  Lightbulb,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  Scale,
  Gavel,
  ArrowUpCircle,
  PlusCircle,
  MinusCircle,
  CalendarClock,
  ListChecks,
  Activity } from
'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Badge } from '../Badge';
import { SectionHeading, SubHeading } from '../SectionHeading';
import { FadeIn } from '../FadeIn';
const assumptions = [
'18A 良率持续改善并规模量产（Panther Lake），14A 能凭确认客户承诺推进，制程重回第一梯队。',
'代工外部客户（含 Terafab、潜在苹果/高通/微软）从公告转为经常性收入，代工亏损逐年收窄、走向盈亏平衡。',
'政府/英伟达/软银背书 + 资产出售持续修复资产负债表，公司不被迫大幅稀释或削减投入。'];

const risks = [
{
  cat: '业务风险',
  text: '18A/14A 良率停滞、AI 训练芯片缺席、AMD 在服务器持续抢份额、Arm 阵营冲击 x86 PC。'
},
{
  cat: '财务风险',
  text: '代工年亏约百亿、自由现金流为负、资本开支巨大，可能再融资/增发稀释。'
},
{
  cat: '政策风险',
  text: 'CHIPS 资金延迟或削减、对华出口管制、政府持股带来的治理与决策约束。'
},
{
  cat: '竞争风险',
  text: '台积电制程领先、英伟达生态护城河、AMD 性价比、客户对 Intel 代工「既是对手又是供应商」的信任问题。'
},
{
  cat: '估值风险',
  text: '股价一年涨约 5 倍且高于分析师目标价，对任何利空高度敏感。'
},
{
  cat: '黑天鹅风险',
  text: '晶圆厂重大良率事故、地缘缓和导致「安全溢价」消退、管理层/董事会摩擦。'
}];

const bullish = [
'美国本土唯一具备先进制程 R&D + 量产规模的公司，地缘价值不可替代。',
'陈立武带来资本纪律（「没有空白支票」）和投资人人脉，引入政府/英伟达/软银背书显著降低破产尾部风险。',
'18A 良率月度改善、Panther Lake AI PC、服务器 SMT 回归，是真实的运营进展。'];

const bearish = [
'代工仍在年亏约百亿美元、自由现金流为负，复苏尚未体现在 GAAP 利润里。',
'股价已涨约 5 倍并高于分析师平均目标价，定价接近「完美执行」。',
'AI 训练芯片已认输，长期最大增长极缺席；x86 还面临 Arm 侵蚀。'];

const verifyList = [
'18A 良率是否稳定达标、Panther Lake 上量与口碑。',
'代工外部客户收入能否环比加速（关键单一指标）。',
'代工经营亏损是否逐季收窄、自由现金流转正时间表。'];

const trackList = [
'Intel Foundry 营收/亏损、外部客户收入。',
'DCAI 与 CCG 份额（对 AMD）、毛利率回升幅度。',
'CapEx、调整后自由现金流、净债务、是否再融资。',
'14A 客户承诺与里程碑（2028 风险量产）。'];

export function FrameworkSection() {
  return (
    <section aria-labelledby="framework">
      <SectionHeading
        id="framework"
        kicker="Investment Framework"
        title="投资框架" />
      

      <SubHeading id="assumptions" title="关键假设" />
      <FadeIn>
        <div className="space-y-3">
          {assumptions.map((text, i) =>
          <div
            key={i}
            className="flex items-start gap-4 rounded-lg border border-border p-4">
            
              <div className="flex items-center justify-center size-8 shrink-0 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground pt-1">
                {text}
              </p>
            </div>
          )}
        </div>
      </FadeIn>

      <SubHeading id="risks" title="相关风险" />
      <FadeIn>
        <div className="rounded-xl border border-red-200 overflow-hidden divide-y divide-red-100">
          {risks.map((risk) =>
          <div
            key={risk.cat}
            className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 p-4 bg-white">
            
              <Badge variant="destructive" className="shrink-0 self-start">
                {risk.cat}
              </Badge>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {risk.text}
              </p>
            </div>
          )}
        </div>
      </FadeIn>

      <SubHeading id="thoughts" title="自己想法" />
      <FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card size="sm" className="shadow-none border-emerald-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsUp
                  className="size-4 text-emerald-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-emerald-800">
                  看多理由
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {bullish.map((t, i) =>
                <li key={i} className="flex gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">
                      ·
                    </span>
                    {t}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
          <Card size="sm" className="shadow-none border-red-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsDown
                  className="size-4 text-red-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-red-800">看空理由</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {bearish.map((t, i) =>
                <li key={i} className="flex gap-2">
                    <span className="text-red-600 font-bold shrink-0">·</span>
                    {t}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn>
        <Card size="sm" className="shadow-none mt-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Scale className="size-4 text-blue-700" aria-hidden="true" />
              <CardTitle className="text-sm">市场分歧</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground space-y-2">
            <p>
              <span className="font-semibold text-emerald-700">多方：</span>把
              Intel 当「西方台积电 + 国家冠军 + AI PC/服务器 CPU 复苏」重估。
            </p>
            <p>
              <span className="font-semibold text-red-700">空方：</span>
              这是叙事/动量行情，代工经济性和良率仍未证明，估值透支。
            </p>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn>
        <div className="mt-4 rounded-xl border border-blue-300 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <Lightbulb
              className="size-5 text-blue-700 shrink-0 mt-0.5"
              aria-hidden="true" />
            
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1.5">我的判断</p>
              <p className="text-sm leading-relaxed text-blue-900/90">
                转机方向正确且有实质进展（事实）；但兑现为持续利润仍需数年（推断）；当前价格更适合已持有者管理仓位，
                <span className="font-semibold">不适合新资金在高位追入</span>
                （个人判断）。
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <SubHeading id="watchlist" title="未来关注" />
      <FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card size="sm" className="shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ListChecks
                  className="size-4 text-blue-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm">需要验证的假设</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {verifyList.map((t, i) =>
                <li key={i} className="flex gap-2">
                    <span className="text-blue-600 font-bold shrink-0">·</span>
                    {t}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
          <Card size="sm" className="shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-blue-700" aria-hidden="true" />
                <CardTitle className="text-sm">关键跟踪指标</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {trackList.map((t, i) =>
                <li key={i} className="flex gap-2">
                    <span className="text-blue-600 font-bold shrink-0">·</span>
                    {t}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <Card
            size="sm"
            className="shadow-none border-emerald-200 bg-emerald-50/40">
            
            <CardHeader>
              <div className="flex items-center gap-2">
                <ArrowUpCircle
                  className="size-4 text-emerald-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-emerald-800">
                  买入触发条件
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              股价显著回落至接近账面或 3-5x 销售区间，同时代工减亏路径被验证。
            </CardContent>
          </Card>
          <Card size="sm" className="shadow-none border-blue-200 bg-blue-50/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PlusCircle
                  className="size-4 text-blue-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-blue-800">
                  加仓触发条件
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              连续 2-3 季代工外部收入加速 + 亏损收窄 + 自由现金流改善。
            </CardContent>
          </Card>
          <Card size="sm" className="shadow-none border-red-200 bg-red-50/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MinusCircle
                  className="size-4 text-red-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-red-800">
                  减仓/卖出触发条件
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              <ul className="space-y-1.5">
                <li>代工季度亏损扩大或良率停滞、丢失重大客户。</li>
                <li>被迫大规模增发稀释、CHIPS 资金生变。</li>
                <li>估值继续脱离基本面而无新订单支撑。</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-border p-4">
          <CalendarClock
            className="size-4 text-blue-700 shrink-0 mt-0.5"
            aria-hidden="true" />
          
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              下次复盘时间：
            </span>
            Q2 2026 财报（约
            2026-07-22/24）后；重点看代工外部收入、毛利率、全年指引与现金流。
          </p>
        </div>
      </FadeIn>

      <SubHeading id="decision" title="决策" />
      <FadeIn>
        <Card className="shadow-none border-amber-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gavel className="size-4 text-amber-700" aria-hidden="true" />
              <CardTitle className="text-base text-amber-900">
                结论与执行
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">结论：</span>
              方向正确的高风险转机股，但当前价格已大幅领先基本面，且高于分析师平均目标价；
              <span className="font-semibold text-amber-800">
                先观察，不追高
              </span>
              。
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">执行动作：</span>
              建立跟踪清单，等待 Q2 2026
              财报验证代工进展或股价回落到更合理估值。
            </p>
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
                复盘记录
              </p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center" aria-hidden="true">
                  <div className="size-2.5 rounded-full bg-blue-600 mt-1.5" />
                  <div className="w-px flex-1 bg-border mt-1" />
                </div>
                <div className="pb-1">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    2026-06-09 · 初版调研
                  </p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    已核验 Q1 2026 财报（营收 136 亿、non-GAAP EPS
                    0.29、代工亏损 24 亿、现金约 177 亿）、FY2025
                    概况、陈立武改革与战略入股、当前行情（约 99 美元、市值约
                    4,980 亿、一年涨约 480%）。待补充：FY2025
                    精确净利/分部数据、政府/英伟达/软银精确持股比例、净债务精确口径、历史估值分位数、Terafab
                    条款。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </section>);

}