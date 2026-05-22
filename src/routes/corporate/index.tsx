import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Building2, Scale, Rocket, History, Briefcase,
  Handshake, Plane, Shield, ArrowRight, Users,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/corporate/')({
  component: CorporateHub,
  head: () => ({
    meta: [
      { title: "Corporate — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Informations institutionnelles sur l'Aéroport International de N'djili (FIH), géré par la Régie des Voies Aériennes (RVA) — Kinshasa, RDC." },
    ],
  }),
});

const MAIN_SECTIONS_DATA = [
  {
    icon: Building2,
    href: '/corporate/a-propos',
    labelKey: 'corporate.about',
    descKey: 'corporate.aboutDesc',
    accent: '#003DA5',
  },
  {
    icon: Scale,
    href: '/corporate/gouvernance',
    labelKey: 'corporate.governance',
    descKey: 'corporate.governanceDesc',
    accent: '#1A1A1A',
  },
  {
    icon: Rocket,
    href: '/corporate/projets-avenir',
    labelKey: 'corporate.futureProjects',
    descKey: 'corporate.futureProjectsDesc',
    accent: '#FFCE00',
  },
  {
    icon: History,
    href: '/corporate/historique',
    labelKey: 'corporate.history',
    descKey: 'corporate.historyDesc',
    accent: '#CE1126',
  },
] as const;

const OTHER_SECTIONS_DATA = [
  { icon: Briefcase, href: '/corporate/carriere', labelKey: 'corporate.careers', descKey: 'corporate.careersDesc' },
  { icon: Handshake, href: '/corporate/partenariats-commerciaux', labelKey: 'corporate.partnerships', descKey: 'corporate.partnershipsDesc' },
  { icon: Plane, href: '/corporate/services-aeriens', labelKey: 'corporate.airServices', descKey: 'corporate.airServicesDesc' },
  { icon: Shield, href: '/corporate/surete-securite', labelKey: 'corporate.safetyAndSecurity', descKey: 'corporate.safetyDesc' },
] as const;

const STATS = [
  { value: '1953', label: 'Année de fondation', sub: 'Aéroport de N\'djili' },
  { value: '1M+', label: 'Passagers / an (capacité)', sub: 'Nouveau terminal 2015' },
  { value: '17+', label: 'Compagnies aériennes', sub: 'Partenaires actifs' },
  { value: '4 700 m', label: 'Piste principale', sub: 'Piste 06/24 — asphalt' },
] as const;

function CorporateHub() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t('corporate.hubTitle')}
        title={t('corporate.hubTitle')}
        subtitle={t('corporate.hubSubtitle')}
        breadcrumbs={[{ label: t('home.hero.cta'), href: '/' }, { label: t('nav.corporate') }]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/corporate/a-propos' as never} className="btn-primary">
              <Building2 size={15} /> {t('corporate.about')}
            </Link>
            <Link to={'/corporate/projets-avenir' as never} className="btn-outline-white">
              <Rocket size={15} /> {t('corporate.futureProjects')}
            </Link>
          </div>
        }
      />

      {/* Stats strip */}
      <section className="bg-border py-0">
        <div className="grid grid-cols-2 gap-px md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-8 py-10 text-center">
              <p className="font-display text-4xl font-bold text-rdc-blue leading-none">{s.value}</p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-rdc-anthracite">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main sections — dark editorial grid */}
      <section className="section-night py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Informations institutionnelles</p>
          </div>
          <h2 className="display-sub text-white mb-12">
            Découvrir la RVA et FIH
          </h2>

          <div className="grid gap-0.5 bg-white/8 sm:grid-cols-2">
            {MAIN_SECTIONS_DATA.map((s) => (
              <Link
                key={s.href}
                to={s.href as never}
                className="group relative bg-rdc-anthracite p-10 flex flex-col gap-6 overflow-hidden hover:bg-white/5 transition-colors"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: s.accent }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center"
                    style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}
                  >
                    <s.icon size={26} style={{ color: s.accent }} strokeWidth={1.5} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-rdc-yellow w-8 h-8 flex items-center justify-center">
                      <ArrowRight size={14} className="text-rdc-anthracite" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-white text-2xl leading-snug group-hover:text-rdc-yellow transition-colors">
                    {t(s.labelKey)}
                  </h3>
                  <p className="mt-3 text-sm text-white/45 leading-relaxed">{t(s.descKey)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other sections — white grid */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Autres domaines</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-10">
            Carrières, partenariats & services
          </h2>

          <div className="grid gap-0.5 bg-border sm:grid-cols-2 lg:grid-cols-4">
            {OTHER_SECTIONS_DATA.map((s) => (
              <Link
                key={s.href}
                to={s.href as never}
                className="group relative bg-white p-7 flex flex-col gap-4 overflow-hidden hover:bg-rdc-blue/2 transition-colors"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-rdc-blue transition-all duration-500" />
                <div className="flex h-12 w-12 items-center justify-center bg-rdc-blue/8 border border-rdc-blue/15">
                  <s.icon size={20} className="text-rdc-blue" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-rdc-anthracite text-lg leading-snug group-hover:text-rdc-blue transition-colors">
                    {t(s.labelKey)}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t(s.descKey)}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-rdc-blue/60 group-hover:text-rdc-blue transition-colors mt-auto">
                  {t('common.viewAll')} <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Career CTA */}
      <section className="section-blue py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-yellow">Rejoindre l'équipe FIH</p>
              </div>
              <h2 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight">
                Construisez votre carrière à l'aéroport
              </h2>
              <p className="mt-4 text-white/60 text-base max-w-xl leading-relaxed">
                {t('corporate.careersSubtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link to={'/corporate/carriere/offres-emploi' as never} className="btn-primary whitespace-nowrap">
                <Users size={15} /> {t('corporate.jobOffers')}
              </Link>
              <Link to={'/corporate/carriere' as never} className="btn-outline-white whitespace-nowrap">
                {t('corporate.community')} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
