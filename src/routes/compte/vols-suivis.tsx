import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Plane, Bell, Trash2, ChevronRight, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/compte/vols-suivis')({
  component: VolsSuivisPage,
  head: () => ({ meta: [{ title: 'Vols suivis — Espace Client FIH' }] }),
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

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  scheduled: { label: 'Programmé',  color: 'bg-blue-50 text-blue-700 border-blue-200',    dot: 'bg-blue-500' },
  boarding:  { label: 'Embarquement', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  departed:  { label: 'Parti',       color: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
  arrived:   { label: 'Arrivé',      color: 'bg-rdc-green/10 text-rdc-green border-rdc-green/20', dot: 'bg-rdc-green' },
  delayed:   { label: 'Retardé',     color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  cancelled: { label: 'Annulé',      color: 'bg-rdc-red/10 text-rdc-red border-rdc-red/20',  dot: 'bg-rdc-red' },
};

const ALERT_LABELS: Record<string, string> = {
  status_change: 'Statut',
  gate_change: 'Porte',
  delay: 'Retard',
};

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    weekday: 'short', day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit',
  });
}

function VolsSuivisPage() {
  const [alerts, setAlerts] = useState<FlightAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from('flight_alerts')
        .select('*, flights(flight_number, type, destination_iata, origin_iata, scheduled_time, status, airlines(name, iata_code))')
        .eq('user_id', userData.user.id)
        .eq('active', true)
        .order('created_at' as never, { ascending: false });

      setAlerts((data as FlightAlert[] | null) ?? []);
      setLoading(false);
    })();
  }, []);

  async function handleRemove(id: string) {
    setRemovingId(id);
    await supabase.from('flight_alerts').update({ active: false } as never).eq('id', id);
    setAlerts(prev => prev.filter(a => a.id !== id));
    setRemovingId(null);
  }

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map(i => <div key={i} className="h-32 rounded-2xl bg-muted" />)}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Vols suivis</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {alerts.length} alerte{alerts.length > 1 ? 's' : ''} active{alerts.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link
          to={'/vols/alertes-sms' as never}
          className="shrink-0 flex items-center gap-1.5 rounded-xl bg-rdc-blue px-3 py-2 text-xs font-semibold text-white hover:bg-rdc-blue/85 transition-colors"
        >
          + Ajouter
        </Link>
      </div>

      {alerts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <div className="h-14 w-14 rounded-2xl bg-rdc-blue/10 flex items-center justify-center mx-auto mb-4">
            <Bell size={28} className="text-rdc-blue/50" />
          </div>
          <p className="font-semibold text-rdc-anthracite mb-1">Aucun vol suivi</p>
          <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
            Abonnez-vous aux alertes SMS pour être notifié en temps réel des changements de statut.
          </p>
          <Link
            to={'/vols/alertes-sms' as never}
            className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-4 py-2 text-sm font-medium text-white hover:bg-rdc-blue/85 transition-colors"
          >
            S'abonner aux alertes <ChevronRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => {
            const flight = alert.flights;
            if (!flight) return null;
            const st = STATUS_CONFIG[flight.status] ?? { label: flight.status, color: 'bg-muted text-muted-foreground border-border', dot: 'bg-muted-foreground' };
            const route = flight.type === 'departure'
              ? `FIH → ${flight.destination_iata}`
              : `${flight.origin_iata} → FIH`;
            const isDelayed = flight.status === 'delayed';
            const isCancelled = flight.status === 'cancelled';

            return (
              <div
                key={alert.id}
                className={`rounded-2xl border bg-card p-5 transition-all ${
                  isCancelled ? 'border-rdc-red/30 bg-rdc-red/5' :
                  isDelayed ? 'border-orange-300/40 bg-orange-50/50' :
                  'border-border'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCancelled ? 'bg-rdc-red/10' : isDelayed ? 'bg-orange-100' : 'bg-rdc-blue/10'
                    }`}>
                      <Plane size={16} className={isCancelled ? 'text-rdc-red' : isDelayed ? 'text-orange-600' : 'text-rdc-blue'} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-rdc-anthracite font-mono text-sm">{flight.flight_number}</span>
                        <span className="text-xs text-muted-foreground">{flight.airlines?.name ?? ''}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-sm font-medium text-rdc-anthracite">
                        <span>{route.split(' → ')[0]}</span>
                        <ArrowRight size={12} className="text-muted-foreground" />
                        <span>{route.split(' → ')[1]}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${st.color}`}>
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${st.dot} mr-1.5`} />
                    {st.label}
                  </span>
                </div>

                {/* Warning for delayed/cancelled */}
                {(isDelayed || isCancelled) && (
                  <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs mb-3 ${
                    isCancelled ? 'bg-rdc-red/10 text-rdc-red' : 'bg-orange-100 text-orange-700'
                  }`}>
                    <AlertCircle size={12} className="shrink-0" />
                    {isCancelled
                      ? 'Ce vol a été annulé. Contactez votre compagnie aérienne.'
                      : 'Ce vol accuse un retard. Heure de départ mise à jour.'}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>{fmtTime(flight.scheduled_time)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Alert type badges */}
                    <div className="flex gap-1">
                      {alert.alert_types.map(type => (
                        <span key={type} className="rounded-full bg-rdc-blue/10 px-2 py-0.5 text-[10px] font-medium text-rdc-blue">
                          {ALERT_LABELS[type] ?? type}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={removingId === alert.id}
                      onClick={() => { void handleRemove(alert.id); }}
                      className="text-muted-foreground hover:text-rdc-red hover:bg-rdc-red/5 h-7 w-7 p-0 rounded-lg transition-colors"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {alerts.length > 0 && (
        <div className="rounded-xl bg-muted/50 border border-border p-4 flex items-start gap-3">
          <Bell size={14} className="text-rdc-blue mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Les alertes SMS sont envoyées via Africa's Talking sur vos numéros Vodacom, Airtel et Orange. Des frais SMS peuvent s'appliquer.
          </p>
        </div>
      )}
    </div>
  );
}
