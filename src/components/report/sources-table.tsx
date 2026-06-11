"use client";

import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/report/fade-in";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/report/ui/table";
import type { SourceRow } from "@/lib/invest-charts";

export function SourcesTable({ rows }: { rows: SourceRow[] }) {
  if (rows.length === 0) return null;

  return (
    <FadeIn>
      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-36">项目</TableHead>
              <TableHead>链接/内容</TableHead>
              <TableHead className="hidden sm:table-cell">说明</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={`${row.item}-${row.content}`}>
                <TableCell className="font-medium whitespace-nowrap">
                  {row.item}
                </TableCell>
                <TableCell>
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-700 hover:underline dark:text-blue-400"
                    >
                      {row.content}
                      <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{row.content}</span>
                  )}
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {row.note}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </FadeIn>
  );
}
