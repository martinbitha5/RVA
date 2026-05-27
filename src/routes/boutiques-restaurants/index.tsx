import { createFileRoute, Link } from '@tanstack/react-router';
import {
  UtensilsCrossed, ShoppingBag, Coffee, ArrowRightLeft,
  Package, Crown, ArrowRight, Search, MapPin,
} from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/')({
  component: BoutiquesRestaurantsHub,
  head: () => ({
    meta: [
      { title: "Boutiques & Restaurants — Aéroport N'djili · FIH" },
      { name: 'description', content: "Découvrez les boutiques, restaurants, bars et services dans les terminaux de l'Aéroport International de N'djili (FIH)." },
    ],
  }),
});

const FEATURED = [
  {
    href: '/boutiques-restaurants/restaurants',
    icon: UtensilsCrossed,
    label: 'Restaurants',
    desc: 'Cuisine congolaise authentique, fast-food, snacks et gastronomie internationale.',
    count: '8 établissements',
    gradient: 'linear-gradient(135deg, #009A44 0%, #005A28 100%)',
  },
  {
    href: '/boutiques-restaurants/hors-taxes',
    icon: Package,
    label: 'Hors-Taxes',
    desc: 'Alcools, parfums, tabacs et électronique en zone franche après sécurité.',
    count: '3 boutiques',
    gradient: 'linear-gradient(135deg, #6B21A8 0%, #3B0764 100%)',
  },
  {
    href: '/boutiques-restaurants/salons',
    icon: Crown,
    label: 'Salons VIP',
    desc: 'Pearl Lounge, Brussels Airlines Lounge, Ethiopian Lounge — détente avant le vol.',
    count: '3 salons',
    gradient: 'linear-gradient(135deg, #003DA5 0%, #001E6E 100%)',
  },
] as const;

const CATEGORIES = [
  {
    href: '/boutiques-restaurants/boutiques',
    icon: ShoppingBag,
    label: 'Boutiques',
    desc: 'Artisanat congolais, tissus wax, souvenirs, presse et cadeaux.',
    accent: '#FFCE00',
  },
  {
    href: '/boutiques-restaurants/bars-cafes',
    icon: Coffee,
    label: 'Bars & Cafés',
    desc: 'Café arabica du Kivu, bières Primus & Skol, cocktails et viennoiseries.',
    accent: '#C2702F',
  },
  {
    href: '/boutiques-restaurants/echange-devises',
    icon: ArrowRightLeft,
    label: 'Échange de devises',
    desc: 'Bureaux de change agréés, ATM Rawbank, Equity BCDC — USD & CDF.',
    accent: '#009A44',
  },
] as const;

function BoutiquesRestaurantsHub() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Terminaux de l'Aéroport International de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Aéroport FIH</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Boutiques & Restaurants</h1>
          <p className="mt-2 text-sm text-white/70 max-w-lg">
            Vivez une expérience de shopping et de restauration unique au cœur de Kinshasa — artisanat congolais, cuisine locale et services premium.
          </p>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Services en escale
          </span>
        </div>
      </div>

      {/* Recherche rapide */}
      <div className="bg-[#003DA5] py-4">
        <div className="mx-auto max-w-5xl px-5">
          <Link
            to={'/boutiques-restaurants/repertoire' as never}
            className="flex items-center gap-3 bg-white/15 hover:bg-white/20 transition-colors px-4 py-3 text-white"
          >
            <Search size={16} className="text-[#FFCE00]" />
            <span className="text-sm">Rechercher un commerce, un restaurant…</span>
            <ArrowRight size={14} className="ml-auto" />
          </Link>
        </div>
      </div>

      {/* Espaces phares */}
      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">À la une</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Nos espaces phares</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {FEATURED.map((f) => (
              <Link
                key={f.href}
                to={f.href as never}
                className="group relative overflow-hidden flex flex-col"
                style={{ background: f.gradient }}
              >
                <div className="p-6 flex flex-col gap-4 min-h-[200px] justify-between">
                  <div className="flex h-11 w-11 items-center justify-center bg-white/15 border border-white/20">
                    <f.icon size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="inline-block bg-white/15 border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-3">
                      {f.count}
                    </span>
                    <h3 className="font-bold text-white text-lg group-hover:text-[#FFCE00] transition-colors">
                      {f.label}
                    </h3>
                    <p className="mt-1.5 text-xs text-white/60 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-black/25 text-[11px] font-bold text-white/60 group-hover:text-white transition-colors border-t border-white/10">
                  En savoir plus <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Autres catégories */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Autres services</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Plus de services disponibles</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.href}
                to={c.href as never}
                className="group border border-[#e8e8e8] bg-white p-5 flex items-start gap-4 hover:border-[#003DA5]/30 hover:shadow-sm transition-all"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center"
                  style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}40` }}
                >
                  <c.icon size={20} style={{ color: c.accent }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1a1a1a] text-sm group-hover:text-[#003DA5] transition-colors">{c.label}</h3>
                  <p className="mt-1 text-xs text-[#666] leading-relaxed">{c.desc}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] font-bold text-[#999] group-hover:text-[#003DA5] transition-colors">
                    Voir <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Devises */}
        <section className="bg-[#003DA5]">
          <div className="px-6 py-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Information</p>
            <h2 className="text-xl font-bold text-white mb-6">Devises acceptées à FIH</h2>
            <div className="grid grid-cols-3 gap-px bg-white/20">
              {[
                { currency: 'USD', name: 'Dollar américain', note: 'Devise principale en RDC' },
                { currency: 'CDF', name: 'Franc congolais', note: 'Devise officielle nationale' },
                { currency: 'EUR', name: 'Euro', note: 'Accepté dans la plupart des boutiques' },
              ].map((c) => (
                <div key={c.currency} className="bg-[#003DA5] px-5 py-6 text-center">
                  <p className="text-3xl font-bold text-white">{c.currency}</p>
                  <p className="mt-1 text-xs font-semibold text-white/80">{c.name}</p>
                  <p className="mt-0.5 text-[10px] text-white/50">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/50 text-center">
              Bureaux de change agréés disponibles aux terminaux International et Domestique —{' '}
              <Link to={'/boutiques-restaurants/echange-devises' as never} className="text-[#FFCE00] hover:underline font-semibold">
                Voir les horaires
              </Link>
            </p>
          </div>
        </section>

        {/* Localisation */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Plan des terminaux</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Où trouver nos commerces ?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                terminal: 'Terminal International',
                zones: ['Hall Arrivées — Niveau 0 : Change, ATM, Cafés', 'Hall Départs — Niveau 1 : Boutiques, Restaurants', 'Zone Embarquement — après sécurité : Duty Free, Salons VIP'],
              },
              {
                terminal: 'Terminal Domestique',
                zones: ['Hall Unique : Cafés, Snacks', 'Salle d\'attente : Kiosques presse', 'Accueil : Change mobile'],
              },
            ].map((t) => (
              <div key={t.terminal} className="border border-[#e8e8e8] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-[#003DA5]" />
                  <h3 className="font-bold text-sm text-[#1a1a1a]">{t.terminal}</h3>
                </div>
                <ul className="space-y-2">
                  {t.zones.map((z) => (
                    <li key={z} className="text-xs text-[#555] flex items-start gap-2">
                      <span className="text-[#003DA5] font-bold mt-0.5">—</span>
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
