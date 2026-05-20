import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Coffee, Beer, MapPin, Clock, Wifi } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/bars-cafes')({
  component: BarsCafesPage,
  head: () => ({ meta: [{ title: "Bars & Cafés — Aéroport N'djili · FIH" }] }),
});

const BARS_CAFES = [
  {
    name: 'Sky Bar FIH',
    type: 'bar',
    terminal: 'International',
    zone: 'after',
    hours: '08:00–00:00',
    wifi: true,
    description: 'Bar panoramique avec vue sur les pistes. Cocktails, bières locales (Primus, Skol, Turbo King) et internationales, planches charcuterie.',
    specials: ['Primus glacée', 'Cocktails tropicaux', 'Whisky', 'Vins'],
  },
  {
    name: 'Café Congo',
    type: 'cafe',
    terminal: 'International',
    zone: 'before',
    hours: '05:00–22:00',
    wifi: true,
    description: 'Café premium utilisant exclusivement du café arabica de la région du Kivu. Expresso, cappuccino, café filtre et thés locaux.',
    specials: ['Café Kivu', 'Thé de Butembo', 'Jus de maracuja', 'Smoothies'],
  },
  {
    name: 'Terminal Café',
    type: 'cafe',
    terminal: 'Domestique',
    zone: 'before',
    hours: '05:30–21:00',
    wifi: false,
    description: 'Café économique pour les voyageurs du terminal domestique. Boissons chaudes, jus frais et viennoiseries.',
    specials: ['Café Nespresso', 'Limonades', 'Croissants', 'Sandwichs'],
  },
  {
    name: 'Primus Corner',
    type: 'bar',
    terminal: 'International',
    zone: 'after',
    hours: '10:00–22:00',
    wifi: false,
    description: 'Le coin convivial dédié à la bière congolaise. Primus, Skol, Turbo King et produits Bracongo à déguster avant l\'embarquement.',
    specials: ['Primus', 'Skol', 'Turbo King', 'Sangria tropicale'],
  },
];

function BarsCafesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.barsCafes')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('shops.barsCafesSubtitle')}</p>

      <div className="grid gap-5 md:grid-cols-2">
        {BARS_CAFES.map(b => {
          const Icon = b.type === 'bar' ? Beer : Coffee;
          const color = b.type === 'bar' ? 'bg-amber-100 text-amber-700' : 'bg-rdc-blue/10 text-rdc-blue';
          return (
            <div key={b.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-rdc-anthracite">{b.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{b.type === 'bar' ? 'Bar' : 'Café'}</p>
                  </div>
                </div>
                {b.wifi && (
                  <span className="flex items-center gap-1 rounded-full bg-rdc-blue/10 px-2 py-1 text-[10px] font-medium text-rdc-blue">
                    <Wifi size={9} /> Wi-Fi
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground mb-3">{b.description}</p>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {b.specials.map(s => (
                  <span key={s} className="rounded-lg bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{s}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={10} /> {b.terminal}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {b.hours}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${b.zone === 'after' ? 'bg-rdc-green/10 text-rdc-green' : 'bg-muted text-muted-foreground'}`}>
                  {b.zone === 'after' ? t('shops.afterSecurity') : t('shops.beforeSecurity')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
