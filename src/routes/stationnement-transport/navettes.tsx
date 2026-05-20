import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Truck, Phone, Clock, Star } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/navettes')({
  component: NavettesPage,
  head: () => ({ meta: [{ title: "Navettes hôtels — Aéroport N'djili · FIH" }] }),
});

const SHUTTLES = [
  { name: 'Kempinski Hotel Kinshasa',  contact: '+243 81 XXX XXXX', stars: 5, freq: 'Sur demande', note: 'Navette gratuite pour clients' },
  { name: 'Fleuve Congo Hotel',        contact: '+243 99 XXX XXXX', stars: 5, freq: 'Toutes les heures', note: 'Réservation recommandée' },
  { name: 'Grand Hotel Kinshasa',      contact: '+243 81 XXX XXXX', stars: 4, freq: '2× / jour', note: '$15 USD / personne' },
  { name: 'Venus Hotel',               contact: '+243 82 XXX XXXX', stars: 4, freq: 'Sur demande', note: 'Sur réservation uniquement' },
  { name: 'Hotel Memling',             contact: '+243 97 XXX XXXX', stars: 4, freq: 'Toutes les 2h', note: '$10 USD / personne' },
];

function NavettesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.shuttles')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.shuttles.subtitle')}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHUTTLES.map((s) => (
          <div key={s.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <Truck size={18} className="text-purple-600" />
              </div>
              <div className="flex">
                {Array.from({ length: s.stars }).map((_, i) => (
                  <Star key={i} size={11} className="fill-rdc-yellow text-rdc-yellow" />
                ))}
              </div>
            </div>
            <p className="font-semibold text-rdc-anthracite">{s.name}</p>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Clock size={11} /> {s.freq}</div>
              <div className="flex items-center gap-1.5">
                <Phone size={11} />
                <a href={`tel:${s.contact}`} className="hover:text-rdc-blue">{s.contact}</a>
              </div>
              <p className="mt-2 rounded-lg bg-muted px-3 py-1.5 text-xs">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
