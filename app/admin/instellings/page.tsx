import { getSettings } from "@/lib/get-settings";
import SettingsManager from "@/components/admin/SettingsManager";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-veld-cream">
        Instellings
      </h1>
      <p className="mt-1 text-sm text-veld-muted">
        Verander kontakbesonderhede, sosiale media-skakels en die Oor Ons-teks.
      </p>
      <div className="mt-8">
        <SettingsManager initial={settings} />
      </div>
    </div>
  );
}