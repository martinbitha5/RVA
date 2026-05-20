import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plane, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAirlines } from '@/lib/queries';

export const Route = createFileRoute('/vols/compagnies-aeriennes')({
  component: CompagniesPage,
  head: () => ({
    meta: [
      { title: "Compagnies aériennes — Aéroport N'djili · FIH" },
      { name: 'description', content: '17 compagnies aériennes opèrent à l\'Aéroport International de N\'djili (FIH) : Congo Airways, Ethiopian Airlines, Brussels Airlines, Air France et bien d\'autres.' },
    ],
  }),
});

function CompagniesPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { data: airlines = [], isLoading } = useAirlines();

  const filtered = airlines.filter((a) =>
    search === '' ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.iata_code.toLowerCase().includes(search.toLowerCase()),
  );

  const hub = filtered.filter((a) => a.hub_at_fih);
  const others = filtered.filter((a) => !a.hub_at_fih);

  return (
    <div className="container py-10 md:py-14">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('nav.flights')}</p>
        <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl">
          {t('flights.airlines')}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('vols.airlines.subtitle')}</p>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('vols.airlines.searchPlaceholder')}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {/* Hub airlines */}
          {hub.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t('vols.airlines.hub')}
              </h2>
              <AirlineGrid airlines={hub} />
            </section>
          )}

          {/* All others */}
          {others.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t('vols.airlines.international')}
              </h2>
              <AirlineGrid airlines={others} />
            </section>
          )}

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              {t('common.noResults')}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function AirlineGrid({ airlines }: { airlines: import('@/types/database').Airline[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {airlines.map((airline) => (
        <Link
          key={airline.id}
          to={`/vols/compagnies-aeriennes/${airline.slug}` as never}
          className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-rdc-blue/30 hover:shadow-md"
        >
          {/* Logo or fallback */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-white">
            {airline.logo_url ? (
              <img
                src={airline.logo_url}
                alt={airline.name}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Plane size={20} className="text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-rdc-anthracite text-sm">{airline.name}</p>
            <p className="text-xs text-muted-foreground">
              {airline.iata_code}
              {airline.icao_code ? ` · ${airline.icao_code}` : ''}
            </p>
            {airline.hub_at_fih && (
              <span className="mt-1 inline-block rounded-full bg-rdc-blue/10 px-2 py-0.5 text-[10px] font-semibold text-rdc-blue">
                Hub FIH
              </span>
            )}
          </div>

          <ExternalLink size={14} className="flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      ))}
    </div>
  );
}
