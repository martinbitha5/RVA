import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Construction, Calendar, AlertTriangle, CheckCircle, Clock, ArrowRight, HardHat } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/communaute/travaux-pistes')({
  component: TravauxPistesPage,
  head: () => ({ meta: [{ title: "Travaux sur pistes — Aéroport International de N'djili · FIH" }] }),
});

type WorkStatus = 'active' | 'planned' | 'completed';

const STATUS_CONFIG: Record<WorkStatus, { label: string; color: string; dot: string; bar: string }> = {
  active:    { label: 'En cours',  color: 'text-rdc-red   bg-rdc-red/10',   dot: 'bg-rdc-red',   bar: 'bg-rdc-red' },
  planned:   { label: 'Planifié',  color: 'text-amber-700 bg-amber-100',    dot: 'bg-amber-500', bar: 'bg-amber-400' },
  completed: { label: 'Terminé',   color: 'text-rdc-green bg-rdc-green/10', dot: 'bg-rdc-green', bar: 'bg-rdc-green' },
};

const WORKS = [
  {
    title: 'Réhabilitation piste 01/19 — Phase 1',
    status: 'active' as WorkStatus,
    period: 'Jan 2025 — Sep 2026',
    impact: 'Fermeture nocturne 22h–06h LMT (lun.–mer.) · Déviations voies N1 et S1',
    description: 'Réfection du revêtement béton armé sur les 2 premiers km. Pose du nouveau balisage LED complet et remplacement des feux d\'axe de piste conformément aux spécifications OACI Annexe 14.',
    contractor: 'Sogea-Satom / RVA',
    reference: 'Projet RVA-2024-001',
  },
  {
    title: 'Extension voie de circulation Bravo',
    status: 'active' as WorkStatus,
    period: 'Mar 2025 — Déc 2025',
    impact: 'Taxiing modifié via voie Charlie · Roulage +5 min',
    description: 'Élargissement et renforcement de la voie de circulation Bravo (B) pour permettre la circulation des aéronefs A380 et B747-8 à pleine charge commerciale.',
    contractor: 'ENTP — Entreprise Nationale Travaux Publics',
    reference: 'Projet RVA-2025-002',
  },
  {
    title: 'Réhabilitation sorties rapides Q1 & Q2',
    status: 'planned' as WorkStatus,
    period: 'Juil 2025 — Mar 2026',
    impact: 'Impact minimal · Travaux de nuit uniquement (23h–05h)',
    description: 'Reconstruction des deux sorties rapides aux extrémités de la piste 01/19 pour fluidifier les sorties et réduire les délais de libération de piste (cible : 40 sec).',
    contractor: 'Non encore attribué — AO en cours',
    reference: 'Projet RVA-2025-003',
  },
  {
    title: 'Remplacement système PAPI',
    status: 'completed' as WorkStatus,
    period: 'Nov 2024 — Jan 2025',
    impact: 'Aucune interruption de service',
    description: 'Remplacement complet des systèmes PAPI (Precision Approach Path Indicator) sur les deux seuils de piste par des unités LED nouvelle génération certifiées OACI.',
    contractor: 'ADB Safegate',
    reference: 'Projet RVA-2024-004 — Livré',
  },
];

const CURRENT_STATS = [
  { value: '2',   label: 'Chantiers actifs',      color: 'text-rdc-red' },
  { value: '1',   label: 'Chantier planifié',      color: 'text-amber-400' },
  { value: '1',   label: 'Livraison 2024–2025',    color: 'text-rdc-green' },
  { value: '85M', label: 'USD investis en piste',  color: 'text-rdc-yellow' },
];

function TravauxPistesPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        gradient="dark"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Communauté', href: '/communaute' },
          { label: 'Travaux sur pistes' },
        ]}
        eyebrow="Opérations & Infrastructure"
        title={t('community.runwayWorks')}
        subtitle={t('community.runwayWorksSubtitle')}
      />

      {/* Stats */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {CURRENT_STATS.map(s => (
              <div key={s.label} className="border border-white/10 p-6 text-center">
                <p className={`font-display text-4xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-2 text-xs text-white/50 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container py-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Perturbations actives — vérifiez votre vol</p>
              <p className="text-sm text-amber-700">
                Les travaux sur la piste 01/19 (Phase 1) entraînent des fermetures nocturnes (22h–06h LMT, lun.–mer.). Certains vols nocturnes peuvent être retardés ou déviés vers Brazzaville (BZV). Consultez l'état de votre vol avant de vous déplacer à l'aéroport.
              </p>
              <div className="mt-2">
                <Link
                  to="/vols/departs"
                  search={{ q: '' }}
                  className="text-xs font-bold text-amber-800 underline underline-offset-2 hover:text-amber-900"
                >
                  Vérifier l'état des vols →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Works list */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Chantiers 2024–2026</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            <HardHat size={22} className="inline mr-2 text-rdc-anthracite" />
            Programme de travaux FIH
          </h2>

          <div className="space-y-4">
            {WORKS.map(w => {
              const { label, color, dot, bar } = STATUS_CONFIG[w.status];
              return (
                <div key={w.title} className="border border-border bg-card overflow-hidden">
                  {/* Top status bar */}
                  <div className={`h-1 ${bar}`} />

                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-muted mt-0.5">
                          <Construction size={16} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-bold text-rdc-anthracite">{w.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{w.reference}</p>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold ${color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                        {label}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{w.description}</p>

                    {/* Impact callout */}
                    {w.status !== 'completed' && (
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 px-4 py-3 mb-4">
                        <AlertTriangle size={13} className="mt-0.5 flex-shrink-0 text-amber-600" />
                        <p className="text-xs text-amber-800 font-medium">{w.impact}</p>
                      </div>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-5 text-xs text-muted-foreground border-t border-border pt-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-rdc-blue" /> {w.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} /> {w.contractor}
                      </span>
                      {w.status === 'completed' && (
                        <span className="flex items-center gap-1.5 text-rdc-green font-semibold">
                          <CheckCircle size={11} /> Livré
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="bg-rdc-blue">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Projets de modernisation FIH</p>
              <p className="text-sm text-white/65 mt-1">Découvrez l'ensemble du programme d'investissement 2024–2028 de l'Aéroport de N'djili.</p>
            </div>
            <Link
              to="/corporate/projets-avenir"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-rdc-blue hover:bg-rdc-yellow transition-colors whitespace-nowrap"
            >
              Projets d'avenir <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
