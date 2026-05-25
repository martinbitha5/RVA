import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  Bus, Accessibility, Zap, Car, Shield,
  Calendar, Clock, ArrowLeft, Tag,
  CheckCircle, LayoutList, LayoutGrid, MapPin,
} from 'lucide-react';
import { useParkingAvailability } from '@/lib/queries';
import type { ParkingLot } from '@/types/database';

export const Route = createFileRoute('/stationnement-transport/stationnement-fih')({
  validateSearch: (search: Record<string, unknown>) => ({
    start: String(search.start ?? ''),
    end:   String(search.end ?? ''),
    promo: search.promo != null ? String(search.promo) : undefined,
  }),
  component: StationnementFih,
  head: () => ({
    meta: [
      { title: "Choisissez votre stationnement — Aéroport N'djili FIH" },
      { name: 'description', content: "Choisissez votre forfait de stationnement officiel RVA. Tarifs en USD, paiement Mobile Money accepté, place garantie." },
    ],
  }),
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcHours(start: string, end: string): number {
  return (new Date(end).getTime() - new Date(start).getTime()) / 3_600_000;
}

function durationLabel(hours: number): string {
  const d = Math.floor(hours / 24);
  const h = Math.round(hours % 24);
  if (d === 0) return `${h}h`;
  if (h === 0) return `${d} jour${d > 1 ? 's' : ''}`;
  return `${d}j ${h}h`;
}

function fmtShort(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    weekday: 'short', day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit',
  });
}

function calcPrice(lot: ParkingLot, hours: number) {
  const days   = Math.max(1, Math.ceil(hours / 24));
  const guichet = days * (lot.daily_rate_usd ?? 10);
  return {
    guichet: Math.round(guichet * 100) / 100,
    online:  Math.round(guichet * 0.85 * 100) / 100,
    savings: Math.round(guichet * 0.15 * 100) / 100,
    days,
  };
}

// ── Stepper ───────────────────────────────────────────────────────────────────

const STEP_LABELS = ['Choisir les dates', 'Choisir le produit', 'Vos renseignements', 'Confirmation'];

