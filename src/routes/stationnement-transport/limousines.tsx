import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Car, Phone, Star, Shield } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/limousines')({
  component: LimousinesPage,
  head: () => ({ meta: [{ title: "Limousines & services premium — Aéroport N'djili · FIH" }] }),
});

const SERVICES = [
  { name: 'VIP Transfer Kinshasa',  vehicles: 'Mercedes S-Class, BMW 7',  phone: '+243 81 XXX XXXX', features: ['Chauffeur bilingue', 'Eau & snacks offerts', 'Suivi vol en temps réel'] },
  { name: 'Executive Cars Congo',   vehicles: 'Range Rover, Mercedes E',   phone: '+243 97 XXX XXXX', features: ['Réservation 24h/24', 'Meet & Greet', 'Wi-Fi embarqué'] },
  { name: 'Prestige Limousines',    vehicles: 'Lincoln Town Car, Cadillac',phone: '+243 89 XXX XXXX', features: ['Bouquet floral inclus', 'Conciergerie', 'Trajet illimité/heure'] },
];

function LimousinesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.limousines')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.limo.subtitle')}</p>

      <div className="grid gap-5 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.name} className="rounded-2xl border-2 border-rdc-yellow/30 bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rdc-anthracite">
                <Car size={20} className="text-rdc-yellow" />
              </div>
              <Shield size={16} className="text-rdc-yellow" />
            </div>
            <p className="font-display font-semibold text-rdc-anthracite">{s.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.vehicles}</p>
            <ul className="mt-4 space-y-1.5">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Star size={10} className="fill-rdc-yellow text-rdc-yellow flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a href={`tel:${s.phone}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-rdc-yellow bg-rdc-yellow/10 py-2.5 text-sm font-semibold text-rdc-anthracite hover:bg-rdc-yellow/20 transition-colors">
              <Phone size={14} /> {s.phone}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
