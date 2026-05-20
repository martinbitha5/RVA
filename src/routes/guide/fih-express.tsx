import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Sparkles, CheckCircle, Star, Phone } from 'lucide-react';

export const Route = createFileRoute('/guide/fih-express')({
  component: FihExpressPage,
  head: () => ({ meta: [{ title: "FIH Express — Service prioritaire · Aéroport N'djili" }] }),
});

const BENEFITS = [
  'Comptoir d\'enregistrement prioritaire — file d\'attente dédiée',
  'Contrôle sécurité accéléré — couloir Express',
  'Assistance personnelle de l\'arrivée à la porte d\'embarquement',
  'Service bagages prioritaire — récupération en premier',
  'Accès salon Pearl Lounge inclus (offre Premium)',
  'Transfert tarmac en véhicule privé (sur demande)',
];

const TARIFFS = [
  { name: 'FIH Express Départ',   price: 35,  includes: ['Comptoir prioritaire', 'Sécurité rapide', 'Assistance'] },
  { name: 'FIH Express Arrivée',  price: 25,  includes: ['Immigration rapide', 'Récupération bagages prioritaire', 'Sortie accompagnée'] },
  { name: 'FIH Express Premium',  price: 75,  includes: ['Départ + Arrivée', 'Accès Pearl Lounge', 'Transfert véhicule'] },
];

function FihExpressPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.fihExpress')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('guide.fihExpressSubtitle')}</p>

      {/* Benefits */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite">{t('guide.fihExpressBenefits')}</h2>
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map(b => (
          <div key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-rdc-green" />
            <p className="text-sm">{b}</p>
          </div>
        ))}
      </div>

      {/* Tariffs */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite">{t('guide.fihExpressTariffs')}</h2>
      <div className="mb-10 grid gap-5 md:grid-cols-3">
        {TARIFFS.map((tariff, i) => (
          <div key={tariff.name} className={`rounded-2xl border-2 bg-card p-5 ${i === 2 ? 'border-rdc-yellow/40 shadow-md' : 'border-border'}`}>
            {i === 2 && (
              <div className="mb-3 flex items-center gap-1.5">
                <Star size={12} className="fill-rdc-yellow text-rdc-yellow" />
                <span className="text-xs font-bold text-rdc-anthracite">Recommandé</span>
              </div>
            )}
            <p className="font-display font-bold text-rdc-anthracite">{tariff.name}</p>
            <p className="mt-1 text-3xl font-bold text-rdc-blue">${tariff.price} <span className="text-sm font-normal text-muted-foreground">USD</span></p>
            <ul className="mt-4 space-y-2">
              {tariff.includes.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles size={10} className="text-rdc-yellow flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a href="tel:+243810000000"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-rdc-blue py-2.5 text-sm font-semibold text-white hover:bg-rdc-blue/85 transition-colors">
              <Phone size={13} /> Réserver
            </a>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{t('guide.fihExpressNote')}</p>
    </div>
  );
}
