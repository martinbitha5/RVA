import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  Car, Zap, Accessibility, Shield, Bus, MapPin,
  Calendar, Clock, ArrowLeft, ArrowRight, Tag,
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

function secLabel(level: ParkingLot['security_level']): string {
  if (level === 'premium')  return 'Sécurité premium';
  if (level === 'cctv_24h') return 'CCTV 24h/24';
  return 'Sécurisé';
}

// ── Static fallback lots ──────────────────────────────────────────────────────

const STATIC_LOTS: ParkingLot[] = [
  {
    id: 'static-p1', code: 'P1',
    name: 'Court séjour — Proximité terminale',
    description_fr: 'Parking de proximité idéal pour les courts séjours. Accès direct au terminal international en moins de 2 minutes à pied.',
    description_en: null,
    total_spots: 120, available_spots: null,
    hourly_rate_usd: 2, daily_rate_usd: 15, weekly_rate_usd: 80, monthly_rate_usd: null,
    distance_terminal: '50 m', shuttle_available: false,
    ev_charging: false, covered: false, pmr_spots: 4,
    security_level: 'cctv_24h', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
  {
    id: 'static-p2', code: 'P2',
    name: 'Long séjour — Économique',
    description_fr: 'Parking économique pour les séjours prolongés. Navette gratuite toutes les 15 minutes vers le terminal.',
    description_en: null,
    total_spots: 250, available_spots: null,
    hourly_rate_usd: 1, daily_rate_usd: 10, weekly_rate_usd: 55, monthly_rate_usd: null,
    distance_terminal: '400 m', shuttle_available: true,
    ev_charging: false, covered: false, pmr_spots: 8,
    security_level: 'cctv_24h', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
  {
    id: 'static-p3', code: 'P3',
    name: 'Premium couvert',
    description_fr: 'Parking couvert avec surveillance premium. Bornes de recharge électrique disponibles. Idéal pour protéger votre véhicule.',
    description_en: null,
    total_spots: 60, available_spots: null,
    hourly_rate_usd: 3, daily_rate_usd: 22, weekly_rate_usd: 110, monthly_rate_usd: null,
    distance_terminal: '100 m', shuttle_available: false,
    ev_charging: true, covered: true, pmr_spots: 6,
    security_level: 'premium', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

function StationnementFih() {
  const { start, end, promo } = Route.useSearch();
  const navigate = useNavigate();
  const { data: dbLots = [] } = useParkingAvailability();
  const lots = dbLots.length > 0 ? dbLots : STATIC_LOTS;

  const hours = start && end ? calcHours(start, end) : 0;

  // Guard: invalid params
  if (!start || !end || hours < 4) {
    return (
      <div className="container py-24 text-center">
        <p className="text-muted-foreground mb-6">Paramètres de réservation invalides ou expirés.</p>
        <Link
          to={'/stationnement-transport/formulaire' as never}
          className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-rdc-blue/85 transition-colors"
        >
          <ArrowLeft size={14} /> Recommencer la recherche
        </Link>
      </div>
    );
  }

  function handleSelectLot(lot: ParkingLot) {
    void navigate({
      to: '/stationnement-transport/reservation' as never,
      search: {
        start,
        end,
        promo,
        lotId: lot.id,
      } as never,
    });
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#f5f6f8]">

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

      {/* ── Titre ────────────────────────────────────────────────────── */}
      <div className="container pt-8 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[#003DA5] mb-1">Stationnement officiel RVA</p>
        <h1 className="font-display text-2xl font-bold text-[#1a1a1a]">
          Choisissez votre forfait
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Durée : <strong>{durationLabel(hours)}</strong>
          {promo && <> · <span className="text-[#009A44] font-semibold">Code promo <span className="font-mono">{promo}</span> appliqué</span></>}
          {' '}— Tarifs taxes inclus, paiement 100 % sécurisé.
        </p>
      </div>

      {/* ── Cards de lots ────────────────────────────────────────────── */}
      <div className="container pb-12 space-y-4">
        {lots.map((lot) => {
          const price = calcPrice(lot, hours);
          return (
            <div key={lot.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">

              {/* Header bleu */}
              <div className="bg-[#003DA5] px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-3xl font-bold text-white leading-none">{lot.code}</p>
                  <p className="text-sm text-white/80 mt-0.5">{lot.name}</p>
                </div>
                {lot.available_spots != null && (
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    lot.available_spots > 20
                      ? 'bg-white/20 text-white'
                      : lot.available_spots > 5
                      ? 'bg-[#FFCE00] text-[#1a1a1a]'
                      : 'bg-[#CE1126] text-white'
                  }`}>
                    {lot.available_spots} places dispo.
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="lg:flex lg:gap-8">

                  {/* Info */}
                  <div className="flex-1">
                    {lot.description_fr && (
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {lot.description_fr}
                      </p>
                    )}

                    {/* Badges caractéristiques */}
                    <div className="flex flex-wrap gap-2">
                      {lot.covered && (
                        <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                          <Car size={11} className="text-[#003DA5]" /> Couvert
                        </span>
                      )}
                      {lot.shuttle_available && (
                        <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                          <Bus size={11} className="text-[#003DA5]" /> Navette gratuite
                        </span>
                      )}
                      {lot.ev_charging && (
                        <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          <Zap size={11} /> Recharge électrique
                        </span>
                      )}
                      {(lot.pmr_spots ?? 0) > 0 && (
                        <span className="flex items-center gap-1 rounded-full border border-[#003DA5]/20 bg-[#003DA5]/5 px-2.5 py-1 text-xs font-medium text-[#003DA5]">
                          <Accessibility size={11} /> {lot.pmr_spots} places PMR
                        </span>
                      )}
                      {lot.security_level && (
                        <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                          <Shield size={11} className="text-[#009A44]" /> {secLabel(lot.security_level)}
                        </span>
                      )}
                      {lot.distance_terminal && (
                        <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                          <MapPin size={11} className="text-[#003DA5]" /> {lot.distance_terminal} du terminal
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prix + CTA */}
                  <div className="mt-5 lg:mt-0 lg:w-52 lg:shrink-0 flex lg:flex-col items-center lg:items-end gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Prix en ligne</p>
                      <p className="font-display text-3xl font-bold text-[#003DA5] leading-none">
                        ${price.online}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="line-through">${price.guichet} guichet</span>
                        <span className="ml-1.5 text-[#009A44] font-semibold">−15 %</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        pour {price.days} jour{price.days > 1 ? 's' : ''} · taxes incluses
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectLot(lot)}
                      className="flex items-center justify-center gap-2 lg:w-full rounded-xl bg-[#003DA5] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#002a7a] transition-colors"
                    >
                      Réservez maintenant <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
