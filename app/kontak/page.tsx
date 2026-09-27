"use client";

import { useState, FormEvent } from "react";

export default function KontakPage() {
  const [naam, setNaam] = useState("");
  const [epos, setEpos] = useState("");
  const [boodskap, setBoodskap] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const onderwerp = encodeURIComponent(`Boodskap van ${naam || "webwerf"}`);
    const liggaam = encodeURIComponent(
      `Naam: ${naam}\nE-pos: ${epos}\n\n${boodskap}`
    );
    window.location.href = `mailto:v2radio@veldbrandradio.co.za?subject=${onderwerp}&body=${liggaam}`;
  }

  return (
    <div className="relative bg-veld-black">
      <div className="pointer-events-none absolute inset-0 bg-veld-radial" />

      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-veld-amber/30 bg-veld-amber/10 px-4 py-1.5 text-xs font-medium tracking-wide text-veld-amber2">
            Kontak Ons
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-veld-cream sm:text-5xl">
            Kom Ons Gesels
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-balance text-veld-muted">
            Het jy 'n vraag, wenspeletjie-inskrywing of voorstel? Stuur vir
            ons 'n boodskap.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:v2radio@veldbrandradio.co.za"
            className="rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card transition-colors hover:border-veld-amber/30"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-veld-muted">
              E-pos
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-veld-cream">
              v2radio@veldbrandradio.co.za
            </p>
          </a>
          <a
            href="tel:+27793195552"
            className="rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card transition-colors hover:border-veld-amber/30"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-veld-muted">
              Telefoon
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-veld-cream">
              079 319 5552
            </p>
          </a>
        </div>

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
      </div>
    </div>
  );
}