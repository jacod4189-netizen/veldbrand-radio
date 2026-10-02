import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-veld-black">
      <style>{`
        .dis-mos {
          background-image: linear-gradient(
            100deg,
            #f59e0b 0%,
            #ea580c 30%,
            #fff1d6 50%,
            #ea580c 70%,
            #f59e0b 100%
          );
          background-size: 250% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation:
            dis-mos-sweep 4.5s ease-in-out infinite,
            dis-mos-glow 3s ease-in-out infinite;
        }
        @keyframes dis-mos-sweep {
          0%, 15% { background-position: 100% 0; }
          70%, 100% { background-position: 0% 0; }
        }
        @keyframes dis-mos-glow {
          0%, 100% { filter: drop-shadow(0 0 14px rgba(245, 158, 11, 0.25)); }
          50% { filter: drop-shadow(0 0 30px rgba(245, 158, 11, 0.55)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dis-mos {
            animation: none;
            background-position: 30% 0;
            filter: drop-shadow(0 0 24px rgba(245, 158, 11, 0.35));
          }
        }
      `}</style>

      {/* Wallpaper */}
      <Image
        src="/hero.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        quality={75}
        className="pointer-events-none object-cover object-center"
      />

      {/* Black fade over the wallpaper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/50"
      />
      {/* Extra fade at the bottom so the hero blends into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-veld-black to-transparent"
      />

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

        <p className="mt-2 flex items-center justify-center gap-5 sm:mt-4">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-veld-amber/70 sm:block"
          />
          <span className="dis-mos font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Dis mos radio.
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-veld-amber/70 sm:block"
          />
        </p>

        <p className="mt-5 max-w-lg text-balance text-sm text-veld-muted sm:text-base">
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