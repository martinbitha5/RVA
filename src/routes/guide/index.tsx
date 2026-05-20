import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  PlaneTakeoff, PlaneLanding, Shield, Stethoscope, Wifi,
  Banknote, PackageSearch, Accessibility, Shuffle, Sparkles, ScrollText, Users,
} from 'lucide-react';

export const Route = createFileRoute('/guide/')({
  component: GuideHub,
  head: () => ({ meta: [
    { title: "Guide de l'Aéroport — N'djili · FIH" },
    { name: 'description', content: 'Tout ce qu\'il faut savoir avant, pendant et après votre passage à l\'Aéroport International de N\'djili (FIH), Kinshasa.' },
  ]}),
});

const CARDS = [
  { key: 'leavingKinshasa',    href: '/guide/quitter-kinshasa',     Icon: PlaneTakeoff,  color: 'bg-rdc-blue/10 text-rdc-blue' },
  { key: 'fihExpress',         href: '/guide/fih-express',          Icon: Sparkles,      color: 'bg-rdc-yellow/20 text-rdc-anthracite' },
  { key: 'luggageSecurity',    href: '/guide/securite-bagages',     Icon: Shield,        color: 'bg-rdc-red/10 text-rdc-red' },
  { key: 'arrivingKinshasa',   href: '/guide/atterrir-kinshasa',    Icon: PlaneLanding,  color: 'bg-rdc-green/10 text-rdc-green' },
  { key: 'customsImmigration', href: '/guide/douanes-immigration',  Icon: ScrollText,    color: 'bg-slate-100 text-slate-600' },
  { key: 'connections',        href: '/guide/correspondances',      Icon: Shuffle,       color: 'bg-indigo-100 text-indigo-600' },
  { key: 'health',             href: '/guide/sante',                Icon: Stethoscope,   color: 'bg-rose-100 text-rose-600' },
  { key: 'wifiConnectivity',   href: '/guide/wifi-connectivite',    Icon: Wifi,          color: 'bg-cyan-100 text-cyan-600' },
  { key: 'bankingServices',    href: '/guide/services-bancaires',   Icon: Banknote,      color: 'bg-emerald-100 text-emerald-700' },
  { key: 'lostFound',          href: '/guide/objets-trouves',       Icon: PackageSearch, color: 'bg-amber-100 text-amber-600' },
  { key: 'unaccompaniedMinors',href: '/guide/passagers-mineurs',    Icon: Users,         color: 'bg-purple-100 text-purple-600' },
  { key: 'disabledPassengers', href: '/guide/passagers-handicap',   Icon: Accessibility, color: 'bg-rdc-blue/10 text-rdc-blue' },
] as const;

function GuideHub() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.hubTitle')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('guide.hubSubtitle')}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARDS.map(({ key, href, Icon, color }) => (
          <Link key={key} to={href as never}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-rdc-blue/30 transition-all">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`guide.${key}`)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{t(`guide.${key}Desc`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
