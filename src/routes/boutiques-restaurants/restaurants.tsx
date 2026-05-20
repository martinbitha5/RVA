import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { UtensilsCrossed, Clock, MapPin, Star } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/restaurants')({
  component: RestaurantsPage,
  head: () => ({ meta: [{ title: "Restaurants — Aéroport N'djili · FIH" }] }),
});

const RESTAURANTS = [
  {
    name: 'Chez Tante Marie',
    cuisine: 'Cuisine congolaise traditionnelle',
    terminal: 'International',
    zone: 'after',
    hours: '06:00–22:00',
    rating: 4.5,
    specialty: 'Poulet moambe, Saka-saka, Fufu',
    description: 'Le restaurant phare de FIH, proposant les saveurs authentiques de la cuisine congolaise dans un cadre moderne.',
  },
  {
    name: 'Le Gourmet Congolais',
    cuisine: 'Fusion congolo-européenne',
    terminal: 'International',
    zone: 'after',
    hours: '07:00–23:00',
    rating: 4.2,
    specialty: 'Tilapia du Congo, Brochettes, Salades',
    description: 'Une cuisine de fusion alliant les saveurs locales aux techniques culinaires européennes.',
  },
  {
    name: 'KFC Express',
    cuisine: 'Fast-food international',
    terminal: 'International',
    zone: 'after',
    hours: '06:00–22:00',
    rating: 3.8,
    specialty: 'Poulet croustillant, Burgers, Snacks',
    description: 'Restauration rapide internationale pour les voyageurs pressés.',
  },
  {
    name: 'Saveur de Kinshasa',
    cuisine: 'Street food kinoise',
    terminal: 'Domestique',
    zone: 'after',
    hours: '06:00–20:00',
    rating: 4.0,
    specialty: 'Makemba, Liboke de poisson, Beignets',
    description: 'L\'ambiance de la street food kinoise au cœur du terminal domestique.',
  },
  {
    name: 'Café Congo',
    cuisine: 'Café & Viennoiseries',
    terminal: 'International',
    zone: 'before',
    hours: '05:00–22:00',
    rating: 4.1,
    specialty: 'Café Kivu, Croissants, Sandwichs',
    description: 'Café haut de gamme servant le meilleur café de la région du Kivu.',
  },
];

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={11}
      className={i < Math.floor(rating) ? 'fill-rdc-yellow text-rdc-yellow' : 'text-muted-foreground/30'} />
  ));
}

function RestaurantsPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.restaurants')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('shops.restaurantsSubtitle')}</p>

      <div className="grid gap-5 lg:grid-cols-2">
        {RESTAURANTS.map(r => (
          <div key={r.name} className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Color accent strip */}
            <div className="h-1.5 bg-gradient-to-r from-rdc-green to-rdc-blue" />
            <div className="p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-green/10">
                    <UtensilsCrossed size={18} className="text-rdc-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-rdc-anthracite">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.cuisine}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">{renderStars(r.rating)}</div>
              </div>

              <p className="text-xs text-muted-foreground mb-3">{r.description}</p>

              <div className="rounded-lg bg-muted/50 px-3 py-2 mb-3">
                <p className="text-xs font-medium text-rdc-anthracite">Spécialités</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.specialty}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={10} /> {r.terminal}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {r.hours}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.zone === 'after' ? 'bg-rdc-green/10 text-rdc-green' : 'bg-muted text-muted-foreground'}`}>
                  {r.zone === 'after' ? t('shops.afterSecurity') : t('shops.beforeSecurity')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">{t('shops.hoursNote')}</p>
    </div>
  );
}
