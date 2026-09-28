import { createClient } from "@/lib/supabase/server";
import KoerantManager from "@/components/admin/KoerantManager";

export default async function AdminKoerantPage() {
  const supabase = await createClient();

  const { data: editions } = await supabase
    .from("editions")
    .select("id, edition_date, file_path")
    .order("edition_date", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-veld-cream">
        Koerant
      </h1>
      <p className="mt-1 text-sm text-veld-muted">
        Laai nuwe weeklikse uitgawes op of verwyder ou een.
      </p>
      <div className="mt-8">
        <KoerantManager editions={editions ?? []} />
      </div>
    </div>
  );
}