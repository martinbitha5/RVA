import { createFileRoute, Link } from '@tanstack/react-router';
import { ShoppingBag, MapPin, Clock, ArrowRight, Package } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/boutiques')({
  component: BoutiquesPage,
  head: () => ({
    meta: [
      { title: "Boutiques — Aéroport N'djili · FIH" },
      { name: 'description', content: "Artisanat congolais, tissus wax, souvenirs et cadeaux à l'Aéroport International de N'djili FIH." },
    ],
  }),
});

const BOUTIQUES = [
  {
    nom: 'Congo Crafts',
    categorie: 'Artisanat & Souvenirs',
    terminal: 'Terminal International — Hall Départs, Niveau 1',
    horaires: '06 h 00 – 22 h 00',
    desc: 'La boutique de référence pour l\'artisanat congolais authentique. Sculptures en bois, masques Kongo, statuettes en ivoire végétal, peintures naïves inspirées de Chéri Samba.',
    produits: ['Sculptures Mbongo', 'Masques Kongo', 'Peintures naïves', 'Bijoux en cuivre'],
    accent: '#CE1126',
  },
  {
    nom: 'Wax & Tissus RDC',
    categorie: 'Textiles & Mode',
    terminal: 'Terminal International — Hall Départs, Niveau 1',
    horaires: '07 h 00 – 21 h 00',
    desc: 'Tissu wax authentique, pagnes imprimés, tenues traditionnelles et vêtements modernes aux motifs congolais. Aussi disponibles : pagnes Vlisco et Holland Wax.',
    produits: ['Tissu wax', 'Pagnes Vlisco', 'Tenues traditionnelles', 'Robes modernes'],
    accent: '#FFCE00',
  },
  {
    nom: 'Librairie FIH Presse',
    categorie: 'Presse & Livres',
    terminal: 'Terminal International — Hall Arrivées & Départs',
    horaires: '05 h 00 – 22 h 00',
    desc: 'Journaux nationaux (Le Phare, Forum des As, La Prospérité) et internationaux (Le Monde, Jeune Afrique, BBC Africa), livres, romans francophones et guides touristiques sur la RDC.',
    produits: ['Presse nationale', 'Presse internationale', 'Guides RDC', 'Romans francophones'],
    accent: '#003DA5',
  },
  {
    nom: 'Kiosque Tabacs & Alcools',
    categorie: 'Tabacs & Alcools',
    terminal: 'Terminal International — Niveau 1',
    horaires: '06 h 00 – 22 h 00',
    desc: 'Cigarettes internationales, cigares, bières congolaises Primus, Skol, Tembo en canette pour emporter, spiritueux locaux (eau-de-vie de canne, gin local).',
    produits: ['Cigarettes', 'Cigares', 'Bières Primus & Skol', 'Spiritueux locaux'],
    accent: '#1a1a1a',
  },
  {
    nom: 'Produits du Congo',
    categorie: 'Produits locaux',
    terminal: 'Terminal International — Zone Embarquement',
    horaires: '06 h 00 – 21 h 00',
    desc: 'Café arabica du Kivu, chocolat noir artisanal de la Forêt tropicale, huile de palme rouge, épices et piments sèchés, miel de forêt équatoriale — les saveurs du Congo à ramener.',
    produits: ['Café Kivu', 'Chocolat artisanal', 'Huile de palme', 'Épices & miel'],
    accent: '#009A44',
  },
  {
    nom: 'Boutique Domestique',
    categorie: 'Souvenirs express',
    terminal: 'Terminal Domestique',
    horaires: '06 h 00 – 20 h 00',
    desc: 'Petite boutique de souvenirs rapides au départ des vols domestiques. T-shirts FIH, porte-clés, magnets, cartes postales de Kinshasa et des sites naturels congolais.',
    produits: ['T-shirts FIH', 'Porte-clés', 'Magnets', 'Cartes postales'],
    accent: '#003DA5',
  },
];

