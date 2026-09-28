import { createClient } from "@/lib/supabase/server";

const WAARDES = [
  {
    title: "Plaaslik",
    desc: "Ons vertel die stories van ons mense en ons dorpe, elke dag.",
  },
  {
    title: "Musiek",
    desc: "Van boeremusiek tot hedendaagse treffers — altyd Afrikaans in die hart.",
  },
  {
    title: "Gemeenskap",
    desc: "Veldbrand is meer as 'n stasie — dit is 'n plek waar luisteraars saam behoort.",
  },
];

export default async function OorOnsPage() {
  const supabase = await createClient();
  const { data: hosts } = await supabase
    .from("hosts")
    .select("id, name, role, bio, photo_url")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

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

        {hosts && hosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-center font-display text-2xl font-bold text-veld-cream sm:text-3xl">
              Ontmoet Ons Aanbieders
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {hosts.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-veld-charcoal2 p-5"
                >
                  {h.photo_url ? (
                    <img
                      src={h.photo_url}
                      alt=""
                      className="h-14 w-14 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-veld-glow font-display text-xl font-bold text-veld-black"
                    >
                      {h.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-semibold text-veld-cream">
                      {h.name}
                    </p>
                    {h.role && (
                      <p className="text-sm text-veld-muted">{h.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}