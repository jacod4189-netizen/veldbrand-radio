"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [epos, setEpos] = useState("");
  const [wagwoord, setWagwoord] = useState("");
  const [fout, setFout] = useState("");
  const [besig, setBesig] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBesig(true);
    setFout("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: epos,
      password: wagwoord,
    });

    if (error) {
      setFout("Verkeerde e-pos of wagwoord. Probeer asseblief weer.");
      setBesig(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto mt-10 max-w-sm px-4 sm:mt-20">
      <div className="text-center">
        <span
          aria-hidden="true"
          className="inline-block h-3 w-3 rounded-full bg-veld-glow shadow-glow"
        />
        <h1 className="mt-3 font-display text-3xl font-bold text-veld-cream">
          Veldbrand <span className="text-veld-amber">Admin</span>
        </h1>
        <p className="mt-2 text-sm text-veld-muted">
          Teken in om die webwerf te bestuur.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card"
      >
        <div>
          <label
            htmlFor="epos"
            className="block text-sm font-medium text-veld-cream"
          >
            E-pos
          </label>
          <input
            id="epos"
            type="email"
            required
            autoComplete="email"
            value={epos}
            onChange={(e) => setEpos(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream focus:border-veld-amber/50"
          />
        </div>

        <div>
          <label
            htmlFor="wagwoord"
            className="block text-sm font-medium text-veld-cream"
          >
            Wagwoord
          </label>
          <input
            id="wagwoord"
            type="password"
            required
            autoComplete="current-password"
            value={wagwoord}
            onChange={(e) => setWagwoord(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream focus:border-veld-amber/50"
          />
        </div>

        {fout && (
          <p role="alert" className="text-sm text-red-400">
            {fout}
          </p>
        )}

        <button
          type="submit"
          disabled={besig}
          className="w-full rounded-full bg-veld-glow px-6 py-3 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {besig ? "Besig..." : "Teken In"}
        </button>
      </form>
    </div>
  );
}