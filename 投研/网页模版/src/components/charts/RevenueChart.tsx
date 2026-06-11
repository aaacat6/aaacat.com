import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList } from
'recharts';
import { ChartContainer, ChartTooltipContent } from '../Chart';
import type { ChartConfig } from '../Chart';
const data = [
{
  segment: 'CCG 客户端',
  revenue: 77,
  yoy: '+1%'
},
{
  segment: 'Foundry 代工',
  revenue: 54,
  yoy: '+16%'
},
{
  segment: 'DCAI 数据中心与AI',
  revenue: 51,
  yoy: '+22%'
},
{
  segment: 'All Other',
  revenue: 6,
  yoy: '-33%'
}];

const colors = ['#1d4ed8', '#0e7490', '#059669', '#94a3b8'];
const config: ChartConfig = {
  revenue: {
    label: '营收（亿美元）',
    color: '#1d4ed8'
  }
};
export function RevenueChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          left: 8,
          right: 48,
          top: 8,
          bottom: 8
        }}>
        
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(v) => `${v}亿`} fontSize={12} />
        <YAxis
          type="category"
          dataKey="segment"
          width={132}
          fontSize={12}
          tickLine={false}
          axisLine={false} />
        
        <Tooltip
          content={
          <ChartTooltipContent
            formatter={(
            value: number,
            _name: string,
            item: {
              payload?: {
                yoy?: string;
              };
            }) =>
            `约 ${value} 亿美元（同比 ${item?.payload?.yoy ?? ''}）`} />

          } />
        
        <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={26}>
          {data.map((entry, index) =>
          <Cell key={entry.segment} fill={colors[index]} />
          )}
          <LabelList
            dataKey="yoy"
            position="right"
            fontSize={12}
            fill="#64748b" />
          
        </Bar>
      </BarChart>
    </ChartContainer>);

}