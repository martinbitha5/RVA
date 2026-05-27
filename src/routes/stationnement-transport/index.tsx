import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Car, Bus, MapPin, AlertTriangle, ArrowRight,
  CreditCard, Accessibility, Navigation, Wrench, Clock,
} from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/')({
  component: StationnementHub,
  head: () => ({
    meta: [{ title: "Stationnement & Transport — Aéroport N'djili · FIH" }],
  }),
});

const PARKINGS = [
  { code: 'P1', nom: 'Court Séjour', tarif: '2 $/h', spots: 320, distance: '200 m', navette: false },
  { code: 'P2', nom: 'Long Séjour', tarif: '10 $/j', spots: 480, distance: '600 m', navette: true },
  { code: 'P3', nom: 'Parking PMR', tarif: 'Gratuit', spots: 24, distance: '100 m', navette: false },
] as const;

const TRANSPORT_CARDS = [
  {
    href: '/stationnement-transport/taxis',
    icon: Car,
    label: 'Taxis officiels',
    desc: 'Taxis agréés RVA — tarifs réglementés, reçus garantis. Évitez les taxis informels.',
    accent: '#FFCE00',
    tag: 'Recommandé',
  },
  {
    href: '/stationnement-transport/transcom-bus',
    icon: Bus,
    label: 'Bus Transco',
    desc: 'Lignes régulières Transco / Esprit de Vie vers le centre de Kinshasa (Gombe, Limete).',
    accent: '#003DA5',
    tag: null,
  },
  {
    href: '/stationnement-transport/location-voitures',
    icon: Car,
    label: 'Location de voitures',
    desc: 'Avis, Europcar, Loxea — véhicules disponibles à la sortie des arrivées.',
    accent: '#CE1126',
    tag: null,
  },
  {
    href: '/stationnement-transport/mobilite-reduite',
    icon: Accessibility,
    label: 'Mobilité réduite',
    desc: 'Assistance PMR, fauteuils roulants, places réservées et accès adaptés.',
    accent: '#009A44',
    tag: null,
  },
  {
    href: '/stationnement-transport/depose-recuperation',
    icon: MapPin,
    label: 'Dépose & Récupération',
    desc: 'Zone dépose-minute (gratuit, 15 min max) et zone récupération côté arrivées.',
    accent: '#003DA5',
    tag: null,
  },
  {
    href: '/stationnement-transport/boulevard-lumumba',
    icon: Navigation,
    label: 'Boulevard Lumumba',
    desc: 'L\'unique axe routier FIH ↔ Kinshasa — conseils, trafic et alternatives.',
    accent: '#CE1126',
    tag: 'Axe principal',
  },
] as const;

