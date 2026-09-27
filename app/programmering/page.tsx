"use client";

import { useState } from "react";
import { schedule } from "@/lib/programming-data";
import ProgramCard from "@/components/ProgramCard";

export default function ProgrammeringPage() {
  const [activeDay, setActiveDay] = useState(schedule[0].day);
  const current = schedule.find((d) => d.day === activeDay) ?? schedule[0];

  return (
    <div className="relative bg-veld-black">
      <div className="pointer-events-none absolute inset-0 bg-veld-radial" />

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-veld-amber/30 bg-veld-amber/10 px-4 py-1.5 text-xs font-medium tracking-wide text-veld-amber2">
            Programskedule
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-veld-cream sm:text-5xl">
            Wat Speel Wanneer
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-balance text-veld-muted">
            Kies 'n dag om te sien watter programme regstreeks is &mdash; van
            vroegoggend tot laataand.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Kies 'n dag"
          className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:justify-center"
        >
          {schedule.map((d) => {
            const active = d.day === activeDay;
            return (
              <button
                key={d.day}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDay(d.day)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-veld-glow text-veld-black shadow-glow"
                    : "border border-white/10 bg-white/5 text-veld-muted hover:text-veld-cream"
                }`}
              >
                <span className="sm:hidden">{d.short}</span>
                <span className="hidden sm:inline">{d.day}</span>
              </button>
            );
          })}
        </div>

        <ul role="tabpanel" className="mt-8 grid gap-4 sm:grid-cols-2">
          {current.programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </ul>
      </div>
    </div>
  );
}