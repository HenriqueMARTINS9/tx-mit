"use client";

import { useEffect, useRef } from "react";

import { MobileExperienceBadge } from "@/components/MobileExperienceBadge";
import { SectionCard } from "@/components/SectionCard";

const NATIVE_VIDEO_SOURCE =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export function NativeVideoDemo() {
  const nativeVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    nativeVideoRef.current?.setAttribute("webkit-playsinline", "true");
  }, []);

  return (
    <SectionCard
      id="natif"
      accent="amber"
      eyebrow="Approche 3"
      title="Lecteur Mobile Natif"
      description="Chez TX-MIT, c'est notre option privilégiée dès que l'expérience mobile doit rester fluide, familière et robuste."
      badge={<MobileExperienceBadge />}
      footer={
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">
              Contrôles
            </span>
            <span className="mt-2 block text-sm font-medium text-white">Natifs OS</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">
              Plein Écran
            </span>
            <span className="mt-2 block text-sm font-medium text-white">
              Optimisé mobile
            </span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">
              Rotation
            </span>
            <span className="mt-2 block text-sm font-medium text-white">Gérée par l'OS</span>
          </div>
        </div>
      }
    >
      <div className="overflow-hidden rounded-[26px] border border-amber-200/15 bg-black/60">
        <div className="aspect-video">
          <video
            ref={nativeVideoRef}
            className="h-full w-full bg-black object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source src={NATIVE_VIDEO_SOURCE} type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture vidéo HTML5.
          </video>
        </div>
      </div>

      <div className="mt-5 rounded-[24px] border border-amber-200/15 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50/90">
        Chez TX-MIT, nous privilégions cette approche dès qu'un usage mobile réel est au
        centre du projet : pas de contrôles custom, pas d'interface SDK, uniquement
        l'UI vidéo native pour laisser iOS Safari et Android Chrome gérer naturellement
        le lecteur, le plein écran et la rotation.
      </div>
    </SectionCard>
  );
}
