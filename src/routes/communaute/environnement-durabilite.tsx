import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Leaf, Bird, Droplets, Sun, TreePine, CheckCircle, TrendingDown, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/communaute/environnement-durabilite')({
  component: EnvironnementPage,
  head: () => ({ meta: [{ title: "Environnement & Durabilité — Aéroport International de N'djili · FIH" }] }),
});

const GOALS = [
  {
    icon: TrendingDown,
    label: '-30% CO₂',
    sub: 'd\'ici 2030',
    desc: 'Réduction des émissions de CO₂ par rapport à 2019, via efficacité énergétique et mobilité électrique.',
    color: 'border-rdc-green/30 bg-rdc-green/5',
    iconBg: 'bg-rdc-green',
  },
  {
    icon: Sun,
    label: '100% ENR',
    sub: 'objectif 2035',
    desc: 'Couverture intégrale des besoins énergétiques par des sources renouvelables — priorité solaire.',
    color: 'border-rdc-yellow/30 bg-rdc-yellow/5',
    iconBg: 'bg-rdc-yellow',
  },
  {
    icon: Droplets,
    label: 'Zéro rejet',
    sub: 'eaux usées brutes',
    desc: 'Traitement intégral des eaux usées et pluviales avant tout rejet dans le bassin versant du Congo.',
    color: 'border-cyan-200 bg-cyan-50',
    iconBg: 'bg-cyan-500',
  },
  {
    icon: TreePine,
    label: '10 000 arbres',
    sub: 'programme 2024–2026',
    desc: 'Reboisement des terrains RVA et des communes riveraines (Nsele, Kimbanseke) avec espèces endémiques.',
    color: 'border-emerald-200 bg-emerald-50',
    iconBg: 'bg-emerald-600',
  },
];

const HABITATS = [
  {
    name: 'Pool Malebo (Stanley Pool)',
    desc: 'Zone humide d\'importance internationale sur le fleuve Congo entre Kinshasa et Brazzaville. FIH gère strictement ses eaux de ruissellement pour protéger ce bassin exceptionnel.',
    icon: Droplets,
    accent: 'bg-cyan-500',
  },
  {
    name: 'Fleuve Congo',
    desc: 'Deuxième plus grand fleuve d\'Afrique par le débit. FIH maintient un système de rétention des hydrocarbures et eaux de piste pour éviter toute contamination.',
    icon: Droplets,
    accent: 'bg-rdc-blue',
  },
  {
    name: 'Avifaune locale',
    desc: 'Gestion active du péril aviaire : programme de surveillance, végétation contrôlée, effaroucheurs acoustiques et radar détection oiseaux sur la piste 01/19.',
    icon: Bird,
    accent: 'bg-rdc-green',
  },
];

const ACTIONS = [
  { text: 'Collecte et traitement des eaux pluviales et usées (station épuration dédiée)', done: true },
  { text: 'Tri des déchets à la source — partenariat recycleurs agréés Kinshasa', done: true },
  { text: 'Réduction des plastiques à usage unique dans les terminaux (objectif 2025)', done: false },
  { text: 'Flotte de véhicules de piste : transition vers motorisation électrique/hybride', done: false },
  { text: 'Audit énergétique bâtiments terminaux — isolation renforcée en cours', done: false },
  { text: '500 kW solaires installés sur terminal domestique (livré 2023)', done: true },
  { text: 'Certification ACA (Airport Carbon Accreditation) — dossier en cours', done: false },
  { text: 'Plan de gestion de la faune sauvage — conformité OACI Annexe 14', done: true },
];

const STATS = [
  { value: '-18%', label: 'CO₂/pax depuis 2019', color: 'text-rdc-green' },
  { value: '500 kW', label: 'Solaire installé', color: 'text-rdc-yellow' },
  { value: '72%', label: 'Déchets valorisés', color: 'text-rdc-yellow' },
  { value: '10 000', label: 'Arbres plantés 2024–26', color: 'text-rdc-green' },
];

function EnvironnementPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        gradient="night"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Communauté', href: '/communaute' },
          { label: 'Environnement & Durabilité' },
        ]}
        eyebrow="Notre engagement vert"
        title={t('community.environmentSustainability')}
        subtitle={t('community.envSubtitle')}
      />

      {/* Stats band */}
      <div className="bg-[#0A1A0A]">
        <div className="container py-12 md:py-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="border border-white/10 p-6 text-center">
                <p className={`font-display text-4xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-2 text-xs text-white/50 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-green" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-green">Objectifs 2030–2035</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Nos engagements environnementaux
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GOALS.map(({ icon: Icon, label, sub, desc, color, iconBg }) => (
              <div key={label} className={`border-2 p-6 ${color}`}>
                <div className={`flex h-11 w-11 items-center justify-center mb-4 ${iconBg}`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="font-display text-2xl font-bold text-rdc-anthracite">{label}</p>
                <p className="text-xs font-semibold text-muted-foreground mb-3">{sub}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Natural habitats */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-green" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-green">Biodiversité</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">
            <Leaf size={20} className="inline mr-2 text-rdc-green" />
            Protection des habitats naturels
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {HABITATS.map(h => (
              <div key={h.name} className="border border-border bg-background p-6">
                <div className={`flex h-11 w-11 items-center justify-center mb-4 ${h.accent}`}>
                  <h.icon size={20} className="text-white" />
                </div>
                <p className="font-bold text-rdc-anthracite mb-3">{h.name}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-background">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-green" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-green">Actions concrètes</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">Ce que nous faisons</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {ACTIONS.map(a => (
              <div key={a.text} className="flex items-start gap-3 border border-border bg-card px-5 py-4">
                <CheckCircle
                  size={15}
                  className={`mt-0.5 flex-shrink-0 ${a.done ? 'text-rdc-green' : 'text-muted-foreground/40'}`}
                />
                <p className={`text-sm ${a.done ? 'text-rdc-anthracite' : 'text-muted-foreground'}`}>{a.text}</p>
                {a.done && (
                  <span className="ml-auto flex-shrink-0 text-[10px] font-bold text-rdc-green">Fait</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rdc-green">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">En savoir plus sur nos initiatives</p>
              <p className="text-sm text-white/70 mt-1">Découvrez nos programmes communautaires et notre engagement envers les communes riveraines.</p>
            </div>
            <Link
              to="/communaute/relations-communaute"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-rdc-green hover:bg-rdc-yellow transition-colors whitespace-nowrap"
            >
              Relations communautaires <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
