import { createClient } from "@/lib/supabase/server";
import ProgrammeSchedule from "@/components/ProgrammeSchedule";

export default async function ProgrammeringPage() {
  const supabase = await createClient();

  const [{ data: programs }, { data: hosts }] = await Promise.all([
    supabase
      .from("programs")
      .select("id, title, description, tag, host_id, days, start_time, end_time")
      .eq("active", true)
      .order("start_time", { ascending: true }),
    supabase.from("hosts").select("id, name"),
  ]);

  const hostNames = new Map((hosts ?? []).map((h) => [h.id, h.name]));

  const items = (programs ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    tag: p.tag,
    host: p.host_id ? hostNames.get(p.host_id) ?? null : null,
    start: String(p.start_time).slice(0, 5),
    end: String(p.end_time).slice(0, 5),
    days: p.days as number[],
  }));

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
            Kies 'n dag om te sien watter programme regstreeks is — van
            vroegoggend tot laataand.
          </p>
        </div>

        <ProgrammeSchedule programs={items} />
      </div>
    </div>
  );
}