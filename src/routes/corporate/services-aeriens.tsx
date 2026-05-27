import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { Plane, Package, Navigation, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/services-aeriens')({
  component: ServicesAeriensLayout,
  head: () => ({
    meta: [
      { title: "Services aériens — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Services aériens à l'Aéroport de N'djili : aviation commerciale, fret et cargo international, aviation générale et jets privés." },
    ],
  }),
});

const SECTIONS = [
  {
    href: '/corporate/services-aeriens/aviation-commerciale',
    Icon: Plane,
    label: 'Aviation commerciale',
    desc: 'Vols commerciaux réguliers et charters : 17 compagnies, 34 destinations directes sur 4 continents.',
    stat: '17',
    statLabel: 'compagnies actives à FIH',
    color: '#003DA5',
  },
  {
    href: '/corporate/services-aeriens/fret',
    Icon: Package,
    label: 'Transport de fret & cargo',
    desc: 'Cargo international et domestique — 45 000 T/an, zone froide, transit 24h/24, intégration douanière DGDA.',
    stat: '45 000 T',
    statLabel: 'de fret annuel',
    color: '#d97706',
  },
  {
    href: '/corporate/services-aeriens/aviation-generale',
    Icon: Navigation,
    label: 'Aviation générale',
    desc: "Jets privés, hélicoptères, vols gouvernementaux, humanitaires et d'affaires. FBO dédié.",
    stat: 'FBO',
    statLabel: 'dédié aviation privée',
    color: '#009A44',
  },
] as const;

const CARGO_STATS = [
  { label: 'Tonnes exportées 2023',  value: '18 200 T' },
  { label: 'Tonnes importées 2023',  value: '26 800 T' },
  { label: 'Compagnies cargo',       value: '8' },
  { label: 'Surface entrepôts',      value: '12 000 m²' },
];

const AIRLINES_CARGO = [
  'Ethiopian Cargo', 'Turkish Cargo', 'Brussels Airlines Cargo',
  'Air France Cargo', 'Kenya Airways Cargo', 'EgyptAir Cargo',
  'FedEx Express', 'DHL Aviation',
];

const COMMERCIAL_AIRLINES = [
  { name: 'Ethiopian Airlines',  code: 'ET', alliance: 'Star Alliance',     type: 'International' },
  { name: 'Brussels Airlines',   code: 'SN', alliance: 'Star Alliance',     type: 'International' },
  { name: 'Air France',          code: 'AF', alliance: 'SkyTeam',           type: 'International' },
  { name: 'Kenya Airways',       code: 'KQ', alliance: 'SkyTeam',           type: 'International' },
  { name: 'Qatar Airways',       code: 'QR', alliance: 'Oneworld',          type: 'International' },
  { name: 'Turkish Airlines',    code: 'TK', alliance: 'Star Alliance',     type: 'International' },
  { name: 'EgyptAir',            code: 'MS', alliance: 'Star Alliance',     type: 'International' },
  { name: 'Royal Air Maroc',     code: 'AT', alliance: 'Oneworld',          type: 'International' },
  { name: 'RwandAir',            code: 'WB', alliance: 'Indépendant',       type: 'Régional' },
  { name: 'ASKY Airlines',       code: 'KP', alliance: 'Panabras',          type: 'Régional' },
  { name: 'South African Airways', code: 'SA', alliance: 'Star Alliance',   type: 'International' },
  { name: 'Uganda Airlines',     code: 'QU', alliance: 'Indépendant',       type: 'Régional' },
  { name: 'Congo Airways',       code: 'BC', alliance: 'Compagnie nationale', type: 'National / Régional' },
  { name: 'Air Moanda',          code: '8T', alliance: 'Indépendant',       type: 'Domestique' },
];

const DESTINATIONS_DOMESTIQUES = [
  { city: 'Lubumbashi', code: 'FBM', note: 'Capital économique — vols quotidiens' },
  { city: 'Goma',       code: 'GOM', note: 'Est du Congo — Nord-Kivu' },
  { city: 'Bukavu',     code: 'BKY', note: 'Sud-Kivu' },
  { city: 'Mbuji-Mayi', code: 'MJM', note: 'Capitale du diamant' },
  { city: 'Kisangani',  code: 'FKI', note: 'Province Tshopo' },
  { city: 'Mbandaka',   code: 'MDK', note: "Province de l'Équateur" },
  { city: 'Matadi',     code: 'MAT', note: 'Province Kongo-Central' },
  { city: 'Kananga',    code: 'KGA', note: 'Kasaï-Central' },
];

function ServicesAeriensLayout() {
  const matches = useMatches();
  const isLeaf = matches.at(-1)?.routeId === '/corporate/services-aeriens';
  return isLeaf ? <ServicesAeriensPage /> : <Outlet />;
}

function ServicesAeriensPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Piste de l'Aéroport N'djili — FIH" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · Aviation</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Services aériens à FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Services aériens</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats fret */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Trafic fret FIH 2023</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">FIH — Hub cargo de l'Afrique centrale</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CARGO_STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-2xl font-bold text-[#FFCE00] leading-none">{s.value}</p>
                <p className="mt-2 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Catégories de services */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Nos services</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Services aériens disponibles à FIH</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {SECTIONS.map(({ href, Icon, label, desc, stat, statLabel, color }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex flex-col border border-[#e8e8e8] bg-white overflow-hidden hover:border-[#003DA5]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 px-6 py-5" style={{ background: color }}>
                  <Icon size={20} className="text-white" />
                  <p className="font-bold text-white text-base">{label}</p>
                </div>
                <div className="flex-1 p-6">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                  <div className="border-t border-[#e8e8e8] pt-4">
                    <p className="text-2xl font-bold" style={{ color }}>{stat}</p>
                    <p className="text-xs text-gray-400">{statLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-6 pb-5 text-xs font-bold text-[#003DA5] group-hover:gap-2.5 transition-all">
                  En savoir plus <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Compagnies commerciales */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Compagnies aériennes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Compagnies opérant à FIH</h2>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMERCIAL_AIRLINES.map(a => (
              <div key={a.name} className="flex items-center gap-3 border border-[#e8e8e8] bg-white px-4 py-3">
                <span className="flex h-8 w-10 shrink-0 items-center justify-center bg-[#003DA5]/10 text-[10px] font-bold text-[#003DA5]">{a.code}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1a1a1a]">{a.name}</p>
                  <p className="text-[10px] text-gray-400">{a.alliance} · {a.type}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link to="/vols/compagnies-aeriennes" className="inline-flex items-center gap-2 text-sm font-bold text-[#003DA5] hover:text-[#003DA5]/80 transition-colors">
              Voir toutes les compagnies <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* Destinations domestiques */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Réseau intérieur</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Destinations domestiques depuis FIH</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-3xl">
            FIH est la principale porte d'entrée pour les vols intérieurs congolais — essentiels dans un pays aussi vaste que la RDC (2,3 M km², 100 M d'habitants), dont le réseau routier reste limité. Congo Airways, Air Moanda et d'autres opérateurs assurent les liaisons vers les provinces.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS_DOMESTIQUES.map(d => (
              <div key={d.code} className="flex items-center gap-3 border border-[#e8e8e8] bg-white px-4 py-3">
                <span className="flex h-8 w-12 shrink-0 items-center justify-center bg-[#009A44]/10 text-[10px] font-bold text-[#009A44]">{d.code}</span>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">{d.city}</p>
                  <p className="text-[10px] text-gray-400">{d.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opérateurs cargo */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Fret & Cargo</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Opérateurs fret à FIH</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-3xl">
            La RDC importe massivement (produits alimentaires, équipements médicaux, matériel minier) et exporte minerais, café et produits forestiers. FIH est le principal hub cargo d'Afrique centrale, gérant 45 000 tonnes par an.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {AIRLINES_CARGO.map(a => (
              <div key={a} className="flex items-center gap-2 border border-[#e8e8e8] bg-white px-4 py-2">
                <Package size={11} className="text-amber-500 shrink-0" />
                <p className="text-sm font-medium">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RDC enclavée */}
        <section className="border border-[#FFCE00]/40 bg-[#FFCE00]/5 p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Contexte RDC</p>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">L'importance vitale du fret aérien pour la RDC</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Avec un réseau routier de seulement 2 500 km bitumés pour un territoire de 2,3 millions de km², la République Démocratique du Congo dépend du transport aérien pour l'acheminement de denrées alimentaires, médicaments et équipements dans les provinces enclavées. FIH joue un rôle humanitaire et économique critique dans l'approvisionnement des 26 provinces congolaises.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { label: '2,3 M km²', note: 'Territoire RDC' },
              { label: '2 500 km', note: 'Routes bitumées' },
              { label: '26 provinces', note: 'À desservir' },
              { label: '100 M hab.', note: 'Population RDC' },
            ].map(f => (
              <div key={f.label} className="border border-[#e8e8e8] bg-white px-4 py-3 text-center">
                <p className="font-bold text-[#003DA5] text-sm">{f.label}</p>
                <p className="text-[10px] text-gray-400">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SSLIA */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Service incendie</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">SSLIA — Service de Sauvetage et Lutte contre l'Incendie</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
            L'aéroport de N'djili dispose d'un SSLIA de catégorie 8, conforme à l'OACI Annexe 14 — capable de traiter les urgences impliquant des aéronefs de type B747-8, A380 et B777X à pleine charge. Les équipes interviennent sous 3 minutes sur tout point de la piste principale.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { val: 'Cat. 8', label: 'Certification SSLIA', sub: 'Niveau A380 / B747-8' },
              { val: '< 3 min', label: "Temps d'intervention", sub: 'Sur tout point de piste' },
              { val: '24/7', label: 'Permanence', sub: 'Pompiers aéroportuaires RVA' },
            ].map(s => (
              <div key={s.label} className="border border-[#CE1126]/30 bg-[#CE1126]/5 p-5 text-center">
                <p className="text-2xl font-bold text-[#CE1126]">{s.val}</p>
                <p className="text-xs font-bold text-[#1a1a1a] mt-1">{s.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Ouvrir une liaison vers FIH</p>
              <h2 className="text-xl font-bold text-white mb-1">Développez votre réseau vers Kinshasa</h2>
              <p className="text-sm text-white/55 max-w-lg">Notre équipe services aériens accompagne les compagnies aériennes dans l'ouverture et le développement de liaisons vers FIH.</p>
            </div>
            <Link to="/corporate/partenariats-commerciaux" className="shrink-0 flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-[#003DA5] hover:bg-[#FFCE00] transition-colors">
              Partenariats aériens <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
