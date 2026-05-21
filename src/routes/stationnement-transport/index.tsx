import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Car, Bus, Truck, Bike, MapPin,
  AlertTriangle, ArrowRight, CreditCard,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/stationnement-transport/')({
  component: StationnementHub,
  head: () => ({
    meta: [{ title: "Stationnement & Transport — Aéroport N'djili · FIH" }],
  }),
});

const PARKING = [
  { code: 'P1', name: 'Parking Court Séjour', rate: '$2/h', spots: 320 },
  { code: 'P2', name: 'Parking Long Séjour', rate: '$15/jour', spots: 480 },
  { code: 'P3', name: 'Parking PMR', rate: 'Gratuit', spots: 24 },
] as const;

const TRANSPORT = [
  {
    icon: Car,
    href: '/stationnement-transport/taxis',
    label: 'Taxis officiels agréés',
    desc: 'Taxis RVA agréés — tarifés, sécurisés, disponibles 24h/24 à la sortie des arrivées.',
    accent: '#FFCE00',
  },
  {
    icon: Bus,
    href: '/stationnement-transport/transcom-bus',
    label: 'Bus Transco / Esprit de Vie',
    desc: 'Lignes directes depuis le centre-ville de Kinshasa — Gombe, Commune de la N\'sele.',
    accent: '#003DA5',
  },
  {
    icon: Truck,
    href: '/stationnement-transport/navettes',
    label: 'Navettes hôtels',
    desc: 'Navettes gratuites ou payantes proposées par les principaux hôtels de Kinshasa.',
    accent: '#009A44',
  },
  {
    icon: Car,
    href: '/stationnement-transport/location-voitures',
    label: 'Location de voitures',
    desc: 'Avis, Europcar, Hertz et agences locales disponibles au niveau des arrivées.',
    accent: '#CE1126',
  },
  {
    icon: Car,
    href: '/stationnement-transport/limousines',
    label: 'Limousines premium',
    desc: 'Services VIP avec chauffeur — transferts discrets pour passagers premium.',
    accent: '#1A1A1A',
  },
  {
    icon: Bike,
    href: '/stationnement-transport/mobilite-reduite',
    label: 'Mobilité réduite',
    desc: 'Assistance fauteuil roulant, places PMR prioritaires et accès facilité aux terminaux.',
    accent: '#003DA5',
  },
] as const;

function StationnementHub() {
  return (
    <>
      <PageHero
        eyebrow="Stationnement & Transport"
        title="Arriver & Repartir facilement"
        subtitle="Stationnement officiel RVA, taxis agréés, navettes et accès via le Boulevard Lumumba — tout pour votre mobilité depuis et vers FIH."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Stationnement & Transport' }]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/stationnement-transport/offres' as never} className="btn-primary">
              <CreditCard size={15} /> Voir les tarifs
            </Link>
            <Link to={'/stationnement-transport/depose-recuperation' as never} className="btn-outline-white">
              <MapPin size={15} /> Dépose & Récupération
            </Link>
          </div>
        }
      />

      {/* Works alert banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container py-4">
          <Link
            to={'/stationnement-transport/travaux' as never}
            className="flex items-center gap-3 group"
          >
            <AlertTriangle size={16} className="text-amber-600 shrink-0" />
            <p className="text-sm font-semibold text-amber-800 flex-1">
              Travaux en cours — Perturbations possibles sur certaines voies d'accès au P2
            </p>
            <ArrowRight size={14} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Parking availability */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Stationnement FIH</p>
          </div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="display-sub text-rdc-anthracite">Nos parkings officiels</h2>
            <Link
              to={'/stationnement-transport/stationnement-fih' as never}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-rdc-anthracite hover:text-rdc-blue transition-colors group"
            >
              Tout savoir
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-0.5 bg-border sm:grid-cols-3">
            {PARKING.map((p) => (
              <Link
                key={p.code}
                to={'/stationnement-transport/stationnement-fih' as never}
                className="group bg-white px-8 py-10 flex flex-col gap-4 hover:bg-rdc-blue/3 transition-colors relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-rdc-blue transition-all duration-500" />
                <span className="font-display text-5xl font-bold text-rdc-blue/20 leading-none">
                  {p.code}
                </span>
                <div>
                  <h3 className="font-display font-bold text-rdc-anthracite text-lg group-hover:text-rdc-blue transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.spots} places disponibles</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-display font-bold text-rdc-blue">{p.rate}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Disponible
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transport options */}
      <section className="section-night py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Options de transport</p>
          </div>
          <h2 className="display-sub text-white mb-12">
            Comment rejoindre Kinshasa
          </h2>

          <div className="grid gap-0.5 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
            {TRANSPORT.map((s) => (
              <Link
                key={s.href}
                to={s.href as never}
                className="group relative bg-rdc-anthracite p-8 flex flex-col gap-5 overflow-hidden hover:bg-white/5 transition-colors"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: s.accent }}
                />

                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}
                >
                  <s.icon size={22} style={{ color: s.accent }} strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-white text-lg leading-snug group-hover:text-rdc-yellow transition-colors">
                    {s.label}
                  </h3>
                  <p className="mt-2 text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-white/30 group-hover:text-white transition-colors">
                  En savoir plus
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Boulevard Lumumba CTA */}
      <section className="section-blue py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-yellow">Accès principal</p>
              </div>
              <h2 className="font-display font-bold text-white text-2xl lg:text-3xl">
                Boulevard Lumumba
              </h2>
              <p className="mt-3 text-white/60 text-sm max-w-lg">
                Route principale d'accès depuis le centre-ville de Kinshasa (Gombe).
                Comptez 45–90 min selon la circulation. Consultez les informations
                en temps réel avant de partir.
              </p>
            </div>
            <Link
              to={'/stationnement-transport/boulevard-lumumba' as never}
              className="btn-outline-white shrink-0"
            >
              <MapPin size={15} /> Infos d'accès <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
