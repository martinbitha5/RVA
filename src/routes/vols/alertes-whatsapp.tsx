import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import {
  MessageCircle, Plane, CheckCircle, Info, Bell,
  Search, Loader2, UserPlus, LogIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { savePendingAlert, getPendingAlert, clearPendingAlert } from '@/lib/pendingAlert';
import type { User } from '@supabase/supabase-js';

export const Route = createFileRoute('/vols/alertes-whatsapp')({
  component: AlertesWhatsappPage,
  head: () => ({
    meta: [
      { title: "Alertes WhatsApp vols — Aéroport N'djili · FIH" },
      { name: 'description', content: "Abonnez-vous aux alertes WhatsApp pour votre vol à FIH. Recevez des notifications de statut, retard, changement de porte directement sur WhatsApp." },
    ],
  }),
});

const schema = z.object({
  flightNumber: z.string().min(2, 'Numéro de vol invalide').regex(/^[A-Z0-9]{2,8}$/i, 'Format invalide (ex: SN491)'),
});

type PageState = 'checking' | 'guest' | 'form' | 'searching' | 'success' | 'error';

interface FoundFlight { id: string; flight_number: string; destination_iata: string; origin_iata: string; scheduled_time: string; type: string }

function AlertesWhatsappPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [pageState, setPageState] = useState<PageState>('checking');
  const [flightNumber, setFlightNumber] = useState('');
  const [foundFlight, setFoundFlight] = useState<FoundFlight | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState('');

  // Check auth on mount + apply any pending alert for newly logged-in users
  useEffect(() => {
    void (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setPageState('guest'); return; }

      setUser(session.user);

      // If arriving here after login/signup with a pending alert, apply it now
      const pending = getPendingAlert();
      if (pending) {
        clearPendingAlert();
        try {
          await supabase.from('flight_alerts').insert({
            user_id: session.user.id,
            flight_id: pending.flightId,
            alert_types: ['status_change', 'gate_change', 'delay'],
            active: true,
          } as never);
          // Redirect to the followed-flights page so they see it immediately
          void navigate({ to: '/compte/vols-suivis' as never });
          return;
        } catch { /* ignore if flight id not in DB */ }
      }

      setPageState('form');
    })();
  }, [navigate]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const result = schema.safeParse({ flightNumber: flightNumber.trim().toUpperCase() });
    if (!result.success) {
      setErrors({ flightNumber: result.error.issues[0]?.message ?? 'Invalide' });
      return;
    }
    setPageState('searching');
    try {
      const { data } = await supabase
        .from('flights')
        .select('id, flight_number, destination_iata, origin_iata, scheduled_time, type')
        .ilike('flight_number', flightNumber.trim())
        .gte('scheduled_time', new Date().toISOString())
        .order('scheduled_time', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (!data) {
        setErrorMsg(`Aucun vol trouvé pour « ${flightNumber.toUpperCase()} ». Vérifiez le numéro ou réessayez plus tard.`);
        setPageState('error');
        return;
      }
      setFoundFlight(data as FoundFlight);
      setPageState('form');
    } catch {
      setErrorMsg('Erreur lors de la recherche. Veuillez réessayer.');
      setPageState('error');
    }
  }

  async function handleSubscribe() {
    if (!foundFlight || !user) return;
    setPageState('searching');
    try {
      // Upsert to avoid duplicates
      const { data: existing } = await supabase
        .from('flight_alerts')
        .select('id')
        .eq('user_id', user.id)
        .eq('flight_id', foundFlight.id)
        .eq('active', true)
        .maybeSingle();

      if (!existing) {
        await supabase.from('flight_alerts').insert({
          user_id: user.id,
          flight_id: foundFlight.id,
          alert_types: ['status_change', 'gate_change', 'delay'],
          active: true,
        } as never);
      }
      setPageState('success');
    } catch {
      setErrorMsg('Erreur lors de l\'inscription. Veuillez réessayer.');
      setPageState('error');
    }
  }

  function handleGuestFlightSave() {
    // Guest clicked "subscribe" — we don't have a flight_id yet, just save the number
    // so inscription page can look it up after signup
    const num = flightNumber.trim().toUpperCase();
    if (num) {
      // Store flight number as a hint; inscription will do the DB lookup
      savePendingAlert({ flightId: '__lookup__' + num, flightNumber: num });
    }
  }

  /* ── Render states ───────────────────────────────────────────── */

  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/10">
            <MessageCircle size={28} className="text-[#25D366]" />
          </div>
          <h1 className="font-display text-3xl font-bold text-rdc-anthracite">Alertes WhatsApp</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Soyez notifié en temps réel sur WhatsApp : statut, porte d'embarquement, retards et annulations.
          </p>
        </div>

        {/* Feature chips */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Changement de statut', icon: Bell },
            { label: 'Changement de porte', icon: Plane },
            { label: 'Retards & annulations', icon: CheckCircle },
          ].map(({ label, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
              <Icon size={18} className="mx-auto mb-2 text-[#25D366]" />
              <p className="text-xs font-medium text-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* ── State: checking ── */}
        {pageState === 'checking' && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-muted-foreground" />
          </div>
        )}

        {/* ── State: guest (not logged in) ── */}
        {pageState === 'guest' && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-5">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-rdc-blue/10 flex items-center justify-center">
              <UserPlus size={24} className="text-rdc-blue" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-rdc-anthracite mb-2">
                Créez un compte pour activer vos alertes
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Les alertes WhatsApp sont liées à votre espace client FIH. Créez un compte gratuitement — vos alertes apparaîtront automatiquement dans votre tableau de bord.
              </p>
            </div>

            {/* Optional: let guest enter a flight number first so it's pre-saved */}
            <div className="text-left">
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Numéro de vol <span className="text-muted-foreground text-xs">(optionnel — sera sauvegardé après inscription)</span>
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={flightNumber}
                  onChange={e => setFlightNumber(e.target.value.toUpperCase())}
                  placeholder="SN491"
                  maxLength={8}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 pl-9 font-mono text-sm uppercase focus:border-rdc-blue focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={'/inscription' as never}
                onClick={handleGuestFlightSave}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rdc-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-rdc-blue/85 transition-colors"
              >
                <UserPlus size={15} /> Créer un compte
              </Link>
              <Link
                to={'/login' as never}
                onClick={handleGuestFlightSave}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:border-rdc-blue hover:text-rdc-blue transition-colors"
              >
                <LogIn size={15} /> Se connecter
              </Link>
            </div>
          </div>
        )}

        {/* ── State: form (logged in, no flight selected yet) ── */}
        {pageState === 'form' && !foundFlight && (
          <form onSubmit={handleSearch} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-2.5 rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 px-4 py-3">
              <MessageCircle size={15} className="text-[#25D366] shrink-0" />
              <p className="text-xs text-muted-foreground">
                Connecté en tant que <span className="font-semibold text-rdc-anthracite">{user?.email}</span>. Les alertes seront envoyées via <span className="font-semibold text-[#25D366]">WhatsApp Business</span>.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Numéro de vol <span className="text-rdc-red">*</span>
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={flightNumber}
                  onChange={e => setFlightNumber(e.target.value.toUpperCase())}
                  placeholder="SN491"
                  maxLength={8}
                  className="pl-9 font-mono uppercase"
                  aria-invalid={!!errors.flightNumber}
                />
              </div>
              {errors.flightNumber && <p className="mt-1 text-xs text-rdc-red">{errors.flightNumber}</p>}
              <p className="mt-1 text-xs text-muted-foreground">Entrez le numéro de vol (ex: SN491, ET840, AF883)</p>
            </div>

            <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2">
              <Search size={15} /> Rechercher ce vol
            </Button>
          </form>
        )}

        {/* ── State: flight found, confirm subscription ── */}
        {pageState === 'form' && foundFlight && (
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
            {/* Flight found card */}
            <div className="rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#25D366] mb-2">Vol trouvé</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-rdc-blue/10 flex items-center justify-center shrink-0">
                  <Plane size={16} className="text-rdc-blue" />
                </div>
                <div>
                  <p className="font-bold text-rdc-anthracite font-mono">{foundFlight.flight_number}</p>
                  <p className="text-xs text-muted-foreground">
                    {foundFlight.type === 'departure'
                      ? `FIH → ${foundFlight.destination_iata}`
                      : `${foundFlight.origin_iata} → FIH`}
                    {' · '}
                    {new Date(foundFlight.scheduled_time).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Vous recevrez des notifications WhatsApp pour ce vol : statut, porte d'embarquement, retards et annulations.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => { setFoundFlight(null); setFlightNumber(''); }}
                className="flex-1"
              >
                Changer de vol
              </Button>
              <Button
                onClick={() => { void handleSubscribe(); }}
                className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2"
              >
                <MessageCircle size={15} /> Activer l'alerte
              </Button>
            </div>
          </div>
        )}

        {/* ── State: searching / loading ── */}
        {pageState === 'searching' && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <Loader2 size={28} className="animate-spin text-[#25D366]" />
            <p className="text-sm text-muted-foreground">Recherche en cours…</p>
          </div>
        )}

        {/* ── State: success ── */}
        {pageState === 'success' && (
          <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-8 text-center space-y-4">
            <CheckCircle size={40} className="mx-auto text-[#25D366]" />
            <div>
              <h2 className="font-display text-xl font-bold text-rdc-anthracite">Alerte activée !</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Vous serez notifié sur WhatsApp pour le vol <span className="font-semibold font-mono">{foundFlight?.flight_number}</span>.
              </p>
            </div>
            <Link
              to={'/compte/vols-suivis' as never}
              className="inline-flex items-center gap-2 rounded-xl bg-rdc-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-rdc-blue/85 transition-colors"
            >
              Voir mes vols suivis →
            </Link>
          </div>
        )}

        {/* ── State: error ── */}
        {pageState === 'error' && (
          <div className="rounded-2xl border border-rdc-red/20 bg-rdc-red/5 p-6 text-center space-y-4">
            <p className="text-sm text-rdc-red">{errorMsg}</p>
            <Button
              variant="outline"
              onClick={() => { setPageState(user ? 'form' : 'guest'); setFoundFlight(null); }}
            >
              Réessayer
            </Button>
          </div>
        )}

        {/* Info footer */}
        {(pageState === 'form' || pageState === 'guest') && (
          <div className="mt-6 flex gap-2.5 rounded-xl border border-border bg-muted/50 p-4">
            <Info size={15} className="mt-0.5 flex-shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Alertes envoyées via WhatsApp Business. WhatsApp doit être installé sur le numéro fourni. Désabonnement possible à tout moment depuis votre espace client ou en répondant STOP.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