function StationnementHub() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Stationnement et transport à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Aéroport FIH</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Stationnement & Transport</h1>
          <p className="mt-2 text-sm text-white/70 max-w-lg">
            Tout ce qu'il faut savoir pour accéder à FIH, garer votre véhicule et rejoindre le cœur de Kinshasa.
          </p>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Parkings officiels RVA
          </span>
        </div>
      </div>

      {/* Alerte travaux */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="mx-auto max-w-5xl px-5">
          <Link
            to={'/stationnement-transport/travaux' as never}
            className="flex items-center gap-3 py-4 group"
          >
            <AlertTriangle size={16} className="text-amber-600 shrink-0" />
            <p className="text-sm font-semibold text-amber-800 flex-1">
              Travaux en cours — Rénovation aile Est Terminal International (mars–août 2026)
            </p>
            <ArrowRight size={14} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Parkings disponibles */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Stationnement</p>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Nos parkings officiels</h2>
            <Link to={'/stationnement-transport/offres' as never} className="flex items-center gap-1.5 text-[11px] font-bold text-[#003DA5] hover:underline">
              Tarifs & Offres <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {PARKINGS.map((p) => (
              <Link
                key={p.code}
                to={'/stationnement-transport/stationnement-fih' as never}
                className="group border border-[#e8e8e8] bg-white p-6 flex flex-col gap-3 hover:border-[#003DA5]/40 hover:shadow-sm transition-all relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#003DA5] transition-all duration-500" />
                <span className="text-5xl font-bold text-[#003DA5]/15 leading-none">{p.code}</span>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] text-lg group-hover:text-[#003DA5] transition-colors">{p.nom}</h3>
                  <p className="text-sm text-[#888] mt-0.5">{p.spots} places · {p.distance} du terminal</p>
                  {p.navette && <p className="text-xs text-[#009A44] font-semibold mt-1">Navette gratuite disponible</p>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#003DA5]">{p.tarif}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#999]">Disponible</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <Link to={'/stationnement-transport/formulaire' as never} className="inline-flex items-center gap-2 bg-[#003DA5] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#002a7a] transition-colors">
              <CreditCard size={14} /> Réserver un parking
            </Link>
            <Link to={'/stationnement-transport/offres' as never} className="inline-flex items-center gap-2 border border-[#003DA5] px-5 py-2.5 text-sm font-bold text-[#003DA5] hover:bg-[#003DA5]/5 transition-colors">
              Voir les offres
            </Link>
          </div>
        </section>

        {/* Options de transport */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Options de transport</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Comment rejoindre Kinshasa</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRANSPORT_CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.href}
                  to={c.href as never}
                  className="group border border-[#e8e8e8] bg-white p-5 flex flex-col gap-3 hover:border-[#003DA5]/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center" style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}40` }}>
                      <Icon size={18} style={{ color: c.accent }} strokeWidth={1.5} />
                    </div>
                    {c.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5" style={{ background: `${c.accent}20`, color: c.accent }}>
                        {c.tag}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] text-sm group-hover:text-[#003DA5] transition-colors">{c.label}</h3>
                    <p className="text-xs text-[#666] leading-relaxed mt-1">{c.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-auto text-[11px] font-bold text-[#999] group-hover:text-[#003DA5] transition-colors">
                    En savoir plus <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Boulevard Lumumba CTA */}
        <section className="bg-[#003DA5] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Accès principal</p>
              <h2 className="text-2xl font-bold text-white">Boulevard Lumumba — Axe FIH ↔ Kinshasa</h2>
              <p className="mt-2 text-sm text-white/70 max-w-lg">
                Le Boulevard Lumumba est la seule route reliant l'aéroport au centre-ville (18–22 km, 25–60 min selon trafic).
                Informez-vous sur les conditions de circulation avant de partir.
              </p>
            </div>
            <Link
              to={'/stationnement-transport/boulevard-lumumba' as never}
              className="shrink-0 inline-flex items-center gap-2 bg-[#FFCE00] px-5 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#e6b800] transition-colors"
            >
              <Navigation size={14} /> Informations trafic <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Travaux */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wrench size={18} className="text-[#1a1a1a]" />
            <p className="font-bold text-[#1a1a1a]">Avis de travaux et perturbations</p>
          </div>
          <div className="space-y-3">
            {[
              { zone: 'T1 — Aile Est, Portes A5–A8', periode: 'Mars–Août 2026', impact: 'Portes A5–A8 fermées. Report vers A1–A4.', statut: 'En cours', couleur: 'text-orange-600 bg-orange-50' },
              { zone: 'Boulevard Lumumba km 7–10', periode: 'Juin–Juillet 2026', impact: 'Circulation alternée nuits 22h–5h.', statut: 'Planifié', couleur: 'text-[#003DA5] bg-blue-50' },
            ].map((t) => (
              <div key={t.zone} className="flex items-start gap-4 p-4 bg-[#f7f7f7]">
                <Clock size={14} className="text-[#888] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#1a1a1a]">{t.zone}</p>
                  <p className="text-xs text-[#888] mt-0.5">{t.periode} — {t.impact}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 ${t.couleur}`}>{t.statut}</span>
              </div>
            ))}
          </div>
          <Link to={'/stationnement-transport/travaux' as never} className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#003DA5] hover:underline">
            Voir tous les travaux <ArrowRight size={11} />
          </Link>
        </section>

      </div>
    </main>
  );
}
