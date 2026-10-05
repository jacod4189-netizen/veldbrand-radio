export default function Player() {
  return (
    <section
      id="player"
      aria-labelledby="player-heading"
      className="relative scroll-mt-20 bg-veld-charcoal py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-veld-amber/30 bg-veld-amber/10 px-4 py-1.5 text-xs font-medium tracking-wide text-veld-amber2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-veld-amber opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-veld-amber" />
            </span>
            Regstreekse Uitsending
          </span>
          <h2
            id="player-heading"
            className="mt-4 font-display text-3xl font-bold text-veld-cream sm:text-4xl"
          >
            Luister Regstreeks
          </h2>
          <p className="mt-3 text-sm text-veld-muted sm:text-base">
            Druk speel om na Veldbrand Radio te luister. Geen outomatiese
            speel nie &mdash; jy is in beheer.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-veld-charcoal2 p-8 text-center shadow-card sm:p-10">
          <p className="text-sm text-veld-muted sm:text-base">
            Die speler bly onderaan jou skerm, selfs wanneer jy na ander
            bladsye gaan.
          </p>
          <a
            href="#player"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-veld-glow px-6 py-3 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-veld-amber motion-reduce:transition-none"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Maak die speler oop
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-veld-muted/70">
          Kry jy nie klank nie? Maak seker jou toestel se volume is aan, of
          probeer &rsquo;n ander blaaier.
        </p>
      </div>
    </section>
  );
}