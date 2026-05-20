import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Construction, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const Route = createFileRoute('/communaute/travaux-pistes')({
  component: TravauxPistesPage,
  head: () => ({ meta: [{ title: "Travaux sur pistes & voies de circulation — FIH" }] }),
});

type WorkStatus = 'active' | 'planned' | 'completed';

const STATUS_CONFIG: Record<WorkStatus, { label: string; color: string; dot: string }> = {
  active:    { label: 'En cours',  color: 'bg-rdc-red/10 text-rdc-red',        dot: 'bg-rdc-red' },
  planned:   { label: 'Planifié',  color: 'bg-amber-100 text-amber-700',        dot: 'bg-amber-500' },
  completed: { label: 'Terminé',   color: 'bg-rdc-green/10 text-rdc-green',     dot: 'bg-rdc-green' },
};

const WORKS = [
  {
    title: 'Réhabilitation piste 01/19 — Phase 1',
    status: 'active' as WorkStatus,
    period: 'Jan 2025 — Sep 2026',
    impact: 'Fermeture nocturne 22h–06h LMT (Lun-Mer) · Déviations par voies de circulation N1 et S1',
    description: 'Réfection du revêtement en béton armé sur les 2 premiers km de la piste principale. Pose du nouveau système de balisage LED et remplacement des feux d\'axe.',
    contractor: 'Sogea-Satom / RVA',
  },
  {
    title: 'Extension voie de circulation Bravo',
    status: 'active' as WorkStatus,
    period: 'Mar 2025 — Dec 2025',
    impact: 'Taxiing modifié par voie Charlie · Durée roulage +5 min',
    description: 'Élargissement et renforcement de la voie de circulation Bravo pour permettre la circulation des A380 et B747-8 à pleines charges.',
    contractor: 'Entreprise Nationale Travaux Publics (ENTP)',
  },
  {
    title: 'Réhabilitation voies de sortie rapide',
    status: 'planned' as WorkStatus,
    period: 'Jul 2025 — Mar 2026',
    impact: 'Impact minimal prévu · Travaux de nuit uniquement',
    description: 'Reconstruction des deux sorties rapides Q1 et Q2 aux extrémités de la piste pour fluidifier les sorties de piste et réduire les délais au sol.',
    contractor: 'Non attribué',
  },
  {
    title: 'Réseau d\'éclairage d\'approche PAPI',
    status: 'completed' as WorkStatus,
    period: 'Nov 2024 — Jan 2025',
    impact: 'Aucune interruption de service',
    description: 'Remplacement complet du système PAPI (Precision Approach Path Indicator) sur les deux seuils de piste par des unités LED nouvelle génération.',
    contractor: 'ADB Safegate',
  },
];

function TravauxPistesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('community.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('community.runwayWorks')}</h1>
      <p className="mb-8 max-w-2xl text-sm text-muted-foreground">{t('community.runwayWorksSubtitle')}</p>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Perturbations en cours</p>
          <p>Des travaux actifs sur la piste 01/19 entraînent des fermetures nocturnes (22h–06h LMT, lundi–mercredi). Certains vols nocturnes peuvent être retardés ou déviés vers Brazzaville (BZV). Vérifiez l'état de votre vol avant de vous déplacer.</p>
        </div>
      </div>

      <div className="space-y-4">
        {WORKS.map(w => {
          const { label, color, dot } = STATUS_CONFIG[w.status];
          return (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Construction size={16} className="text-muted-foreground flex-shrink-0" />
                  <p className="font-semibold text-rdc-anthracite">{w.title}</p>
                </div>
                <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`} /> {label}
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-3">{w.description}</p>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                <span className="flex items-center gap-1"><Calendar size={10} /> {w.period}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {w.impact}</span>
                {w.status === 'completed' && <span className="flex items-center gap-1 text-rdc-green"><CheckCircle size={10} /> {w.contractor}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
