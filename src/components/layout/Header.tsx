import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Menu,
  X,
  User,
  Plane,
  ParkingCircle,
  UtensilsCrossed,
  MapPin,
  Building2,
  Users,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MegaMenu } from './MegaMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

/* ─── FIH Logo ──────────────────────────────────────────────── */
function FihLogo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Aéroport International de N'djili — Accueil"
      className={cn(
        'flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:opacity-90',
        className,
      )}
    >
      {/* Icon mark */}
      <div
        aria-hidden="true"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rdc-blue text-rdc-yellow"
      >
        <Plane size={18} strokeWidth={2.5} className="-rotate-45" />
      </div>
      {/* Text stack */}
      <div className="leading-tight">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Régie des Voies Aériennes
        </p>
        <p className="font-display text-[13px] font-bold leading-none text-rdc-anthracite">
          Aéroport de N&apos;djili{' '}
          <span className="text-rdc-blue">· FIH</span>
        </p>
      </div>
    </Link>
  );
}

/* ─── Mobile nav item ───────────────────────────────────────── */
interface MobileNavSectionProps {
  icon: React.ReactNode;
  label: string;
  links: { href: string; label: string }[];
  onClose: () => void;
}

function MobileNavSection({
  icon,
  label,
  links,
  onClose,
}: MobileNavSectionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-2 py-4 text-left text-sm font-semibold text-rdc-anthracite"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-rdc-blue">
            {icon}
          </span>
          {label}
        </span>
        <ChevronRight
          size={16}
          className={cn('text-muted-foreground transition-transform', open && 'rotate-90')}
        />
      </button>
      {open && (
        <ul className="mb-3 ml-11 space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href as never}
                onClick={onClose}
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Search Dialog ─────────────────────────────────────────── */
function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-display text-lg">
            {t('search.title')}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              autoFocus
              placeholder={t('search.placeholder')}
              className="pl-9 text-base"
            />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            {t('search.recentSearches')}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['SN491', 'Paris CDG', 'Lubumbashi', 'Stationnement P1', 'Taxis'].map(
              (s) => (
                <button
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-rdc-blue hover:text-rdc-blue transition-colors"
                >
                  {s}
                </button>
              ),
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Header ────────────────────────────────────────────────── */
export function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const mobileNavSections = [
    {
      icon: <Plane size={16} />,
      label: t('nav.flights'),
      links: [
        { href: '/vols/departs', label: t('flights.departures') },
        { href: '/vols/arrivees', label: t('flights.arrivals') },
        { href: '/vols/compagnies-aeriennes', label: t('flights.airlines') },
        { href: '/vols/alertes-sms', label: t('flights.smsAlerts') },
        { href: '/vols/temps-attente', label: t('flights.waitTimes') },
        { href: '/vols/plans-aerogares', label: t('flights.terminalMaps') },
      ],
    },
    {
      icon: <ParkingCircle size={16} />,
      label: t('nav.parkingTransport'),
      links: [
        { href: '/stationnement-transport/stationnement-fih', label: t('parking.parkingFih') },
        { href: '/stationnement-transport/offres', label: t('parking.offers') },
        { href: '/stationnement-transport/taxis', label: t('parking.taxis') },
        { href: '/stationnement-transport/transcom-bus', label: t('parking.bus') },
        { href: '/stationnement-transport/navettes', label: t('parking.shuttles') },
        { href: '/stationnement-transport/location-voitures', label: t('parking.carRental') },
      ],
    },
    {
      icon: <UtensilsCrossed size={16} />,
      label: t('nav.shopsRestaurants'),
      links: [
        { href: '/boutiques-restaurants/repertoire', label: t('shops.directory') },
        { href: '/boutiques-restaurants/restaurants', label: t('shops.restaurants') },
        { href: '/boutiques-restaurants/boutiques', label: t('shops.shops') },
        { href: '/boutiques-restaurants/echange-devises', label: t('shops.currencyExchange') },
        { href: '/boutiques-restaurants/hors-taxes', label: t('shops.dutyFree') },
        { href: '/boutiques-restaurants/salons', label: t('shops.lounges') },
      ],
    },
    {
      icon: <MapPin size={16} />,
      label: t('nav.guide'),
      links: [
        { href: '/guide/quitter-kinshasa', label: t('guide.leavingKinshasa') },
        { href: '/guide/atterrir-kinshasa', label: t('guide.arrivingKinshasa') },
        { href: '/guide/douanes-immigration', label: t('guide.customsImmigration') },
        { href: '/guide/sante', label: t('guide.health') },
        { href: '/guide/wifi-connectivite', label: t('guide.wifiConnectivity') },
        { href: '/guide/services-bancaires', label: t('guide.bankingServices') },
      ],
    },
    {
      icon: <Building2 size={16} />,
      label: t('nav.corporate'),
      links: [
        { href: '/corporate/a-propos', label: t('corporate.about') },
        { href: '/corporate/gouvernance', label: t('corporate.governance') },
        { href: '/corporate/historique', label: t('corporate.history') },
        { href: '/corporate/carriere/offres-emploi', label: t('corporate.jobOffers') },
        { href: '/corporate/partenariats-commerciaux/apercu-fih', label: t('corporate.partnerships') },
      ],
    },
    {
      icon: <Users size={16} />,
      label: t('nav.community'),
      links: [
        { href: '/communaute/environnement-durabilite', label: t('community.environmentSustainability') },
        { href: '/communaute/environnement-sonore/plaintes', label: t('community.noiseComplaints') },
        { href: '/communaute/relations-communaute/initiatives', label: t('community.initiatives') },
        { href: '/communaute/relations-communaute/fih-art', label: t('community.fihArt') },
      ],
    },
  ];

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-rdc-blue focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        {t('accessibility.skipToContent')}
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <FihLogo className="flex-shrink-0" />

          {/* Desktop mega-menu — hidden on mobile */}
          <nav
            className="hidden xl:flex flex-1 justify-center"
            aria-label="Navigation principale"
          >
            <MegaMenu />
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('nav.searchAria')}
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search size={18} />
            </Button>

            {/* Language switcher — desktop */}
            <LanguageSwitcher className="hidden sm:flex" />

            {/* Espace Client — desktop */}
            <Button
              variant="default"
              size="sm"
              asChild
              className="hidden md:inline-flex bg-rdc-blue hover:bg-rdc-blue-dark text-white gap-1.5"
            >
              <Link to={'/compte' as never}>
                <User size={14} />
                <span className="hidden lg:inline">{t('nav.clientSpace')}</span>
              </Link>
            </Button>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? t('nav.closeMenuAria') : t('nav.menuAria')}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="xl:hidden text-muted-foreground hover:text-foreground"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
          <SheetHeader className="border-b border-border px-5 py-4">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <FihLogo />
          </SheetHeader>

          <div className="px-5 py-2">
            {/* Search in mobile */}
            <div className="relative my-4">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder={t('search.placeholder')}
                className="pl-8 text-sm"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                readOnly
              />
            </div>

            {/* Language */}
            <LanguageSwitcher variant="mobile" className="mb-4" />

            {/* Nav sections */}
            {mobileNavSections.map((section) => (
              <MobileNavSection
                key={section.label}
                icon={section.icon}
                label={section.label}
                links={section.links}
                onClose={() => setMobileOpen(false)}
              />
            ))}

            {/* Espace Client CTA */}
            <div className="pt-4">
              <Button
                asChild
                className="w-full bg-rdc-blue hover:bg-rdc-blue-dark text-white gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <Link to={'/compte' as never}>
                  <User size={16} />
                  {t('nav.clientSpace')}
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
