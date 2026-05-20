import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Bus, Clock, MapPin, DollarSign } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/transcom-bus')({
  component: TranscomBusPage,
  head: () => ({ meta: [{ title: "Bus Transco — Aéroport N'djili · FIH" }] }),
});

const LINES = [
  { code: 'L1', name: 'FIH → Gare Centrale',         freq: '30 min', fare: '$1 USD', stops: ['N\'djili', 'Masina', 'Limete', 'Gare Centrale'] },
  { code: 'L2', name: 'FIH → Victoire (Kintambo)',   freq: '45 min', fare: '$1.5 USD', stops: ['N\'djili', 'Lemba', 'Binza', 'Victoire'] },
  { code: 'L3', name: 'FIH → Ngaba / Selembao',      freq: '60 min', fare: '$2 USD', stops: ['N\'djili', 'Kingabwa', 'Ngaba', 'Selembao'] },
];

function TranscomBusPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.bus')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.bus.subtitle')}</p>

      <div className="grid gap-5 lg:grid-cols-3">
        {LINES.map((line) => (
          <div key={line.code} className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="bg-rdc-blue px-5 py-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                <Bus size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">{line.code}</p>
                <p className="font-semibold text-white text-sm">{line.name}</p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground"><Clock size={11} /> {line.freq}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><DollarSign size={11} /> {line.fare}</span>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('stat.bus.stops')}</p>
                <div className="relative pl-4">
                  {line.stops.map((stop, i) => (
                    <div key={stop} className="flex items-center gap-2 py-1">
                      <div className={`absolute left-0 h-2.5 w-2.5 rounded-full border-2 ${i === 0 || i === line.stops.length - 1 ? 'border-rdc-blue bg-rdc-blue' : 'border-muted-foreground bg-white'}`} />
                      <MapPin size={11} className="text-muted-foreground" />
                      <span className={`text-xs ${i === 0 ? 'font-semibold text-rdc-blue' : i === line.stops.length - 1 ? 'font-semibold text-rdc-anthracite' : 'text-muted-foreground'}`}>{stop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">{t('stat.bus.infoTitle')}</p>
        <p>{t('stat.bus.infoDesc')}</p>
      </div>
    </div>
  );
}
