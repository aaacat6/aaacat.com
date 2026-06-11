import React from 'react';
interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  description?: string;
}
export function SectionHeading({
  id,
  kicker,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div id={id} className="scroll-mt-24 mb-8">
      <p className="text-xs font-semibold tracking-widest text-blue-700 uppercase mb-2">
        {kicker}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {description &&
      <p className="mt-2 text-muted-foreground leading-relaxed">
          {description}
        </p>
      }
    </div>);

}
interface SubHeadingProps {
  id?: string;
  title: string;
}
export function SubHeading({ id, title }: SubHeadingProps) {
  return (
    <h3
      id={id}
      className="scroll-mt-24 text-lg sm:text-xl font-semibold text-foreground mt-10 mb-4 flex items-center gap-2.5">
      
      <span
        className="inline-block w-1 h-5 rounded-full bg-blue-600"
        aria-hidden="true" />
      
      {title}
    </h3>);

}