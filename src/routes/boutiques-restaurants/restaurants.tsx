import { createFileRoute, Link } from '@tanstack/react-router';
import { MapPin, Clock, UtensilsCrossed, Star, Info, ChevronRight, Leaf, Drumstick, Fish, Coffee } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/restaurants')({
  component: RestaurantsPage,
  head: () => ({
    meta: [
      { title: "Restaurants — Aéroport N'djili · FIH" },
      { name: 'description', content: "Restaurants et cuisine congolaise authentique à l'Aéroport International de N'djili FIH — fufu, pondu, moambe et plus." },
    ],
  }),
});

const RESTAURANTS = [
  {
    nom: 'Le Fleuve Congo',
    terminal: 'Terminal International — Hall Départs, Niveau 1',
    horaires: '06 h 00 – 22 h 00',
    specialites: ['Fufu & Pondu', 'Moambe de poulet', 'Saka-saka', 'Poisson braisé'],
    prix: '$$ — 8 à 20 USD',
    desc: 'Restaurant phare de FIH, cuisine congolaise authentique revisitée. Idéal pour un dernier repas kinois avant l\'embarquement. Spécialité : moambe de poulet fermier.',
    accent: '#009A44',
    featured: true,
  },
  {
    nom: 'Chez Tante Lucie',
    terminal: 'Terminal International — Zone Embarquement',
    horaires: '05 h 30 – 23 h 00',
    specialites: ['Liboke de poisson', 'Makemba frit', 'Jus de gingembre', 'Beignets'],
    prix: '$ — 4 à 12 USD',
    desc: 'Ambiance familiale et chaleureuse, cuisine de tous les jours. La tante Lucie prépare chaque jour ses spécialités maison avec des produits frais du marché de Masina.',
    accent: '#CE1126',
    featured: false,
  },
  {
    nom: 'Airport Brasserie',
    terminal: 'Terminal International — Hall Arrivées, Niveau 0',
    horaires: '00 h 00 – 24 h 00 (ouvert 24h)',
    specialites: ['Sandwichs', 'Pâtes', 'Salades', 'Café & viennoiseries'],
    prix: '$ – $$ — 5 à 18 USD',
    desc: 'Brasserie internationale ouverte 24h/24, idéale pour les passagers en transit ou en attente. Menu varié alliant cuisine internationale et touches congolaises.',
    accent: '#003DA5',
    featured: false,
  },
  {
    nom: 'Quick Kinshasa FIH',
    terminal: 'Terminal International — Niveau 1',
    horaires: '06 h 00 – 21 h 00',
    specialites: ['Burgers', 'Frites', 'Poulet frit', 'Milkshakes'],
    prix: '$ — 4 à 10 USD',
    desc: 'Fast-food populaire adapté aux passagers pressés. Menu abordable en USD, service rapide, portions généreuses. Idéal avant un vol domestique.',
    accent: '#FFCE00',
    featured: false,
  },
  {
    nom: 'Saveurs du Kivu',
    terminal: 'Terminal International — Zone VIP',
    horaires: '07 h 00 – 20 h 00',
    specialites: ['Truite du Lac Kivu', 'Fromage artisanal', 'Café arabica Kivu', 'Plantain caramélisé'],
    prix: '$$$ — 20 à 45 USD',
    desc: 'Restaurant gastronomique mettant en valeur les produits d\'exception de l\'Est du Congo. Carte des vins et spiritueux africains. Réservation recommandée.',
    accent: '#1a1a1a',
    featured: false,
  },
  {
    nom: 'Snack Domestique',
    terminal: 'Terminal Domestique',
    horaires: '06 h 00 – 20 h 00',
    specialites: ['Sandwich baguette', 'Soda & jus locaux', 'Œufs sur le plat', 'Beignets haricots'],
    prix: '$ — 2 à 8 USD',
    desc: 'Snack incontournable du terminal domestique, accessible à tous les voyageurs avant leurs vols vers Lubumbashi, Goma, Bukavu ou Kisangani.',
    accent: '#009A44',
    featured: false,
  },
];

