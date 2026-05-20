import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { FlightCard } from '@/components/flights/FlightCard';
import { useUpcomingFlights } from '@/lib/queries';

function FlightSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border px-4 py-3.5">
      <Skeleton className="h-8 w-14 rounded-md" />
      <Skeleton className="h-8 w-12 rounded-md" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-3 w-20 rounded" />
      </div>
      <Skeleton className="h-5 w-20 rounded-full" />
    </div>
  );
}

function FlightList({ type }: { type: 'departure' | 'arrival' }) {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useUpcomingFlights(type, 6);

  if (isLoading) {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: 6 }).map((_, i) => <FlightSkeleton key={i} />)}
      </div>
    );
  }

  if (isError || !data?.length) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        {t('home.liveFlights.noFlights')}
      </p>
    );
  }

  return (
    <div className="space-y-2.5">
      {data.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}

export function FlightsPreview() {
  const { t } = useTranslation();

  return (
    <section className="bg-muted/40 py-12">
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-rdc-anthracite md:text-3xl">
              {t('home.liveFlights.title')}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{t('home.liveFlights.subtitle')}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rdc-green">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rdc-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rdc-green" />
            </span>
            {t('home.liveFlights.live')}
          </div>
        </div>

        <Tabs defaultValue="departures">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="departures">{t('flights.departures')}</TabsTrigger>
            <TabsTrigger value="arrivals">{t('flights.arrivals')}</TabsTrigger>
          </TabsList>

          <TabsContent value="departures">
            <FlightList type="departure" />
          </TabsContent>
          <TabsContent value="arrivals">
            <FlightList type="arrival" />
          </TabsContent>
        </Tabs>

        <div className="mt-5 flex justify-center gap-4">
          <Link
            to={'/vols/departs' as never}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80"
          >
            {t('flights.viewAllDepartures')} <ArrowRight size={14} />
          </Link>
          <Link
            to={'/vols/arrivees' as never}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80"
          >
            {t('flights.viewAllArrivals')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
