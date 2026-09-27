export type Edition = {
  id: string;
  date: string;
  fileName: string;
};

// Demo data only. Once the admin panel exists, this list (and the actual
// PDF files) will be generated dynamically from storage instead of
// hardcoded here — every edition currently points at the same placeholder
// file so the download flow can be tested end-to-end.
const PLACEHOLDER_FILE = "/koerant/veldbrand-koerant-nuutste.pdf";

export const editions: Edition[] = [
  { id: "2026-09-27", date: "27 September 2026", fileName: PLACEHOLDER_FILE },
  { id: "2026-09-20", date: "20 September 2026", fileName: PLACEHOLDER_FILE },
  { id: "2026-09-13", date: "13 September 2026", fileName: PLACEHOLDER_FILE },
  { id: "2026-09-06", date: "6 September 2026", fileName: PLACEHOLDER_FILE },
  { id: "2026-08-30", date: "30 Augustus 2026", fileName: PLACEHOLDER_FILE },
  { id: "2026-08-23", date: "23 Augustus 2026", fileName: PLACEHOLDER_FILE },
];