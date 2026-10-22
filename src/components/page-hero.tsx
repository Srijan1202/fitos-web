/** The top of an inner page: eyebrow, title and a line under it. */
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="glow-bg border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
        {children ? <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{children}</div> : null}
      </div>
    </section>
  );
}
