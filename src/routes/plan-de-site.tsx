import { createFileRoute, Link } from '@tanstack/react-router';
import { Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/plan-de-site')({
  component: PlanDeSitePage,
  head: () => ({ meta: [{ title: "Plan du site — FIH · RVA" }] }),
});

const SECTIONS = [
  {
    title: 'Vols',
    base: '/vols',
    links: [
      { label: 'Départs en temps réel', href: '/vols/departs' },
      { label: 'Arrivées en temps réel', href: '/vols/arrivees' },
      { label: 'Compagnies aériennes', href: '/vols/compagnies-aeriennes' },
      { label: 'Alertes SMS', href: '/vols/alertes-sms' },
      { label: 'Temps d\'attente', href: '/vols/temps-attente' },
      { label: 'Plans des aérogares', href: '/vols/plans-aerogares' },
    ],
  },
  {
    title: 'Stationnement & Transport',
    base: '/stationnement-transport',
    links: [
      { label: 'Stationnement FIH', href: '/stationnement-transport/stationnement-fih' },
      { label: 'Offres & Tarifs', href: '/stationnement-transport/offres' },
      { label: 'Mobilité réduite', href: '/stationnement-transport/mobilite-reduite' },
      { label: 'Dépose & Récupération', href: '/stationnement-transport/depose-recuperation' },
      { label: 'Avis Travaux', href: '/stationnement-transport/travaux' },
      { label: 'Taxis agréés', href: '/stationnement-transport/taxis' },
      { label: 'Transco / Bus', href: '/stationnement-transport/transcom-bus' },
      { label: 'Location voitures', href: '/stationnement-transport/location-voitures' },
      { label: 'Boulevard Lumumba', href: '/stationnement-transport/boulevard-lumumba' },
    ],
  },
  {
    title: 'Boutiques & Restaurants',
    base: '/boutiques-restaurants',
    links: [
      { label: 'Répertoire', href: '/boutiques-restaurants/repertoire' },
      { label: 'Restaurants', href: '/boutiques-restaurants/restaurants' },
      { label: 'Boutiques', href: '/boutiques-restaurants/boutiques' },
      { label: 'Bars & Cafés', href: '/boutiques-restaurants/bars-cafes' },
      { label: 'Bureaux de change', href: '/boutiques-restaurants/echange-devises' },
      { label: 'Hors-taxes', href: '/boutiques-restaurants/hors-taxes' },
      { label: 'Salons VIP', href: '/boutiques-restaurants/salons' },
    ],
  },
  {
    title: 'Guide de l\'aéroport',
    base: '/guide',
    links: [
      { label: 'Quitter Kinshasa', href: '/guide/quitter-kinshasa' },
      { label: 'Sécurité & Bagages', href: '/guide/securite-bagages' },
      { label: 'Atterrir à Kinshasa', href: '/guide/atterrir-kinshasa' },
      { label: 'Douanes & Immigration', href: '/guide/douanes-immigration' },
      { label: 'Correspondances', href: '/guide/correspondances' },
      { label: 'Santé & Vaccinations', href: '/guide/sante' },
      { label: 'Wi-Fi & Connectivité', href: '/guide/wifi-connectivite' },
      { label: 'Services bancaires', href: '/guide/services-bancaires' },
      { label: 'Objets trouvés', href: '/guide/objets-trouves' },
      { label: 'Passagers handicapés', href: '/guide/passagers-handicap' },
      { label: 'Passagers mineurs', href: '/guide/passagers-mineurs' },
    ],
  },
  {
    title: 'Corporate',
    base: '/corporate',
    links: [
      { label: 'À propos de la RVA', href: '/corporate/a-propos' },
      { label: 'Gouvernance', href: '/corporate/gouvernance' },
      { label: 'Projets d\'avenir', href: '/corporate/projets-avenir' },
      { label: 'Historique', href: '/corporate/historique' },
      { label: 'Carrières', href: '/corporate/carriere' },
      { label: 'Partenariats commerciaux', href: '/corporate/partenariats-commerciaux' },
      { label: 'Services aériens', href: '/corporate/services-aeriens' },
      { label: 'Sûreté & Sécurité', href: '/corporate/surete-securite' },
    ],
  },
  {
    title: 'Communauté',
    base: '/communaute',
    links: [
      { label: 'Environnement & Durabilité', href: '/communaute/environnement-durabilite' },
      { label: 'Environnement sonore', href: '/communaute/environnement-sonore' },
      { label: 'Travaux sur pistes', href: '/communaute/travaux-pistes' },
      { label: 'Relations communautaires', href: '/communaute/relations-communaute' },
    ],
  },
  {
    title: 'Espace Client',
    base: '/compte',
    links: [
      { label: 'Connexion', href: '/login' },
      { label: 'Créer un compte', href: '/inscription' },
      { label: 'Mon compte', href: '/compte' },
      { label: 'Mon profil', href: '/compte/profil' },
      { label: 'Mes réservations', href: '/compte/reservations' },
      { label: 'Vols suivis', href: '/compte/vols-suivis' },
      { label: 'Préférences', href: '/compte/preferences' },
    ],
  },
  {
    title: 'Légal & Contact',
    base: '/',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Conditions d\'utilisation', href: '/conditions-utilisation' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { label: 'Politique cookies', href: '/cookies' },
      { label: 'Plan du site', href: '/plan-de-site' },
    ],
  },
] as const;

function PlanDeSitePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <Map size={18} className="text-rdc-blue" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Navigation</p>
          <h1 className="font-display font-bold text-3xl text-rdc-anthracite">{t('footer.legalLinks.sitemap')}</h1>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SECTIONS.map(section => (
          <div key={section.title}>
            <h2 className="mb-3 font-display font-bold text-sm uppercase tracking-wide text-rdc-blue">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.href}>
                  <Link to={link.href as never}
                    className="text-sm text-muted-foreground hover:text-rdc-blue transition-colors hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
