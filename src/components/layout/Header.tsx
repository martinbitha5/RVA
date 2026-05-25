import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Search, Menu, X, User, Plane, ChevronDown,
  ParkingCircle, UtensilsCrossed, MapPin, Building2, Users,
  ShoppingBag, Info,
} from 'lucide-react';
// Plane is used in NAV_ITEMS — logo uses the RVA image instead
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

/* ─── Logo desktop ─────────────────────────────────────────── */
function FihLogo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="Aéroport International de N'djili — Accueil"
      className="flex items-center gap-3 shrink-0 group">
      {/* Logo RVA */}
      <img
        src="/rva-logo.png"
        alt="RVA"
        className={cn('h-9 w-auto object-contain transition-opacity group-hover:opacity-80', light ? 'brightness-0 invert' : '')}
      />
      {/* Séparateur */}
      <div className={cn('h-8 w-px', light ? 'bg-white/20' : 'bg-[#D8E0ED]')} />
      {/* FIH + texte */}
      <span className={cn(
        'font-display text-[32px] sm:text-[36px] font-black leading-none tracking-tight transition-colors',
        light ? 'text-rdc-yellow group-hover:text-white' : 'text-rdc-blue group-hover:text-rdc-blue/80',
      )}>
        FIH
      </span>
      <div className="leading-[1.2] text-[11px]">
        <p className={cn('font-normal', light ? 'text-white/60' : 'text-rdc-anthracite/50')}>Aéroport</p>
        <p className={cn('font-normal', light ? 'text-white/60' : 'text-rdc-anthracite/50')}>International</p>
        <p className={cn('font-bold',   light ? 'text-white'    : 'text-rdc-anthracite')}>de N&apos;djili</p>
      </div>
    </Link>
  );
}

/* ─── Mobile logo ───────────────────────────────────────────── */
function FihLogoMobile() {
  return (
    <Link to="/" aria-label="Aéroport International de N'djili — Accueil"
      className="flex items-center gap-2.5 shrink-0">
      <img src="/rva-logo.png" alt="RVA" className="h-8 w-auto object-contain" />
      <div className="h-7 w-px bg-[#D8E0ED]" />
      <span className="font-display text-[34px] font-black leading-none text-rdc-blue tracking-tight">
        FIH
      </span>
      <div className="leading-[1.15] text-[11px] text-rdc-anthracite">
        <p className="font-normal">Aéroport</p>
        <p className="font-normal">International</p>
        <p className="font-bold">de N&apos;djili</p>
      </div>
    </Link>
  );
}

