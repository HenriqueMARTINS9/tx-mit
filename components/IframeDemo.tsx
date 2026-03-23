import { SectionCard } from "@/components/SectionCard";

const talkingPoints = ["Bon pour cadrer vite", "Peu de contrôle produit", "UX mobile non native"];

export function IframeDemo() {
  return (
    <SectionCard
      id="iframe"
      accent="sky"
      eyebrow="Approche 1"
      title="Intégration iFrame"
      description="Chez TX-MIT, nous retenons l'iFrame pour prototyper vite, avec un contrôle limité et sans véritable expérience mobile native."
      footer={
        <div className="flex flex-wrap gap-2">
          {talkingPoints.map((point) => (
            <span
              key={point}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"
            >
              {point}
            </span>
          ))}
        </div>
      }
    >
      <div className="overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/80">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?rel=0"
            title="Démo d'intégration iFrame YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">
            Mise En Place
          </span>
          <span className="mt-2 block text-sm font-medium text-white">La plus simple</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">
            Contrôle
          </span>
          <span className="mt-2 block text-sm font-medium text-white">
            Très limité
          </span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">
            UX Mobile
          </span>
          <span className="mt-2 block text-sm font-medium text-white">Fournisseur standard</span>
        </div>
      </div>
    </SectionCard>
  );
}
