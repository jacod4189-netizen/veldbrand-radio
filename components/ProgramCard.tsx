import type { Program } from "@/lib/programming-data";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <li className="group rounded-2xl border border-white/8 bg-veld-charcoal2 p-5 shadow-card transition-colors hover:border-veld-amber/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-display text-sm font-semibold tracking-wide text-veld-amber2">
          {program.time}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-veld-muted">
          {program.tag}
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-bold text-veld-cream">
        {program.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-veld-orange">{program.host}</p>
      <p className="mt-2 text-sm leading-relaxed text-veld-muted">
        {program.description}
      </p>
    </li>
  );
}