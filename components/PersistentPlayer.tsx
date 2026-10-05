"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STREAM_URL =
  "https://sv2.famcast.co.za/AudioPlayer/veldbrand-radio?mount=";

export default function PersistentPlayer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The iframe only mounts after the first open, then stays mounted
  // for the whole visit so the stream never restarts.
  const [loaded, setLoaded] = useState(false);

  const openPlayer = useCallback(() => {
    setLoaded(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    // Any link to #player (header, hero, home section) opens the dock
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (href !== "#player" && href !== "/#player") return;
      e.preventDefault();
      e.stopPropagation();
      openPlayer();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("veldbrand:open-player", openPlayer);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("veldbrand:open-player", openPlayer);
    };
  }, [openPlayer]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Keeps the footer clear of the fixed bar */}
      <div aria-hidden="true" className="h-16" />

      <aside
        aria-label="Veldbrand Radio speler"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-veld-black/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      >
        <div
          id="live-player-panel"
          className={`mx-auto w-full max-w-3xl overflow-hidden px-2 transition-[max-height] duration-300 motion-reduce:transition-none sm:px-4 ${
            open ? "max-h-[400px] pt-2" : "invisible max-h-0"
          }`}
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-veld-charcoal2">
            {loaded && (
              <iframe
                width="100%"
                height="330"
                src={STREAM_URL}
                style={{ border: 0, display: "block" }}
                title="Luister regstreeks na Veldbrand Radio"
                allow="autoplay"
              />
            )}
          </div>
        </div>

        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-veld-amber opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-veld-amber" />
            </span>
            <span className="truncate text-sm font-medium text-veld-cream">
              Veldbrand Radio
            </span>
            <span className="hidden text-xs text-veld-muted sm:inline">
              Regstreeks
            </span>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="live-player-panel"
            onClick={() => (open ? setOpen(false) : openPlayer())}
            className="inline-flex items-center gap-2 rounded-full bg-veld-glow px-4 py-2 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-veld-amber motion-reduce:transition-none"
          >
            {open ? "Maak toe" : "Maak speler oop"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform motion-reduce:transition-none ${
                open ? "rotate-180" : ""
              }`}
            >
              <path d="M6 15l6-6 6 6" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}