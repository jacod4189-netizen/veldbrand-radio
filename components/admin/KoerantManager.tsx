"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/dates";

type Edition = {
  id: string;
  edition_date: string;
  file_path: string;
};

const MAX_MB = 50;

export default function KoerantManager({ editions }: { editions: Edition[] }) {
  const router = useRouter();
  const [datum, setDatum] = useState("");
  const [leer, setLeer] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [besig, setBesig] = useState(false);
  const [verwyder, setVerwyder] = useState<string | null>(null);
  const [fout, setFout] = useState("");
  const [sukses, setSukses] = useState("");

  // Default the date field to today (in the visitor's own timezone)
  useEffect(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setDatum(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  }, []);

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFout("");
    setSukses("");

    if (!leer) {
      setFout("Kies asseblief 'n PDF-lêer.");
      return;
    }
    if (leer.type !== "application/pdf") {
      setFout("Slegs PDF-lêers word toegelaat.");
      return;
    }
    if (leer.size > MAX_MB * 1024 * 1024) {
      setFout(`Die lêer is te groot. Die maksimum is ${MAX_MB} MB.`);
      return;
    }

    setBesig(true);
    const supabase = createClient();
    const pad = `${datum}-${Math.random().toString(36).slice(2, 8)}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("koerant")
      .upload(pad, leer, { contentType: "application/pdf" });

    if (uploadError) {
      setFout("Kon nie die lêer oplaai nie. Probeer asseblief weer.");
      setBesig(false);
      return;
    }

    const { error: dbError } = await supabase
      .from("editions")
      .insert({ edition_date: datum, file_path: pad });

    if (dbError) {
      // Clean up the file so we don't leave an orphan behind
      await supabase.storage.from("koerant").remove([pad]);
      setFout("Kon nie die uitgawe stoor nie. Probeer asseblief weer.");
      setBesig(false);
      return;
    }

    setSukses("Uitgawe suksesvol opgelaai.");
    setLeer(null);
    setInputKey((k) => k + 1);
    setBesig(false);
    router.refresh();
  }

  async function handleDelete(uitgawe: Edition) {
    const seker = window.confirm(
      `Verwyder die uitgawe van ${formatDate(uitgawe.edition_date)}? Dit kan nie ongedaan gemaak word nie.`
    );
    if (!seker) return;

    setFout("");
    setSukses("");
    setVerwyder(uitgawe.id);
    const supabase = createClient();

    const { error } = await supabase
      .from("editions")
      .delete()
      .eq("id", uitgawe.id);

    if (error) {
      setFout("Kon nie die uitgawe verwyder nie. Probeer asseblief weer.");
      setVerwyder(null);
      return;
    }

    await supabase.storage.from("koerant").remove([uitgawe.file_path]);
    setVerwyder(null);
    setSukses("Uitgawe verwyder.");
    router.refresh();
  }

  function publicUrl(path: string) {
    const supabase = createClient();
    return supabase.storage.from("koerant").getPublicUrl(path).data.publicUrl;
  }

  return (
    <div className="space-y-10">
      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="space-y-5 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card"
      >
        <h2 className="font-display text-xl font-bold text-veld-cream">
          Laai nuwe uitgawe op
        </h2>

        <div>
          <label
            htmlFor="datum"
            className="block text-sm font-medium text-veld-cream"
          >
            Datum van uitgawe
          </label>
          <input
            id="datum"
            type="date"
            required
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream [color-scheme:dark] focus:border-veld-amber/50"
          />
        </div>

        <div>
          <label
            htmlFor="leer"
            className="block text-sm font-medium text-veld-cream"
          >
            PDF-lêer
          </label>
          <input
            key={inputKey}
            id="leer"
            type="file"
            accept="application/pdf"
            required
            onChange={(e) => setLeer(e.target.files?.[0] ?? null)}
            className="mt-1.5 block w-full text-sm text-veld-muted file:mr-4 file:rounded-full file:border-0 file:bg-veld-amber/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-veld-amber2"
          />
          <p className="mt-1.5 text-xs text-veld-muted/70">
            Maksimum {MAX_MB} MB per lêer.
          </p>
        </div>

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
          className="w-full rounded-full bg-veld-glow px-6 py-3 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
        >
          {besig ? "Besig om op te laai..." : "Laai Op"}
        </button>
      </form>

      {/* Existing editions */}
      <div>
        <h2 className="font-display text-xl font-bold text-veld-cream">
          Alle uitgawes ({editions.length})
        </h2>

        {editions.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 text-sm text-veld-muted">
            Nog geen uitgawes nie. Laai die eerste een hierbo op.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-veld-charcoal2">
            {editions.map((uitgawe) => (
              <li
                key={uitgawe.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <span className="text-sm font-medium text-veld-cream">
                  {formatDate(uitgawe.edition_date)}
                </span>
                <span className="flex items-center gap-3">
                  <a
                    href={publicUrl(uitgawe.file_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-medium text-veld-muted transition-colors hover:text-veld-cream"
                  >
                    Bekyk
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(uitgawe)}
                    disabled={verwyder === uitgawe.id}
                    className="rounded-full border border-red-400/30 px-4 py-1.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-60"
                  >
                    {verwyder === uitgawe.id ? "Besig..." : "Verwyder"}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}