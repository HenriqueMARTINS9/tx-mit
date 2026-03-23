import { type ReactNode } from "react";

type Accent = "sky" | "emerald" | "amber";

const accentClasses: Record<Accent, string> = {
  sky: "from-sky-300/30 via-cyan-300/10 to-transparent",
  emerald: "from-emerald-300/30 via-teal-300/10 to-transparent",
  amber: "from-amber-300/35 via-orange-300/10 to-transparent"
};

type SectionCardProps = {
  id?: string;
  accent: Accent;
  eyebrow: string;
  title: string;
  description: string;
  badge?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function SectionCard({
  id,
  accent,
  eyebrow,
  title,
  description,
  badge,
  children,
  footer
}: SectionCardProps) {
  return (
    <section
      id={id}
      className="mobile-section relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/75 p-5 shadow-panel backdrop-blur sm:p-6"
    >
      <div
        className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${accentClasses[accent]}`}
      />
      <div className="relative">
        <div className="flex flex-col items-start gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{title}</h2>
          </div>
          {badge}
        </div>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-[15px]">
          {description}
        </p>
        <div className="mt-6">{children}</div>
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </section>
  );
}
