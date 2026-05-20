import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PlaneTakeoff, PlaneLanding, Building2, Bell, Clock, Map, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/vols/')({
  component: VolsHub,
  head: () => ({
    meta: [
      { title: "Vols — Aéroport International de N'djili · FIH" },
      { name: 'description', content: 'Informations vols en temps réel à l\'Aéroport International de N\'djili (FIH) : départs, arrivées, compagnies aériennes.' },
    ],
  }),
});

const CARDS = [
  { icon: PlaneTakeoff, href: '/vols/departs',              titleKey: 'flights.departures',   descKey: 'vols.hub.departuresDesc',   color: 'text-rdc-blue bg-rdc-blue/10' },
  { icon: PlaneLanding, href: '/vols/arrivees',             titleKey: 'flights.arrivals',      descKey: 'vols.hub.arrivalsDesc',     color: 'text-rdc-green bg-rdc-green/10' },
  { icon: Building2,    href: '/vols/compagnies-aeriennes', titleKey: 'flights.airlines',      descKey: 'vols.hub.airlinesDesc',     color: 'text-purple-600 bg-purple-50' },
  { icon: Bell,         href: '/vols/alertes-sms',          titleKey: 'flights.smsAlerts',     descKey: 'vols.hub.smsDesc',          color: 'text-amber-600 bg-amber-50' },
  { icon: Clock,        href: '/vols/temps-attente',        titleKey: 'flights.waitTimes',     descKey: 'vols.hub.waitTimesDesc',    color: 'text-orange-600 bg-orange-50' },
  { icon: Map,          href: '/vols/plans-aerogares',      titleKey: 'flights.terminalMaps',  descKey: 'vols.hub.mapsDesc',         color: 'text-rdc-anthracite bg-muted' },
];

function VolsHub() {
  const { t } = useTranslation();

  return (
    <div className="container py-10 md:py-14">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.flights')}</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-rdc-anthracite md:text-4xl">
          {t('vols.hub.title')}
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">{t('vols.hub.subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            to={c.href as never}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-rdc-blue/30"
          >
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${c.color}`}>
              <c.icon size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-rdc-anthracite">{t(c.titleKey)}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t(c.descKey)}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rdc-blue">
                {t('common.learnMore')} <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
