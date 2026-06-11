import { InvestSectionSlide } from "@/components/invest/invest-section-slide";
import { splitInvestSections } from "@/lib/invest-sections";

export function InvestSections({ content }: { content: string }) {
  const sections = splitInvestSections(content);

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <InvestSectionSlide key={section.id} section={section} />
      ))}
    </div>
  );
}
