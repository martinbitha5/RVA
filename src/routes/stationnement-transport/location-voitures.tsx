import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Car, Globe, Phone, MapPin } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/location-voitures')({
  component: LocationVoituresPage,
  head: () => ({ meta: [{ title: "Location de voitures — Aéroport N'djili · FIH" }] }),
});

const AGENCIES = [
  { name: 'Avis',     type: 'international', website: 'https://avis.com',     phone: '+243 81 XXX XXXX', counter: 'Hall Arrivées T1',  from: '$60/j' },
  { name: 'Europcar', type: 'international', website: 'https://europcar.com', phone: '+243 89 XXX XXXX', counter: 'Hall Arrivées T1',  from: '$55/j' },
  { name: 'Hertz',    type: 'international', website: 'https://hertz.com',    phone: '+243 97 XXX XXXX', counter: 'Hall Arrivées T1',  from: '$65/j' },
  { name: 'Loxea',    type: 'local',         website: 'https://loxea.cd',     phone: '+243 81 XXX XXXX', counter: 'Hall Arrivées T2',  from: '$45/j' },
  { name: 'KinCar',   type: 'local',         website: '',                     phone: '+243 99 XXX XXXX', counter: 'Parking P1',        from: '$35/j' },
];

function LocationVoituresPage() {
  const { t } = useTranslation();
  const intl  = AGENCIES.filter((a) => a.type === 'international');
  const local = AGENCIES.filter((a) => a.type === 'local');

  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.carRental')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.rental.subtitle')}</p>

      {[{ title: t('stat.rental.international'), list: intl }, { title: t('stat.rental.local'), list: local }].map(({ title, list }) => (
        <section key={title} className="mb-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <div key={a.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                    <Car size={18} className="text-orange-600" />
                  </div>
                  <span className="text-lg font-bold text-rdc-green">{a.from}</span>
                </div>
                <p className="font-semibold text-rdc-anthracite">{a.name}</p>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Phone size={11} />
                    <a href={`tel:${a.phone}`} className="hover:text-rdc-blue">{a.phone}</a>
                  </div>
                  <div className="flex items-center gap-1.5"><MapPin size={11} /> {a.counter}</div>
                  {a.website && (
                    <div className="flex items-center gap-1.5"><Globe size={11} />
                      <a href={a.website} target="_blank" rel="noopener noreferrer" className="hover:text-rdc-blue">{a.website.replace('https://', '')}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
