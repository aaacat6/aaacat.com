import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell } from
'../Table';
import { SectionHeading } from '../SectionHeading';
import { FadeIn } from '../FadeIn';
const sources = [
{
  item: '公司公告',
  label: 'Intel Investor Relations',
  href: 'https://www.intc.com/',
  note: '投资者关系官网'
},
{
  item: '财报',
  label: 'Q1 2026 财报新闻稿（2026-04-23）',
  href: 'https://www.intc.com/news-events/press-releases/detail/1767/intel-reports-first-quarter-2026-financial-results',
  note: ''
},
{
  item: 'SEC 文件',
  label: 'Intel SEC Filings（10-K/10-Q）',
  href: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000050863&type=10-K',
  note: ''
},
{
  item: '战略/管理层信',
  label: 'Lip-Bu Tan: Steps in the Right Direction（2025-07-24）',
  href: 'https://newsroom.intel.com/corporate/lip-bu-tan-steps-in-the-right-direction',
  note: ''
},
{
  item: '代工框架',
  label: 'Intel Outlines Financial Framework for Foundry Business',
  href: 'https://newsroom.intel.com/corporate/intel-outlines-financial-framework-for-foundry-business-sets-path-to-margin-expansion',
  note: ''
}];

export function SourcesSection() {
  return (
    <section aria-labelledby="sources">
      <SectionHeading id="sources" kicker="Sources" title="资料来源" />
      <FadeIn>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-36">项目</TableHead>
                <TableHead>链接/内容</TableHead>
                <TableHead className="hidden sm:table-cell">说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((s) =>
              <TableRow key={s.label}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {s.item}
                  </TableCell>
                  <TableCell>
                    <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-700 hover:underline">
                    
                      {s.label}
                      <ExternalLink
                      className="size-3.5 shrink-0"
                      aria-hidden="true" />
                    
                    </a>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {s.note || '—'}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className="font-medium whitespace-nowrap">
                  行情口径
                </TableCell>
                <TableCell className="text-muted-foreground" colSpan={1}>
                  股价约 99 美元，市值约 4,980 亿美元
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  截至 2026-06-05 收盘（xueqiu/investing.com/TradingKey 行情）
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium whitespace-nowrap">
                  研报/访谈
                </TableCell>
                <TableCell className="text-muted-foreground">
                  TIKR、BingX、TradingKey、技术媒体为二手观点
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  关键财务事实以 Intel 官方财报为准
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </FadeIn>
    </section>);

}