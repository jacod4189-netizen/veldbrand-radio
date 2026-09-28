"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Host = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  photo_url: string | null;
  sort_order: number | null;
};

const MAX_MB = 5;
const BUCKET = "media";

// Turns a public photo URL back into its storage path
function pathFromUrl(url: string | null) {
  if (!url) return null;
  const marker = `/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

export default function HostsManager({ hosts }: { hosts: Host[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Host | null>(null);
  const [naam, setNaam] = useState("");
  const [rol, setRol] = useState("");
  const [bio, setBio] = useState("");
  const [volgorde, setVolgorde] = useState("0");
  const [foto, setFoto] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [besig, setBesig] = useState(false);
  const [verwyder, setVerwyder] = useState<string | null>(null);
  const [fout, setFout] = useState("");
  const [sukses, setSukses] = useState("");

  function resetForm() {
    setEditing(null);
    setNaam("");
    setRol("");
    setBio("");
    setVolgorde("0");
    setFoto(null);
    setInputKey((k) => k + 1);
  }

  function startEdit(h: Host) {
    setEditing(h);
    setNaam(h.name);
    setRol(h.role ?? "");
    setBio(h.bio ?? "");
    setVolgorde(String(h.sort_order ?? 0));
    setFoto(null);
    setInputKey((k) => k + 1);
    setFout("");
    setSukses("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFout("");
    setSukses("");

    if (foto) {
      if (!foto.type.startsWith("image/")) {
        setFout("Kies asseblief 'n prent (JPG, PNG of WebP).");
        return;
      }
      if (foto.size > MAX_MB * 1024 * 1024) {
        setFout(`Die foto is te groot. Die maksimum is ${MAX_MB} MB.`);
        return;
      }
    }

    setBesig(true);
    const supabase = createClient();
    let photoUrl = editing?.photo_url ?? null;
    let newPath: string | null = null;

    if (foto) {
      const ext = (foto.name.split(".").pop() || "jpg").toLowerCase();
      newPath = `hosts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(newPath, foto, { contentType: foto.type });
      if (upErr) {
        setFout("Kon nie die foto oplaai nie. Probeer asseblief weer.");
        setBesig(false);
        return;
      }
      photoUrl = supabase.storage.from(BUCKET).getPublicUrl(newPath).data
        .publicUrl;
    }

    const record = {
      name: naam.trim(),
      role: rol.trim() || null,
      bio: bio.trim() || null,
      photo_url: photoUrl,
      sort_order: Number(volgorde) || 0,
    };

    const { error } = editing
      ? await supabase.from("hosts").update(record).eq("id", editing.id)
      : await supabase.from("hosts").insert(record);

    if (error) {
      if (newPath) await supabase.storage.from(BUCKET).remove([newPath]);
      setFout("Kon nie stoor nie. Probeer asseblief weer.");
      setBesig(false);
      return;
    }

    // Remove the replaced photo so old files don't pile up
    if (editing && newPath) {
      const oldPath = pathFromUrl(editing.photo_url);
      if (oldPath) await supabase.storage.from(BUCKET).remove([oldPath]);
    }

    setSukses(editing ? "Aanbieder opgedateer." : "Aanbieder bygevoeg.");
    resetForm();
    setBesig(false);
    router.refresh();
  }

  async function handleDelete(h: Host) {
    const seker = window.confirm(
      `Verwyder ${h.name}? Programme wat aan hierdie aanbieder gekoppel is, sal sonder 'n aanbieder wees.`
    );
    if (!seker) return;

    setFout("");
    setSukses("");
    setVerwyder(h.id);
    const supabase = createClient();

    const { error } = await supabase.from("hosts").delete().eq("id", h.id);
    if (error) {
      setFout("Kon nie verwyder nie. Probeer asseblief weer.");
      setVerwyder(null);
      return;
    }

    const path = pathFromUrl(h.photo_url);
    if (path) await supabase.storage.from(BUCKET).remove([path]);

    if (editing?.id === h.id) resetForm();
    setVerwyder(null);
    setSukses("Aanbieder verwyder.");
    router.refresh();
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-white/10 bg-veld-black px-4 py-2.5 text-veld-cream focus:border-veld-amber/50";

  return (
    <div className="space-y-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card"
      >
        <h2 className="font-display text-xl font-bold text-veld-cream">
          {editing ? `Wysig ${editing.name}` : "Voeg nuwe aanbieder by"}
        </h2>

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
            placeholder="bv. Pieter & Marisa"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="rol" className="block text-sm font-medium text-veld-cream">
            Rol (opsioneel)
          </label>
          <input
            id="rol"
            type="text"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            placeholder="bv. Oggendvuur-aanbieder"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-veld-cream">
            Kort beskrywing (opsioneel)
          </label>
          <textarea
            id="bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label htmlFor="volgorde" className="block text-sm font-medium text-veld-cream">
            Volgorde
          </label>
          <input
            id="volgorde"
            type="number"
            value={volgorde}
            onChange={(e) => setVolgorde(e.target.value)}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-veld-muted/70">
            Laer nommers wys eerste op die webwerf.
          </p>
        </div>

        <div>
          <label htmlFor="foto" className="block text-sm font-medium text-veld-cream">
            Foto (opsioneel)
          </label>
          {editing?.photo_url && !foto && (
            <img
              src={editing.photo_url}
              alt=""
              className="mt-2 h-20 w-20 rounded-full object-cover"
            />
          )}
          <input
            key={inputKey}
            id="foto"
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-sm text-veld-muted file:mr-4 file:rounded-full file:border-0 file:bg-veld-amber/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-veld-amber2"
          />
          <p className="mt-1.5 text-xs text-veld-muted/70">
            Maksimum {MAX_MB} MB.{" "}
            {editing ? "Los leeg om die huidige foto te behou." : ""}
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
          Alle aanbieders ({hosts.length})
        </h2>

        {hosts.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 text-sm text-veld-muted">
            Nog geen aanbieders nie. Voeg die eerste een hierbo by.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-veld-charcoal2">
            {hosts.map((h) => (
              <li
                key={h.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <span className="flex items-center gap-3">
                  {h.photo_url ? (
                    <img
                      src={h.photo_url}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-veld-glow font-display font-bold text-veld-black"
                    >
                      {h.name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-veld-cream">
                      {h.name}
                    </span>
                    {h.role && (
                      <span className="block text-xs text-veld-muted">
                        {h.role}
                      </span>
                    )}
                  </span>
                </span>

                <span className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => startEdit(h)}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-medium text-veld-muted transition-colors hover:text-veld-cream"
                  >
                    Wysig
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(h)}
                    disabled={verwyder === h.id}
                    className="rounded-full border border-red-400/30 px-4 py-1.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-60"
                  >
                    {verwyder === h.id ? "Besig..." : "Verwyder"}
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