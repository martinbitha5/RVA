import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Crown, Wifi, Coffee, UtensilsCrossed, Tv, Droplets,
  CheckCircle, MapPin, Clock, Phone, ChevronRight,
  CreditCard, Plane, Star,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/boutiques-restaurants/salons')({
  component: SalonsPage,
  head: () => ({
    meta: [
      { title: "Salons VIP — Aéroport N'djili · FIH" },
      { name: 'description', content: "Salons VIP à l'Aéroport International de N'djili : Pearl Lounge, Brussels Airlines Lounge, Ethiopian Lounge." },
    ],
  }),
});

/* ─── Data ───────────────────────────────────────────────────────────── */
const AMENITIES: Record<string, { label: string; Icon: React.ElementType; color: string }> = {
  wifi:   { label: 'Wi-Fi haut débit', Icon: Wifi,            color: 'bg-blue-50   text-blue-600'   },
  food:   { label: 'Restauration',     Icon: UtensilsCrossed, color: 'bg-green-50  text-green-700'  },
  drinks: { label: 'Bar ouvert',       Icon: Coffee,          color: 'bg-amber-50  text-amber-700'  },
  tv:     { label: 'TV & Presse',      Icon: Tv,              color: 'bg-slate-50  text-slate-600'  },
  shower: { label: 'Douches',          Icon: Droplets,        color: 'bg-cyan-50   text-cyan-600'   },
};

const FEATURED_LOUNGE = {
  name: 'Pearl Lounge FIH',
  operator: 'RVA — Régie des Voies Aériennes',
  location: 'Terminal International — Niveau 2, après contrôle passeports',
  hours: '05 h 00 à 23 h 00 — tous les jours',
  phone: '+243 81 XXX XXXX',
  capacity: '80 places',
  description: 'Le salon premium officiel de l\'Aéroport de N\'djili. Cuisine congolaise gastronomique, bar premium Primus & spiritueux sélectionnés, Wi-Fi haut débit, douches privées, espace repos et coin affaires.',
  access: [
    'Passagers First Class & Business Class — toutes compagnies',
    'Détenteurs carte Priority Pass, Lounge Key ou DragonPass',
    'Membres Programme Fidélité FIH Gold & Platinum',
    'Accès payant sur place : 45 USD par personne',
  ],
  amenities: ['wifi', 'food', 'drinks', 'tv', 'shower'] as const,
};

const AIRLINE_LOUNGES = [
  {
    name: 'Brussels Airlines Lounge',
    airline: 'Brussels Airlines · SN',
    color: '#003DA5',
    location: 'Terminal International — Porte B2',
    hours: 'Selon horaires des vols Brussels Airlines',
    access: [
      'Passagers Brussels Airlines Business Class',
      'Membres Eurobonus Gold & Platinum',
      'Membres Star Alliance Gold (sous réserve)',
    ],
    amenities: ['wifi', 'food', 'drinks', 'tv'] as const,
  },
  {
    name: 'Ethiopian Airlines Lounge',
    airline: 'Ethiopian Airlines · ET',
    color: '#1B4F72',
    location: 'Terminal International — Porte A5',
    hours: 'Selon horaires des vols Ethiopian',
    access: [
      'Passagers Ethiopian Airlines Business (Cloud Nine)',
      'Membres ShebaMiles Platinum & Gold',
      'Membres Star Alliance Gold',
    ],
    amenities: ['wifi', 'food', 'drinks'] as const,
  },
];

