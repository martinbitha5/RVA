import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plane, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHero } from '@/components/ui/page-hero';
import { useAirlines } from '@/lib/queries';
import type { Airline } from '@/types/database';

export const Route = createFileRoute('/vols/compagnies-aeriennes')({
  component: CompagniesPage,
  head: () => ({
    meta: [
      { title: "Compagnies aériennes — Aéroport N'djili · FIH" },
      { name: 'description', content: "17 compagnies aériennes opèrent à FIH : Congo Airways, Ethiopian Airlines, Brussels Airlines, Air France et bien d'autres." },
    ],
  }),
});

const AIRLINE_BG: Record<string, string> = {
  '4H': '#CE1126', ET: '#1B4F72', SN: '#003DA5', AF: '#002395',
  KQ: '#006633', QR: '#5C0632', MS: '#6B0F1A', TK: '#E30A17',
  HF: '#1A6B3C', WB: '#00A86B', SA: '#1C2F4A', RA: '#009A44',
  DT: '#C8102E', '8U': '#008751',
};
const getAirlineBg = (iata: string) => AIRLINE_BG[iata] ?? '#003DA5';

function CompagniesPage() {
  const { t } = useTranslation();
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

function HubCard({ airline }: { airline: Airline }) {
  const bg = getAirlineBg(airline.iata_code);
  return (
    <Link
      to={`/vols/compagnies-aeriennes/${airline.slug}` as never}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative flex h-32 items-center justify-center" style={{ backgroundColor: bg }}>
        {airline.logo_url ? (
          <img src={airline.logo_url} alt={airline.name}
            className="h-16 w-16 rounded-full border-4 border-white/20 bg-white object-contain p-1" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/20 bg-white">
            <span className="text-xl font-bold" style={{ color: bg }}>{airline.iata_code}</span>
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
          Hub FIH
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between p-4">
        <div>
          <p className="font-semibold text-rdc-anthracite">{airline.name}</p>
          <p className="text-xs text-muted-foreground">
            {airline.iata_code}{airline.icao_code ? ` · ${airline.icao_code}` : ''}
          </p>
        </div>
        <ArrowRight size={16}
          className="shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-rdc-blue" />
      </div>
    </Link>
  );
}

function AirlineRow({ airline }: { airline: Airline }) {
  const bg = getAirlineBg(airline.iata_code);
  return (
    <Link
      to={`/vols/compagnies-aeriennes/${airline.slug}` as never}
      className="group flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 transition-all hover:border-rdc-blue/30 hover:shadow-sm"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: bg }}>
        {airline.logo_url ? (
          <img src={airline.logo_url} alt={airline.name}
            className="h-10 w-10 object-contain bg-white p-0.5"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        ) : (
          <span className="text-xs font-bold text-white">{airline.iata_code}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-rdc-anthracite">{airline.name}</p>
        <p className="text-xs text-muted-foreground">{airline.iata_code}</p>
      </div>
      <ArrowRight size={14}
        className="shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-rdc-blue" />
    </Link>
  );
}
