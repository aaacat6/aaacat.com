"use client";

import { useMemo, useState } from "react";
import { InvestCard } from "@/components/invest/invest-card";
import { cn } from "@/lib/utils";
import {
  filterDocsByTags,
  type InvestDocListItem,
  type InvestTagOptions,
} from "@/lib/invest-shared";

interface InvestListProps {
  docs: InvestDocListItem[];
  tagOptions: InvestTagOptions;
}

function TagButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-sm transition-colors",
        active
          ? "bg-foreground text-background"
          : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

export function InvestList({ docs, tagOptions }: InvestListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredDocs = useMemo(
    () => filterDocsByTags(docs, selectedTags),
    [docs, selectedTags]
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const hasTags =
    tagOptions.markets.length > 0 || tagOptions.industries.length > 0;

  return (
    <div>
      {hasTags && (
        <div className="mb-8 space-y-4 rounded-xl border border-border/70 bg-card px-4 py-4 md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground">筛选标签</p>
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedTags([])}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                清除筛选
              </button>
            )}
          </div>

          {tagOptions.markets.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">市场</p>
              <div className="flex flex-wrap gap-2">
                {tagOptions.markets.map((tag) => (
                  <TagButton
                    key={`market-${tag}`}
                    label={tag}
                    active={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                ))}
              </div>
            </div>
          )}

          {tagOptions.industries.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">行业</p>
              <div className="flex flex-wrap gap-2">
                {tagOptions.industries.map((tag) => (
                  <TagButton
                    key={`industry-${tag}`}
                    label={tag}
                    active={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedTags.length > 0 && (
            <p className="text-xs text-muted-foreground">
              已选 {selectedTags.join("、")}，匹配全部所选标签的笔记
            </p>
          )}
        </div>
      )}

      <p className="mb-4 text-sm text-muted-foreground">
        {selectedTags.length > 0
          ? `显示 ${filteredDocs.length} / ${docs.length} 篇`
          : `共 ${docs.length} 篇`}
      </p>

      {filteredDocs.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredDocs.map((doc) => (
            <InvestCard key={doc.slug} doc={doc} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border/80 px-4 py-10 text-center text-sm text-muted-foreground">
          {docs.length === 0
            ? "在 投研/ 目录下添加 Markdown 文件，并在元信息中填写市场与行业。"
            : "没有匹配当前标签的笔记，试试减少或更换标签。"}
        </p>
      )}
    </div>
  );
}
