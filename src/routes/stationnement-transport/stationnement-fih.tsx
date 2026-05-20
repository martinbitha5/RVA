import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Car, Zap, Accessibility, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ParkingReservationModal } from '@/components/parking/ParkingReservationModal';
import { useParkingAvailability } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { ParkingLot } from '@/types/database';

export const Route = createFileRoute('/stationnement-transport/stationnement-fih')({
  component: StationnementFih,
  head: () => ({ meta: [
    { title: "Stationnement FIH — Aéroport N'djili" },
    { name: 'description', content: 'Réservez votre place de stationnement officiel RVA à l\'Aéroport International de N\'djili. Tarifs USD et CDF, Mobile Money accepté.' },
  ]}),
});

function occupancyPct(_lot: ParkingLot): number {
  // Mock occupancy — will come from realtime in Phase 4
  return Math.floor(Math.random() * 60) + 20;
}

function StationnementFih() {
  const { t } = useTranslation();
  const { data: lots = [], isLoading, refetch, isFetching } = useParkingAvailability();
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);

  return (
    <div className="container py-10 md:py-14">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
          <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl">{t('parking.parkingFih')}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t('stat.parking.subtitle')}</p>
        </div>
        <button onClick={() => void refetch()} disabled={isFetching}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50">
          <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
          {t('common.retry')}
        </button>
      </div>

      {/* Parking lots grid */}
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1,2,3,4].map((i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {lots.map((lot) => {
            const pct = occupancyPct(lot);
            const available = lot.total_spots ? Math.floor(lot.total_spots * (1 - pct / 100)) : null;
            const level = pct < 50 ? 'low' : pct < 80 ? 'medium' : 'high';
            return (
              <div key={lot.id} className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
                {/* Header band */}
                <div className={cn('px-5 py-4', level === 'low' ? 'bg-rdc-green' : level === 'medium' ? 'bg-amber-500' : 'bg-rdc-red')}>
                  <p className="font-display text-xl font-bold text-white">{lot.code}</p>
                  <p className="text-xs text-white/80">{lot.name}</p>
                </div>

                <div className="flex flex-1 flex-col p-5 gap-4">
                  {/* Occupancy bar */}
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">{t('stat.parking.occupancy')}</span>
                      <span className="font-semibold">{pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className={cn('h-full rounded-full transition-all',
                        level === 'low' ? 'bg-rdc-green' : level === 'medium' ? 'bg-amber-500' : 'bg-rdc-red'
                      )} style={{ width: `${pct}%` }} />
                    </div>
                    {available !== null && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        ~{available} {t('parking.spots')} {t('parking.available')}
                      </p>
                    )}
                  </div>

                  {/* Tariffs */}
                  <div className="space-y-1 text-sm">
                    {lot.hourly_rate_usd != null && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('parking.hourly')}</span>
                        <span className="font-semibold">${lot.hourly_rate_usd} USD</span>
                      </div>
                    )}
                    {lot.daily_rate_usd != null && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('parking.daily')}</span>
                        <span className="font-semibold">${lot.daily_rate_usd} USD</span>
                      </div>
                    )}
                    {lot.weekly_rate_usd != null && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('parking.weekly')}</span>
                        <span className="font-semibold">${lot.weekly_rate_usd} USD</span>
                      </div>
                    )}
                  </div>

                  {/* Icons */}
                  <div className="flex gap-2.5 text-muted-foreground">
                    <Car size={14} aria-label="Voitures" />
                    {lot.ev_charging && <Zap size={14} className="text-amber-500" aria-label="Recharge électrique" />}
                    {(lot.pmr_spots ?? 0) > 0 && <Accessibility size={14} className="text-rdc-blue" aria-label={`${lot.pmr_spots} places PMR`} />}
                  </div>

                  <Button onClick={() => setSelectedLot(lot)}
                    className="mt-auto w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white">
                    {t('parking.reserve')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info strip */}
      <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">{t('stat.parking.infoTitle')}</p>
        <p>{t('stat.parking.infoDesc')}</p>
      </div>

      <ParkingReservationModal lot={selectedLot} open={!!selectedLot} onClose={() => setSelectedLot(null)} />
    </div>
  );
}
