import React from 'react';
import { Info } from 'lucide-react';
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
import { SubHeading } from '../SectionHeading';
import { FadeIn } from '../FadeIn';
import { RevenueChart } from '../charts/RevenueChart';
const revenueRows = [
{
  seg: 'CCG（客户端）',
  rev: '约 77 亿美元',
  yoy: '+1%',
  note: 'PC CPU，量稳价改善。'
},
{
  seg: 'DCAI（数据中心与 AI）',
  rev: '约 51 亿美元',
  yoy: '+22%',
  note: '最快增长极，AI 推理拉动 Xeon。'
},
{
  seg: 'Intel Products 小计',
  rev: '约 128 亿美元',
  yoy: '+9%',
  note: 'CCG + DCAI 产品口径。'
},
{
  seg: 'Intel Foundry（代工）',
  rev: '约 54 亿美元',
  yoy: '+16%',
  note: '含大量对内制造收入。'
},
{
  seg: 'All Other',
  rev: '约 6 亿美元',
  yoy: '-33%',
  note: 'Altera 出表后口径变化。'
},
{
  seg: '分部间抵消',
  rev: '约 -53 亿美元',
  yoy: '—',
  note: '代工对内销售抵消，分部不可简单相加。'
},
{
  seg: '合并净收入',
  rev: '约 136 亿美元',
  yoy: '+7%',
  note: '总营收。'
}];

const costRows = [
{
  item: '营业成本（COGS）',
  amt: '约 82 亿美元',
  pct: '约 60.6%',
  note: '由 GAAP 毛利率 39.4% 反推；non-GAAP 毛利率 41.0%。'
},
{
  item: '毛利',
  amt: '约 54 亿美元',
  pct: '39.4%',
  note: '长期目标重回 50%-60%。'
},
{
  item: '研发 + MG&A',
  amt: '约 44 亿美元',
  pct: '约 32%',
  note: '同比 -8%，控费见效；non-GAAP 约 39 亿。'
},
{
  item: '重组及其他',
  amt: '约 41 亿美元',
  pct: '约 30%',
  note: '主要为 Mobileye 商誉减值，一次性。'
},
{
  item: 'GAAP 经营亏损',
  amt: '约 -31 亿美元',
  pct: '-23.1%',
  note: '主因一次性重组/减值；non-GAAP 经营利润率 +12.3%。'
}];

const opsRows = [
{
  item: '代工亏损',
  status:
  'Intel Foundry Q1 2026 经营亏损约 24 亿美元（环比改善约 0.72 亿）；FY2025 经营亏损约 103 亿美元。',
  verdict: '最大的利润黑洞。'
},
{
  item: '代工外部收入',
  status:
  'FY2025 外部客户收入仅约 3.07 亿美元，Q4 单季约 2.22 亿美元（历史新高但仍小）。',
  verdict: '外部客户能否上量是核心验证点。'
},
{
  item: '支出/重组',
  status:
  '已裁员约 15%，员工从约 102 千降至约 83 千；取消德国/波兰晶圆厂、放缓俄亥俄。',
  verdict: '「没有空白支票」，资本纪律改善。'
},
{
  item: '增长来源',
  status:
  'AI PC（Panther Lake/Core Ultra 3）、服务器份额回收、代工外部客户。',
  verdict: '多数尚未兑现为利润。'
},
{
  item: '资产腾挪',
  status:
  '出售 Altera 51%、分拆 Mobileye；142 亿美元回购爱尔兰 Fab 34 的 49%。',
  verdict: '既融资也表达对制造资产信心。'
},
{
  item: '资本开支',
  status: '高 CapEx 期，Q1 调整后自由现金流约 -20 亿美元。',
  verdict: '现金消耗仍在持续。'
}];

export function OperationsSection() {
  return (
    <div>
      <SubHeading id="operations" title="经营分析" />

      <FadeIn>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">
              营收构成（Q1 2026，按分部）
            </CardTitle>
            <CardDescription>
              各分部营收规模与同比增速（亿美元）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
            <div
              className="mt-4 flex items-start gap-2.5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3"
              role="note">
              
              <Info
                className="size-4 text-blue-700 shrink-0 mt-0.5"
                aria-hidden="true" />
              
              <p className="text-[13px] leading-relaxed text-blue-900">
                <span className="font-semibold">分部不可简单相加：</span>
                Foundry 的 54
                亿营收中大部分是为自家产品部门（CCG/DCAI）代工的对内销售，合并报表时须抵消约
                53 亿美元的分部间交易，因此 77+51+54+6 = 188 亿，减去抵消 53
                亿后 ≈ 合并净收入约 136 亿美元（同比 +7%）。
              </p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn>
        <div className="mt-4 rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>分部</TableHead>
                <TableHead className="text-right">营收</TableHead>
                <TableHead className="text-right">同比</TableHead>
                <TableHead>说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueRows.map((row) =>
              <TableRow
                key={row.seg}
                className={
                row.seg === '合并净收入' ? 'bg-muted/50 font-medium' : ''
                }>
                
                  <TableCell className="whitespace-nowrap">{row.seg}</TableCell>
                  <TableCell className="text-right tabular-nums whitespace-nowrap">
                    {row.rev}
                  </TableCell>
                  <TableCell
                  className={`text-right tabular-nums ${row.yoy.startsWith('+') ? 'text-emerald-700' : row.yoy.startsWith('-') ? 'text-red-700' : 'text-muted-foreground'}`}>
                  
                    {row.yoy}
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
        <p className="mt-8 mb-3 text-sm font-semibold">
          成本构成（Q1 2026，GAAP，占营收比为反推）
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目</TableHead>
                <TableHead className="text-right">金额</TableHead>
                <TableHead className="text-right">占营收比</TableHead>
                <TableHead>说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costRows.map((row) =>
              <TableRow key={row.item}>
                  <TableCell className="whitespace-nowrap font-medium">
                    {row.item}
                  </TableCell>
                  <TableCell className="text-right tabular-nums whitespace-nowrap">
                    {row.amt}
                  </TableCell>
                  <TableCell className="text-right tabular-nums whitespace-nowrap">
                    {row.pct}
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
        <p className="mt-8 mb-3 text-sm font-semibold">其他经营要点</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">项目</TableHead>
                <TableHead>当前情况</TableHead>
                <TableHead className="w-56">判断</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opsRows.map((row) =>
              <TableRow key={row.item}>
                  <TableCell className="font-medium align-top whitespace-nowrap">
                    {row.item}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground leading-relaxed whitespace-normal">
                    {row.status}
                  </TableCell>
                  <TableCell className="align-top leading-relaxed whitespace-normal">
                    {row.verdict}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </FadeIn>
    </div>);

}