import { createFileRoute, Link } from '@tanstack/react-router';
import { Leaf, Droplets, Sun, TreePine, Bird, CheckCircle, TrendingDown, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/communaute/environnement-durabilite')({
  component: EnvironnementPage,
  head: () => ({
    meta: [
      { title: "Environnement & Durabilité — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Engagements environnementaux de l'Aéroport de N'djili (FIH) — Pool Malebo, fleuve Congo, biodiversité, énergie renouvelable, zéro déchet." },
    ],
  }),
});

const STATS = [
  { value: '-18%',    label: 'CO₂/passager depuis 2019', color: '#009A44' },
  { value: '500 kW',  label: 'Solaire installé',          color: '#FFCE00' },
  { value: '72%',     label: 'Déchets valorisés',          color: '#009A44' },
  { value: '10 000',  label: 'Arbres plantés 2024–26',     color: '#009A44' },
];

const GOALS = [
  {
    Icon: TrendingDown,
    label: '-30% CO₂',
    sub: "d'ici 2030",
    desc: "Réduction des émissions de CO₂ de 30% par rapport à 2019, via efficacité énergétique, transition électrique de la flotte de piste et compensation carbone.",
    borderColor: 'border-[#009A44]/30',
    bg: 'bg-[#009A44]/5',
    iconBg: 'bg-[#009A44]',
  },
  {
    Icon: Sun,
    label: '100% ENR',
    sub: 'objectif 2035',
    desc: 'Couverture intégrale des besoins énergétiques des terminaux par des énergies renouvelables — priorité au solaire photovoltaïque. 500 kW déjà installés sur le terminal domestique.',
    borderColor: 'border-[#FFCE00]/40',
    bg: 'bg-[#FFCE00]/5',
    iconBg: 'bg-[#FFCE00]',
  },
  {
    Icon: Droplets,
    label: 'Zéro rejet',
    sub: 'eaux usées brutes',
    desc: "Traitement intégral des eaux usées et pluviales avant tout rejet. Station d'épuration dédiée protégeant le bassin versant du fleuve Congo et du Pool Malebo.",
    borderColor: 'border-cyan-200',
    bg: 'bg-cyan-50',
    iconBg: 'bg-cyan-500',
  },
  {
    Icon: TreePine,
    label: '10 000 arbres',
    sub: 'programme 2024–2026',
    desc: 'Reboisement des terrains RVA et des communes riveraines (Nsele, Kimbanseke) avec des espèces endémiques du bassin congolais.',
    borderColor: 'border-emerald-200',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-600',
  },
] as const;

const HABITATS = [
  {
    name: 'Pool Malebo (Stanley Pool)',
    desc: "Zone humide d'importance internationale sur le fleuve Congo, entre Kinshasa et Brazzaville. FIH gère strictement ses eaux de ruissellement et ses hydrocarbures pour protéger ce bassin d'une biodiversité exceptionnelle. Rétention des eaux de dégivrage et des huiles de piste avant tout rejet.",
    Icon: Droplets,
    color: '#0891b2',
  },
  {
    name: 'Fleuve Congo',
    desc: "Deuxième plus grand fleuve d'Afrique par le débit (41 000 m³/s) et première réserve d'eau douce d'Afrique subsaharienne. FIH maintient un système de rétention des hydrocarbures, des eaux de piste et des effluents traités pour éviter toute contamination du fleuve.",
    Icon: Droplets,
    color: '#003DA5',
  },
  {
    name: 'Avifaune locale et péril aviaire',
    desc: "L'Afrique centrale abrite une avifaune exceptionnelle. FIH gère activement le péril aviaire : programme de surveillance espèces, végétation de piste contrôlée (hauteur max 20 cm), effaroucheurs acoustiques, radar de détection oiseaux et équipe dédiée AODB (Airport Operations & Bird management).",
    Icon: Bird,
    color: '#009A44',
  },
] as const;