/* ─── Amenity chip ───────────────────────────────────────────────────── */
function AmenityChip({ id }: { id: keyof typeof AMENITIES }) {
  const { label, Icon, color } = AMENITIES[id];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold ${color}`}>
      <Icon size={11} /> {label}
    </span>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
function SalonsPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#14100A]">
        <img
          src="/images/fih-checkin-ethiopian.jpg"
          loading="eager"
          className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[#14100A]"
          style={{ clipPath: 'polygon(0 0, 60% 0, 74% 100%, 0 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />

        <div className="container relative z-10 py-14 md:py-20">
          <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link to={'/boutiques-restaurants' as never} className="hover:text-white transition-colors">
              {t('nav.shopsRestaurants')}
            </Link>
            <ChevronRight size={10} />
            <span className="text-white/70">{t('shops.lounges')}</span>
          </nav>
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className="inline-block h-4 w-5"
              style={{ background: '#C8A000', clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            />
            <span className="text-sm font-semibold tracking-wider text-white/70">Boutiques &amp; Restaurants</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">Salons VIP</h1>
          <p className="mt-3 max-w-sm text-white/60">
            Détendez-vous dans un espace confort exclusif avant votre vol depuis Kinshasa FIH.
          </p>

          {/* Access type chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { icon: Plane,      label: 'Business & First Class' },
              { icon: CreditCard, label: 'Priority Pass / Lounge Key' },
              { icon: Star,       label: 'Accès payant — 45 USD' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Icon size={11} className="text-[#C8A000]" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">

        {/* ── Pearl Lounge (featured) ──────────────────────────── */}
        <div className="mb-4 flex items-center gap-3">
          <div className="accent-line" />
          <p className="eyebrow text-rdc-blue">Salon officiel FIH</p>
        </div>

        <div className="mb-14 overflow-hidden shadow-xl">
          {/* Header */}
          <div
            className="relative flex min-h-[160px] items-end p-6 md:p-8"
            style={{ background: 'linear-gradient(135deg,#14100A 0%,#2A1E00 60%,#3D2C00 100%)' }}
          >
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFCE00 0, #FFCE00 1px, transparent 0, transparent 40%)', backgroundSize: '28px 28px' }}
            />
            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between w-full">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Crown size={16} className="text-[#FFCE00]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00]">
                    Salon Premium
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  {FEATURED_LOUNGE.name}
                </h2>
                <p className="mt-1 text-sm text-white/60">{FEATURED_LOUNGE.operator}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {FEATURED_LOUNGE.amenities.map((id) => (
                  <AmenityChip key={id} id={id} />
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-0 bg-white md:grid-cols-2">
            {/* Left — description + access */}
            <div className="border-b border-[#F0F0F0] p-6 md:border-b-0 md:border-r">
              <p className="mb-5 text-sm leading-relaxed text-[#444]">
                {FEATURED_LOUNGE.description}
              </p>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#999]">
                Conditions d'accès
              </p>
              <ul className="space-y-2.5">
                {FEATURED_LOUNGE.access.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-rdc-green" />
                    <span className="text-[#333]">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — details */}
            <div className="flex flex-col justify-between p-6">
              <div className="space-y-3 text-sm text-[#555]">
                <p className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                  {FEATURED_LOUNGE.location}
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock size={14} className="flex-shrink-0 text-rdc-blue" />
                  {FEATURED_LOUNGE.hours}
                </p>
                <a href={`tel:${FEATURED_LOUNGE.phone}`}
                  className="flex items-center gap-2.5 text-rdc-blue hover:underline">
                  <Phone size={14} className="flex-shrink-0" />
                  {FEATURED_LOUNGE.phone}
                </a>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-[#F0F0F0] pt-4">
                <span className="text-xs text-[#888]">Capacité : {FEATURED_LOUNGE.capacity}</span>
                <Link
                  to={'/boutiques-restaurants/repertoire/pearl-lounge' as never}
                  className="flex items-center gap-1.5 bg-rdc-blue px-4 py-2 text-xs font-bold text-white hover:bg-rdc-blue/90 transition-colors"
                >
                  {t('common.learnMore')} <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Airline lounges ──────────────────────────────────── */}
        <div className="mb-3 flex items-center gap-3">
          <div className="accent-line" />
          <p className="eyebrow text-rdc-blue">Salons des compagnies</p>
        </div>
        <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">
          Salons dédiés aux passagers
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {AIRLINE_LOUNGES.map((lounge) => (
            <div key={lounge.name} className="overflow-hidden border border-[#E8E8E8] bg-white shadow-sm">
              {/* Airline header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ backgroundColor: lounge.color }}
              >
                <div>
                  <p className="font-display font-bold text-white">{lounge.name}</p>
                  <p className="text-xs text-white/70 mt-0.5">{lounge.airline}</p>
                </div>
                <Crown size={20} className="text-white/40" />
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Amenities */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {lounge.amenities.map((id) => (
                    <AmenityChip key={id} id={id} />
                  ))}
                </div>

                {/* Access */}
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#999]">
                  Conditions d'accès
                </p>
                <ul className="mb-4 space-y-1.5">
                  {lounge.access.map((a) => (
                    <li key={a} className="flex items-start gap-1.5 text-xs text-[#555]">
                      <CheckCircle size={10} className="mt-0.5 flex-shrink-0 text-rdc-green" />
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Location + Hours */}
                <div className="space-y-1.5 border-t border-[#F0F0F0] pt-4 text-xs text-[#777]">
                  <p className="flex items-start gap-1.5">
                    <MapPin size={11} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                    {lounge.location}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock size={11} className="flex-shrink-0 text-rdc-blue" />
                    {lounge.hours}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Note ─────────────────────────────────────────────── */}
        <div className="mt-10 flex items-start gap-3 border border-[#003DA5]/20 bg-[#003DA5]/5 p-5 text-sm text-[#003DA5]/80">
          <Crown size={15} className="mt-0.5 flex-shrink-0" />
          <p>
            Les conditions d'accès et horaires peuvent varier selon les vols et saisons.
            Renseignez-vous auprès de votre compagnie aérienne ou à l'accueil FIH.
          </p>
        </div>
      </div>
    </main>
  );
}
