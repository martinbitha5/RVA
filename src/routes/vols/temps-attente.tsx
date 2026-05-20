import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Clock, RefreshCw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useWaitTimes } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { WaitTime } from '@/types/database';

export const Route = createFileRoute('/vols/temps-attente')({
  component: TempsAttentePage,
  head: () => ({
    meta: [
      { title: "Temps d'attente — Aéroport N'djili · FIH" },
      { name: 'description', content: "Temps d'attente estimés aux postes de sécurité, immigration et douanes de l'Aéroport International de N'djili." },
    ],
  }),
});

type WaitLevel = 'low' | 'medium' | 'high' | 'closed';

function toLevel(w: WaitTime): WaitLevel {
  if (w.status === 'closed') return 'closed';
  if (w.status === 'light') return 'low';
  if (w.status === 'normal' || w.status === 'moderate') return 'medium';
  return 'high'; // busy | very_busy
}

const LEVEL_STYLES: Record<WaitLevel, { bar: string; text: string; label: string }> = {
  low:    { bar: 'bg-rdc-green',  text: 'text-rdc-green',  label: 'Faible'  },
  medium: { bar: 'bg-amber-400',  text: 'text-amber-600',  label: 'Modéré'  },
  high:   { bar: 'bg-rdc-red',    text: 'text-rdc-red',    label: 'Élevé'   },
  closed: { bar: 'bg-gray-300',   text: 'text-gray-500',   label: 'Fermé'   },
};

const CHECKPOINT_LABELS: Record<WaitTime['checkpoint_type'], string> = {
  security_intl:          'Sûreté — International',
  security_dom:           'Sûreté — Domestique',
  immigration_arrival:    'Immigration Arrivées',
  immigration_departure:  'Immigration Départs',
  customs:                'Douanes (DGDA)',
  pcr_test:               'Test PCR / Santé',
  vaccination_check:      'Contrôle vaccination',
};

function TempsAttentePage() {
  const { t } = useTranslation();
  const { data = [], isLoading, refetch, isFetching } = useWaitTimes();

  const terminals = [...new Set(data.map((w) => w.terminal ?? 'international'))];

  return (
    <div className="container py-10 md:py-14">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
              <Clock size={18} className="text-orange-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-rdc-anthracite md:text-3xl">
              {t('flights.waitTimes')}
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t('vols.waitTimes.subtitle')}</p>
        </div>

        <button
          onClick={() => void refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw size={12} className={isFetching ? 'animate-spin' : ''} />
          {t('common.retry')}
        </button>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        {(Object.entries(LEVEL_STYLES) as [WaitLevel, typeof LEVEL_STYLES[WaitLevel]][]).map(([key, s]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <span className={cn('h-2.5 w-2.5 rounded-full', s.bar)} />
            <span className={s.text}>{s.label}</span>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {[1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="mb-4 h-5 w-40" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-28 rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <AlertTriangle size={32} className="text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">{t('vols.waitTimes.noData')}</p>
        </div>
      ) : (
        <div className="space-y-10">
          {terminals.map((terminal) => {
            const checkpoints = data.filter((w) => (w.terminal ?? 'international') === terminal);
            return (
              <section key={terminal}>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {terminal === 'international'
                    ? t('flights.terminals.international')
                    : t('flights.terminals.domestic')}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {checkpoints.map((w) => {
                    const mins   = w.estimated_minutes;
                    const level  = toLevel(w);
                    const style  = LEVEL_STYLES[level];
                    const pct    = Math.min(100, Math.round((mins / 60) * 100));
                    const label  = CHECKPOINT_LABELS[w.checkpoint_type] ?? w.checkpoint_type;

                    return (
                      <div key={w.id} className="rounded-2xl border border-border bg-card p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="font-semibold text-rdc-anthracite text-sm">{label}</p>
                          <span className={cn('text-xs font-semibold', style.text)}>
                            {style.label}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn('h-full rounded-full transition-all duration-500', style.bar)}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className={cn('text-2xl font-bold', style.text)}>{mins}</p>
                            <p className="text-xs text-muted-foreground">{t('common.minutes')}</p>
                          </div>
                          <span className={cn(
                            'rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                            w.status === 'closed'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-rdc-green/10 text-rdc-green',
                          )}>
                            {w.status === 'closed' ? t('vols.waitTimes.closed') : t('vols.waitTimes.open')}
                          </span>
                        </div>

                        <p className="mt-2 text-[10px] text-muted-foreground">
                          MAJ {new Date(w.updated_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
