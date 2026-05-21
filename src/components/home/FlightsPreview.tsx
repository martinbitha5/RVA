import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Plane, ArrowRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useUpcomingFlights } from '@/lib/queries';
import { FlightStatusBadge } from '@/components/flights/FlightStatusBadge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Tab = 'departures' | 'arrivals';

export function FlightsPreview() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? fr : undefined;
  const [tab, setTab] = useState<Tab>('departures');
  const { data: flights = [], isLoading } = useUpcomingFlights(tab === 'departures' ? 'departure' : 'arrival', 6);
  void locale;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-blue">{t('home.liveFlights.eyebrow')}</p>
            </div>
            <h2 className="display-sub text-rdc-anthracite">{t('home.liveFlights.title')}</h2>
          </div>

          {/* Tab pills */}
          <div className="flex items-center gap-0 border border-border overflow-hidden shrink-0">
            <button
              onClick={() => setTab('departures')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all',
                tab === 'departures'
                  ? 'bg-rdc-anthracite text-white'
                  : 'bg-white text-muted-foreground hover:bg-muted',
              )}>
              <ArrowUpRight size={13} />
              {t('flights.departures')}
            </button>
            <button
              onClick={() => setTab('arrivals')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-l border-border',
                tab === 'arrivals'
                  ? 'bg-rdc-anthracite text-white'
                  : 'bg-white text-muted-foreground hover:bg-muted',
              )}>
              <ArrowDownLeft size={13} />
              {t('flights.arrivals')}
            </button>
          </div>
        </div>

        {/* Flight list */}
        {isLoading ? (
          <div className="space-y-px">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse" />
            ))}
          </div>
        ) : flights.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground/40">
            <Plane size={40} strokeWidth={1} />
            <p className="mt-3 text-sm">{t('flights.noFlights')}</p>
          </div>
        ) : (
          <div className="border-t border-border">
            {flights.map((flight: (typeof flights)[number]) => {
              const time = flight.estimated_time ?? flight.scheduled_time;
              return (
                <div key={flight.id}
                  className="flex items-center gap-4 py-4 border-b border-border hover:bg-[#F8F9FB] transition-colors px-2 -mx-2">

                  {/* Time */}
                  <div className="w-16 shrink-0 text-center">
                    <p className="font-display text-xl font-bold leading-none text-rdc-anthracite">
                      {time ? format(new Date(time), 'HH:mm') : '—'}
                    </p>
                    {flight.estimated_time && flight.estimated_time !== flight.scheduled_time && (
                      <p className="text-[10px] text-muted-foreground line-through mt-0.5">
                        {format(new Date(flight.scheduled_time), 'HH:mm')}
                      </p>
                    )}
                  </div>

                  {/* Flight number */}
                  <div className="w-20 shrink-0">
                    <p className="text-sm font-bold font-mono text-rdc-anthracite">{flight.flight_number}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {(flight.airlines as { iata_code?: string } | null)?.iata_code ?? ''}
                    </p>
                  </div>

                  {/* Destination */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-rdc-anthracite truncate">
                      {tab === 'departures' ? flight.destination_iata : flight.origin_iata}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                      {(flight.airlines as { name?: string } | null)?.name ?? ''}
                    </p>
                  </div>

                  {/* Terminal/Gate */}
                  <div className="hidden md:block w-20 shrink-0 text-center">
                    {flight.terminal && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        T{flight.terminal}
                        {flight.gate ? ` · ${flight.gate}` : ''}
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="shrink-0">
                    <FlightStatusBadge status={flight.status} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rdc-green opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rdc-green" />
            </span>
            {t('home.liveFlights.updatedLabel')}
          </div>
          <Link
            to={(tab === 'departures' ? '/vols/departs' : '/vols/arrivees') as never}
            className="inline-flex items-center gap-2 text-sm font-bold text-rdc-anthracite hover:text-rdc-blue transition-colors group">
            Voir tous les {tab === 'departures' ? 'départs' : 'arrivées'}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
