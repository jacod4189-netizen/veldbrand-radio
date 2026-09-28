"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type HostOption = { id: string; name: string };

type Program = {
  id: string;
  title: string;
  description: string | null;
  tag: string | null;
  host_id: string | null;
  days: number[];
  start_time: string;
  end_time: string;
  active: boolean | null;
};

const DAE = [
  { n: 1, k: "Ma" },
  { n: 2, k: "Di" },
  { n: 3, k: "Wo" },
  { n: 4, k: "Do" },
  { n: 5, k: "Vr" },
  { n: 6, k: "Sa" },
  { n: 7, k: "So" },
];

const TAGS = [
  "Oggendshow",
  "Musiek",
  "Gesels",
  "Aandprogram",
  "Naweek",
  "Boeremusiek",
  "Geloof",
  "Nostalgie",
];

function daysLabel(days: number[]) {
  const d = [...days].sort((a, b) => a - b).join(",");
  if (d === "1,2,3,4,5,6,7") return "Elke dag";
  if (d === "1,2,3,4,5") return "Ma – Vr";
  if (d === "6,7") return "Sa – So";
  return [...days]
    .sort((a, b) => a - b)
    .map((n) => DAE[n - 1].k)
    .join(", ");
}

const short = (t: string) => t.slice(0, 5);

