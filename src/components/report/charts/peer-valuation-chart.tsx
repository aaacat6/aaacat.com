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
import type { PeerValuationItem } from "@/lib/invest-charts";

const config: ChartConfig = {
  ps: {
    label: "TTM P/S（区间中值）",
    color: "#1d4ed8",
  },
};

export function PeerValuationChart({
  data,
  highlightCompany,
}: {
  data: PeerValuationItem[];
  highlightCompany?: string;
}) {
  if (data.length === 0) return null;

  const highlight = highlightCompany?.toLowerCase();

  return (
    <ChartContainer config={config} className="h-60 min-h-60 w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 96, top: 8, bottom: 8 }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(value) => `${value}x`} fontSize={12} />
        <YAxis
          type="category"
          dataKey="company"
          width={72}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={
            <ChartTooltipContent
              formatter={(_value, _name, item) =>
                `TTM P/S ${String(item?.payload?.range ?? "")}`
              }
            />
          }
        />
        <Bar dataKey="ps" radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((entry) => {
            const isHighlight =
              highlight &&
              entry.company.toLowerCase().includes(highlight);
            return (
              <Cell
                key={entry.company}
                fill={isHighlight ? "#b45309" : "#94a3b8"}
              />
            );
          })}
          <LabelList dataKey="range" position="right" fontSize={11} fill="#64748b" />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
