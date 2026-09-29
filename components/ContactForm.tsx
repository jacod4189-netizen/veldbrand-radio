"use client";

import { useState, FormEvent } from "react";

export default function ContactForm({ email }: { email: string }) {
  const [naam, setNaam] = useState("");
  const [epos, setEpos] = useState("");
  const [boodskap, setBoodskap] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const onderwerp = encodeURIComponent(`Boodskap van ${naam || "webwerf"}`);
    const liggaam = encodeURIComponent(
      `Naam: ${naam}\nE-pos: ${epos}\n\n${boodskap}`
    );
    window.location.href = `mailto:${email}?subject=${onderwerp}&body=${liggaam}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-5 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card sm:p-8"
    >
      <div>
        <label htmlFor="naam" className="block text-sm font-medium text-veld-cream">
          Naam
        </label>
        <input
          id="naam"
          type="text"
          required
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream placeholder:text-veld-muted/50 focus:border-veld-amber/50"
          placeholder="Jou naam"
        />
      </div>

      <div>
        <label htmlFor="epos" className="block text-sm font-medium text-veld-cream">
          E-pos
        </label>
        <input
          id="epos"
          type="email"
          required
          value={epos}
          onChange={(e) => setEpos(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream placeholder:text-veld-muted/50 focus:border-veld-amber/50"
          placeholder="jou@epos.co.za"
        />
      </div>

      <div>
        <label htmlFor="boodskap" className="block text-sm font-medium text-veld-cream">
          Boodskap
        </label>
        <textarea
          id="boodskap"
          required
          rows={5}
          value={boodskap}
          onChange={(e) => setBoodskap(e.target.value)}
          className="mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream placeholder:text-veld-muted/50 focus:border-veld-amber/50"
          placeholder="Skryf jou boodskap hier..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-veld-glow px-6 py-3 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
      >
        Stuur Boodskap
      </button>
      <p className="text-xs text-veld-muted/70">
        Hierdie knoppie open jou e-posprogram met die boodskap voorafgevul.
      </p>
    </form>
  );
}