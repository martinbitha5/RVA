import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { BarChart3, Store, Eye, Building, ChevronRight, ArrowRight, TrendingUp, Plane, LineChart, CreditCard, Globe, FileText } from 'lucide-react';

export const Route = createFileRoute('/corporate/partenariats-commerciaux')({
  component: PartenariatsLayout,
  head: () => ({
    meta: [
      { title: "Partenariats commerciaux — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Partenariats commerciaux à l'Aéroport de N'djili (FIH) : concessions, immobilier, publicité, appels d'offres — contact RVA." },
    ],
  }),
});

function PartenariatsLayout() {
  const matches = useMatches();
  const isLeaf = matches.at(-1)?.routeId === '/corporate/partenariats-commerciaux';
  return isLeaf ? <PartenariatsPage /> : <Outlet />;
}

const SUB_SECTIONS = [
  { href: '/corporate/partenariats-commerciaux/apercu-fih', Icon: BarChart3, label: 'Aperçu FIH',               desc: 'Statistiques trafic 2023, données commerciales et perspectives de croissance du marché congolais.' },
  { href: '/corporate/partenariats-commerciaux/concessions', Icon: Store,    label: 'Concessions',              desc: "Appels d'offres et concessions disponibles pour les espaces commerciaux des terminaux." },
  { href: '/corporate/partenariats-commerciaux/visibilite',  Icon: Eye,      label: 'Visibilité & Publicité',   desc: 'Espaces publicitaires, écrans numériques et solutions de branding dans les terminaux.' },
  { href: '/corporate/partenariats-commerciaux/immobilier',  Icon: Building, label: 'Immobilier aéroportuaire', desc: "Location d'espaces bureaux, hangars, entrepôts et locaux commerciaux en zone aéroportuaire." },
] as const;

const TRAFFIC_STATS = [
  { label: 'Passagers 2023',       value: '1,8 M',   unit: '+12%' },
  { label: 'Vols commerciaux',     value: '14 200',  unit: '+8%' },
  { label: 'Tonnes de fret',       value: '45 000',  unit: '+22%' },
  { label: 'Compagnies aériennes', value: '17',      unit: '+3' },
];

const WHY_FIH = [
  {
    Icon: Plane,
    title: 'Hub stratégique Afrique centrale',
    desc: "Kinshasa est la 3ᵉ plus grande ville d'Afrique sub-saharienne. FIH dessert 34 destinations sur 4 continents avec 17 compagnies. Le marché congolais est l'un des plus sous-desservis et à plus fort potentiel du continent.",
  },
  {
    Icon: LineChart,
    title: 'Croissance soutenue du trafic',
    desc: 'Le trafic passagers a progressé de +12% en 2023. La nouvelle capacité terminale (2027 : 5M pax/an) ouvre des perspectives commerciales uniques. La classe moyenne kinoise est en forte croissance.',
  },
  {
    Icon: CreditCard,
    title: "Premier aéroport Mobile Money d'Afrique centrale",
    desc: "FIH est le premier aéroport d'Afrique centrale à intégrer nativement Airtel Money, M-Pesa Vodacom et Orange Money dans tous ses services. L'écosystème de paiement local est un différenciateur majeur.",
  },
  {
    Icon: Globe,
    title: '6 200 m² commerciaux actuels',
    desc: "Surface commerciale en cours d'extension à 9 000 m² avec l'ouverture du nouveau terminal international en 2027. Zone duty free, restaurants, boutiques, bureaux de change — tous en concession.",
  },
];

const CONCESSION_TYPES = [
  { type: 'Restauration',        desc: 'Restaurants, snacks, cafés et boulangeries dans les zones pré et post-sécurité', slots: '8 emplacements disponibles' },
  { type: 'Commerce de détail', desc: 'Boutiques mode, presse, souvenirs, artisanat congolais, électronique', slots: '12 emplacements disponibles' },
  { type: 'Services financiers', desc: 'Bureaux de change, ATM, assurances voyages — demande très forte (USD/CDF)', slots: '4 emplacements' },
  { type: 'Duty Free',          desc: 'Zone hors taxes internationale — alcools, parfums, cosmétiques, tabac', slots: '1 espace principal' },
  { type: 'Salons VIP',         desc: 'Salons compagnies ou indépendants — passagers business et premium', slots: '2 emplacements zone embarquement' },
  { type: 'Services voyageurs', desc: 'Pharmacie, optique, service de conciergerie, agences de voyage', slots: '3 emplacements disponibles' },
];

