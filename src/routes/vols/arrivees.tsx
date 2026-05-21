import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlaneLanding, RefreshCw, Search, ChevronDown } from 'lucide-react';
import { FlightList } from '@/components/flights/FlightList';
import { useFlightBoard } from '@/lib/queries';
import { useRealtimeFlights } from '@/hooks/useRealtimeFlights';

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
  const [search, setSearch] = useState('');
  const [stickyExpanded, setStickyExpanded] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const { data = [], isLoading, isError, error, dataUpdatedAt, refetch, isFetching } = useFlightBoard('arrival');
  useRealtimeFlights('arrival');

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '-70px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content">

      {/* ─── Hero : image claire + diagonale + widget ──────────────── */}
      <div ref={heroRef} className="relative overflow-hidden bg-[#0F2A1E]">

        {/* Photo — full opacity, positionnée à droite */}
        <img
          src="/images/fih-checkin-ethiopian.jpg"
          className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
          alt=""
          aria-hidden="true"
        />

        {/* Panneau sombre gauche avec bord oblique style ADMTL */}
        <div
          className="absolute inset-0 bg-[#0F2A1E]"
          style={{ clipPath: 'polygon(0 0, 58% 0, 72% 100%, 0 100%)' }}
        />

        <div className="container relative z-10 py-14 md:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Gauche — titre + indicateur temps réel */}
            <div>
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

            {/* Droite — widget recherche (fond semi-opaque sur l'image) */}
            <div className="w-full bg-[#0D1B2A]/90 backdrop-blur-sm p-6 lg:max-w-md lg:flex-shrink-0">
              <div className="mb-4 flex items-center gap-2.5">
                <Search size={15} className="text-white" />
                <span className="font-semibold text-white">Trouver un vol</span>
              </div>

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

      {/* ─── Barre sticky — s'affiche quand le hero est scrollé hors vue ─ */}
      <div
        className={`fixed top-[78px] right-4 md:right-8 z-30 w-[420px] max-w-[calc(100vw-2rem)] bg-[#0D1B2A] border border-white/10 shadow-xl transition-all duration-200 ${
          heroVisible
            ? 'opacity-0 pointer-events-none -translate-y-2'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div>
          <button
            type="button"
            onClick={() => setStickyExpanded(v => !v)}
            className="flex w-full items-center justify-between py-3.5"
          >
            <div className="flex items-center gap-2.5">
              <Search size={14} className="text-white/70" />
              <span className="text-sm font-semibold text-white">Trouver un vol</span>
            </div>
            <div className="flex items-center gap-3">
              {updatedAt && (
                <span className="hidden sm:inline text-xs text-white/40">
                  Mis à jour à {updatedAt}
                </span>
              )}
              <span
                role="button"
                tabIndex={-1}
                onClick={e => { e.stopPropagation(); void refetch(); }}
                className="cursor-pointer text-white/40 hover:text-white/70"
              >
                <RefreshCw size={11} className={isFetching ? 'animate-spin' : ''} />
              </span>
              <ChevronDown
                size={15}
                className={`text-white/60 transition-transform duration-200 ${stickyExpanded ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          {stickyExpanded && (
            <div className="border-t border-white/10 pb-4 pt-3">
              <div className="mb-3 flex border border-white/10">
                <Link
                  to="/vols/departs"
                  className="flex flex-1 items-center justify-center py-2 text-xs font-semibold text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Départs
                </Link>
                <div className="flex flex-1 items-center justify-center gap-1.5 bg-rdc-green py-2 text-xs font-semibold text-white">
                  <PlaneLanding size={12} /> Arrivées
                </div>
              </div>
              <div className="relative">
                <PlaneLanding size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Vol, compagnie, ville ou code IATA…"
                  className="w-full bg-white py-2.5 pl-9 pr-4 text-sm text-rdc-anthracite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rdc-green"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Liste des vols ──────────────────────────────────────────── */}
      <div className="container py-8 md:py-10">
        {isError && (
          <div className="mb-4 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {(error as Error)?.message === 'QUOTA_EXCEEDED'
              ? "Le quota mensuel de données temps réel est atteint. Les vols seront disponibles dès le renouvellement du quota."
              : 'Données temporairement indisponibles. Réessayez dans quelques instants.'}
          </div>
        )}
        <FlightList
          data={data}
          type="arrival"
          isLoading={isLoading}
          globalFilter={search}
          statusFilter=""
          terminalFilter=""
        />
        <p className="mt-4 text-xs text-muted-foreground">{t('vols.arrivees.disclaimer')}</p>
      </div>

    </main>
  );
}
