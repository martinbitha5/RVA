import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Rocket, Calendar, DollarSign, CheckCircle, Clock } from 'lucide-react';

export const Route = createFileRoute('/corporate/projets-avenir')({
  component: ProjetsAvenirPage,
  head: () => ({ meta: [{ title: "Projets d'avenir — RVA · FIH" }] }),
});

type ProjectStatus = 'in_progress' | 'planned' | 'completed';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string }> = {
  in_progress: { label: 'En cours',  color: 'bg-rdc-blue/10 text-rdc-blue' },
  planned:     { label: 'Planifié',  color: 'bg-amber-100 text-amber-700' },
  completed:   { label: 'Achevé',    color: 'bg-rdc-green/10 text-rdc-green' },
};

const PROJECTS = [
  {
    title: 'Reconstruction Terminal International',
    status: 'in_progress' as ProjectStatus,
    budget: '250M USD',
    timeline: '2024–2027',
    description: 'Reconstruction complète du terminal international avec capacité portée à 5 millions de passagers/an. Nouvelles passerelles télescopiques, climatisation moderne, boutiques duty free agrandies.',
    progress: 35,
    highlights: ['5 nouvelles passerelles', 'Capacité 5M pax/an', 'Certification OACI Cat I', 'Zone commerciale 8 000 m²'],
  },
  {
    title: 'Modernisation des pistes (01/19)',
    status: 'in_progress' as ProjectStatus,
    budget: '85M USD',
    timeline: '2024–2026',
    description: 'Réhabilitation et élargissement de la piste principale pour accueillir les aéronefs de type A380, B747-8 et B777X. Nouveau balisage LED et système ILS Cat III.',
    progress: 55,
    highlights: ['Code 4E/4F', 'ILS Cat III', 'Balisage LED', 'B747/A380 compatible'],
  },
  {
    title: 'Terminal Domestique — Rénovation',
    status: 'planned' as ProjectStatus,
    budget: '45M USD',
    timeline: '2026–2028',
    description: 'Rénovation et extension du terminal domestique pour améliorer la fluidité des passagers des vols intérieurs (Lubumbashi, Goma, Bukavu, Mbuji-Mayi, Kisangani).',
    progress: 0,
    highlights: ['Capacité doublée', '8 portes embarquement', 'Passerelles intérieures', 'Salon premium'],
  },
  {
    title: 'Centre de Fret Moderne',
    status: 'planned' as ProjectStatus,
    budget: '30M USD',
    timeline: '2025–2027',
    description: 'Construction d\'un centre de fret moderne répondant aux normes IATA, incluant zones froides pour produits périssables, contrôle douanier intégré et accès direct piste.',
    progress: 0,
    highlights: ['Zone froide 2 000 m²', 'X-ray 100% marchandises', 'Transit 24h/24', 'Certification CEIV Pharma'],
  },
  {
    title: 'Smart Airport — Digitalisation',
    status: 'planned' as ProjectStatus,
    budget: '15M USD',
    timeline: '2025–2028',
    description: 'Programme de transformation digitale : bornes d\'enregistrement CUTE, portiques biométriques, suivi bagages RFID, application mobile FIH et tableau de bord opérationnel.',
    progress: 10,
    highlights: ['Self-check-in', 'Biométrie', 'RFID bagages', 'App mobile FIH'],
  },
  {
    title: 'Parking P3 — Extension',
    status: 'completed' as ProjectStatus,
    budget: '8M USD',
    timeline: '2022–2023',
    description: 'Extension du parking P3 avec 450 nouvelles places, éclairage LED solaire, 20 bornes de recharge électrique et système de guidage dynamique.',
    progress: 100,
    highlights: ['+450 places', '20 bornes EV', 'LED solaire', 'Guidage dynamique'],
  },
];

function ProjetsAvenirPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.futureProjects')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.futureProjectsSubtitle')}</p>

      <div className="grid gap-5 lg:grid-cols-2">
        {PROJECTS.map(p => {
          const { label, color } = STATUS_CONFIG[p.status];
          return (
            <div key={p.title} className="rounded-2xl border border-border bg-card overflow-hidden">
              {p.status === 'in_progress' && (
                <div className="h-1 bg-gradient-to-r from-rdc-blue to-rdc-green" style={{ width: `${p.progress}%` }} />
              )}
              {p.status === 'completed' && <div className="h-1 bg-rdc-green w-full" />}
              {p.status === 'planned' && <div className="h-1 bg-muted w-full" />}
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Rocket size={16} className="flex-shrink-0 text-rdc-blue" />
                    <p className="font-semibold text-rdc-anthracite">{p.title}</p>
                  </div>
                  <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>{label}</span>
                </div>

                <p className="text-xs text-muted-foreground mb-3">{p.description}</p>

                {p.status === 'in_progress' && (
                  <div className="mb-3">
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>Avancement</span><span className="font-semibold text-rdc-blue">{p.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-rdc-blue transition-all" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                )}

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {p.highlights.map(h => (
                    <span key={h} className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      <CheckCircle size={8} className="text-rdc-green" /> {h}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><DollarSign size={10} /> {p.budget}</span>
                  <span className="flex items-center gap-1"><Calendar size={10} /> {p.timeline}</span>
                  {p.status === 'completed' && <span className="flex items-center gap-1 text-rdc-green"><CheckCircle size={10} /> Livré</span>}
                  {p.status === 'in_progress' && <span className="flex items-center gap-1 text-rdc-blue"><Clock size={10} /> En cours</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
