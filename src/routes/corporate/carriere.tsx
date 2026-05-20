import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Briefcase, Users, Heart, TrendingUp, BookOpen, Search, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/carriere')({
  component: CarrierePage,
  head: () => ({ meta: [{ title: "Carrières — Rejoignez la RVA · FIH" }] }),
});

const SUB_SECTIONS = [
  { key: 'community',           href: '/corporate/carriere/communaute-fih',        Icon: Users,      color: 'bg-rdc-blue/10 text-rdc-blue' },
  { key: 'talentCommitment',    href: '/corporate/carriere/engagement-talents',    Icon: Heart,      color: 'bg-rdc-red/10 text-rdc-red' },
  { key: 'development',         href: '/corporate/carriere/se-developper',         Icon: TrendingUp, color: 'bg-rdc-green/10 text-rdc-green' },
  { key: 'programs',            href: '/corporate/carriere/programmes-politiques', Icon: BookOpen,   color: 'bg-amber-100 text-amber-700' },
  { key: 'jobOffers',           href: '/corporate/carriere/offres-emploi',         Icon: Search,     color: 'bg-purple-100 text-purple-700' },
] as const;

const NUMBERS = [
  { value: '1 200+', label: 'Employés directs RVA' },
  { value: '3 500+', label: 'Emplois indirects FIH' },
  { value: '15+',    label: 'Métiers représentés' },
  { value: '60%',    label: 'Agents âgés < 40 ans' },
];

const JOB_FAMILIES = [
  'Opérations aéroportuaires', 'Sécurité & Sûreté', 'Maintenance & Technique',
  'Finance & Comptabilité', 'Commerce & Marketing', 'Ressources Humaines',
  'Informatique & Numérique', 'Environnement & Développement durable',
];

function CarrierePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.careers')}</h1>
      <p className="mb-8 max-w-2xl text-sm text-muted-foreground">{t('corporate.careersSubtitle')}</p>

      {/* Numbers */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {NUMBERS.map(n => (
          <div key={n.label} className="rounded-2xl border border-border bg-card p-5 text-center">
            <p className="font-display text-3xl font-bold text-rdc-blue">{n.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{n.label}</p>
          </div>
        ))}
      </div>

      {/* Sub-sections */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite">Carrières à la RVA</h2>
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {SUB_SECTIONS.map(({ key, href, Icon, color }) => (
          <Link key={key} to={href as never}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-rdc-blue/30 hover:shadow-md transition-all">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`corporate.${key}`)}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Job families */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Nos familles de métiers</h2>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {JOB_FAMILIES.map(family => (
          <div key={family} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
            <Briefcase size={13} className="flex-shrink-0 text-rdc-blue" />
            <p className="text-sm">{family}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
