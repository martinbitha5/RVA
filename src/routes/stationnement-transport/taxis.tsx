import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Car, Phone, MapPin, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/taxis')({
  component: TaxisPage,
  head: () => ({ meta: [{ title: "Taxis officiels — Aéroport N'djili · FIH" }] }),
});

const OPERATORS = [
  { name: 'Taxi RVA Officiel', phone: '+243 81 XXX XXXX', zone: 'Zone dépose T1', badge: true },
  { name: 'Kinatrans',         phone: '+243 89 XXX XXXX', zone: 'Zone dépose T1/T2', badge: true },
  { name: 'City Cab Kinshasa', phone: '+243 97 XXX XXXX', zone: 'Zone dépose T2', badge: true },
];

function TaxisPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.taxis')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('stat.taxis.subtitle')}</p>

      {/* Warning informal taxis */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-amber-600" />
        <div>
          <p className="font-semibold text-amber-800 text-sm">{t('stat.taxis.warning')}</p>
          <p className="mt-1 text-xs text-amber-700">{t('stat.taxis.warningDesc')}</p>
        </div>
      </div>

      {/* Operators */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {OPERATORS.map((op) => (
          <div key={op.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
                <Car size={18} className="text-rdc-blue" />
              </div>
              {op.badge && (
                <span className="flex items-center gap-1 rounded-full bg-rdc-green/10 px-2 py-0.5 text-[10px] font-semibold text-rdc-green">
                  <Shield size={9} /> {t('stat.taxis.official')}
                </span>
              )}
            </div>
            <p className="font-semibold text-rdc-anthracite">{op.name}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Phone size={11} />
              <a href={`tel:${op.phone}`} className="hover:text-rdc-blue">{op.phone}</a>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={11} /> {op.zone}
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">{t('stat.taxis.howTitle')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[1,2,3,4].map((i) => (
          <div key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-rdc-blue text-xs font-bold text-white">{i}</div>
            <p className="text-sm text-muted-foreground">{t(`stat.taxis.step${i}`)}</p>
          </div>
        ))}
      </div>

      {/* Tariffs info */}
      <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
          <CheckCircle size={14} className="text-rdc-green" /> {t('stat.taxis.tariffTitle')}
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 text-sm">
          {[
            { zone: 'FIH → Gombe (Centre-ville)', price: '$15–25 USD' },
            { zone: 'FIH → Lemba',               price: '$10–15 USD' },
            { zone: 'FIH → Kintambo',             price: '$20–30 USD' },
            { zone: 'FIH → Limete',               price: '$12–18 USD' },
          ].map((z) => (
            <div key={z.zone} className="flex justify-between rounded-lg bg-white px-4 py-2.5 border border-border">
              <span className="text-muted-foreground">{z.zone}</span>
              <span className="font-semibold text-rdc-anthracite">{z.price}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t('stat.taxis.tariffNote')}</p>
      </div>
    </div>
  );
}
