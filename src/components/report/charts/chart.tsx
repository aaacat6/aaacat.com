"use client";

import { createContext, useContext } from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

const ChartContext = createContext<ChartConfig>({});

export function ChartContainer({
  config,
  className,
  children,
}: {
  config: ChartConfig;
  className?: string;
  children: React.ReactElement;
}) {
  return (
    <ChartContext.Provider value={config}>
      <div
        className={cn(
          "w-full text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50",
          className
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltipContent({
  active,
  payload,
  formatter,
}: {
  active?: boolean;
  payload?: { value?: number; payload?: Record<string, unknown> }[];
  formatter?: (
    value: number,
    name: string,
    item: { payload?: Record<string, unknown> }
  ) => string;
}) {
  const config = useContext(ChartContext);

  if (!active || !payload?.length) return null;

  const item = payload[0];
  const value = Number(item.value ?? 0);
  const key = Object.keys(config)[0] ?? "value";
  const label = config[key]?.label ?? key;
  const text = formatter
    ? formatter(value, key, { payload: item.payload })
    : `${label}: ${value}`;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">{text}</p>
    </div>
  );
}
