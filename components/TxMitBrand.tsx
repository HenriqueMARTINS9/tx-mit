export function TxMitBrand() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative grid h-11 w-11 grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-white/[0.05] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_14px_30px_rgba(8,145,178,0.18)]">
        <span className="rounded-lg bg-cyan-300/90 shadow-[0_0_18px_rgba(103,232,249,0.45)]" />
        <span className="rounded-lg bg-emerald-300/90 shadow-[0_0_18px_rgba(52,211,153,0.35)]" />
        <span className="rounded-lg bg-slate-200/90" />
        <span className="rounded-lg bg-slate-800" />
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border border-slate-950 bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.45)]" />
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-cyan-200/80">
          Expériences vidéo
        </p>
        <p className="mt-1 text-xl font-semibold tracking-[-0.08em] text-white sm:text-2xl">
          TX-MIT
        </p>
      </div>
    </div>
  );
}
