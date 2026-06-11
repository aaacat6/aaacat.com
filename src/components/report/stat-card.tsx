import { Card, CardContent } from "@/components/report/ui/card";

const toneClasses = {
  default: "text-foreground",
  warning: "text-amber-700 dark:text-amber-400",
  positive: "text-emerald-700 dark:text-emerald-400",
  negative: "text-red-700 dark:text-red-400",
};

export function StatCard({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <Card size="sm" className="shadow-none">
      <CardContent className="py-4">
        <p className="mb-1.5 text-xs text-muted-foreground">{label}</p>
        <p
          className={`text-xl font-bold tabular-nums tracking-tight sm:text-2xl ${toneClasses[tone]}`}
        >
          {value}
        </p>
        {sub && (
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {sub}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
