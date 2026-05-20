import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Leaf, Volume2, Construction, Users, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/communaute/')({
  component: CommunauteHub,
  head: () => ({ meta: [
    { title: "Communauté — Aéroport N'djili · FIH" },
    { name: 'description', content: 'Engagement de la RVA envers les communautés riveraines de Nsele, Masina et Kimbanseke, l\'environnement et le développement durable.' },
  ]}),
});

const CARDS = [
  { key: 'environmentSustainability', href: '/communaute/environnement-durabilite', Icon: Leaf,         color: 'bg-rdc-green/10 text-rdc-green' },
  { key: 'noiseEnvironment',          href: '/communaute/environnement-sonore',     Icon: Volume2,      color: 'bg-amber-100 text-amber-700' },
  { key: 'runwayWorks',               href: '/communaute/travaux-pistes',           Icon: Construction, color: 'bg-orange-100 text-orange-600' },
  { key: 'communityRelations',        href: '/communaute/relations-communaute',     Icon: Users,        color: 'bg-rdc-blue/10 text-rdc-blue' },
] as const;

const COMMUNES = [
  { name: 'Nsele',       pop: '~300 000 hab.', desc: 'Commune hôte de l\'aéroport — siège du terminal' },
  { name: 'Masina',      pop: '~850 000 hab.', desc: 'Commune riveraine — zone de bruit principal' },
  { name: 'Kimbanseke',  pop: '~600 000 hab.', desc: 'Commune riveraine — trajectoires d\'approche' },
  { name: 'N\'djili',    pop: '~700 000 hab.', desc: 'Commune éponyme — impact communautaire fort' },
];

function CommunauteHub() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('community.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('community.hubTitle')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('community.hubSubtitle')}</p>

      {/* Main sections */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2">
        {CARDS.map(({ key, href, Icon, color }) => (
          <Link key={key} to={href as never}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-rdc-blue/30 transition-all">
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`community.${key}`)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t(`community.${key}Desc`)}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Communes riveraines */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">{t('community.riverineCommunesTitle')}</h2>
      <p className="mb-5 text-sm text-muted-foreground">{t('community.riverineCommunesDesc')}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMMUNES.map(c => (
          <div key={c.name} className="rounded-2xl border border-border bg-card p-4">
            <p className="font-semibold text-rdc-anthracite">{c.name}</p>
            <p className="text-xs text-rdc-blue font-medium mt-0.5">{c.pop}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
