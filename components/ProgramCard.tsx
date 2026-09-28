export type ProgramItem = {
  id: string;
  time: string;
  title: string;
  host: string | null;
  tag: string | null;
  description: string | null;
};

export default function ProgramCard({ program }: { program: ProgramItem }) {
  return (
    <li className="group rounded-2xl border border-white/8 bg-veld-charcoal2 p-5 shadow-card transition-colors hover:border-veld-amber/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-display text-sm font-semibold tracking-wide text-veld-amber2">
          {program.time}
        </span>
        {program.tag && (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-veld-muted">
            {program.tag}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-xl font-bold text-veld-cream">
        {program.title}
      </h3>
      {program.host && (
        <p className="mt-1 text-sm font-medium text-veld-orange">
          {program.host}
        </p>
      )}
      {program.description && (
        <p className="mt-2 text-sm leading-relaxed text-veld-muted">
          {program.description}
        </p>
      )}
    </li>
  );
}