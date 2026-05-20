import { format } from 'date-fns';
import { PlaneTakeoff, PlaneLanding, MapPin } from 'lucide-react';
import { FlightStatusBadge } from './FlightStatusBadge';
import type { FlightWithAirline } from '@/types/database';

interface Props {
  flight: FlightWithAirline;
}

function formatTime(iso: string | null) {
  if (!iso) return '—';
  return format(new Date(iso), 'HH:mm');
}

export function FlightCard({ flight }: Props) {
  const scheduled = flight.scheduled_time;
  const estimated = flight.estimated_time ?? flight.scheduled_time;
  const isDelayed =
    flight.status === 'delayed' ||
    (estimated && scheduled && new Date(estimated) > new Date(scheduled));

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 transition-shadow hover:shadow-md">
      {/* Airline code */}
      <div className="flex w-14 flex-shrink-0 flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {flight.airlines?.iata_code ?? '—'}
        </span>
        <span className="mt-0.5 font-mono text-sm font-semibold text-rdc-anthracite">
          {flight.flight_number}
        </span>
      </div>

      {/* Time */}
      <div className="flex min-w-[52px] flex-col items-center">
        {flight.type === 'departure' ? (
          <PlaneTakeoff size={14} className="mb-0.5 text-rdc-blue" />
        ) : (
          <PlaneLanding size={14} className="mb-0.5 text-rdc-green" />
        )}
        <span
          className={`font-mono text-base font-bold ${isDelayed ? 'text-orange-600 line-through' : 'text-rdc-anthracite'}`}
        >
          {formatTime(scheduled)}
        </span>
        {isDelayed && (
          <span className="font-mono text-xs font-medium text-orange-600">
            {formatTime(estimated)}
          </span>
        )}
      </div>

      {/* Destination / Origin */}
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 truncate text-sm font-semibold text-rdc-anthracite">
          <MapPin size={11} className="flex-shrink-0 text-muted-foreground" />
          {flight.type === 'departure' ? flight.destination_iata : flight.origin_iata}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {flight.airlines?.name ?? '—'}
        </p>
      </div>

      {/* Gate */}
      {flight.gate && (
        <div className="hidden flex-shrink-0 flex-col items-center sm:flex">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Porte</span>
          <span className="font-semibold text-rdc-anthracite">{flight.gate}</span>
        </div>
      )}

      {/* Status */}
      <div className="flex-shrink-0">
        <FlightStatusBadge status={flight.status} />
      </div>
    </div>
  );
}
