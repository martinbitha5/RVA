import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Building2, Scale, Rocket, History, Briefcase,
  Handshake, Plane, Shield, ArrowRight,
} from 'lucide-react';

export const Route = createFileRoute('/corporate/')({
  component: CorporateHub,
  head: () => ({
    meta: [
      { title: "Corporate — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Informations institutionnelles sur l'Aéroport International de N'djili (FIH), géré par la Régie des Voies Aériennes (RVA) — Kinshasa, RDC." },
    ],
  }),
});

const MAIN_CARDS = [
  { icon: Building2, href: '/corporate/a-propos',            label: 'À propos de la RVA',    desc: "Mission, valeurs et présentation de la Régie des Voies Aériennes et de l'aéroport FIH.", accent: '#003DA5' },
  { icon: History,   href: '/corporate/historique',           label: 'Histoire',               desc: "De l'inauguration en 1953 sous la Sabena jusqu'à la modernisation actuelle.", accent: '#CE1126' },
  { icon: Scale,     href: '/corporate/gouvernance',          label: 'Gouvernance',            desc: "Conseil d'administration, comité de direction et tutelle ministérielle.", accent: '#1a1a1a' },
  { icon: Rocket,    href: '/corporate/projets-avenir',       label: "Projets d'avenir",      desc: "Programme d'investissement 2024–2028 : nouveau terminal, piste, numérique.", accent: '#FFCE00' },
  { icon: Briefcase, href: '/corporate/carriere',             label: 'Carrières',              desc: "1 200 employés directs — rejoignez l'équipe de l'aéroport de Kinshasa.", accent: '#003DA5' },
  { icon: Handshake, href: '/corporate/partenariats-commerciaux', label: 'Partenariats',     desc: "Concessions, immobilier aéroportuaire, espaces publicitaires, appels d'offres.", accent: '#009A44' },
  { icon: Plane,     href: '/corporate/services-aeriens',    label: 'Services aériens',      desc: 'Aviation commerciale, fret et aviation générale opérant à FIH.', accent: '#003DA5' },
  { icon: Shield,    href: '/corporate/surete-securite',     label: 'Sûreté & Sécurité',     desc: 'Certifications OACI, AVSEC, SSLIA catégorie 8, sécurité 24h/24.', accent: '#CE1126' },
] as const;

const STATS = [
  { value: '1953',    label: "Année d'inauguration",         sub: "Aéroport de N'djili" },
  { value: '47',      label: 'Aéroports gérés par la RVA',  sub: "Sur l'ensemble de la RDC" },
  { value: '17+',     label: 'Compagnies aériennes',         sub: 'Partenaires actifs à FIH' },
  { value: '4 700 m', label: 'Piste principale',             sub: 'Piste 06/24 — code 4E' },
] as const;

function CorporateHub() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Aéroport International de N'djili, Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Régie des Voies Aériennes · RDC</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Informations institutionnelles</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Corporate</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-px bg-[#e8e8e8] md:grid-cols-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white px-8 py-8 text-center">
            <p className="text-4xl font-bold text-[#003DA5] leading-none">{s.value}</p>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">{s.label}</p>
            <p className="mt-0.5 text-xs text-gray-500">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Cards grille */}
      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Découvrir la RVA et FIH</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Toutes nos rubriques</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MAIN_CARDS.map(c => (
              <Link
                key={c.href}
                to={c.href as never}
                className="group flex flex-col gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/40 hover:shadow-md transition-all"
              >
                <div className="flex h-11 w-11 items-center justify-center" style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}30` }}>
                  <c.icon size={18} style={{ color: c.accent }} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors text-sm leading-snug mb-2">{c.label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#003DA5]/60 group-hover:text-[#003DA5] transition-colors">
                  Découvrir <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA carrières */}
        <section className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Rejoindre la RVA</p>
              <h2 className="text-xl font-bold text-white mb-1">Construisez votre carrière à l'aéroport de Kinshasa</h2>
              <p className="text-sm text-white/55 max-w-lg">Plus de 1 200 employés directs, 15 familles de métiers, un secteur aérien en croissance. La RVA recrute et forme des talents congolais.</p>
            </div>
            <Link
              to="/corporate/carriere"
              className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors"
            >
              <Briefcase size={14} /> Voir les offres
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