/* ─── Nav data ──────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    key: 'flights',
    Icon: Plane,
    links: [
      { href: '/vols/departs',              label: 'Départs' },
      { href: '/vols/arrivees',             label: 'Arrivées' },
      { href: '/vols/compagnies-aeriennes', label: 'Compagnies aériennes' },
      { href: '/vols/alertes-whatsapp',      label: 'Alertes WhatsApp' },
      { href: '/vols/temps-attente',        label: 'Temps d\'attente' },
      { href: '/vols/plans-aerogares',      label: 'Plans des aérogares' },
    ],
  },
  {
    key: 'parking',
    Icon: ParkingCircle,
    links: [
      { href: '/stationnement-transport/formulaire', label: 'Stationnement FIH' },
      { href: '/stationnement-transport/offres',            label: 'Offres & Tarifs' },
      { href: '/stationnement-transport/taxis',             label: 'Taxis agréés' },
      { href: '/stationnement-transport/transcom-bus',      label: 'Transco / Bus' },
      { href: '/stationnement-transport/location-voitures', label: 'Location voitures' },
    ],
  },
  {
    key: 'shops',
    Icon: UtensilsCrossed,
    links: [
      { href: '/boutiques-restaurants/repertoire',    label: 'Répertoire' },
      { href: '/boutiques-restaurants/restaurants',   label: 'Restaurants' },
      { href: '/boutiques-restaurants/boutiques',     label: 'Boutiques' },
      { href: '/boutiques-restaurants/echange-devises', label: 'Bureaux de change' },
      { href: '/boutiques-restaurants/hors-taxes',    label: 'Hors-taxes' },
      { href: '/boutiques-restaurants/salons',        label: 'Salons VIP' },
    ],
  },
  {
    key: 'guide',
    Icon: MapPin,
    links: [
      { href: '/guide/quitter-kinshasa',    label: 'Quitter Kinshasa' },
      { href: '/guide/atterrir-kinshasa',   label: 'Atterrir à Kinshasa' },
      { href: '/guide/douanes-immigration', label: 'Douanes & Immigration' },
      { href: '/guide/securite-bagages',    label: 'Sécurité & Bagages' },
      { href: '/guide/sante',               label: 'Santé & Vaccinations' },
      { href: '/guide/wifi-connectivite',   label: 'Wi-Fi & Connectivité' },
    ],
  },
  {
    key: 'corporate',
    Icon: Building2,
    links: [
      { href: '/corporate/a-propos',                label: 'À propos de la RVA' },
      { href: '/corporate/gouvernance',             label: 'Gouvernance' },
      { href: '/corporate/projets-avenir',          label: 'Projets d\'avenir' },
      { href: '/corporate/historique',              label: 'Historique' },
      { href: '/corporate/carriere',                label: 'Carrières' },
      { href: '/corporate/partenariats-commerciaux', label: 'Partenariats' },
    ],
  },
  {
    key: 'community',
    Icon: Users,
    links: [
      { href: '/communaute/environnement-durabilite', label: 'Environnement & Durabilité' },
      { href: '/communaute/environnement-sonore',     label: 'Environnement sonore' },
      { href: '/communaute/travaux-pistes',           label: 'Travaux sur pistes' },
      { href: '/communaute/relations-communaute',     label: 'Relations communautaires' },
    ],
  },
] as const;

const NAV_LABEL_KEYS: Record<string, string> = {
  flights:   'nav.flights',
  parking:   'nav.parkingTransport',
  shops:     'nav.shopsRestaurants',
  guide:     'nav.guide',
  corporate: 'nav.corporate',
  community: 'nav.community',
};

/** Correspondance href → clé i18n pour les liens des dropdowns */
const NAV_LINK_KEYS: Record<string, string> = {
  '/vols/departs':                                  'flights.departures',
  '/vols/arrivees':                                 'flights.arrivals',
  '/vols/compagnies-aeriennes':                     'flights.airlines',
  '/vols/alertes-whatsapp':                         'flights.smsAlerts',
  '/vols/temps-attente':                            'flights.waitTimes',
  '/vols/plans-aerogares':                          'flights.terminalMaps',
  '/stationnement-transport/stationnement-fih':     'parking.parkingFih',
  '/stationnement-transport/offres':                'parking.offers',
  '/stationnement-transport/taxis':                 'parking.taxis',
  '/stationnement-transport/transcom-bus':          'parking.bus',
  '/stationnement-transport/location-voitures':     'parking.carRental',
  '/boutiques-restaurants/repertoire':              'shops.directory',
  '/boutiques-restaurants/restaurants':             'shops.restaurants',
  '/boutiques-restaurants/boutiques':               'shops.shops',
  '/boutiques-restaurants/echange-devises':         'shops.currencyExchange',
  '/boutiques-restaurants/hors-taxes':              'shops.dutyFree',
  '/boutiques-restaurants/salons':                  'shops.lounges',
  '/guide/quitter-kinshasa':                        'guide.leavingKinshasa',
  '/guide/atterrir-kinshasa':                       'guide.arrivingKinshasa',
  '/guide/douanes-immigration':                     'guide.customsImmigration',
  '/guide/securite-bagages':                        'guide.luggageSecurity',
  '/guide/sante':                                   'guide.health',
  '/guide/wifi-connectivite':                       'guide.wifiConnectivity',
  '/corporate/a-propos':                            'corporate.about',
  '/corporate/gouvernance':                         'corporate.governance',
  '/corporate/projets-avenir':                      'corporate.futureProjects',
  '/corporate/historique':                          'corporate.history',
  '/corporate/carriere':                            'corporate.careers',
  '/corporate/partenariats-commerciaux':            'corporate.partnerships',
  '/communaute/environnement-durabilite':           'community.environmentSustainability',
  '/communaute/environnement-sonore':               'community.noiseEnvironment',
  '/communaute/travaux-pistes':                     'community.runwayWorks',
  '/communaute/relations-communaute':               'community.communityRelations',
};

