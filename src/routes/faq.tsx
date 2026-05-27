import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { HelpCircle, ChevronDown, ArrowRight, Plane, Syringe, ParkingCircle, Luggage, Car, type LucideIcon } from 'lucide-react';

export const Route = createFileRoute('/faq')({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Foire aux questions · Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Réponses aux questions fréquentes sur l'Aéroport de N'djili (FIH) — vols, visa, vaccins, stationnement, bagages, transport depuis l'aéroport." },
    ],
  }),
});

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  category: string;
  Icon: LucideIcon;
  color: string;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    category: 'Vols & Horaires',
    Icon: Plane,
    color: '#003DA5',
    items: [
      {
        q: 'Comment consulter les horaires de vols en temps réel ?',
        a: 'Rendez-vous sur les pages Départs ou Arrivées depuis le menu principal. Les tableaux sont mis à jour en continu. Vous pouvez filtrer par compagnie aérienne, destination ou plage horaire. Un simple numéro de vol suffit pour retrouver votre vol instantanément.',
      },
      {
        q: 'Mon vol est en retard — que faire ?',
        a: 'Consultez d\'abord le statut de votre vol sur notre page Départs ou Arrivées. Contactez ensuite directement votre compagnie aérienne : elle est la seule à pouvoir confirmer les nouvelles heures. À FIH, les retards sont souvent liés aux rotations ou aux conditions météo sur les hubs de correspondance (Addis-Abeba, Nairobi, Dubai). Restez dans l\'aérogare et ne vous éloignez pas.',
      },
      {
        q: 'Comment m\'abonner aux alertes SMS pour mon vol ?',
        a: 'Créez un espace client sur fih-rva.com, puis accédez à la section "Vols suivis". Renseignez votre numéro de téléphone congolais (Vodacom, Airtel ou Orange) et le numéro de vol. Vous recevrez automatiquement les alertes de changement de statut, de porte ou de bagage. Le service est gratuit.',
      },
      {
        q: 'Quelles compagnies aériennes opèrent à FIH ?',
        a: 'L\'aéroport de N\'djili accueille plus de 17 compagnies internationales et domestiques : Congo Airways, CAA (Congo Airways Afrique), Ethiopian Airlines, Brussels Airlines, Air France, Kenya Airways, Qatar Airways, EgyptAir, Turkish Airlines, ASKY, Royal Air Maroc, RwandAir, South African Airways, TAAG Angola Airlines et plusieurs opérateurs de fret (DHL, FedEx, Ethiopian Cargo). Consultez notre page Compagnies aériennes pour les détails complets.',
      },
      {
        q: 'L\'aéroport est-il sur la liste noire de l\'Union européenne ?',
        a: 'Certains opérateurs congolais figurent sur la liste de sécurité de l\'UE (interdiction de survol de l\'espace européen). Cela ne concerne pas l\'aéroport lui-même ni les compagnies européennes et internationales desservant FIH. Brussels Airlines, Air France et les autres compagnies européennes opèrent normalement à FIH. La RVA et l\'Autorité de l\'Aviation Civile (AAC-RDC) travaillent activement à la modernisation des standards de sécurité.',
      },
    ],
  },
  {
    category: 'Visa & Immigration',
    Icon: HelpCircle,
    color: '#CE1126',
    items: [
      {
        q: 'Comment obtenir un visa pour la RDC ?',
        a: 'La République Démocratique du Congo propose un e-Visa (visa électronique) accessible sur le site officiel evisa.gouv.cd. Le délai de traitement est généralement de 3 à 5 jours ouvrés. Le visa à l\'arrivée est disponible pour certaines nationalités mais son attribution reste à la discrétion de la Direction Générale des Migrations (DGM). Nous conseillons fortement d\'obtenir votre visa avant le départ.',
      },
      {
        q: 'Quel est le délai pour obtenir l\'e-Visa RDC ?',
        a: 'Le traitement de l\'e-Visa est généralement de 3 à 5 jours ouvrés via evisa.gouv.cd. En période de forte demande, comptez jusqu\'à 7 jours. Déposez votre demande au minimum 10 jours avant votre départ. Le visa est valable 30 jours dès la date d\'entrée.',
      },
      {
        q: 'Quels documents sont vérifiés à l\'arrivée à Kinshasa ?',
        a: 'La DGM (Direction Générale des Migrations) vérifie : passeport valide (minimum 6 mois de validité restante), visa valide ou autorisation d\'entrée, carnet international de vaccination (obligatoire — voir fièvre jaune), formulaire de santé (selon situation épidémiologique en vigueur). Prévoyez vos documents en ordre dans un dossier accessible rapidement.',
      },
    ],
  },
  {
    category: 'Vaccins & Santé',
    Icon: Syringe,
    color: '#009A44',
    items: [
      {
        q: 'Le vaccin contre la fièvre jaune est-il obligatoire pour entrer en RDC ?',
        a: 'OUI — le certificat international de vaccination contre la fièvre jaune (carnet jaune OMS) est OBLIGATOIRE pour entrer en République Démocratique du Congo, sans exception. Sans ce document, l\'entrée sur le territoire peut vous être refusée ou vous pouvez être vacciné sur place à l\'aéroport, à vos frais. Faites-vous vacciner au minimum 10 jours avant votre départ car le vaccin met ce délai pour être efficace et reconnu.',
      },
      {
        q: 'Quels autres vaccins sont recommandés avant de voyager en RDC ?',
        a: 'En plus de la fièvre jaune (obligatoire), les autorités sanitaires recommandent : hépatite A et B, typhoïde, méningite (selon zones), et une mise à jour des vaccins courants (DTP). La prophylaxie antipaludéenne est fortement recommandée car le paludisme est endémique en RDC. Consultez votre médecin ou un centre de vaccination internationale au moins 4 semaines avant le départ.',
      },
      {
        q: 'Y a-t-il un centre médical à l\'aéroport de N\'djili ?',
        a: 'Oui, un poste médical est disponible dans l\'aérogare pour les urgences légères et les contrôles sanitaires à l\'arrivée. Pour les soins plus importants, les hôpitaux de référence de Kinshasa sont : Hôpital Général de Kinshasa (ex-Mama Yemo), Cliniques Universitaires de Kinshasa et Hôpital Militaire Camp Kokolo.',
      },
    ],
  },
  {
    category: 'Stationnement',
    Icon: ParkingCircle,
    color: '#003DA5',
    items: [
      {
        q: 'Comment réserver une place de stationnement à FIH ?',
        a: 'Depuis la page Stationnement, sélectionnez votre parking (P1 court séjour, P2 long séjour), vos dates et horaires d\'arrivée/départ, puis procédez au paiement via Mobile Money (Airtel Money, M-Pesa Vodacom, Orange Money) ou carte bancaire. Un code de réservation unique vous est envoyé par SMS et email. Présentez ce code à l\'entrée du parking.',
      },
      {
        q: 'Peut-on payer le stationnement avec Airtel Money ou M-Pesa ?',
        a: 'Oui — le paiement Mobile Money est le mode de paiement prioritaire pour le stationnement FIH. Airtel Money, M-Pesa (Vodacom) et Orange Money sont tous acceptés. C\'est rapide, sans monnaie et sécurisé. La carte bancaire (Visa/Mastercard) est également acceptée aux bornes de paiement.',
      },
      {
        q: 'Quels sont les tarifs de stationnement en 2025 ?',
        a: 'Les tarifs sont affichés en USD : parking court séjour (P1) à partir de 2 USD/heure, parking long séjour (P2) à partir de 8 USD/jour. Les abonnements mensuels et hebdomadaires sont disponibles avec tarif préférentiel. Consultez notre page Offres & Tarifs pour le barème complet. Les réservations en ligne bénéficient d\'une remise de 10%.',
      },
      {
        q: 'Y a-t-il des places réservées PMR (personnes à mobilité réduite) ?',
        a: 'Oui, des places PMR numérotées et signalisées sont disponibles dans tous les parkings, proches des entrées et ascenseurs. Elles sont gratuites sur présentation d\'un justificatif de handicap. Pour une assistance complète (fauteuil roulant, accompagnement à bord), contactez notre service PMR au moins 48h avant votre voyage.',
      },
    ],
  },
  {
    category: 'Bagages',
    Icon: Luggage,
    color: '#1a1a1a',
    items: [
      {
        q: 'Quels objets sont interdits en cabine à FIH ?',
        a: 'Les règles OACI s\'appliquent à FIH. Sont interdits en cabine : liquides en contenants de plus de 100 ml (règle des 3-1-1), objets tranchants, armes, explosifs, gaz. Les règles varient légèrement selon les compagnies — vérifiez auprès de votre compagnie les restrictions spécifiques pour votre vol. En cas de doute, mettez l\'objet en soute.',
      },
      {
        q: 'Que faire si mes bagages sont perdus ou endommagés ?',
        a: 'En cas de bagage non livré à l\'arrivée, signalez-le immédiatement au comptoir de votre compagnie aérienne dans la zone des bagages (avant de quitter l\'aérogare). Remplissez un rapport de bagage irrégulier (PIR). La compagnie est responsable de la recherche et du remboursement selon les conventions de Montréal. Conservez votre carte d\'embarquement et l\'étiquette bagage.',
      },
      {
        q: 'Puis-je emporter de la nourriture dans mes bagages en partant de Kinshasa ?',
        a: 'La réglementation varie selon la destination. Pour les vols vers l\'Europe et l\'Amérique du Nord, des restrictions strictes s\'appliquent sur les produits animaux et végétaux frais. Les produits transformés, conserves et épices sèches sont généralement autorisés. Vérifiez la réglementation douanière de votre pays de destination avant d\'emballer.',
      },
    ],
  },
  {
    category: 'Transport depuis l\'aéroport',
    Icon: Car,
    color: '#d97706',
    items: [
      {
        q: 'Comment rejoindre le centre-ville de Kinshasa depuis FIH ?',
        a: 'Plusieurs options : (1) Taxis agréés RVA à la sortie des arrivées — identifiables par leur badge officiel, tarif fixe affiché. (2) Navettes hôtels — la plupart des grands hôtels (Pullman, Venus, Sultani) proposent des navettes gratuites sur réservation. (3) Lignes Transco (bus urbain) depuis le terminus proche. (4) Covoiturage agréé. Évitez absolument les taxis informels ("taxi-man") qui abordent les passagers dans l\'aérogare — ils ne sont pas agréés et les prix sont non réglementés.',
      },
      {
        q: 'Quel est le temps de trajet entre l\'aéroport et le centre-ville (Gombe) ?',
        a: 'En dehors des heures de pointe, compter 20 à 35 minutes via le Boulevard Lumumba (axe principal). Aux heures de pointe (7h-9h et 16h-19h), le trajet peut dépasser 1 heure en raison des embouteillages sur la N1 (Boulevard Lumumba). Prévoyez large si vous avez un vol matinal ou si vous êtes attendu à une réunion importante.',
      },
      {
        q: 'Peut-on louer une voiture à l\'aéroport de N\'djili ?',
        a: 'Oui, des agences de location sont présentes dans l\'aérogare et à proximité : Avis, Europcar, Hertz et des opérateurs locaux comme Loxea. Le permis de conduire international est recommandé. Notez que la conduite à Kinshasa peut être complexe pour un non-initié — un chauffeur local est souvent préférable. Réservez en avance en haute saison.',
      },
      {
        q: 'Y a-t-il une zone de dépose-minute pour récupérer des passagers ?',
        a: 'Oui, une zone de dépose et récupération rapide est disponible devant l\'aérogare côté arrivées. Le stationnement y est gratuit pour 15 minutes. Au-delà, vous serez orienté vers les parkings payants P1 (court séjour). Pour éviter d\'attendre avec une voiture, suivez le vol en temps réel sur notre site avant de partir.',
      },
    ],
  },
];

