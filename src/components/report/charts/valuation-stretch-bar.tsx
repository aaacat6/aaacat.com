import type { StretchBarData } from "@/lib/invest-charts";

export function ValuationStretchBar({
  label,
  current,
  currentLabel,
  histLow,
  histHigh,
  histLabel,
  max,
}: StretchBarData) {
  const pct = (value: number) => `${Math.min((value / max) * 100, 100)}%`;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-sm font-bold tabular-nums text-amber-700 dark:text-amber-400">
          {currentLabel}
        </p>
      </div>
      <div
        className="relative h-3 rounded-full bg-muted"
        role="img"
        aria-label={`${label}：当前 ${currentLabel}，历史区间 ${histLabel}`}
      >
        <div
          className="absolute top-0 h-3 rounded-full bg-emerald-200 dark:bg-emerald-900/50"
          style={{
            left: pct(histLow),
            width: `calc(${pct(histHigh)} - ${pct(histLow)})`,
          }}
        />
        <div
          className="absolute -top-1 size-5 rounded-full border-2 border-white bg-amber-600 shadow dark:border-card"
          style={{ left: `calc(${pct(current)} - 10px)` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>
          历史区间{" "}
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            {histLabel}
          </span>
        </span>
        <span className="tabular-nums">0 – {max}x</span>
      </div>
    </div>
  );
}
