import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Shield, XCircle, CheckCircle, AlertTriangle, Luggage } from 'lucide-react';

export const Route = createFileRoute('/guide/securite-bagages')({
  component: SecuriteBagagesPage,
  head: () => ({ meta: [{ title: "Sécurité & Bagages — Guide FIH" }] }),
});

const FORBIDDEN_CABIN = [
  'Couteaux, ciseaux, objets tranchants > 6 cm',
  'Armes à feu et munitions (soute autorisée avec déclaration)',
  'Liquides > 100 ml (hors achetés en zone sécurisée)',
  'Briquets : 1 max par passager (poches seulement)',
  'Batteries lithium > 160 Wh (en soute)',
  'Gaz comprimés (déodorants aérosol > 100 ml)',
  'Produits chimiques corrosifs ou explosifs',
];

const LIQUIDS_RULES = [
  'Chaque récipient : max 100 ml / 100 g',
  'Sac plastique transparent refermable : max 1 litre',
  'Un seul sac par passager',
  'Médicaments et aliments bébé : exonérés (déclaration requise)',
  'Achats en zone duty-free : emballage scellé autorisé',
];

const BAGGAGE_ALLOWANCES = [
  { class: 'Économique',  cabin: '7–10 kg / 1 bagage',   hold: '20–23 kg / 1 bagage',  note: 'Variable selon compagnie' },
  { class: 'Affaires',   cabin: '12–15 kg / 2 bagages',  hold: '30–32 kg / 2 bagages', note: 'Variable selon compagnie' },
  { class: 'Domestique', cabin: '5–7 kg',                hold: '15–20 kg / 1 bagage',  note: 'Vols Congo Airways / CAA' },
];

function SecuriteBagagesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.luggageSecurity')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('guide.securitySubtitle')}</p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Forbidden items */}
        <div className="rounded-2xl border border-rdc-red/20 bg-rdc-red/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Shield size={18} className="text-rdc-red" />
            <h2 className="font-display font-bold text-rdc-anthracite">{t('guide.forbiddenItems')}</h2>
          </div>
          <ul className="space-y-2">
            {FORBIDDEN_CABIN.map(item => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <XCircle size={13} className="mt-0.5 flex-shrink-0 text-rdc-red" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Liquids */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <h2 className="font-display font-bold text-rdc-anthracite">{t('guide.liquidsRule')}</h2>
          </div>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
            100ml
          </div>
          <ul className="space-y-2">
            {LIQUIDS_RULES.map(r => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-rdc-green" /> {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Baggage allowances */}
      <h2 className="font-display mt-10 mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Luggage size={20} className="text-rdc-blue" /> {t('guide.baggageAllowances')}
      </h2>
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Classe</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cabine</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Soute</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden sm:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {BAGGAGE_ALLOWANCES.map((r, i) => (
              <tr key={r.class} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                <td className="px-4 py-3 font-semibold text-rdc-anthracite">{r.class}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.cabin}</td>
                <td className="px-4 py-3 font-medium text-rdc-blue">{r.hold}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell text-xs">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{t('guide.baggageNote')}</p>
    </div>
  );
}
