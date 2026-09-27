import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-veld-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-veld-cream">
              <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-veld-glow" />
              Veldbrand <span className="text-veld-amber">Radio</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-veld-muted">
              Die musiek waarna jy heeltyd wil luister. Jou Afrikaanse stasie in beeld en klank.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-veld-cream">Kortpaaie</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/programmering" className="text-veld-muted transition-colors hover:text-veld-amber">
                  Programskedule
                </Link>
              </li>
              <li>
                <Link href="/oor-ons" className="text-veld-muted transition-colors hover:text-veld-amber">
                  Oor Ons
                </Link>
              </li>
              <li>
                <Link href="/#player" className="text-veld-muted transition-colors hover:text-veld-amber">
                  Luister Regstreeks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-veld-cream">Kontak</h3>
            <ul className="mt-3 space-y-2 text-sm text-veld-muted">
              <li>
                <a href="mailto:v2radio@veldbrandradio.co.za" className="transition-colors hover:text-veld-amber">
                  v2radio@veldbrandradio.co.za
                </a>
              </li>
              <li>
                <a href="tel:+27793195552" className="transition-colors hover:text-veld-amber">
                  079 319 5552
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-veld-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Veldbrand Radio. Alle regte voorbehou.</p>
          <p>Trots Suid-Afrikaans.</p>
        </div>
      </div>
    </footer>
  );
}