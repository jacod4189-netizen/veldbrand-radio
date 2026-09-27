const WAARDES = [
  {
    title: "Plaaslik",
    desc: "Ons vertel die stories van ons mense en ons dorpe, elke dag.",
  },
  {
    title: "Musiek",
    desc: "Van boeremusiek tot hedendaagse treffers &mdash; altyd Afrikaans in die hart.",
  },
  {
    title: "Gemeenskap",
    desc: "Veldbrand is meer as 'n stasie &mdash; dit is 'n plek waar luisteraars saam behoort.",
  },
];

const SPAN = [
  { naam: "Pieter & Marisa", rol: "Oggendvuur" },
  { naam: "Elmarie Coetzee", rol: "Middagmelodie" },
  { naam: "Herman Smit", rol: "Kletskombuis" },
  { naam: "DJ Reinier", rol: "Skoftydmusiek" },
  { naam: "Chané & Willem", rol: "Ryvuur" },
  { naam: "Riaan Botha", rol: "Aandgloed" },
];

export default function OorOnsPage() {
  return (
    <div className="relative bg-veld-black">
      <div className="pointer-events-none absolute inset-0 bg-veld-radial" />

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-veld-amber/30 bg-veld-amber/10 px-4 py-1.5 text-xs font-medium tracking-wide text-veld-amber2">
            Oor Veldbrand Radio
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-veld-cream sm:text-5xl">
            'n Vuur Wat Ons Almal Saambind
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-veld-muted sm:text-lg">
            Veldbrand Radio het ontstaan uit 'n eenvoudige gedagte: Afrikaanse
            luisteraars verdien 'n stasie wat na hulle klink, hulle stories
            vertel en hulle musiek eer. Vandag bring ons daagliks warmte,
            musiek en gemeenskap na huise regoor Suid-Afrika.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {WAARDES.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-white/8 bg-veld-charcoal2 p-6 shadow-card"
            >
              <h2 className="font-display text-lg font-bold text-veld-amber2">
                {w.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-veld-muted">
                {w.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-veld-amber/20 bg-veld-amber/5 p-8 text-center">
          <p className="font-display text-2xl font-bold text-veld-cream sm:text-3xl">
            &ldquo;Die musiek waarna jy heeltyd wil luister.&rdquo;
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-center font-display text-2xl font-bold text-veld-cream sm:text-3xl">
            Ontmoet Ons Aanbieders
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {SPAN.map((persoon) => (
              <div
                key={persoon.naam}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-veld-charcoal2 p-5"
              >
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-veld-glow font-display text-lg font-bold text-veld-black"
                >
                  {persoon.naam.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold text-veld-cream">
                    {persoon.naam}
                  </p>
                  <p className="text-sm text-veld-muted">{persoon.rol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}