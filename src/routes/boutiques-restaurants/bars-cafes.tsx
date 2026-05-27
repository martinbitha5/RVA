import { createFileRoute, Link } from '@tanstack/react-router';
import { Coffee, MapPin, Clock, ArrowRight, Beer } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/bars-cafes')({
  component: BarsCafesPage,
  head: () => ({
    meta: [
      { title: "Bars & Cafés — Aéroport N'djili · FIH" },
      { name: 'description', content: "Bars et cafés à l'Aéroport International de N'djili FIH — café arabica du Kivu, bières congolaises Primus, Skol, Tembo King." },
    ],
  }),
});

const ETABLISSEMENTS = [
  {
    nom: 'Café Arabica du Kivu',
    type: 'Café & Salon de thé',
    terminal: 'Terminal International — Hall Départs, Niveau 1',
    horaires: '05 h 30 – 22 h 00',
    desc: 'Spécialisé dans le café arabica d\'altitude du Kivu, l\'un des meilleurs cafés d\'Afrique subsaharienne. Cappuccino, espresso, cold brew, mais aussi thé noir et tisanes congolaises au gingembre et à la citronnelle.',
    boissons: ['Espresso Kivu', 'Cappuccino', 'Cold brew', 'Thé gingembre', 'Tisane citronnelle'],
    accent: '#C2702F',
    icon: Coffee,
  },
  {
    nom: 'Bar Primus FIH',
    type: 'Bar & Brasserie',
    terminal: 'Terminal International — Zone VIP, Niveau 1',
    horaires: '10 h 00 – 23 h 00',
    desc: 'Le bar officiel de la Brasseries du Congo à FIH. Bières pression Primus et Skol, Tembo King en canette, sodas Coca-Cola et jus locaux. Snacks et tapas légers disponibles toute la journée.',
    boissons: ['Primus pression', 'Skol', 'Tembo King', 'Cocktails tropicaux', 'Jus locaux'],
    accent: '#CE1126',
    icon: Beer,
  },
  {
    nom: 'Viennoiserie des Tropiques',
    type: 'Café & Pâtisserie',
    terminal: 'Terminal International — Hall Arrivées, Niveau 0',
    horaires: '05 h 00 – 20 h 00',
    desc: 'Croissants chauds, pains au chocolat et baguettes fraîches livrées chaque matin depuis Kinshasa. Café filtre, café au lait, chocolat chaud. Idéal pour un petit-déjeuner rapide avant l\'enregistrement.',
    boissons: ['Café filtre', 'Café au lait', 'Chocolat chaud', 'Jus d\'orange pressé'],
    accent: '#FFCE00',
    icon: Coffee,
  },
  {
    nom: 'Lounge Bar Domestique',
    type: 'Bar',
    terminal: 'Terminal Domestique — Salle d\'attente',
    horaires: '06 h 00 – 21 h 00',
    desc: 'Bar convivial avant les vols intérieurs vers Lubumbashi, Goma, Bukavu, Kisangani et Mbuji-Mayi. Softs, bières fraîches, café soluble et en-cas légers. Ambiance décontractée typiquement kinoise.',
    boissons: ['Bière Primus', 'Café soluble', 'Jus tropical', 'Sodas', 'Eau fraîche'],
    accent: '#003DA5',
    icon: Beer,
  },
];

const BIERES_LOCALES = [
  {
    nom: 'Primus',
    desc: 'La bière nationale de la RDC — brassée à Kinshasa depuis 1923. Lager blonde légère, 5,5° vol. Icône culturelle kinoise.',
    note: 'Brasseries du Congo',
  },
  {
    nom: 'Skol Pression',
    desc: 'Lager internationale brassée localement. Très rafraîchissante, appréciée en pression au bar. 5,2° vol.',
    note: 'Brasseries du Congo',
  },
  {
    nom: 'Tembo King',
    desc: 'Bière forte en canette, très populaire à Kinshasa. 7,5° vol. Son nom signifie "Éléphant" en swahili.',
    note: 'Brasseries du Congo',
  },
  {
    nom: 'Turbo King',
    desc: 'Bière malt forte, taste sucré et corsé. Référence des "après-matchs" et soirées kinoisies. 8° vol.',
    note: 'Brasseries du Congo',
  },
];

function BarsCafesPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Bars et cafés à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Boutiques & Restaurants</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Bars & Cafés à FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#C2702F] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Café arabica du Kivu · Bières Primus & Skol
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Intro */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Boissons & Détente</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Détendez-vous avant votre vol</h2>
          <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
            Des bars animés aux cafés feutrés, FIH vous propose une sélection d'établissements où savourer
            le meilleur de Kinshasa dans votre verre. Café arabica d'altitude du Lac Kivu, bières congolaises
            incontournables, cocktails tropicaux et jus de fruits frais — chaque moment d'attente devient un plaisir.
          </p>
        </section>

        {/* Liste établissements */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Tous les établissements</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Bars & Cafés dans les terminaux</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {ETABLISSEMENTS.map((e) => {
              const Icon = e.icon;
              return (
                <div key={e.nom} className="border border-[#e8e8e8] bg-white p-5 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center" style={{ background: `${e.accent}18`, border: `1px solid ${e.accent}40` }}>
                      <Icon size={18} style={{ color: e.accent }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: e.accent }}>{e.type}</span>
                      <h3 className="font-bold text-[#1a1a1a] text-base">{e.nom}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#666] leading-relaxed">{e.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {e.boissons.map((b) => (
                      <span key={b} className="bg-[#f5f5f5] px-2 py-0.5 text-[10px] font-medium text-[#555]">{b}</span>
                    ))}
                  </div>
                  <div className="border-t border-[#f0f0f0] pt-3 space-y-1.5">
                    <p className="flex items-start gap-1.5 text-[11px] text-[#777]">
                      <MapPin size={11} className="flex-shrink-0 text-[#003DA5] mt-0.5" />
                      {e.terminal}
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
                      <Clock size={11} className="flex-shrink-0 text-[#003DA5]" />
                      {e.horaires}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bières locales */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CE1126] mb-2">Bières congolaises</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Les incontournables des Brasseries du Congo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BIERES_LOCALES.map((b) => (
              <div key={b.nom} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Beer size={16} className="text-[#CE1126]" />
                  <h3 className="font-bold text-sm text-[#1a1a1a]">{b.nom}</h3>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-3">{b.desc}</p>
                <p className="text-[10px] text-[#999]">{b.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Horaires */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Horaires d'ouverture</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Quand profiter de nos bars & cafés ?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { plage: 'Tôt le matin', heures: '05 h 00 – 08 h 00', note: 'Café & viennoiseries pour les vols matinaux', couleur: '#C2702F' },
              { plage: 'Journée', heures: '08 h 00 – 18 h 00', note: 'Tous les établissements ouverts', couleur: '#003DA5' },
              { plage: 'Soirée', heures: '18 h 00 – 23 h 00', note: 'Bar Primus FIH et Brasserie 24h', couleur: '#CE1126' },
            ].map((h) => (
              <div key={h.plage} className="p-4 bg-[#f7f7f7] text-center">
                <p className="font-bold text-[#1a1a1a] text-sm">{h.plage}</p>
                <p className="font-bold text-lg mt-1" style={{ color: h.couleur }}>{h.heures}</p>
                <p className="text-xs text-[#888] mt-1">{h.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lien restaurants */}
        <div className="flex items-center justify-between border border-[#e8e8e8] bg-white p-5">
          <div className="flex items-center gap-3">
            <Coffee size={18} className="text-[#C2702F]" />
            <p className="text-sm text-[#555]">Faim après le café ? Découvrez nos <span className="font-semibold text-[#1a1a1a]">Restaurants</span></p>
          </div>
          <Link to={'/boutiques-restaurants/restaurants' as never} className="flex items-center gap-1.5 text-[11px] font-bold text-[#003DA5] hover:underline">
            Voir <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </main>
  );
}