function Stepper({ current }: { current: number }) {
  return (
    <div className="border-b border-border bg-white">
      <div className="container py-5">
        <div className="flex mb-2">
          {STEP_LABELS.map((label, idx) => (
            <div key={idx} className="flex-1 text-center px-1">
              <span className={`text-[10px] sm:text-xs font-medium leading-tight ${
                idx <= current ? 'text-rdc-anthracite' : 'text-muted-foreground'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative flex items-center">
          <div className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-border" style={{ left: '12.5%', right: '12.5%' }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-rdc-blue transition-all duration-500"
            style={{ left: '12.5%', width: `${(current + 1) * 25}%` }}
          />
          {STEP_LABELS.map((_, idx) => {
            const done   = idx < current;
            const active = idx === current;
            return (
              <div key={idx} className="relative z-10 flex-1 flex justify-center">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                  done   ? 'border-rdc-blue bg-rdc-blue text-white' :
                  active ? 'border-rdc-blue bg-rdc-blue text-white shadow-[0_0_0_4px_rgba(0,61,165,0.15)]' :
                           'border-border bg-white text-muted-foreground'
                }`}>
                  {done ? <CheckCircle size={13} /> : <span>{idx + 1}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Static fallback lots ──────────────────────────────────────────────────────

const STATIC_LOTS: ParkingLot[] = [
  {
    id: 'static-p1', code: 'P1',
    name: 'Parking Court Terme — Terminal International',
    description_fr: 'Parking officiel RVA à 200m du terminal international. Idéal pour les dépose/récupération et les courtes durées. Accès immédiat au hall des arrivées.',
    description_en: null,
    total_spots: 120, available_spots: 280,
    hourly_rate_usd: 2, daily_rate_usd: 15, weekly_rate_usd: 80, monthly_rate_usd: null,
    distance_terminal: '200 m', shuttle_available: false,
    ev_charging: false, covered: false, pmr_spots: 15,
    security_level: 'cctv_24h', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
  {
    id: 'static-p2', code: 'P2',
    name: 'Parking Long Terme — Boulevard Lumumba',
    description_fr: 'Grand parking extérieur sécurisé sur le Boulevard Lumumba. Tarifs dégressifs pour les séjours longs. Service navette vers les terminaux toutes les 15 minutes.',
    description_en: null,
    total_spots: 250, available_spots: 620,
    hourly_rate_usd: 1, daily_rate_usd: 10, weekly_rate_usd: 55, monthly_rate_usd: null,
    distance_terminal: '600 m', shuttle_available: true,
    ev_charging: false, covered: false, pmr_spots: 20,
    security_level: 'cctv_24h', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
  {
    id: 'static-p3', code: 'P3',
    name: 'Parking Premium Couvert — Terminal VIP',
    description_fr: 'Parking couvert avec surveillance premium 24h/24. Idéal pour protéger votre véhicule. Bornes de recharge pour véhicules électriques disponibles.',
    description_en: null,
    total_spots: 60, available_spots: 48,
    hourly_rate_usd: 3, daily_rate_usd: 22, weekly_rate_usd: 110, monthly_rate_usd: null,
    distance_terminal: '100 m', shuttle_available: false,
    ev_charging: true, covered: true, pmr_spots: 6,
    security_level: 'premium', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
];

const LOT_IMAGES: Record<string, string> = {
  P1: '/images/fih-hero-1.jpg',
  P2: '/images/fih-tarmac.jpg',
  P3: '/images/fih-checkin.jpg',
};

// ── Component ─────────────────────────────────────────────────────────────────

function StationnementFih() {
  const { start, end, promo } = Route.useSearch();
  const navigate = useNavigate();
  const { data: dbLots = [] } = useParkingAvailability();
  const lots = dbLots.length > 0 ? dbLots : STATIC_LOTS;
  const [view, setView] = useState<'list' | 'grid'>('list');

  const hours = start && end ? calcHours(start, end) : 0;

  if (!start || !end || hours < 4) {
    return (
      <div className="container py-24 text-center">
        <p className="text-muted-foreground mb-6">Paramètres de réservation invalides ou expirés.</p>
        <Link
          to={'/stationnement-transport/formulaire' as never}
          className="inline-flex items-center gap-2 bg-rdc-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-rdc-blue/85 transition-colors"
        >
          <ArrowLeft size={14} /> Recommencer la recherche
        </Link>
      </div>
    );
  }

  function handleSelectLot(lot: ParkingLot) {
    void navigate({
      to: '/stationnement-transport/reservation' as never,
      search: { start, end, promo, lotId: lot.id } as never,
    });
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#f5f6f8]">

      {/* ── Stepper — étape 2 active ──────────────────────────────── */}
      <Stepper current={1} />

      {/* ── Barre résumé dates ───────────────────────────────────────── */}
      <div className="bg-[#1a1a1a] border-b border-white/10">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#FFCE00]" />
              <span className="font-semibold text-white uppercase tracking-wider text-[10px]">ENTRÉE</span>
              <span>{fmtShort(start)}</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#FFCE00]" />
              <span className="font-semibold text-white uppercase tracking-wider text-[10px]">SORTIE</span>
              <span>{fmtShort(end)}</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#FFCE00]" />
              <span className="font-bold text-white">{durationLabel(hours)}</span>
            </span>
            {promo && (
              <span className="flex items-center gap-1 rounded bg-[#FFCE00]/20 px-2 py-0.5 text-[#FFCE00]">
                <Tag size={10} /> {promo}
              </span>
            )}
          </div>
          <Link
            to={'/stationnement-transport/formulaire' as never}
            className="flex items-center gap-1 text-xs font-semibold text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Modifier les dates
          </Link>
        </div>
      </div>

      {/* ── Contenu principal ────────────────────────────────────────── */}
      <div className="container py-8">

        {/* Titre + barre tri/vue */}
        <div className="flex flex-wrap items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wide text-rdc-anthracite">
              VOS OPTIONS DE STATIONNEMENT
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Durée : <strong>{durationLabel(hours)}</strong>
              {promo && (
                <> · <span className="text-[#009A44] font-semibold">Code <span className="font-mono">{promo}</span> appliqué</span></>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground text-xs">Trier par :</span>
              <select className="border border-border bg-white px-3 py-1.5 text-sm text-rdc-anthracite focus:outline-none focus:border-rdc-blue">
                <option>Prix le plus bas</option>
                <option>Distance au terminal</option>
              </select>
            </div>
            <div className="flex border border-border overflow-hidden">
              <button
                onClick={() => setView('list')}
                className={`px-2.5 py-1.5 transition-colors ${view === 'list' ? 'bg-rdc-blue text-white' : 'bg-white text-muted-foreground hover:bg-muted/40'}`}
                aria-label="Vue liste"
              >
                <LayoutList size={16} />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`px-2.5 py-1.5 transition-colors ${view === 'grid' ? 'bg-rdc-blue text-white' : 'bg-white text-muted-foreground hover:bg-muted/40'}`}
                aria-label="Vue grille"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Cards ────────────────────────────────────────────────────── */}
        <div className={view === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {lots.map((lot) => {
            const price  = calcPrice(lot, hours);
            const imgSrc = LOT_IMAGES[lot.code] ?? '/images/fih-hero-1.jpg';

            /* ── Vue liste ── */
            if (view === 'list') {
              return (
                <div key={lot.id} className="flex flex-col sm:flex-row border border-border bg-white overflow-hidden shadow-sm">

                  {/* Photo */}
                  <div className="sm:w-44 md:w-52 shrink-0 relative overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={lot.name}
                      className="h-44 sm:h-full w-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {lot.available_spots != null && (
                      <span className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-bold text-rdc-blue shadow-sm">
                        {lot.available_spots} places dispo.
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h2 className="font-bold text-base text-rdc-anthracite mb-3">
                        {lot.code} — {lot.name}
                      </h2>

                      {/* Feature checkmarks */}
                      <div className="space-y-2 mb-4">
                        {lot.description_fr && (
                          <p className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={15} className="text-rdc-blue shrink-0 mt-0.5" />
                            {lot.description_fr}
                          </p>
                        )}
                        {lot.shuttle_available && (
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={15} className="text-rdc-blue shrink-0" />
                            Navette gratuite toutes les 15 minutes
                          </p>
                        )}
                        {lot.ev_charging && (
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={15} className="text-rdc-blue shrink-0" />
                            Bornes de recharge électrique disponibles
                          </p>
                        )}
                        {lot.covered && (
                          <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle size={15} className="text-rdc-blue shrink-0" />
                            Parking couvert — protection intempéries
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Infos transfert */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                      {lot.distance_terminal && (
                        <span className="flex items-center gap-1.5">
                          <Bus size={12} className="text-rdc-anthracite" />
                          {lot.shuttle_available
                            ? `Navette · ${lot.distance_terminal} du terminal`
                            : `${lot.distance_terminal} du terminal`}
                        </span>
                      )}
                      {(lot.pmr_spots ?? 0) > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Accessibility size={12} />
                          {lot.pmr_spots} places PMR
                        </span>
                      )}
                      {lot.security_level && (
                        <span className="flex items-center gap-1.5">
                          <Shield size={12} className="text-[#009A44]" />
                          {lot.security_level === 'premium' ? 'Sécurité premium' : 'CCTV 24h/24'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Panneau prix */}
                  <div className="sm:w-52 shrink-0 bg-[#2d3748] text-white flex flex-col items-center justify-center gap-2 p-6">
                    <p className="text-sm line-through text-white/40">${price.guichet}</p>
                    <p className="font-display text-4xl font-bold leading-none">${price.online}</p>
                    <p className="text-sm font-semibold text-[#60a5fa]">15 % Rabais en ligne</p>
                    <p className="text-xs text-white/40 text-center">
                      taxes incluses · {price.days} jour{price.days > 1 ? 's' : ''}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSelectLot(lot)}
                      className="mt-3 w-full bg-rdc-blue hover:bg-[#002a7a] text-white font-bold py-2.5 px-4 text-sm transition-colors"
                    >
                      Réservez maintenant
                    </button>
                  </div>
                </div>
              );
            }

            /* ── Vue grille ── */
            return (
              <div key={lot.id} className="flex flex-col border border-border bg-white overflow-hidden shadow-sm">
                <div className="relative overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={lot.name}
                    className="h-36 w-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {lot.available_spots != null && (
                    <span className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-bold text-rdc-blue shadow-sm">
                      {lot.available_spots} places
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1">
                  <h2 className="font-bold text-sm text-rdc-anthracite mb-2">{lot.code} — {lot.name}</h2>
                  <div className="space-y-1.5 mb-3">
                    {lot.description_fr && (
                      <p className="flex items-start gap-1.5 text-xs text-muted-foreground line-clamp-2">
                        <CheckCircle size={12} className="text-rdc-blue shrink-0 mt-0.5" />
                        {lot.description_fr}
                      </p>
                    )}
                    {lot.shuttle_available && (
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle size={12} className="text-rdc-blue shrink-0" />
                        Navette gratuite
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    {lot.distance_terminal && (
                      <span className="flex items-center gap-1"><MapPin size={10} />{lot.distance_terminal}</span>
                    )}
                    {lot.ev_charging && <span className="flex items-center gap-1"><Zap size={10} />EV</span>}
                    {lot.covered && <span className="flex items-center gap-1"><Car size={10} />Couvert</span>}
                  </div>
                </div>
                <div className="bg-[#2d3748] text-white px-4 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs line-through text-white/40">${price.guichet}</p>
                    <p className="font-display text-2xl font-bold leading-none">${price.online}</p>
                    <p className="text-[10px] text-[#60a5fa] font-semibold">−15 %</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectLot(lot)}
                    className="bg-rdc-blue hover:bg-[#002a7a] text-white font-bold py-2 px-3 text-xs transition-colors"
                  >
                    Réservez
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
