import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Building2, Scale, Rocket, History, Briefcase,
  Handshake, Plane, Shield,
} from 'lucide-react';

export const Route = createFileRoute('/corporate/')({
  component: CorporateHub,
  head: () => ({ meta: [
    { title: "Corporate — Régie des Voies Aériennes · FIH" },
    { name: 'description', content: 'Informations institutionnelles sur la Régie des Voies Aériennes (RVA), gestionnaire de l\'Aéroport International de N\'djili (FIH), Kinshasa, RDC.' },
  ]}),
});

const CARDS = [
  { key: 'about',           href: '/corporate/a-propos',              Icon: Building2,  color: 'bg-rdc-blue/10 text-rdc-blue' },
  { key: 'governance',      href: '/corporate/gouvernance',           Icon: Scale,      color: 'bg-slate-100 text-slate-600' },
  { key: 'futureProjects',  href: '/corporate/projets-avenir',        Icon: Rocket,     color: 'bg-rdc-yellow/20 text-rdc-anthracite' },
  { key: 'history',         href: '/corporate/historique',            Icon: History,    color: 'bg-amber-100 text-amber-700' },
  { key: 'careers',         href: '/corporate/carriere',              Icon: Briefcase,  color: 'bg-rdc-green/10 text-rdc-green' },
  { key: 'partnerships',    href: '/corporate/partenariats-commerciaux', Icon: Handshake, color: 'bg-purple-100 text-purple-700' },
  { key: 'airServices',     href: '/corporate/services-aeriens',      Icon: Plane,      color: 'bg-cyan-100 text-cyan-700' },
  { key: 'safetyAndSecurity',href: '/corporate/surete-securite',      Icon: Shield,     color: 'bg-rdc-red/10 text-rdc-red' },
] as const;

function CorporateHub() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.hubTitle')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.hubSubtitle')}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARDS.map(({ key, href, Icon, color }) => (
          <Link key={key} to={href as never}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-rdc-blue/30 transition-all">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`corporate.${key}`)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{t(`corporate.${key}Desc`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
