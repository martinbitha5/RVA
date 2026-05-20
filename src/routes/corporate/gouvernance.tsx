import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Scale, Users, UserCheck, Building2, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/gouvernance')({
  component: GouvernancePage,
  head: () => ({ meta: [{ title: "Gouvernance — RVA · FIH" }] }),
});

const SUB_SECTIONS = [
  { key: 'boardOfDirectors',  href: '/corporate/gouvernance/conseil-administration', Icon: Scale,     desc: 'Conseil d\'administration de la RVA' },
  { key: 'advisoryCommittee', href: '/corporate/gouvernance/comite-consultatif',     Icon: Users,     desc: 'Comité consultatif communautaire (Nsele, Masina, Kimbanseke)' },
  { key: 'managementCommittee',href: '/corporate/gouvernance/comite-direction',      Icon: UserCheck, desc: 'Comité de direction et Direction Générale' },
  { key: 'directions',        href: '/corporate/gouvernance/directions',             Icon: Building2, desc: 'Directions opérationnelles de la RVA' },
] as const;

const BOARD_MEMBERS = [
  { name: 'Directeur Général',     role: 'Direction Générale RVA',           initial: 'DG' },
  { name: 'Secrétaire Général',    role: 'Secrétariat Général',              initial: 'SG' },
  { name: 'Directeur Technique',   role: 'Direction des Infrastructures',    initial: 'DT' },
  { name: 'Directeur Financier',   role: 'Direction Financière',             initial: 'DF' },
  { name: 'Directeur Exploitation',role: 'Direction des Opérations',         initial: 'DE' },
  { name: 'Directeur Sûreté',      role: 'Direction de la Sûreté',          initial: 'DS' },
];

function GouvernancePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.governance')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.governanceSubtitle')}</p>

      {/* Sub-sections */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {SUB_SECTIONS.map(({ key, href, Icon, desc }) => (
          <Link key={key} to={href as never}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-rdc-blue/30 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-rdc-blue/10">
              <Icon size={18} className="text-rdc-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`corporate.${key}`)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Leadership preview */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite">{t('corporate.leadershipTeam')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BOARD_MEMBERS.map(m => (
          <div key={m.name} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rdc-blue text-xs font-bold text-white">
              {m.initial}
            </div>
            <div>
              <p className="font-medium text-sm text-rdc-anthracite">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
