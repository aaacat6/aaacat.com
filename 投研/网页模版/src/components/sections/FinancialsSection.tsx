import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent } from
'../Card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell } from
'../Table';
import { SectionHeading, SubHeading } from '../SectionHeading';
import { FadeIn } from '../FadeIn';
import { PeerValuationChart } from '../charts/PeerValuationChart';
import { ValuationStretchBar } from '../charts/ValuationStretchBar';
const finRows = [
{
  metric: '收入',
  fy: '约 528.5 亿美元',
  q1: '136 亿美元，同比 +7%',
  watch: '增长温和。'
},
{
  metric: 'GAAP 毛利率',
  fy: '约 33%-37%',
  q1: '39.4%（同比 +2.5ppt）',
  watch: '改善但远低于巅峰。'
},
{
  metric: 'Non-GAAP 毛利率',
  fy: '—',
  q1: '41.0%',
  watch: '目标长期重回 50%-60%。'
},
{
  metric: 'GAAP 经营利润率',
  fy: '亏损',
  q1: '-23.1%（含约 50 亿美元未分配项）',
  watch: '受重组/减值拖累。'
},
{
  metric: 'Non-GAAP 经营利润率',
  fy: '低个位数',
  q1: '12.3%',
  watch: '边际改善。'
},
{
  metric: 'GAAP 净利（归属 Intel）',
  fy: '约 -2.7 亿美元（近盈亏平衡）',
  q1: '-37 亿美元',
  watch: 'GAAP 仍亏。'
},
{
  metric: 'Non-GAAP 摊薄 EPS',
  fy: '微利',
  q1: '0.29 美元（远超预期 0.02）',
  watch: '连续多季超指引。'
},
{
  metric: '经营现金流',
  fy: '正',
  q1: '约 11 亿美元',
  watch: '经营现金流为正。'
},
{
  metric: '调整后自由现金流',
  fy: '负',
  q1: '约 -20 亿美元',
  watch: '仍在烧钱。'
},
{
  metric: '现金及等价物',
  fy: '—',
  q1: '约 177 亿美元（含受限）',
  watch: '流动性已改善。'
},
{
  metric: '债务',
  fy: '—',
  q1: '长期约 430 亿 + 短期约 20 亿美元',
  watch: '净债务约 200-300 亿美元（约数）。'
},
{
  metric: '股东权益',
  fy: '—',
  q1: '归属 Intel 约 1,114 亿美元',
  watch: '每股账面约 22 美元。'
},
{
  metric: '分红/回购',
  fy: '已暂停股息（此前削减）',
  q1: '无',
  watch: '现金优先用于晶圆厂与降杠杆。'
}];

const supplementRows = [
{
  item: 'ROE/ROIC',
  conclusion: '近年为负或极低，重资产回报差。',
  watch: '代工减亏后回报能否修复。'
},
{
  item: '稀释',
  conclusion: '政府转股权、英伟达/软银入股、SBC 带来稀释，股本约 50 亿股。',
  watch: '是否进一步增发融资晶圆厂。'
},
{
  item: '现金流',
  conclusion: '经营现金流正、自由现金流仍负，靠资产出售和外部投资补血。',
  watch: 'FCF 何时转正（市场普遍看 2027 后）。'
}];

const valuationRows = [
{
  metric: '股价',
  value: '约 99 美元',
  note: '截至 2026-06-05 收盘（较 5 月初约 131 高点回落）。'
},
{
  metric: '市值',
  value: '约 4,980 亿美元',
  note: '股本约 50 亿股。'
},
{
  metric: 'TTM P/S（市销率）',
  value: '约 9.4x',
  note: '基于 FY2025 收入（528.5 亿美元）与当前市值推算（历史多在 2-4x）。'
},
{
  metric: '52 周区间',
  value: '约 19 - 131 美元',
  note: '一年涨幅约 +480%。'
},
{
  metric: 'FY2025 收入',
  value: '约 528.5 亿美元',
  note: '年度已实现营收。'
},
{
  metric: 'GAAP P/E',
  value: '不适用',
  note: 'GAAP 亏损。'
},
{
  metric: 'P/B',
  value: '约 4.5x',
  note: '历史多在 1-3x。'
},
{
  metric: 'EV/EBITDA',
  value: '约 40-55x（推断）',
  note: 'EBITDA 约 90-140 亿美元口径。'
},
{
  metric: '分析师平均目标价',
  value: '约 83-88 美元',
  note: '低于现价，多家给「持有/中性」。'
}];

const peerRows = [
{
  co: 'Intel',
  growth:
  'FY2025 营收 528.5 亿美元，同比小幅增长；Q1 2026 营收 136 亿美元，同比 +7%',
  cap: '约 4,980 亿美元',
  mult: '约 9.4x TTM P/S',
  note: '重资产、低增长、代工巨亏，倍数靠转机叙事支撑'
},
{
  co: 'AMD',
  growth: 'TTM 营收约 374.5 亿美元；Q1 2026 营收 103 亿美元，同比 +10%',
  cap: '约 7,750 亿美元',
  mult: '约 18x–22.5x TTM P/S',
  note: '无晶圆厂，受益于 AI 芯片与数据中心需求暴增'
},
{
  co: '英伟达',
  growth: 'Q1 FY27 单季营收 816 亿美元，同比 +85%',
  cap: '约 4.6T–5.0T 美元',
  mult: '约 19.6x–23.4x TTM P/S',
  note: 'AI 绝对龙头，利润与营收增长规模巨大'
},
{
  co: '台积电',
  growth:
  '2026年1-5月累计营收达 1.96 万亿新台币，同比 +30.0%；预计全年美元收入增 30%+',
  cap: '约 1.89T–2.22T 美元',
  mult: '约 16x–17x TTM P/S',
  note: '代工行业标杆与垄断者，Intel 晶圆制造追赶的目标'
}];

