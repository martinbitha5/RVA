import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

/* ─── Nav link helper ──────────────────────────────────────── */
interface NavLinkProps {
  href: string;
  label: string;
  description?: string;
  className?: string;
}

function NavItem({ href, label, description, className }: NavLinkProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href as never}
          className={cn(
            'block select-none rounded-md px-3 py-2.5 transition-colors',
            'hover:bg-muted focus:bg-muted focus:outline-none',
            'text-sm font-medium text-foreground leading-tight',
            description && 'py-3',
            className,
          )}
        >
          {label}
          {description && (
            <span className="mt-0.5 block text-xs font-normal text-muted-foreground leading-snug">
              {description}
            </span>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function ColumnHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground',
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ─── Section menus ────────────────────────────────────────── */
function VolsMenu() {
  const { t } = useTranslation();
  return (
    <ul className="grid w-64 gap-0.5 p-3">
      <ColumnHeader>{t('nav.flights')}</ColumnHeader>
      <NavItem href="/vols/departs" label={t('flights.departures')} description="Tableau en temps réel" />
      <NavItem href="/vols/arrivees" label={t('flights.arrivals')} description="Mises à jour live" />
      <NavItem href="/vols/compagnies-aeriennes" label={t('flights.airlines')} />
      <NavItem href="/vols/alertes-sms" label={t('flights.smsAlerts')} description="Abonnez-vous aux notifications" />
      <NavItem href="/vols/temps-attente" label={t('flights.waitTimes')} />
      <NavItem href="/vols/plans-aerogares" label={t('flights.terminalMaps')} />
    </ul>
  );
}

function StationnementMenu() {
  const { t } = useTranslation();
  return (
    <div className="grid w-[480px] grid-cols-2 gap-0 p-4">
      <div>
        <ColumnHeader>Stationnement</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/stationnement-transport/stationnement-fih" label={t('parking.parkingFih')} />
          <NavItem href="/stationnement-transport/offres" label={t('parking.offers')} />
          <NavItem href="/stationnement-transport/mobilite-reduite" label={t('parking.reducedMobility')} />
          <NavItem href="/stationnement-transport/depose-recuperation" label={t('parking.dropOff')} />
          <NavItem href="/stationnement-transport/travaux" label={t('parking.works')} />
        </ul>
      </div>
      <div>
        <ColumnHeader>Transport</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/stationnement-transport/taxis" label={t('parking.taxis')} />
          <NavItem href="/stationnement-transport/transcom-bus" label={t('parking.bus')} />
          <NavItem href="/stationnement-transport/navettes" label={t('parking.shuttles')} />
          <NavItem href="/stationnement-transport/covoiturage" label={t('parking.carpooling')} />
          <NavItem href="/stationnement-transport/limousines" label={t('parking.limousines')} />
          <NavItem href="/stationnement-transport/location-voitures" label={t('parking.carRental')} />
          <NavItem href="/stationnement-transport/boulevard-lumumba" label="Boulevard Lumumba" />
        </ul>
      </div>
    </div>
  );
}

function BoutiquesMenu() {
  const { t } = useTranslation();
  return (
    <ul className="grid w-56 gap-0.5 p-3">
      <ColumnHeader>{t('nav.shopsRestaurants')}</ColumnHeader>
      <NavItem href="/boutiques-restaurants/repertoire" label={t('shops.directory')} description="Tous les commerces par catégorie" />
      <NavItem href="/boutiques-restaurants/restaurants" label={t('shops.restaurants')} />
      <NavItem href="/boutiques-restaurants/boutiques" label={t('shops.shops')} />
      <NavItem href="/boutiques-restaurants/bars-cafes" label={t('shops.barsCafes')} />
      <NavItem href="/boutiques-restaurants/echange-devises" label={t('shops.currencyExchange')} description="USD · EUR · CDF" />
      <NavItem href="/boutiques-restaurants/hors-taxes" label={t('shops.dutyFree')} />
      <NavItem href="/boutiques-restaurants/salons" label={t('shops.lounges')} />
    </ul>
  );
}

function GuideMenu() {
  const { t } = useTranslation();
  return (
    <div className="grid w-[480px] grid-cols-2 gap-0 p-4">
      <div>
        <ColumnHeader>Départ</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/guide/quitter-kinshasa" label={t('guide.leavingKinshasa')} />
          <NavItem href="/guide/fih-express" label={t('guide.fihExpress')} />
          <NavItem href="/guide/securite-bagages" label={t('guide.luggageSecurity')} />
          <NavItem href="/guide/correspondances" label={t('guide.connections')} />
          <NavItem href="/guide/salons" label={t('guide.lounges')} />
        </ul>
      </div>
      <div>
        <ColumnHeader>Arrivée & Services</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/guide/atterrir-kinshasa" label={t('guide.arrivingKinshasa')} />
          <NavItem href="/guide/douanes-immigration" label={t('guide.customsImmigration')} />
          <NavItem href="/guide/sante" label={t('guide.health')} description="Fièvre jaune obligatoire" />
          <NavItem href="/guide/wifi-connectivite" label={t('guide.wifiConnectivity')} />
          <NavItem href="/guide/services-bancaires" label={t('guide.bankingServices')} />
          <NavItem href="/guide/objets-trouves" label={t('guide.lostFound')} />
        </ul>
      </div>
    </div>
  );
}

function CorporateMenu() {
  const { t } = useTranslation();
  return (
    <div className="grid w-[520px] grid-cols-3 gap-0 p-4">
      <div>
        <ColumnHeader>RVA</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/corporate/a-propos" label={t('corporate.about')} />
          <NavItem href="/corporate/gouvernance" label={t('corporate.governance')} />
          <NavItem href="/corporate/historique" label={t('corporate.history')} />
          <NavItem href="/corporate/projets-avenir" label={t('corporate.futureProjects')} />
        </ul>
      </div>
      <div>
        <ColumnHeader>Carrières</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/corporate/carriere/offres-emploi" label={t('corporate.jobOffers')} />
          <NavItem href="/corporate/carriere/communaute-fih" label={t('corporate.community')} />
          <NavItem href="/corporate/carriere/se-developper" label={t('corporate.development')} />
        </ul>
        <ColumnHeader className="mt-3">Services aériens</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/corporate/services-aeriens/fret" label={t('corporate.cargo')} />
          <NavItem href="/corporate/services-aeriens/aviation-commerciale" label={t('corporate.commercialAviation')} />
        </ul>
      </div>
      <div>
        <ColumnHeader>Partenariats</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/corporate/partenariats-commerciaux/apercu-fih" label={t('corporate.fihOverview')} />
          <NavItem href="/corporate/partenariats-commerciaux/concessions" label={t('corporate.concessions')} />
          <NavItem href="/corporate/partenariats-commerciaux/immobilier" label={t('corporate.realEstate')} />
        </ul>
        <ColumnHeader className="mt-3">Sûreté</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/corporate/surete-securite" label={t('corporate.safetyAndSecurity')} />
        </ul>
      </div>
    </div>
  );
}

function CommunauteMenu() {
  const { t } = useTranslation();
  return (
    <div className="grid w-[440px] grid-cols-2 gap-0 p-4">
      <div>
        <ColumnHeader>Environnement</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/communaute/environnement-durabilite" label={t('community.environmentSustainability')} />
          <NavItem href="/communaute/environnement-sonore" label={t('community.noiseEnvironment')} />
          <NavItem href="/communaute/environnement-sonore/plaintes" label={t('community.noiseComplaints')} />
          <NavItem href="/communaute/travaux-pistes" label={t('community.runwayWorks')} />
        </ul>
      </div>
      <div>
        <ColumnHeader>Relations</ColumnHeader>
        <ul className="space-y-0.5">
          <NavItem href="/communaute/relations-communaute" label={t('community.communityRelations')} />
          <NavItem href="/communaute/relations-communaute/consultations" label={t('community.consultations')} />
          <NavItem href="/communaute/relations-communaute/initiatives" label={t('community.initiatives')} description="Nsele · Masina · Kimbanseke" />
          <NavItem href="/communaute/relations-communaute/fih-art" label={t('community.fihArt')} />
        </ul>
      </div>
    </div>
  );
}

/* ─── Main MegaMenu ────────────────────────────────────────── */
export function MegaMenu() {
  const { t } = useTranslation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* VOLS */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium">
            {t('nav.flights')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <VolsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* STATIONNEMENT & TRANSPORT */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium">
            {t('nav.parkingTransport')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <StationnementMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* BOUTIQUES & RESTAURANTS */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium">
            {t('nav.shopsRestaurants')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <BoutiquesMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* GUIDE */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium">
            {t('nav.guide')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <GuideMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* CORPORATE */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium">
            {t('nav.corporate')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CorporateMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* COMMUNAUTÉ */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium">
            {t('nav.community')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CommunauteMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/* Re-export the column header for use in other menus */
export { ColumnHeader, NavItem };
export { navigationMenuTriggerStyle };
