import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/vols/plans-aerogares')({
  component: PlansAerogares,
  head: () => ({
    meta: [
      { title: "Plans des aérogares — Aéroport N'djili · FIH" },
      { name: 'description', content: 'Plans interactifs des terminaux International et Domestique de l\'Aéroport International de N\'djili (FIH).' },
    ],
  }),
});

const TERMINALS = [
  { id: 'international', labelKey: 'flights.terminals.international' },
  { id: 'domestic',      labelKey: 'flights.terminals.domestic' },
];

const POI_CATEGORIES = [
  { id: 'gates',      labelKey: 'vols.plans.gates',        color: 'bg-rdc-blue' },
  { id: 'security',   labelKey: 'vols.plans.security',     color: 'bg-orange-500' },
  { id: 'customs',    labelKey: 'vols.plans.customs',      color: 'bg-purple-600' },
  { id: 'shops',      labelKey: 'vols.plans.shops',        color: 'bg-amber-500' },
  { id: 'restaurants',labelKey: 'vols.plans.restaurants',  color: 'bg-red-500' },
  { id: 'toilets',    labelKey: 'vols.plans.toilets',      color: 'bg-teal-500' },
  { id: 'atm',        labelKey: 'vols.plans.atm',          color: 'bg-green-600' },
  { id: 'pmr',        labelKey: 'vols.plans.pmr',          color: 'bg-blue-400' },
];

function PlansAerogares() {
  const { t } = useTranslation();
  const [terminal, setTerminal]   = useState('international');
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set(['gates', 'security']));
  const [zoom, setZoom]           = useState(1);

  function toggleCategory(id: string) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="container py-10 md:py-14">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <Map size={18} className="text-rdc-anthracite" />
          </div>
          <h1 className="font-display text-2xl font-bold text-rdc-anthracite md:text-3xl">
            {t('flights.terminalMaps')}
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{t('vols.plans.subtitle')}</p>
      </div>

      {/* Terminal switcher */}
      <div className="mb-6 flex gap-2">
        {TERMINALS.map((term) => (
          <button
            key={term.id}
            onClick={() => setTerminal(term.id)}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
              terminal === term.id
                ? 'border-rdc-blue bg-rdc-blue text-white'
                : 'border-border text-muted-foreground hover:border-rdc-blue/40 hover:text-foreground',
            )}
          >
            {t(term.labelKey)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Sidebar — POI filters */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {t('vols.plans.filters')}
          </p>
          <div className="space-y-1.5">
            {POI_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                  activeCategories.has(cat.id)
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50',
                )}
              >
                <span className={cn('h-2.5 w-2.5 flex-shrink-0 rounded-full', cat.color)} />
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 text-xs"
              asChild
            >
              <a href="/docs/plan-terminal-international-fih.pdf" download>
                <Download size={13} /> {t('vols.plans.downloadPdf')}
              </a>
            </Button>
          </div>
        </aside>

        {/* Map container */}
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-muted/40">
          {/* Zoom controls */}
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white shadow-sm hover:bg-muted"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white shadow-sm hover:bg-muted"
            >
              <ZoomOut size={15} />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white shadow-sm hover:bg-muted"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Placeholder — MapLibre will replace this in ÉTAPE 14 */}
          <div
            className="flex min-h-[520px] items-center justify-center transition-transform duration-300"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            <TerminalSvg terminal={terminal} activeCategories={activeCategories} />
          </div>
        </div>
      </div>

      {/* Note on MapLibre */}
      <p className="mt-4 text-xs text-muted-foreground">{t('vols.plans.mapNote')}</p>
    </div>
  );
}

/** Schematic SVG placeholder — replaced by MapLibre in phase 4 */
function TerminalSvg({ terminal, activeCategories }: { terminal: string; activeCategories: Set<string> }) {
  const { t } = useTranslation();
  const isInt = terminal === 'international';

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full max-w-3xl"
      role="img"
      aria-label={isInt ? 'Plan Terminal International FIH' : 'Plan Terminal Domestique FIH'}
    >
      {/* Terminal outline */}
      <rect x="60" y="60" width="680" height="380" rx="20" fill="#F7F7F2" stroke="#E2E8F0" strokeWidth="2" />

      {/* Concourse */}
      <rect x="100" y="200" width="600" height="80" rx="8" fill="#E2E8F0" />
      <text x="400" y="247" textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="Inter">
        {isInt ? 'Concourse International' : 'Concourse Domestique'}
      </text>

      {/* Gate blocks */}
      {(isInt ? ['A1','A2','A3','A4','B1','B2','B3'] : ['C1','C2','C3','C4']).map((gate, i, arr) => {
        const x = 120 + (i / (arr.length - 1)) * 560;
        return (
          <g key={gate}>
            <rect
              x={x - 20} y="100" width="40" height="90" rx="6"
              fill={activeCategories.has('gates') ? '#003DA5' : '#CBD5E1'}
              opacity="0.85"
            />
            <text x={x} y="153" textAnchor="middle" fontSize="11" fill="white" fontWeight="600" fontFamily="Inter">
              {gate}
            </text>
          </g>
        );
      })}

      {/* Security checkpoint */}
      {activeCategories.has('security') && (
        <g>
          <rect x="180" y="290" width="160" height="40" rx="6" fill="#f97316" opacity="0.8" />
          <text x="260" y="316" textAnchor="middle" fontSize="11" fill="white" fontWeight="600" fontFamily="Inter">
            {t('vols.plans.security')}
          </text>
        </g>
      )}

      {/* Customs */}
      {activeCategories.has('customs') && (
        <g>
          <rect x="460" y="290" width="160" height="40" rx="6" fill="#9333ea" opacity="0.8" />
          <text x="540" y="316" textAnchor="middle" fontSize="11" fill="white" fontWeight="600" fontFamily="Inter">
            {t('vols.plans.customs')}
          </text>
        </g>
      )}

      {/* Shops */}
      {activeCategories.has('shops') && (
        <>
          <rect x="130" y="360" width="100" height="50" rx="6" fill="#f59e0b" opacity="0.8" />
          <text x="180" y="391" textAnchor="middle" fontSize="10" fill="white" fontWeight="600" fontFamily="Inter">{t('vols.plans.shops')}</text>
        </>
      )}

      {/* ATM */}
      {activeCategories.has('atm') && (
        <>
          <circle cx="660" cy="375" r="22" fill="#16a34a" opacity="0.85" />
          <text x="660" y="380" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="Inter">ATM</text>
        </>
      )}

      {/* PMR */}
      {activeCategories.has('pmr') && (
        <>
          <circle cx="120" cy="375" r="22" fill="#60a5fa" opacity="0.85" />
          <text x="120" y="380" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="Inter">PMR</text>
        </>
      )}

      {/* North arrow */}
      <text x="740" y="100" textAnchor="middle" fontSize="18" fill="#64748b">↑ N</text>
    </svg>
  );
}
