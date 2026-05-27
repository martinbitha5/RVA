import { createFileRoute, Link } from '@tanstack/react-router';
import { Landmark, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/historique')({
  component: HistoriquePage,
  head: () => ({
    meta: [
      { title: "Histoire de l'Aéroport de N'djili depuis 1953 — FIH" },
      { name: 'description', content: "Chronologie complète de l'Aéroport International de N'djili (FIH) : de la Sabena en 1953 à la modernisation actuelle." },
    ],
  }),
});

type Era = 'colonial' | 'independence' | 'mobutu' | 'crisis' | 'rdc' | 'modern' | 'future';

const ERA_LABELS: Record<Era, string> = {
  colonial:     'Période coloniale',
  independence: 'Indépendance',
  mobutu:       'Ère Mobutu / Zaïre',
  crisis:       'Crise & conflits',
  rdc:          'République Démocratique du Congo',
  modern:       'Modernisation',
  future:       'Ambitions 2027+',
};

const ERA_COLORS: Record<Era, { bg: string; text: string; bar: string }> = {
  colonial:     { bg: 'bg-slate-700',  text: 'text-white', bar: '#64748b' },
  independence: { bg: 'bg-[#009A44]',  text: 'text-white', bar: '#009A44' },
  mobutu:       { bg: 'bg-amber-600',  text: 'text-white', bar: '#d97706' },
  crisis:       { bg: 'bg-[#CE1126]',  text: 'text-white', bar: '#CE1126' },
  rdc:          { bg: 'bg-[#003DA5]',  text: 'text-white', bar: '#003DA5' },
  modern:       { bg: 'bg-purple-600', text: 'text-white', bar: '#9333ea' },
  future:       { bg: 'bg-[#FFCE00]',  text: 'text-[#1a1a1a]', bar: '#FFCE00' },
};

const TIMELINE: { year: string; title: string; body: string; era: Era }[] = [
  {
    year: '1953',
    title: 'Construction de la base aérienne de N\'djili',
    body: "Héritier d'un champ d'aviation de la Seconde Guerre mondiale, l'aéroport de N'djili est construit par la Sabena (Belgique) sous l'administration coloniale belge, comme hub secondaire pour la liaison Léopoldville–Bruxelles. Il remplace progressivement l'aérodrome de Ndolo.",
    era: 'colonial',
  },
  {
    year: '1959',
    title: 'Inauguration officielle — Hub de la Sabena',
    body: "L'aéroport est officiellement inauguré comme hub secondaire de la Sabena. Les premières routes internationales régulières desservent Bruxelles, Johannesburg et Le Caire via DC-6 et Convair. Il devient la principale plaque tournante de l'Afrique centrale belge.",
    era: 'colonial',
  },
  {
    year: '30 juin 1960',
    title: 'Indépendance du Congo — Naissance de la République',
    body: "Le 30 juin 1960, l'aéroport de Léopoldville est le théâtre des cérémonies d'indépendance du Congo. Le roi Baudouin de Belgique et le Premier ministre Patrice Lumumba s'y retrouvent. Air Congo est créée peu après comme première compagnie nationale.",
    era: 'independence',
  },
  {
    year: '1966',
    title: 'Renommage en Aéroport International de N\'djili',
    body: "Suite au renommage de Léopoldville en Kinshasa par Mobutu Sese Seko, l'aéroport prend définitivement le nom d'Aéroport International de N'djili, du nom de la commune qui l'accueille. Les premiers jets (B707, DC-8) rejoignent la flotte Sabena/Air Congo.",
    era: 'mobutu',
  },
  {
    year: '1970',
    title: 'Création de la Régie des Voies Aériennes (RVA)',
    body: "La RVA est créée par ordonnance-loi comme établissement public pour gérer l'ensemble du patrimoine aéroportuaire zaïrois. Elle reprend les compétences de la Sabena sortante et développe progressivement les 47 aéroports du pays.",
    era: 'mobutu',
  },
  {
    year: '1974',
    title: 'Ère Air Zaïre — Âge d\'or de l\'aviation congolaise',
    body: "Air Congo devient Air Zaïre. L'aéroport connaît son âge d'or : lignes directes vers Paris, Bruxelles, Rome, Abidjan, Dakar et Nairobi. Le terminal international est agrandi pour accueillir les Boeing 707 et DC-8 à plein chargement commercial. Mobutu y reçoit les chefs d'État africains.",
    era: 'mobutu',
  },
  {
    year: '1990–1997',
    title: 'Crise politique — Dissolution d\'Air Zaïre',
    body: "La crise politique et économique du Zaïre frappe durement l'aviation. Air Zaïre est dissoute en 1994 pour dettes. Hewa Bora Airways et d'autres compagnies privées tentent de prendre le relais. Le trafic international chute de 60 %. Les infrastructures se dégradent faute d'investissements.",
    era: 'crisis',
  },
  {
    year: '1997',
    title: 'Naissance de la RDC — Code IATA : FIH attribué',
    body: "L'arrivée de Laurent-Désiré Kabila marque le renommage du Zaïre en République Démocratique du Congo. L'aéroport prend officiellement le code IATA FIH (et OACI FZAA) qui s'impose au niveau international. Kinshasa redevient une destination régulière pour Brussels Airlines et Ethiopian Airlines.",
    era: 'rdc',
  },
  {
    year: 'Août 1998',
    title: 'Bataille de l\'aéroport — Deuxième guerre du Congo',
    body: "Des forces rebelles du RCD tentent de s'emparer de l'aéroport de N'djili lors de la Deuxième Guerre du Congo. Elles sont repoussées par les troupes zimbabwéennes de la SADC en défense du gouvernement Kabila. L'aéroport survit à ces combats intenses — un tournant stratégique majeur.",
    era: 'crisis',
  },
  {
    year: '2000s',
    title: 'Retour progressif des compagnies internationales',
    body: "Brussels Airlines, Ethiopian Airlines, Kenya Airways, EgyptAir et Air France reprennent leurs vols vers Kinshasa. Le trafic croît modestement. La RVA engage des réhabilitations partielles des terminaux avec l'aide de bailleurs internationaux (Banque mondiale, BAD).",
    era: 'rdc',
  },
  {
    year: 'Juin 2015',
    title: 'Ouverture du nouveau terminal international',
    body: 'Le nouveau terminal international est inauguré en juin 2015. Capacité : 1 million de passagers par an. Il intègre des systèmes informatisés de traitement des bagages, des comptoirs CUTE modernes et une zone commerciale de 3 200 m². Congo Airways est fondée cette même année comme nouvelle compagnie nationale.',
    era: 'modern',
  },
  {
    year: '2020–2022',
    title: 'COVID-19 — Résilience et fret humanitaire',
    body: 'La pandémie frappe le trafic (-70% en 2020). FIH devient un hub de fret médical et humanitaire pour la RDC. Les équipes de la RVA maintiennent les opérations dans des conditions exceptionnelles. La reprise est rapide dès 2021 grâce aux corridors cargo internationaux.',
    era: 'modern',
  },
  {
    year: '2022–2024',
    title: 'Rebond et arrivée de nouvelles compagnies',
    body: 'Fort rebond du trafic passagers : Turkish Airlines et Qatar Airways ouvrent des liaisons directes vers Kinshasa. RwandAir renforce sa présence. FIH atteint 1,8 million de passagers en 2023 (+12% vs 2022). ASKY et Uganda Airlines rejoignent le réseau domestique/régional.',
    era: 'modern',
  },
  {
    year: '2024–2027',
    title: 'Programme de modernisation majeure — 425 M USD',
    body: 'Lancement du programme de reconstruction du terminal international (250M USD, capacité 5M pax/an), réhabilitation de la piste 01/19 (85M USD, ILS Cat III), centre de fret moderne et digitalisation Smart Airport. Objectif : décrocher la certification OACI Cat I complète et intégrer les listes blanches internationales.',
    era: 'future',
  },
];

