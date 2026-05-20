import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Smartphone } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useParkingAvailability } from '@/lib/queries';

export const Route = createFileRoute('/stationnement-transport/offres')({
  component: OffresPage,
  head: () => ({ meta: [{ title: "Tarifs & Offres Stationnement — FIH" }] }),
});

const MOBILE_MONEY = [
  { name: 'Airtel Money',   color: 'border-red-400',    logo: '🔴' },
  { name: 'M-Pesa Vodacom', color: 'border-green-500',  logo: '🟢' },
  { name: 'Orange Money',   color: 'border-orange-400', logo: '🟠' },
];

function OffresPage() {
  const { t } = useTranslation();
  const { data: lots = [], isLoading } = useParkingAvailability();

  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.offers')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.offres.subtitle')}</p>

      {/* Comparison table */}
      {isLoading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('stat.offres.parking')}</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('parking.hourly')}</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('parking.daily')}</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('parking.weekly')}</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('parking.spots')}</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {lots.map((lot, i) => (
                <tr key={lot.id} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/10'}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-rdc-anthracite">{lot.name}</p>
                    <p className="text-xs text-muted-foreground">{lot.code}</p>
                  </td>
                  <td className="px-5 py-4 font-mono font-semibold">
                    {lot.hourly_rate_usd != null ? `$${lot.hourly_rate_usd}` : '—'}
                  </td>
                  <td className="px-5 py-4 font-mono font-semibold">
                    {lot.daily_rate_usd != null ? `$${lot.daily_rate_usd}` : '—'}
                  </td>
                  <td className="px-5 py-4 font-mono font-semibold">
                    {lot.weekly_rate_usd != null ? `$${lot.weekly_rate_usd}` : '—'}
                  </td>
                  <td className="px-5 py-4">{lot.total_spots ?? '—'}</td>
                  <td className="px-5 py-4">
                    <Link to={'/stationnement-transport/stationnement-fih' as never}
                      className="rounded-lg bg-rdc-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-rdc-blue/85">
                      {t('parking.reserve')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Money */}
      <section className="mt-12">
        <h2 className="font-display mb-2 text-xl font-bold text-rdc-anthracite">{t('stat.offres.mobileMoney')}</h2>
        <p className="mb-6 text-sm text-muted-foreground">{t('stat.offres.mobileMoneyDesc')}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {MOBILE_MONEY.map((m) => (
            <div key={m.name} className={`rounded-2xl border-2 ${m.color} bg-white p-5 flex items-center gap-3`}>
              <span className="text-3xl">{m.logo}</span>
              <div>
                <p className="font-semibold text-rdc-anthracite">{m.name}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-rdc-green">
                  <CheckCircle size={11} /> {t('stat.offres.accepted')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions */}
      <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5">
        <h3 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
          <Smartphone size={15} className="text-rdc-blue" /> {t('stat.offres.conditions')}
        </h3>
        <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
          {[1,2,3,4].map((i) => (
            <li key={i}>{t(`stat.offres.condition${i}`)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
