import { editions } from "@/lib/koerant-data";

export default function KoerantPage() {
  const [nuutste, ...argief] = editions;

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

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/8 bg-veld-charcoal2 shadow-card">
          <div className="flex items-center justify-between border-b border-white/8 bg-veld-glow px-6 py-4">
            <span className="font-display text-sm font-bold text-veld-black">
              Jongste Uitgawe
            </span>
            <span className="text-xs font-semibold text-veld-black/80">
              {nuutste.date}
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
                Veldbrand Koerant &mdash; {nuutste.date}
              </p>
              <p className="mt-1 text-sm text-veld-muted">PDF-dokument</p>
            </div>

            <a
              href={nuutste.fileName}
              download
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

        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-veld-cream">
            Vorige Uitgawes
          </h2>
          <ul className="mt-4 divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-veld-charcoal2">
            {argief.map((uitgawe) => (
              <li key={uitgawe.id}>
                <a
                  href={uitgawe.fileName}
                  download
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
                      Veldbrand Koerant &mdash; {uitgawe.date}
                    </span>
                  </span>
                  <DownloadIcon />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm text-veld-muted">
            Ons volledige argief bevat honderde vorige uitgawes.
          </p>
        </div>
      </div>
    </div>
  );
}

function PdfIcon({ small }: { small?: boolean }) {
  const size = small ? 18 : 28;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0-4-4m4 4 4-4" />
      <path d="M4 19h16" />
    </svg>
  );
}