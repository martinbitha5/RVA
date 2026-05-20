import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ParkingCircle, Car, Bus, Truck, Bike, MapPin, ArrowRight, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/')({
  component: StationnementHub,
  head: () => ({ meta: [{ title: "Stationnement & Transport — Aéroport N'djili · FIH" }] }),
});

const CARDS = [
  { icon: ParkingCircle, href: '/stationnement-transport/stationnement-fih', titleKey: 'parking.parkingFih',   descKey: 'stat.hub.parkingDesc',  accent: 'text-rdc-blue bg-rdc-blue/10' },
  { icon: Car,           href: '/stationnement-transport/offres',            titleKey: 'parking.offers',       descKey: 'stat.hub.offersDesc',   accent: 'text-rdc-green bg-rdc-green/10' },
  { icon: Car,           href: '/stationnement-transport/taxis',             titleKey: 'parking.taxis',        descKey: 'stat.hub.taxisDesc',    accent: 'text-amber-600 bg-amber-50' },
  { icon: Bus,           href: '/stationnement-transport/transcom-bus',      titleKey: 'parking.bus',          descKey: 'stat.hub.busDesc',      accent: 'text-blue-600 bg-blue-50' },
  { icon: Truck,         href: '/stationnement-transport/navettes',          titleKey: 'parking.shuttles',     descKey: 'stat.hub.shuttlesDesc', accent: 'text-purple-600 bg-purple-50' },
  { icon: Car,           href: '/stationnement-transport/location-voitures', titleKey: 'parking.carRental',    descKey: 'stat.hub.rentalDesc',   accent: 'text-orange-600 bg-orange-50' },
  { icon: Bike,          href: '/stationnement-transport/mobilite-reduite',  titleKey: 'parking.reducedMobility', descKey: 'stat.hub.pmrDesc',   accent: 'text-teal-600 bg-teal-50' },
  { icon: MapPin,        href: '/stationnement-transport/boulevard-lumumba', titleKey: 'parking.boulevard',    descKey: 'stat.hub.boulevardDesc', accent: 'text-rdc-anthracite bg-muted' },
];

function StationnementHub() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-rdc-anthracite md:text-4xl">{t('stat.hub.title')}</h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">{t('stat.hub.subtitle')}</p>
      </div>

      {/* Works alert */}
      <Link to={'/stationnement-transport/travaux' as never} className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 hover:bg-amber-100 transition-colors">
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-800">{t('stat.hub.worksAlert')}</p>
          <p className="text-xs text-amber-700">{t('stat.hub.worksAlertDesc')}</p>
        </div>
        <ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-amber-600" />
      </Link>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <Link key={c.href} to={c.href as never}
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:border-rdc-blue/30">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${c.accent}`}>
              <c.icon size={18} />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-rdc-anthracite">{t(c.titleKey)}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{t(c.descKey)}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rdc-blue">
                {t('common.learnMore')} <ArrowRight size={11} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
