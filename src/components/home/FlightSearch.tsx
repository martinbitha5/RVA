import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Tab = 'flight' | 'route';

export function FlightSearch() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('flight');

  return (
    <section className="bg-white shadow-md">
      <div className="container py-0">
        <div className="-mt-6 rounded-2xl border border-border bg-white p-5 shadow-xl md:p-6">
          {/* Tabs */}
          <div className="mb-5 flex gap-1 rounded-lg bg-muted p-1 w-fit">
            {(['flight', 'route'] as const).map((t_) => (
              <button
                key={t_}
                onClick={() => setTab(t_)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-xs font-semibold transition-all',
                  tab === t_
                    ? 'bg-white text-rdc-anthracite shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t_ === 'flight' ? t('search.byFlight') : t('search.byRoute')}
              </button>
            ))}
          </div>

          {tab === 'flight' ? (
            <form
              className="flex flex-col gap-3 sm:flex-row sm:items-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Plane
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground -rotate-45"
                />
                <Input
                  placeholder={t('search.flightPlaceholder')}
                  className="pl-9 font-mono uppercase tracking-wider"
                />
              </div>
              <Button type="submit" className="bg-rdc-blue hover:bg-rdc-blue/85 text-white gap-2">
                <Search size={14} />
                {t('search.cta')}
              </Button>
            </form>
          ) : (
            <form
              className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <Plane
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input placeholder={t('search.fromPlaceholder')} className="pl-9" />
              </div>
              <div className="relative">
                <Plane
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground -rotate-180"
                />
                <Input placeholder={t('search.toPlaceholder')} className="pl-9" />
              </div>
              <Button type="submit" className="bg-rdc-blue hover:bg-rdc-blue/85 text-white gap-2">
                <Search size={14} />
                {t('search.cta')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
