import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { UtensilsCrossed, ShoppingBag, Coffee, ArrowRightLeft, Package, Crown } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/')({
  component: BoutiquesRestaurantsHub,
  head: () => ({ meta: [
    { title: "Boutiques & Restaurants — Aéroport N'djili · FIH" },
    { name: 'description', content: 'Découvrez les boutiques, restaurants, bars et services dans les terminaux de l\'Aéroport International de N\'djili (FIH).' },
  ]}),
});

const CARDS = [
  { key: 'directory',       href: '/boutiques-restaurants/repertoire',      Icon: ShoppingBag,     color: 'bg-rdc-blue/10 text-rdc-blue' },
  { key: 'restaurants',     href: '/boutiques-restaurants/restaurants',      Icon: UtensilsCrossed, color: 'bg-rdc-green/10 text-rdc-green' },
  { key: 'shops',           href: '/boutiques-restaurants/boutiques',        Icon: ShoppingBag,     color: 'bg-rdc-yellow/20 text-rdc-anthracite' },
  { key: 'barsCafes',       href: '/boutiques-restaurants/bars-cafes',       Icon: Coffee,          color: 'bg-amber-100 text-amber-700' },
  { key: 'currencyExchange',href: '/boutiques-restaurants/echange-devises',  Icon: ArrowRightLeft,  color: 'bg-emerald-100 text-emerald-700' },
  { key: 'dutyFree',        href: '/boutiques-restaurants/hors-taxes',       Icon: Package,         color: 'bg-purple-100 text-purple-700' },
  { key: 'lounges',         href: '/boutiques-restaurants/salons',           Icon: Crown,           color: 'bg-rdc-yellow/30 text-rdc-anthracite' },
] as const;

function BoutiquesRestaurantsHub() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.hubTitle')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('shops.hubSubtitle')}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARDS.map(({ key, href, Icon, color }) => (
          <Link key={key} to={href as never}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-rdc-blue/30 transition-all">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`shops.${key}`)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{t(`shops.${key}Desc`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
