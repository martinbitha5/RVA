/**
 * Smart bell button shown on flight detail pages.
 *
 * Logged-in user  → directly toggles a flight_alerts row (add / remove).
 * Guest visitor   → saves intent to sessionStorage, redirects to /inscription.
 *
 * Once created, the alert appears in /compte/vols-suivis automatically
 * because that page queries flight_alerts filtered by user_id.
 */

import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Bell, BellOff, Loader2, MessageCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { savePendingAlert } from '@/lib/pendingAlert';

interface Props {
  flightId: string;
  flightNumber: string;
}

type UIState = 'checking' | 'guest' | 'idle' | 'following' | 'busy' | 'justAdded';

export function FlightAlertButton({ flightId, flightNumber }: Props) {
  const [ui, setUi] = useState<UIState>('checking');
  const [alertId, setAlertId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      if (!session?.user) { setUi('guest'); return; }

      const { data } = await supabase
        .from('flight_alerts')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('flight_id', flightId)
        .eq('active', true)
        .maybeSingle();

      if (cancelled) return;
      if (data) { setAlertId((data as { id: string }).id); setUi('following'); }
      else setUi('idle');
    })();
    return () => { cancelled = true; };
  }, [flightId]);

  async function addAlert() {
    setUi('busy');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { setUi('guest'); return; }

    try {
      const { data, error } = await supabase
        .from('flight_alerts')
        .insert({
          user_id: session.user.id,
          flight_id: flightId,
          alert_types: ['status_change', 'gate_change', 'delay'],
          active: true,
        } as never)
        .select('id')
        .single();

      if (error) throw error;
      setAlertId((data as { id: string }).id);
      setUi('justAdded');
      // Auto-reset the "just added" feedback after 3 s
      setTimeout(() => setUi('following'), 3000);
    } catch {
      setUi('idle');
    }
  }

  async function removeAlert() {
    if (!alertId) return;
    setUi('busy');
    await supabase
      .from('flight_alerts')
      .update({ active: false } as never)
      .eq('id', alertId);
    setAlertId(null);
    setUi('idle');
  }

  /* ── Render ──────────────────────────────────────────────────── */

  if (ui === 'checking') {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 size={12} className="animate-spin" /> Vérification…
      </span>
    );
  }

  if (ui === 'guest') {
    return (
      <Link
        to={'/inscription' as never}
        onClick={() => savePendingAlert({ flightId, flightNumber })}
        className="flex items-center gap-1.5 rounded-lg border border-rdc-blue/25 bg-rdc-blue/8 px-3 py-1.5 text-sm font-semibold text-rdc-blue transition-all hover:bg-rdc-blue hover:text-white"
      >
        <Bell size={13} />
        M'alerter sur ce vol
      </Link>
    );
  }

  if (ui === 'justAdded') {
    return (
      <span className="flex items-center gap-1.5 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1.5 text-sm font-semibold text-[#25D366]">
        <CheckCircle size={13} />
        Alerte WhatsApp activée !
      </span>
    );
  }

  if (ui === 'following') {
    return (
      <button
        onClick={() => { void removeAlert(); }}
        className="group flex items-center gap-1.5 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1.5 text-sm font-semibold text-[#25D366] transition-all hover:border-rdc-red/30 hover:bg-rdc-red/10 hover:text-rdc-red"
      >
        <MessageCircle size={13} className="group-hover:hidden" />
        <BellOff size={13} className="hidden group-hover:block" />
        <span className="group-hover:hidden">Alerte WhatsApp active</span>
        <span className="hidden group-hover:block">Désactiver</span>
      </button>
    );
  }

  if (ui === 'busy') {
    return (
      <span className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground">
        <Loader2 size={13} className="animate-spin" /> En cours…
      </span>
    );
  }

  // idle — not yet following
  return (
    <button
      onClick={() => { void addAlert(); }}
      className="flex items-center gap-1.5 rounded-lg border border-rdc-blue/25 bg-rdc-blue/8 px-3 py-1.5 text-sm font-semibold text-rdc-blue transition-all hover:bg-rdc-blue hover:text-white"
    >
      <Bell size={13} />
      M'alerter sur ce vol
    </button>
  );
}
