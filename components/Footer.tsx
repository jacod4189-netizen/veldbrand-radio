import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/get-settings";
import { telHref } from "@/lib/settings";

export default async function Footer() {
  const s = await getSettings();

  const socials = [
    { label: "Facebook", href: s.social_facebook },
    { label: "Instagram", href: s.social_instagram },
    { label: "YouTube", href: s.social_youtube },
  ].filter((x) => x.href);

  return (
    <footer className="relative border-t border-white/5 bg-veld-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              aria-label="Veldbrand Radio – terug na die tuisblad"
              className="-my-3 inline-block"
            >
              <Image
                src="/logo-wide.jpg"
                alt="Veldbrand Radio"
                width={1170}
                height={482}
                className="h-auto w-44 mix-blend-screen"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-veld-muted">
              {s.station_message}
            </p>
            {socials.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map((x) => (
                  <li key={x.label}>
                    <a
                      href={x.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-veld-muted transition-colors hover:border-veld-amber/40 hover:text-veld-amber"
                    >
                      {x.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-veld-cream">
              Kortpaaie
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/programmering"
                  className="text-veld-muted transition-colors hover:text-veld-amber"
                >
                  Programskedule
                </Link>
              </li>
              <li>
                <Link
                  href="/oor-ons"
                  className="text-veld-muted transition-colors hover:text-veld-amber"
                >
                  Oor Ons
                </Link>
              </li>
              <li>
                <Link
                  href="/#player"
                  className="text-veld-muted transition-colors hover:text-veld-amber"
                >
                  Luister Regstreeks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-veld-cream">
              Kontak
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-veld-muted">
              <li>
                <a
                  href={`mailto:${s.contact_email}`}
                  className="break-all transition-colors hover:text-veld-amber"
                >
                  {s.contact_email}
                </a>
              </li>
              <li>
                <a
                  href={telHref(s.contact_phone)}
                  className="transition-colors hover:text-veld-amber"
                >
                  {s.contact_phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-veld-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Veldbrand Radio. Alle regte
            voorbehou.
          </p>
          <p>Trots Suid-Afrikaans.</p>
        </div>
      </div>
    </footer>
  );
}