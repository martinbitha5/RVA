import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Handshake, BarChart3, Store, Eye, Building, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/partenariats-commerciaux')({
  component: PartenariatsPage,
  head: () => ({ meta: [{ title: "Partenariats commerciaux — RVA · FIH" }] }),
});

const SUB_SECTIONS = [
  { key: 'fihOverview', href: '/corporate/partenariats/apercu-fih',    Icon: BarChart3, color: 'bg-rdc-blue/10 text-rdc-blue', desc: 'Statistiques trafic et données commerciales FIH' },
  { key: 'concessions', href: '/corporate/partenariats/concessions',   Icon: Store,     color: 'bg-rdc-green/10 text-rdc-green', desc: 'Appels d\'offres et concessions disponibles' },
  { key: 'visibility',  href: '/corporate/partenariats/visibilite',    Icon: Eye,       color: 'bg-amber-100 text-amber-700', desc: 'Publicite et espaces de visibilite dans les terminaux' },
  { key: 'realEstate',  href: '/corporate/partenariats/immobilier',    Icon: Building,  color: 'bg-purple-100 text-purple-700', desc: 'Immobilier aéroportuaire — location espaces et bureaux' },
] as const;

const TRAFFIC_STATS = [
  { label: 'Passagers 2023',        value: '1,8M',   trend: '+12%' },
  { label: 'Vols commerciaux',      value: '14 200', trend: '+8%' },
  { label: 'Tonnes de fret',        value: '45 000', trend: '+22%' },
  { label: 'Compagnies aériennes',  value: '17',     trend: '+3' },
  { label: 'Destinations directes', value: '34',     trend: '+5' },
  { label: 'Surface commerciale',   value: '6 200 m²', trend: 'En extension' },
];

function PartenariatsPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.partnerships')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.partnershipsSubtitle')}</p>

      {/* Traffic stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {TRAFFIC_STATS.map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-display text-2xl font-bold text-rdc-blue">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            <span className="mt-2 inline-block rounded-full bg-rdc-green/10 px-2 py-0.5 text-[10px] font-medium text-rdc-green">{s.trend}</span>
          </div>
        ))}
      </div>

      {/* Sub-sections */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Handshake size={18} className="text-rdc-blue" /> Opportunités de partenariat
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {SUB_SECTIONS.map(({ key, href, Icon, color, desc }) => (
          <Link key={key} to={href as never}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-rdc-blue/30 hover:shadow-md transition-all">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`corporate.${key}`)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
