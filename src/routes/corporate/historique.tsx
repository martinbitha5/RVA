import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { History } from 'lucide-react';

export const Route = createFileRoute('/corporate/historique')({
  component: HistoriquePage,
  head: () => ({ meta: [{ title: "Historique — Aéroport N'djili depuis 1953 · FIH" }] }),
});

const TIMELINE = [
  {
    year: '1953',
    title: 'Inauguration de l\'aéroport de Léopoldville',
    body: 'Construit par la Sabena (Belgique) sous l\'administration coloniale, l\'aéroport de N\'djili est inauguré comme principal hub de l\'Afrique centrale belge. Les premières routes desservent Bruxelles, Johannesburg et Cairo.',
    era: 'colonial',
  },
  {
    year: '1960',
    title: 'Indépendance — Naissance de la République du Congo',
    body: 'Le 30 juin 1960, l\'aéroport de Léopoldville accueille les cérémonies d\'indépendance du Congo. L\'aéroport prend une dimension symbolique majeure. Air Congo est créée comme compagnie nationale.',
    era: 'independence',
  },
  {
    year: '1966',
    title: 'Renommage en Aéroport de Kinshasa',
    body: 'Suite au renommage de Léopoldville en Kinshasa par Mobutu Sese Seko, l\'aéroport devient officiellement l\'Aéroport International de N\'djili, du nom de la commune qui l\'accueille.',
    era: 'mobutu',
  },
  {
    year: '1970',
    title: 'Création de la Régie des Voies Aériennes (RVA)',
    body: 'La RVA est créée comme entreprise publique pour gérer l\'ensemble du patrimoine aéroportuaire zaïrois. Elle reprend les compétences de la Sabena sortante et développe progressivement les infrastructures nationales.',
    era: 'mobutu',
  },
  {
    year: '1974',
    title: 'Ère Air Zaïre',
    body: 'Air Congo devient Air Zaïre. L\'aéroport connaît son âge d\'or : lignes directes vers Paris, Bruxelles, Rome, Abidjan, Dakar. Le terminal international est agrandi pour accueillir les Boeing 707 et DC-8.',
    era: 'mobutu',
  },
  {
    year: '1990–1997',
    title: 'Période de crise',
    body: 'La crise politique et économique du Zaïre frappe durement le secteur aérien. Air Zaïre est dissoute en 1994. Le trafic international chute de 60%. Les infrastructures se dégradent faute d\'investissements.',
    era: 'crisis',
  },
  {
    year: '1997',
    title: 'Renommage en RDC — Code IATA : FIH',
    body: 'L\'arrivée de Laurent-Désiré Kabila marque le renommage du Zaïre en République Démocratique du Congo. L\'aéroport prend officiellement le code IATA FIH, qui s\'impose au niveau international.',
    era: 'rdc',
  },
  {
    year: '2000s',
    title: 'Reprise progressive',
    body: 'Retour progressif des compagnies internationales : Brussels Airlines, Ethiopian Airlines, Kenya Airways, Egypt Air. Congo Airways est fondée en 2015 comme nouvelle compagnie nationale sur les décombres de Hewa Bora et Bravo Air Congo.',
    era: 'rdc',
  },
  {
    year: '2020–2024',
    title: 'COVID-19 et relance',
    body: 'La pandémie de COVID-19 frappe sévèrement le trafic aérien (-70% en 2020). FIH résiste grâce au fret médical et humanitaire. 2022-2023 voient un rebond fort avec l\'arrivée de nouvelles compagnies (Turkish Airlines, Qatar Airways, RwandAir).',
    era: 'modern',
  },
  {
    year: '2024–2027',
    title: 'Programme de modernisation majeure',
    body: 'Lancement du programme de reconstruction du terminal international (250M USD) et de modernisation des pistes. Objectif : atteindre 5 millions de passagers/an et obtenir la certification OACI Cat I complète.',
    era: 'future',
  },
];

const ERA_COLORS: Record<string, string> = {
  colonial:    'bg-slate-500',
  independence:'bg-rdc-green',
  mobutu:      'bg-amber-500',
  crisis:      'bg-rdc-red',
  rdc:         'bg-rdc-blue',
  modern:      'bg-purple-500',
  future:      'bg-rdc-yellow',
};

function HistoriquePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.history')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.historySubtitle')}</p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />

        <div className="space-y-6">
          {TIMELINE.map(event => (
            <div key={event.year} className="flex gap-5">
              {/* Dot */}
              <div className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white text-[10px] font-bold ${ERA_COLORS[event.era]} z-10`}>
                <History size={14} />
              </div>
              <div className="flex-1 rounded-2xl border border-border bg-card p-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <p className="font-display font-bold text-rdc-anthracite">{event.title}</p>
                  <span className="text-sm font-bold text-rdc-blue flex-shrink-0">{event.year}</span>
                </div>
                <p className="text-sm text-muted-foreground">{event.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
