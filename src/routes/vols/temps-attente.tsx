import { createFileRoute } from '@tanstack/react-router';
import { Clock, RefreshCw, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHero } from '@/components/ui/page-hero';
import { useWaitTimes } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { WaitTime } from '@/types/database';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/vols/temps-attente')({
  component: TempsAttentePage,
  head: () => ({
    meta: [
      { title: "Temps d'attente — Aéroport N'djili · FIH" },
      { name: 'description', content: "Temps d'attente estimés aux postes de sécurité, immigration et douanes de FIH." },
    ],
  }),
});

type WaitLevel = 'low' | 'medium' | 'high' | 'closed';

function toLevel(w: WaitTime): WaitLevel {
  if (w.status === 'closed') return 'closed';
  if (w.status === 'light')  return 'low';
  if (w.status === 'normal' || w.status === 'moderate') return 'medium';
  return 'high';
}

const LEVEL: Record<WaitLevel, { bar: string; badge: string; text: string; label: string }> = {
  low:    { bar: 'bg-rdc-green', badge: 'bg-rdc-green/10 text-rdc-green',  text: 'text-rdc-green',  label: 'Faible'  },
  medium: { bar: 'bg-amber-400', badge: 'bg-amber-50 text-amber-600',       text: 'text-amber-600',  label: 'Modéré'  },
  high:   { bar: 'bg-rdc-red',   badge: 'bg-red-50 text-rdc-red',           text: 'text-rdc-red',    label: 'Élevé'   },
  closed: { bar: 'bg-gray-300',  badge: 'bg-gray-100 text-gray-500',        text: 'text-gray-400',   label: 'Fermé'   },
};

const CP: Record<WaitTime['checkpoint_type'], { label: string; desc: string }> = {
  security_intl:         { label: 'Sûreté — International', desc: 'Contrôle des bagages et des passagers' },
  security_dom:          { label: 'Sûreté — Domestique',    desc: 'Contrôle des bagages et des passagers' },
  immigration_arrival:   { label: 'Immigration Arrivées',   desc: "Contrôle des passeports à l'arrivée" },
  immigration_departure: { label: 'Immigration Départs',    desc: 'Contrôle des passeports au départ' },
  customs:               { label: 'Douanes (DGDA)',          desc: 'Direction Générale des Douanes' },
  pcr_test:              { label: 'Test PCR / Santé',        desc: 'Contrôle sanitaire et vaccinations' },
  vaccination_check:     { label: 'Contrôle vaccination',   desc: 'Carnet jaune et documents sanitaires' },
};

function TempsAttentePage() {
  const { t } = useTranslation();
  const { data = [], isLoading, refetch, isFetching, dataUpdatedAt } = useWaitTimes();

  const updatedAt  = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;
  const terminals  = [...new Set(data.map((w) => w.terminal ?? 'international'))];
  const totalMin   = data.filter(w => w.status !== 'closed').reduce((s, w) => s + (w.estimated_minutes ?? 0), 0);
  const openCount  = data.filter(w => w.status !== 'closed').length;

  return (
    <main id="main-content">

      <PageHero
        eyebrow={t('nav.flights')}
        title={t('flights.waitTimes')}
        subtitle={t('vols.waitTimes.subtitle')}
        image="/images/fih-checkin.jpg"
        breadcrumbs={[
          { label: t('home.hero.cta'), href: '/' },
          { label: t('nav.flights') },
          { label: t('flights.waitTimes') },
        ]}
      />

      <div className="container py-10 md:py-14">

        {/* Barre de synthèse */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Clock size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Passage estimé total</p>
                <p className="font-display text-2xl font-bold text-rdc-anthracite">
                  {isLoading ? '—' : `${totalMin} min`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rdc-green/10">
                <CheckCircle2 size={20} className="text-rdc-green" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Postes ouverts</p>
                <p className="font-display text-2xl font-bold text-rdc-anthracite">
                  {isLoading ? '—' : `${openCount} / ${data.length}`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden flex-wrap gap-3 md:flex">
              {(Object.entries(LEVEL) as [WaitLevel, typeof LEVEL[WaitLevel]][]).map(([key, s]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs">
                  <span className={cn('h-2 w-2 rounded-full', s.bar)} />
                  <span className="text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
            {updatedAt && <span className="text-xs text-muted-foreground">MAJ {updatedAt}</span>}
            <button
              onClick={() => void refetch()}
              disabled={isFetching}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:border-rdc-blue/40 hover:text-rdc-blue disabled:opacity-40"
            >
              <RefreshCw size={11} className={isFetching ? 'animate-spin' : ''} />
              {t('common.retry')}
            </button>
          </div>
        </div>

        {/* Contenu */}
        {isLoading ? (
          <div className="space-y-10">
            {[1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="mb-5 h-5 w-48" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((j) => <Skeleton key={j} className="h-40 rounded-2xl" />)}
                </div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <AlertTriangle size={36} className="text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">{t('vols.waitTimes.noData')}</p>
            <p className="text-xs text-muted-foreground">Consultez les agents RVA sur place pour les temps d'attente.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {terminals.map((terminal) => {
              const checkpoints = data.filter((w) => (w.terminal ?? 'international') === terminal);
              return (
                <section key={terminal}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="accent-line" />
                    <p className="eyebrow text-rdc-blue">
                      {terminal === 'international' ? 'Terminal International' : 'Terminal Domestique'}
                    </p>
                  </div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">
                    {terminal === 'international' ? 'Postes internationaux' : 'Postes domestiques'}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {checkpoints.map((w) => {
                      const mins  = w.estimated_minutes ?? 0;
                      const level = toLevel(w);
                      const s     = LEVEL[level];
                      const pct   = Math.min(100, Math.round((mins / 60) * 100));
                      const info  = CP[w.checkpoint_type] ?? { label: w.checkpoint_type, desc: '' };
                      return (
                        <div key={w.id} className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
                          <div className="mb-4 flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-rdc-anthracite">{info.label}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">{info.desc}</p>
                            </div>
                            <span className={cn('shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold', s.badge)}>
                              {s.label}
                            </span>
                          </div>
                          <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div className={cn('h-full rounded-full transition-all duration-700', s.bar)}
                              style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              {level === 'closed'
                                ? <p className="font-display text-2xl font-bold text-gray-400">—</p>
                                : <>
                                    <p className={cn('font-display text-3xl font-bold leading-none', s.text)}>{mins}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">minutes</p>
                                  </>
                              }
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              {w.status === 'closed'
                                ? <><XCircle size={13} className="text-red-400" /><span className="text-red-400">{t('vols.waitTimes.closed')}</span></>
                                : <><CheckCircle2 size={13} className="text-rdc-green" /><span className="text-rdc-green">{t('vols.waitTimes.open')}</span></>
                              }
                            </div>
                          </div>
                          <p className="mt-3 text-[10px] text-muted-foreground">
                            Mis à jour {new Date(w.updated_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
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

        {/* Conseil */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-2 font-semibold text-amber-900">💡 Conseil voyageur</p>
          <p className="text-sm leading-relaxed text-amber-800">
            Présentez-vous au minimum <strong>3 heures</strong> avant le départ pour les vols internationaux
            et <strong>2 heures</strong> pour les vols domestiques. N'oubliez pas votre{' '}
            <strong>carnet de vaccination (fièvre jaune obligatoire)</strong> et tous vos documents de voyage.
          </p>
        </div>
      </div>
    </main>
  );
}
