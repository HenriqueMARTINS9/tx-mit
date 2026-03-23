const comparisonItems = [
  {
    title: "iFrame",
    accent: "border-sky-300/20 bg-sky-300/10 text-sky-50",
    points: ["Simple", "Limité", "Pas d'UX native"]
  },
  {
    title: "SDK",
    accent: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
    points: ["Puissant", "UI personnalisée", "Plus complexe"]
  },
  {
    title: "Natif",
    accent: "border-amber-300/20 bg-amber-300/10 text-amber-50",
    points: ["Meilleure UX mobile", "Contrôles natifs", "Moins personnalisable"]
  }
];

export function ComparisonSection() {
  return (
    <section className="mx-auto mt-10 max-w-4xl px-6">
      <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-panel backdrop-blur">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Comparaison Rapide
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Choisissez l'approche qui correspond à l'objectif produit.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
            Cette section permet à un client de comprendre les compromis en un coup
            d'œil, pendant une démo live ou sur un écran de téléphone.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {comparisonItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[26px] border border-white/10 bg-white/5 p-5"
            >
              <span
                className={`inline-flex rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.22em] ${item.accent}`}
              >
                {item.title}
              </span>
              <div className="mt-5 space-y-3">
                {item.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-200"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
