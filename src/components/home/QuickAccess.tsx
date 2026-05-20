import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  ParkingCircle,
  Map,
  Smartphone,
  Car,
  Syringe,
  Phone,
  Clock,
  Wifi,
} from 'lucide-react';

interface QuickCard {
  icon: React.ElementType;
  labelKey: string;
  href: string;
  color: string;
}

const CARDS: QuickCard[] = [
  { icon: ParkingCircle, labelKey: 'home.quickAccess.parking',     href: '/stationnement-transport/stationnement-fih', color: 'text-rdc-blue' },
  { icon: Map,           labelKey: 'home.quickAccess.map',         href: '/vols/plans-aerogares',                     color: 'text-rdc-green' },
  { icon: Smartphone,    labelKey: 'home.quickAccess.mobileMoney', href: '/stationnement-transport/offres',            color: 'text-amber-600' },
  { icon: Car,           labelKey: 'home.quickAccess.taxis',       href: '/stationnement-transport/taxis',             color: 'text-rdc-anthracite' },
  { icon: Syringe,       labelKey: 'home.quickAccess.visaVaccines',href: '/guide/sante',                              color: 'text-red-600' },
  { icon: Wifi,          labelKey: 'home.quickAccess.wifi',        href: '/guide/wifi-connectivite',                   color: 'text-purple-600' },
  { icon: Clock,         labelKey: 'home.quickAccess.waitTimes',   href: '/vols/temps-attente',                        color: 'text-orange-600' },
  { icon: Phone,         labelKey: 'home.quickAccess.contact',     href: '/contact',                                   color: 'text-rdc-green' },
];

export function QuickAccess() {
  const { t } = useTranslation();

  return (
    <section className="container py-12">
      <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {t('home.quickAccess.title')}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            to={card.href as never}
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-rdc-blue/30 hover:bg-rdc-blue/5 hover:shadow-md"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-transform group-hover:-translate-y-0.5 ${card.color}`}
            >
              <card.icon size={20} />
            </div>
            <span className="text-xs font-medium leading-tight text-foreground">
              {t(card.labelKey)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
