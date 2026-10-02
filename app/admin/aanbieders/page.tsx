import { createClient } from "@/lib/supabase/server";
import HostsManager from "@/components/admin/HostsManager";

export default async function AdminHostsPage() {
  const supabase = await createClient();

  const { data: hosts } = await supabase
    .from("hosts")
    .select("id, name, role, bio, photo_url, sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-veld-cream">
        Omroepers
      </h1>
      <p className="mt-1 text-sm text-veld-muted">
        Voeg Omroepers by, wysig hulle besonderhede of verwyder hulle.
      </p>
      <div className="mt-8">
        <HostsManager hosts={hosts ?? []} />
      </div>
    </div>
  );
}