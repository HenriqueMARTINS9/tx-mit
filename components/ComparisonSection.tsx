const comparisonColumns = [
  {
    key: "iframe",
    label: "iFrame",
    accent: "border-sky-300/20 bg-sky-300/10 text-sky-50"
  },
  {
    key: "sdk",
    label: "SDK",
    accent: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
  },
  {
    key: "natif",
    label: "Natif",
    accent: "border-amber-300/20 bg-amber-300/10 text-amber-50"
  }
] as const;

const comparisonRows = [
  {
    criterion: "Vitesse d'intégration",
    iframe: "Très rapide",
    sdk: "Moyenne",
    natif: "Rapide si la source MP4 est prête"
  },
  {
    criterion: "Contrôle du player",
    iframe: "Faible",
    sdk: "Très élevé",
    natif: "Limité"
  },
  {
    criterion: "Expérience mobile native",
    iframe: "Non",
    sdk: "Non",
    natif: "Oui"
  },
  {
    criterion: "Contrôles personnalisés",
    iframe: "Très limités",
    sdk: "Oui",
    natif: "Non"
  },
  {
    criterion: "Plein écran et rotation",
    iframe: "Dépend du fournisseur",
    sdk: "Comportement web",
    natif: "Gérés par l'OS"
  },
  {
    criterion: "Cas idéal",
    iframe: "Embed rapide pour une démo",
    sdk: "Produit interactif ou branding fort",
    natif: "Expérience mobile premium"
  }
];

export function ComparisonSection() {
  return (
    <section id="comparaison" className="mobile-section mx-auto mt-10 max-w-4xl px-4 sm:px-6">
      <div className="rounded-[30px] border border-white/10 bg-slate-950/70 p-5 shadow-panel backdrop-blur sm:rounded-[32px] sm:p-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Comparaison Rapide
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Comparez les trois approches dans un vrai tableau.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Chaque critère reste aligné pour rendre la comparaison immédiate pendant une
            démo client.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/50">
          <div className="no-scrollbar overflow-x-auto">
            <table aria-label="Tableau comparatif vidéo" className="min-w-[760px] w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="sticky left-0 z-20 bg-slate-950 px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Critère
                  </th>
                  {comparisonColumns.map((column) => (
                    <th
                      key={column.key}
                      className="bg-slate-950 px-4 py-4 text-left text-sm font-semibold text-white"
                    >
                      <span
                        className={`inline-flex rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.22em] ${column.accent}`}
                      >
                        {column.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.criterion} className="border-b border-white/5 last:border-b-0">
                    <th className="sticky left-0 z-10 bg-slate-950/95 px-4 py-4 text-left text-sm font-medium text-white">
                      {row.criterion}
                    </th>
                    <td className="px-4 py-4 text-sm text-slate-200">{row.iframe}</td>
                    <td className="px-4 py-4 text-sm text-slate-200">{row.sdk}</td>
                    <td className="px-4 py-4 text-sm text-slate-200">{row.natif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
