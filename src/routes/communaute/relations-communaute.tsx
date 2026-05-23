import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Users, School, Stethoscope, Hammer, Palette, Leaf, CheckCircle, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/communaute/relations-communaute')({
  component: RelationsCommunauteLayout,
  head: () => ({ meta: [{ title: "Relations communautaires — Aéroport International de N'djili · FIH" }] }),
});

const INITIATIVES = [
  {
    name: 'Programme Écoles de Nsele',
    commune: 'Nsele',
    icon: School,
    accent: 'bg-rdc-blue',
    desc: 'Réhabilitation de 8 écoles primaires, fourniture de matériel scolaire pour 4 200 élèves et bourses d\'excellence pour les lycéens méritants.',
    status: 'active' as const,
    beneficiaries: '4 200 élèves',
    year: '2021–actif',
  },
  {
    name: 'Centre de Santé Masina',
    commune: 'Masina',
    icon: Stethoscope,
    accent: 'bg-rdc-red',
    desc: 'Construction d\'un centre de santé communautaire de 30 lits avec service de maternité, pédiatrie et pharmacie — 15 000 patients reçus par an.',
    status: 'active' as const,
    beneficiaries: '15 000 patients/an',
    year: '2022–actif',
  },
  {
    name: 'Formation Professionnelle FIH',
    commune: 'Kimbanseke',
    icon: Hammer,
    accent: 'bg-amber-500',
    desc: 'Formation aux métiers de l\'aéroport (sûreté, accueil, maintenance, manutention) pour les jeunes des communes riveraines. 200 places par an.',
    status: 'active' as const,
    beneficiaries: '200 jeunes/an',
    year: '2020–actif',
  },
  {
    name: 'Programme FIH Art',
    commune: 'Kinshasa',
    icon: Palette,
    accent: 'bg-rdc-yellow',
    desc: 'Exposition permanente des artistes congolais dans les terminaux (Chéri Samba, Moke et jeunes talents). Commandes et mécénat d\'oeuvres originales.',
    status: 'active' as const,
    beneficiaries: '25 artistes exposés',
    year: '2019–actif',
  },
  {
    name: 'Reboisement Nsele',
    commune: "N'djili / Nsele",
    icon: Leaf,
    accent: 'bg-rdc-green',
    desc: 'Plantation de 10 000 arbres endémiques sur les terrains RVA et dans les communes riveraines pour réduire l\'empreinte environnementale de l\'aéroport.',
    status: 'planned' as const,
    beneficiaries: '10 000 arbres',
    year: '2024–2026',
  },
];

const COMMITTEE_MEMBERS = [
  { commune: 'Nsele',      rep: '3 représentants', role: 'Commune hôte — voix prépondérante' },
  { commune: 'Masina',     rep: '2 représentants', role: 'Zone de bruit principale' },
  { commune: 'Kimbanseke', rep: '2 représentants', role: 'Zone trajectoires d\'approche' },
  { commune: "N'djili",    rep: '2 représentants', role: 'Commune éponyme de l\'aéroport' },
  { commune: 'RVA',        rep: 'Direction',       role: 'Secrétariat & Présidence' },
];

const IMPACT_STATS = [
  { value: '25 000+', label: 'Bénéficiaires directs 2023', color: 'text-rdc-yellow' },
  { value: '5',       label: 'Communes concernées',        color: 'text-rdc-yellow' },
  { value: '3 M USD', label: 'Investissements communautaires 2023', color: 'text-rdc-yellow' },
  { value: '12',      label: 'Partenariats ONG locales',   color: 'text-rdc-yellow' },
];

const ART_ARTISTS = [
  'Chéri Samba',
  'Moke',
  'Bodo (Baudouin Douma)',
  'Sculpteurs Mbongo',
  'Jeunes talents — Académie des Beaux-Arts de Kinshasa',
];

function RelationsCommunauteLayout() {
  const matches = useMatches();
  const isLeaf = matches.at(-1)?.routeId === '/communaute/relations-communaute';
  return isLeaf ? <RelationsCommunautePage /> : <Outlet />;
}

