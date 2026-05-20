import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle, Clock, Syringe, CreditCard } from 'lucide-react';

export const Route = createFileRoute('/guide/atterrir-kinshasa')({
  component: AtterrirKinshasaPage,
  head: () => ({ meta: [{ title: "Atterrir à Kinshasa — Guide Arrivée FIH" }] }),
});

const ARRIVAL_STEPS = [
  {
    step: 1,
    title: 'Débarquement',
    time: '~5–10 min',
    details: [
      'Suivez les panneaux "Arrivées / Arrivals" vers le hall de transit',
      'Préparez : passeport, visa, carnet de vaccination (fièvre jaune)',
      'Formulaire de santé à remplir si requis (selon actualité sanitaire)',
    ],
    color: 'bg-rdc-blue text-white',
  },
  {
    step: 2,
    title: 'Contrôle Santé — Vaccination',
    time: '~5–15 min',
    details: [
      'Carnet jaune OMS (preuve vaccination fièvre jaune) contrôlé à l\'entrée',
      'Vaccination obligatoire pour tout voyageur arrivant de zones endémiques',
      'Sans vaccination valide : vaccination sur place (30 USD) + quarantaine possible',
      'Validité : à vie depuis 2016 (vaccin administré après l\'âge de 1 an)',
    ],
    color: 'bg-amber-500 text-white',
  },
  {
    step: 3,
    title: 'Contrôle Immigration — DGM',
    time: '~20–40 min',
    details: [
      'Direction Générale des Migrations — fenêtres "Nationaux" / "Étrangers"',
      'Ressortissants RDC : passeport ou pièce d\'identité nationale',
      'Ressortissants CEDEAO / UA : visa à l\'arrivée possible pour certains pays (85 USD)',
      'Autres nationalités : visa requis, obtenu idéalement avant le départ (visa électronique sur evisa.gouv.cd)',
    ],
    color: 'bg-rdc-green text-white',
  },
  {
    step: 4,
    title: 'Récupération des bagages',
    time: '~20–40 min',
    details: [
      'Les bandes de livraison sont indiquées sur les écrans du hall arrivées',
      'Signalez immédiatement tout bagage manquant au comptoir de votre compagnie',
      'Gardez le ticket bagage jusqu\'à la sortie du terminal',
    ],
    color: 'bg-slate-500 text-white',
  },
  {
    step: 5,
    title: 'Contrôle Douanier — DGDA',
    time: '~5–15 min',
    details: [
      'Direction Générale des Douanes et Accises',
      'Déclarez tout montant supérieur à 10 000 USD en espèces',
      'Produits commerciaux, équipements professionnels et véhicules à déclarer',
      'Médicaments : ordonnance recommandée pour les traitements en grande quantité',
    ],
    color: 'bg-purple-600 text-white',
  },
  {
    step: 6,
    title: 'Sortie & Transport',
    time: 'Variable',
    details: [
      'Hall d\'accueil : taxis officiels RVA agréés (évitez les taxis non officiels)',
      'Bureau de change Rawbank disponible avant la sortie',
      'ATM Equity BCDC et TMB dans le hall arrivées',
      'Navettes hôtels : panneaux d\'accueil dans le hall',
    ],
    color: 'bg-rdc-blue text-white',
  },
];

function AtterrirKinshasaPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.arrivingKinshasa')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.arrivingSubtitle')}</p>

      {/* Key alerts */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Syringe size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
          <div className="text-xs text-amber-800">
            <p className="font-semibold mb-1">Fièvre jaune obligatoire</p>
            <p>Carnet jaune OMS exigé. Amenez-le systématiquement.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-rdc-blue/20 bg-rdc-blue/5 p-4">
          <CreditCard size={16} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
          <div className="text-xs text-rdc-blue/80">
            <p className="font-semibold mb-1">USD recommandé</p>
            <p>Le dollar américain est la devise principale en RDC. Prévoyez de la monnaie.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-rdc-green/20 bg-rdc-green/5 p-4">
          <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-rdc-green" />
          <div className="text-xs text-rdc-green/80">
            <p className="font-semibold mb-1">Taxis officiels</p>
            <p>Utilisez uniquement les taxis RVA agréés. Refusez les démarcheurs à la sortie.</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {ARRIVAL_STEPS.map(s => (
          <div key={s.step} className="flex gap-4">
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
    </div>
  );
}