export default function ProgramsManager({
  programs,
  hosts,
}: {
  programs: Program[];
  hosts: HostOption[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Program | null>(null);
  const [titel, setTitel] = useState("");
  const [beskrywing, setBeskrywing] = useState("");
  const [tag, setTag] = useState("");
  const [hostId, setHostId] = useState("");
  const [dae, setDae] = useState<number[]>([]);
  const [begin, setBegin] = useState("06:00");
  const [einde, setEinde] = useState("09:00");
  const [aktief, setAktief] = useState(true);
  const [besig, setBesig] = useState(false);
  const [verwyder, setVerwyder] = useState<string | null>(null);
  const [fout, setFout] = useState("");
  const [sukses, setSukses] = useState("");

  const hostName = (id: string | null) =>
    hosts.find((h) => h.id === id)?.name ?? null;

  function resetForm() {
    setEditing(null);
    setTitel("");
    setBeskrywing("");
    setTag("");
    setHostId("");
    setDae([]);
    setBegin("06:00");
    setEinde("09:00");
    setAktief(true);
  }

  function startEdit(p: Program) {
    setEditing(p);
    setTitel(p.title);
    setBeskrywing(p.description ?? "");
    setTag(p.tag ?? "");
    setHostId(p.host_id ?? "");
    setDae(p.days);
    setBegin(short(p.start_time));
    setEinde(short(p.end_time));
    setAktief(p.active !== false);
    setFout("");
    setSukses("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleDay(n: number) {
    setDae((d) => (d.includes(n) ? d.filter((x) => x !== n) : [...d, n]));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFout("");
    setSukses("");

    if (dae.length === 0) {
      setFout("Kies asseblief ten minste een dag.");
      return;
    }

    setBesig(true);
    const supabase = createClient();

    const record = {
      title: titel.trim(),
      description: beskrywing.trim() || null,
      tag: tag.trim() || null,
      host_id: hostId || null,
      days: [...dae].sort((a, b) => a - b),
      start_time: begin,
      end_time: einde,
      active: aktief,
    };

    const { error } = editing
      ? await supabase.from("programs").update(record).eq("id", editing.id)
      : await supabase.from("programs").insert(record);

    if (error) {
      setFout("Kon nie stoor nie. Probeer asseblief weer.");
      setBesig(false);
      return;
    }

    setSukses(editing ? "Program opgedateer." : "Program bygevoeg.");
    resetForm();
    setBesig(false);
    router.refresh();
  }

  async function handleDelete(p: Program) {
    const seker = window.confirm(
      `Verwyder "${p.title}"? Dit kan nie ongedaan gemaak word nie.`
    );
    if (!seker) return;

    setFout("");
    setSukses("");
    setVerwyder(p.id);
    const supabase = createClient();

    const { error } = await supabase.from("programs").delete().eq("id", p.id);
    if (error) {
      setFout("Kon nie verwyder nie. Probeer asseblief weer.");
      setVerwyder(null);
      return;
    }

    if (editing?.id === p.id) resetForm();
    setVerwyder(null);
    setSukses("Program verwyder.");
    router.refresh();
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream [color-scheme:dark] focus:border-veld-amber/50";

  return (
    <div className="space-y-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card"
      >
        <h2 className="font-display text-xl font-bold text-veld-cream">
          {editing ? `Wysig ${editing.title}` : "Voeg nuwe program by"}
        </h2>

        <div>
          <label htmlFor="titel" className="block text-sm font-medium text-veld-cream">
            Naam van program
          </label>
          <input
            id="titel"
            type="text"
            required
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
            placeholder="bv. Oggendvuur"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="host" className="block text-sm font-medium text-veld-cream">
            Aanbieder
          </label>
          <select
            id="host"
            value={hostId}
            onChange={(e) => setHostId(e.target.value)}
            className={inputClass}
          >
            <option value="">Geen aanbieder</option>
            {hosts.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
          {hosts.length === 0 && (
            <p className="mt-1.5 text-xs text-veld-muted/70">
              Voeg eers aanbieders by onder &quot;Aanbieders&quot;.
            </p>
          )}
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-veld-cream">
            Dae
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {DAE.map((d) => {
              const on = dae.includes(d.n);
              return (
                <button
                  key={d.n}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleDay(d.n)}
                  className={`h-10 w-12 rounded-full text-sm font-semibold transition-colors ${
                    on
                      ? "bg-veld-glow text-veld-black"
                      : "border border-white/10 bg-white/5 text-veld-muted"
                  }`}
                >
                  {d.k}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDae([1, 2, 3, 4, 5])}
              className="rounded-full border border-white/15 px-3 py-1 text-veld-muted hover:text-veld-cream"
            >
              Ma – Vr
            </button>
            <button
              type="button"
              onClick={() => setDae([6, 7])}
              className="rounded-full border border-white/15 px-3 py-1 text-veld-muted hover:text-veld-cream"
            >
              Sa – So
            </button>
            <button
              type="button"
              onClick={() => setDae([1, 2, 3, 4, 5, 6, 7])}
              className="rounded-full border border-white/15 px-3 py-1 text-veld-muted hover:text-veld-cream"
            >
              Elke dag
            </button>
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="begin" className="block text-sm font-medium text-veld-cream">
              Begin
            </label>
            <input
              id="begin"
              type="time"
              required
              value={begin}
              onChange={(e) => setBegin(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="einde" className="block text-sm font-medium text-veld-cream">
              Einde
            </label>
            <input
              id="einde"
              type="time"
              required
              value={einde}
              onChange={(e) => setEinde(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-veld-cream">
            Kategorie (opsioneel)
          </label>
          <input
            id="tag"
            type="text"
            list="tag-opsies"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="bv. Musiek"
            className={inputClass}
          />
          <datalist id="tag-opsies">
            {TAGS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="beskrywing" className="block text-sm font-medium text-veld-cream">
            Beskrywing (opsioneel)
          </label>
          <textarea
            id="beskrywing"
            rows={3}
            value={beskrywing}
            onChange={(e) => setBeskrywing(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-veld-cream">
          <input
            type="checkbox"
            checked={aktief}
            onChange={(e) => setAktief(e.target.checked)}
            className="h-5 w-5 accent-amber-500"
          />
          Wys op die webwerf
        </label>

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

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={besig}
            className="rounded-full bg-veld-glow px-6 py-3 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            {besig ? "Besig..." : editing ? "Stoor Veranderinge" : "Voeg By"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-veld-muted transition-colors hover:text-veld-cream"
            >
              Kanselleer
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="font-display text-xl font-bold text-veld-cream">
          Alle programme ({programs.length})
        </h2>

        {programs.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 text-sm text-veld-muted">
            Nog geen programme nie. Voeg die eerste een hierbo by.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-veld-charcoal2">
            {programs.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <span>
                  <span className="block text-sm font-semibold text-veld-cream">
                    {p.title}
                    {p.active === false && (
                      <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs font-normal text-veld-muted">
                        Versteek
                      </span>
                    )}
                  </span>
                  <span className="block text-xs text-veld-amber2">
                    {daysLabel(p.days)} · {short(p.start_time)} – {short(p.end_time)}
                  </span>
                  {hostName(p.host_id) && (
                    <span className="block text-xs text-veld-muted">
                      {hostName(p.host_id)}
                    </span>
                  )}
                </span>

                <span className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-medium text-veld-muted transition-colors hover:text-veld-cream"
                  >
                    Wysig
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p)}
                    disabled={verwyder === p.id}
                    className="rounded-full border border-red-400/30 px-4 py-1.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-60"
                  >
                    {verwyder === p.id ? "Besig..." : "Verwyder"}
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