const PROCEDURE_STEPS = [
  { n: '01', title: "Expression d'intérêt", desc: "Envoyez une expression d'intérêt à partenariats@fih-rva.com avec présentation de votre société et concept." },
  { n: '02', title: 'Dossier de candidature', desc: "Après examen préliminaire favorable, dépôt d'un dossier complet (business plan, chiffre d'affaires prévisionnel, caution)." },
  { n: '03', title: 'Sélection & négociation', desc: 'La commission RVA sélectionne les candidats retenus. Négociation des termes du contrat de concession (durée, redevance).' },
  { n: '04', title: 'Signature & ouverture', desc: "Signature du contrat de concession, obtention badge d'accès, aménagement selon normes FIH et ouverture." },
];

function PartenariatsPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Espaces commerciaux Terminal FIH — Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · Développement commercial</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Partenariats commerciaux à l'Aéroport FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Partenariats</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Trafic stats */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Trafic FIH 2023</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Un marché aéroportuaire en forte croissance</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRAFFIC_STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold text-[#FFCE00] leading-none">{s.value}</p>
                <p className="mt-2 text-xs font-bold text-[#1a1a1a]">{s.label}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#009A44]">
                  <TrendingUp size={10} /> {s.unit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi FIH */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Pourquoi FIH ?</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Un marché à fort potentiel</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_FIH.map(o => (
              <div key={o.title} className="flex gap-4 border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#003DA5]/10">
                  <o.Icon size={20} className="text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a] mb-2">{o.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Types de concessions */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Opportunités disponibles</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Types de concessions à FIH</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONCESSION_TYPES.map(c => (
              <div key={c.type} className="border border-[#e8e8e8] bg-white p-5">
                <div className="h-0.5 w-8 bg-[#009A44] mb-4" />
                <p className="font-bold text-[#1a1a1a] text-sm mb-2">{c.type}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.desc}</p>
                <span className="text-[10px] font-bold text-[#009A44] bg-[#009A44]/10 px-2 py-0.5">{c.slots}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Rubriques */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Nos rubriques partenariats</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Explorer les opportunités</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUB_SECTIONS.map(({ href, Icon, label, desc }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex items-start gap-5 border border-[#e8e8e8] bg-white p-6 hover:border-[#003DA5]/40 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#003DA5]/10">
                  <Icon size={20} className="text-[#003DA5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors mb-1">{label}</p>
                  <p className="text-sm text-gray-500 leading-snug">{desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1 group-hover:text-[#003DA5] transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Procédure */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Comment candidater</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Procédure de candidature</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCEDURE_STEPS.map(s => (
              <div key={s.n} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center bg-[#003DA5] text-sm font-bold text-white mb-4">
                  {s.n}
                </div>
                <p className="font-bold text-[#1a1a1a] text-sm mb-2">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-4">Documents utiles</p>
          <div className="flex flex-wrap gap-3">
            {[
              'Cahier des charges concessions FIH 2024',
              'Grille tarifaire redevances aéroportuaires',
              "Normes d'aménagement commercial FIH",
              "Formulaire expression d'intérêt",
            ].map(d => (
              <div key={d} className="flex items-center gap-2 border border-[#e8e8e8] bg-white px-4 py-2.5">
                <FileText size={13} className="text-[#003DA5] shrink-0" />
                <p className="text-sm font-medium text-[#1a1a1a]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">Pour recevoir ces documents : <a href="mailto:partenariats@fih-rva.com" className="text-[#003DA5] font-semibold hover:underline">partenariats@fih-rva.com</a></p>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Contact commercial</p>
              <h2 className="text-xl font-bold text-white mb-1">Intéressé par un partenariat à FIH ?</h2>
              <p className="text-sm text-white/55 max-w-lg">Notre équipe commerciale vous répond sous 48h ouvrables. Nous étudions toutes les candidatures sérieuses.</p>
            </div>
            <a href="mailto:partenariats@fih-rva.com" className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
              partenariats@fih-rva.com <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
