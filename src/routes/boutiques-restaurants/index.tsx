import { createFileRoute, Link } from '@tanstack/react-router';
import {
  UtensilsCrossed, ShoppingBag, Coffee, ArrowRightLeft,
  Package, Crown, ArrowRight, Search,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

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
    desc: 'Cuisine congolaise, plats internationaux et fast-food dans les deux terminaux.',
    gradient: 'linear-gradient(135deg, #009A44 0%, #005A28 100%)',
    count: '8 établissements',
  },
  {
    href: '/boutiques-restaurants/hors-taxes',
    icon: Package,
    label: 'Duty Free',
    desc: 'Parfums, alcools, tabac et souvenirs hors-taxes avant votre embarquement.',
    gradient: 'linear-gradient(135deg, #6B21A8 0%, #3B0764 100%)',
    count: '3 boutiques',
  },
  {
    href: '/boutiques-restaurants/salons',
    icon: Crown,
    label: 'Salons VIP',
    desc: 'Pearl Lounge, Brussels Airlines Lounge — un confort exclusif avant votre vol.',
    gradient: 'linear-gradient(135deg, #003DA5 0%, #001E6E 100%)',
    count: '2 salons',
  },
] as const;

const CATEGORIES = [
  {
    href: '/boutiques-restaurants/boutiques',
    icon: ShoppingBag,
    label: 'Boutiques',
    desc: 'Artisanat congolais, presse, souvenirs et produits locaux.',
    accent: '#FFCE00',
  },
  {
    href: '/boutiques-restaurants/bars-cafes',
    icon: Coffee,
    label: 'Bars & Cafés',
    desc: 'Café, boissons chaudes et cocktails dans une atmosphère détendue.',
    accent: '#C2702F',
  },
  {
    href: '/boutiques-restaurants/echange-devises',
    icon: ArrowRightLeft,
    label: 'Change de devises',
    desc: 'USD, CDF, EUR et autres devises — bureaux de change agréés.',
    accent: '#009A44',
  },
] as const;

function BoutiquesRestaurantsHub() {
  return (
    <>
      <PageHero
        eyebrow="Boutiques & Restaurants"
        title="Vivez l'aéroport autrement"
        subtitle="Restaurants, boutiques hors-taxes, salons VIP et bureaux de change — tout le confort de FIH avant et après votre vol."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Boutiques & Restaurants' }]}
        cta={
          <Link to={'/boutiques-restaurants/repertoire' as never} className="btn-primary">
            <Search size={15} /> Répertoire complet
          </Link>
        }
      />

      {/* Featured dark cards */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">À la une</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-12">
            Nos espaces phares
          </h2>

          <div className="grid gap-0.5 bg-border sm:grid-cols-3">
            {FEATURED.map((f) => (
              <Link
                key={f.href}
                to={f.href as never}
                className="group relative overflow-hidden flex flex-col"
                style={{ background: f.gradient }}
              >
                <div className="aspect-[4/3] relative p-8 flex flex-col justify-between">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center bg-white/15 border border-white/20">
                    <f.icon size={22} className="text-white" strokeWidth={1.5} />
                  </div>

                  {/* Count tag */}
                  <div className="self-start bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                      {f.count}
                    </span>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-rdc-yellow w-8 h-8 flex items-center justify-center">
                      <ArrowRight size={14} className="text-rdc-anthracite" />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-black/20 backdrop-blur-sm border-t border-white/10">
                  <h3 className="font-display font-bold text-white text-xl group-hover:text-rdc-yellow transition-colors">
                    {f.label}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="section-night py-20">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Autres services</p>
          </div>
          <h2 className="display-sub text-white mb-10">
            Plus de services disponibles
          </h2>

          <div className="grid gap-0.5 bg-white/8 sm:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.href}
                to={c.href as never}
                className="group relative bg-rdc-anthracite p-8 flex items-start gap-5 overflow-hidden hover:bg-white/5 transition-colors"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: c.accent }}
                />
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center"
                  style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}30` }}
                >
                  <c.icon size={22} style={{ color: c.accent }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-white text-lg group-hover:text-rdc-yellow transition-colors">
                    {c.label}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/40 leading-relaxed">{c.desc}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs font-bold text-white/25 group-hover:text-white/60 transition-colors">
                    Découvrir <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Currency info strip */}
      <section className="section-blue py-14">
        <div className="container">
          <div className="grid gap-px bg-white/15 grid-cols-1 sm:grid-cols-3">
            {[
              { currency: 'USD', name: 'Dollar américain', note: 'Devise principale en RDC' },
              { currency: 'CDF', name: 'Franc congolais', note: 'Devise officielle nationale' },
              { currency: 'EUR', name: 'Euro', note: 'Accepté dans la plupart des boutiques' },
            ].map((c) => (
              <div key={c.currency} className="bg-rdc-blue/20 px-8 py-8 text-center">
                <p className="font-display text-4xl font-bold text-white">{c.currency}</p>
                <p className="mt-1 text-sm font-semibold text-white/80">{c.name}</p>
                <p className="mt-1 text-xs text-white/40">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/40">
            Bureaux de change agréés disponibles aux terminaux International et Domestique
            {' — '}
            <Link to={'/boutiques-restaurants/echange-devises' as never} className="text-rdc-yellow hover:underline font-semibold">
              Voir les horaires
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