export function FinancialsSection() {
  return (
    <section aria-labelledby="financials">
      <SectionHeading
        id="financials"
        kicker="Financials & Valuation"
        title="财务与估值" />
      

      <SubHeading id="financial-analysis" title="财务分析" />
      <FadeIn>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>指标</TableHead>
                <TableHead>FY2025（截至 2025-12-27）</TableHead>
                <TableHead>Q1 2026（截至 2026-03-28）</TableHead>
                <TableHead>观察点</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finRows.map((row) =>
              <TableRow key={row.metric}>
                  <TableCell className="font-medium align-top whitespace-nowrap">
                    {row.metric}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground tabular-nums whitespace-normal">
                    {row.fy}
                  </TableCell>
                  <TableCell className="align-top tabular-nums whitespace-normal">
                    {row.q1}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground whitespace-normal">
                    {row.watch}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </FadeIn>

      <FadeIn>
        <p className="mt-8 mb-3 text-sm font-semibold">补充判断</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">项目</TableHead>
                <TableHead>结论</TableHead>
                <TableHead className="w-64">关注点</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplementRows.map((row) =>
              <TableRow key={row.item}>
                  <TableCell className="font-medium align-top whitespace-nowrap">
                    {row.item}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground whitespace-normal">
                    {row.conclusion}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground whitespace-normal">
                    {row.watch}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </FadeIn>

      <SubHeading id="valuation" title="估值分析" />

      <FadeIn>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">当前估值 vs 历史区间</CardTitle>
            <CardDescription>
              当前估值倍数已远超历史区间，由转机叙事 + 国家冠军安全溢价驱动
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ValuationStretchBar
              label="TTM P/S 市销率"
              current={9.4}
              currentLabel="当前约 9.4x"
              histLow={2}
              histHigh={4}
              histLabel="2 – 4x"
              max={12} />
            
            <ValuationStretchBar
              label="P/B 市净率"
              current={4.5}
              currentLabel="当前约 4.5x"
              histLow={1}
              histHigh={3}
              histLabel="1 – 3x"
              max={6} />
            
            <p className="text-[13px] leading-relaxed text-muted-foreground border-t border-border pt-4">
              个人判断：以当前盈利能力，3-5x 销售更合理；现价隐含「代工成功 +
              利润率大幅修复」的乐观情景。
            </p>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn>
        <div className="mt-4 rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>指标</TableHead>
                <TableHead className="text-right">数值</TableHead>
                <TableHead>说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {valuationRows.map((row) =>
              <TableRow key={row.metric}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {row.metric}
                  </TableCell>
                  <TableCell className="text-right tabular-nums whitespace-nowrap">
                    {row.value}
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-normal">
                    {row.note}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </FadeIn>

      <FadeIn>
        <Card className="shadow-none mt-8">
          <CardHeader>
            <CardTitle className="text-base">同业估值对比（TTM P/S）</CardTitle>
            <CardDescription>
              区间取中值作图，标签显示完整区间；Intel
              倍数虽低于同业，但其盈利能力与增长亦显著更弱
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PeerValuationChart />
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn>
        <div className="mt-4 rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">公司</TableHead>
                <TableHead>增长/最新收入线索</TableHead>
                <TableHead className="whitespace-nowrap">市值（约）</TableHead>
                <TableHead className="whitespace-nowrap">
                  粗略估值倍数
                </TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peerRows.map((row) =>
              <TableRow
                key={row.co}
                className={row.co === 'Intel' ? 'bg-amber-50/60' : ''}>
                
                  <TableCell className="font-medium align-top whitespace-nowrap">
                    {row.co}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground whitespace-normal">
                    {row.growth}
                  </TableCell>
                  <TableCell className="align-top tabular-nums whitespace-nowrap">
                    {row.cap}
                  </TableCell>
                  <TableCell className="align-top tabular-nums whitespace-nowrap">
                    {row.mult}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground whitespace-normal">
                    {row.note}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <Card
            size="sm"
            className="shadow-none border-emerald-200 bg-emerald-50/40">
            
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp
                  className="size-4 text-emerald-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-emerald-800">
                  上行空间
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              18A/14A
              良率达标、苹果/高通/微软级外部代工大单落地、服务器份额回收，市场继续按「西方台积电」重估。
            </CardContent>
          </Card>
          <Card size="sm" className="shadow-none border-red-200 bg-red-50/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingDown
                  className="size-4 text-red-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-red-800">下行空间</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              股价已高于分析师平均目标价（约 -10% 到 -30%
              隐含下行）；若代工季度亏损扩大或良率停滞，可能回吐大部分涨幅（一年内曾在约
              19 美元）。
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </section>);

}