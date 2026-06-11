import React from 'react';
import { Card, CardContent } from './Card';
interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  tone?: 'default' | 'warning' | 'positive' | 'negative';
}
const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  default: 'text-foreground',
  warning: 'text-amber-700',
  positive: 'text-emerald-700',
  negative: 'text-red-700'
};
export function StatCard({
  label,
  value,
  sub,
  tone = 'default'
}: StatCardProps) {
  return (
    <Card size="sm" className="shadow-none">
      <CardContent className="py-4">
        <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
        <p
          className={`text-xl sm:text-2xl font-bold tracking-tight tabular-nums ${toneClasses[tone]}`}>
          
          {value}
        </p>
        {sub &&
        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            {sub}
          </p>
        }
      </CardContent>
    </Card>);

}