import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlaneTakeoff, RefreshCw, Search, ChevronDown } from 'lucide-react';
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
  const [expanded, setExpanded] = useState(false);

  const { data = [], isLoading, isError, error, dataUpdatedAt, refetch, isFetching } = useFlightBoard('departure');
  useRealtimeFlights('departure');

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <main id="main-content">

      {/* ─── Barre "Trouver un vol" sticky ───────────────────────────────
          Positionnée naturellement juste sous le header fixe (pt-[70px])
          → elle colle immédiatement sans IntersectionObserver            */}
      <div className="sticky top-[70px] z-20 bg-[#0D1B2A] border-b border-white/10 shadow">
        <div className="container">
          <button
            type="button"
            onClick={() => setExpanded(v => !v)}
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
                className={`text-white/60 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          {expanded && (
            <div className="border-t border-white/10 pb-4 pt-3">
              <div className="mb-3 flex border border-white/10">
                <div className="flex flex-1 items-center justify-center gap-1.5 bg-rdc-blue py-2 text-xs font-semibold text-white">
                  <PlaneTakeoff size={12} /> Départs
                </div>
                <Link
                  to="/vols/arrivees"
                  className="flex flex-1 items-center justify-center py-2 text-xs font-semibold text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Arrivées
                </Link>
              </div>
              <div className="relative">
                <PlaneTakeoff size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Vol, compagnie, ville ou code IATA…"
                  className="w-full bg-white py-2.5 pl-9 pr-4 text-sm text-rdc-anthracite placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rdc-blue"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Hero diagonal style ADMTL ───────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1C3050]" style={{ minHeight: '360px' }}>
        {/* Photo full opacity — visible à droite de la diagonale */}
        <img
          src="/images/fih-tarmac.jpg"
          className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        {/* Panneau sombre avec bord oblique (style ADMTL) */}
        <div
          className="absolute inset-0 bg-[#1C3050]"
          style={{ clipPath: 'polygon(0 0, 55% 0, 67% 100%, 0 100%)' }}
        />

        <div className="container relative z-10 py-14 md:py-20">
          <div className="max-w-xs md:max-w-sm">
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
            <p className="mt-3 text-white/60">{t('vols.departs.subtitle')}</p>

            <div className="mt-5 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rdc-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rdc-green" />
              </span>
              <span className="text-xs font-medium text-rdc-green">{t('flights.realtime')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Liste des vols ──────────────────────────────────────────── */}
      <div className="container py-8 md:py-10">
        {isError && (
          <div className="mb-4 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {(error as Error)?.message === 'QUOTA_EXCEEDED'
              ? "Le quota mensuel de données temps réel est atteint. Les vols seront disponibles dès le renouvellement du quota. Contactez l'administration FIH si le problème persiste."
              : 'Données temporairement indisponibles. Réessayez dans quelques instants.'}
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
