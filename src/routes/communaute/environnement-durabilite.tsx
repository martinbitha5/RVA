import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Leaf, Bird, Droplets, Sun, TreePine, CheckCircle, TrendingDown } from 'lucide-react';

export const Route = createFileRoute('/communaute/environnement-durabilite')({
  component: EnvironnementPage,
  head: () => ({ meta: [{ title: "Environnement & Durabilité — FIH · RVA" }] }),
});

const GOALS = [
  { icon: TrendingDown, label: '-30% émissions CO₂', desc: 'D\'ici 2030 par rapport à 2019', color: 'bg-rdc-green/10 text-rdc-green' },
  { icon: Sun,          label: '100% énergies renouvelables', desc: 'Objectif 2035 — solaire prioritaire', color: 'bg-rdc-yellow/20 text-rdc-anthracite' },
  { icon: Droplets,     label: 'Zéro rejet liquide brut', desc: 'Traitement intégral des eaux usées', color: 'bg-cyan-100 text-cyan-700' },
  { icon: TreePine,     label: '10 000 arbres plantés', desc: 'Programme reboisement Nsele 2024–2026', color: 'bg-emerald-100 text-emerald-700' },
];

const HABITATS = [
  {
    name: 'Pool Malebo (Stanley Pool)',
    desc: 'Le lac Stanley Pool, partie du fleuve Congo bordant Kinshasa et Brazzaville, est une zone humide d\'importance internationale. FIH s\'engage à ne pas polluer les bassins versants qui l\'alimentent.',
    icon: Droplets,
  },
  {
    name: 'Fleuve Congo',
    desc: 'Deuxième plus grand fleuve d\'Afrique par le débit, le Congo abrite une biodiversité exceptionnelle. FIH gère ses eaux de ruissellement pour éviter tout déversement d\'hydrocarbures.',
    icon: Droplets,
  },
  {
    name: 'Avifaune locale',
    desc: 'Gestion active du péril aviaire : programme de lutte contre les oiseaux attirés par la zone aéroportuaire (décharges à distance, végétation contrôlée, effaroucheurs).',
    icon: Bird,
  },
];

const ACTIONS = [
  'Système de collecte et traitement des eaux pluviales et usées',
  'Déchets triés à la source — partenariat avec collecteurs agréés Kinshasa',
  'Réduction des plastiques à usage unique dans les terminaux d\'ici 2025',
  'Flotte de véhicules de piste : transition vers motorisation électrique',
  'Bâtiments : audit énergétique en cours, isolation renforcée',
  'Panneaux solaires : 500 kW installés sur terminal domestique (2023)',
  'Certification environnementale ACA (Airport Carbon Accreditation) en cours',
];

function EnvironnementPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('community.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('community.environmentSustainability')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('community.envSubtitle')}</p>

      {/* Goals */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GOALS.map(({ icon: Icon, label, desc, color }) => (
          <div key={label} className={`rounded-2xl border-2 border-current/20 p-5 ${color}`}>
            <Icon size={24} className="mb-3 opacity-80" />
            <p className="font-display font-bold text-lg">{label}</p>
            <p className="text-xs mt-1 opacity-70">{desc}</p>
          </div>
        ))}
      </div>

      {/* Habitats */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Leaf size={18} className="text-rdc-green" /> Protection des habitats naturels
      </h2>
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {HABITATS.map(h => (
          <div key={h.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-green/10">
              <h.icon size={18} className="text-rdc-green" />
            </div>
            <p className="font-semibold text-rdc-anthracite mb-2">{h.name}</p>
            <p className="text-xs text-muted-foreground">{h.desc}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Actions concrètes en cours</h2>
      <div className="rounded-2xl border border-border bg-card p-5">
        <ul className="space-y-2.5">
          {ACTIONS.map(a => (
            <li key={a} className="flex items-start gap-2 text-sm">
              <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-rdc-green" /> {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
