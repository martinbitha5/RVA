import { createFileRoute } from '@tanstack/react-router';
import { Package, Info, CheckCircle, Wine, Flame, Sparkles, Gem, MapPin, ShieldCheck, CreditCard } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/hors-taxes')({
  component: HorsTaxesPage,
  head: () => ({
    meta: [
      { title: "Boutique Hors-Taxes — Aéroport N'djili · FIH" },
      { name: 'description', content: "Boutiques duty-free à l'Aéroport International de N'djili FIH — alcools, parfums, tabacs, bijoux, électronique. Économies garanties avant votre vol." },
    ],
  }),
});

const CATEGORIES = [
  {
    label: 'Spiritueux & Vins',
    Icon: Wine,
    desc: 'Whiskies, cognacs, champagnes, vins français et sud-africains, rhums des Caraïbes, gin premium.',
    examples: ['Johnnie Walker', 'Hennessy VSOP', 'Moët & Chandon', 'Nederburg Wines'],
    couleur: '#6B21A8',
    bg: 'bg-purple-50',
  },
  {
    label: 'Tabacs',
    Icon: Flame,
    desc: 'Cigarettes internationales, cigares cubains et dominicains premium, accessoires tabac de luxe.',
    examples: ['Marlboro', 'Cohiba', 'Montecristo', 'Dunhill'],
    couleur: '#1a1a1a',
    bg: 'bg-gray-50',
  },
  {
    label: 'Parfums & Cosmétiques',
    Icon: Sparkles,
    desc: 'Grandes maisons françaises, produits de beauté africains naturels, huiles essentielles du Congo.',
    examples: ['Chanel N°5', 'Dior Sauvage', 'Yves Saint Laurent', 'African Botanics'],
    couleur: '#CE1126',
    bg: 'bg-red-50',
  },
  {
    label: 'Bijoux & Montres',
    Icon: Gem,
    desc: 'Joaillerie artisanale en cuivre du Katanga, pierres semi-précieuses congolaises, montres de marque.',
    examples: ['Cuivre Katanga', 'Coltan artisanal', 'Swatch', 'Fossil'],
    couleur: '#FFCE00',
    bg: 'bg-yellow-50',
  },
];

const FRANCHISE = [
  { article: 'Alcool (> 22° vol.)', qte: '1 litre', note: 'Par passager adulte (18+)' },
  { article: 'Alcool (≤ 22° vol.)', qte: '2 litres', note: 'Vin, bière, cidre' },
  { article: 'Tabac — cigarettes', qte: '200 unités', note: '1 cartouche complète' },
  { article: 'Tabac — cigares', qte: '50 unités', note: 'Ou 250 g de tabac à pipe' },
  { article: 'Parfums', qte: '50 ml', note: 'Eau de toilette : 250 ml' },
  { article: 'Café', qte: '500 g', note: 'Ou 200 g extraits / essences' },
  { article: 'Thé', qte: '100 g', note: 'Ou 40 sachets' },
  { article: 'Cadeaux (valeur)', qte: '$ 430 USD', note: 'Seuil de franchise douanière UE / USA approximatif' },
];

const BOUTIQUES_DT = [
  {
    nom: 'FIH Duty Free — Zone Internationale',
    localisation: 'Après contrôle de sécurité — Terminal International, Niveau 1',
    horaires: '05 h 00 – vol du soir',
    surface: '350 m²',
    desc: 'La boutique principale hors-taxes de FIH. Alcools, parfums, tabacs, bijoux artisanaux congolais et électronique grand public. Commande possible depuis la salle d\'attente.',
  },
  {
    nom: 'Congo Luxury Store',
    localisation: 'Zone Embarquement — Porte B (vols long-courriers)',
    horaires: '06 h 00 – dernier vol',
    surface: '120 m²',
    desc: 'Boutique premium ciblant les vols Brussels Airlines, Air France et Ethiopian. Sélection soignée de maroquinerie, parfums haute gamme et artisanat congolais d\'exception.',
  },
];

function HorsTaxesPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Boutiques Hors-Taxes à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Boutiques & Restaurants</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Boutiques Hors-Taxes</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#6B21A8] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Duty Free — Économies garanties
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Condition accès */}
        <div className="flex items-start gap-4 bg-[#003DA5] p-5 text-white">
          <Package size={20} className="flex-shrink-0 mt-0.5 text-[#FFCE00]" />
          <div>
            <p className="font-bold text-base mb-1">Accès réservé aux passagers en partance</p>
            <p className="text-sm text-white/80 leading-relaxed">
              Les boutiques hors-taxes sont accessibles uniquement après le contrôle de sécurité et de passeport.
              Présentez votre <strong className="text-white">passeport + carte d'embarquement</strong> pour accéder à la zone duty-free.
              Les achats sont limités aux quantités de franchise autorisées par votre pays de destination.
            </p>
          </div>
        </div>

        {/* Emplacement */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Nos boutiques</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Boutiques hors-taxes à FIH</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BOUTIQUES_DT.map((b) => (
              <div key={b.nom} className="border border-[#e8e8e8] bg-white p-5">
                <h3 className="font-bold text-[#1a1a1a] text-base mb-2">{b.nom}</h3>
                <p className="text-xs text-[#666] leading-relaxed mb-4">{b.desc}</p>
                <div className="space-y-1.5 border-t border-[#f0f0f0] pt-3">
                  <p className="flex items-start gap-1.5 text-[11px] text-[#777]">
                    <MapPin size={11} className="flex-shrink-0 text-[#003DA5] mt-0.5" />
                    {b.localisation}
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
                    <Package size={11} className="flex-shrink-0 text-[#003DA5]" />
                    Surface : {b.surface}
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-[#009A44] font-semibold">
                    <CheckCircle size={11} className="flex-shrink-0" />
                    Ouvert : {b.horaires}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Catégories de produits */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Catalogue</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Produits disponibles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {CATEGORIES.map(({ label, Icon, desc, examples, couleur, bg }) => (
              <div key={label} className={`border border-[#e8e8e8] ${bg} p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white" style={{ border: `2px solid ${couleur}30` }}>
                    <Icon size={18} style={{ color: couleur }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] text-sm">{label}</h3>
                </div>
                <p className="text-xs text-[#555] leading-relaxed mb-3">{desc}</p>
                <div className="flex flex-wrap gap-1">
                  {examples.map((e) => (
                    <span key={e} className="bg-white px-2 py-0.5 text-[10px] font-medium text-[#555] border border-[#e8e8e8]">{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Franchise douanière */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Réglementation</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Franchises douanières autorisées</h2>
          <div className="flex items-start gap-3 border border-[#FFCE00]/40 bg-[#FFCE00]/10 p-4 mb-6">
            <Info size={15} className="text-[#C8A000] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#555] leading-relaxed">
              Les quantités ci-dessous sont des limites générales indicatives. Vérifiez les franchises spécifiques
              à votre pays de destination auprès de votre compagnie aérienne ou de l'ambassade concernée.
              Ces limites s'appliquent par passager adulte de 18 ans et plus.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#e8e8e8]">
              <thead>
                <tr className="bg-[#1a1a1a] text-white">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider">Article</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider">Quantité max.</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider hidden sm:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {FRANCHISE.map((f, i) => (
                  <tr key={f.article} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'}>
                    <td className="px-5 py-3 flex items-center gap-2 text-[#1a1a1a]">
                      <CheckCircle size={12} className="text-[#009A44] flex-shrink-0" /> {f.article}
                    </td>
                    <td className="px-5 py-3 font-bold text-[#003DA5]">{f.qte}</td>
                    <td className="px-5 py-3 text-[#888] hidden sm:table-cell text-xs">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modes de paiement */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Paiement</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Comment payer en boutique hors-taxes ?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { mode: 'USD & EUR', icon: CreditCard, note: 'Principales devises étrangères acceptées' },
              { mode: 'Carte bancaire', icon: ShieldCheck, note: 'Visa, Mastercard — paiement sécurisé' },
              { mode: 'Mobile Money', icon: Package, note: 'Airtel Money, M-Pesa, Orange Money' },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.mode} className="bg-[#f7f7f7] p-4 text-center">
                  <Icon size={20} className="text-[#003DA5] mx-auto mb-2" />
                  <p className="font-bold text-sm text-[#1a1a1a]">{p.mode}</p>
                  <p className="text-xs text-[#888] mt-1">{p.note}</p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
