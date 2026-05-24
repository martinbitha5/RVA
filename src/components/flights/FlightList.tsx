import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import { FlightStatusBadge } from './FlightStatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { FlightWithAirline, FlightStatus } from '@/types/database';

/* ─── IATA → city name (main FIH destinations) ────────────────────── */
const CITIES: Record<string, string> = {
  // Afrique
  ADD: 'Addis-Abeba',   BZV: 'Brazzaville',   LBV: 'Libreville',
  DLA: 'Douala',        LOS: 'Lagos',          ABJ: 'Abidjan',
  ACC: 'Accra',         DSS: 'Dakar',          NBO: 'Nairobi',
  JNB: 'Johannesburg',  CPT: 'Le Cap',         LUN: 'Lusaka',
  HRE: 'Harare',        DAR: 'Dar es Salaam',  EBB: 'Entebbe',
  KGL: 'Kigali',        MRU: 'Île Maurice',    TNR: 'Antananarivo',
  LAD: 'Luanda',        MPM: 'Maputo',
  // Moyen-Orient
  DXB: 'Dubaï',         DOH: 'Doha',           AUH: 'Abu Dhabi',
  IST: 'Istanbul',      CAI: 'Le Caire',
  // Europe
  BRU: 'Bruxelles',     CDG: 'Paris',          AMS: 'Amsterdam',
  LHR: 'Londres',       FCO: 'Rome',
  // Maghreb
  CMN: 'Casablanca',
  // RDC domestique
  FBM: 'Lubumbashi',    GOM: 'Goma',           BKY: 'Bukavu',
  MJM: 'Mbuji-Mayi',   FKI: 'Kisangani',      KGA: 'Kananga',
  MDK: 'Mbandaka',      MAT: 'Matadi',
};

/* ─── Airline badge colors (IATA → CSS bg color) ──────────────────── */
const AIRLINE_BG: Record<string, string> = {
  ET:  '#009A44',  // Ethiopian Airlines — vert
  SN:  '#003DA5',  // Brussels Airlines — bleu
  AF:  '#002F6C',  // Air France — navy
  KQ:  '#B22222',  // Kenya Airways — rouge
  QR:  '#5C0632',  // Qatar Airways — bordeaux
  TK:  '#E30A17',  // Turkish Airlines — rouge
  MS:  '#003580',  // EgyptAir — bleu
  AT:  '#006400',  // Royal Air Maroc — vert
  WB:  '#00529B',  // RwandAir — bleu
  '8T':'#00B0CA',  // ASKY Airlines — cyan
  '4H':'#CE1126',  // Air Congo — rouge RDC
  BC:  '#003DA5',  // Congo Airways — bleu RDC
  KP:  '#1A1A1A',  // Korongo Airlines — anthracite
  EK:  '#C60C30',  // Emirates — rouge
  ME:  '#006B3C',  // Middle East Airlines
  RA:  '#E2231A',  // Nepal Airlines
};
const DEFAULT_BG = '#1A1A1A';

function formatTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  return format(new Date(iso), 'HH:mm');
}

interface Props {
  data: FlightWithAirline[];
  type: 'departure' | 'arrival';
  isLoading: boolean;
  globalFilter: string;
  statusFilter: FlightStatus | '';
  terminalFilter: string;
}

