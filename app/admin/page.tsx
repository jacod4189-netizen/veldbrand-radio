import { createClient } from "@/lib/supabase/server";

async function count(table: string) {
  const supabase = await createClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [programme, aanbieders] = await Promise.all([
    count("programs"),
    count("hosts"),
  ]);

  const stats = [
    { label: "Programme", value: programme },
    { label: "Omroepers", value: aanbieders },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-veld-cream">
        Welkom
      </h1>
      <p className="mt-1 text-sm text-veld-muted">
        Aangemeld as {user?.email}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-veld-muted">
              {s.label}
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-veld-amber2">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}