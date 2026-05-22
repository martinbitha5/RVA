import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Plane, Globe, ChevronLeft, PlaneTakeoff, PlaneLanding, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { FlightTable } from '@/components/flights/FlightTable';
import { useAirlineBySlug, useFlightBoard } from '@/lib/queries';
import { getAirlineLogoUrl } from '@/lib/aviationstack';

export const Route = createFileRoute('/vols/compagnies-aeriennes/$slug')({
  component: AirlinePage,
});

const AIRLINE_BG: Record<string, string> = {
  '4H': '#CE1126', ET: '#1B4F72', SN: '#003DA5', AF: '#002395',
  KQ: '#006633', QR: '#5C0632', MS: '#6B0F1A', TK: '#E30A17',
  HF: '#1A6B3C', WB: '#00A86B', SA: '#1C2F4A', RA: '#009A44',
  DT: '#C8102E', '8U': '#008751',
};
const getAirlineBg = (iata: string) => AIRLINE_BG[iata] ?? '#1C3050';

function AirlinePage() {
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const { data: airline, isLoading } = useAirlineBySlug(slug);

  /* ── Live flight data from AviationStack board ── */
  const {
    data: allDeps = [], isLoading: depsLoading,
    refetch: refetchDeps, isFetching: fetchingDeps,
  } = useFlightBoard('departure');
  const {
    data: allArrs = [], isLoading: arrsLoading,
    refetch: refetchArrs, isFetching: fetchingArrs,
  } = useFlightBoard('arrival');

  const iata       = airline?.iata_code ?? '';
  const departures = allDeps.filter(f =>
    f.airline_id === iata || f.airlines?.iata_code === iata
  );
  const arrivals   = allArrs.filter(f =>
    f.airline_id === iata || f.airlines?.iata_code === iata
  );

  const flightsLoading = depsLoading || arrsLoading;
  const isFetching     = fetchingDeps || fetchingArrs;
  const refetch        = () => { void refetchDeps(); void refetchArrs(); };

  const description = i18n.language === 'fr'
    ? airline?.description_fr
    : (airline?.description_en ?? airline?.description_fr);

  if (isLoading) return <AirlineSkeleton />;

  if (!airline) {
    return (
      <div className="container py-20 text-center">
        <Plane size={40} className="mx-auto mb-4 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">{t('common.noResults')}</p>
        <Link to="/vols/compagnies-aeriennes"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:underline">
          <ChevronLeft size={14} /> {t('flights.airlines')}
        </Link>
      </div>
    );
  }

  const bg      = getAirlineBg(airline.iata_code);
  const logoUrl = getAirlineLogoUrl(airline.iata_code);
  const website = airline.website ?? null;

  return (
    <main id="main-content">

      {/* ── Hero compagnie ───────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: bg, minHeight: '300px' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="container relative z-10 pb-10 pt-16 md:pt-20">
          <Link to="/vols/compagnies-aeriennes"
            className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors">
            <ChevronLeft size={14} /> Compagnies aériennes
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
            {/* Logo */}
            <div className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 bg-white shadow-lg overflow-hidden">
              <img
                src={logoUrl}
                alt={airline.name}
                className="h-16 w-16 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.nextSibling as HTMLElement | null;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <span
                className="absolute inset-0 hidden items-center justify-center text-2xl font-bold"
                style={{ color: bg }}
              >
                {airline.iata_code}
              </span>
            </div>

            {/* Nom + badges */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
                  {airline.name}
                </h1>
                {airline.hub_at_fih && (
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    Hub FIH
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-white/70">
                IATA : <strong className="text-white">{airline.iata_code}</strong>
                {airline.icao_code && (
                  <> · OACI : <strong className="text-white">{airline.icao_code}</strong></>
                )}
              </p>
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors">
                  <Globe size={12} /> Site officiel
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Contenu ──────────────────────────────────────────────── */}
      <div className="container py-10 md:py-12">

        {/* Description */}
        {description && (
          <div className="mb-10 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          </div>
        )}

        {/* Stats rapides */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Départs aujourd\'hui', value: departures.length, icon: PlaneTakeoff },
            { label: 'Arrivées aujourd\'hui', value: arrivals.length, icon: PlaneLanding },
            { label: 'Code IATA', value: airline.iata_code, icon: Plane },
            { label: 'Statut', value: airline.hub_at_fih ? 'Hub FIH' : 'International', icon: Globe },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border bg-white p-4 shadow-sm">
              <Icon size={16} className="mb-2 text-rdc-blue" />
              <p className="font-display text-xl font-bold text-rdc-anthracite">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Vols du jour */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-rdc-anthracite">
            {t('vols.airline.todayFlights')}
          </h2>
          <button
            onClick={refetch}
            disabled={isFetching}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rdc-blue transition-colors disabled:opacity-40"
          >
            <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
            Actualiser
          </button>
        </div>

        <Tabs defaultValue="departures">
          <TabsList className="mb-5">
            <TabsTrigger value="departures" className="gap-1.5">
              <PlaneTakeoff size={13} /> {t('flights.departures')} ({departures.length})
            </TabsTrigger>
            <TabsTrigger value="arrivals" className="gap-1.5">
              <PlaneLanding size={13} /> {t('flights.arrivals')} ({arrivals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="departures">
            <FlightTable data={departures} type="departure" isLoading={flightsLoading}
              globalFilter="" statusFilter="" terminalFilter="" />
          </TabsContent>
          <TabsContent value="arrivals">
            <FlightTable data={arrivals} type="arrival" isLoading={flightsLoading}
              globalFilter="" statusFilter="" terminalFilter="" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function AirlineSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[300px] w-full" />
      <div className="container space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}
