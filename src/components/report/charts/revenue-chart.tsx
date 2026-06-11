"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/report/charts/chart";
import type { RevenueChartItem } from "@/lib/invest-charts";

const COLORS = ["#1d4ed8", "#0e7490", "#059669", "#94a3b8", "#7c3aed", "#ea580c"];

const config: ChartConfig = {
  revenue: {
    label: "营收（亿美元）",
    color: "#1d4ed8",
  },
};

export function RevenueChart({ data }: { data: RevenueChartItem[] }) {
  if (data.length === 0) return null;

  return (
    <ChartContainer config={config} className="h-64 min-h-64 w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 48, top: 8, bottom: 8 }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(value) => `${value}亿`} fontSize={12} />
        <YAxis
          type="category"
          dataKey="segment"
          width={132}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={
            <ChartTooltipContent
              formatter={(value, _name, item) =>
                `约 ${value} 亿美元（同比 ${String(item?.payload?.yoy ?? "")}）`
              }
            />
          }
        />
        <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={26}>
          {data.map((entry, index) => (
            <Cell key={entry.segment} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList dataKey="yoy" position="right" fontSize={12} fill="#64748b" />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
