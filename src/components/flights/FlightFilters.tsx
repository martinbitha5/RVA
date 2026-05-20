import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { FlightStatus } from '@/types/database';

const STATUSES: FlightStatus[] = [
  'scheduled', 'boarding', 'departed', 'arrived', 'delayed', 'cancelled', 'diverted',
];

interface Props {
  search: string;
  onSearch: (v: string) => void;
  status: FlightStatus | '';
  onStatus: (v: FlightStatus | '') => void;
  terminal: string;
  onTerminal: (v: string) => void;
}

export function FlightFilters({ search, onSearch, status, onStatus, terminal, onTerminal }: Props) {
  const { t } = useTranslation();
  const hasFilters = search || status || terminal;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-[200px] flex-1">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t('flights.searchFlight')}
          className="pl-8 text-sm"
        />
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-1.5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatus(status === s ? '' : s)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              status === s
                ? 'border-rdc-blue bg-rdc-blue text-white'
                : 'border-border text-muted-foreground hover:border-rdc-blue/50 hover:text-rdc-blue',
            )}
          >
            {t(`flights.status.${s}`)}
          </button>
        ))}
      </div>

      {/* Terminal filter */}
      <div className="flex gap-1.5">
        {['International', 'Domestique'].map((term) => (
          <button
            key={term}
            onClick={() => onTerminal(terminal === term ? '' : term)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              terminal === term
                ? 'border-rdc-blue bg-rdc-blue text-white'
                : 'border-border text-muted-foreground hover:border-rdc-blue/50 hover:text-rdc-blue',
            )}
          >
            {term}
          </button>
        ))}
      </div>

      {/* Clear all */}
      {hasFilters && (
        <button
          onClick={() => { onSearch(''); onStatus(''); onTerminal(''); }}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <X size={12} /> {t('common.cancel')}
        </button>
      )}
    </div>
  );
}
