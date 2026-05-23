import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  ArrowRight, Plane, ChevronLeft, ChevronRight,
  Search, ParkingCircle, Crown, Car, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useUpcomingFlights } from '@/lib/queries';
import { FlightStatusBadge } from '@/components/flights/FlightStatusBadge';
import type { FlightWithAirline, FlightStatus } from '@/types/database';

/* ─── Slides ─────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src: '/images/fih-hero-1.jpg',
    alt: 'Tarmac FIH — Ethiopian Airlines Star Alliance A350, MG Airlines A320',
    caption: 'Ethiopian Airlines A350 · Star Alliance · Kinshasa FIH',
    position: 'object-bottom',
  },
  {
    src: '/images/fih-hero-2.jpg',
    alt: 'Tarmac FIH — flotte internationale au sol, terminal RVA',
    caption: 'Opérations au sol · Terminal International · FIH',
    position: 'object-bottom',
  },
] as const;

const SUGGESTIONS = ['SN491', 'Lubumbashi', 'Goma', 'Paris CDG', 'Brussels'];

const QUICK_LINKS = [
  { label: 'Stationnement', Icon: ParkingCircle, href: '/stationnement-transport/stationnement-fih' },
  { label: 'Salons VIP',    Icon: Crown,         href: '/boutiques-restaurants/salons' },
  { label: 'Dépose-minute', Icon: Car,           href: '/stationnement-transport/depose-recuperation' },
] as const;

const SLIDE_DURATION = 7000;

/* ─── Search helpers ─────────────────────────────────────────────────── */
const CITIES: Record<string, string> = {
  ADD: 'Addis-Abeba',   BZV: 'Brazzaville',   LBV: 'Libreville',
  DLA: 'Douala',        LOS: 'Lagos',          ABJ: 'Abidjan',
  ACC: 'Accra',         DSS: 'Dakar',          NBO: 'Nairobi',
  JNB: 'Johannesburg',  CPT: 'Le Cap',         LUN: 'Lusaka',
  HRE: 'Harare',        DAR: 'Dar es Salaam',  EBB: 'Entebbe',
  KGL: 'Kigali',        MRU: 'Île Maurice',    TNR: 'Antananarivo',
  LAD: 'Luanda',        MPM: 'Maputo',
  DXB: 'Dubaï',         DOH: 'Doha',           AUH: 'Abu Dhabi',
  IST: 'Istanbul',      CAI: 'Le Caire',
  BRU: 'Bruxelles',     CDG: 'Paris',          AMS: 'Amsterdam',
  LHR: 'Londres',       FCO: 'Rome',
  CMN: 'Casablanca',
  FBM: 'Lubumbashi',    GOM: 'Goma',           BKY: 'Bukavu',
  MJM: 'Mbuji-Mayi',   FKI: 'Kisangani',      KGA: 'Kananga',
  MDK: 'Mbandaka',      MAT: 'Matadi',
};

const AIRLINE_COLORS: Record<string, string> = {
  ET:  '#009A44', SN:  '#003DA5', AF:  '#002F6C', KQ: '#B22222',
  QR:  '#5C0632', TK:  '#E30A17', MS:  '#003580', WB: '#00529B',
  '4H':'#CE1126', '8Z':'#003DA5', AT:  '#006400', EK: '#C60C30',
  HF:  '#1A6B3C', DT:  '#C8102E', '8U':'#008751', RA: '#009A44',
};
const getAirlineBg = (iata?: string | null) =>
  (iata && AIRLINE_COLORS[iata]) ?? '#1A1A1A';

function filterFlights(
  flights: FlightWithAirline[],
  query: string,
  tab: 'departs' | 'arrivees',
): FlightWithAirline[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return flights
    .filter(f => {
      const cityIata = (tab === 'departs' ? f.destination_iata : f.origin_iata) ?? '';
      const cityName = CITIES[cityIata] ?? '';
      return (
        f.flight_number?.toLowerCase().includes(q)           ||
        f.airlines?.name?.toLowerCase().includes(q)          ||
        f.airlines?.iata_code?.toLowerCase().includes(q)     ||
        cityIata.toLowerCase().includes(q)                   ||
        cityName.toLowerCase().includes(q)
      );
    })
    .slice(0, 6);
}

function formatHHMM(iso: string | null | undefined) {
  if (!iso) return '—';
  try { return format(new Date(iso), 'HH:mm'); } catch { return '—'; }
}

