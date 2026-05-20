import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { FlightStatus } from '@/types/database';

const STATUS_STYLES: Record<FlightStatus, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  boarding:  'bg-rdc-yellow/20 text-amber-700 font-semibold animate-pulse',
  departed:  'bg-gray-100 text-gray-500',
  arrived:   'bg-green-100 text-green-700',
  delayed:   'bg-orange-100 text-orange-700',
  cancelled: 'bg-red-100 text-red-700 line-through',
  diverted:  'bg-purple-100 text-purple-700',
  on_time:   'bg-green-100 text-green-700',
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
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs',
        STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600',
        className,
      )}
    >
      {t(`flights.status.${status}`, { defaultValue: status })}
    </span>
  );
}
