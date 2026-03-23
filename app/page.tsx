import { ComparisonSection } from "@/components/ComparisonSection";
import { IframeDemo } from "@/components/IframeDemo";
import { NativeVideoDemo } from "@/components/NativeVideoDemo";
import { SDKDemo } from "@/components/SDKDemo";
import { TxMitBrand } from "@/components/TxMitBrand";

const mobileSections = [
  { href: "#iframe", label: "iFrame" },
  { href: "#sdk", label: "SDK" },
  { href: "#natif", label: "Natif" },
  { href: "#comparaison", label: "Comparaison" }
];

export default function Home() {
  return (
    <main className="app-shell pb-24">
      <section className="mx-auto max-w-4xl px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-8">
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/75 p-5 shadow-panel backdrop-blur sm:rounded-[32px] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.16),_transparent_22%),linear-gradient(135deg,rgba(6,182,212,0.04),transparent_40%,rgba(16,185,129,0.04))]" />
          <div className="txmit-grid absolute inset-0 opacity-40" />
          <div className="relative">
            <div className="mb-6 flex items-start justify-between gap-4">
              <TxMitBrand />
              <div className="txmit-signal hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-300 sm:inline-flex">
                Équipe TX-MIT
              </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-200/85 sm:gap-3 sm:text-xs sm:tracking-[0.28em]">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-cyan-100">
                Notre approche
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Présentation client
              </span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-emerald-100">
                Recommandation mobile
              </span>
            </div>

            <div className="grid gap-8">
              <div className="max-w-4xl">
                <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Chez TX-MIT, nous comparons iframe, SDK et lecture native mobile pour
                  recommander la bonne architecture vidéo.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
                  Cette page présente notre lecture du sujet : ce que chaque approche
                  permet, le niveau de contrôle qu'elle apporte, et le moment où nous
                  privilégions le natif pour sécuriser l'expérience mobile.
                </p>
              </div>

              <div className="grid gap-3 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-5 text-sm text-slate-300">
                <div className="rounded-2xl border border-cyan-300/10 bg-slate-950/60 px-4 py-3">
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">
                    Notre lecture
                  </span>
                  <span className="mt-2 block text-lg font-medium text-white">
                    Aider nos clients à choisir une architecture claire dès le cadrage
                  </span>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                      Usage
                    </span>
                    <span className="mt-2 block font-medium text-white">
                      Cadrage, avant-vente, démonstration
                    </span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                      Force
                    </span>
                    <span className="mt-2 block font-medium text-white">
                      UX native quand elle compte, SDK quand il faut piloter
                    </span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                      Positionnement
                    </span>
                    <span className="mt-2 block font-medium text-white">
                      Expériences vidéo fiables et performantes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky-mobile-nav z-20 mx-auto max-w-4xl px-4 sm:px-6">
        <nav className="no-scrollbar flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.92),rgba(7,17,31,0.88))] p-2 shadow-panel backdrop-blur">
          {mobileSections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-slate-200 transition hover:border-cyan-300/20 hover:bg-cyan-300/10 hover:text-white"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="mx-auto mt-4 max-w-4xl px-4 sm:px-6">
        <div className="grid gap-6">
          <IframeDemo />
          <SDKDemo />
          <NativeVideoDemo />
        </div>
      </section>

      <ComparisonSection />
    </main>
  );
}
