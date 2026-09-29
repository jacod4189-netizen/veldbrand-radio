import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_SETTINGS,
  SETTING_KEYS,
  type SettingKey,
  type SiteSettings,
} from "@/lib/settings";

export async function getSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");

  const result: SiteSettings = { ...DEFAULT_SETTINGS };
  for (const row of data ?? []) {
    if ((SETTING_KEYS as readonly string[]).includes(row.key) && row.value) {
      result[row.key as SettingKey] = row.value;
    }
  }
  return result;
}