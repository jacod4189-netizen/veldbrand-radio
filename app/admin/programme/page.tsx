import { createClient } from "@/lib/supabase/server";
import ProgramsManager from "@/components/admin/ProgramsManager";

export default async function AdminProgramsPage() {
  const supabase = await createClient();

  const [{ data: programs }, { data: hosts }] = await Promise.all([
    supabase
      .from("programs")
      .select(
        "id, title, description, tag, host_id, days, start_time, end_time, active"
      )
      .order("start_time", { ascending: true }),
    supabase.from("hosts").select("id, name").order("name", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-veld-cream">
        Programme
      </h1>
      <p className="mt-1 text-sm text-veld-muted">
        Voeg programme by, kies die dae waarop hulle speel, en wysig of
        verwyder hulle.
      </p>
      <div className="mt-8">
        <ProgramsManager programs={programs ?? []} hosts={hosts ?? []} />
      </div>
    </div>
  );
}