import React from 'react';
import {
  Building2,
  Factory,
  Users,
  Briefcase,
  UserCog,
  Landmark,
  History,
  BoxIcon } from
'lucide-react';
import { Card, CardContent } from '../Card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell } from
'../Table';
import { Badge } from '../Badge';
import { SectionHeading, SubHeading } from '../SectionHeading';
import { FadeIn } from '../FadeIn';
const overviewItems = [
{
  icon: Building2,
  title: '所在行业',
  items: ['CPU 设计', '晶圆制造（IDM）', '对外代工']
},
{
  icon: Briefcase,
  title: '主营业务',
  items: [
  'PC/服务器 CPU',
  '数据中心与 AI',
  '网络边缘及 Mobileye',
  'Intel Foundry（代工）']

},
{
  icon: Factory,
  title: '商业模式',
  items: [
  '产品（设计与销售芯片）',
  '代工（为自家及外部客户制造）',
  '重资产属性']

},
{
  icon: Users,
  title: '主要客户/渠道',
  items: [
  '戴尔、惠普、联想等 PC/服务器 OEM',
  '云服务商（如 Google 等多年 Xeon 合作伙伴）',
  '代工外部客户（正在培育中）']

},
{
  icon: BoxIcon,
  title: '客户集中度',
  items: [
  '产品端：依赖 PC/服务器 OEM 与云服务商',
  '代工端：外部客户当前贡献比例仍较小']

},
{
  icon: UserCog,
  title: '管理层',
  items: [
  'CEO 陈立武（Lip-Bu Tan，2025-03 上任，资深半导体投资人）',
  'CFO David Zinsner']

},
{
  icon: Landmark,
  title: '持股比例',
  items: [
  '美国政府（CHIPS 转股权，约 10% 量级）',
  '英伟达（约 50 亿美元投资）',
  '软银集团',
  '均为战略股东，具体比例需以最新 13D/proxy 文件核验']

},
{
  icon: History,
  title: '背景',
  items: [
  '1968 年成立于圣克拉拉',
  'x86 架构与「硅谷」的奠基者',
  '近十年制程落后台积电，且 AI 训练芯片败给英伟达']

}];

const industryItems = [
{
  title: '行业空间',
  items: [
  '先进制程代工（对标台积电）',
  'AI 数据中心 CPU',
  'AI PC',
  '整体 TAM 巨大但竞争激烈']

},
{
  title: '增长驱动',
  items: [
  'AI 推理及 agentic AI 对 CPU 的需求',
  'AI PC 换机潮',
  '芯片制造回流美国政策',
  '地缘政治背景下的供应链分散化趋势']

},
{
  title: '竞争格局',
  items: [
  'PC/服务器 CPU 面对 AMD 的蚕食',
  '代工面对台积电与三星的竞争',
  'AI 加速面对英伟达的绝对优势',
  '新增 Arm 阵营冲击（如英伟达 RTX Spark AI PC）']

},
{
  title: '周期性',
  items: ['强周期属性', 'PC/服务器去库存周期与重资本开支周期叠加']
},
{
  title: '政策/监管影响',
  items: [
  '美国《芯片法案》（CHIPS Act）的补贴与股权入股',
  '对华半导体出口管制',
  '被美国政府视为「国家冠军」企业，享有安全溢价']

}];

const competitiveness = [
{
  dim: '行业地位',
  fact: '全球第二大半导体厂；服务器 CPU 约 75%、PC CPU 多数份额，但 AMD 持续蚕食。',
  track: 'AMD 服务器份额是否冲向 40%。'
},
{
  dim: '护城河',
  fact: 'x86 生态 + 美国本土唯一先进制程产能（地缘稀缺性）。',
  track: '18A 良率与外部客户承诺。'
},
{
  dim: '成本/制造',
  fact: '重资产 IDM，资本密集；制程曾落后，正以 18A 追赶。',
  track: '良率（陈立武称 7%-8%/月改善）、晶圆厂利用率。'
},
{
  dim: '产品/技术',
  fact: '18A（含背面供电、GAA）量产 Panther Lake；14A 计划 2028 风险量产、2029 量产。',
  track: '18A/14A 节点兑现、SMT 回归后的服务器竞争力。'
},
{
  dim: '战略背书',
  fact: '美国政府、英伟达、软银入股；英伟达合作 x86 AI 产品。',
  track: '外部代工大单（苹果/高通/微软等是否落地）。'
},
{
  dim: '关键短板',
  fact: 'AI 训练芯片已「太晚」（英伟达约 90%）；代工年亏约百亿美元；GAAP 亏损。',
  track: '代工减亏路径、自由现金流转正时间。'
}];

export function FundamentalsSection() {
  return (
    <section aria-labelledby="fundamentals">
      <SectionHeading id="fundamentals" kicker="Fundamentals" title="基本面" />

      <SubHeading id="company-overview" title="公司概况" />
      <FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          {overviewItems.map((card) =>
          <Card key={card.title} size="sm" className="shadow-none">
              <CardContent className="py-4">
                <div className="flex items-center gap-2 mb-3">
                  <card.icon
                  className="size-4 text-blue-700"
                  aria-hidden="true" />
                
                  <p className="text-sm font-semibold">{card.title}</p>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  {card.items.map((it) =>
                <li key={it} className="flex gap-2">
                      <span className="text-border shrink-0">—</span>
                      {it}
                    </li>
                )}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </FadeIn>

      <SubHeading id="industry-analysis" title="行业分析" />
      <FadeIn>
        <div className="space-y-3">
          {industryItems.map((row) =>
          <div
            key={row.title}
            className="rounded-lg border border-border p-4 sm:flex sm:items-start sm:gap-6">
            
              <p className="text-sm font-semibold w-32 shrink-0 mb-2 sm:mb-0">
                {row.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {row.items.map((it) =>
              <Badge
                key={it}
                variant="secondary"
                className="font-normal text-muted-foreground">
                
                    {it}
                  </Badge>
              )}
              </div>
            </div>
          )}
        </div>
      </FadeIn>

      <SubHeading id="competitiveness" title="公司竞争力" />
      <FadeIn>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">维度</TableHead>
                <TableHead>事实/判断</TableHead>
                <TableHead className="w-64">跟踪点</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitiveness.map((row) =>
              <TableRow key={row.dim}>
                  <TableCell className="font-medium align-top whitespace-nowrap">
                    {row.dim}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground leading-relaxed whitespace-normal">
                    {row.fact}
                  </TableCell>
                  <TableCell className="align-top text-muted-foreground leading-relaxed whitespace-normal">
                    {row.track}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </FadeIn>
    </section>);

}