import { createFileRoute, Link } from '@tanstack/react-router';
import { Rocket, Calendar, DollarSign, CheckCircle, Clock, ArrowRight, Handshake } from 'lucide-react';

export const Route = createFileRoute('/corporate/projets-avenir')({
  component: ProjetsAvenirPage,
  head: () => ({
    meta: [
      { title: "Projets d'avenir — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Programme d'investissement 2024–2028 de l'Aéroport de N'djili : nouveau terminal, réhabilitation piste, Smart Airport." },
    ],
  }),
});

type ProjectStatus = 'in_progress' | 'planned' | 'completed';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; labelClass: string; barClass: string; dotClass: string }> = {
  in_progress: { label: 'En cours',  labelClass: 'text-[#003DA5] bg-[#003DA5]/10',  barClass: 'bg-[#003DA5]', dotClass: 'bg-[#003DA5]' },
  planned:     { label: 'Planifié',  labelClass: 'text-amber-700 bg-amber-100',      barClass: 'bg-amber-400', dotClass: 'bg-amber-500' },
  completed:   { label: 'Achevé',    labelClass: 'text-[#009A44] bg-[#009A44]/10',  barClass: 'bg-[#009A44]', dotClass: 'bg-[#009A44]' },
};

const PROJECTS = [
  {
    title: 'Reconstruction Terminal International',
    status: 'in_progress' as ProjectStatus,
    budget: '250 M USD',
    timeline: '2024–2027',
    description: 'Reconstruction complète du terminal international avec capacité portée à 5 millions de passagers par an. Nouvelles passerelles télescopiques, climatisation centralisée moderne, zone duty free agrandie à 4 500 m², salons VIP rénovés et espaces commerciaux étendus.',
    progress: 35,
    highlights: ['5 passerelles télescopiques', 'Capacité 5M pax/an', 'Certification OACI Cat I', 'Zone commerciale 8 000 m²'],
  },
  {
    title: 'Réhabilitation piste 01/19 (Phase 1 & 2)',
    status: 'in_progress' as ProjectStatus,
    budget: '85 M USD',
    timeline: '2024–2026',
    description: "Réhabilitation et renforcement de la piste principale (4 700 m) pour accueillir les aéronefs A380, B747-8 et B777X. Nouveau balisage LED intégral, installation d'un système ILS Cat III et mise à niveau des sorties rapides Q1 et Q2.",
    progress: 55,
    highlights: ['Code 4E/4F', 'ILS Cat III', 'Balisage LED complet', 'Compatible A380 / B777X'],
  },
  {
    title: 'Terminal Domestique — Rénovation',
    status: 'planned' as ProjectStatus,
    budget: '45 M USD',
    timeline: '2026–2028',
    description: "Rénovation et extension du terminal domestique pour améliorer la fluidité des passagers des vols intérieurs vers Lubumbashi, Goma, Bukavu, Mbuji-Mayi, Kisangani, Mbandaka et Matadi. Capacité doublée avec 8 portes d'embarquement.",
    progress: 0,
    highlights: ['Capacité doublée', '8 portes embarquement', 'Passerelles intérieures', 'Salon premium domestique'],
  },
  {
    title: 'Centre de Fret Moderne',
    status: 'planned' as ProjectStatus,
    budget: '30 M USD',
    timeline: '2025–2027',
    description: "Construction d'un centre de fret aux normes IATA CEIV : zone froide pour produits périssables, contrôle douanier DGDA intégré, accès direct piste, traçabilité RFID et surface d'entreposage de 6 000 m². Répond à la forte croissance du cargo congolais.",
    progress: 0,
    highlights: ['Zone froide 2 000 m²', 'X-ray 100% marchandises', 'Transit 24h/24', 'Certification CEIV Pharma'],
  },
  {
    title: 'Smart Airport — Digitalisation FIH',
    status: 'planned' as ProjectStatus,
    budget: '15 M USD',
    timeline: '2025–2028',
    description: 'Programme de transformation digitale : bornes CUTE de self-check-in, portiques biométriques PARAFE, suivi bagages RFID, application mobile FIH (iOS/Android), tableau de bord opérationnel temps réel et intégration Mobile Money native.',
    progress: 10,
    highlights: ['Self-check-in CUTE', 'Biométrie PARAFE', 'RFID bagages', 'App mobile FIH'],
  },
  {
    title: 'Extension Parking P3 — Livré',
    status: 'completed' as ProjectStatus,
    budget: '8 M USD',
    timeline: '2022–2023',
    description: "Extension du parking P3 avec 450 nouvelles places, éclairage LED solaire, 20 bornes de recharge électrique et système de guidage dynamique par panneaux à messages variables. Réservation disponible via l'application FIH et Mobile Money.",
    progress: 100,
    highlights: ['+450 places', '20 bornes EV', 'LED solaire', 'Guidage dynamique'],
  },
] as const;

