import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlaneTakeoff, RefreshCw, Search } from 'lucide-react';
import { FlightList } from '@/components/flights/FlightList';
import { useFlightBoard } from '@/lib/queries';
import { useRealtimeFlights } from '@/hooks/useRealtimeFlights';

export const Route = createFileRoute('/vols/departs')({
  component: DepartsPage,
  head: () => ({
    meta: [
      { title: "Départs — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Tableau des départs en temps réel à l'Aéroport International de N'djili (FIH)." },
    ],
  }),
});

function DepartsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const { data = [], isLoading, isError, error, dataUpdatedAt, refetch, isFetching } = useFlightBoard('departure');
  useRealtimeFlights('departure');

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <main id="main-content">

      {/* ─── ADMTL-style hero ──────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1C3050]">
        {/* Background aircraft photo */}
        <img
          src="/images/fih-tarmac.jpg"
          className="absolute inset-0 h-full w-full select-none object-cover object-center opacity-25 pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        {/* Gradient: opaque left → transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C3050] via-[#1C3050]/75 to-transparent" />

        <div className="container relative z-10 py-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left ─── title block */}
            <div>
              {/* Yellow accent parallelogram + section label */}
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className="inline-block h-4 w-5 bg-rdc-yellow"
                  style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
                />
                <span className="text-sm font-semibold tracking-wider text-white/70">Vols</span>
              </div>
              <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
                {t('flights.departures')}
              </h1>
              <p className="mt-3 max-w-sm text-white/60">{t('vols.departs.subtitle')}</p>

              {/* Live indicator + refresh */}
              <div className="mt-5 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rdc-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-rdc-green" />
                </span>
                <span className="text-xs font-medium text-rdc-green">{t('flights.realtime')}</span>
                {updatedAt && (
                  <span className="text-xs text-white/40">
                    · {t('home.liveFlights.updatedLabel')} {updatedAt}
                  </span>
                )}
                <button
                  onClick={() => void refetch()}
                  disabled={isFetching}
                  aria-label="Actualiser"
                  className="text-white/40 transition-colors hover:text-white/70 disabled:opacity-30"
                >
                  <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* Right ─── search widget */}
            <div className="w-full bg-[#0D1B2A] p-6 lg:max-w-md lg:flex-shrink-0">
              {/* Widget header */}
              <div className="mb-4 flex items-center gap-2.5">
                <Search size={15} className="text-white" />
                <span className="font-semibold text-white">Trouver un vol</span>
              </div>

              {/* Départs / Arrivées tabs */}
              <div className="mb-4 flex border border-white/10">
                <div className="flex flex-1 items-center justify-center gap-1.5 bg-rdc-blue py-2.5 text-sm font-semibold text-white">
                  <PlaneTakeoff size={13} /> Départs
                </div>
                <Link
                  to="/vols/arrivees"
                  className="flex flex-1 items-center justify-center py-2.5 text-sm font-semibold text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Arrivées
                </Link>
              </div>

              {/* Search input */}
              <div className="relative">
                <PlaneTakeoff size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Vol, compagnie, ville ou code IATA…"
                  className="w-full bg-white py-3 pl-9 pr-4 text-sm text-rdc-anthracite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rdc-blue"
                />
              </div>
              <p className="mt-2.5 text-[11px] text-white/30">
                Ex&nbsp;: ET409 · Addis-Abeba · Ethiopian Airlines · FBM
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Flight list ───────────────────────────────────────────── */}
      <div className="container py-8 md:py-10">
        {isError && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Erreur lors du chargement des vols : {(error as Error)?.message ?? 'Erreur inconnue'}
          </div>
        )}
        <FlightList
          data={data}
          type="departure"
          isLoading={isLoading}
          globalFilter={search}
          statusFilter=""
          terminalFilter=""
        />
        <p className="mt-4 text-xs text-muted-foreground">{t('vols.departs.disclaimer')}</p>
      </div>

    </main>
  );
}