function RelationsCommunautePage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        image="/images/fih-hero-2.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Communauté', href: '/communaute' },
          { label: 'Relations communautaires' },
        ]}
        eyebrow="FIH et ses voisins"
        title={t('community.communityRelations')}
        subtitle={t('community.communitySubtitle')}
      />

      {/* Impact stats */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {IMPACT_STATS.map(s => (
              <div key={s.label} className="border border-white/10 p-6 text-center">
                <p className={`font-display text-4xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-2 text-xs text-white/50 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Initiatives */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-green" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-green">Nos programmes</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Initiatives locales
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INITIATIVES.map(init => (
              <div
                key={init.name}
                className="flex flex-col border border-border bg-card overflow-hidden"
              >
                {/* Top accent */}
                <div className={`h-1 ${init.accent}`} />
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div className={`flex h-11 w-11 items-center justify-center ${init.accent}`}>
                      <init.icon size={18} className="text-white" />
                    </div>
                    <span
                      className={`flex-shrink-0 px-2.5 py-0.5 text-[10px] font-bold ${
                        init.status === 'active'
                          ? 'bg-rdc-green/10 text-rdc-green'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {init.status === 'active' ? '● Actif' : '○ Planifié'}
                    </span>
                  </div>

                  <p className="font-bold text-rdc-anthracite mb-1">{init.name}</p>
                  <p className="text-xs font-semibold text-rdc-blue mb-3">{init.commune} · {init.year}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{init.desc}</p>
                </div>

                <div className="flex items-center gap-2 border-t border-border px-6 py-3 bg-muted/30">
                  <Users size={11} className="text-rdc-green flex-shrink-0" />
                  <p className="text-xs font-semibold text-rdc-green">{init.beneficiaries}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIH Art */}
      <div className="bg-[#1A1500]">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-yellow" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-yellow">Culture congolaise</p>
          </div>
          <h2 className="font-display mb-3 text-2xl font-bold text-white md:text-3xl">
            <Palette size={22} className="inline mr-2 text-rdc-yellow" />
            Programme FIH Art
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-white/60 leading-relaxed">
            FIH Art valorise les artistes congolais dans les espaces des terminaux internationaux — une vitrine unique pour la créativité kinoise. Peintures, sculptures et installations signées par les maîtres et les jeunes talents accueillent chaque voyageur.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ART_ARTISTS.map(a => (
              <div key={a} className="flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-3">
                <CheckCircle size={13} className="flex-shrink-0 text-rdc-yellow" />
                <p className="text-sm text-white/80">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to={'/communaute/relations-communaute/fih-art' as never}
              className="inline-flex items-center gap-2 border border-rdc-yellow/40 px-5 py-2.5 text-sm font-bold text-rdc-yellow hover:bg-rdc-yellow hover:text-rdc-anthracite transition-colors"
            >
              Découvrir FIH Art <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Consultative committee */}
      <div className="bg-background">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Gouvernance</p>
          </div>
          <h2 className="font-display mb-3 text-2xl font-bold text-rdc-anthracite">
            Comité consultatif communautaire
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">{t('community.committeeDesc')}</p>
          <div className="space-y-2.5">
            {COMMITTEE_MEMBERS.map(m => (
              <div
                key={m.commune}
                className="flex flex-wrap items-center gap-4 border border-border bg-card px-5 py-4"
              >
                <span className="font-bold text-rdc-anthracite w-28 flex-shrink-0">{m.commune}</span>
                <span className="text-xs font-semibold text-rdc-blue">{m.rep}</span>
                <span className="text-xs text-muted-foreground">{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rdc-green">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Signaler une nuisance sonore</p>
              <p className="text-sm text-white/70 mt-1">Vous résidez dans une commune riveraine ? Utilisez notre formulaire de plainte en ligne.</p>
            </div>
            <Link
              to="/communaute/environnement-sonore"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-rdc-green hover:bg-rdc-yellow transition-colors whitespace-nowrap"
            >
              Déposer une plainte <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
