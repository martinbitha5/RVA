import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Briefcase, Users, Heart, TrendingUp, BookOpen, Search, ChevronRight, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/carriere')({
  component: CarrierePage,
  head: () => ({ meta: [{ title: "Carrières — Rejoignez l'équipe FIH · Aéroport de N'djili" }] }),
});

const SUB_SECTIONS = [
  {
    href: '/corporate/carriere/communaute-fih',
    Icon: Users,
    label: 'La communauté FIH',
    desc: 'Découvrez la diversité des équipes qui font vivre l\'aéroport de N\'djili au quotidien.',
    accent: 'bg-rdc-blue text-white',
  },
  {
    href: '/corporate/carriere/engagement-talents',
    Icon: Heart,
    label: 'Engagement envers les talents',
    desc: 'Notre promesse employeur : formation continue, évolution de carrière et bien-être au travail.',
    accent: 'bg-rdc-red text-white',
  },
  {
    href: '/corporate/carriere/se-developper',
    Icon: TrendingUp,
    label: 'Se développer à la RVA',
    desc: 'Parcours professionnels, mobilité interne et programmes de mentorat pour vos ambitions.',
    accent: 'bg-rdc-green text-white',
  },
  {
    href: '/corporate/carriere/programmes-politiques',
    Icon: BookOpen,
    label: 'Programmes & Politiques',
    desc: 'Stages, alternances, politiques d\'égalité et programmes de développement du leadership.',
    accent: 'bg-amber-500 text-white',
  },
  {
    href: '/corporate/carriere/offres-emploi',
    Icon: Search,
    label: 'Offres d\'emploi',
    desc: 'Consultez toutes nos offres actuelles et postulez directement en ligne.',
    accent: 'bg-rdc-anthracite text-white',
  },
] as const;

const NUMBERS = [
  { value: '1 200+', label: 'Employés directs RVA',    color: 'text-rdc-yellow' },
  { value: '3 500+', label: 'Emplois indirects FIH',   color: 'text-rdc-yellow' },
  { value: '15+',    label: 'Familles de métiers',     color: 'text-rdc-yellow' },
  { value: '60%',    label: 'Agents de moins de 40 ans', color: 'text-rdc-yellow' },
];

const JOB_FAMILIES = [
  { name: 'Opérations aéroportuaires', icon: Briefcase },
  { name: 'Sécurité & Sûreté',         icon: Briefcase },
  { name: 'Maintenance & Technique',   icon: Briefcase },
  { name: 'Finance & Comptabilité',    icon: Briefcase },
  { name: 'Commerce & Marketing',      icon: Briefcase },
  { name: 'Ressources Humaines',       icon: Briefcase },
  { name: 'Informatique & Numérique',  icon: Briefcase },
  { name: 'Environnement & Durabilité',icon: Briefcase },
];

const VALUES = [
  { title: 'Intégrité',   desc: 'Agir avec honnêteté et responsabilité dans toutes nos missions.' },
  { title: 'Excellence',  desc: 'Viser les standards internationaux OACI dans chaque fonction.' },
  { title: 'Engagement', desc: "Servir Kinshasa, la RDC et l'Afrique avec fierté." },
  { title: 'Innovation', desc: "Moderniser l'aéroport de N'djili pour les générations futures." },
];

function CarrierePage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        image="/images/fih-checkin.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Carrières' },
        ]}
        eyebrow="Rejoignez-nous"
        title={t('corporate.careers')}
        subtitle={t('corporate.careersSubtitle')}
        cta={
          <Link
            to={'/corporate/carriere/offres-emploi' as never}
            className="inline-flex items-center gap-2 bg-rdc-yellow px-6 py-3 text-sm font-bold text-rdc-anthracite hover:bg-white transition-colors"
          >
            Voir les offres d'emploi <ArrowRight size={14} />
          </Link>
        }
      />

      {/* Stats band */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {NUMBERS.map(n => (
              <div key={n.label} className="text-center">
                <p className={`font-display text-4xl font-bold ${n.color}`}>{n.value}</p>
                <p className="mt-2 text-xs text-white/50 leading-snug">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Nos valeurs</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(v => (
              <div key={v.title} className="border border-border bg-card p-6">
                <div className="mb-4 h-1 w-8 bg-rdc-blue" />
                <p className="font-bold text-rdc-anthracite mb-2">{v.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career paths */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Votre parcours</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Carrières à FIH
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUB_SECTIONS.map(({ href, Icon, label, desc, accent }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex flex-col gap-4 border border-border bg-background p-6 hover:border-rdc-blue/40 hover:shadow-lg transition-all"
              >
                <div className={`flex h-11 w-11 items-center justify-center ${accent}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-rdc-anthracite group-hover:text-rdc-blue transition-colors mb-1.5">{label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-rdc-blue">
                  Découvrir <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Job families */}
      <div className="bg-background">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Métiers</p>
          </div>
          <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">Nos familles de métiers</h2>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {JOB_FAMILIES.map(({ name }) => (
              <div key={name} className="flex items-center gap-3 border border-border bg-card px-4 py-3">
                <Briefcase size={13} className="flex-shrink-0 text-rdc-blue" />
                <p className="text-sm font-medium">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div className="bg-rdc-anthracite">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Prêt à rejoindre l'équipe ?</p>
              <p className="text-sm text-white/60 mt-1">Consultez toutes nos offres en cours et postulez directement en ligne.</p>
            </div>
            <Link
              to={'/corporate/carriere/offres-emploi' as never}
              className="flex items-center gap-2 bg-rdc-yellow px-6 py-3 text-sm font-bold text-rdc-anthracite hover:bg-white transition-colors whitespace-nowrap"
            >
              Offres d'emploi <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
