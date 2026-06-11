import { Header, InvestNav } from "@/components/header";
import { InvestList } from "@/components/invest/invest-list";
import {
  getAllInvestDocs,
  getInvestTagOptions,
  toInvestListItem,
} from "@/lib/invest";

export default function InvestPage() {
  const docs = getAllInvestDocs().map(toInvestListItem);
  const tagOptions = getInvestTagOptions();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header nav={<InvestNav />} />

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
        <header className="mb-8 border-b border-border/60 pb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            投研笔记
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            多选市场、行业标签筛选，仅展示匹配全部所选标签的笔记。
          </p>
        </header>

        <InvestList docs={docs} tagOptions={tagOptions} />
      </main>
    </div>
  );
}
