import { createFileRoute, Link } from '@tanstack/react-router';
import { PlaneTakeoff, PlaneLanding, Building2, Bell, Clock, Map, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/vols/')({
  component: VolsHub,
  head: () => ({
    meta: [
      { title: "Vols — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Informations vols en temps réel à l'Aéroport International de N'djili (FIH) : départs, arrivées, compagnies aériennes." },
    ],
  }),
});

const SERVICES_DATA = [
  {
    icon: PlaneTakeoff,
    href: '/vols/departs',
    labelKey: 'flights.departures',
    descKey: 'vols.hub.departuresDesc',
    accent: '#003DA5',
  },
  {
    icon: PlaneLanding,
    href: '/vols/arrivees',
    labelKey: 'flights.arrivals',
    descKey: 'vols.hub.arrivalsDesc',
    accent: '#009A44',
  },
  {
    icon: Building2,
    href: '/vols/compagnies-aeriennes',
    labelKey: 'flights.airlines',
    descKey: 'vols.hub.airlinesDesc',
    accent: '#CE1126',
  },
  {
    icon: Bell,
    href: '/vols/alertes-whatsapp',
    labelKey: 'flights.smsAlerts',
    descKey: 'vols.hub.smsDesc',
    accent: '#FFCE00',
  },
  {
    icon: Clock,
    href: '/vols/temps-attente',
    labelKey: 'flights.waitTimes',
    descKey: 'vols.hub.waitTimesDesc',
    accent: '#003DA5',
  },
  {
    icon: Map,
    href: '/vols/plans-aerogares',
    labelKey: 'flights.terminalMaps',
    descKey: 'vols.hub.mapsDesc',
    accent: '#1A1A1A',
  },
] as const;

const AIRLINES = [
  'Brussels Airlines', 'Air France', 'Ethiopian Airlines', 'Kenya Airways',
  'Congo Airways', 'Qatar Airways', 'Turkish Airlines', 'Royal Air Maroc',
  'EgyptAir', 'RwandAir', 'ASKY', 'South African Airways',
];

function VolsHub() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t('vols.hub.title')}
        title={t('vols.hub.title')}
        subtitle={t('vols.hub.subtitle')}
        breadcrumbs={[{ label: t('home.hero.cta'), href: '/' }, { label: t('nav.flights') }]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/vols/departs' as never} className="btn-primary">
              <PlaneTakeoff size={15} /> {t('flights.departures')}
            </Link>
            <Link to={'/vols/arrivees' as never} className="btn-outline-white">
              <PlaneLanding size={15} /> {t('flights.arrivals')}
            </Link>
          </div>
        }
      />

      {/* Services grid */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Services vols</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-12">
            Tout ce dont vous avez besoin
          </h2>

          <div className="grid gap-0.5 bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((s) => (
              <Link
                key={s.href}
                to={s.href as never}
                className="group relative bg-white p-8 flex flex-col gap-5 overflow-hidden hover:bg-rdc-blue/2 transition-colors"
              >
                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: s.accent }}
                />

                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}
                >
                  <s.icon size={22} style={{ color: s.accent }} strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-rdc-anthracite text-lg leading-snug group-hover:text-rdc-blue transition-colors">
                    {t(s.labelKey)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(s.descKey)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-rdc-blue">
                  {t('common.learnMore')}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Airlines strip */}
      <section className="section-night py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-yellow">Compagnies partenaires</p>
              </div>
              <h2 className="display-sub text-white">Desservant Kinshasa</h2>
            </div>
            <Link
              to={'/vols/compagnies-aeriennes' as never}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors group"
            >
              {t('flights.airlines')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-px bg-white/8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {AIRLINES.map((airline) => (
              <div
                key={airline}
                className="bg-rdc-anthracite px-5 py-5 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <span className="text-xs font-bold text-white/50 text-center leading-tight">
                  {airline}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:hidden text-center">
            <Link
              to={'/vols/compagnies-aeriennes' as never}
              className="inline-flex items-center gap-2 text-sm font-bold text-white"
            >
              {t('flights.airlines')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="section-blue py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
            {[
              { value: '14+', label: 'Compagnies aériennes' },
              { value: '40+', label: 'Destinations directes' },
              { value: '24/7', label: 'Opérations aéroportuaires' },
              { value: '2M+', label: 'Passagers par an' },
            ].map((s) => (
              <div key={s.label} className="bg-rdc-blue/20 px-8 py-10 text-center">
                <p className="stat-number text-white">{s.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
