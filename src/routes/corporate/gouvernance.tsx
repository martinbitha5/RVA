import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Scale, Users, UserCheck, Building2, ChevronRight, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/gouvernance')({
  component: GouvernancePage,
  head: () => ({ meta: [{ title: "Gouvernance — Aéroport International de N'djili · FIH" }] }),
});

const SUB_SECTIONS = [
  {
    key: 'boardOfDirectors',
    href: '/corporate/gouvernance/conseil-administration',
    Icon: Scale,
    label: 'Conseil d\'administration',
    desc: 'Composition, rôles et responsabilités du Conseil d\'Administration de la RVA',
  },
  {
    key: 'advisoryCommittee',
    href: '/corporate/gouvernance/comite-consultatif',
    Icon: Users,
    label: 'Comité consultatif',
    desc: 'Comité consultatif communautaire — représentants de Nsele, Masina, Kimbanseke',
  },
  {
    key: 'managementCommittee',
    href: '/corporate/gouvernance/comite-direction',
    Icon: UserCheck,
    label: 'Comité de direction',
    desc: 'Comité de direction et Direction Générale de la RVA',
  },
  {
    key: 'directions',
    href: '/corporate/gouvernance/directions',
    Icon: Building2,
    label: 'Directions opérationnelles',
    desc: 'Directions Technique, Financière, Exploitation, Sûreté, RH et Commerciale',
  },
] as const;

const BOARD_MEMBERS = [
  { name: 'Directeur Général',      role: 'Direction Générale RVA',        initial: 'DG' },
  { name: 'Secrétaire Général',     role: 'Secrétariat Général',           initial: 'SG' },
  { name: 'Directeur Technique',    role: 'Direction des Infrastructures', initial: 'DT' },
  { name: 'Directeur Financier',    role: 'Direction Financière',          initial: 'DF' },
  { name: 'Directeur Exploitation', role: 'Direction des Opérations',      initial: 'DE' },
  { name: 'Directeur Sûreté',       role: 'Direction de la Sûreté',        initial: 'DS' },
];

const PRINCIPLES = [
  { title: 'Transparence', desc: 'Publication annuelle des rapports d\'activité et financiers de la RVA conformément aux normes OHADA.' },
  { title: 'Responsabilité', desc: 'Reddition de comptes au Ministère des Transports et aux instances communautaires riveraines de l\'aéroport.' },
  { title: 'Conformité OACI', desc: 'Application rigoureuse des normes et pratiques recommandées (SARP) de l\'Organisation de l\'Aviation Civile Internationale.' },
  { title: 'Engagement local', desc: 'Consultation régulière des communes riveraines (Nsele, Masina, Kimbanseke) via le comité consultatif communautaire.' },
];

function GouvernancePage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        gradient="blue"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Gouvernance' },
        ]}
        eyebrow="Corporate RVA"
        title={t('corporate.governance')}
        subtitle="La Régie des Voies Aériennes est placée sous la tutelle du Ministère des Transports et Voies de Communication. Son organisation repose sur des principes de transparence, de conformité internationale et d'engagement envers les communautés riveraines."
      />

      {/* Governance principles — dark band */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Nos principes</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="border border-white/10 p-6">
                <p className="font-display text-lg font-bold text-white mb-2">{p.title}</p>
                <p className="text-sm text-white/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-sections */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Instances de gouvernance</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUB_SECTIONS.map(({ href, Icon, label, desc }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex items-start gap-5 border border-border bg-card p-6 hover:border-rdc-blue/40 hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-rdc-blue/10">
                  <Icon size={20} className="text-rdc-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-rdc-anthracite group-hover:text-rdc-blue transition-colors mb-1">{label}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0 mt-1 group-hover:text-rdc-blue transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership team */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Équipe de direction</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            {t('corporate.leadershipTeam')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BOARD_MEMBERS.map(m => (
              <div
                key={m.name}
                className="flex items-center gap-4 border border-border bg-background px-5 py-4"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-rdc-blue text-xs font-bold text-white">
                  {m.initial}
                </div>
                <div>
                  <p className="font-semibold text-sm text-rdc-anthracite">{m.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.role}</p>
                </div>
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
              <p className="font-display text-xl font-bold text-white">En savoir plus sur la RVA</p>
              <p className="text-sm text-white/65 mt-1">Consultez notre historique, nos projets d'avenir et nos opportunités de carrière.</p>
            </div>
            <Link
              to="/corporate/a-propos"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-rdc-blue hover:bg-rdc-yellow transition-colors whitespace-nowrap"
            >
              À propos de FIH <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
