import { createFileRoute, Link } from '@tanstack/react-router';
import { Construction, Calendar, AlertTriangle, CheckCircle, Clock, ArrowRight, HardHat, FileText } from 'lucide-react';

export const Route = createFileRoute('/communaute/travaux-pistes')({
  component: TravauxPistesPage,
  head: () => ({
    meta: [
      { title: "Travaux sur pistes — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Travaux de réhabilitation en cours sur les pistes et voies de circulation de l'Aéroport N'djili (FIH) — programme 2024–2026." },
    ],
  }),
});

type WorkStatus = 'active' | 'planned' | 'completed';

const STATUS_CONFIG: Record<WorkStatus, { label: string; labelClass: string; barClass: string; dotClass: string }> = {
  active:    { label: 'En cours',  labelClass: 'text-[#CE1126] bg-[#CE1126]/10',  barClass: 'bg-[#CE1126]', dotClass: 'bg-[#CE1126]' },
  planned:   { label: 'Planifié',  labelClass: 'text-amber-700 bg-amber-100',      barClass: 'bg-amber-400', dotClass: 'bg-amber-500' },
  completed: { label: 'Terminé',   labelClass: 'text-[#009A44] bg-[#009A44]/10',  barClass: 'bg-[#009A44]', dotClass: 'bg-[#009A44]' },
};

const WORKS = [
  {
    title: 'Réhabilitation piste 01/19 — Phase 1 (2 premiers km)',
    status: 'active' as WorkStatus,
    period: 'Janvier 2025 — Septembre 2026',
    impact: 'Fermeture nocturne 22h–06h LMT (lun.–mer.) · Déviations voies N1 et S1 · Hausse sonore nocturne',
    description: "Réfection du revêtement béton armé sur les 2 premiers kilomètres à partir du seuil 01. Pose du nouveau balisage LED complet et remplacement des feux d'axe de piste conformément aux spécifications OACI Annexe 14 section 5. Renforcement de la sous-couche pour accueillir les aéronefs A380 et B777X.",
    contractor: 'Sogea-Satom (groupement) / Supervision RVA',
    reference: 'Projet RVA-2024-001',
    notam: 'NOTAM A0234/25 — FIH RWY 01/19 CLSD 2200-0600 MON-WED TIL SEP 2026',
  },
  {
    title: 'Extension et renforcement voie de circulation Bravo',
    status: 'active' as WorkStatus,
    period: 'Mars 2025 — Décembre 2025',
    impact: 'Taxiing modifié via voie Charlie · Roulage allongé de +4 min · Annonce compagnies en cours',
    description: 'Élargissement et renforcement de la voie de circulation Bravo (TWY B) pour permettre la circulation simultanée des aéronefs de code E (B777, A340) et de code F (A380, B747-8) à pleine charge commerciale. Travaux de nuit et week-end uniquement.',
    contractor: 'ENTP — Entreprise Nationale de Travaux Publics (Kinshasa)',
    reference: 'Projet RVA-2025-002',
    notam: 'NOTAM A0310/25 — TWY B CLSD FULL WID TIL DEC 2025',
  },
  {
    title: 'Reconstruction sorties rapides Q1 et Q2',
    status: 'planned' as WorkStatus,
    period: 'Juillet 2025 — Mars 2026',
    impact: 'Impact opérationnel minimal · Travaux de nuit uniquement (23h–05h) · Aucune fermeture piste prévue',
    description: 'Reconstruction complète des deux sorties rapides haute vitesse (High-Speed Exit) aux extrémités de la piste 01/19 pour fluidifier les sorties et réduire les délais de libération de piste. Objectif : temps de libération cible de 40 secondes contre 75 actuellement.',
    contractor: "Appel d'offres en cours — résultat prévu mai 2025",
    reference: 'Projet RVA-2025-003',
    notam: 'NOTAM à publier',
  },
  {
    title: 'Remplacement intégral système PAPI (2 seuils)',
    status: 'completed' as WorkStatus,
    period: 'Novembre 2024 — Janvier 2025',
    impact: 'Aucune interruption de service durant les travaux',
    description: "Remplacement complet des systèmes PAPI (Precision Approach Path Indicator) sur les deux seuils de piste 01 et 19 par des unités LED nouvelle génération certifiées OACI Annexe 14. Angle d'approche maintenu à 3° (standard OACI). Économie d'énergie de 60%.",
    contractor: 'ADB Safegate — montage RVA',
    reference: 'Projet RVA-2024-004 — Livré et certifié AAC',
    notam: 'Levé — Système opérationnel',
  },
] as const;