const OVERVIEW_STATS = [
  { value: '425 M',  label: "USD d'investissement total",       note: 'Programme 2024–2028' },
  { value: '2027',   label: 'Nouveau terminal opérationnel',    note: 'Capacité 5M pax/an' },
  { value: '5 M',    label: 'Passagers/an (capacité cible)',    note: "vs 1 M aujourd'hui" },
  { value: '4',      label: 'Chantiers actifs ou planifiés',    note: 'Piste, terminal, fret, digital' },
];

function ProjetsAvenirPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Chantier de modernisation de l'Aéroport N'djili" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · FIH demain</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Projets d'avenir — FIH 2027</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Modernisation</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Programme d'investissement 2024–2028</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">L'aéroport de N'djili en transformation</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {OVERVIEW_STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold text-[#FFCE00] leading-none">{s.value}</p>
                <p className="mt-2 text-xs font-bold text-[#1a1a1a] leading-snug">{s.label}</p>
                <p className="mt-1 text-[10px] text-gray-400">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projets */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Portefeuille de projets</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Les grands chantiers de FIH</h2>
          <div className="grid gap-5 lg:grid-cols-2">
            {PROJECTS.map(p => {
              const sc = STATUS_CONFIG[p.status];
              return (
                <div key={p.title} className="border border-[#e8e8e8] bg-white overflow-hidden">
                  {/* Barre de progression */}
                  <div className="h-1 bg-gray-100">
                    <div className={`h-full ${sc.barClass} transition-all`} style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#003DA5]/10 mt-0.5">
                          <Rocket size={14} className="text-[#003DA5]" />
                        </div>
                        <p className="font-bold text-[#1a1a1a] leading-snug">{p.title}</p>
                      </div>
                      <span className={`shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold ${sc.labelClass}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dotClass}`} />
                        {sc.label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{p.description}</p>

                    {p.status === 'in_progress' && (
                      <div className="mb-4">
                        <div className="mb-1.5 flex justify-between text-xs">
                          <span className="text-gray-400">Avancement</span>
                          <span className="font-bold text-[#003DA5]">{p.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 overflow-hidden">
                          <div className="h-full bg-[#003DA5]" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="mb-4 flex flex-wrap gap-2">
                      {p.highlights.map(h => (
                        <span key={h} className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-500 border border-[#e8e8e8]">
                          <CheckCircle size={8} className="text-[#009A44]" /> {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-5 text-xs text-gray-400 border-t border-[#e8e8e8] pt-4">
                      <span className="flex items-center gap-1.5"><DollarSign size={11} className="text-[#009A44]" /> {p.budget}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-[#003DA5]" /> {p.timeline}</span>
                      {p.status === 'completed' && (
                        <span className="flex items-center gap-1.5 text-[#009A44] font-semibold"><CheckCircle size={11} /> Livré</span>
                      )}
                      {p.status === 'in_progress' && (
                        <span className="flex items-center gap-1.5 text-[#003DA5] font-semibold"><Clock size={11} /> En cours</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PPP & financement */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Financement</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Partenariats Public-Privé (PPP)</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Banque mondiale', desc: 'Financement partiel de la réhabilitation de la piste et mise aux normes de sécurité (IDA/IBRD).', color: '#003DA5' },
              { title: 'BAD — Banque africaine de développement', desc: 'Appui au programme de modernisation des systèmes de navigation aérienne et formation des techniciens RVA.', color: '#009A44' },
              { title: 'Partenaires privés', desc: 'Appels à concession pour la gestion du terminal commercial, des parkings et du centre de fret (PPP en cours de structuration).', color: '#CE1126' },
            ].map(p => (
              <div key={p.title} className="border border-[#e8e8e8] bg-white p-5">
                <div className="h-0.5 w-8 mb-4" style={{ background: p.color }} />
                <p className="font-bold text-[#1a1a1a] text-sm mb-2">{p.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Appels d'offres & partenariats</p>
              <h2 className="text-xl font-bold text-white mb-1">Vous souhaitez participer à la modernisation de FIH ?</h2>
              <p className="text-sm text-white/55 max-w-lg">Notre service des partenariats commerciaux gère les appels d'offres pour les concessions, les marchés de travaux et les PPP.</p>
            </div>
            <Link to="/corporate/partenariats-commerciaux" className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
              <Handshake size={14} /> Partenariats <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
