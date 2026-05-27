import { createFileRoute, Link } from '@tanstack/react-router';
import { Map, ExternalLink } from 'lucide-react';

export const Route = createFileRoute('/plan-de-site')({
  component: PlanDeSitePage,
  head: () => ({
    meta: [
      { title: "Plan du site — Aéroport International de N'djili · FIH · RVA" },
      { name: 'description', content: "Plan du site complet de fih-rva.com — toutes les pages de l'Aéroport International de N'djili (FIH), géré par la Régie des Voies Aériennes (RVA)." },
    ],
  }),
});

interface SiteLink {
  label: string;
  href: string;
}

interface SiteSection {
  title: string;
  color: string;
  links: SiteLink[];
  subsections?: { title: string; links: SiteLink[] }[];
}

const SECTIONS: SiteSection[] = [
  {
    title: 'Accueil',
    color: '#003DA5',
    links: [
      { label: 'Page d\'accueil', href: '/' },
    ],
  },
  {
    title: 'Vols',
    color: '#003DA5',
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
    color: '#003DA5',
    links: [
      { label: 'Stationnement FIH', href: '/stationnement-transport/stationnement-fih' },
      { label: 'Offres & Tarifs', href: '/stationnement-transport/offres' },
      { label: 'Mobilité réduite (PMR)', href: '/stationnement-transport/mobilite-reduite' },
      { label: 'Dépose & Récupération', href: '/stationnement-transport/depose-recuperation' },
      { label: 'Avis travaux', href: '/stationnement-transport/travaux' },
      { label: 'Taxis agréés', href: '/stationnement-transport/taxis' },
      { label: 'Transco / Bus urbain', href: '/stationnement-transport/transcom-bus' },
      { label: 'Navettes hôtels', href: '/stationnement-transport/navettes' },
      { label: 'Covoiturage agréé', href: '/stationnement-transport/covoiturage' },
      { label: 'Limousines & VTC', href: '/stationnement-transport/limousines' },
      { label: 'Location de voitures', href: '/stationnement-transport/location-voitures' },
      { label: 'Boulevard Lumumba', href: '/stationnement-transport/boulevard-lumumba' },
    ],
  },
  {
    title: 'Boutiques & Restaurants',
    color: '#CE1126',
    links: [
      { label: 'Répertoire complet', href: '/boutiques-restaurants/repertoire' },
      { label: 'Restaurants', href: '/boutiques-restaurants/restaurants' },
      { label: 'Boutiques', href: '/boutiques-restaurants/boutiques' },
      { label: 'Bars & Cafés', href: '/boutiques-restaurants/bars-cafes' },
      { label: 'Bureaux de change', href: '/boutiques-restaurants/echange-devises' },
      { label: 'Hors-taxes (Duty Free)', href: '/boutiques-restaurants/hors-taxes' },
      { label: 'Salons VIP', href: '/boutiques-restaurants/salons' },
    ],
  },
  {
    title: 'Guide de l\'aéroport',
    color: '#009A44',
    links: [
      { label: 'Quitter Kinshasa (départ)', href: '/guide/quitter-kinshasa' },
      { label: 'FIH Express (enregistrement prioritaire)', href: '/guide/fih-express' },
      { label: 'Sécurité & Bagages', href: '/guide/securite-bagages' },
      { label: 'Atterrir à Kinshasa (arrivée)', href: '/guide/atterrir-kinshasa' },
      { label: 'Douanes (DGDA) & Immigration (DGM)', href: '/guide/douanes-immigration' },
      { label: 'Correspondances', href: '/guide/correspondances' },
      { label: 'Salons VIP — accès', href: '/guide/salons' },
      { label: 'Santé & Vaccinations', href: '/guide/sante' },
      { label: 'Wi-Fi & Connectivité', href: '/guide/wifi-connectivite' },
      { label: 'Services bancaires & ATM', href: '/guide/services-bancaires' },
      { label: 'Objets trouvés', href: '/guide/objets-trouves' },
      { label: 'Passagers mineurs non accompagnés', href: '/guide/passagers-mineurs' },
      { label: 'Passagers à mobilité réduite', href: '/guide/passagers-handicap' },
    ],
  },
  {
    title: 'Corporate',
    color: '#1a1a1a',
    links: [
      { label: 'À propos de la RVA & FIH', href: '/corporate/a-propos' },
      { label: 'Historique de FIH (depuis 1953)', href: '/corporate/historique' },
      { label: 'Projets d\'avenir 2024–2028', href: '/corporate/projets-avenir' },
      { label: 'Gouvernance RVA', href: '/corporate/gouvernance' },
      { label: 'Carrières à la RVA', href: '/corporate/carriere' },
      { label: 'Partenariats commerciaux', href: '/corporate/partenariats-commerciaux' },
      { label: 'Services aériens (fret, aviation générale)', href: '/corporate/services-aeriens' },
      { label: 'Sûreté & Sécurité', href: '/corporate/surete-securite' },
    ],
    subsections: [
      {
        title: 'Gouvernance',
        links: [
          { label: 'Conseil d\'administration', href: '/corporate/gouvernance/conseil-administration' },
          { label: 'Comité de direction', href: '/corporate/gouvernance/comite-direction' },
          { label: 'Comité consultatif communautaire', href: '/corporate/gouvernance/comite-consultatif' },
          { label: 'Directions RVA', href: '/corporate/gouvernance/directions' },
        ],
      },
      {
        title: 'Carrières',
        links: [
          { label: 'La communauté FIH', href: '/corporate/carriere/communaute-fih' },
          { label: 'Engagement envers les talents', href: '/corporate/carriere/engagement-talents' },
          { label: 'Se développer à la RVA', href: '/corporate/carriere/se-developper' },
          { label: 'Offres d\'emploi', href: '/corporate/carriere/offres-emploi' },
        ],
      },
      {
        title: 'Partenariats',
        links: [
          { label: 'Aperçu FIH — statistiques trafic', href: '/corporate/partenariats-commerciaux/apercu-fih' },
          { label: 'Concessions disponibles', href: '/corporate/partenariats-commerciaux/concessions' },
          { label: 'Visibilité & publicité', href: '/corporate/partenariats-commerciaux/visibilite' },
          { label: 'Immobilier aéroportuaire', href: '/corporate/partenariats-commerciaux/immobilier' },
        ],
      },
      {
        title: 'Services aériens',
        links: [
          { label: 'Transport de fret & cargo', href: '/corporate/services-aeriens/fret' },
          { label: 'Aviation générale', href: '/corporate/services-aeriens/aviation-generale' },
          { label: 'Aviation commerciale', href: '/corporate/services-aeriens/aviation-commerciale' },
        ],
      },
    ],
  },
  {
    title: 'Communauté',
    color: '#009A44',
    links: [
      { label: 'Environnement & Durabilité', href: '/communaute/environnement-durabilite' },
      { label: 'Environnement sonore — Plan d\'exposition au bruit', href: '/communaute/environnement-sonore' },
      { label: 'Plaintes sonores (formulaire)', href: '/communaute/environnement-sonore/plaintes' },
      { label: 'Travaux sur pistes et voies de circulation', href: '/communaute/travaux-pistes' },
      { label: 'Relations communautaires', href: '/communaute/relations-communaute' },
    ],
  },
  {
    title: 'Espace Client',
    color: '#FFCE00',
    links: [
      { label: 'Connexion', href: '/login' },
      { label: 'Créer un compte', href: '/inscription' },
      { label: 'Mon espace client', href: '/compte' },
      { label: 'Mon profil', href: '/compte/profil' },
      { label: 'Mes réservations stationnement', href: '/compte/reservations' },
      { label: 'Vols suivis & alertes', href: '/compte/vols-suivis' },
      { label: 'Préférences notifications', href: '/compte/preferences' },
    ],
  },
  {
    title: 'Informations légales & Contact',
    color: '#1a1a1a',
    links: [
      { label: 'Contactez-nous', href: '/contact' },
      { label: 'Foire aux questions (FAQ)', href: '/faq' },
      { label: 'Plan du site', href: '/plan-de-site' },
      { label: 'Conditions d\'utilisation', href: '/conditions-utilisation' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { label: 'Politique cookies', href: '/cookies' },
      { label: 'Accessibilité', href: '/accessibilite' },
      { label: 'Salle de presse & Médias', href: '/medias' },
    ],
  },
];

function PlanDeSitePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Plan du site — Aéroport International de N'djili FIH" className="h-40 sm:h-56 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Navigation</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Plan du site</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#1a1a1a] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">fih-rva.com</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12">

        {/* Intro */}
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Navigation complète</p>
          <div className="flex items-center gap-3">
            <Map size={20} className="text-[#003DA5]" />
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Toutes les pages de fih-rva.com</h2>
          </div>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl">
            Retrouvez l'ensemble des pages du site officiel de l'Aéroport International de N'djili (FIH), géré par la Régie des Voies Aériennes (RVA) de la République Démocratique du Congo.
          </p>
        </div>

        {/* Sections grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(section => (
            <div key={section.title} className="border border-[#e8e8e8] bg-white overflow-hidden">
              <div className="px-5 py-3 border-b border-[#e8e8e8]" style={{ borderLeftWidth: 3, borderLeftColor: section.color }}>
                <h2 className="font-bold text-sm text-[#1a1a1a]" style={{ color: section.color }}>
                  {section.title}
                </h2>
              </div>
              <div className="px-5 py-4">
                <ul className="space-y-1.5">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link
                        to={link.href as never}
                        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#003DA5] transition-colors hover:underline"
                      >
                        <span className="h-px w-2 bg-gray-300 shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {section.subsections && section.subsections.length > 0 && (
                  <div className="mt-5 space-y-4 border-t border-[#e8e8e8] pt-4">
                    {section.subsections.map(sub => (
                      <div key={sub.title}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">{sub.title}</p>
                        <ul className="space-y-1">
                          {sub.links.map(link => (
                            <li key={link.href}>
                              <Link
                                to={link.href as never}
                                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003DA5] transition-colors hover:underline"
                              >
                                <span className="h-px w-2 bg-gray-200 shrink-0" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Site info strip */}
        <div className="mt-12 border border-[#e8e8e8] bg-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#1a1a1a] text-sm">fih-rva.com</p>
            <p className="text-xs text-gray-500">Site officiel de l'Aéroport International de N'djili · FIH · FZAA</p>
            <p className="text-xs text-gray-400 mt-0.5">© Régie des Voies Aériennes · République Démocratique du Congo</p>
          </div>
          <a
            href="https://fih-rva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-[#003DA5] hover:underline"
          >
            fih-rva.com <ExternalLink size={11} />
          </a>
        </div>

      </div>
    </main>
  );
}
