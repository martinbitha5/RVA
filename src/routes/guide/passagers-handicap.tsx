import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Accessibility, Phone, CheckCircle, Clock } from 'lucide-react';

export const Route = createFileRoute('/guide/passagers-handicap')({
  component: PassagersHandicapPage,
  head: () => ({ meta: [{ title: "Assistance PMR — Passagers à mobilité réduite · FIH" }] }),
});

const SERVICES = [
  { title: 'Assistance fauteuil roulant',   desc: 'Mise à disposition de fauteuils roulants et d\'agents d\'assistance depuis la voiture jusqu\'à l\'avion.' },
  { title: 'File d\'attente prioritaire',   desc: 'Comptoir d\'enregistrement dédié PMR et accès prioritaire aux contrôles de sécurité.' },
  { title: 'Embarquement et débarquement',  desc: 'Assistance à l\'embarquement avec lift ou rampe, et accompagnement lors du débarquement.' },
  { title: 'Transport tarmac',              desc: 'Véhicule adapté pour rejoindre l\'avion sans passer par les passerelles.' },
  { title: 'Sanitaires adaptés PMR',        desc: 'Toilettes accessibles dans les deux terminaux, signalisation en braille.' },
  { title: 'Assistance chien guide',        desc: 'Accueil des chiens guides d\'aveugles selon les conditions sanitaires en vigueur.' },
];

const CATEGORIES_PMR = [
  { code: 'WCHR', label: 'Peut marcher, ne monte pas les escaliers', color: 'bg-blue-100 text-blue-700' },
  { code: 'WCHS', label: 'Peut marcher, ne monte ni les escaliers ni des distances',  color: 'bg-amber-100 text-amber-700' },
  { code: 'WCHC', label: 'Ne peut pas marcher — fauteuil roulant requis partout',      color: 'bg-rdc-red/10 text-rdc-red' },
  { code: 'BLND', label: 'Passager malvoyant ou aveugle',             color: 'bg-purple-100 text-purple-700' },
  { code: 'DEAF', label: 'Passager malentendant ou sourd',            color: 'bg-cyan-100 text-cyan-700' },
];

function PassagersHandicapPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.disabledPassengers')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('guide.disabledSubtitle')}</p>

      {/* Reservation notice */}
      <div className="mb-8 rounded-2xl border-2 border-rdc-blue/30 bg-rdc-blue/5 p-5 flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-rdc-blue">
          <Accessibility size={20} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-rdc-anthracite mb-1">{t('guide.pmrPrenotify')}</p>
          <p className="text-sm text-muted-foreground">{t('guide.pmrPrenotifyDesc')}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href="tel:+243810000000" className="flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:underline">
              <Phone size={13} /> +243 81 XXX XXXX
            </a>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={11} /> 24h/24, 7j/7
            </span>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite">Services disponibles</h2>
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(s => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-5">
            <CheckCircle size={15} className="mb-2 text-rdc-green" />
            <p className="font-semibold text-sm text-rdc-anthracite mb-1">{s.title}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* SSR codes */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Codes de réservation spéciaux (SSR)</h2>
      <p className="mb-4 text-sm text-muted-foreground">{t('guide.ssrDesc')}</p>
      <div className="space-y-2.5">
        {CATEGORIES_PMR.map(c => (
          <div key={c.code} className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3">
            <span className={`rounded-lg px-2.5 py-1 text-xs font-bold font-mono ${c.color}`}>{c.code}</span>
            <p className="text-sm">{c.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{t('guide.ssrNote')}</p>
    </div>
  );
}
