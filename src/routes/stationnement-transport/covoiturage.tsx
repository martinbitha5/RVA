import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Users, Smartphone, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/covoiturage')({
  component: CovoituragePage,
  head: () => ({ meta: [{ title: "Covoiturage agréé — Aéroport N'djili · FIH" }] }),
});

const APPS = [
  { name: 'Yango',      logo: '🚗', stores: 'iOS & Android', note: 'Service agréé FIH' },
  { name: 'Uber',       logo: '🚗', stores: 'iOS & Android', note: 'Zone de prise en charge P2' },
  { name: 'FIH Ride',   logo: '🚕', stores: 'Android',       note: 'Application officielle RVA (bêta)' },
];

function CovoituragePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.carpooling')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.carpooling.subtitle')}</p>

      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        {APPS.map((app) => (
          <div key={app.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-3xl">{app.logo}</span>
              <div>
                <p className="font-semibold text-rdc-anthracite">{app.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Smartphone size={10} /> {app.stores}</p>
              </div>
            </div>
            <p className="text-xs rounded-lg bg-muted px-3 py-2 flex items-center gap-1.5">
              <CheckCircle size={11} className="text-rdc-green flex-shrink-0" /> {app.note}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-5">
        <h2 className="font-semibold mb-2 flex items-center gap-2 text-sm">
          <Users size={15} className="text-rdc-blue" /> {t('stat.carpooling.zoneTitle')}
        </h2>
        <p className="text-sm text-muted-foreground">{t('stat.carpooling.zoneDesc')}</p>
      </div>
    </div>
  );
}
