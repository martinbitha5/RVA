import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Car, Bus, Bike, MapPin,
  AlertTriangle, ArrowRight, CreditCard,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/stationnement-transport/')({
  component: StationnementHub,
  head: () => ({
    meta: [{ title: "Stationnement & Transport — Aéroport N'djili · FIH" }],
  }),
});

const PARKING = [
  { code: 'P1', name: 'Parking Court Séjour', rate: '$2/h', spots: 320 },
  { code: 'P2', name: 'Parking Long Séjour', rate: '$15/jour', spots: 480 },
  { code: 'P3', name: 'Parking PMR', rate: 'Gratuit', spots: 24 },
] as const;

const TRANSPORT_DATA = [
  {
    icon: Car,
    href: '/stationnement-transport/taxis',
    labelKey: 'parking.taxis',
    descKey: 'stat.hub.taxisDesc',
    accent: '#FFCE00',
  },
  {
    icon: Bus,
    href: '/stationnement-transport/transcom-bus',
    labelKey: 'parking.bus',
    descKey: 'stat.hub.busDesc',
    accent: '#003DA5',
  },
  {
    icon: Car,
    href: '/stationnement-transport/location-voitures',
    labelKey: 'parking.carRental',
    descKey: 'stat.hub.rentalDesc',
    accent: '#CE1126',
  },
  {
    icon: Bike,
    href: '/stationnement-transport/mobilite-reduite',
    labelKey: 'parking.reducedMobility',
    descKey: 'stat.hub.pmrDesc',
    accent: '#003DA5',
  },
] as const;

function StationnementHub() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t('nav.parkingTransport')}
        title={t('stat.hub.title')}
        subtitle={t('stat.hub.subtitle')}
        breadcrumbs={[{ label: t('home.hero.cta'), href: '/' }, { label: t('nav.parkingTransport') }]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/stationnement-transport/offres' as never} className="btn-primary">
              <CreditCard size={15} /> {t('parking.offers')}
            </Link>
            <Link to={'/stationnement-transport/depose-recuperation' as never} className="btn-outline-white">
              <MapPin size={15} /> {t('parking.dropOff')}
            </Link>
          </div>
        }
      />

      {/* Works alert banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container py-4">
          <Link
            to={'/stationnement-transport/travaux' as never}
            className="flex items-center gap-3 group"
          >
            <AlertTriangle size={16} className="text-amber-600 shrink-0" />
            <p className="text-sm font-semibold text-amber-800 flex-1">
              {t('stat.hub.worksAlert')} — {t('stat.hub.worksAlertDesc')}
            </p>
            <ArrowRight size={14} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Parking availability */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">{t('parking.parkingFih')}</p>
          </div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="display-sub text-rdc-anthracite">Nos parkings officiels</h2>
            <Link
              to={'/stationnement-transport/stationnement-fih' as never}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-rdc-anthracite hover:text-rdc-blue transition-colors group"
            >
              {t('common.learnMore')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-0.5 bg-border sm:grid-cols-3">
            {PARKING.map((p) => (
              <Link
                key={p.code}
                to={'/stationnement-transport/stationnement-fih' as never}
                className="group bg-white px-8 py-10 flex flex-col gap-4 hover:bg-rdc-blue/3 transition-colors relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-rdc-blue transition-all duration-500" />
                <span className="font-display text-5xl font-bold text-rdc-blue/20 leading-none">
                  {p.code}
                </span>
                <div>
                  <h3 className="font-display font-bold text-rdc-anthracite text-lg group-hover:text-rdc-blue transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.spots} {t('parking.spots')} {t('parking.available')}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-display font-bold text-rdc-blue">{p.rate}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('parking.available')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transport options */}
      <section className="section-night py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Options de transport</p>
          </div>
          <h2 className="display-sub text-white mb-12">
            Comment rejoindre Kinshasa
          </h2>

          <div className="grid gap-0.5 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
            {TRANSPORT_DATA.map((s) => (
              <Link
                key={s.href}
                to={s.href as never}
                className="group relative bg-rdc-anthracite p-8 flex flex-col gap-5 overflow-hidden hover:bg-white/5 transition-colors"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: s.accent }}
                />

                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}
                >
                  <s.icon size={22} style={{ color: s.accent }} strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg leading-snug group-hover:text-rdc-yellow transition-colors">
                    {t(s.labelKey)}
                  </h3>
                  <p className="mt-2 text-sm text-white/40 leading-relaxed">{t(s.descKey)}</p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-white/30 group-hover:text-white transition-colors">
                  {t('common.learnMore')}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Boulevard Lumumba CTA */}
      <section className="section-blue py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-yellow">Accès principal</p>
              </div>
              <h2 className="font-display font-bold text-white text-2xl lg:text-3xl">
                {t('parking.boulevard')}
              </h2>
              <p className="mt-3 text-white/60 text-sm max-w-lg">
                {t('stat.blvd.subtitle')}
              </p>
            </div>
            <Link
              to={'/stationnement-transport/boulevard-lumumba' as never}
              className="btn-outline-white shrink-0"
            >
              <MapPin size={15} /> {t('stat.hub.boulevardDesc')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
