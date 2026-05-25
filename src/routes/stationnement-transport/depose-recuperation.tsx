import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  PlaneTakeoff, PlaneLanding, Clock, MapPin,
  AlertTriangle, CheckCircle2, Car, ArrowRight,
  Navigation, ShieldCheck,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/stationnement-transport/depose-recuperation')({
  component: DeposeRecuperationPage,
  head: () => ({
    meta: [
      { title: "DÃ©pose & RÃ©cupÃ©ration â€” AÃ©roport N'djili Â· FIH" },
      { name: 'description', content: "Zones de dÃ©pose-minute et de rÃ©cupÃ©ration des passagers Ã  l'AÃ©roport International de N'djili (FIH). Instructions Ã©tape par Ã©tape." },
    ],
  }),
});

function DeposeRecuperationPage() {
  const { t } = useTranslation();

  const deposSteps = [
    { step: '01', title: t('stat.dropoff.deposStep1'), desc: t('stat.dropoff.deposStep1Desc') },
    { step: '02', title: t('stat.dropoff.deposStep2'), desc: t('stat.dropoff.deposStep2Desc') },
    { step: '03', title: t('stat.dropoff.deposStep3'), desc: t('stat.dropoff.deposStep3Desc') },
  ];

  const pickupSteps = [
    { step: '01', title: t('stat.dropoff.pickupStep1'), desc: t('stat.dropoff.pickupStep1Desc') },
    { step: '02', title: t('stat.dropoff.pickupStep2'), desc: t('stat.dropoff.pickupStep2Desc') },
    { step: '03', title: t('stat.dropoff.pickupStep3'), desc: t('stat.dropoff.pickupStep3Desc') },
  ];

  const rules = [
    { icon: AlertTriangle, accent: 'text-amber-500', bg: 'bg-amber-50 border-amber-200', text: t('stat.dropoff.rule1') },
    { icon: Car,           accent: 'text-rdc-blue',  bg: 'bg-blue-50 border-blue-200',   text: t('stat.dropoff.rule2') },
    { icon: CheckCircle2,  accent: 'text-rdc-green', bg: 'bg-green-50 border-green-200', text: t('stat.dropoff.rule3') },
    { icon: ShieldCheck,   accent: 'text-rdc-blue',  bg: 'bg-blue-50 border-blue-200',   text: t('stat.dropoff.rule4') },
  ];

  return (
    <main id="main-content">

      <PageHero
        eyebrow={t('nav.parkingTransport')}
        title={t('parking.dropOff')}
        subtitle={t('stat.dropoff.subtitle')}
        image="/images/fih-tarmac.jpg"
        breadcrumbs={[
          { label: t('home.hero.cta'), href: '/' },
          { label: t('nav.parkingTransport'), href: '/stationnement-transport' },
          { label: t('parking.dropOff') },
        ]}
      />

      {/* â”€â”€ Stats rapides â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="border-b border-border bg-white">
        <div className="container">
          <div className="grid grid-cols-3 divide-x divide-border">
            {[
              { value: t('stat.dropoff.stat15min'), label: t('stat.dropoff.stat15minLabel'), color: 'text-rdc-blue' },
              { value: t('stat.dropoff.stat30min'), label: t('stat.dropoff.stat30minLabel'), color: 'text-rdc-green' },
              { value: t('stat.dropoff.stat3lanes'), label: t('stat.dropoff.stat3lanesLabel'), color: 'text-rdc-blue' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-6 text-center">
                <span className={`font-display text-2xl font-black md:text-3xl ${s.color}`}>{s.value}</span>
                <span className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-14 md:py-20 space-y-20">

        {/* â”€â”€ Section 1 : DÃ©pose-minute â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/fih-checkin.jpg"
                alt="Zone de dÃ©pose devant le Terminal International"
                className="h-72 w-full object-cover lg:h-[420px]"
              />
              {/* Badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-rdc-blue px-4 py-2 text-sm font-semibold text-white shadow">
                <PlaneTakeoff size={15} />
                {t('stat.dropoff.deposTitle')}
              </div>
              {/* Info superposÃ©e */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-10">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <MapPin size={13} className="text-rdc-yellow" />
                    <span>{t('stat.dropoff.deposZoneDesc')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <Clock size={13} className="text-rdc-yellow" />
                    <span>{t('stat.dropoff.deposTime')} : 15 min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-blue">{t('flights.departures')}</p>
              </div>
              <h2 className="font-display mb-3 text-2xl font-bold text-rdc-anthracite md:text-3xl">
                {t('stat.dropoff.deposTitle')}
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                {t('stat.dropoff.deposIntro')}
              </p>

              {/* Ã‰tapes */}
              <div className="space-y-5">
                {deposSteps.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rdc-blue/10 font-display text-sm font-black text-rdc-blue">
                      {s.step}
                    </div>
                    <div className="pt-1.5">
                      <p className="mb-0.5 text-sm font-semibold text-rdc-anthracite">{s.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alerte */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
                <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-600" />
                <p className="text-sm text-amber-700">{t('stat.dropoff.deposAlert')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Section 2 : RÃ©cupÃ©ration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* Contenu â€” Ã  gauche sur lg */}
            <div className="lg:order-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-green">{t('flights.arrivals')}</p>
              </div>
              <h2 className="font-display mb-3 text-2xl font-bold text-rdc-anthracite md:text-3xl">
                {t('stat.dropoff.pickupTitle')}
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                {t('stat.dropoff.pickupIntro')}
              </p>

              {/* Ã‰tapes */}
              <div className="space-y-5">
                {pickupSteps.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rdc-green/10 font-display text-sm font-black text-rdc-green">
                      {s.step}
                    </div>
                    <div className="pt-1.5">
                      <p className="mb-0.5 text-sm font-semibold text-rdc-anthracite">{s.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info parking gratuit */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-rdc-green" />
                <p className="text-sm text-green-700">{t('stat.dropoff.pickupTimeDesc')}</p>
              </div>
            </div>

            {/* Image â€” Ã  droite sur lg */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg lg:order-2">
              <img
                src="/images/fih-bagages.jpg"
                alt="Hall ArrivÃ©es et rÃ©cupÃ©ration des bagages"
                className="h-72 w-full object-cover lg:h-[420px]"
              />
              {/* Badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-rdc-green px-4 py-2 text-sm font-semibold text-white shadow">
                <PlaneLanding size={15} />
                {t('stat.dropoff.pickupTitle')}
              </div>
              {/* Info superposÃ©e */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-10">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <MapPin size={13} className="text-rdc-yellow" />
                    <span>{t('stat.dropoff.pickupZoneDesc')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <Clock size={13} className="text-rdc-yellow" />
                    <span>{t('stat.dropoff.pickupTime')} : 30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Section 3 : RÃ¨gles importantes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section>
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">{t('stat.dropoff.rulesTitle')}</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">
            {t('stat.dropoff.rulesTitle')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {rules.map((r, i) => (
              <div key={i} className={`flex items-start gap-4 rounded-xl border p-5 ${r.bg}`}>
                <r.icon size={18} className={`mt-0.5 shrink-0 ${r.accent}`} />
                <p className="text-sm leading-relaxed text-rdc-anthracite">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* â”€â”€ Section 4 : CTA Parking â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="overflow-hidden rounded-2xl bg-rdc-anthracite">
          <div className="grid lg:grid-cols-2">
            {/* Texte */}
            <div className="flex flex-col justify-center px-8 py-10 lg:px-12">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rdc-yellow">
                {t('nav.parkingTransport')}
              </p>
              <h3 className="font-display mb-3 text-2xl font-bold text-white">
                {t('stat.dropoff.needParking')}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                {t('stat.dropoff.deposTimeDesc')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={'/stationnement-transport/formulaire' as never}
                  className="flex items-center gap-2 rounded-xl bg-rdc-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rdc-blue/85"
                >
                  <Car size={15} />
                  {t('parking.parkingFih')}
                </Link>
                <Link
                  to={'/stationnement-transport/offres' as never}
                  className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t('parking.offers')} <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Image dÃ©corative */}
            <div className="hidden lg:block">
              <img
                src="/images/fih-bus-cobus.jpg"
                alt="Transport aÃ©roport"
                className="h-full w-full object-cover opacity-40"
              />
            </div>
          </div>
        </section>

        {/* â”€â”€ Section 5 : Liens connexes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { to: '/stationnement-transport/taxis', icon: Navigation, label: t('parking.taxis'), desc: 'Taxis officiels agrÃ©Ã©s RVA' },
              { to: '/stationnement-transport/mobilite-reduite', icon: CheckCircle2, label: t('parking.pmr'), desc: 'Assistance personnes Ã  mobilitÃ© rÃ©duite' },
              { to: '/vols/arrivees', icon: PlaneLanding, label: t('flights.arrivals'), desc: 'Tableau des arrivÃ©es en temps rÃ©el' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to as never}
                className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:border-rdc-blue/30 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rdc-blue/8 text-rdc-blue transition-colors group-hover:bg-rdc-blue group-hover:text-white">
                  <link.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="mb-0.5 text-sm font-semibold text-rdc-anthracite">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
                <ArrowRight size={14} className="mt-1 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-rdc-blue" />
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