const ACTIONS = [
  { text: "Collecte et traitement des eaux pluviales et usées (station d'épuration dédiée FIH)", done: true },
  { text: 'Tri des déchets à la source dans les terminaux — partenariat recycleurs agréés Kinshasa', done: true },
  { text: '500 kW solaires installés sur le toit du terminal domestique (livré 2023)', done: true },
  { text: 'Plan de gestion de la faune sauvage — conformité OACI Annexe 14 section 9.4', done: true },
  { text: 'Système de rétention hydrocarbures sur toutes les aires de stationnement aéronefs', done: true },
  { text: 'Réduction plastiques à usage unique dans les terminaux (objectif 2025)', done: false },
  { text: 'Flotte de véhicules de piste : transition vers motorisation électrique et hybride', done: false },
  { text: 'Audit énergétique bâtiments terminaux — isolation thermique renforcée en cours', done: false },
  { text: 'Certification ACA (Airport Carbon Accreditation) — niveau 1 en cours', done: false },
  { text: 'Programme reboisement 10 000 arbres — démarrage 2024, livraison 2026', done: false },
] as const;

const CERTIFICATIONS_ENV = [
  { name: 'OACI Annexe 14 — Gestion environnementale aérodromes', active: true },
  { name: 'ISO 14001 — Système de management environnemental (objectif 2026)', active: false },
  { name: 'ACA Level 1 — Airport Carbon Accreditation (dossier en cours)', active: false },
  { name: "RSYB — Réseau de surveillance qualité de l'air Kinshasa", active: true },
];

function EnvironnementPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Fleuve Congo et Pool Malebo — Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Communauté · Engagement vert</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Environnement & Durabilité à FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Environnement</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="mt-2 text-xs text-gray-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Objectifs */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Objectifs 2030–2035</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Nos engagements environnementaux</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GOALS.map(({ Icon, label, sub, desc, borderColor, bg, iconBg }) => (
              <div key={label} className={`border-2 p-5 ${borderColor} ${bg}`}>
                <div className={`flex h-10 w-10 items-center justify-center mb-4 ${iconBg}`}>
                  <Icon size={18} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{label}</p>
                <p className="text-xs font-semibold text-gray-500 mb-3">{sub}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Habitats naturels */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Biodiversité</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
            <Leaf size={20} className="inline mr-2 text-[#009A44]" />
            Protection des habitats naturels
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-3xl">
            L'Aéroport de N'djili est situé à moins de 15 km du Pool Malebo et du fleuve Congo — deux des écosystèmes les plus importants d'Afrique centrale. La RVA prend ses responsabilités environnementales très au sérieux.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {HABITATS.map(h => (
              <div key={h.name} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center mb-4" style={{ background: h.color }}>
                  <h.Icon size={18} className="text-white" />
                </div>
                <p className="font-bold text-[#1a1a1a] mb-3">{h.name}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Actions concrètes */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Actions concrètes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Ce que nous faisons — et ce que nous allons faire</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {ACTIONS.map(a => (
              <div key={a.text} className="flex items-start gap-3 border border-[#e8e8e8] bg-white px-5 py-4">
                <CheckCircle
                  size={14}
                  className={`mt-0.5 shrink-0 ${a.done ? 'text-[#009A44]' : 'text-gray-200'}`}
                />
                <p className={`text-sm ${a.done ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>{a.text}</p>
                {a.done && <span className="ml-auto shrink-0 text-[10px] font-bold text-[#009A44]">Fait</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications environnementales */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Certifications</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Conformité et certifications environnementales</h2>
          <div className="space-y-3">
            {CERTIFICATIONS_ENV.map(c => (
              <div key={c.name} className="flex items-center gap-3 border border-[#e8e8e8] bg-white px-5 py-3">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.active ? 'bg-[#009A44]' : 'bg-amber-400'}`} />
                <p className="text-sm text-[#1a1a1a]">{c.name}</p>
                {!c.active && <span className="ml-auto shrink-0 text-[10px] font-bold text-amber-600">En cours</span>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Relations communautaires</p>
              <h2 className="text-xl font-bold text-white mb-1">Découvrez nos initiatives locales</h2>
              <p className="text-sm text-white/55 max-w-lg">Reboisement, écoles, santé, formation professionnelle et programme FIH Art — découvrez comment la RVA s'engage dans les communes riveraines.</p>
            </div>
            <Link to="/communaute/relations-communaute" className="shrink-0 flex items-center gap-2 bg-[#009A44] px-6 py-3 text-sm font-bold text-white hover:bg-[#009A44]/80 transition-colors">
              Relations communautaires <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
