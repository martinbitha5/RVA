import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, AlertTriangle, Info } from 'lucide-react';

export const Route = createFileRoute('/guide/quitter-kinshasa')({
  component: QuitterKinshasaPage,
  head: () => ({ meta: [{ title: "Quitter Kinshasa — Guide Départ FIH" }] }),
});

const STEPS = [
  {
    step: 1,
    title: 'Arrivée à l\'aéroport',
    time: '3h avant le départ (vols internationaux) · 2h (vols domestiques)',
    details: [
      'Présentez-vous au terminal correspondant à votre compagnie aérienne',
      'Terminal International : vols Brussels Airlines, Ethiopian Airlines, Air France, Kenya Airways, etc.',
      'Terminal Domestique : vols Congo Airways, CAA vers Lubumbashi, Goma, Bukavu, etc.',
    ],
    color: 'bg-rdc-blue text-white',
  },
  {
    step: 2,
    title: 'Enregistrement (Check-in)',
    time: 'Fermeture des comptoirs : 1h avant le départ (international) · 45 min (domestique)',
    details: [
      'Présentez passeport valide + billet électronique (ou confirmation de réservation)',
      'Carnet International de Vaccination (carnet jaune — fièvre jaune OBLIGATOIRE)',
      'Bagages : respectez les franchises de votre compagnie (généralement 20–23 kg en soute)',
      'Option FIH Express disponible pour les passagers pressés (comptoir prioritaire)',
    ],
    color: 'bg-rdc-green text-white',
  },
  {
    step: 3,
    title: 'Contrôle des passeports — DGM',
    time: '~15–25 min',
    details: [
      'Direction Générale des Migrations (DGM) — présentation du passeport et visa',
      'Les ressortissants RDC présentent leur passeport ou carte d\'identité nationale',
      'Les étrangers : passeport + visa RDC valide requis',
      'Taxe de sortie incluse dans la plupart des billets (vérifiez auprès de votre compagnie)',
    ],
    color: 'bg-amber-500 text-white',
  },
  {
    step: 4,
    title: 'Contrôle de sécurité',
    time: '~10–20 min',
    details: [
      'Retirez chaussures, ceinture et objets métalliques',
      'Liquides : max 100 ml par article dans un sac plastique transparent (1 litre total)',
      'Ordinateurs et tablettes à sortir du sac',
      'Les couteaux, armes et objets tranchants sont interdits en cabine',
    ],
    color: 'bg-rdc-red text-white',
  },
  {
    step: 5,
    title: 'Zone internationale & Embarquement',
    time: 'Embarquement : 45–30 min avant le départ',
    details: [
      'Boutiques Duty Free, restaurants, bars et salons VIP accessibles',
      'Vérifiez votre porte d\'embarquement sur les écrans (susceptible de changement)',
      'Présentez-vous à la porte avec passeport + carte d\'embarquement',
    ],
    color: 'bg-purple-600 text-white',
  },
];

function QuitterKinshasaPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.leavingKinshasa')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.leavingSubtitle')}</p>

      {/* Yellow fever alert */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Carnet de vaccination obligatoire</p>
          <p>Le carnet international de vaccination contre la fièvre jaune (carnet jaune OMS) est exigé pour tout voyage en provenance ou à destination de nombreux pays. Assurez-vous d'être en règle avant de vous présenter à l'enregistrement.</p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {STEPS.map(s => (
          <div key={s.step} className="flex gap-4">
            {/* Step number */}
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${s.color}`}>
              {s.step}
            </div>
            <div className="flex-1 rounded-2xl border border-border bg-card p-5">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <p className="font-semibold text-rdc-anthracite">{s.title}</p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock size={11} /> {s.time}
                </span>
              </div>
              <ul className="space-y-1.5">
                {s.details.map(d => (
                  <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle size={11} className="mt-0.5 flex-shrink-0 text-rdc-green" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-rdc-blue/20 bg-rdc-blue/5 p-4">
        <Info size={15} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
        <p className="text-sm text-rdc-blue/80">{t('guide.leavingNote')}</p>
      </div>
    </div>
  );
}
