import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Plane, ParkingCircle, UtensilsCrossed, MapPin,
  Building2, Users, ArrowRight,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Plane,
    titleKey: 'nav.flights',
    descKey: 'home.services.flights',
    href: '/vols',
    accent: 'border-rdc-blue group-hover:bg-rdc-blue',
  },
  {
    icon: ParkingCircle,
    titleKey: 'nav.parkingTransport',
    descKey: 'home.services.parking',
    href: '/stationnement-transport',
    accent: 'border-rdc-yellow group-hover:bg-rdc-yellow',
  },
  {
    icon: UtensilsCrossed,
    titleKey: 'nav.shopsRestaurants',
    descKey: 'home.services.shops',
    href: '/boutiques-restaurants',
    accent: 'border-rdc-red group-hover:bg-rdc-red',
  },
  {
    icon: MapPin,
    titleKey: 'nav.guide',
    descKey: 'home.services.guide',
    href: '/guide',
    accent: 'border-rdc-green group-hover:bg-rdc-green',
  },
  {
    icon: Building2,
    titleKey: 'nav.corporate',
    descKey: 'home.services.corporate',
    href: '/corporate',
    accent: 'border-rdc-blue group-hover:bg-rdc-blue',
  },
  {
    icon: Users,
    titleKey: 'nav.community',
    descKey: 'home.services.community',
    href: '/communaute',
    accent: 'border-rdc-green group-hover:bg-rdc-green',
  },
];

export function ServicesGrid() {
  const { t } = useTranslation();

  return (
    <section className="container py-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">
          {t('home.services.eyebrow')}
        </p>
        <h2 className="font-display mt-2 text-2xl font-bold text-rdc-anthracite md:text-3xl">
          {t('home.services.title')}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Link
            key={s.href}
            to={s.href as never}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg"
          >
            {/* Left accent bar */}
            <div
              className={`absolute left-0 top-0 h-full w-1 border-l-2 transition-colors ${s.accent}`}
            />

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-rdc-blue transition-colors group-hover:bg-rdc-blue group-hover:text-white">
                <s.icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-rdc-anthracite">{t(s.titleKey)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t(s.descKey)}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rdc-blue">
                  {t('common.learnMore')} <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
