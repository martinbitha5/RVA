import { createFileRoute } from '@tanstack/react-router';
import {
  Crown, Wifi, Coffee, UtensilsCrossed, Tv, Droplets,
  CheckCircle, MapPin, Clock, Phone, CreditCard, Plane, Star, Armchair,
} from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/salons')({
  component: SalonsPage,
  head: () => ({
    meta: [
      { title: "Salons VIP — Aéroport N'djili · FIH" },
      { name: 'description', content: "Salons VIP à l'Aéroport International de N'djili FIH : Pearl Lounge, Brussels Airlines Lounge, Ethiopian Cloud Nine Lounge." },
    ],
  }),
});

const AMENITES: Record<string, { label: string; Icon: React.ElementType; couleur: string }> = {
  wifi:    { label: 'Wi-Fi haut débit', Icon: Wifi,            couleur: 'text-blue-600'   },
  food:    { label: 'Restauration',     Icon: UtensilsCrossed, couleur: 'text-green-700'  },
  drinks:  { label: 'Bar ouvert',       Icon: Coffee,          couleur: 'text-amber-700'  },
  tv:      { label: 'TV & Presse',      Icon: Tv,              couleur: 'text-slate-600'  },
  shower:  { label: 'Douches',          Icon: Droplets,        couleur: 'text-cyan-600'   },
  lounge:  { label: 'Espace repos',     Icon: Armchair,        couleur: 'text-indigo-600' },
};

const PEARL_LOUNGE = {
  nom: 'Pearl Lounge FIH',
  operateur: 'RVA — Régie des Voies Aériennes',
  localisation: 'Terminal International — Niveau 2, après contrôle passeports',
  horaires: '05 h 00 – 23 h 00, tous les jours',
  telephone: '+243 81 XXX XXXX',
  capacite: '80 places',
  description: `Le salon premium officiel de l'Aéroport de N'djili, géré directement par la Régie des Voies Aériennes.
  Cuisine congolaise gastronomique du chef, bar premium avec bières Primus et Skol pression, spiritueux sélectionnés,
  Wi-Fi haut débit fibre, douches privées individuelles, espace repos avec fauteuils inclinables, coin affaires
  avec prises et espace calme pour travailler avant votre vol.`,
  acces: [
    'Passagers First Class & Business Class — toutes compagnies aériennes',
    'Détenteurs carte Priority Pass, Lounge Key ou DragonPass',
    'Membres Programme Fidélité FIH — niveaux Gold & Platinum',
    'Accès payant sur place : 45 USD par personne (2h)',
    'Accompagnant d\'un passager éligible : 30 USD par personne',
  ],
  amenites: ['wifi', 'food', 'drinks', 'tv', 'shower', 'lounge'] as const,
};

const SALONS_COMPAGNIES = [
  {
    nom: 'Brussels Airlines Lounge',
    compagnie: 'Brussels Airlines · SN',
    couleur: '#003DA5',
    localisation: 'Terminal International — Porte B2, après sécurité',
    horaires: 'Selon horaires vols Brussels Airlines (généralement 15 h – 23 h)',
    description: 'Salon confortable opéré par Brussels Airlines pour ses passagers Business et membres du programme de fidélité. Snacks européens et congolais, bar, Wi-Fi.',
    acces: [
      'Passagers Brussels Airlines Business Class',
      'Membres Eurobusiness Gold & Platinum',
      'Membres Star Alliance Gold (sous réserve disponibilité)',
    ],
    amenites: ['wifi', 'food', 'drinks', 'tv'] as const,
  },
  {
    nom: 'Ethiopian Cloud Nine Lounge',
    compagnie: 'Ethiopian Airlines · ET',
    couleur: '#1B4F72',
    localisation: 'Terminal International — Porte A5, après contrôle passeports',
    horaires: 'Selon horaires vols Ethiopian (généralement 06 h – 12 h et 18 h – 22 h)',
    description: 'Salon premium d\'Ethiopian Airlines, l\'une des meilleures compagnies africaines. Buffet chaud éthiopien et international, bar, Wi-Fi rapide. Décoration inspirée de l\'Afrique orientale.',
    acces: [
      'Passagers Ethiopian Airlines Business Class (Cloud Nine)',
      'Membres ShebaMiles Platinum & Gold',
      'Membres Star Alliance Gold',
    ],
    amenites: ['wifi', 'food', 'drinks'] as const,
  },
];

function AmeniteChip({ id }: { id: keyof typeof AMENITES }) {
  const { label, Icon, couleur } = AMENITES[id];
  return (
    <span className={`inline-flex items-center gap-1.5 bg-[#f5f5f5] px-2.5 py-1 text-[11px] font-semibold ${couleur}`}>
      <Icon size={11} /> {label}
    </span>
  );
}

function SalonsPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Salons VIP à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Boutiques & Restaurants</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Salons VIP à FIH</h1>
          <p className="mt-2 text-sm text-white/70 max-w-lg">
            Profitez d'un espace confort exclusif avant votre vol international depuis Kinshasa.
          </p>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#FFCE00] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a1a1a]">
            3 salons disponibles
          </span>
        </div>
      </div>

      {/* Modes d'accès rapides */}
      <div className="bg-[#1a1a1a] py-4">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { icon: Plane,      label: 'Business & First Class' },
              { icon: CreditCard, label: 'Priority Pass / Lounge Key / DragonPass' },
              { icon: Star,       label: 'Fidélité FIH Gold & Platinum' },
              { icon: Crown,      label: 'Accès payant — 45 USD' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                <Icon size={11} className="text-[#FFCE00]" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Pearl Lounge — salon officiel */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Salon officiel FIH</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Pearl Lounge FIH</h2>

          <div className="border border-[#e8e8e8] overflow-hidden">
            {/* Header salon */}
            <div
              className="relative px-6 py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
              style={{ background: 'linear-gradient(135deg, #14100A 0%, #2A1E00 60%, #3D2C00 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFCE00 0, #FFCE00 1px, transparent 0, transparent 40%)', backgroundSize: '28px 28px' }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={14} className="text-[#FFCE00]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00]">Salon Premium Officiel</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{PEARL_LOUNGE.nom}</h3>
                <p className="text-sm text-white/60 mt-0.5">{PEARL_LOUNGE.operateur}</p>
              </div>
              <div className="relative flex flex-wrap gap-1.5">
                {PEARL_LOUNGE.amenites.map((id) => (
                  <AmeniteChip key={id} id={id} />
                ))}
              </div>
            </div>

            {/* Contenu */}
            <div className="grid sm:grid-cols-2 bg-white">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#f0f0f0]">
                <p className="text-sm text-[#555] leading-relaxed mb-5">{PEARL_LOUNGE.description}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#999] mb-3">Conditions d'accès</p>
                <ul className="space-y-2.5">
                  {PEARL_LOUNGE.acces.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-[#009A44]" />
                      <span className="text-[#333]">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div className="space-y-3 text-sm text-[#555]">
                  <p className="flex items-start gap-2.5">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#003DA5]" />
                    {PEARL_LOUNGE.localisation}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock size={14} className="flex-shrink-0 text-[#003DA5]" />
                    {PEARL_LOUNGE.horaires}
                  </p>
                  <a href={`tel:${PEARL_LOUNGE.telephone}`} className="flex items-center gap-2.5 text-[#003DA5] hover:underline">
                    <Phone size={14} className="flex-shrink-0" />
                    {PEARL_LOUNGE.telephone}
                  </a>
                </div>
                <div className="mt-6 border-t border-[#f0f0f0] pt-4">
                  <p className="text-xs text-[#888] mb-1">Capacité : {PEARL_LOUNGE.capacite}</p>
                  <div className="bg-[#FFCE00] inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1a1a1a]">
                    <Crown size={12} /> Accès payant : 45 USD / personne
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Salons des compagnies */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Salons des compagnies</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Salons dédiés aux passagers</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {SALONS_COMPAGNIES.map((salon) => (
              <div key={salon.nom} className="border border-[#e8e8e8] overflow-hidden bg-white">
                <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: salon.couleur }}>
                  <div>
                    <p className="font-bold text-white">{salon.nom}</p>
                    <p className="text-xs text-white/70 mt-0.5">{salon.compagnie}</p>
                  </div>
                  <Crown size={18} className="text-white/40" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#666] leading-relaxed mb-4">{salon.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {salon.amenites.map((id) => (
                      <AmeniteChip key={id} id={id} />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#999] mb-2">Conditions d'accès</p>
                  <ul className="mb-4 space-y-1.5">
                    {salon.acces.map((a) => (
                      <li key={a} className="flex items-start gap-1.5 text-xs text-[#555]">
                        <CheckCircle size={10} className="mt-0.5 flex-shrink-0 text-[#009A44]" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#f0f0f0] pt-4 space-y-1.5 text-xs text-[#777]">
                    <p className="flex items-start gap-1.5">
                      <MapPin size={11} className="mt-0.5 flex-shrink-0 text-[#003DA5]" />
                      {salon.localisation}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock size={11} className="flex-shrink-0 text-[#003DA5]" />
                      {salon.horaires}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note générale */}
        <div className="flex items-start gap-4 border border-[#003DA5]/20 bg-[#003DA5]/5 p-5">
          <Crown size={15} className="text-[#003DA5] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#003DA5]/80 leading-relaxed">
            Les conditions d'accès, horaires et disponibilités peuvent varier selon les vols, saisons et politiques des compagnies.
            Renseignez-vous auprès de votre compagnie aérienne ou à l'accueil FIH avant de vous rendre au salon.
            Les mineurs de moins de 12 ans accèdent gratuitement lorsqu'accompagnés d'un passager éligible.
          </p>
        </div>

      </div>
    </main>
  );
}
