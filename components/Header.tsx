"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Tuis" },
  { href: "/programmering", label: "Programme" },
  { href: "/koerant", label: "Koerant" },
  { href: "/oor-ons", label: "Oor Ons" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-veld-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-veld-cream"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-veld-glow shadow-glow"
          />
          Veldbrand <span className="text-veld-amber">Radio</span>
        </Link>

        <nav aria-label="Hoofnavigasie" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-veld-muted transition-colors hover:text-veld-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/#player"
            className="inline-flex items-center gap-2 rounded-full bg-veld-glow px-5 py-2.5 text-sm font-semibold text-veld-black shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <PlayIcon />
            Luister nou
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-veld-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Maak kieslys toe" : "Maak kieslys oop"}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/5 bg-veld-black transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav aria-label="Mobiele navigasie" className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-veld-muted transition-colors hover:bg-white/5 hover:text-veld-cream"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#player"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-veld-glow px-5 py-2.5 text-sm font-semibold text-veld-black"
          >
            <PlayIcon />
            Luister nou
          </Link>
        </nav>
      </div>
    </header>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}