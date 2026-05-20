import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Plane, Package, Navigation, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/services-aeriens')({
  component: ServicesAeriensPage,
  head: () => ({ meta: [{ title: "Services aériens — RVA · FIH" }] }),
});

const SECTIONS = [
  { key: 'cargo',             href: '/corporate/services-aeriens/fret',                Icon: Package,    color: 'bg-amber-100 text-amber-700',    desc: 'Transport de fret international et domestique' },
  { key: 'generalAviation',   href: '/corporate/services-aeriens/aviation-generale',   Icon: Navigation, color: 'bg-rdc-blue/10 text-rdc-blue',   desc: 'Aviation d\'affaires, jets privés, hélicoptères' },
  { key: 'commercialAviation',href: '/corporate/services-aeriens/aviation-commerciale',Icon: Plane,      color: 'bg-rdc-green/10 text-rdc-green', desc: 'Vols commerciaux réguliers et charters' },
] as const;

const CARGO_STATS = [
  { label: 'Tonnes fret exportées 2023', value: '18 200 T' },
  { label: 'Tonnes fret importées 2023', value: '26 800 T' },
  { label: 'Compagnies fret actives',    value: '8' },
  { label: 'Surface entrepôts',          value: '12 000 m²' },
];

const AIRLINES_CARGO = ['Ethiopian Cargo', 'Turkish Cargo', 'Brussels Airlines Cargo', 'Air France Cargo', 'Kenya Airways Cargo', 'EgyptAir Cargo', 'FedEx Express', 'DHL Aviation'];

function ServicesAeriensPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.airServices')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.airServicesSubtitle')}</p>

      {/* Sub-sections */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {SECTIONS.map(({ key, href, Icon, color, desc }) => (
          <Link key={key} to={href as never}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 hover:border-rdc-blue/30 hover:shadow-md transition-all">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`corporate.${key}`)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-xs font-medium text-rdc-blue">
              En savoir plus <ChevronRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      {/* Cargo stats */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Trafic fret FIH</h2>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CARGO_STATS.map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="font-display text-2xl font-bold text-amber-600">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cargo airlines */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Compagnies fret opérant à FIH</h2>
      <div className="flex flex-wrap gap-2">
        {AIRLINES_CARGO.map(a => (
          <div key={a} className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">
            <Package size={10} className="text-amber-600" /> {a}
          </div>
        ))}
      </div>
    </div>
  );
}