const AIRLINES_HISTORIQUES = ['Air Congo (1961)', 'Air Zaïre (1974–1994)', 'Hewa Bora Airways (2000–2012)', 'Congo Airways (2015–actuel)'];

function HistoriquePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Aéroport de N'djili — vue historique" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · RVA</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">70 ans d'histoire de l'Aéroport N'djili</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#CE1126] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Historique</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Intro */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Depuis 1953</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Une histoire intimement liée à celle du Congo</h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            L'Aéroport International de N'djili est le témoin vivant de toutes les grandes étapes de l'histoire congolaise — de la colonisation belge à l'indépendance, de l'ère Mobutu aux guerres du Congo, jusqu'à la reconstruction actuelle. Retour sur 70 ans d'aviation au cœur de l'Afrique.
          </p>
        </section>

        {/* Compagnies historiques */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Aviation nationale</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Compagnies nationales historiques</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {AIRLINES_HISTORIQUES.map(a => (
              <div key={a} className="flex items-center gap-2 border border-[#e8e8e8] bg-white p-4">
                <Landmark size={13} className="shrink-0 text-[#003DA5]" />
                <p className="text-sm font-medium text-[#1a1a1a] leading-snug">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Légende ères */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-4">Légende des périodes</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ERA_COLORS) as Era[]).map(e => (
              <span key={e} className={`px-3 py-1 text-[10px] font-bold ${ERA_COLORS[e].bg} ${ERA_COLORS[e].text}`}>
                {ERA_LABELS[e]}
              </span>
            ))}
          </div>
        </section>

        {/* Chronologie */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Chronologie</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">De 1953 à aujourd'hui</h2>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[#e8e8e8]" />
            <div className="space-y-6">
              {TIMELINE.map(event => {
                const ec = ERA_COLORS[event.era];
                return (
                  <div key={`${event.year}-${event.title}`} className="flex gap-5">
                    <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center text-[10px] font-bold z-10 ${ec.bg} ${ec.text}`}>
                      <Landmark size={14} />
                    </div>
                    <div className="flex-1 border border-[#e8e8e8] bg-white p-5">
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                        <p className="font-bold text-[#1a1a1a] leading-snug">{event.title}</p>
                        <span className="text-sm font-bold text-[#003DA5] shrink-0">{event.year}</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{event.body}</p>
                      <div className="mt-3">
                        <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${ec.bg} ${ec.text}`}>
                          {ERA_LABELS[event.era]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">FIH demain</p>
              <h2 className="text-xl font-bold text-white mb-1">Le futur de l'aéroport de N'djili</h2>
              <p className="text-sm text-white/55 max-w-lg">Découvrez le programme d'investissement 2024–2028 qui va transformer FIH en hub régional de 5 millions de passagers par an.</p>
            </div>
            <Link to="/corporate/projets-avenir" className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
              Projets d'avenir <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
