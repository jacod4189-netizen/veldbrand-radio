"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SETTING_KEYS, type SiteSettings } from "@/lib/settings";

export default function SettingsManager({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [w, setW] = useState<SiteSettings>(initial);
  const [besig, setBesig] = useState(false);
  const [fout, setFout] = useState("");
  const [sukses, setSukses] = useState("");

  function set(key: keyof SiteSettings, value: string) {
    setW((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFout("");
    setSukses("");
    setBesig(true);

    const supabase = createClient();
    const rows = SETTING_KEYS.map((key) => ({ key, value: w[key].trim() }));

    const { error } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });

    if (error) {
      setFout("Kon nie stoor nie. Probeer asseblief weer.");
      setBesig(false);
      return;
    }

    setSukses("Instellings gestoor. Die webwerf is opgedateer.");
    setBesig(false);
    router.refresh();
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream focus:border-veld-amber/50";
  const labelClass = "block text-sm font-medium text-veld-cream";
  const cardClass =
    "space-y-5 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className={cardClass}>
        <h2 className="font-display text-xl font-bold text-veld-cream">
          Kontakbesonderhede
        </h2>
        <div>
          <label htmlFor="epos" className={labelClass}>
            E-pos
          </label>
          <input
            id="epos"
            type="email"
            required
            value={w.contact_email}
            onChange={(e) => set("contact_email", e.target.value)}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-veld-muted/70">
            Kontakvorm-boodskappe word hierheen gestuur.
          </p>
        </div>
        <div>
          <label htmlFor="foon" className={labelClass}>
            Telefoonnommer
          </label>
          <input
            id="foon"
            type="tel"
            required
            value={w.contact_phone}
            onChange={(e) => set("contact_phone", e.target.value)}
            className={inputClass}
          />
        </div>
      </section>

      <section className={cardClass}>
        <h2 className="font-display text-xl font-bold text-veld-cream">
          Sosiale media
        </h2>
        <p className="text-xs text-veld-muted/70">
          Plak die volledige skakel (begin met https://). Los leeg om dit weg te
          steek.
        </p>
        <div>
          <label htmlFor="fb" className={labelClass}>
            Facebook
          </label>
          <input
            id="fb"
            type="url"
            placeholder="https://facebook.com/..."
            value={w.social_facebook}
            onChange={(e) => set("social_facebook", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ig" className={labelClass}>
            Instagram
          </label>
          <input
            id="ig"
            type="url"
            placeholder="https://instagram.com/..."
            value={w.social_instagram}
            onChange={(e) => set("social_instagram", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="yt" className={labelClass}>
            YouTube
          </label>
          <input
            id="yt"
            type="url"
            placeholder="https://youtube.com/..."
            value={w.social_youtube}
            onChange={(e) => set("social_youtube", e.target.value)}
            className={inputClass}
          />
        </div>
      </section>

      <section className={cardClass}>
        <h2 className="font-display text-xl font-bold text-veld-cream">
          Oor Ons-bladsy
        </h2>
        <div>
          <label htmlFor="opskrif" className={labelClass}>
            Opskrif
          </label>
          <input
            id="opskrif"
            type="text"
            required
            value={w.about_heading}
            onChange={(e) => set("about_heading", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="intro" className={labelClass}>
            Storie van die stasie
          </label>
          <textarea
            id="intro"
            rows={7}
            required
            value={w.about_intro}
            onChange={(e) => set("about_intro", e.target.value)}
            className={`${inputClass} resize-y`}
          />
          <p className="mt-1.5 text-xs text-veld-muted/70">
            Nuwe reëls en paragrawe word behou.
          </p>
        </div>
        <div>
          <label htmlFor="boodskap" className={labelClass}>
            Stasieboodskap (die aanhaling)
          </label>
          <input
            id="boodskap"
            type="text"
            required
            value={w.station_message}
            onChange={(e) => set("station_message", e.target.value)}
            className={inputClass}
          />
        </div>
      </section>

      {fout && (
        <p role="alert" className="text-sm text-red-400">
          {fout}
        </p>
      )}
      {sukses && (
        <p role="status" className="text-sm text-emerald-400">
          {sukses}
        </p>
      )}

      <button
        type="submit"
        disabled={besig}
        className="rounded-full bg-veld-glow px-8 py-3 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
      >
        {besig ? "Besig om te stoor..." : "Stoor Alles"}
      </button>
    </form>
  );
}