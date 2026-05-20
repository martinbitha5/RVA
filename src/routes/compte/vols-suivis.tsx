import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Plane, Bell, Trash2, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/compte/vols-suivis')({
  component: VolsSuivisPage,
  head: () => ({ meta: [{ title: "Vols suivis — Espace Client FIH" }] }),
});

interface FlightAlert {
  id: string;
  alert_types: string[];
  active: boolean;
  flights: {
    flight_number: string;
    type: string;
    destination_iata: string;
    origin_iata: string;
    scheduled_time: string;
    status: string;
    airlines: { name: string; iata_code: string } | null;
  } | null;
}

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-50 text-blue-700',
  boarding:  'bg-amber-50 text-amber-700',
  departed:  'bg-green-50 text-green-700',
  arrived:   'bg-rdc-green/10 text-rdc-green',
  delayed:   'bg-orange-50 text-orange-700',
  cancelled: 'bg-rdc-red/10 text-rdc-red',
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function VolsSuivisPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<FlightAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { void navigate({ to: '/login' as never }); return; }

      const { data } = await supabase
        .from('flight_alerts')
        .select('*, flights(flight_number, type, destination_iata, origin_iata, scheduled_time, status, airlines(name, iata_code))')
        .eq('user_id', userData.user.id)
        .eq('active', true)
        .order('created_at' as never, { ascending: false });

      setAlerts((data as FlightAlert[] | null) ?? []);
      setLoading(false);
    })();
  }, [navigate]);

  async function handleRemove(id: string) {
    await supabase.from('flight_alerts').update({ active: false } as never).eq('id', id);
    setAlerts(prev => prev.filter(a => a.id !== id));
  }

  if (loading) {
    return <div className="container py-20 text-center text-sm text-muted-foreground">{t('common.loading')}</div>;
  }

  return (
    <div className="container py-10 md:py-14 max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <Plane size={18} className="text-rdc-blue" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Vols suivis</h1>
          <p className="text-sm text-muted-foreground">Vos alertes de suivi de vol actives</p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Bell size={36} className="mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-medium text-rdc-anthracite mb-1">Aucun vol suivi</p>
          <p className="text-sm text-muted-foreground mb-5">Abonnez-vous aux alertes SMS pour être notifié des changements de statut.</p>
          <Link to={'/vols/alertes-sms' as never}
            className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-4 py-2 text-sm font-medium text-white hover:bg-rdc-blue/85 transition-colors">
            S'abonner aux alertes <ChevronRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => {
            const flight = alert.flights;
            if (!flight) return null;
            const statusColor = STATUS_COLORS[flight.status] ?? 'bg-muted text-muted-foreground';
            const route = flight.type === 'departure'
              ? `FIH → ${flight.destination_iata}`
              : `${flight.origin_iata} → FIH`;

            return (
              <div key={alert.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-rdc-anthracite font-mono">{flight.flight_number}</span>
                      <span className="text-muted-foreground text-sm">{flight.airlines?.name ?? ''}</span>
                    </div>
                    <p className="text-sm font-medium text-rdc-anthracite">{route}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor}`}>
                    {flight.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={13} />
                    <span>{formatTime(flight.scheduled_time)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {alert.alert_types.map(type => (
                        <span key={type} className="rounded-full bg-rdc-blue/10 px-2 py-0.5 text-xs text-rdc-blue">
                          {type.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => { void handleRemove(alert.id); }}
                      className="text-muted-foreground hover:text-rdc-red h-7 w-7 p-0">
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
