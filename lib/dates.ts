const MAANDE = [
  "Januarie",
  "Februarie",
  "Maart",
  "April",
  "Mei",
  "Junie",
  "Julie",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// Takes "2026-09-28" and returns "28 September 2026"
export function formatDate(iso: string) {
  const [jaar, maand, dag] = iso.split("-").map(Number);
  if (!jaar || !maand || !dag) return iso;
  return `${dag} ${MAANDE[maand - 1]} ${jaar}`;
}