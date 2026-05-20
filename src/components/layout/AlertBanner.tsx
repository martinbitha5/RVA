import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/types/database';

type AlertLevel = 'info' | 'warning' | 'success';
type PageRow = Tables<'pages'>;

interface AlertConfig {
  active: boolean;
  level: AlertLevel;
  message_fr: string;
  message_en: string;
}

const ICONS: Record<AlertLevel, React.ReactNode> = {
  info: <Info size={15} className="flex-shrink-0" />,
  warning: <AlertTriangle size={15} className="flex-shrink-0" />,
  success: <CheckCircle size={15} className="flex-shrink-0" />,
};

const BG_CLASSES: Record<AlertLevel, string> = {
  info: 'bg-rdc-blue text-white',
  warning: 'bg-rdc-yellow text-rdc-anthracite',
  success: 'bg-rdc-green text-white',
};

async function fetchAlert(): Promise<AlertConfig | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('title_fr,title_en,meta_description_fr')
    .eq('slug', 'alert-banner')
    .eq('is_published', true)
    .maybeSingle() as { data: Pick<PageRow, 'title_fr' | 'title_en' | 'meta_description_fr'> | null; error: unknown };

  if (error || !data) return null;

  return {
    active: true,
    level: (data.meta_description_fr as AlertLevel | null) ?? 'info',
    message_fr: data.title_fr,
    message_en: data.title_en ?? data.title_fr,
  };
}

export function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { data: alert } = useQuery({
    queryKey: ['alert-banner'],
    queryFn: fetchAlert,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (!alert?.active || dismissed) return null;

  const level = alert.level;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`${BG_CLASSES[level]} w-full`}
    >
      <div className="container flex items-center justify-between gap-4 py-2.5">
        <div className="flex items-center gap-2.5 text-sm font-medium">
          {ICONS[level]}
          <span>{alert.message_fr}</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fermer l'alerte"
          className="ml-auto flex-shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
