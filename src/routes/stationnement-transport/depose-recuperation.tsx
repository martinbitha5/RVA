import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PlaneTakeoff, PlaneLanding, Clock, MapPin, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/depose-recuperation')({
  component: DeposeRecuperationPage,
  head: () => ({ meta: [{ title: "Dépose & Récupération — Aéroport N'djili · FIH" }] }),
});

function DeposeRecuperationPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.dropOff')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.dropoff.subtitle')}</p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dépose */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="bg-rdc-blue px-6 py-4 flex items-center gap-3">
            <PlaneTakeoff size={20} className="text-white" />
            <h2 className="font-display font-semibold text-white">{t('stat.dropoff.deposTitle')}</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
              <div>
                <p className="font-medium text-sm">{t('stat.dropoff.deposZone')}</p>
                <p className="text-xs text-muted-foreground">{t('stat.dropoff.deposZoneDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={15} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
              <div>
                <p className="font-medium text-sm">{t('stat.dropoff.deposTime')}</p>
                <p className="text-xs text-muted-foreground">{t('stat.dropoff.deposTimeDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <AlertTriangle size={14} className="mt-0.5 flex-shrink-0 text-amber-600" />
              <p className="text-xs text-amber-700">{t('stat.dropoff.deposAlert')}</p>
            </div>
          </div>
        </div>

        {/* Récupération */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="bg-rdc-green px-6 py-4 flex items-center gap-3">
            <PlaneLanding size={20} className="text-white" />
            <h2 className="font-display font-semibold text-white">{t('stat.dropoff.pickupTitle')}</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 flex-shrink-0 text-rdc-green" />
              <div>
                <p className="font-medium text-sm">{t('stat.dropoff.pickupZone')}</p>
                <p className="text-xs text-muted-foreground">{t('stat.dropoff.pickupZoneDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={15} className="mt-0.5 flex-shrink-0 text-rdc-green" />
              <div>
                <p className="font-medium text-sm">{t('stat.dropoff.pickupTime')}</p>
                <p className="text-xs text-muted-foreground">{t('stat.dropoff.pickupTimeDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
