import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRightLeft, AlertTriangle, MapPin, Clock, Info } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/echange-devises')({
  component: EchangeDevisesPage,
  head: () => ({ meta: [{ title: "Échange de devises — Aéroport N'djili · FIH" }] }),
});

// Indicative rates — in production, fetch from a live exchange rate API
const RATES = [
  { pair: 'USD → CDF', rate: '2 800',   unit: 'CDF pour 1 USD',     note: 'Taux indicatif' },
  { pair: 'EUR → USD', rate: '1,09',    unit: 'USD pour 1 EUR',      note: 'Taux indicatif' },
  { pair: 'EUR → CDF', rate: '3 050',   unit: 'CDF pour 1 EUR',      note: 'Taux indicatif' },
  { pair: 'GBP → USD', rate: '1,27',    unit: 'USD pour 1 GBP',      note: 'Taux indicatif' },
  { pair: 'ZAR → USD', rate: '0,053',   unit: 'USD pour 1 ZAR',      note: 'Taux indicatif' },
];

const BUREAUX = [
  {
    name: 'Rawbank Change — Aéroport',
    location: 'Terminal International — Hall Arrivées (Niveau 0)',
    hours: '07:00–21:00',
    currencies: ['USD', 'EUR', 'GBP', 'CDF'],
    commission: '1,5%',
  },
  {
    name: 'Bureau de Change FIH',
    location: 'Terminal International — Zone Embarquement (après sécurité)',
    hours: '06:00–22:00',
    currencies: ['USD', 'EUR', 'CDF'],
    commission: '2%',
  },
  {
    name: 'Equity BCDC Change',
    location: 'Terminal International — Hall Départs (Niveau 1)',
    hours: '08:00–20:00',
    currencies: ['USD', 'EUR', 'ZAR', 'CDF'],
    commission: '1,75%',
  },
];

function EchangeDevisesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.currencyExchange')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('shops.exchangeSubtitle')}</p>

      {/* Important note */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">{t('shops.exchangeWarningTitle')}</p>
          <p>{t('shops.exchangeWarning')}</p>
        </div>
      </div>

      {/* Rates table */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">{t('shops.ratesTitle')}</h2>
      <div className="mb-8 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground">Paire</th>
              <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wide text-muted-foreground">Taux</th>
              <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wide text-muted-foreground hidden sm:table-cell">Unité</th>
              <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wide text-muted-foreground hidden sm:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {RATES.map((r, i) => (
              <tr key={r.pair} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                <td className="px-4 py-3 font-semibold text-rdc-anthracite flex items-center gap-2">
                  <ArrowRightLeft size={12} className="text-emerald-600" /> {r.pair}
                </td>
                <td className="px-4 py-3 text-right font-bold text-rdc-blue">{r.rate}</td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">{r.unit}</td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{r.note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-10 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info size={11} className="mt-0.5 flex-shrink-0" />
        {t('shops.ratesDisclaimer')}
      </p>

      {/* Bureaux */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">{t('shops.exchangeOffices')}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {BUREAUX.map(b => (
          <div key={b.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <ArrowRightLeft size={17} className="text-emerald-700" />
            </div>
            <p className="font-semibold text-rdc-anthracite mb-1">{b.name}</p>
            <div className="space-y-1 text-xs text-muted-foreground mb-3">
              <p className="flex items-start gap-1"><MapPin size={10} className="mt-0.5 flex-shrink-0" /> {b.location}</p>
              <p className="flex items-center gap-1"><Clock size={10} /> {b.hours}</p>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {b.currencies.map(c => (
                <span key={c} className="rounded-full bg-rdc-blue/10 px-2 py-0.5 text-[10px] font-bold text-rdc-blue">{c}</span>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">Commission : {b.commission}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
