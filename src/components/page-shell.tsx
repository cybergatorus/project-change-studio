export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative bg-gradient-hero border-b border-border/60">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-14 sm:pt-20 pb-12 text-center">
        {eyebrow && <div className="text-xs uppercase tracking-widest text-primary font-semibold">{eyebrow}</div>}
        <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{description}</p>}
      </div>
    </section>
  );
}

import { Children, Fragment, type ReactNode } from "react";
import { AdSlot } from "@/components/ad-slot";

export function Prose({ children, adSlots = [] }: { children: ReactNode; adSlots?: string[] }) {
  const content = Children.toArray(children);
  const insertionPoints = adSlots.map((_, index) =>
    Math.max(1, Math.floor(((index + 1) * content.length) / (adSlots.length + 1))),
  );

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-14 prose-content">
      <div className="space-y-5 [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-muted-foreground [&_ol]:space-y-1 [&_a]:text-primary [&_a:hover]:underline">
        {content.map((child, index) => (
          <Fragment key={index}>
            {child}
            {insertionPoints.map((point, adIndex) =>
              point === index + 1 ? (
                <AdSlot key={adSlots[adIndex]} slot={adSlots[adIndex]} className="!px-0 py-8" />
              ) : null,
            )}
          </Fragment>
        ))}
      </div>
    </article>
  );
}
