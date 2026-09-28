import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/dates";

type Edition = {
  id: string;
  edition_date: string;
  file_path: string;
};

export default async function KoerantPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("editions")
    .select("id, edition_date, file_path")
    .order("edition_date", { ascending: false });

  const editions: Edition[] = data ?? [];
  const [nuutste, ...argief] = editions;

  // The download option makes the browser save the file
  // instead of opening it in a tab.
  function downloadUrl(e: Edition) {
    return supabase.storage
      .from("koerant")
      .getPublicUrl(e.file_path, {
        download: `Veldbrand-Koerant-${e.edition_date}.pdf`,
      }).data.publicUrl;
  }

  // Group older editions by year, newest year first
  const perJaar = new Map<string, Edition[]>();
  for (const uitgawe of argief) {
    const jaar = uitgawe.edition_date.slice(0, 4);
    perJaar.set(jaar, [...(perJaar.get(jaar) ?? []), uitgawe]);
  }

  return (
    <div className="relative bg-veld-black">
      <div className="pointer-events-none absolute inset-0 bg-veld-radial" />

      <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-veld-amber/30 bg-veld-amber/10 px-4 py-1.5 text-xs font-medium tracking-wide text-veld-amber2">
            Weeklikse Koerant
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-veld-cream sm:text-5xl">
            Veldbrand Koerant
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-balance text-veld-muted">
            Al ons nuus, stories en programhoogtepunte, elke week in een PDF
            saamgevat &mdash; gratis om af te laai.
          </p>
        </div>

        {!nuutste ? (
          <p className="mt-10 rounded-2xl border border-white/8 bg-veld-charcoal2 p-8 text-center text-veld-muted">
            Daar is nog geen uitgawes beskikbaar nie. Kom kuier gou weer terug.
          </p>
        ) : (
          <>
            {/* Latest edition */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/8 bg-veld-charcoal2 shadow-card">
              <div className="flex items-center justify-between border-b border-white/8 bg-veld-glow px-6 py-4">
                <span className="font-display text-sm font-bold text-veld-black">
                  Jongste Uitgawe
                </span>
                <span className="text-xs font-semibold text-veld-black/80">
                  {formatDate(nuutste.edition_date)}
                </span>
              </div>

              <div className="flex flex-col items-center gap-5 p-8 text-center">
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-xl bg-veld-orange/15 text-veld-orange"
                >
                  <PdfIcon />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-veld-cream">
                    Veldbrand Koerant &mdash; {formatDate(nuutste.edition_date)}
                  </p>
                  <p className="mt-1 text-sm text-veld-muted">PDF-dokument</p>
                </div>

                <a
                  href={downloadUrl(nuutste)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-veld-glow px-7 py-3.5 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98] sm:text-base"
                >
                  <DownloadIcon />
                  Laai Koerant Af
                </a>
                <p className="text-xs text-veld-muted/70">
                  Word direk na jou toestel afgelaai &mdash; geen aanmelding
                  nodig nie.
                </p>
              </div>
            </div>

            {/* Archive, grouped by year */}
            {argief.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-bold text-veld-cream">
                  Vorige Uitgawes
                </h2>

                <div className="mt-4 space-y-3">
                  {Array.from(perJaar.entries()).map(([jaar, lys], index) => (
                    <details
                      key={jaar}
                      open={index === 0}
                      className="group overflow-hidden rounded-2xl border border-white/8 bg-veld-charcoal2"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-display font-semibold text-veld-cream [&::-webkit-details-marker]:hidden">
                        <span>
                          {jaar}{" "}
                          <span className="text-sm font-normal text-veld-muted">
                            ({lys.length})
                          </span>
                        </span>
                        <ChevronIcon />
                      </summary>

                      <ul className="divide-y divide-white/8 border-t border-white/8">
                        {lys.map((uitgawe) => (
                          <li key={uitgawe.id}>
                            <a
                              href={downloadUrl(uitgawe)}
                              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/5"
                            >
                              <span className="flex items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-veld-orange/15 text-veld-orange"
                                >
                                  <PdfIcon small />
                                </span>
                                <span className="text-sm font-medium text-veld-cream">
                                  {formatDate(uitgawe.edition_date)}
                                </span>
                              </span>
                              <DownloadIcon />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PdfIcon({ small }: { small?: boolean }) {
  const size = small ? 18 : 28;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12m0 0-4-4m4 4 4-4" />
      <path d="M4 19h16" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-veld-muted transition-transform group-open:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}