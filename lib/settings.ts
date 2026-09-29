export const SETTING_KEYS = [
  "contact_email",
  "contact_phone",
  "social_facebook",
  "social_instagram",
  "social_youtube",
  "about_heading",
  "about_intro",
  "station_message",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];
export type SiteSettings = Record<SettingKey, string>;

export const DEFAULT_SETTINGS: SiteSettings = {
  contact_email: "v2radio@veldbrandradio.co.za",
  contact_phone: "079 319 5552",
  social_facebook: "",
  social_instagram: "",
  social_youtube: "",
  about_heading: "'n Vuur Wat Ons Almal Saambind",
  about_intro:
    "Veldbrand Radio het ontstaan uit 'n eenvoudige gedagte: Afrikaanse luisteraars verdien 'n stasie wat na hulle klink, hulle stories vertel en hulle musiek eer. Vandag bring ons daagliks warmte, musiek en gemeenskap na huise regoor Suid-Afrika.",
  station_message: "Die musiek waarna jy heeltyd wil luister.",
};

// "079 319 5552" becomes "tel:+27793195552"
export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  const intl = digits.startsWith("0") ? `27${digits.slice(1)}` : digits;
  return `tel:+${intl}`;
}