function RestaurantCard({ r }: { r: typeof RESTAURANTS[0] }) {
  return (
    <div className={`border border-[#e8e8e8] bg-white p-5 flex flex-col gap-4 ${r.featured ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
      {r.featured && (
        <div className="flex items-center gap-2">
          <Star size={12} className="text-[#FFCE00]" fill="#FFCE00" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FFCE00]">Coup de cœur FIH</span>
        </div>
      )}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: r.accent }} />
          <h3 className="font-bold text-[#1a1a1a] text-base">{r.nom}</h3>
        </div>
        <p className="text-xs text-[#666] leading-relaxed">{r.desc}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {r.specialites.map((s) => (
          <span key={s} className="bg-[#f5f5f5] px-2 py-0.5 text-[10px] font-medium text-[#555]">{s}</span>
        ))}
      </div>
      <div className="border-t border-[#f0f0f0] pt-3 space-y-1.5">
        <p className="flex items-start gap-1.5 text-[11px] text-[#777]">
          <MapPin size={11} className="flex-shrink-0 text-[#003DA5] mt-0.5" />
          {r.terminal}
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
          <Clock size={11} className="flex-shrink-0 text-[#003DA5]" />
          {r.horaires}
        </p>
        <p className="text-[11px] font-semibold" style={{ color: r.accent }}>{r.prix}</p>
      </div>
    </div>
  );
}

function RestaurantsPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Restauration à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Boutiques & Restaurants</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Restaurants à FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            {RESTAURANTS.length} établissements
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Intro cuisine locale */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Saveurs congolaises</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Le meilleur de Kinshasa dans votre terminal</h2>
          <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
            Avant votre vol ou à votre arrivée, découvrez une sélection de restaurants qui célèbrent la richesse
            gastronomique de la République Démocratique du Congo. Du fufu traditionnel à la truite du Lac Kivu,
            en passant par le fast-food international — chaque passager trouve son bonheur à FIH.
          </p>
        </section>

        {/* Note prix USD */}
        <div className="flex items-start gap-3 border border-[#FFCE00]/40 bg-[#FFCE00]/10 p-4">
          <Info size={15} className="text-[#C8A000] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[#555]">
            <p className="font-semibold text-[#1a1a1a] mb-1">Prix affichés en USD — Équivalent CDF disponible</p>
            <p>Tous les établissements de FIH acceptent les dollars américains (USD). Le franc congolais (CDF)
            est également accepté au taux du jour BCC. Les paiements Mobile Money (Airtel, M-Pesa, Orange) sont
            acceptés dans la plupart des restaurants.</p>
          </div>
        </div>

        {/* Liste restaurants */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Tous les restaurants</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Restaurants par terminal</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESTAURANTS.map((r) => (
              <RestaurantCard key={r.nom} r={r} />
            ))}
          </div>
        </section>

        {/* Spécialités locales vedette */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Découverte</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Spécialités congolaises en vedette</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { plat: 'Fufu & Pondu', desc: 'Pâte de manioc accompagnée de feuilles de manioc pilées au lait de palme. Plat national de la RDC.', Icon: Leaf, couleur: '#009A44' },
              { plat: 'Moambe de poulet', desc: 'Poulet mijoté dans la sauce aux noix de palme, épices locales et piment. Plat festif incontournable.', Icon: Drumstick, couleur: '#CE1126' },
              { plat: 'Liboke de poisson', desc: 'Poisson frais du fleuve Congo cuit à l\'étouffée dans des feuilles de bananier avec des épices.', Icon: Fish, couleur: '#003DA5' },
              { plat: 'Café Arabica Kivu', desc: 'Café d\'altitude cultivé sur les rives du Lac Kivu, aux arômes fruités et floraux exceptionnels.', Icon: Coffee, couleur: '#C2702F' },
            ].map((item) => (
              <div key={item.plat} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center mb-3" style={{ background: `${item.couleur}15`, border: `1px solid ${item.couleur}30` }}>
                  <item.Icon size={18} style={{ color: item.couleur }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-sm text-[#1a1a1a] mb-2">{item.plat}</h3>
                <p className="text-xs text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Horaires généraux */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Horaires</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Quand manger à FIH ?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { moment: 'Petit-déjeuner', heures: '05 h 30 – 10 h 00', note: 'Brasserie 24h ouverte en continu' },
              { moment: 'Déjeuner', heures: '11 h 00 – 15 h 00', note: 'Plats du jour cuisine congolaise' },
              { moment: 'Dîner / Soirée', heures: '18 h 00 – 23 h 00', note: 'Restaurants fermés sauf Brasserie' },
            ].map((h) => (
              <div key={h.moment} className="text-center p-4 bg-[#f7f7f7]">
                <p className="font-bold text-[#1a1a1a] text-sm">{h.moment}</p>
                <p className="text-[#003DA5] font-bold text-lg mt-1">{h.heures}</p>
                <p className="text-xs text-[#888] mt-1">{h.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation vers boutiques */}
        <div className="flex items-center justify-between border border-[#e8e8e8] bg-white p-5">
          <div className="flex items-center gap-3">
            <UtensilsCrossed size={18} className="text-[#003DA5]" />
            <p className="text-sm text-[#555]">Voir aussi : <span className="font-semibold text-[#1a1a1a]">Bars & Cafés disponibles à FIH</span></p>
          </div>
          <Link to={'/boutiques-restaurants/bars-cafes' as never} className="flex items-center gap-1.5 text-[11px] font-bold text-[#003DA5] hover:underline">
            Voir <ChevronRight size={12} />
          </Link>
        </div>

      </div>
    </main>
  );
}
