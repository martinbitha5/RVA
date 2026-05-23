import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Plane, Package, Navigation, ChevronRight, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/services-aeriens')({
  component: ServicesAeriensLayout,
  head: () => ({ meta: [{ title: "Services aériens — Aéroport International de N'djili · FIH" }] }),
});

const SECTIONS = [
  {
    href: '/corporate/services-aeriens/aviation-commerciale',
    Icon: Plane,
    label: 'Aviation commerciale',
    desc: 'Vols commerciaux réguliers et charters : 17 compagnies, 34 destinations directes sur 4 continents.',
    stat: '17 compagnies',
    statLabel: 'actives à FIH',
    accent: 'bg-rdc-blue',
  },
  {
    href: '/corporate/services-aeriens/fret',
    Icon: Package,
    label: 'Transport de fret',
    desc: 'Cargo international et domestique — 45 000 tonnes/an, zone froide, transit 24h/24, intégration DGDA.',
    stat: '45 000 T',
    statLabel: 'fret annuel',
    accent: 'bg-amber-500',
  },
  {
    href: '/corporate/services-aeriens/aviation-generale',
    Icon: Navigation,
    label: 'Aviation générale',
    desc: 'Aviation d\'affaires, jets privés, hélicoptères, vols gouvernementaux et humanitaires.',
    stat: 'FBO',
    statLabel: 'dédié aviation privée',
    accent: 'bg-rdc-green',
  },
] as const;

const CARGO_STATS = [
  { label: 'Tonnes exportées 2023', value: '18 200 T', color: 'text-rdc-yellow' },
  { label: 'Tonnes importées 2023', value: '26 800 T', color: 'text-rdc-yellow' },
  { label: 'Compagnies fret',       value: '8',        color: 'text-rdc-yellow' },
  { label: 'Surface entrepôts',     value: '12 000 m²',color: 'text-rdc-yellow' },
];

const AIRLINES_CARGO = [
  'Ethiopian Cargo', 'Turkish Cargo', 'Brussels Airlines Cargo',
  'Air France Cargo', 'Kenya Airways Cargo', 'EgyptAir Cargo',
  'FedEx Express', 'DHL Aviation',
];

const COMMERCIAL_AIRLINES = [
  { name: 'Ethiopian Airlines', code: 'ET', alliance: 'Star Alliance' },
  { name: 'Brussels Airlines',  code: 'SN', alliance: 'Star Alliance' },
  { name: 'Air France',         code: 'AF', alliance: 'SkyTeam' },
  { name: 'Kenya Airways',      code: 'KQ', alliance: 'SkyTeam' },
  { name: 'Qatar Airways',      code: 'QR', alliance: 'Oneworld' },
  { name: 'Turkish Airlines',   code: 'TK', alliance: 'Star Alliance' },
  { name: 'EgyptAir',           code: 'MS', alliance: 'Star Alliance' },
  { name: 'Royal Air Maroc',    code: 'AT', alliance: 'Oneworld' },
  { name: 'RwandAir',           code: 'WB', alliance: 'Indépendant' },
  { name: 'Congo Airways',      code: 'BC', alliance: 'Compagnie nationale' },
  { name: 'ASKY Airlines',      code: 'KP', alliance: 'Panabras' },
  { name: 'Air Moanda',         code: '8T', alliance: 'Domestique' },
];

function ServicesAeriensLayout() {
  const matches = useMatches();
  const isLeaf = matches.at(-1)?.routeId === '/corporate/services-aeriens';
  return isLeaf ? <ServicesAeriensPage /> : <Outlet />;
}

function ServicesAeriensPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        image="/images/fih-hero-1.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Services aériens' },
        ]}
        eyebrow="Corporate · Aviation"
        title={t('corporate.airServices')}
        subtitle={t('corporate.airServicesSubtitle')}
      />

      {/* Cargo stats band */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="mb-8 flex items-center gap-4">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Trafic fret FIH 2023</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {CARGO_STATS.map(s => (
              <div key={s.label} className="border border-white/10 p-6 text-center">
                <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-2 text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service categories */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Nos services</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Services aériens disponibles à FIH
          </h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {SECTIONS.map(({ href, Icon, label, desc, stat, statLabel, accent }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex flex-col border border-border bg-card overflow-hidden hover:border-rdc-blue/40 hover:shadow-lg transition-all"
              >
                <div className={`flex items-center gap-3 px-6 py-5 ${accent}`}>
                  <Icon size={22} className="text-white" />
                  <p className="font-bold text-white text-lg">{label}</p>
                </div>
                <div className="flex-1 p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-display text-2xl font-bold text-rdc-blue">{stat}</p>
                    <p className="text-xs text-muted-foreground">{statLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-6 pb-5 text-xs font-bold text-rdc-blue group-hover:gap-2.5 transition-all">
                  En savoir plus <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Commercial airlines */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Compagnies commerciales</p>
          </div>
          <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">
            Compagnies opérant à FIH
          </h2>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMERCIAL_AIRLINES.map(a => (
              <div key={a.name} className="flex items-center gap-3 border border-border bg-background px-4 py-3">
                <span className="flex h-8 w-10 flex-shrink-0 items-center justify-center bg-rdc-blue/10 text-[10px] font-bold text-rdc-blue">{a.code}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-rdc-anthracite">{a.name}</p>
                  <p className="text-[10px] text-muted-foreground">{a.alliance}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link
              to="/vols/compagnies-aeriennes"
              className="inline-flex items-center gap-2 text-sm font-bold text-rdc-blue hover:text-rdc-blue/80 transition-colors"
            >
              Voir toutes les compagnies <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Cargo airlines */}
      <div className="bg-background">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Fret & Cargo</p>
          </div>
          <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">Opérateurs fret à FIH</h2>
          <div className="flex flex-wrap gap-2.5">
            {AIRLINES_CARGO.map(a => (
              <div key={a} className="flex items-center gap-2 border border-border bg-card px-4 py-2">
                <Package size={11} className="text-amber-500 flex-shrink-0" />
                <p className="text-sm font-medium">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rdc-blue">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Ouvrir une liaison vers FIH</p>
              <p className="text-sm text-white/65 mt-1">Notre équipe services aériens accompagne les compagnies dans leur développement réseau vers Kinshasa.</p>
            </div>
            <Link
              to="/corporate/partenariats-commerciaux"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-rdc-blue hover:bg-rdc-yellow transition-colors whitespace-nowrap"
            >
              Partenariats aériens <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
