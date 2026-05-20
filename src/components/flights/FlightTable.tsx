import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { FlightStatusBadge } from './FlightStatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { FlightWithAirline, FlightStatus } from '@/types/database';

const col = createColumnHelper<FlightWithAirline>();

function formatTime(iso: string | null) {
  if (!iso) return '—';
  return format(new Date(iso), 'HH:mm');
}

interface Props {
  data: FlightWithAirline[];
  type: 'departure' | 'arrival';
  isLoading: boolean;
  globalFilter: string;
  statusFilter: FlightStatus | '';
  terminalFilter: string;
}

export function FlightTable({ data, type, isLoading, globalFilter, statusFilter, terminalFilter }: Props) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([{ id: 'scheduled_time', desc: false }]);

  const filtered = useMemo(() => {
    let rows = data;
    if (statusFilter) rows = rows.filter((r) => r.status === statusFilter);
    if (terminalFilter) rows = rows.filter((r) => r.terminal?.toLowerCase().includes(terminalFilter.toLowerCase()));
    if (globalFilter) {
      const q = globalFilter.toLowerCase();
      rows = rows.filter((r) =>
        r.flight_number?.toLowerCase().includes(q) ||
        r.airlines?.name?.toLowerCase().includes(q) ||
        r.destination_iata?.toLowerCase().includes(q) ||
        r.origin_iata?.toLowerCase().includes(q),
      );
    }
    return rows;
  }, [data, globalFilter, statusFilter, terminalFilter]);

  const columns = useMemo(() => [
    col.accessor('scheduled_time', {
      header: t('flights.scheduled'),
      cell: (c) => (
        <span className="font-mono text-sm font-semibold">
          {formatTime(c.getValue())}
        </span>
      ),
    }),
    col.accessor('flight_number', {
      header: t('flights.flightNumber'),
      cell: (c) => (
        <span className="font-mono text-sm font-medium tracking-wide">
          {c.getValue()}
        </span>
      ),
    }),
    col.accessor((r) => r.airlines?.name ?? '', {
      id: 'airline',
      header: t('flights.airline'),
      cell: (c) => (
        <span className="text-sm">{c.getValue()}</span>
      ),
    }),
    col.accessor(type === 'departure' ? 'destination_iata' : 'origin_iata', {
      id: 'city',
      header: type === 'departure' ? t('flights.destination') : t('flights.origin'),
      cell: (c) => (
        <span className="font-mono text-sm font-semibold text-rdc-blue">
          {c.getValue()}
        </span>
      ),
    }),
    col.accessor('estimated_time', {
      header: t('flights.estimated'),
      cell: (c) => {
        const est = c.getValue();
        const sched = c.row.original.scheduled_time;
        const isLate = est && sched && new Date(est) > new Date(sched);
        return (
          <span className={cn('font-mono text-sm', isLate ? 'text-orange-600' : 'text-muted-foreground')}>
            {formatTime(est)}
          </span>
        );
      },
    }),
    col.accessor('gate', {
      header: t('flights.gate'),
      cell: (c) => (
        <span className="font-semibold text-sm">{c.getValue() ?? '—'}</span>
      ),
    }),
    col.accessor('terminal', {
      header: t('flights.terminal'),
      cell: (c) => (
        <span className="text-xs text-muted-foreground">{c.getValue() ?? '—'}</span>
      ),
    }),
    col.accessor('status', {
      header: t('flights.status'),
      cell: (c) => <FlightStatusBadge status={c.getValue() as FlightStatus} />,
    }),
  ], [t, type]);

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!filtered.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-muted-foreground">{t('flights.noFlights')}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t('flights.noFlightsDesc')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-border bg-muted/50">
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  onClick={h.column.getToggleSortingHandler()}
                  className={cn(
                    'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
                    h.column.getCanSort() && 'cursor-pointer select-none hover:text-foreground',
                  )}
                >
                  <span className="flex items-center gap-1">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {h.column.getCanSort() && (
                      h.column.getIsSorted() === 'asc' ? (
                        <ChevronUp size={12} />
                      ) : h.column.getIsSorted() === 'desc' ? (
                        <ChevronDown size={12} />
                      ) : (
                        <ArrowUpDown size={11} className="opacity-30" />
                      )
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className={cn(
                'border-b border-border last:border-0 transition-colors hover:bg-muted/30',
                i % 2 === 0 ? 'bg-white' : 'bg-muted/10',
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3.5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
