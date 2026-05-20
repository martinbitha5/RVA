import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Car, Calendar, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/compte/reservations')({
  component: ReservationsPage,
  head: () => ({ meta: [{ title: "Mes réservations — Espace Client FIH" }] }),
});

interface Reservation {
  id: string;
  reservation_code: string;
  vehicle_plate: string;
  start_at: string;
  end_at: string;
  total_amount_usd: number;
  payment_status: string;
  payment_method: string;
  parking_lots?: { name: string; code: string } | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  paid:    { label: 'Payé',     color: 'bg-rdc-green/10 text-rdc-green' },
  pending: { label: 'En attente', color: 'bg-amber-50 text-amber-700' },
  failed:  { label: 'Échoué',   color: 'bg-rdc-red/10 text-rdc-red' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function ReservationsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { void navigate({ to: '/login' as never }); return; }

      const { data } = await supabase
        .from('parking_reservations')
        .select('*, parking_lots(name, code)')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      setReservations((data as Reservation[] | null) ?? []);
      setLoading(false);
    })();
  }, [navigate]);

  if (loading) {
    return <div className="container py-20 text-center text-sm text-muted-foreground">{t('common.loading')}</div>;
  }

  return (
    <div className="container py-10 md:py-14 max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <Car size={18} className="text-rdc-blue" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Mes réservations</h1>
          <p className="text-sm text-muted-foreground">Historique de vos réservations de stationnement</p>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Car size={36} className="mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-medium text-rdc-anthracite mb-1">Aucune réservation</p>
          <p className="text-sm text-muted-foreground mb-5">Vous n'avez pas encore effectué de réservation de stationnement.</p>
          <Link to={'/stationnement-transport/stationnement-fih' as never}
            className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-4 py-2 text-sm font-medium text-white hover:bg-rdc-blue/85 transition-colors">
            Réserver un stationnement <ChevronRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.map(r => {
            const status = STATUS_CONFIG[r.payment_status] ?? { label: r.payment_status, color: 'bg-muted text-muted-foreground' };
            return (
              <div key={r.id} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-rdc-anthracite">{r.parking_lots?.name ?? 'Parking FIH'}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">Code : {r.reservation_code}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.color}`}>{status.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={13} />
                    <span>Arrivée : {formatDate(r.start_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={13} />
                    <span>Départ : {formatDate(r.end_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Car size={13} />
                    <span>Plaque : <span className="font-mono font-medium text-rdc-anthracite">{r.vehicle_plate}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard size={13} />
                    <span>{r.payment_method ?? '—'} · <strong className="text-rdc-anthracite">{r.total_amount_usd} USD</strong></span>
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
