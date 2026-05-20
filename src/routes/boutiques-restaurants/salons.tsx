import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Crown, Wifi, Coffee, UtensilsCrossed, Tv, Droplets, CheckCircle, MapPin, Clock, Phone } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/salons')({
  component: SalonsPage,
  head: () => ({ meta: [{ title: "Salons VIP — Aéroport N'djili · FIH" }] }),
});

const AMENITY_ICONS: Record<string, React.ElementType> = {
  wifi:     Wifi,
  food:     UtensilsCrossed,
  drinks:   Coffee,
  tv:       Tv,
  shower:   Droplets,
};

const LOUNGES = [
  {
    name: 'Pearl Lounge FIH',
    operator: 'RVA / Aéroport N\'djili',
    tier: 'Premium',
    location: 'Terminal International — Niveau 2, après contrôle passeports',
    hours: '05:00–23:00',
    phone: '+243 81 XXX XXXX',
    color: 'border-rdc-yellow/40 shadow-md',
    headerColor: 'bg-gradient-to-r from-rdc-anthracite to-rdc-blue',
    access: [
      'Passagers First Class & Business Class toutes compagnies',
      'Détenteurs carte Priority Pass / Lounge Key',
      'Membres Programme Fidélité FIH Gold & Platinum',
      'Accès payant : 45 USD / personne',
    ],
    amenities: ['wifi', 'food', 'drinks', 'tv', 'shower'],
    description: 'Le salon premium officiel de l\'Aéroport de N\'djili. Restauration congolaise gastronomique, bar premium, douches privées et Wi-Fi haut débit.',
    capacity: '80 places',
  },
  {
    name: 'Brussels Airlines Lounge',
    operator: 'Brussels Airlines (SN)',
    tier: 'Business',
    location: 'Terminal International — Porte B2',
    hours: 'Selon horaires vols Brussels Airlines',
    phone: '+243 XX XXX XXXX',
    color: 'border-blue-200',
    headerColor: 'bg-blue-700',
    access: [
      'Passagers Brussels Airlines Business Class',
      'Détenteurs carte Eurobonus Gold / Platinum',
      'Membres Star Alliance Gold (sous réserve)',
    ],
    amenities: ['wifi', 'food', 'drinks', 'tv'],
    description: 'Salon opéré par Brussels Airlines pour ses passagers classes supérieures. Ambiance européenne avec touches congolaises.',
    capacity: '40 places',
  },
  {
    name: 'Ethiopian Airlines Lounge',
    operator: 'Ethiopian Airlines (ET)',
    tier: 'Business',
    location: 'Terminal International — Porte A5',
    hours: 'Selon horaires vols Ethiopian',
    phone: '+243 XX XXX XXXX',
    color: 'border-green-200',
    headerColor: 'bg-green-700',
    access: [
      'Passagers Ethiopian Airlines Cloud Nine (Business)',
      'Membres ShebaMiles Platinum & Gold',
      'Membres Star Alliance Gold',
    ],
    amenities: ['wifi', 'food', 'drinks'],
    description: 'Salon Ethiopian Airlines avec cuisine pan-africaine et service personnalisé.',
    capacity: '30 places',
  },
];

function SalonsPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.lounges')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('shops.loungesSubtitle')}</p>

      <div className="grid gap-6 lg:grid-cols-3">
        {LOUNGES.map(l => {
          const isPrimary = l.tier === 'Premium';
          return (
            <div key={l.name} className={`rounded-2xl border-2 bg-card overflow-hidden ${l.color}`}>
              {/* Header */}
              <div className={`${l.headerColor} px-5 py-4`}>
                <div className="flex items-center justify-between">
                  <Crown size={20} className="text-rdc-yellow" />
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${isPrimary ? 'bg-rdc-yellow text-rdc-anthracite' : 'bg-white/20 text-white'}`}>
                    {l.tier}
                  </span>
                </div>
                <p className="mt-3 font-display font-bold text-white">{l.name}</p>
                <p className="text-xs text-white/70 mt-0.5">{l.operator}</p>
              </div>

              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-4">{l.description}</p>

                {/* Amenities */}
                <div className="mb-4 flex gap-2.5">
                  {l.amenities.map(a => {
                    const Icon = AMENITY_ICONS[a];
                    return (
                      <div key={a} className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        <Icon size={14} className="text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>

                {/* Access conditions */}
                <div className="mb-4 rounded-xl bg-muted/50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">{t('shops.loungeAccess')}</p>
                  <ul className="space-y-1.5">
                    {l.access.map(a => (
                      <li key={a} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle size={10} className="mt-0.5 flex-shrink-0 text-rdc-green" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Info */}
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-start gap-1.5"><MapPin size={10} className="mt-0.5 flex-shrink-0" /> {l.location}</p>
                  <p className="flex items-center gap-1.5"><Clock size={10} /> {l.hours}</p>
                  <a href={`tel:${l.phone}`} className="flex items-center gap-1.5 text-rdc-blue hover:underline">
                    <Phone size={10} /> {l.phone}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">{t('shops.loungesNote')}</p>
    </div>
  );
}
