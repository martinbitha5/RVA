import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, AlertTriangle, Car, Navigation } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/boulevard-lumumba')({
  component: BoulevardLumumbaPage,
  head: () => ({ meta: [{ title: "Boulevard Lumumba — Accès Aéroport FIH" }] }),
});

const ROUTES = [
  { from: 'Centre-ville (Gombe)',        km: '18 km', time: '25–50 min', via: 'Blvd Lumumba direct' },
  { from: 'Limete / Kingabwa',           km: '12 km', time: '15–30 min', via: 'Route de Matadi puis Blvd Lumumba' },
  { from: 'Lemba / Mont-Ngafula',        km: '22 km', time: '35–60 min', via: 'Av. Kasa-Vubu puis Blvd Lumumba' },
  { from: 'Kintambo / Ngiri-Ngiri',      km: '20 km', time: '30–55 min', via: 'Route de Matadi puis Blvd Lumumba' },
];

function BoulevardLumumbaPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.boulevard')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('stat.blvd.subtitle')}</p>

      {/* Address card */}
      <div className="mb-8 flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-rdc-blue/10">
          <MapPin size={20} className="text-rdc-blue" />
        </div>
        <div>
          <p className="font-semibold text-rdc-anthracite">{t('stat.blvd.addressLabel')}</p>
          <p className="text-sm text-muted-foreground mt-0.5">Boulevard Lumumba, Commune de Nsele, Kinshasa, RDC</p>
          <a href="https://maps.google.com/?q=-4.3857,15.4446" target="_blank" rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rdc-blue hover:text-rdc-blue/80">
            <Navigation size={12} /> {t('stat.blvd.openMaps')}
          </a>
        </div>
      </div>

      {/* Traffic alert */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">{t('stat.blvd.trafficAlert')}</p>
      </div>

      {/* Routes table */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">{t('stat.blvd.routesTitle')}</h2>
      <div className="space-y-3">
        {ROUTES.map((r) => (
          <div key={r.from} className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <div className="flex items-center gap-2 flex-1 min-w-[160px]">
              <Car size={14} className="text-muted-foreground flex-shrink-0" />
              <span className="font-medium text-sm">{r.from}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-[60px]">
              <MapPin size={12} /> {r.km}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-rdc-anthracite min-w-[100px]">
              <Clock size={12} className="text-muted-foreground" /> {r.time}
            </div>
            <p className="text-xs text-muted-foreground flex-1">{r.via}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{t('stat.blvd.timesNote')}</p>
    </div>
  );
}
