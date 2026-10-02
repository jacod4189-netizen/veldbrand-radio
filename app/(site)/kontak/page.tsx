import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/get-settings";
import { telHref } from "@/lib/settings";

export default async function KontakPage() {
  const s = await getSettings();

  return (
    <div className="relative bg-veld-black">
      <div className="pointer-events-none absolute inset-0 bg-veld-radial" />

      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-veld-amber/30 bg-veld-amber/10 px-4 py-1.5 text-xs font-medium tracking-wide text-veld-amber2">
            Kontak Ons
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-veld-cream sm:text-5xl">
            Kom Ons Gesels
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-balance text-veld-muted">
            Het jy 'n vraag of voorstel? Stuur vir ons 'n boodskap.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${s.contact_email}`}
            className="rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card transition-colors hover:border-veld-amber/30"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-veld-muted">
              E-pos
            </p>
            <p className="mt-2 break-all font-display text-lg font-semibold text-veld-cream">
              {s.contact_email}
            </p>
          </a>
          <a
            href={telHref(s.contact_phone)}
            className="rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card transition-colors hover:border-veld-amber/30"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-veld-muted">
              Telefoon
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-veld-cream">
              {s.contact_phone}
            </p>
          </a>
        </div>

        <ContactForm email={s.contact_email} />
      </div>
    </div>
  );
}