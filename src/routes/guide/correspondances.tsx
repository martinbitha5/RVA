import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Shuffle, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/guide/correspondances')({
  component: CorrespondancesPage,
  head: () => ({ meta: [{ title: "Correspondances — Vols en connexion · FIH" }] }),
});

const MCT_RULES = [
  { type: 'International → International', time: '90 min',  color: 'bg-rdc-green/10 text-rdc-green', note: 'Passage possible sans nouveau contrôle de sécurité' },
  { type: 'International → Domestique',    time: '120 min', color: 'bg-amber-100 text-amber-700',   note: 'Récupération bagages + re-check-in domestique' },
  { type: 'Domestique → International',    time: '120 min', color: 'bg-amber-100 text-amber-700',   note: 'Contrôles immigration + sécurité à refaire' },
  { type: 'Domestique → Domestique',       time: '60 min',  color: 'bg-rdc-blue/10 text-rdc-blue',  note: 'Zone commune — pas de contrôle supplémentaire' },
];

const CHECKLIST = [
  'Vérifiez que votre billet inclut la correspondance (connexion simple ou billet séparé)',
  'Assurez-vous que vos bagages sont enregistrés jusqu\'à la destination finale',
  'En cas de retard : informez immédiatement votre compagnie ou un agent de transit FIH',
  'Votre visa RDC est-il valide pour la durée de la correspondance ?',
  'Vaccination fièvre jaune requise même pour une escale en zone internationale',
];

function CorrespondancesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.connections')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.connectionsSubtitle')}</p>

      {/* MCT table */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Shuffle size={18} className="text-rdc-blue" /> Durées minimales de correspondance (MCT)
      </h2>
      <div className="mb-8 space-y-3">
        {MCT_RULES.map(r => (
          <div key={r.type} className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <span className="font-medium text-sm flex-1 min-w-[200px]">{r.type}</span>
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${r.color}`}>
              <Clock size={11} /> {r.time}
            </span>
            <p className="text-xs text-muted-foreground flex-1">{r.note}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Checklist correspondance</h2>
      <div className="rounded-2xl border border-border bg-card p-5 mb-8">
        <ul className="space-y-3">
          {CHECKLIST.map(c => (
            <li key={c} className="flex items-start gap-2 text-sm">
              <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-rdc-green" /> {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={14} className="mt-0.5 flex-shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">{t('guide.connectionsNote')}</p>
      </div>
    </div>
  );
}
