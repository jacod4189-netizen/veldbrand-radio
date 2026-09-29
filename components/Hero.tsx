import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-veld-black">
      <div className="pointer-events-none absolute inset-0 bg-veld-radial" />
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-veld-amber/20 blur-[100px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-veld-amber/30 bg-veld-amber/10 px-4 py-1.5 text-xs font-medium tracking-wide text-veld-amber2">
          <LiveDot />
          Nou Regstreeks
        </span>

        <h1 className="-my-4 mt-2 w-full max-w-[560px] sm:-my-8">
          <span className="sr-only">Veldbrand Radio</span>
          <Image
            src="/logo-wide.jpg"
            alt=""
            aria-hidden="true"
            width={1170}
            height={482}
            priority
            className="h-auto w-full mix-blend-screen"
          />
        </h1>

        <p className="mt-5 max-w-xl text-lg text-veld-muted sm:text-xl">
          <span className="block font-semibold text-veld-cream">Dis mos radio.</span>
        </p>

        <p className="mt-3 max-w-lg text-balance text-sm text-veld-muted/80 sm:text-base">
          Luister regstreeks, ontdek ons programme en bly deel van die Veldbrand-gemeenskap.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="#player"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-veld-glow px-7 py-3.5 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98] sm:text-base"
          >
            <PlayIcon />
            Luister regstreeks
          </Link>
          <Link
            href="/programmering"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-veld-cream backdrop-blur transition-colors hover:border-veld-amber/40 hover:bg-white/10 sm:text-base"
          >
            Sien programskedule
          </Link>
        </div>

        <div aria-hidden="true" className="mt-16 flex h-10 items-end gap-1.5 opacity-70">
          {["animate-wave1", "animate-wave2", "animate-wave3", "animate-wave4", "animate-wave2", "animate-wave1", "animate-wave3"].map(
            (anim, i) => (
              <span
                key={i}
                className={`w-1.5 origin-bottom rounded-full bg-gradient-to-t from-veld-orange to-veld-amber2 motion-reduce:animate-none ${anim}`}
                style={{ height: "28px" }}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-veld-amber opacity-75 motion-reduce:animate-none" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-veld-amber" />
    </span>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}