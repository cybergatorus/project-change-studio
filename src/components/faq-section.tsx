type FaqItem = { q: string; a: string };

export function FaqSection({
  title = "Frequently asked questions",
  eyebrow = "FAQ",
  faqs,
}: {
  title?: string;
  eyebrow?: string;
  faqs: FaqItem[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2">{eyebrow}</div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card/40 backdrop-blur">
        {faqs.map((f, i) => (
          <details key={i} className="group p-5 sm:p-6" {...(i === 0 ? { open: true } : {})}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <h3 className="text-base sm:text-lg font-medium leading-snug">{f.q}</h3>
              <span className="mt-1 shrink-0 text-muted-foreground transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
