import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Leaf, Volume2, Construction, Users,
  ArrowRight, MessageSquare, Paintbrush2,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/communaute/')({
  component: CommunauteHub,
  head: () => ({
    meta: [
      { title: "Communauté — Aéroport N'djili · FIH" },
      { name: 'description', content: "Engagement de la RVA envers les communautés riveraines de Nsele, Masina et Kimbanseke, l'environnement et le développement durable." },
    ],
  }),
});

const MAIN_CARDS_DATA = [
  {
    icon: Leaf,
    href: '/communaute/environnement-durabilite',
    labelKey: 'community.environmentSustainability',
    descKey: 'community.envSubtitle',
    gradient: 'linear-gradient(135deg, #005A28 0%, #009A44 100%)',
    count: '4 sous-sections',
  },
  {
    icon: Volume2,
    href: '/communaute/environnement-sonore',
    labelKey: 'community.noiseEnvironment',
    descKey: 'community.noiseSubtitle',
    gradient: 'linear-gradient(135deg, #B45309 0%, #D97706 100%)',
    count: '6 sous-sections',
  },
  {
    icon: Users,
    href: '/communaute/relations-communaute',
    labelKey: 'community.communityRelations',
    descKey: 'community.communitySubtitle',
    gradient: 'linear-gradient(135deg, #003DA5 0%, #0052CC 100%)',
    count: '5 initiatives',
  },
  {
    icon: Paintbrush2,
    href: '/communaute/relations-communaute',
    labelKey: 'community.fihArt',
    descKey: 'home.community.art.desc',
    gradient: 'linear-gradient(135deg, #7C1B28 0%, #CE1126 100%)',
    count: 'Programme actif',
  },
] as const;

const COMMUNES = [
  { name: 'Nsele', num: '01', pop: '~300 000 hab.', role: 'Commune hôte — siège de FIH' },
  { name: 'Masina', num: '02', pop: '~850 000 hab.', role: 'Principale zone impactée par le bruit' },
  { name: 'Kimbanseke', num: '03', pop: '~600 000 hab.', role: "Trajectoires d'approche" },
  { name: 'N\'djili', num: '04', pop: '~700 000 hab.', role: 'Impact communautaire fort' },
] as const;

function CommunauteHub() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t('community.hubTitle')}
        title={t('community.hubTitle')}
        subtitle={t('community.hubSubtitle')}
        breadcrumbs={[{ label: t('home.hero.cta'), href: '/' }, { label: t('nav.community') }]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/communaute/relations-communaute' as never} className="btn-primary">
              <Users size={15} /> {t('community.communityRelations')}
            </Link>
            <Link to={'/communaute/environnement-sonore' as never} className="btn-outline-white">
              <MessageSquare size={15} /> {t('community.noiseComplaints')}
            </Link>
          </div>
        }
      />

      {/* Main 4 cards — dark photo-style */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Nos engagements</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-12">
            Au-delà de l'aéroport
          </h2>

          <div className="grid gap-0.5 bg-border sm:grid-cols-2">
            {MAIN_CARDS_DATA.map((card) => (
              <Link
                key={card.href + card.labelKey}
                to={card.href as never}
                className="group relative overflow-hidden flex flex-col"
                style={{ background: card.gradient }}
              >
                <div className="p-8 pb-0 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/15 border border-white/20">
                    <card.icon size={22} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-rdc-yellow w-8 h-8 flex items-center justify-center">
                      <ArrowRight size={14} className="text-rdc-anthracite" />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-end">
                  <span className="self-start bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 mb-4">
                    {card.count}
                  </span>
                  <h3 className="font-display font-bold text-white text-2xl leading-snug group-hover:text-rdc-yellow transition-colors">
                    {t(card.labelKey)}
                  </h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{t(card.descKey)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Communes numbered grid */}
      <section className="section-night py-20 lg:py-24">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[1fr_400px] items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-yellow">{t('community.riverineCommunesTitle')}</p>
              </div>
              <h2 className="display-sub text-white mb-5">
                Un dialogue permanent avec nos voisins
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-lg">
                {t('community.committeeDesc')}
              </p>

              <div className="mt-10 space-y-0 border-t border-white/10">
                {COMMUNES.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-6 py-6 border-b border-white/10 hover:border-white/20 transition-colors group"
                  >
                    <span className="font-display text-2xl font-bold text-rdc-yellow/30 shrink-0 w-8">
                      {c.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-white text-lg group-hover:text-rdc-yellow transition-colors">
                        {c.name}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">{c.role}</p>
                    </div>
                    <span className="text-xs font-bold text-white/25 shrink-0">{c.pop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action panel */}
            <div className="border border-white/10 bg-white/3 p-8">
              <p className="eyebrow text-rdc-yellow mb-6">Actions communautaires</p>

              <div className="space-y-4">
                <Link
                  to={'/communaute/environnement-sonore' as never}
                  className="block group"
                >
                  <div className="border border-white/10 p-5 hover:border-white/25 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-white text-sm">{t('community.noiseEnvironment')}</p>
                      <ArrowRight size={13} className="text-white/30 group-hover:text-rdc-yellow group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      {t('community.noiseComplaints')}
                    </p>
                  </div>
                </Link>

                <Link
                  to={'/communaute/relations-communaute' as never}
                  className="block group"
                >
                  <div className="border border-white/10 p-5 hover:border-white/25 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-white text-sm">{t('community.consultations')}</p>
                      <ArrowRight size={13} className="text-white/30 group-hover:text-rdc-yellow group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Participez aux prochaines assemblées communautaires de la RVA.
                    </p>
                  </div>
                </Link>

                <Link
                  to={'/communaute/travaux-pistes' as never}
                  className="block group"
                >
                  <div className="border border-white/10 p-5 hover:border-white/25 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-white text-sm">{t('community.runwayWorks')}</p>
                      <ArrowRight size={13} className="text-white/30 group-hover:text-rdc-yellow group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      {t('community.runwayWorksSubtitle')}
                    </p>
                  </div>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-3">
                  {t('community.noiseCommittee')}
                </p>
                <p className="text-xs text-white/40 leading-relaxed">
                  Prochain comité consultatif communautaire — Juin 2026.
                  Contact : <span className="text-rdc-yellow">communaute@aindjili.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Construction notice */}
      <section className="bg-white py-12 border-t border-border">
        <div className="container">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-orange-100 border border-orange-200">
              <Construction size={22} className="text-orange-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-rdc-anthracite text-lg">
                {t('community.runwayWorks')} — Mise à jour
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Des travaux de réhabilitation sont en cours sur les voies de circulation principales.
                Ces travaux peuvent affecter les trajectoires de vol et les niveaux sonores dans les communes
                de Masina et Kimbanseke. La RVA s'engage à communiquer régulièrement avec les riverains.
              </p>
            </div>
            <Link
              to={'/communaute/travaux-pistes' as never}
              className="shrink-0 btn-primary text-sm hidden sm:inline-flex"
            >
              {t('common.seeMore')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
