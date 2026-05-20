import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Construction, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/stationnement-transport/travaux')({
  component: TravauxPage,
  head: () => ({ meta: [{ title: "Travaux & Perturbations — Aéroport N'djili · FIH" }] }),
});

type Status = 'ongoing' | 'planned' | 'completed';

const WORKS: { title: string; zone: string; period: string; impact: string; status: Status }[] = [
  { title: 'Rénovation aile Est Terminal International', zone: 'T1 — Aile Est, Portes A5–A8', period: 'Mars–Août 2026', impact: 'Portes A5–A8 temporairement fermées. Report vers A1–A4.', status: 'ongoing' },
  { title: 'Réfection voie d\'accès principale',         zone: 'Boulevard Lumumba km 7–10',   period: 'Juin–Juillet 2026', impact: 'Circulation alternée les nuits de semaine 22h–5h.', status: 'planned' },
  { title: 'Mise à niveau système incendie T2',          zone: 'Terminal Domestique',          period: 'Janv.–Fév. 2026', impact: 'Aucun impact passagers.',                       status: 'completed' },
];

const STATUS_CONFIG: Record<Status, { label: string; icon: typeof AlertTriangle; color: string; bg: string }> = {
  ongoing:   { label: 'En cours',   icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  planned:   { label: 'Planifié',   icon: Calendar,      color: 'text-rdc-blue',   bg: 'bg-blue-50 border-blue-200'     },
  completed: { label: 'Terminé',    icon: CheckCircle,   color: 'text-rdc-green',  bg: 'bg-green-50 border-green-200'   },
};

function TravauxPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.parkingTransport')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('parking.works')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('stat.works.subtitle')}</p>

      <div className="space-y-4">
        {WORKS.map((w) => {
          const cfg = STATUS_CONFIG[w.status];
          const Icon = cfg.icon;
          return (
            <div key={w.title} className={cn('rounded-2xl border p-5', cfg.bg)}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3 flex-1">
                  <div className={cn('flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white')}>
                    <Construction size={18} className={cfg.color} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-rdc-anthracite">{w.title}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{w.zone}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={11} /> {w.period}
                    </div>
                    <p className="mt-2 text-sm text-foreground">{w.impact}</p>
                  </div>
                </div>
                <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold', cfg.bg, cfg.color)}>
                  <Icon size={11} /> {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
