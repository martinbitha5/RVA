import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Rocket, Calendar, DollarSign, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/projets-avenir')({
  component: ProjetsAvenirPage,
  head: () => ({ meta: [{ title: "Projets d'avenir — Aéroport International de N'djili · FIH" }] }),
});

type ProjectStatus = 'in_progress' | 'planned' | 'completed';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bar: string }> = {
  in_progress: { label: 'En cours',  color: 'text-rdc-blue  bg-rdc-blue/10',  bar: 'bg-gradient-to-r from-rdc-blue to-rdc-green' },
  planned:     { label: 'Planifié',  color: 'text-amber-700 bg-amber-100',    bar: 'bg-amber-300' },
  completed:   { label: 'Achevé',    color: 'text-rdc-green bg-rdc-green/10', bar: 'bg-rdc-green' },
};

const PROJECTS = [
  {
    title: 'Reconstruction Terminal International',
    status: 'in_progress' as ProjectStatus,
    budget: '250 M USD',
    timeline: '2024–2027',
    description: 'Reconstruction complète du terminal international avec capacité portée à 5 millions de passagers par an. Nouvelles passerelles télescopiques, climatisation centralisée moderne, boutiques duty free agrandies et espaces VIP.',
    progress: 35,
    highlights: ['5 passerelles télescopiques', 'Capacité 5M pax/an', 'Certification OACI Cat I', 'Zone commerciale 8 000 m²'],
  },
  {
    title: 'Modernisation piste 01/19',
    status: 'in_progress' as ProjectStatus,
    budget: '85 M USD',
    timeline: '2024–2026',
    description: 'Réhabilitation et renforcement de la piste principale (4 700 m) pour accueillir les aéronefs A380, B747-8 et B777X. Nouveau balisage LED intégral et système ILS Cat III.',
    progress: 55,
    highlights: ['Code 4E/4F', 'ILS Cat III', 'Balisage LED', 'A380 / B747-8 compatible'],
  },
  {
    title: 'Terminal Domestique — Rénovation',
    status: 'planned' as ProjectStatus,
    budget: '45 M USD',
    timeline: '2026–2028',
    description: 'Rénovation et extension du terminal domestique pour améliorer la fluidité des passagers des vols intérieurs (Lubumbashi, Goma, Bukavu, Mbuji-Mayi, Kisangani).',
    progress: 0,
    highlights: ['Capacité doublée', '8 portes embarquement', 'Passerelles intérieures', 'Salon premium domestique'],
  },
  {
    title: 'Centre de Fret Moderne',
    status: 'planned' as ProjectStatus,
    budget: '30 M USD',
    timeline: '2025–2027',
    description: 'Construction d\'un centre de fret aux normes IATA : zone froide pour produits périssables, contrôle douanier DGDA intégré, accès direct piste et traçabilité RFID.',
    progress: 0,
    highlights: ['Zone froide 2 000 m²', 'X-ray 100% marchandises', 'Transit 24h/24', 'Certification CEIV Pharma'],
  },
  {
    title: 'Smart Airport — Digitalisation FIH',
    status: 'planned' as ProjectStatus,
    budget: '15 M USD',
    timeline: '2025–2028',
    description: 'Programme de transformation digitale : bornes CUTE, portiques biométriques, suivi bagages RFID, application mobile FIH et tableau de bord opérationnel en temps réel.',
    progress: 10,
    highlights: ['Self-check-in CUTE', 'Biométrie PARAFE', 'RFID bagages', 'App mobile FIH'],
  },
  {
    title: 'Extension Parking P3',
    status: 'completed' as ProjectStatus,
    budget: '8 M USD',
    timeline: '2022–2023',
    description: 'Extension du parking P3 avec 450 nouvelles places, éclairage LED solaire, 20 bornes de recharge électrique et système de guidage dynamique par panneaux à messages variables.',
    progress: 100,
    highlights: ['+450 places', '20 bornes EV', 'LED solaire', 'Guidage dynamique'],
  },
];

const OVERVIEW_STATS = [
  { value: '425 M',   label: 'USD d\'investissement total', color: 'text-rdc-yellow' },
  { value: '2027',    label: 'Nouveau terminal opérationnel', color: 'text-rdc-yellow' },
  { value: '5 M',     label: 'Passagers/an (capacité cible)', color: 'text-rdc-yellow' },
  { value: '6',       label: 'Projets en portefeuille', color: 'text-rdc-yellow' },
];

function ProjetsAvenirPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        image="/images/fih-tarmac.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Projets d\'avenir' },
        ]}
        eyebrow="FIH demain"
        title={t('corporate.futureProjects')}
        subtitle={t('corporate.futureProjectsSubtitle')}
      />

      {/* Overview stats */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="mb-8 flex items-center gap-4">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Programme d'investissement 2024–2028</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {OVERVIEW_STATS.map(s => (
              <div key={s.label} className="border border-white/10 p-6 text-center">
                <p className={`font-display text-4xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-2 text-xs text-white/50 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Portefeuille de projets</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Les grands chantiers de FIH
          </h2>

          <div className="grid gap-5 lg:grid-cols-2">
            {PROJECTS.map(p => {
              const { label, color, bar } = STATUS_CONFIG[p.status];
              return (
                <div key={p.title} className="border border-border bg-card overflow-hidden">
                  {/* Progress bar at top */}
                  <div className="h-1 bg-muted">
                    <div
                      className={`h-full ${bar} transition-all`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-rdc-blue/10 mt-0.5">
                          <Rocket size={15} className="text-rdc-blue" />
                        </div>
                        <p className="font-bold text-rdc-anthracite leading-snug">{p.title}</p>
                      </div>
                      <span className={`flex-shrink-0 px-2.5 py-0.5 text-xs font-bold ${color}`}>{label}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>

                    {/* Progress % */}
                    {p.status === 'in_progress' && (
                      <div className="mb-4">
                        <div className="mb-1.5 flex justify-between text-xs">
                          <span className="text-muted-foreground">Avancement</span>
                          <span className="font-bold text-rdc-blue">{p.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted overflow-hidden">
                          <div className="h-full bg-rdc-blue transition-all" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {p.highlights.map(h => (
                        <span
                          key={h}
                          className="flex items-center gap-1 bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                        >
                          <CheckCircle size={8} className="text-rdc-green" /> {h}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-5 text-xs text-muted-foreground border-t border-border pt-4">
                      <span className="flex items-center gap-1.5"><DollarSign size={11} className="text-rdc-green" /> {p.budget}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-rdc-blue" /> {p.timeline}</span>
                      {p.status === 'completed' && (
                        <span className="flex items-center gap-1.5 text-rdc-green font-medium"><CheckCircle size={11} /> Livré</span>
                      )}
                      {p.status === 'in_progress' && (
                        <span className="flex items-center gap-1.5 text-rdc-blue font-medium"><Clock size={11} /> En cours</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rdc-blue">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Partenaires des projets FIH</p>
              <p className="text-sm text-white/65 mt-1">Intéressé par nos appels d'offres ou nos opportunités de partenariat sur les grands chantiers ?</p>
            </div>
            <Link
              to="/corporate/partenariats-commerciaux"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-rdc-blue hover:bg-rdc-yellow transition-colors whitespace-nowrap"
            >
              Opportunités <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