function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayedSections = activeCategory
    ? FAQ_SECTIONS.filter(s => s.category === activeCategory)
    : FAQ_SECTIONS;

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Aéroport International de N'djili — Aide et FAQ" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Aide · Informations</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Foire aux questions</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">FAQ</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-12 space-y-10">

        {/* Intro */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Questions fréquentes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
            <HelpCircle size={20} className="inline mr-2 text-[#003DA5]" />
            Tout ce que vous devez savoir avant de voyager à FIH
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
            Retrouvez les réponses aux questions les plus posées sur l'Aéroport International de N'djili — vols, visa, vaccins, stationnement, bagages et transport depuis l'aéroport vers Kinshasa.
          </p>
        </section>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-xs font-bold transition-colors ${
              activeCategory === null
                ? 'bg-[#003DA5] text-white'
                : 'border border-[#e8e8e8] bg-white text-gray-600 hover:border-[#003DA5]/40'
            }`}
          >
            Toutes les catégories
          </button>
          {FAQ_SECTIONS.map(s => (
            <button
              key={s.category}
              onClick={() => setActiveCategory(activeCategory === s.category ? null : s.category)}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                activeCategory === s.category
                  ? 'text-white'
                  : 'border border-[#e8e8e8] bg-white text-gray-600 hover:border-[#003DA5]/40'
              }`}
              style={activeCategory === s.category ? { backgroundColor: s.color } : {}}
            >
              {s.category}
            </button>
          ))}
        </div>

        {/* FAQ sections */}
        <div className="space-y-10">
          {displayedSections.map(section => (
            <section key={section.category}>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center" style={{ backgroundColor: `${section.color}15` }}>
                  <section.Icon size={15} style={{ color: section.color }} />
                </div>
                <h2 className="text-lg font-bold text-[#1a1a1a]">{section.category}</h2>
                <span className="text-xs text-gray-400 font-medium">{section.items.length} questions</span>
              </div>

              <div className="space-y-2">
                {section.items.map((item, idx) => {
                  const key = `${section.category}-${idx}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="border border-[#e8e8e8] bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left gap-4 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-[#1a1a1a] text-sm leading-snug">{item.q}</span>
                        <ChevronDown
                          size={15}
                          className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-[#e8e8e8] pt-4 bg-gray-50">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Not found CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Besoin d'aide supplémentaire ?</p>
              <h2 className="text-xl font-bold text-white mb-1">Vous n'avez pas trouvé votre réponse ?</h2>
              <p className="text-sm text-white/55 max-w-lg">
                Notre équipe est disponible du lundi au vendredi (08h–17h). Les opérations aéroport sont joignables 24h/24.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors"
            >
              Contactez-nous <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
