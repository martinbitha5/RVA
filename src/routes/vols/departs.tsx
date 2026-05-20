import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlaneTakeoff, RefreshCw } from 'lucide-react';
import { FlightTable } from '@/components/flights/FlightTable';
import { FlightFilters } from '@/components/flights/FlightFilters';
import { useFlightBoard } from '@/lib/queries';
import { useRealtimeFlights } from '@/hooks/useRealtimeFlights';
import type { FlightStatus } from '@/types/database';

export const Route = createFileRoute('/vols/departs')({
  component: DepartsPage,
  head: () => ({
    meta: [
      { title: "Départs — Aéroport International de N'djili · FIH" },
      { name: 'description', content: 'Tableau des départs en temps réel à l\'Aéroport International de N\'djili (FIH). Vols, compagnies, portes et statuts.' },
    ],
  }),
});

function DepartsPage() {
  const { t } = useTranslation();
  const [search, setSearch]       = useState('');
  const [status, setStatus]       = useState<FlightStatus | ''>('');
  const [terminal, setTerminal]   = useState('');

  const { data = [], isLoading, dataUpdatedAt, refetch, isFetching } = useFlightBoard('departure');
  useRealtimeFlights('departure');

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="container py-10 md:py-14">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rdc-blue/10">
              <PlaneTakeoff size={18} className="text-rdc-blue" />
            </div>
            <h1 className="font-display text-2xl font-bold text-rdc-anthracite md:text-3xl">
              {t('flights.departures')}
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t('vols.departs.subtitle')}</p>
        </div>

        {/* Live badge + refresh */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-rdc-green">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rdc-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rdc-green" />
            </span>
            {t('flights.realtime')}
          </div>
          {updatedAt && (
            <span className="text-xs text-muted-foreground">{t('home.liveFlights.updatedLabel')} {updatedAt}</span>
          )}
          <button
            onClick={() => void refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
            {t('common.retry')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5">
        <FlightFilters
          search={search}     onSearch={setSearch}
          status={status}     onStatus={setStatus}
          terminal={terminal} onTerminal={setTerminal}
        />
      </div>

      {/* Table */}
      <FlightTable
        data={data}
        type="departure"
        isLoading={isLoading}
        globalFilter={search}
        statusFilter={status}
        terminalFilter={terminal}
      />

      <p className="mt-4 text-xs text-muted-foreground">{t('vols.departs.disclaimer')}</p>
    </div>
  );
}
