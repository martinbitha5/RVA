import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Package, Info, CheckCircle, Wine, Flame, Sparkles, Gem } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/hors-taxes')({
  component: HorsTaxesPage,
  head: () => ({ meta: [{ title: "Boutique Hors-Taxes — Aéroport N'djili · FIH" }] }),
});

const CATEGORIES_DT = [
  { label: 'Spiritueux & Vins',    Icon: Wine,      desc: 'Whiskies, cognacs, champagnes, vins français et sud-africains' },
  { label: 'Tabacs',               Icon: Flame,      desc: 'Cigarettes, cigares premium, accessoires tabac' },
  { label: 'Parfums & Cosmétiques',Icon: Sparkles,  desc: 'Grandes marques françaises, produits de beauté locaux et internationaux' },
  { label: 'Bijoux & Montres',     Icon: Gem,       desc: 'Joaillerie artisanale congolaise, montres de marque' },
];

const ALLOWANCES = [
  { item: 'Alcool (> 22° vol)',   qty: '1 litre',     note: 'Par passager adulte' },
  { item: 'Alcool (≤ 22° vol)',   qty: '2 litres',    note: 'Vin, bière, cidre' },
  { item: 'Tabac — cigarettes',   qty: '200 unités',  note: '1 cartouche' },
  { item: 'Tabac — cigares',      qty: '50 unités',   note: 'Ou 250 g tabac' },
  { item: 'Parfums',              qty: '50 ml',       note: 'Eau de toilette : 250 ml' },
  { item: 'Café',                 qty: '500 g',       note: 'Ou 200 g extraits/essences' },
];

function HorsTaxesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.dutyFree')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('shops.dutyFreeSubtitle')}</p>

      {/* Location badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-rdc-blue/30 bg-rdc-blue/5 px-4 py-2.5 text-sm font-medium text-rdc-blue">
        <Package size={15} />
        {t('shops.dutyFreeLocation')}
      </div>

      {/* Categories */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite">{t('shops.dutyFreeCategories')}</h2>
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES_DT.map(({ label, Icon, desc }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 mx-auto">
              <Icon size={20} className="text-purple-700" />
            </div>
            <p className="font-semibold text-sm text-rdc-anthracite mb-1">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* Allowances */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">{t('shops.allowancesTitle')}</h2>
      <p className="mb-5 flex items-start gap-2 text-sm text-muted-foreground">
        <Info size={14} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
        {t('shops.allowancesNote')}
      </p>
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Article</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quantité</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden sm:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {ALLOWANCES.map((a, i) => (
              <tr key={a.item} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                <td className="px-4 py-3 flex items-center gap-2">
                  <CheckCircle size={12} className="text-rdc-green flex-shrink-0" /> {a.item}
                </td>
                <td className="px-4 py-3 font-semibold text-rdc-blue">{a.qty}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{t('shops.allowancesDisclaimer')}</p>
    </div>
  );
}
