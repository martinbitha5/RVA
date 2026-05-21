import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { FlightStatus } from '@/types/database';

/** ADMTL-style solid filled status badge — no rounded pill */
const STATUS_STYLES: Record<FlightStatus, string> = {
  scheduled: 'bg-slate-600    text-white',
  boarding:  'bg-amber-500    text-white animate-pulse',
  departed:  'bg-slate-400    text-white',
  arrived:   'bg-rdc-green    text-white',
  delayed:   'bg-orange-500   text-white',
  cancelled: 'bg-rdc-red      text-white',
  diverted:  'bg-purple-700   text-white',
  on_time:   'bg-rdc-green    text-white',
};

interface Props {
  status: FlightStatus;
  className?: string;
}

export function FlightStatusBadge({ status, className }: Props) {
  const { t } = useTranslation();
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-0.5 text-xs font-semibold uppercase tracking-wide',
        STATUS_STYLES[status] ?? 'bg-gray-400 text-white',
        className,
      )}
    >
      {t(`flights.status.${status}`, { defaultValue: status })}
    </span>
  );
}
