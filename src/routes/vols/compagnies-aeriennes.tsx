import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, Plane, ArrowRight, Globe, ExternalLink } from 'lucide-react';
import { getAirlineLogoUrl } from '@/lib/aviationstack';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHero } from '@/components/ui/page-hero';
import { useAirlines } from '@/lib/queries';
import type { Airline } from '@/types/database';

export const Route = createFileRoute('/vols/compagnies-aeriennes')({
  component: CompagniesLayout,
  head: () => ({
    meta: [
      { title: "Compagnies aériennes — Aéroport N'djili · FIH" },
      { name: 'description', content: "17 compagnies aériennes opèrent à FIH : Congo Airways, Ethiopian Airlines, Brussels Airlines, Air France et bien d'autres." },
    ],
  }),
});

const AIRLINE_BG: Record<string, string> = {
  '4H': '#CE1126', '8Z': '#003DA5',
  ET: '#1B4F72',   SN: '#003DA5',   AF: '#002395',
  KQ: '#006633',   QR: '#5C0632',   MS: '#6B0F1A',
  TK: '#E30A17',   HF: '#1A6B3C',   WB: '#00A86B',
  SA: '#1C2F4A',   RA: '#009A44',   DT: '#C8102E',
  '8U': '#008751',
};
const AIRLINE_WEBSITES: Record<string, string> = {
  '4H': 'https://www.aircongo.com',
  ET:  'https://www.ethiopianairlines.com',
  SN:  'https://www.brusselsairlines.com',
  AF:  'https://www.airfrance.fr',
  KQ:  'https://www.kenya-airways.com',
  QR:  'https://www.qatarairways.com',
  MS:  'https://www.egyptair.com',
  TK:  'https://www.turkishairlines.com',
  HF:  'https://flyasky.com',
  WB:  'https://www.rwandair.com',
  SA:  'https://www.flysaa.com',
  RA:  'https://www.royalairmaroc.com',
  DT:  'https://www.taag.ao',
  '8U':'https://www.afriqiyah.aero',
};
const getAirlineBg = (iata: string) => AIRLINE_BG[iata] ?? '#003DA5';
const getWebsite   = (a: Airline)   => a.website ?? AIRLINE_WEBSITES[a.iata_code] ?? null;

function CompagniesLayout() {
  const matches = useMatches();
  const isLeaf  = matches.at(-1)?.routeId === '/vols/compagnies-aeriennes';
  return isLeaf ? <CompagniesPage /> : <Outlet />;
}

function CompagniesPage() {
  const [search, setSearch] = useState('');
  const { data: airlines = [], isLoading } = useAirlines();

  const filtered = airlines.filter(
    (a) =>
      search === '' ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.iata_code.toLowerCase().includes(search.toLowerCase()),
  );
  const hub    = filtered.filter((a) => a.hub_at_fih);
  const others = filtered.filter((a) => !a.hub_at_fih);

  return (
    <main id="main-content">

      <PageHero
        eyebrow="Vols"
        title="Compagnies aériennes"
        subtitle="Découvrez les compagnies qui desservent FIH et leurs destinations depuis Kinshasa — Afrique, Europe, Moyen-Orient."
        image="/images/fih-tarmac.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Vols' },
          { label: 'Compagnies aériennes' },
        ]}
      />

      <div className="container py-10 md:py-14">

        {/* Recherche */}
        <div className="relative mb-10 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une compagnie ou code IATA…"
            className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rdc-blue"
          />
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
          </div>
        ) : (
          <>
            {/* Hub FIH — grandes cartes */}
            {hub.length > 0 && (
              <section className="mb-16">
                <div className="mb-3 flex items-center gap-3">
                  <div className="accent-line" />
                  <p className="eyebrow text-rdc-blue">Hub FIH</p>
                </div>
                <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">Basées à Kinshasa</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {hub.map((a) => <HubCard key={a.id} airline={a} />)}
                </div>
              </section>
            )}

            {/* International — grille compacte */}
            {others.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <div className="accent-line" />
                  <p className="eyebrow text-rdc-blue">Liaisons internationales</p>
                </div>
                <div className="mb-6 flex items-end justify-between">
                  <h2 className="font-display text-2xl font-bold text-rdc-anthracite">Compagnies internationales</h2>
                  <span className="text-sm text-muted-foreground">{others.length} compagnie{others.length > 1 ? 's' : ''}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {others.map((a) => <AirlineRow key={a.id} airline={a} />)}
                </div>
              </section>
            )}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Plane size={32} className="mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Aucune compagnie trouvée pour «&nbsp;{search}&nbsp;»</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

/* ── Shared logo with avs.io + styled fallback badge ─────────────────── */
function AirlineLogoImg({
  iata, name, bg, size, className,
}: { iata: string; name: string; bg: string; size: 'sm' | 'lg'; className?: string }) {
  const dim  = size === 'lg' ? 'h-16 w-16' : 'h-9 w-9';
  const text = size === 'lg' ? 'text-base' : 'text-[9px]';
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white ${className ?? ''}`}>
      <img
        src={getAirlineLogoUrl(iata)}
        alt={name}
        className={`${dim} object-contain p-1`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.nextSibling as HTMLElement | null;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      {/* Fallback badge : texte IATA blanc sur fond couleur compagnie */}
      <span
        className={`${text} absolute inset-0 hidden items-center justify-center font-black tracking-widest text-white`}
        style={{ backgroundColor: bg }}
      >
        {iata}
      </span>
    </div>
  );
}

function HubCard({ airline }: { airline: Airline }) {
  const bg      = getAirlineBg(airline.iata_code);
  const website = getWebsite(airline);
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Colour banner */}
      <div className="relative flex h-36 items-center justify-center" style={{ backgroundColor: bg }}>
        <AirlineLogoImg
          iata={airline.iata_code} name={airline.name} bg={bg} size="lg"
          className="h-20 w-20 rounded-full border-4 border-white/20"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
          Hub FIH
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="font-semibold text-rdc-anthracite">{airline.name}</p>
        <p className="mb-4 text-xs text-muted-foreground">
          {airline.iata_code}{airline.icao_code ? ` · ${airline.icao_code}` : ''}
        </p>

        {/* Action buttons */}
        <div className="mt-auto flex gap-2">
          <Link
            to={`/vols/compagnies-aeriennes/${airline.slug}` as never}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-rdc-blue px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-rdc-blue/90"
          >
            Voir les vols <ArrowRight size={12} />
          </Link>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-rdc-anthracite transition-colors hover:border-rdc-blue/40 hover:text-rdc-blue"
            >
              <Globe size={12} /> Site <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function AirlineRow({ airline }: { airline: Airline }) {
  const bg      = getAirlineBg(airline.iata_code);
  const website = getWebsite(airline);
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 transition-all hover:border-rdc-blue/30 hover:shadow-sm">
      {/* Logo */}
      <AirlineLogoImg
        iata={airline.iata_code} name={airline.name} bg={bg} size="sm"
        className="h-11 w-11 flex-shrink-0 rounded-full"
      />

      {/* Name */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-rdc-anthracite">{airline.name}</p>
        <p className="text-xs text-muted-foreground">{airline.iata_code}{airline.icao_code ? ` · ${airline.icao_code}` : ''}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            title="Site officiel"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-rdc-blue/40 hover:text-rdc-blue"
          >
            <Globe size={13} />
          </a>
        )}
        <Link
          to={`/vols/compagnies-aeriennes/${airline.slug}` as never}
          title="Voir les vols"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-rdc-blue/40 hover:text-rdc-blue"
        >
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
