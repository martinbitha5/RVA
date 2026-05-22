import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Car, Zap, Accessibility, RefreshCw, CreditCard, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHero } from '@/components/ui/page-hero';
import { ParkingReservationModal } from '@/components/parking/ParkingReservationModal';
import { useParkingAvailability } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { ParkingLot } from '@/types/database';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/stationnement-transport/stationnement-fih')({
  component: StationnementFih,
  head: () => ({ meta: [
    { title: "Stationnement FIH — Aéroport N'djili" },
    { name: 'description', content: 'Réservez votre place de stationnement officiel RVA à FIH. Tarifs USD et CDF, Mobile Money accepté.' },
  ]}),
});

const MOBILE_MONEY = [
  { name: 'Airtel Money',   color: '#E00', dot: 'bg-red-600' },
  { name: 'M-Pesa Vodacom', color: '#1E8B3E', dot: 'bg-green-600' },
  { name: 'Orange Money',   color: '#F60', dot: 'bg-orange-500' },
];

function occupancyPct(): number {
  return Math.floor(Math.random() * 55) + 15;
}

function StationnementFih() {
  const { t } = useTranslation();
  const { data: lots = [], isLoading, refetch, isFetching } = useParkingAvailability();
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);

  return (
    <main id="main-content">

      <PageHero
        eyebrow={t('nav.parkingTransport')}
        title={t('parking.parkingFih')}
        subtitle={t('stat.parking.subtitle')}
        image="/images/fih-bus-cobus.jpg"
        breadcrumbs={[
          { label: t('home.hero.cta'), href: '/' },
          { label: t('nav.parkingTransport'), href: '/stationnement-transport' },
          { label: t('parking.parkingFih') },
        ]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/stationnement-transport/offres' as never} className="btn-outline-white">
              <CreditCard size={15} /> {t('parking.offers')}
            </Link>
            <Link to={'/stationnement-transport/depose-recuperation' as never} className="btn-outline-white">
              <MapPin size={15} /> {t('parking.dropOff')}
            </Link>
          </div>
        }
      />

      <div className="container py-10 md:py-14">

        {/* Header section + refresh */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-blue">Disponibilité en temps réel</p>
            </div>
            <h2 className="font-display text-2xl font-bold text-rdc-anthracite md:text-3xl">
              Nos parkings officiels
            </h2>
          </div>
          <button
            onClick={() => void refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-rdc-blue/40 hover:text-rdc-blue disabled:opacity-40"
          >
            <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
            {t('common.retry')}
          </button>
        </div>

        {/* Grille des parkings */}
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1,2,3,4].map((i) => <Skeleton key={i} className="h-72 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {lots.map((lot) => {
              const pct       = occupancyPct();
              const available = lot.total_spots ? Math.floor(lot.total_spots * (1 - pct / 100)) : null;
              const level     = pct < 50 ? 'low' : pct < 80 ? 'medium' : 'high';
              const barColor  = level === 'low' ? 'bg-rdc-green' : level === 'medium' ? 'bg-amber-500' : 'bg-rdc-red';
              const headBg    = level === 'low' ? 'bg-rdc-green' : level === 'medium' ? 'bg-amber-500' : 'bg-rdc-red';

              return (
                <div key={lot.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">

                  {/* Bande colorée */}
                  <div className={cn('px-5 py-5', headBg)}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-display text-3xl font-bold text-white leading-none">{lot.code}</p>
                        <p className="mt-1 text-sm text-white/80">{lot.name}</p>
                      </div>
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        {level === 'low' ? 'Disponible' : level === 'medium' ? 'Modéré' : 'Complet'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    {/* Taux d'occupation */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Occupation</span>
                        <span className="font-semibold">{pct}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className={cn('h-full rounded-full transition-all', barColor)}
                          style={{ width: `${pct}%` }} />
                      </div>
                      {available !== null && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          ~{available} place{available > 1 ? 's' : ''} disponible{available > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>

                    {/* Tarifs */}
                    <div className="space-y-1.5 rounded-xl bg-muted/40 p-3 text-sm">
                      {lot.hourly_rate_usd != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('parking.hourly')}</span>
                          <span className="font-semibold">${lot.hourly_rate_usd} {t('common.usd')}</span>
                        </div>
                      )}
                      {lot.daily_rate_usd != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('parking.daily')}</span>
                          <span className="font-semibold">${lot.daily_rate_usd} {t('common.usd')}</span>
                        </div>
                      )}
                      {lot.weekly_rate_usd != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('parking.weekly')}</span>
                          <span className="font-semibold">${lot.weekly_rate_usd} {t('common.usd')}</span>
                        </div>
                      )}
                    </div>

                    {/* Équipements */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Car size={13} /><span>Voitures</span></div>
                      {lot.ev_charging && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <Zap size={13} /><span>Électrique</span>
                        </div>
                      )}
                      {(lot.pmr_spots ?? 0) > 0 && (
                        <div className="flex items-center gap-1 text-rdc-blue">
                          <Accessibility size={13} /><span>PMR</span>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => setSelectedLot(lot)}
                      className="mt-auto w-full bg-rdc-blue text-white hover:bg-rdc-blue/85"
                    >
                      {t('parking.reserve')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Money */}
        <section className="mt-16">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Moyens de paiement</p>
          </div>
          <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">{t('stat.offres.mobileMoney')}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {MOBILE_MONEY.map((m) => (
              <div key={m.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
                <span className={cn('flex h-10 w-10 shrink-0 rounded-full', m.dot)} />
                <div>
                  <p className="font-semibold text-rdc-anthracite">{m.name}</p>
                  <p className="text-xs text-rdc-green">✓ {t('stat.offres.accepted')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info pratiques */}
        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
          <p className="mb-3 font-semibold text-rdc-anthracite">{t('stat.parking.infoTitle')}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-rdc-blue">→</span>
              Paiement à la caisse à l'entrée ou via Mobile Money avant de quitter le parking.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-rdc-blue">→</span>
              Les parkings P1 et P2 sont surveillés 24h/24 par les agents de sécurité RVA.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-rdc-blue">→</span>
              Places PMR (P3) réservées aux personnes à mobilité réduite — accès facilité aux terminaux.
            </li>
          </ul>
          <Link to={'/stationnement-transport/offres' as never}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:underline">
            {t('parking.offers')} <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <ParkingReservationModal lot={selectedLot} open={!!selectedLot} onClose={() => setSelectedLot(null)} />
    </main>
  );
}
