import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { Volume2, AlertTriangle, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/communaute/environnement-sonore')({
  component: EnvironnementSonoreLayout,
  head: () => ({
    meta: [
      { title: "Environnement sonore — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Plan d'exposition au bruit (PEB) de l'Aéroport de N'djili — zones A, B, C, mesures d'atténuation et formulaire de plainte." },
    ],
  }),
});

const NOISE_ZONES = [
  {
    zone: 'Zone A — 75 dB et plus',
    communes: ['Nsele centre', 'Abords immédiats piste 01/19'],
    labelClass: 'bg-[#CE1126] text-white',
    barClass: 'bg-[#CE1126]',
    desc: 'Nuisances sévères — restrictions de construction résidentielle en vigueur',
    width: 100,
  },
  {
    zone: 'Zone B — 65 à 75 dB',
    communes: ['Masina nord', 'Kimbanseke ouest'],
    labelClass: 'bg-amber-500 text-white',
    barClass: 'bg-amber-500',
    desc: 'Nuisances modérées — isolation acoustique obligatoire pour les nouvelles constructions',
    width: 68,
  },
  {
    zone: 'Zone C — 55 à 65 dB',
    communes: ['Masina sud', 'Kimbanseke est', "N'djili"],
    labelClass: 'bg-[#FFCE00] text-[#1a1a1a]',
    barClass: 'bg-[#FFCE00]',
    desc: "Zone d'influence — recommandations d'isolation pour les constructions existantes",
    width: 42,
  },
] as const;

const MEASURES = [
  {
    title: 'Procédures de vol silencieux',
    desc: "Trajectoires optimisées la nuit (22h–06h) pour limiter l'exposition sonore des communes de Nsele et Masina. Coordination avec les compagnies aériennes et l'Autorité de l'Aviation Civile (AAC-RDC).",
  },
  {
    title: 'Couvre-feu sélectif',
    desc: "Restriction des opérations d'aéronefs classés bruyants (chapitre 3 OACI) entre 23h et 05h LMT, sauf urgence médicale, fret humanitaire ou raison opérationnelle impérative.",
  },
  {
    title: 'Réseau de 8 sonomètres permanents',
    desc: "Réseau de 8 sonomètres permanents dans les communes riveraines (Nsele, Masina, Kimbanseke, N'djili) — données transmises en temps réel au centre de contrôle de l'environnement RVA.",
  },
  {
    title: "Programme d'isolation acoustique",
    desc: "Programme d'aide à l'insonorisation des habitations en zone A (75 dB+) — 120 logements traités en 2023. Extension aux zones B prévue 2025–2026 selon financement disponible.",
  },
  {
    title: 'Procédures CDO (Continuous Descent Operations)',
    desc: "Approches en descente continue pour réduire la consommation carburant et le bruit d'approche au-dessus des communes. Mise en place progressive avec les compagnies partenaires.",
  },
  {
    title: 'Comité de suivi environnement sonore',
    desc: "Comité trimestriel réunissant la RVA, l'AAC, les maires des communes riveraines et des représentants d'associations de riverains pour analyser les indicateurs et décider des mesures.",
  },
];

const INDICATEURS = [
  { label: 'Sonomètres permanents',       value: '8',        unit: 'stations' },
  { label: 'Niveau moyen Zone A (Lden)',   value: '78 dB',    unit: 'jour/soir/nuit' },
  { label: 'Logements insonorisés 2023',  value: '120',      unit: 'habitations Zone A' },
  { label: 'Couvre-feu nocturne',         value: '23h–05h',  unit: 'LMT (heure locale)' },
];

function EnvironnementSonoreLayout() {
  const matches = useMatches();
  const isLeaf = matches.at(-1)?.routeId === '/communaute/environnement-sonore';
  return isLeaf ? <EnvironnementSonorePage /> : <Outlet />;
}

function EnvironnementSonorePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Communes riveraines — gestion du bruit aérien FIH" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Communauté · Gestion du bruit</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Environnement sonore autour de FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-amber-600 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Bruit aérien</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Alerte travaux */}
        <section className="flex items-start gap-4 border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Travaux piste 01/19 — Impact sonore accru</p>
            <p className="text-sm text-amber-700">
              La réhabilitation de la piste principale (jan. 2025 – sep. 2026) entraîne des opérations nocturnes supplémentaires entre 05h30 et 07h LMT (lun.–mer.). Nous présentons nos excuses aux riverains de Nsele, Masina et Kimbanseke.
            </p>
          </div>
        </section>

        {/* Intro PEB */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-2">Plan d'exposition au bruit</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
            <Volume2 size={20} className="inline mr-2 text-amber-500" />
            Comprendre le bruit aérien autour de FIH
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
            Le Plan d'Exposition au Bruit (PEB) de l'Aéroport International de N'djili délimite trois zones selon le niveau sonore moyen quotidien, mesuré par l'indice <strong className="text-[#1a1a1a]">Lden</strong> (Level day-evening-night). Le bruit varie selon les trajectoires de vol, la composition de la flotte, les conditions météorologiques et les travaux en cours.
          </p>
          <div className="space-y-4">
            {NOISE_ZONES.map(z => (
              <div key={z.zone} className="border border-[#e8e8e8] bg-white overflow-hidden">
                <div className="h-1.5 bg-gray-100">
                  <div className={`h-full ${z.barClass}`} style={{ width: `${z.width}%` }} />
                </div>
                <div className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <span className={`shrink-0 px-3 py-1.5 text-xs font-bold ${z.labelClass}`}>{z.zone}</span>
                  <div className="flex flex-wrap gap-2">
                    {z.communes.map(c => (
                      <span key={c} className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={10} /> {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 ml-auto shrink-0 hidden sm:block">{z.desc}</p>
                </div>
                <p className="text-xs text-gray-400 px-5 pb-3 sm:hidden">{z.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Indicateurs */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Indicateurs 2024</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Suivi en chiffres</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {INDICATEURS.map(i => (
              <div key={i.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-2xl font-bold text-[#003DA5] leading-none">{i.value}</p>
                <p className="mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide">{i.unit}</p>
                <p className="mt-2 text-xs text-gray-500 leading-snug">{i.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mesures d'atténuation */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Atténuation du bruit</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Mesures de réduction appliquées à FIH</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {MEASURES.map(m => (
              <div key={m.title} className="flex gap-4 border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#003DA5]/10">
                  <CheckCircle size={15} className="text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm mb-1">{m.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Déposer une plainte */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-2">Signalement</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
            <AlertTriangle size={20} className="inline mr-2 text-amber-500" />
            Déposer une plainte sonore
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-2xl">
            Vous résidez dans une commune riveraine et subissez des nuisances sonores liées à l'aéroport ? Remplissez notre formulaire de signalement — chaque plainte est transmise directement au service Environnement de la RVA et traitée sous 15 jours ouvrés.
          </p>
          <Link
            to="/communaute/environnement-sonore/plaintes"
            className="inline-flex items-center gap-2 bg-amber-600 px-6 py-3 text-sm font-bold text-white hover:bg-amber-700 transition-colors"
          >
            Accéder au formulaire de plainte <ArrowRight size={13} />
          </Link>
        </section>

        {/* Liens connexes */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/communaute/travaux-pistes"
            className="group flex items-start gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/40 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#003DA5]/10 group-hover:bg-[#003DA5] transition-colors">
              <AlertTriangle size={16} className="text-[#003DA5] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-bold text-[#1a1a1a] text-sm mb-1">Travaux sur pistes</p>
              <p className="text-xs text-gray-500">Chantiers actifs et impact sur les opérations et le bruit nocturne</p>
            </div>
          </Link>
          <Link
            to="/communaute/relations-communaute"
            className="group flex items-start gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#009A44]/40 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#009A44]/10 group-hover:bg-[#009A44] transition-colors">
              <ArrowRight size={16} className="text-[#009A44] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="font-bold text-[#1a1a1a] text-sm mb-1">Relations communautaires</p>
              <p className="text-xs text-gray-500">Initiatives locales, comité consultatif, FIH Art et reboisement</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
