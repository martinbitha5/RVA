import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckCircle2, Smartphone, ArrowRight, Tag, Clock, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHero } from '@/components/ui/page-hero';
import { useParkingAvailability } from '@/lib/queries';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/stationnement-transport/offres')({
  component: OffresPage,
  head: () => ({ meta: [{ title: "Tarifs & Offres Stationnement — FIH" }] }),
});

const MOBILE_MONEY = [
  { name: 'Airtel Money',   dot: 'bg-red-600',    desc: 'Réseau Airtel RDC' },
  { name: 'M-Pesa Vodacom', dot: 'bg-green-600',  desc: 'Réseau Vodacom RDC' },
  { name: 'Orange Money',   dot: 'bg-orange-500', desc: 'Réseau Orange RDC' },
];

const AVANTAGES = [
  { icon: Tag,      title: 'Tarifs fixes garantis', desc: 'Pas de surprise — les tarifs RVA sont affichés et réglementés.' },
  { icon: Clock,    title: 'Parking sécurisé 24h/24', desc: 'Agents de sécurité RVA présents en permanence sur les parkings.' },
  { icon: Calendar, title: 'Abonnements disponibles', desc: 'Réductions pour séjours longue durée — contactez le bureau RVA.' },
  { icon: Smartphone, title: 'Paiement Mobile Money', desc: 'Airtel Money, M-Pesa et Orange Money acceptés aux caisses.' },
];

function OffresPage() {
  const { t } = useTranslation();
  const { data: lots = [], isLoading } = useParkingAvailability();

  return (
    <main id="main-content">

      <PageHero
        eyebrow={t('nav.parkingTransport')}
        title={t('parking.offers')}
        subtitle={t('stat.offres.subtitle')}
        image="/images/fih-bus-cobus.jpg"
        breadcrumbs={[
          { label: t('home.hero.cta'), href: '/' },
          { label: t('nav.parkingTransport'), href: '/stationnement-transport' },
          { label: t('parking.offers') },
        ]}
      />

      <div className="container py-10 md:py-14">

        {/* Avantages */}
        <section className="mb-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Pourquoi choisir FIH</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">Les avantages du stationnement officiel</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
                  <Icon size={18} className="text-rdc-blue" />
                </div>
                <p className="mb-1 font-semibold text-rdc-anthracite text-sm">{title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau tarifaire */}
        <section className="mb-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Tarification officielle</p>
          </div>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-rdc-anthracite">Grille tarifaire RVA</h2>
            <Link to={'/stationnement-transport/formulaire' as never}
              className="hidden items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:underline sm:inline-flex">
              Voir la disponibilité <ArrowRight size={13} />
            </Link>
          </div>

          {isLoading ? (
            <Skeleton className="h-48 rounded-2xl" />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-rdc-anthracite text-white">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">{t('stat.offres.parking')}</th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">{t('parking.hourly')}</th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">{t('parking.daily')}</th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">{t('parking.weekly')}</th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">{t('parking.spots')}</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map((lot, i) => (
                    <tr key={lot.id}
                      className={cn(i % 2 === 0 ? 'bg-white' : 'bg-muted/20', 'border-b border-border last:border-0 transition-colors hover:bg-rdc-blue/3')}>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-rdc-anthracite">{lot.name}</p>
                        <p className="text-xs text-muted-foreground">{lot.code}</p>
                      </td>
                      <td className="px-5 py-4 font-mono font-semibold text-rdc-anthracite">
                        {lot.hourly_rate_usd != null ? `$${lot.hourly_rate_usd}` : '—'}
                      </td>
                      <td className="px-5 py-4 font-mono font-semibold text-rdc-anthracite">
                        {lot.daily_rate_usd != null ? `$${lot.daily_rate_usd}` : '—'}
                      </td>
                      <td className="px-5 py-4 font-mono font-semibold text-rdc-anthracite">
                        {lot.weekly_rate_usd != null ? `$${lot.weekly_rate_usd}` : '—'}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{lot.total_spots ?? '—'}</td>
                      <td className="px-5 py-4">
                        <Link to={'/stationnement-transport/formulaire' as never}
                          className="inline-flex items-center gap-1 rounded-lg bg-rdc-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-rdc-blue/85 transition-colors">
                          {t('parking.reserve')} <ArrowRight size={11} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            * Tarifs en USD. Équivalent CDF disponible aux caisses selon le taux du jour Banque Centrale du Congo.
          </p>
        </section>

        {/* Mobile Money */}
        <section className="mb-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Paiement</p>
          </div>
          <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">{t('stat.offres.mobileMoney')}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {MOBILE_MONEY.map((m) => (
              <div key={m.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
                <span className={`flex h-12 w-12 shrink-0 rounded-full ${m.dot}`} />
                <div>
                  <p className="font-semibold text-rdc-anthracite">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-rdc-green">
                    <CheckCircle2 size={11} /> {t('stat.offres.accepted')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conditions */}
        <div className="rounded-2xl border border-border bg-muted/40 p-6">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-rdc-anthracite">
            <Smartphone size={16} className="text-rdc-blue" /> {t('stat.offres.conditions')}
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-rdc-blue">→</span>{t('stat.offres.condition1')}</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-rdc-blue">→</span>{t('stat.offres.condition2')}</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-rdc-blue">→</span>{t('stat.offres.condition3')}</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-rdc-blue">→</span>{t('stat.offres.condition4')}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
