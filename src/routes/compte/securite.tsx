import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Shield, Key, Eye, EyeOff, CheckCircle, AlertCircle, Smartphone, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';

export const Route = createFileRoute('/compte/securite')({
  component: SecuritePage,
  head: () => ({ meta: [{ title: 'Sécurité — Espace Client FIH' }] }),
});

function SecuritePage() {
  const { user } = useUser();

  // Password change state
  const [pwFields, setPwFields] = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);

    if (pwFields.next.length < 8) {
      setPwError('Le nouveau mot de passe doit contenir au moins 8 caractères.'); return;
    }
    if (pwFields.next !== pwFields.confirm) {
      setPwError('Les deux mots de passe ne correspondent pas.'); return;
    }

    setPwSaving(true);
    try {
      // Re-authenticate then update
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email ?? '',
        password: pwFields.current,
      });
      if (signInError) { setPwError('Mot de passe actuel incorrect.'); return; }

      const { error: updateError } = await supabase.auth.updateUser({ password: pwFields.next });
      if (updateError) throw updateError;

      setPwSuccess(true);
      setPwFields({ current: '', next: '', confirm: '' });
      setTimeout(() => setPwSuccess(false), 5000);
    } catch (err) {
      setPwError(err instanceof Error ? err.message : 'Erreur lors du changement de mot de passe.');
    } finally {
      setPwSaving(false);
    }
  }

  if (!user) return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;

  const lastSignIn = user?.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '—';
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    : '—';

  const pwStrength = (() => {
    const p = pwFields.next;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: 'Faible', color: 'bg-rdc-red', width: '25%' };
    if (score === 2) return { label: 'Moyen', color: 'bg-amber-500', width: '50%' };
    if (score === 3) return { label: 'Bon', color: 'bg-rdc-blue', width: '75%' };
    return { label: 'Très fort', color: 'bg-rdc-green', width: '100%' };
  })();

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Sécurité</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez la sécurité de votre compte</p>
      </div>

      {/* ── Account info ────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={15} className="text-rdc-blue" />
          <h2 className="font-semibold text-sm text-rdc-anthracite">Informations du compte</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Clock size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Dernière connexion</span>
            </div>
            <span className="text-sm font-medium text-rdc-anthracite">{lastSignIn}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle size={14} className="text-rdc-green" />
              <span className="text-sm text-muted-foreground">Compte créé le</span>
            </div>
            <span className="text-sm font-medium text-rdc-anthracite">{createdAt}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle size={14} className="text-rdc-green" />
              <span className="text-sm text-muted-foreground">Email vérifié</span>
            </div>
            <span className="text-sm font-medium text-rdc-green">Oui</span>
          </div>
        </div>
      </div>

      {/* ── Change password ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Key size={15} className="text-rdc-blue" />
          <h2 className="font-semibold text-sm text-rdc-anthracite">Changer le mot de passe</h2>
        </div>

        <form onSubmit={e => { void handleChangePassword(e); }} className="space-y-4">
          {/* Current password */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Mot de passe actuel</label>
            <div className="relative">
              <Input
                type={showPw.current ? 'text' : 'password'}
                required
                value={pwFields.current}
                onChange={e => setPwFields(f => ({ ...f, current: e.target.value }))}
                placeholder="••••••••"
                className="pr-10"
              />
              <button type="button" onClick={() => setShowPw(s => ({ ...s, current: !s.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw.current ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Nouveau mot de passe</label>
            <div className="relative">
              <Input
                type={showPw.next ? 'text' : 'password'}
                required
                value={pwFields.next}
                onChange={e => setPwFields(f => ({ ...f, next: e.target.value }))}
                placeholder="8 caractères minimum"
                className="pr-10"
              />
              <button type="button" onClick={() => setShowPw(s => ({ ...s, next: !s.next }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw.next ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {pwStrength && (
              <div className="mt-2">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${pwStrength.color} transition-all duration-300`} style={{ width: pwStrength.width }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Force : <span className="font-medium">{pwStrength.label}</span></p>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Confirmer le nouveau mot de passe</label>
            <div className="relative">
              <Input
                type={showPw.confirm ? 'text' : 'password'}
                required
                value={pwFields.confirm}
                onChange={e => setPwFields(f => ({ ...f, confirm: e.target.value }))}
                placeholder="••••••••"
                className={`pr-10 ${pwFields.confirm && pwFields.next !== pwFields.confirm ? 'border-rdc-red' : ''}`}
              />
              <button type="button" onClick={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw.confirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {pwFields.confirm && pwFields.next !== pwFields.confirm && (
              <p className="text-xs text-rdc-red mt-1">Les mots de passe ne correspondent pas.</p>
            )}
          </div>

          {pwError && (
            <div className="flex items-start gap-2 rounded-lg bg-rdc-red/10 px-3 py-2.5 text-sm text-rdc-red">
              <AlertCircle size={14} className="mt-0.5 shrink-0" /> {pwError}
            </div>
          )}
          {pwSuccess && (
            <div className="flex items-center gap-2 rounded-lg bg-rdc-green/10 px-3 py-2.5 text-sm text-rdc-green">
              <CheckCircle size={14} /> Mot de passe changé avec succès.
            </div>
          )}

          <Button
            type="submit"
            disabled={pwSaving}
            className="bg-rdc-blue hover:bg-rdc-blue/85 text-white flex items-center gap-2"
          >
            <Key size={13} />
            {pwSaving ? 'Enregistrement…' : 'Changer le mot de passe'}
          </Button>
        </form>
      </div>

      {/* ── 2FA ─────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Smartphone size={15} className="text-rdc-blue" />
            <h2 className="font-semibold text-sm text-rdc-anthracite">Authentification à deux facteurs</h2>
          </div>
          <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            Bientôt
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          La double authentification par SMS ou application OTP sera disponible prochainement pour renforcer la sécurité de votre espace client FIH.
        </p>
      </div>

      {/* ── Danger zone ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-rdc-red/20 bg-rdc-red/5 p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={15} className="text-rdc-red" />
          <h2 className="font-semibold text-sm text-rdc-red">Zone de danger</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          La suppression de votre compte est définitive et entraîne la perte de vos points fidélité et réservations.
        </p>
        <button className="text-xs font-medium text-rdc-red hover:underline">
          Demander la suppression de mon compte
        </button>
      </div>
    </div>
  );
}