/* ─── Desktop dropdown ──────────────────────────────────────── */
function NavDropdown({ item, scrolled }: { item: typeof NAV_ITEMS[number]; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={cn(
          'flex items-center gap-1 text-sm font-medium py-1 transition-colors relative group',
          scrolled
            ? open ? 'text-rdc-blue' : 'text-rdc-anthracite hover:text-rdc-blue'
            : open ? 'text-rdc-yellow' : 'text-white hover:text-rdc-yellow',
        )}
        aria-expanded={open}
      >
        {t(NAV_LABEL_KEYS[item.key] ?? item.key)}
        <ChevronDown size={13} className={cn('transition-transform duration-200', open && 'rotate-180')} />
        <span className={cn(
          'absolute -bottom-1 left-0 h-px transition-all duration-300',
          scrolled ? 'bg-rdc-blue' : 'bg-rdc-yellow',
          open ? 'w-full' : 'w-0 group-hover:w-full',
        )} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 bg-white shadow-premium-lg ring-1 ring-black/5">
          <div className="h-0.5 bg-rdc-blue" />
          <div className="py-2">
            {item.links.map(link => (
              <Link key={link.href} to={link.href as never}
                className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-rdc-blue hover:text-white transition-colors">
                {t(NAV_LINK_KEYS[link.href] ?? link.label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Search Dialog ─────────────────────────────────────────── */
function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0 overflow-hidden" aria-describedby={undefined}>
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <DialogTitle className="text-base font-semibold">{t('search.title')}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input autoFocus placeholder={t('search.placeholder')} className="pl-9 h-11 text-sm" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['SN491', 'Lubumbashi', 'Stationnement', 'Taxis', 'Visa'].map(s => (
              <button key={s}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-rdc-blue hover:text-rdc-blue transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Mobile accordion nav item ─────────────────────────────── */
function MobileNavItem({ item, onClose }: { item: typeof NAV_ITEMS[number]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between px-0 py-4 text-sm font-semibold text-white">
        <span className="flex items-center gap-3">
          <item.Icon size={15} className="text-rdc-yellow shrink-0" />
          {t(NAV_LABEL_KEYS[item.key] ?? item.key)}
        </span>
        <ChevronDown size={14} className={cn('text-white/40 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="pb-3 pl-7 space-y-0.5">
          {item.links.map(link => (
            <Link key={link.href} to={link.href as never} onClick={onClose}
              className="block py-2 text-sm text-white/60 hover:text-white transition-colors">
              {t(NAV_LINK_KEYS[link.href] ?? link.label)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Header ───────────────────────────────────────────── */
export function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-rdc-blue focus:px-4 focus:py-2 focus:text-white">
        {t('accessibility.skipToContent')}
      </a>

      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        // Mobile : toujours blanc. Desktop : transparent en haut, blanc au scroll.
        scrolled
          ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-white md:bg-gradient-to-b md:from-black/60 md:to-transparent',
      )}>
        {/* ─── Mobile compact icon bar (scrolled state only) ─── */}
        <div className={cn(
          'md:hidden transition-opacity duration-200',
          scrolled ? 'block' : 'hidden',
        )}>
          <nav className="flex h-14 items-stretch" aria-label="Navigation rapide">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="flex-1 flex items-center justify-center text-rdc-anthracite active:bg-gray-100 border-r border-gray-200">
              <Menu size={22} strokeWidth={2.2} />
            </button>
            <Link to={'/vols/departs' as never} aria-label="Vols"
              className="flex-1 flex items-center justify-center text-rdc-anthracite active:bg-gray-100 border-r border-gray-200">
              <Plane size={20} strokeWidth={2} />
            </Link>
            <Link to={'/stationnement-transport/formulaire' as never} aria-label="Stationnement"
              className="flex-1 flex items-center justify-center text-rdc-anthracite active:bg-gray-100 border-r border-gray-200 font-display text-[22px] font-bold leading-none">
              P
            </Link>
            <Link to={'/boutiques-restaurants/repertoire' as never} aria-label="Boutiques et restaurants"
              className="flex-1 flex items-center justify-center text-rdc-anthracite active:bg-gray-100 border-r border-gray-200">
              <ShoppingBag size={20} strokeWidth={2} />
            </Link>
            <div className="flex-1 flex items-center justify-center">
              <Link to={'/guide' as never} aria-label="Guide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-rdc-anthracite text-white active:bg-black">
                <Info size={18} strokeWidth={2.2} />
              </Link>
            </div>
          </nav>
        </div>

        {/* ─── Mobile top-of-page header (style YUL : menu | FIH logo | recherche) ─── */}
        <div className={cn(
          'md:hidden',
          scrolled ? 'hidden' : 'block',
        )}>
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center text-rdc-anthracite active:bg-gray-100 -ml-2">
              <Menu size={24} strokeWidth={2.2} />
            </button>

            <FihLogoMobile />

            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher"
              className="flex h-10 w-10 items-center justify-center text-rdc-anthracite active:bg-gray-100 -mr-2">
              <Search size={22} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* ─── Desktop / tablet header (≥md) ─── */}
        <div className="container hidden md:block">
          <div className="flex h-[70px] items-center justify-between gap-6">

            {/* Logo */}
            <FihLogo light={!scrolled} />

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-7" aria-label="Navigation principale">
              {NAV_ITEMS.map(item => (
                <NavDropdown key={item.key} item={item} scrolled={scrolled} />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className={cn(
                  'flex h-9 w-9 items-center justify-center transition-colors',
                  scrolled ? 'text-gray-600 hover:text-rdc-blue' : 'text-white/80 hover:text-white',
                )}>
                <Search size={18} />
              </button>

              <LanguageSwitcher
                className={cn(scrolled ? '' : '[&_button]:text-white/80 [&_button]:hover:text-white')}
              />

              <Link to={'/compte' as never}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ml-2',
                  scrolled
                    ? 'bg-rdc-blue text-white hover:bg-rdc-blue-dark'
                    : 'bg-white text-rdc-anthracite hover:bg-rdc-yellow',
                )}>
                <User size={13} />
                <span className="hidden lg:inline">Espace Client</span>
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
                className={cn(
                  'flex xl:hidden h-9 w-9 items-center justify-center transition-colors ml-1',
                  scrolled ? 'text-gray-700 hover:text-rdc-blue' : 'text-white',
                )}>
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full max-w-sm bg-rdc-anthracite border-0 overflow-y-auto p-0" aria-describedby={undefined}>
          <SheetHeader className="flex-row items-center justify-between px-6 py-5 border-b border-white/10">
            <SheetTitle asChild><FihLogo light /></SheetTitle>
            <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
              <X size={20} />
            </button>
          </SheetHeader>

          {/* Search */}
          <div className="px-6 py-4 border-b border-white/10">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                placeholder={t('common.search')}
                className="w-full bg-white/10 border border-white/20 text-white text-sm pl-9 pr-3 py-2.5 placeholder:text-white/30 focus:outline-none focus:border-rdc-yellow"
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                readOnly
              />
            </div>
          </div>

          {/* Nav */}
          <div className="px-6 py-2">
            {NAV_ITEMS.map(item => (
              <MobileNavItem key={item.key} item={item} onClose={() => setMobileOpen(false)} />
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-5 border-t border-white/10 space-y-3">
            <LanguageSwitcher variant="mobile" />
            <Link to={'/compte' as never} onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 bg-rdc-blue text-white font-bold text-sm py-3 tracking-wide hover:bg-rdc-blue-dark transition-colors">
              <User size={15} />
              {t('nav.clientSpace')}
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
