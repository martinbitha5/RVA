import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlaneLanding, RefreshCw, Search } from 'lucide-react';
import { FlightList } from '@/components/flights/FlightList';
import { FlightFilters } from '@/components/flights/FlightFilters';
import { useFlightBoard } from '@/lib/queries';
import { useRealtimeFlights } from '@/hooks/useRealtimeFlights';
import type { FlightStatus } from '@/types/database';

export const Route = createFileRoute('/vols/arrivees')({
  component: ArriveesPage,
  head: () => ({
    meta: [
      { title: "Arrivées — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Tableau des arrivées en temps réel à l'Aéroport International de N'djili (FIH)." },
    ],
  }),
});

function ArriveesPage() {
  const { t } = useTranslation();
  const [search, setSearch]     = useState('');
  const [status, setStatus]     = useState<FlightStatus | ''>('');
  const [terminal, setTerminal] = useState('');

  const { data = [], isLoading, dataUpdatedAt, refetch, isFetching } = useFlightBoard('arrival');
  useRealtimeFlights('arrival');

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <main id="main-content">

      {/* ─── ADMTL-style hero ──────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#0F2A1E]">
        {/* Background aircraft photo */}
        <img
          src="/images/fih-checkin-ethiopian.jpg"
          className="absolute inset-0 h-full w-full select-none object-cover object-center opacity-25 pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        {/* Gradient: opaque left → transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A1E] via-[#0F2A1E]/75 to-transparent" />

        <div className="container relative z-10 py-12 md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left ─── title block */}
            <div>
              {/* Green accent parallelogram + section label */}
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className="inline-block h-4 w-5 bg-rdc-green"
                  style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
                />
                <span className="text-sm font-semibold tracking-wider text-white/70">Vols</span>
              </div>
              <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
                {t('flights.arrivals')}
              </h1>
              <p className="mt-3 max-w-sm text-white/60">{t('vols.arrivees.subtitle')}</p>

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
                <Link
                  to="/vols/departs"
                  className="flex flex-1 items-center justify-center py-2.5 text-sm font-semibold text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Départs
                </Link>
                <div className="flex flex-1 items-center justify-center gap-1.5 bg-rdc-green py-2.5 text-sm font-semibold text-white">
                  <PlaneLanding size={13} /> Arrivées
                </div>
              </div>

              {/* Search input */}
              <div className="relative">
                <PlaneLanding size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Vol, compagnie, ville ou code IATA…"
                  className="w-full bg-white py-3 pl-9 pr-4 text-sm text-rdc-anthracite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rdc-green"
                />
              </div>
              <p className="mt-2.5 text-[11px] text-white/30">
                Ex&nbsp;: SN457 · Bruxelles · Brussels Airlines · ADD
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Filters ───────────────────────────────────────────────── */}
      <div className="border-b border-border bg-muted/30">
        <div className="container py-4">
          <FlightFilters
            search={search}     onSearch={setSearch}
            status={status}     onStatus={setStatus}
            terminal={terminal} onTerminal={setTerminal}
          />
        </div>
      </div>

      {/* ─── Flight list ───────────────────────────────────────────── */}
      <div className="container py-8 md:py-10">
        <FlightList
          data={data}
          type="arrival"
          isLoading={isLoading}
          globalFilter={search}
          statusFilter={status}
          terminalFilter={terminal}
        />
        <p className="mt-4 text-xs text-muted-foreground">{t('vols.arrivees.disclaimer')}</p>
      </div>

    </main>
  );
}
