import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { History, Car, Download, Filter, CalendarDays, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';

export const Route = createFileRoute('/compte/historique')({
  component: HistoriquePage,
  head: () => ({ meta: [{ title: 'Historique — Espace Client FIH' }] }),
});

interface Transaction {
  id: string;
  reservation_code: string;
  vehicle_plate: string;
  start_at: string;
  end_at: string;
  total_amount_usd: number;
  payment_status: string;
  payment_method: string;
  created_at: string;
  parking_lots?: { name: string; code: string } | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  paid:    { label: 'Payé',      color: 'bg-rdc-green/10 text-rdc-green border-rdc-green/20' },
  pending: { label: 'En attente', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  failed:  { label: 'Échoué',    color: 'bg-rdc-red/10 text-rdc-red border-rdc-red/20' },
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

function durationHours(start: string, end: string) {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const h = Math.round(diff / 3600000);
  if (h < 24) return `${h}h`;
  return `${Math.round(h / 24)}j`;
}

function HistoriquePage() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'failed'>('all');

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const { data } = await supabase
        .from('parking_reservations')
        .select('*, parking_lots(name, code)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setTransactions((data as Transaction[] | null) ?? []);
      setLoading(false);
    })();
  }, [user]);

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.payment_status === filter);
  const totalPaid = transactions.filter(t => t.payment_status === 'paid').reduce((s, t) => s + t.total_amount_usd, 0);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-20 rounded-2xl bg-muted" />
        {[1,2,3].map(i => <div key={i} className="h-28 rounded-2xl bg-muted" />)}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Historique</h1>
        <p className="text-sm text-muted-foreground mt-1">Toutes vos transactions de stationnement</p>
      </div>

      {/* ── Summary cards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <p className="font-bold text-xl text-rdc-anthracite">{transactions.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Transactions</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <p className="font-bold text-xl text-rdc-green">{totalPaid.toFixed(0)} $</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total payé</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <p className="font-bold text-xl text-rdc-blue">
            {transactions.filter(t => t.payment_status === 'paid').length}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Confirmées</p>
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Filter size={13} className="text-muted-foreground shrink-0" />
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {(['all', 'paid', 'pending', 'failed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-rdc-blue text-white'
                  : 'bg-muted text-muted-foreground hover:text-rdc-anthracite'
              }`}
            >
              {f === 'all' ? 'Tout' : STATUS_CONFIG[f]?.label ?? f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Transaction list ────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <History size={36} className="mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-medium text-rdc-anthracite mb-1">Aucune transaction</p>
          <p className="text-sm text-muted-foreground">Votre historique apparaîtra ici après votre première réservation.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(tx => {
            const status = STATUS_CONFIG[tx.payment_status] ?? { label: tx.payment_status, color: 'bg-muted text-muted-foreground border-border' };
            return (
              <div key={tx.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-rdc-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Car size={15} className="text-rdc-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-rdc-anthracite">
                        {tx.parking_lots?.name ?? 'Parking FIH'}
                        {tx.parking_lots?.code && (
                          <span className="ml-1.5 text-xs font-normal text-muted-foreground">({tx.parking_lots.code})</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">#{tx.reservation_code}</p>
                    </div>
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.color} shrink-0`}>
                    {status.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={11} /> Entrée : {fmt(tx.start_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={11} /> Sortie : {fmt(tx.end_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Car size={11} /> {tx.vehicle_plate} · {durationHours(tx.start_at, tx.end_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CreditCard size={11} /> {METHOD_LABELS[tx.payment_method] ?? tx.payment_method}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="font-bold text-base text-rdc-anthracite">
                    {tx.total_amount_usd.toFixed(2)} USD
                  </span>
                  {tx.payment_status === 'paid' && (
                    <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-rdc-blue hover:border-rdc-blue/30 transition-colors">
                      <Download size={12} /> Reçu
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
