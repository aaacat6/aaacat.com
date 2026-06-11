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
// Midpoints of TTM P/S ranges from the report
const data = [
{
  company: '英伟达',
  ps: 21.5,
  range: '约 19.6x – 23.4x'
},
{
  company: 'AMD',
  ps: 20.3,
  range: '约 18x – 22.5x'
},
{
  company: '台积电',
  ps: 16.5,
  range: '约 16x – 17x'
},
{
  company: 'Intel',
  ps: 9.4,
  range: '约 9.4x'
}];

const config: ChartConfig = {
  ps: {
    label: 'TTM P/S（区间中值）',
    color: '#1d4ed8'
  }
};
export function PeerValuationChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-60 w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          left: 8,
          right: 96,
          top: 8,
          bottom: 8
        }}>
        
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(v) => `${v}x`} fontSize={12} />
        <YAxis
          type="category"
          dataKey="company"
          width={64}
          fontSize={12}
          tickLine={false}
          axisLine={false} />
        
        <Tooltip
          content={
          <ChartTooltipContent
            formatter={(
            _value: number,
            _name: string,
            item: {
              payload?: {
                range?: string;
              };
            }) =>
            `TTM P/S ${item?.payload?.range ?? ''}`} />

          } />
        
        <Bar dataKey="ps" radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((entry) =>
          <Cell
            key={entry.company}
            fill={entry.company === 'Intel' ? '#b45309' : '#94a3b8'} />

          )}
          <LabelList
            dataKey="range"
            position="right"
            fontSize={11}
            fill="#64748b" />
          
        </Bar>
      </BarChart>
    </ChartContainer>);

}