/* ─── Component ──────────────────────────────────────────────────────── */
export function Hero() {
  const navigate = useNavigate();

  // Slideshow
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Flight search
  const [tab, setTab]             = useState<'departs' | 'arrivees'>('departs');
  const [query, setQuery]         = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lazy-fetch flights: enabled only once user starts typing
  const { data: departures = [], isLoading: depLoading } =
    useUpcomingFlights('departure', 60, { enabled: searchEnabled });
  const { data: arrivals = [], isLoading: arrLoading } =
    useUpcomingFlights('arrival', 60, { enabled: searchEnabled });

  const currentFlights = tab === 'departs' ? departures : arrivals;
  const isLoadingNow   = searchEnabled && (depLoading || arrLoading);

  const results = useMemo(
    () => filterFlights(currentFlights, query, tab),
    [currentFlights, query, tab],
  );

  // Enable data fetching on first keystroke
  useEffect(() => {
    if (query.length >= 1 && !searchEnabled) setSearchEnabled(true);
    setShowDropdown(query.length >= 2);
  }, [query, searchEnabled]);

  // Close dropdown on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setCurrent(prev => (prev + 1) % SLIDES.length),
      SLIDE_DURATION,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent(i => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(i => (i + 1) % SLIDES.length);

  function goToBoard(q?: string) {
    setShowDropdown(false);
    const qs = q ?? '';
    if (tab === 'departs') {
      void navigate({ to: '/vols/departs' as never, search: { q: qs } as never });
    } else {
      void navigate({ to: '/vols/arrivees' as never, search: { q: qs } as never });
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    goToBoard(query.trim() || undefined);
  }

  function handleSelectFlight(flight: FlightWithAirline) {
    setShowDropdown(false);
    void navigate({ to: `/vols/details/${flight.id}` as never });
  }

  function clearQuery() {
    setQuery('');
    setShowDropdown(false);
  }

  return (
    <section
      className="relative w-full min-h-[calc(100vh-64px)] md:min-h-screen flex flex-col overflow-hidden bg-[#060D1E]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── Photo slides crossfade ───────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            className={`h-full w-full object-cover ${SLIDES[current].position}`}
            loading={current === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              const el = e.currentTarget.parentElement as HTMLElement;
              e.currentTarget.style.display = 'none';
              el.style.background =
                'linear-gradient(155deg,#060D1E 0%,#0A1628 35%,#0D2144 55%,#003DA5 100%)';
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Diagonal runway stripe ──────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-8"
        style={{
          background:
            'repeating-linear-gradient(-45deg,rgba(255,206,0,0.04) 0,rgba(255,206,0,0.04) 1px,transparent 0,transparent 28px)',
        }}
      />

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-end lg:justify-center">
        <div className="container pb-20 md:pb-24 lg:py-32">
          <div className="flex justify-center lg:justify-end">

            {/* ── Flight search panel ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full sm:max-w-md lg:max-w-[420px] xl:max-w-[460px]"
            >
              <div className="bg-[#0B1628]/92 backdrop-blur-lg border border-white/10 p-4 sm:p-6 shadow-2xl">

                {/* Panel header */}
                <div className="flex items-center gap-3 mb-3 sm:mb-5">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center bg-rdc-blue">
                    <Search size={14} className="text-white" />
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
                    Trouver un vol
                  </h2>
                </div>

                {/* Tabs Départs / Arrivées */}
                <div className="flex mb-3 sm:mb-4 border border-white/10">
                  {(['departs', 'arrivees'] as const).map(t2 => (
                    <button
                      key={t2}
                      onClick={() => { setTab(t2); setShowDropdown(query.length >= 2); }}
                      className={`flex-1 py-2 sm:py-2.5 text-sm font-bold transition-colors ${
                        tab === t2
                          ? 'bg-white text-[#1A1A1A]'
                          : 'bg-transparent text-white/50 hover:text-white'
                      }`}
                    >
                      {t2 === 'departs' ? 'Départs' : 'Arrivées'}
                    </button>
                  ))}
                </div>

                {/* Search form + dropdown wrapper */}
                <div ref={dropdownRef} className="relative">
                  <form onSubmit={handleSearch}>
                    <div className="flex items-center gap-0 border border-white/20 bg-white/6 focus-within:border-rdc-yellow/50 transition-colors mb-2">
                      <Plane size={13} className="-rotate-45 text-white/35 flex-shrink-0 ml-3" />
                      <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onFocus={() => query.length >= 2 && setShowDropdown(true)}
                        placeholder="N° vol, ville ou compagnie…"
                        className="flex-1 bg-transparent px-3 py-2.5 sm:py-3 text-sm text-white placeholder:text-white/25 outline-none"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={clearQuery}
                          className="px-2 text-white/30 hover:text-white/70 transition-colors"
                          aria-label="Effacer"
                        >
                          <X size={13} />
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex items-center justify-center self-stretch px-4 bg-rdc-blue hover:bg-rdc-blue/85 transition-colors"
                        aria-label="Rechercher"
                      >
                        <Search size={13} className="text-white" />
                      </button>
                    </div>
                  </form>

                  {/* ── Live results dropdown ── */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-[calc(100%-0.4rem)] z-50 max-h-[340px] overflow-y-auto border border-white/20 bg-[#0B1628] shadow-2xl"
                      >
                        {isLoadingNow ? (
                          /* Loading state */
                          <div className="flex flex-col items-center gap-2 py-8">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-rdc-yellow" />
                            <p className="text-xs text-white/40">Recherche en cours…</p>
                          </div>
                        ) : results.length === 0 ? (
                          /* No results */
                          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                            <Plane size={22} className="text-white/20" />
                            <p className="text-sm text-white/50">
                              Aucun vol trouvé pour &laquo;{query}&raquo;
                            </p>
                            <p className="text-xs text-white/25">
                              Essayez un numéro de vol, une compagnie ou une ville
                            </p>
                            <button
                              onClick={() => goToBoard(query)}
                              className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-rdc-yellow hover:text-white transition-colors"
                            >
                              Voir tous les {tab === 'departs' ? 'départs' : 'arrivées'}
                              <ArrowRight size={11} />
                            </button>
                          </div>
                        ) : (
                          <>
                            {/* Result rows */}
                            {results.map(f => {
                              const iata    = f.airlines?.iata_code ?? '';
                              const cityIata = tab === 'departs' ? f.destination_iata : f.origin_iata;
                              const cityName = cityIata ? (CITIES[cityIata] ?? cityIata) : '—';
                              const hhmm    = formatHHMM(f.scheduled_time);
                              return (
                                <button
                                  key={f.id}
                                  onClick={() => handleSelectFlight(f)}
                                  className="flex w-full items-center gap-3 border-b border-white/8 px-4 py-3 text-left transition-colors last:border-0 hover:bg-white/8"
                                >
                                  {/* Airline badge */}
                                  <div
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white"
                                    style={{ backgroundColor: getAirlineBg(iata) }}
                                  >
                                    {iata || '?'}
                                  </div>

                                  {/* Info */}
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-white">
                                      {f.flight_number}
                                      {f.airlines?.name && (
                                        <span className="ml-1 font-normal text-white/55">
                                          · {f.airlines.name}
                                        </span>
                                      )}
                                    </p>
                                    <p className="truncate text-xs text-white/40">
                                      {tab === 'departs' ? '→' : '←'}{' '}
                                      {cityName}{cityIata && cityIata !== cityName ? ` (${cityIata})` : ''}
                                      {' · '}{hhmm}
                                    </p>
                                  </div>

                                  {/* Status */}
                                  <div className="flex-shrink-0">
                                    <FlightStatusBadge
                                      status={f.status as FlightStatus}
                                      className="text-[9px] px-2 py-0.5"
                                    />
                                  </div>
                                </button>
                              );
                            })}

                            {/* See all results */}
                            <button
                              onClick={() => goToBoard(query)}
                              className="flex w-full items-center justify-between border-t border-white/15 px-4 py-3 text-left text-sm font-semibold text-rdc-yellow transition-colors hover:bg-white/5 hover:text-white"
                            >
                              <span>Voir tous les résultats pour &laquo;{query}&raquo;</span>
                              <ArrowRight size={13} className="flex-shrink-0" />
                            </button>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Suggested chips — masqués sur mobile */}
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-3 mt-1">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white/35 hover:text-white hover:border-white/30 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* See all link */}
                <Link
                  to={(tab === 'departs' ? '/vols/departs' : '/vols/arrivees') as never}
                  className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-3 sm:mb-4"
                >
                  {tab === 'departs' ? 'Voir tous les départs' : 'Voir toutes les arrivées'}
                  <ArrowRight size={13} />
                </Link>

                {/* Divider */}
                <div className="border-t border-white/10 mb-3" />

                {/* Quick action buttons */}
                <div className="flex flex-wrap gap-2">
                  {QUICK_LINKS.map(({ label, Icon, href }) => (
                    <Link
                      key={href}
                      to={href as never}
                      className="flex items-center gap-1.5 bg-rdc-blue/80 hover:bg-rdc-blue border border-rdc-blue/60 px-3 py-1.5 text-xs font-bold text-white transition-colors"
                    >
                      <Icon size={11} />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Slide controls ───────────────────────────────────────── */}
      <div className="absolute bottom-14 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 pointer-events-none">

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex items-center gap-3"
          >
            <div className="h-px w-8 bg-rdc-yellow/50" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              {SLIDES[current].caption}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots + arrows */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={prev}
            aria-label="Photo précédente"
            className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Photo ${i + 1}`}
                className="relative h-0.5 overflow-hidden transition-all"
                style={{
                  width: i === current ? 32 : 16,
                  background: 'rgba(255,255,255,0.2)',
                }}
              >
                {i === current && !paused && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-rdc-yellow"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                    key={current}
                  />
                )}
                {i === current && (
                  <div className="absolute inset-0 bg-white/55" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Photo suivante"
            className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-7">
        <div className="flex flex-col items-center gap-2 opacity-20">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">
            Découvrir
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* ── Bottom RDC flag bar ──────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-gradient-rdc" />
    </section>
  );
}