const CURRENT_STATS = [
  { value: '2',   label: 'Chantiers actifs',         color: '#CE1126' },
  { value: '1',   label: 'Chantier planifié',         color: '#d97706' },
  { value: '1',   label: 'Livraison 2024',            color: '#009A44' },
  { value: '85M', label: 'USD investis en piste',     color: '#FFCE00' },
];

const NOTAM_EXPLAINER = [
  { term: 'NOTAM', def: 'Notice to Airmen — avis aux aviateurs. Document officiel notifiant les pilotes et compagnies des conditions et restrictions en vigueur.' },
  { term: 'CLSD', def: "Closed — fermé. Indique qu'une infrastructure (piste, voie de circulation) est fermée à la circulation des aéronefs." },
  { term: 'LMT', def: "Local Mean Time — heure locale. Kinshasa est en UTC+1 (heure d'Afrique centrale)." },
  { term: 'TWY', def: 'Taxiway — voie de circulation permettant aux aéronefs de se déplacer entre la piste et les aires de stationnement.' },
];

function TravauxPistesPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Travaux de réhabilitation — piste Aéroport N'djili" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Communauté · Infrastructure</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Travaux sur pistes et voies de circulation</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#CE1126] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Travaux en cours</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CURRENT_STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="mt-2 text-xs text-gray-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alerte passagers */}
        <section className="flex items-start gap-4 border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Perturbations actives — vérifiez l'état de votre vol</p>
            <p className="text-sm text-amber-700 mb-3">
              Les travaux sur la piste 01/19 (Phase 1) entraînent des fermetures nocturnes (22h–06h LMT, lun.–mer.). Certains vols nocturnes peuvent être retardés ou déviés vers Brazzaville (BZV). Consultez l'état de votre vol avant de vous déplacer.
            </p>
            <Link to="/vols/departs" search={{ q: '' } as never} className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1">
              Vérifier l'état des vols en temps réel <ArrowRight size={11} />
            </Link>
          </div>
        </section>

        {/* Programme de travaux */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Chantiers 2024–2026</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            <HardHat size={20} className="inline mr-2 text-[#1a1a1a]" />
            Programme de travaux FIH
          </h2>

          <div className="space-y-5">
            {WORKS.map(w => {
              const sc = STATUS_CONFIG[w.status];
              return (
                <div key={w.title} className="border border-[#e8e8e8] bg-white overflow-hidden">
                  <div className={`h-1 ${sc.barClass}`} />
                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-100 mt-0.5">
                          <Construction size={15} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1a1a1a]">{w.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{w.reference}</p>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold shrink-0 ${sc.labelClass}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dotClass}`} />
                        {sc.label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{w.description}</p>

                    {w.status !== 'completed' && (
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 px-4 py-3 mb-4">
                        <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-600" />
                        <p className="text-xs text-amber-800 font-medium">{w.impact}</p>
                      </div>
                    )}

                    {w.status === 'completed' && (
                      <div className="flex items-start gap-2 bg-[#009A44]/5 border border-[#009A44]/20 px-4 py-3 mb-4">
                        <CheckCircle size={12} className="mt-0.5 shrink-0 text-[#009A44]" />
                        <p className="text-xs text-[#009A44] font-medium">{w.impact}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-5 text-xs text-gray-400 border-t border-[#e8e8e8] pt-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-[#003DA5]" /> {w.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} /> {w.contractor}
                      </span>
                      {w.status === 'completed' && (
                        <span className="flex items-center gap-1.5 text-[#009A44] font-semibold">
                          <CheckCircle size={11} /> Livré et certifié
                        </span>
                      )}
                    </div>

                    {/* NOTAM */}
                    <div className="mt-4 flex items-center gap-2 border border-[#e8e8e8] bg-gray-50 px-4 py-2">
                      <FileText size={11} className="text-gray-400 shrink-0" />
                      <p className="text-[10px] font-mono text-gray-500">{w.notam}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Lexique NOTAM */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Lexique aviation</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Comprendre les termes techniques</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {NOTAM_EXPLAINER.map(n => (
              <div key={n.term} className="border border-[#e8e8e8] bg-white px-5 py-4">
                <span className="inline-block bg-[#003DA5] text-white text-[10px] font-bold px-2 py-0.5 mb-2">{n.term}</span>
                <p className="text-sm text-gray-500 leading-relaxed">{n.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Projets de modernisation</p>
              <h2 className="text-xl font-bold text-white mb-1">Programme d'investissement 2024–2028 de FIH</h2>
              <p className="text-sm text-white/55 max-w-lg">Découvrez l'ensemble du portefeuille de projets — nouveau terminal, centre fret, Smart Airport et bien plus.</p>
            </div>
            <Link to="/corporate/projets-avenir" className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
              Projets d'avenir <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
