import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Banknote, CreditCard, MapPin, Clock, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/guide/services-bancaires')({
  component: ServicesBancairesPage,
  head: () => ({ meta: [{ title: "Services Bancaires & ATM — Aéroport N'djili · FIH" }] }),
});

const ATMS = [
  { bank: 'Equity BCDC',  location: 'Terminal International — Hall Arrivées', available: true,  currencies: ['USD', 'CDF'], notes: 'Visa, Mastercard, UnionPay' },
  { bank: 'TMB',          location: 'Terminal Domestique — Entrée principale', available: true,  currencies: ['USD', 'CDF'], notes: 'Visa, Mastercard' },
  { bank: 'Rawbank',      location: 'Terminal International — Hall Départs',  available: true,  currencies: ['USD'],        notes: 'Visa, Mastercard, AMEX' },
  { bank: 'BCDC',         location: 'Parking P1 — Entrée',                   available: false, currencies: ['USD', 'CDF'], notes: 'Temporairement hors service' },
];

const BANKING_TIPS = [
  'Le dollar américain (USD) est la devise de facto en RDC pour la plupart des transactions',
  'Les billets de 100 USD en parfait état sont préférés ; les billets abîmés ou anciens peuvent être refusés',
  'Le franc congolais (CDF) est la monnaie officielle — requis pour certains transports et marchés locaux',
  'Les paiements par carte sont acceptés dans les hôtels internationaux et certaines boutiques du terminal',
  'Prévoyez du cash : nombreux établissements à Kinshasa ne disposent pas de terminaux de paiement',
  'Mobile Money (Airtel Money, M-Pesa, Orange Money) : accepté à l\'aéroport pour parking et certains services',
];

function ServicesBancairesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.bankingServices')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.bankingSubtitle')}</p>

      {/* ATM grid */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <CreditCard size={18} className="text-rdc-blue" /> Distributeurs ATM
      </h2>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {ATMS.map(atm => (
          <div key={atm.bank} className={`rounded-2xl border bg-card p-5 ${atm.available ? 'border-border' : 'border-muted opacity-60'}`}>
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
                  <Banknote size={18} className="text-rdc-blue" />
                </div>
                <p className="font-semibold text-rdc-anthracite">{atm.bank}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${atm.available ? 'bg-rdc-green/10 text-rdc-green' : 'bg-muted text-muted-foreground'}`}>
                {atm.available ? 'Disponible' : 'Hors service'}
              </span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground mb-3">
              <p className="flex items-start gap-1.5"><MapPin size={10} className="mt-0.5 flex-shrink-0" /> {atm.location}</p>
              <p className="flex items-center gap-1.5"><Clock size={10} /> 24h/24</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {atm.currencies.map(c => (
                <span key={c} className="rounded-full bg-rdc-blue/10 px-2 py-0.5 text-[10px] font-bold text-rdc-blue">{c}</span>
              ))}
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{atm.notes}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <AlertTriangle size={18} className="text-amber-500" /> Conseils pour gérer votre argent en RDC
      </h2>
      <div className="rounded-2xl border border-border bg-card p-5">
        <ul className="space-y-3">
          {BANKING_TIPS.map(tip => (
            <li key={tip} className="flex items-start gap-2 text-sm">
              <Banknote size={13} className="mt-0.5 flex-shrink-0 text-rdc-blue" /> {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