export function FlightList({ data, type, isLoading, globalFilter, statusFilter, terminalFilter }: Props) {
  const { t } = useTranslation();

  /* ─── Filtering ──────────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let rows = data;
    if (statusFilter) rows = rows.filter(r => r.status === statusFilter);
    if (terminalFilter) rows = rows.filter(r => r.terminal?.toLowerCase().includes(terminalFilter.toLowerCase()));
    if (globalFilter) {
      const q = globalFilter.toLowerCase();
      rows = rows.filter(r =>
        r.flight_number?.toLowerCase().includes(q) ||
        r.airlines?.name?.toLowerCase().includes(q) ||
        r.destination_iata?.toLowerCase().includes(q) ||
        r.origin_iata?.toLowerCase().includes(q),
      );
    }
    return rows;
  }, [data, globalFilter, statusFilter, terminalFilter]);

  /* ─── Group by date (aujourd'hui et futur uniquement) ───────────── */
  const today = format(new Date(), 'yyyy-MM-dd');
  const groups = useMemo(() => {
    const map = new Map<string, FlightWithAirline[]>();
    for (const f of filtered) {
      if (!f.scheduled_time) continue;
      const key = format(new Date(f.scheduled_time), 'yyyy-MM-dd');
      if (key < today) continue; // exclure les jours passés
      const arr = map.get(key) ?? [];
      arr.push(f);
      map.set(key, arr);
    }
    return [...map.entries()];
  }, [filtered, today]);

  /* ─── Loading skeleton ───────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="space-y-px border border-border">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-[70px] w-full rounded-none" />
        ))}
      </div>
    );
  }

  /* ─── Empty state ────────────────────────────────────────────────── */
  if (!filtered.length) {
    return (
      <div className="border border-border py-16 text-center">
        <p className="text-sm text-muted-foreground">{t('flights.noFlights')}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t('flights.noFlightsDesc')}</p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-white">
      {groups.map(([dateKey, flights]) => {
        const dateObj = new Date(dateKey + 'T00:00:00');
        const isToday = dateKey === format(new Date(), 'yyyy-MM-dd');
        const dateLabel = isToday
          ? `Aujourd'hui, ${format(dateObj, 'd MMMM', { locale: fr })}`
          : format(dateObj, 'EEEE d MMMM yyyy', { locale: fr });

        return (
          <div key={dateKey}>
            {/* ─── Date header ─────────────────────────────────────── */}
            <div className="flex items-center justify-between border-b border-t border-border bg-muted/40 px-5 py-2.5 first:border-t-0">
              <p className="text-xs font-bold uppercase tracking-wider text-rdc-anthracite">{dateLabel}</p>
            </div>

            {/* ─── Flight rows ──────────────────────────────────────── */}
            {flights.map(f => {
              const iata       = f.airlines?.iata_code ?? '';
              const bgColor    = AIRLINE_BG[iata] ?? DEFAULT_BG;
              const cityIata   = type === 'departure' ? f.destination_iata : f.origin_iata;
              const cityName   = cityIata ? (CITIES[cityIata] ?? '') : '';
              const scheduled  = formatTime(f.scheduled_time);
              const realTime   = f.actual_time
                ? formatTime(f.actual_time)
                : f.estimated_time ? formatTime(f.estimated_time) : null;
              const isLate     = !!(f.estimated_time && f.scheduled_time && new Date(f.estimated_time) > new Date(f.scheduled_time));
              const isCancelled = f.status === 'cancelled';
              const showBoth   = realTime && realTime !== scheduled;

              return (
                <div
                  key={f.id}
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border px-5 py-4 last:border-0 hover:bg-muted/20 transition-colors"
                >
                  {/* Times */}
                  <div className="w-14 flex-shrink-0 text-right">
                    {showBoth ? (
                      <>
                        <p className="font-mono text-xs text-muted-foreground line-through">{scheduled}</p>
                        <p className={cn('font-mono text-base font-bold leading-tight', isLate ? 'text-orange-600' : 'text-rdc-anthracite')}>
                          {realTime}
                        </p>
                      </>
                    ) : (
                      <p className={cn('font-mono text-base font-bold', isCancelled ? 'text-rdc-red' : 'text-rdc-anthracite')}>
                        {scheduled}
                      </p>
                    )}
                  </div>

                  {/* Airline logo — cercle style ADMTL */}
                  <div className="h-11 w-11 flex-shrink-0" aria-label={f.airlines?.name ?? iata}>
                    {f.airlines?.logo_url ? (
                      <img
                        src={f.airlines.logo_url}
                        alt={f.airlines.name ?? iata}
                        className="h-11 w-11 rounded-full object-contain"
                        onError={e => {
                          const el = e.currentTarget;
                          el.style.display = 'none';
                          const fb = document.createElement('div');
                          fb.className = 'h-11 w-11 rounded-full flex items-center justify-center text-[11px] font-bold text-white';
                          fb.style.backgroundColor = bgColor;
                          fb.textContent = iata;
                          el.parentElement!.appendChild(fb);
                        }}
                      />
                    ) : (
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ backgroundColor: bgColor }}
                      >
                        {iata || '—'}
                      </div>
                    )}
                  </div>

                  {/* Flight info */}
                  <div className="min-w-0 flex-1">
                    <p className={cn('font-semibold text-rdc-anthracite', isCancelled && 'opacity-50 line-through')}>
                      {f.flight_number}{' '}
                      <span className="font-normal text-muted-foreground">{f.airlines?.name}</span>
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {cityName ? `${cityName} (${cityIata})` : (cityIata ?? '—')}
                    </p>
                  </div>

                  {/* Status + Gate */}
                  <div className="flex flex-shrink-0 items-center gap-4">
                    <FlightStatusBadge status={f.status as FlightStatus} />
                    {f.gate && (
                      <span className="hidden text-sm font-medium text-rdc-anthracite sm:block">
                        Porte {f.gate}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-shrink-0 items-center gap-5">
                    <Link
                      to={`/vols/details/${f.id}` as never}
                      className="flex items-center gap-1 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80"
                    >
                      Détails <ArrowRight size={13} />
                    </Link>
                    <Link
                      to="/vols/alertes-whatsapp"
                      className="flex items-center gap-1 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80"
                    >
                      Alertes <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
