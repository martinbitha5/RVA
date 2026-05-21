import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Plane, ParkingCircle, UtensilsCrossed, MapPin, Building2, Users, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Plane,
    titleKey: 'nav.flights',
    descKey: 'home.services.flights',
    href: '/vols',
    /* Deep night blue */
    bg: 'linear-gradient(135deg, #060D1E 0%, #001E6E 100%)',
    tag: 'Temps réel',
  },
  {
    icon: ParkingCircle,
    titleKey: 'nav.parkingTransport',
    descKey: 'home.services.parking',
    href: '/stationnement-transport',
    bg: 'linear-gradient(135deg, #003DA5 0%, #0048C8 100%)',
    tag: 'Réservation',
  },
  {
    icon: UtensilsCrossed,
    titleKey: 'nav.shopsRestaurants',
    descKey: 'home.services.shops',
    href: '/boutiques-restaurants',
    bg: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
    tag: 'Répertoire',
  },
  {
    icon: MapPin,
    titleKey: 'nav.guide',
    descKey: 'home.services.guide',
    href: '/guide',
    bg: 'linear-gradient(135deg, #003DA5 0%, #002070 100%)',
    tag: 'Passagers',
  },
  {
    icon: Building2,
    titleKey: 'nav.corporate',
    descKey: 'home.services.corporate',
    href: '/corporate',
    bg: 'linear-gradient(135deg, #060D1E 0%, #0D1B3E 100%)',
    tag: 'RVA',
  },
  {
    icon: Users,
    titleKey: 'nav.community',
    descKey: 'home.services.community',
    href: '/communaute',
    bg: 'linear-gradient(135deg, #003DA5 0%, #001E6E 100%)',
    tag: 'Nsele · Masina',
  },
] as const;

export function ServicesGrid() {
  const { t } = useTranslation();

  return (
    <section className="section-muted py-20 lg:py-28">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-blue">{t('home.services.eyebrow')}</p>
            </div>
            <h2 className="display-sub text-rdc-anthracite">{t('home.services.title')}</h2>
          </div>
        </div>

        {/* Grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-border">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              to={s.href as never}
              className="group relative flex flex-col justify-between overflow-hidden p-8 min-h-[220px] transition-all"
              style={{ background: s.bg }}
            >
              {/* Tag */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
                  {s.tag}
                </span>
                <ArrowRight
                  size={16}
                  className="text-white/20 transition-all duration-300 group-hover:text-rdc-yellow group-hover:translate-x-1"
                />
              </div>

              {/* Icon + Title */}
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-white/15 transition-colors group-hover:border-rdc-yellow/40">
                  <s.icon size={20} className="text-white/70 group-hover:text-rdc-yellow transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold text-white leading-tight">
                  {t(s.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45 line-clamp-2">
                  {t(s.descKey)}
                </p>
              </div>

              {/* Bottom hover bar */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-rdc-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
