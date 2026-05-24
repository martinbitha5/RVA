import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Car, Calendar, Clock, CreditCard, ChevronRight, QrCode, Download, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';

export const Route = createFileRoute('/compte/reservations')({
  component: ReservationsPage,
  head: () => ({ meta: [{ title: 'Mes réservations — Espace Client FIH' }] }),
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
  paid:    { label: 'Confirmée', color: 'bg-rdc-green/10 text-rdc-green' },
  pending: { label: 'En attente', color: 'bg-amber-50 text-amber-700' },
  failed:  { label: 'Échouée',   color: 'bg-rdc-red/10 text-rdc-red' },
};

const METHOD_LABELS: Record<string, string> = {
  airtel_money: 'Airtel Money',
  mpesa: 'M-Pesa',
  orange_money: 'Orange Money',
  card: 'Carte bancaire',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function isUpcoming(iso: string) {
  return new Date(iso) > new Date();
}

function QrModal({ code, onClose }: { code: string; onClose: () => void }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FIH-RSVP-${code}&color=003DA5&bgcolor=F7F7F2`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xs rounded-3xl bg-card p-6 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X size={16} />
        </button>

        <div className="mb-4">
          <div className="h-10 w-10 rounded-xl bg-rdc-blue/10 flex items-center justify-center mx-auto mb-2">
            <QrCode size={18} className="text-rdc-blue" />
          </div>
          <h3 className="font-display font-bold text-lg text-rdc-anthracite">QR Code de réservation</h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-mono">{code}</p>
        </div>

        <div className="flex items-center justify-center rounded-2xl bg-muted/50 p-4 mb-4">
          <img src={qrUrl} alt={`QR Code ${code}`} className="w-44 h-44 rounded-xl" />
        </div>

        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Présentez ce QR code à l'entrée du parking pour accéder à votre place réservée.
        </p>

        <a
          href={qrUrl}
          download={`FIH-QR-${code}.png`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-rdc-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-rdc-blue/85 transition-colors"
        >
          <Download size={14} /> Télécharger le QR
        </a>
      </div>
    </div>
  );
}

function ReservationsPage() {
  const { user } = useUser();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const { data } = await supabase
        .from('parking_reservations')
        .select('*, parking_lots(name, code)')
        .eq('user_id', user.id)
        .order('start_at', { ascending: false });

      setReservations((data as Reservation[] | null) ?? []);
      setLoading(false);
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map(i => <div key={i} className="h-36 rounded-2xl bg-muted" />)}
      </div>
    );
  }

  const upcoming = reservations.filter(r => isUpcoming(r.start_at));
  const past = reservations.filter(r => !isUpcoming(r.start_at));

  return (
    <>
      {qrCode && <QrModal code={qrCode} onClose={() => setQrCode(null)} />}

      <div className="space-y-5">
        <div>
          <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Mes réservations</h1>
          <p className="text-sm text-muted-foreground mt-1">Stationnement FIH · {reservations.length} réservation{reservations.length > 1 ? 's' : ''}</p>
        </div>

        {reservations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Car size={36} className="mx-auto mb-4 text-muted-foreground/40" />
            <p className="font-medium text-rdc-anthracite mb-1">Aucune réservation</p>
            <p className="text-sm text-muted-foreground mb-5">Réservez votre place de parking en ligne, paiement Mobile Money.</p>
            <Link to={'/stationnement-transport/stationnement-fih' as never}
              className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-4 py-2 text-sm font-medium text-white hover:bg-rdc-blue/85 transition-colors">
              Réserver un stationnement <ChevronRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            {/* ── Upcoming ──────────────────────────────────────────────── */}
            {upcoming.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                  À venir · {upcoming.length}
                </h2>
                <div className="space-y-3">
                  {upcoming.map(r => <ResaCard key={r.id} r={r} onQr={() => setQrCode(r.reservation_code)} />)}
                </div>
              </div>
            )}

            {/* ── Past ──────────────────────────────────────────────────── */}
            {past.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                  Passées · {past.length}
                </h2>
                <div className="space-y-3">
                  {past.map(r => <ResaCard key={r.id} r={r} onQr={() => setQrCode(r.reservation_code)} />)}
                </div>
              </div>
            )}
          </>
        )}

        <Link to={'/stationnement-transport/stationnement-fih' as never}
          className="flex items-center justify-center gap-2 rounded-xl border border-rdc-blue/30 px-4 py-3 text-sm font-medium text-rdc-blue hover:bg-rdc-blue/5 transition-colors">
          + Nouvelle réservation
        </Link>
      </div>
    </>
  );
}

function ResaCard({ r, onQr }: { r: Reservation; onQr: () => void }) {
  const status = STATUS_CONFIG[r.payment_status] ?? { label: r.payment_status, color: 'bg-muted text-muted-foreground' };
  const upcoming = isUpcoming(r.start_at);

  return (
    <div className={`rounded-2xl border bg-card p-5 space-y-3 ${upcoming ? 'border-rdc-blue/30 shadow-sm shadow-rdc-blue/5' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${upcoming ? 'bg-rdc-blue/10' : 'bg-muted'}`}>
            <Car size={15} className={upcoming ? 'text-rdc-blue' : 'text-muted-foreground'} />
          </div>
          <div>
            <p className="font-semibold text-sm text-rdc-anthracite">{r.parking_lots?.name ?? 'Parking FIH'}</p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">#{r.reservation_code}</p>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.color} shrink-0`}>
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><Calendar size={11} /> {fmt(r.start_at)}</span>
        <span className="flex items-center gap-1.5"><Clock size={11} /> {fmt(r.end_at)}</span>
        <span className="flex items-center gap-1.5"><Car size={11} /> {r.vehicle_plate}</span>
        <span className="flex items-center gap-1.5"><CreditCard size={11} /> {METHOD_LABELS[r.payment_method] ?? r.payment_method}</span>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="font-bold text-rdc-anthracite">{r.total_amount_usd.toFixed(2)} USD</span>
        {r.payment_status === 'paid' && (
          <button
            onClick={onQr}
            className="flex items-center gap-1.5 rounded-lg bg-rdc-blue/10 border border-rdc-blue/20 px-3 py-1.5 text-xs font-semibold text-rdc-blue hover:bg-rdc-blue hover:text-white transition-all"
          >
            <QrCode size={12} /> Afficher le QR
          </button>
        )}
      </div>
    </div>
  );
}
