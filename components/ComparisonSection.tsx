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
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 sm:text-xs sm:tracking-[0.26em]">
            Comparaison Rapide
          </p>
          <h2 className="mt-3 text-xl font-semibold text-white sm:text-3xl">
            Comparez les trois approches dans un vrai tableau.
          </h2>
          <p className="mt-4 text-[13px] leading-5 text-slate-300 sm:text-sm sm:leading-6">
            Chaque critère reste aligné pour rendre la comparaison immédiate pendant une
            démo client.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/50">
          <div className="no-scrollbar overflow-x-auto">
            <table
              aria-label="Tableau comparatif vidéo"
              className="min-w-[680px] w-full sm:min-w-[760px]"
            >
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="sticky left-0 z-20 bg-slate-950 px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:px-4 sm:py-4 sm:text-xs sm:tracking-[0.24em]">
                    Critère
                  </th>
                  {comparisonColumns.map((column) => (
                    <th
                      key={column.key}
                      className="bg-slate-950 px-3 py-3 text-left text-[13px] font-semibold text-white sm:px-4 sm:py-4 sm:text-sm"
                    >
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] sm:px-3 sm:py-2 sm:text-xs sm:tracking-[0.22em] ${column.accent}`}
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
                    <th className="sticky left-0 z-10 bg-slate-950/95 px-3 py-3 text-left text-[12px] font-medium leading-5 text-white sm:px-4 sm:py-4 sm:text-sm">
                      {row.criterion}
                    </th>
                    <td className="px-3 py-3 text-[12px] leading-5 text-slate-200 sm:px-4 sm:py-4 sm:text-sm">
                      {row.iframe}
                    </td>
                    <td className="px-3 py-3 text-[12px] leading-5 text-slate-200 sm:px-4 sm:py-4 sm:text-sm">
                      {row.sdk}
                    </td>
                    <td className="px-3 py-3 text-[12px] leading-5 text-slate-200 sm:px-4 sm:py-4 sm:text-sm">
                      {row.natif}
                    </td>
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
