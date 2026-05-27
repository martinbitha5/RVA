import { createFileRoute, Link } from '@tanstack/react-router';
import { Leaf, Volume2, Users, ArrowRight, MessageSquare, Paintbrush2, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/communaute/')({
  component: CommunauteHub,
  head: () => ({
    meta: [
      { title: "Communauté — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Engagement de la RVA envers les communautés riveraines de Nsele, Masina et Kimbanseke, l'environnement et le développement durable." },
    ],
  }),
});

const MAIN_CARDS = [
  {
    Icon: Leaf,
    href: '/communaute/environnement-durabilite',
    label: 'Environnement & Durabilité',
    desc: 'Pool Malebo, fleuve Congo, reboisement, énergies renouvelables et certification ACA visée pour 2026.',
    gradient: 'from-[#005A28] to-[#009A44]',
    badge: '4 programmes actifs',
  },
  {
    Icon: Volume2,
    href: '/communaute/environnement-sonore',
    label: 'Environnement sonore',
    desc: "Plan d'exposition au bruit (PEB), zones A/B/C, mesures d'atténuation et formulaire de plainte en ligne.",
    gradient: 'from-amber-700 to-amber-500',
    badge: '8 sonomètres permanents',
  },
  {
    Icon: Users,
    href: '/communaute/relations-communaute',
    label: 'Relations communautaires',
    desc: 'Initiatives locales dans les communes de Nsele, Masina et Kimbanseke — écoles, santé, formation, art.',
    gradient: 'from-[#003DA5] to-blue-500',
    badge: '5 programmes actifs',
  },
  {
    Icon: Paintbrush2,
    href: '/communaute/relations-communaute',
    label: 'Programme FIH Art',
    desc: "Exposition permanente d'artistes congolais dans les terminaux — Chéri Samba, Moke, jeunes talents Kinshasa.",
    gradient: 'from-[#7C1B28] to-[#CE1126]',
    badge: '25 artistes exposés',
  },
] as const;

const COMMUNES = [
  { name: 'Nsele',      num: '01', pop: '~300 000 hab.', role: 'Commune hôte — siège de FIH, voix prépondérante au CCC' },
  { name: 'Masina',     num: '02', pop: '~850 000 hab.', role: 'Principale zone impactée par le bruit aérien' },
  { name: 'Kimbanseke', num: '03', pop: '~600 000 hab.', role: "Sous les trajectoires d'approche ILS" },
  { name: "N'djili",    num: '04', pop: '~700 000 hab.', role: "Commune éponyme de l'aéroport, impact communautaire fort" },
] as const;

const IMPACT_STATS = [
  { value: '25 000+', label: 'Bénéficiaires directs 2023' },
  { value: '3 M USD', label: 'Investissements communautaires 2023' },
  { value: '12',      label: 'Partenariats ONG locales' },
  { value: '4',       label: 'Communes riveraines engagées' },
];

function CommunauteHub() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Communes riveraines de l'Aéroport N'djili — Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Régie des Voies Aériennes · RDC</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Communauté — FIH et ses voisins</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Communauté</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Intro */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Nos engagements</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Au-delà de l'aéroport</h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            La Régie des Voies Aériennes (RVA) ne se limite pas à gérer un aéroport. Elle s'engage activement auprès des communautés riveraines de Nsele, Masina, Kimbanseke et N'djili — plus de 2,4 millions d'habitants — à travers des programmes d'éducation, de santé, de formation professionnelle et de protection de l'environnement.
          </p>
        </section>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {IMPACT_STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold text-[#009A44] leading-none">{s.value}</p>
                <p className="mt-2 text-xs text-gray-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cards 4 thèmes */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Nos programmes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">4 axes d'engagement communautaire</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {MAIN_CARDS.map(card => (
              <Link
                key={card.href + card.label}
                to={card.href as never}
                className={`group relative overflow-hidden flex flex-col bg-gradient-to-br ${card.gradient} min-h-[200px]`}
              >
                <div className="p-7 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/15 border border-white/20">
                    <card.Icon size={22} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[#FFCE00] w-8 h-8 flex items-center justify-center">
                      <ArrowRight size={14} className="text-[#1a1a1a]" />
                    </div>
                  </div>
                </div>
                <div className="p-7 pt-0 flex-1 flex flex-col justify-end">
                  <span className="self-start bg-white/15 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 mb-3">
                    {card.badge}
                  </span>
                  <h3 className="font-bold text-white text-xl leading-snug group-hover:text-[#FFCE00] transition-colors">{card.label}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Communes riveraines */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Communes riveraines</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Un dialogue permanent avec nos voisins</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-3xl">
            Le Comité Consultatif Communautaire (CCC) de la RVA réunit trimestriellement des représentants des communes riveraines pour traiter des questions de bruit, d'emploi local, d'environnement et d'initiatives de développement.
          </p>
          <div className="divide-y divide-[#e8e8e8] border border-[#e8e8e8] bg-white">
            {COMMUNES.map(c => (
              <div key={c.name} className="flex items-center gap-6 px-6 py-5 hover:bg-gray-50 transition-colors">
                <span className="text-2xl font-bold text-[#003DA5]/20 shrink-0 w-8">{c.num}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1a1a1a]">{c.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.role}</p>
                </div>
                <span className="text-xs font-bold text-gray-300 shrink-0">{c.pop}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Prochain comité consultatif : <strong className="text-gray-700">Juin 2026</strong> — Contact : <a href="mailto:communaute@fih-rva.com" className="text-[#003DA5] hover:underline">communaute@fih-rva.com</a>
          </p>
        </section>

        {/* Avis travaux */}
        <section className="flex items-start gap-5 border border-amber-200 bg-amber-50 p-6">
          <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-amber-800 mb-1">Travaux piste 01/19 — Impact communautaire</p>
            <p className="text-sm text-amber-700 mb-3">
              La réhabilitation de la piste principale (jan. 2025 – sep. 2026) entraîne des opérations nocturnes supplémentaires. La RVA s'engage à communiquer régulièrement avec les riverains.
            </p>
            <Link to="/communaute/travaux-pistes" className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1">
              En savoir plus sur les travaux <ArrowRight size={11} />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Nuisance sonore ?</p>
              <h2 className="text-xl font-bold text-white mb-1">Déposez une plainte bruit en ligne</h2>
              <p className="text-sm text-white/55 max-w-lg">Vous résidez à Nsele, Masina, Kimbanseke ou N'djili et souffrez du bruit de l'aéroport ? Signalez-le directement à la RVA.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/communaute/environnement-sonore/plaintes" className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
                <MessageSquare size={14} /> Déposer une plainte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
