import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ParkingCircle, Map, Smartphone, Car, Syringe, Wifi, Clock, Phone } from 'lucide-react';

const CARDS = [
  {
    icon: ParkingCircle,
    labelKey: 'home.quickAccess.parking',
    href: '/stationnement-transport/stationnement-fih',
    bg: '#003DA5',
    accent: '#FFCE00',
  },
  {
    icon: Map,
    labelKey: 'home.quickAccess.map',
    href: '/vols/plans-aerogares',
    bg: '#001E6E',
    accent: '#4A90E2',
  },
  {
    icon: Smartphone,
    labelKey: 'home.quickAccess.mobileMoney',
    href: '/stationnement-transport/offres',
    bg: '#009A44',
    accent: '#50E89A',
  },
  {
    icon: Car,
    labelKey: 'home.quickAccess.taxis',
    href: '/stationnement-transport/taxis',
    bg: '#1A1A1A',
    accent: '#FFCE00',
  },
  {
    icon: Syringe,
    labelKey: 'home.quickAccess.visaVaccines',
    href: '/guide/sante',
    bg: '#CE1126',
    accent: '#FF6B7A',
  },
  {
    icon: Wifi,
    labelKey: 'home.quickAccess.wifi',
    href: '/guide/wifi-connectivite',
    bg: '#0D1B3E',
    accent: '#60A5FA',
  },
  {
    icon: Clock,
    labelKey: 'home.quickAccess.waitTimes',
    href: '/vols/temps-attente',
    bg: '#7C2D12',
    accent: '#FB923C',
  },
  {
    icon: Phone,
    labelKey: 'home.quickAccess.contact',
    href: '/contact',
    bg: '#14532D',
    accent: '#4ADE80',
  },
] as const;

export function QuickAccess() {
  const { t } = useTranslation();

  return (
    <section className="section-night py-0">
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 py-10 border-b border-white/10">
          <div className="accent-line" />
          <p className="eyebrow text-rdc-yellow">{t('home.quickAccess.title')}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              to={card.href as never}
              className="group relative flex flex-col items-center justify-center gap-3 py-10 px-4 text-center border-r border-white/8 last:border-r-0 border-b border-b-white/8 sm:border-b-0 transition-all overflow-hidden"
              style={{ background: card.bg }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${card.accent}20, ${card.accent}08)` }} />

              {/* Icon */}
              <div className="relative flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                <card.icon size={22} color={card.accent} strokeWidth={1.5} />
              </div>

              {/* Label */}
              <span className="relative text-xs font-semibold leading-snug text-white/70 group-hover:text-white transition-colors">
                {t(card.labelKey)}
              </span>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                style={{ background: card.accent }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
