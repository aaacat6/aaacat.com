import { getMarketAccent, TAG_STYLES, type InvestMeta } from "@/lib/invest-shared";

export function InvestTags({ meta }: { meta: InvestMeta }) {
  const marketAccent = getMarketAccent(meta.market);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${TAG_STYLES.market}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${marketAccent}`} />
        {meta.market}
      </span>
      <span
        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${TAG_STYLES.industry}`}
      >
        {meta.industry}
      </span>
    </div>
  );
}
