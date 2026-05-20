import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Accessibility, Phone, Car, Heart, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/mobilite-reduite')({
  component: MobiliteReduitePage,
  head: () => ({ meta: [{ title: "Mobilité réduite & PMR — Aéroport N'djili · FIH" }] }),
});

const SERVICES = [
  { icon: Car,         titleKey: 'stat.pmr.parkingTitle',    descKey: 'stat.pmr.parkingDesc' },
  { icon: Accessibility, titleKey: 'stat.pmr.assistanceTitle', descKey: 'stat.pmr.assistanceDesc' },
  { icon: Heart,       titleKey: 'stat.pmr.medicalTitle',    descKey: 'stat.pmr.medicalDesc' },
  { icon: Phone,       titleKey: 'stat.pmr.contactTitle',    descKey: 'stat.pmr.contactDesc' },
];

function MobiliteReduitePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.reducedMobility')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.pmr.subtitle')}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.titleKey} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
              <s.icon size={22} className="text-teal-600" />
            </div>
            <h2 className="font-display font-semibold text-rdc-anthracite">{t(s.titleKey)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(s.descKey)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-teal-200 bg-teal-50 p-5">
        <h3 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
          <CheckCircle size={16} /> {t('stat.pmr.requestTitle')}
        </h3>
        <p className="text-sm text-teal-700">{t('stat.pmr.requestDesc')}</p>
        <a href="tel:+243810000000" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          <Phone size={14} /> {t('stat.pmr.callNow')}
        </a>
      </div>
    </div>
  );
}
