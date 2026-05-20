import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Plane, Globe, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { FlightTable } from '@/components/flights/FlightTable';
import { useAirlineBySlug, useAirlineFlights } from '@/lib/queries';

export const Route = createFileRoute('/vols/compagnies-aeriennes/$slug')({
  component: AirlinePage,
});

function AirlinePage() {
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const { data: airline, isLoading } = useAirlineBySlug(slug);
  const { data: flights = [], isLoading: flightsLoading } = useAirlineFlights(airline?.id ?? '');

  const departures = flights.filter((f) => f.type === 'departure');
  const arrivals   = flights.filter((f) => f.type === 'arrival');

  const description = i18n.language === 'fr'
    ? airline?.description_fr
    : (airline?.description_en ?? airline?.description_fr);

  if (isLoading) return <AirlineSkeleton />;

  if (!airline) {
    return (
      <div className="container py-20 text-center">
        <p className="text-sm text-muted-foreground">{t('common.noResults')}</p>
        <Link to="/vols/compagnies-aeriennes" className="mt-4 inline-block text-sm text-rdc-blue hover:underline">
          ← {t('flights.airlines')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      {/* Breadcrumb */}
      <Link
        to="/vols/compagnies-aeriennes"
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rdc-blue"
      >
        <ChevronLeft size={14} /> {t('flights.airlines')}
      </Link>

      {/* Airline header */}
      <div className="mb-10 flex flex-wrap items-start gap-6">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-white shadow-sm">
          {airline.logo_url ? (
            <img src={airline.logo_url} alt={airline.name} className="h-14 w-14 object-contain" />
          ) : (
            <Plane size={32} className="text-muted-foreground" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-rdc-anthracite md:text-4xl">
              {airline.name}
            </h1>
            {airline.hub_at_fih && (
              <span className="rounded-full bg-rdc-blue px-3 py-1 text-xs font-bold text-white">
                Hub FIH
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            IATA : <strong>{airline.iata_code}</strong>
            {airline.icao_code && <> · OACI : <strong>{airline.icao_code}</strong></>}
          </p>
          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {airline.website && (
            <a
              href={airline.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80"
            >
              <Globe size={14} /> {t('vols.airline.website')}
            </a>
          )}
        </div>
      </div>

      {/* Flight tabs */}
      <h2 className="mb-4 font-display text-xl font-semibold text-rdc-anthracite">
        {t('vols.airline.todayFlights')}
      </h2>

      <Tabs defaultValue="departures">
        <TabsList className="mb-4">
          <TabsTrigger value="departures">
            {t('flights.departures')} ({departures.length})
          </TabsTrigger>
          <TabsTrigger value="arrivals">
            {t('flights.arrivals')} ({arrivals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departures">
          <FlightTable
            data={departures}
            type="departure"
            isLoading={flightsLoading}
            globalFilter=""
            statusFilter={''}
            terminalFilter=""
          />
        </TabsContent>
        <TabsContent value="arrivals">
          <FlightTable
            data={arrivals}
            type="arrival"
            isLoading={flightsLoading}
            globalFilter=""
            statusFilter={''}
            terminalFilter=""
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AirlineSkeleton() {
  return (
    <div className="container py-10 space-y-6">
      <Skeleton className="h-4 w-32" />
      <div className="flex gap-6">
        <Skeleton className="h-20 w-20 rounded-2xl" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-16 w-full max-w-lg" />
        </div>
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