const ARTISANAT_CATEGORIES = [
  {
    titre: 'Sculptures Mbongo',
    desc: 'Statuettes et masques sculptés à la main par les artisans des communes de Kinshasa. Bois précieux, ivoire végétal, résine naturelle.',
    origine: 'Kinshasa, Bas-Congo',
  },
  {
    titre: 'Peintures naïves',
    desc: 'Dans la tradition de Chéri Samba et Moke — scènes de vie kinoise, fleuve Congo, marché Zando, rumba et fêtes de quartier.',
    origine: 'École de peinture de Kinshasa',
  },
  {
    titre: 'Tissus wax & Pagnes',
    desc: 'Tissu wax hollandais et local, pagnes traditionnels, boubous brodés. Symboles congolais imprimés sur coton de qualité.',
    origine: 'RDC & Afrique de l\'Ouest',
  },
  {
    titre: 'Cuivre & Bijoux',
    desc: 'Bracelets, colliers et pendentifs en cuivre poli du Katanga, pierres semi-précieuses du Congo et perles artisanales.',
    origine: 'Katanga, Kasaï',
  },
];

function BoutiquesPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Boutiques à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Boutiques & Restaurants</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Boutiques à FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#FFCE00] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a1a1a]">
            Artisanat congolais authentique
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Intro */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Shopping à FIH</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Ramenez le meilleur du Congo</h2>
          <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
            Avant votre départ, explorez nos boutiques et repartez avec un souvenir authentique de la République
            Démocratique du Congo. Artisanat local signé des mains des maîtres artisans de Kinshasa, tissus wax
            vibrants, café d'altitude du Kivu et chocolat artisanal de la forêt équatoriale.
          </p>
        </section>

        {/* Boutiques list */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Tous les commerces</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Boutiques par terminal</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOUTIQUES.map((b) => (
              <div key={b.nom} className="border border-[#e8e8e8] bg-white p-5 flex flex-col gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: b.accent }}>
                    {b.categorie}
                  </span>
                  <h3 className="font-bold text-[#1a1a1a] text-base mt-1">{b.nom}</h3>
                  <p className="text-xs text-[#666] leading-relaxed mt-2">{b.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {b.produits.map((p) => (
                    <span key={p} className="bg-[#f5f5f5] px-2 py-0.5 text-[10px] font-medium text-[#555]">{p}</span>
                  ))}
                </div>
                <div className="border-t border-[#f0f0f0] pt-3 space-y-1.5">
                  <p className="flex items-start gap-1.5 text-[11px] text-[#777]">
                    <MapPin size={11} className="flex-shrink-0 text-[#003DA5] mt-0.5" />
                    {b.terminal}
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
                    <Clock size={11} className="flex-shrink-0 text-[#003DA5]" />
                    {b.horaires}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artisanat congolais */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CE1126] mb-2">Patrimoine</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">L'artisanat congolais en vedette</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ARTISANAT_CATEGORIES.map((a) => (
              <div key={a.titre} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-[#CE1126]" />
                  <h3 className="font-bold text-sm text-[#1a1a1a]">{a.titre}</h3>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-3">{a.desc}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#999]">
                  Origine : {a.origine}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conseil achats */}
        <section className="bg-[#003DA5] p-6">
          <div className="flex items-start gap-4">
            <ShoppingBag size={20} className="text-[#FFCE00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Conseil pratique</p>
              <h2 className="text-xl font-bold text-white mb-3">Acheter en toute sérénité</h2>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><span className="text-[#FFCE00] font-bold mt-0.5">—</span> Les prix sont affichés en USD. Négociation possible dans certaines boutiques d'artisanat.</li>
                <li className="flex items-start gap-2"><span className="text-[#FFCE00] font-bold mt-0.5">—</span> Pour l'export d'artisanat, renseignez-vous sur les restrictions douanières de votre pays de destination.</li>
                <li className="flex items-start gap-2"><span className="text-[#FFCE00] font-bold mt-0.5">—</span> Les boutiques de la zone embarquement (après sécurité) nécessitent votre carte d'embarquement.</li>
                <li className="flex items-start gap-2"><span className="text-[#FFCE00] font-bold mt-0.5">—</span> Mobile Money accepté dans les boutiques estampillées RVA.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Lien duty free */}
        <div className="flex items-center justify-between border border-[#e8e8e8] bg-white p-5">
          <div className="flex items-center gap-3">
            <Package size={18} className="text-[#6B21A8]" />
            <p className="text-sm text-[#555]">Économisez davantage avec les <span className="font-semibold text-[#1a1a1a]">Boutiques Hors-Taxes</span></p>
          </div>
          <Link to={'/boutiques-restaurants/hors-taxes' as never} className="flex items-center gap-1.5 text-[11px] font-bold text-[#003DA5] hover:underline">
            Voir <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </main>
  );
}
