import { ReportEnrichedContent } from "@/components/report/report-enriched-content";
import { SectionHeading } from "@/components/report/section-heading";
import {
  getSectionDescription,
  getSectionKicker,
  getReportSectionId,
} from "@/lib/invest-report";
import type { InvestSection } from "@/lib/invest-sections";

export function ReportSection({
  section,
  target,
}: {
  section: InvestSection;
  target?: string;
}) {
  const id = getReportSectionId(section.title);

  return (
    <section aria-labelledby={id}>
      <SectionHeading
        id={id}
        kicker={getSectionKicker(section.title)}
        title={section.title}
        description={getSectionDescription(section.title)}
      />
      <ReportEnrichedContent
        sectionTitle={section.title}
        body={section.body}
        target={target}
      />
    </section>
  );
}
