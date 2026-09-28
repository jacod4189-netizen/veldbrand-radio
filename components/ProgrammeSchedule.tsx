"use client";

import { useEffect, useState } from "react";
import ProgramCard from "@/components/ProgramCard";

export type ScheduleProgram = {
  id: string;
  title: string;
  description: string | null;
  tag: string | null;
  host: string | null;
  start: string;
  end: string;
  days: number[];
};

const DAE = [
  { n: 1, naam: "Maandag", kort: "Ma" },
  { n: 2, naam: "Dinsdag", kort: "Di" },
  { n: 3, naam: "Woensdag", kort: "Wo" },
  { n: 4, naam: "Donderdag", kort: "Do" },
  { n: 5, naam: "Vrydag", kort: "Vr" },
  { n: 6, naam: "Saterdag", kort: "Sa" },
  { n: 7, naam: "Sondag", kort: "So" },
];

export default function ProgrammeSchedule({
  programs,
}: {
  programs: ScheduleProgram[];
}) {
  const [dag, setDag] = useState(1);

  // Open on today's day
  useEffect(() => {
    const d = new Date().getDay(); // 0 = Sunday
    setDag(d === 0 ? 7 : d);
  }, []);

  const vandag = programs
    .filter((p) => p.days.includes(dag))
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <>
      <div
        role="tablist"
        aria-label="Kies 'n dag"
        className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:justify-center"
      >
        {DAE.map((d) => {
          const active = d.n === dag;
          return (
            <button
              key={d.n}
              role="tab"
              aria-selected={active}
              onClick={() => setDag(d.n)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-veld-glow text-veld-black shadow-glow"
                  : "border border-white/10 bg-white/5 text-veld-muted hover:text-veld-cream"
              }`}
            >
              <span className="sm:hidden">{d.kort}</span>
              <span className="hidden sm:inline">{d.naam}</span>
            </button>
          );
        })}
      </div>

      {vandag.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 text-center text-sm text-veld-muted">
          Daar is nog geen programme vir hierdie dag nie.
        </p>
      ) : (
        <ul role="tabpanel" className="mt-8 grid gap-4 sm:grid-cols-2">
          {vandag.map((p) => (
            <ProgramCard
              key={p.id}
              program={{
                id: p.id,
                time: `${p.start} – ${p.end}`,
                title: p.title,
                host: p.host,
                tag: p.tag,
                description: p.description,
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
}