import React from 'react';
interface ValuationStretchBarProps {
  label: string;
  current: number;
  currentLabel: string;
  histLow: number;
  histHigh: number;
  histLabel: string;
  max: number;
}
/**
 * Visualizes current valuation multiple vs. historical range
 * as a horizontal scale with a highlighted historical band and a current marker.
 */
export function ValuationStretchBar({
  label,
  current,
  currentLabel,
  histLow,
  histHigh,
  histLabel,
  max
}: ValuationStretchBarProps) {
  const pct = (v: number) => `${Math.min(v / max * 100, 100)}%`;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-sm font-bold text-amber-700 tabular-nums">
          {currentLabel}
        </p>
      </div>
      <div
        className="relative h-3 rounded-full bg-muted"
        role="img"
        aria-label={`${label}：当前 ${currentLabel}，历史区间 ${histLabel}`}>
        
        {/* Historical band */}
        <div
          className="absolute top-0 h-3 rounded-full bg-emerald-200"
          style={{
            left: pct(histLow),
            width: `calc(${pct(histHigh)} - ${pct(histLow)})`
          }} />
        
        {/* Current marker */}
        <div
          className="absolute -top-1 size-5 rounded-full bg-amber-600 border-2 border-white shadow"
          style={{
            left: `calc(${pct(current)} - 10px)`
          }} />
        
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>
          历史区间{' '}
          <span className="font-medium text-emerald-700">{histLabel}</span>
        </span>
        <span className="tabular-nums">0 – {max}x</span>
      </div>
    </div>);

}