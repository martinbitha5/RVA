import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Bell, Save, CheckCircle, MessageSquare, Mail, Globe, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';

export const Route = createFileRoute('/compte/preferences')({
  component: PreferencesPage,
  head: () => ({ meta: [{ title: 'Préférences — Espace Client FIH' }] }),
});

interface Prefs {
  notification_sms: boolean;
  notification_email: boolean;
  preferred_language: string;
}

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rdc-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? 'bg-rdc-blue' : 'bg-muted-foreground/30'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function PreferencesPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Prefs>({
    notification_sms: false,
    notification_email: true,
    preferred_language: 'fr',
  });

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('notification_sms, notification_email, preferred_language')
        .eq('id', user.id)
        .single();

      if (profile) {
        setPrefs({
          notification_sms: (profile as Prefs).notification_sms ?? false,
          notification_email: (profile as Prefs).notification_email ?? true,
          preferred_language: (profile as Prefs).preferred_language ?? 'fr',
        });
      }
      setLoading(false);
    })();
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id ?? '',
          notification_sms: prefs.notification_sms,
          notification_email: prefs.notification_email,
          preferred_language: prefs.preferred_language,
          updated_at: new Date().toISOString(),
        } as never);
      if (updateError) throw updateError;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;
  }

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Préférences</h1>
        <p className="text-sm text-muted-foreground mt-1">Personnalisez votre expérience FIH</p>
      </div>

      <form onSubmit={e => { void handleSave(e); }} className="space-y-4">

        {/* ── Notifications ───────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Bell size={13} className="text-muted-foreground" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notifications</p>
            </div>
          </div>

          {/* SMS */}
          <div className="flex items-start gap-4 px-5 py-4 border-b border-border">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rdc-blue/10">
              <MessageSquare size={16} className="text-rdc-blue" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-rdc-anthracite">Alertes WhatsApp</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Retards, annulations, changements de porte · Vodacom, Airtel, Orange
              </p>
            </div>
            <Toggle
              checked={prefs.notification_sms}
              onChange={v => setPrefs(p => ({ ...p, notification_sms: v }))}
            />
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rdc-green/10">
              <Mail size={16} className="text-rdc-green" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-rdc-anthracite">Notifications email</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Confirmations de réservation, rappels, actualités FIH
              </p>
            </div>
            <Toggle
              checked={prefs.notification_email}
              onChange={v => setPrefs(p => ({ ...p, notification_email: v }))}
            />
          </div>
        </div>

        {/* ── Language ────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Globe size={13} className="text-muted-foreground" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Langue préférée</p>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'fr', label: 'Français', flag: '🇫🇷' },
                { value: 'en', label: 'English',  flag: '🇬🇧' },
              ].map(({ value, label, flag }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPrefs(p => ({ ...p, preferred_language: value }))}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    prefs.preferred_language === value
                      ? 'border-rdc-blue bg-rdc-blue/5 text-rdc-blue'
                      : 'border-border text-muted-foreground hover:border-rdc-blue/30 hover:text-rdc-anthracite'
                  }`}
                >
                  <span className="text-lg">{flag}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Alert types (informational) ─────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <AlertCircle size={13} className="text-muted-foreground" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Types d'alertes</p>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: 'Changement de statut', sub: 'Décollage, atterrissage, retard', active: true },
              { label: 'Changement de porte', sub: 'Nouvelle porte d\'embarquement', active: true },
              { label: 'Annulation', sub: 'Vol annulé ou détourné', active: true },
              { label: 'Offres & promotions', sub: 'Réductions parking et services', active: prefs.notification_email },
            ].map(({ label, sub, active }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-rdc-anthracite">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <Toggle checked={active} onChange={() => {}} disabled />
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-rdc-red/10 px-3 py-2.5 text-sm text-rdc-red">
            <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-rdc-green/10 px-3 py-2.5 text-sm text-rdc-green">
            <CheckCircle size={14} /> Préférences enregistrées avec succès.
          </div>
        )}

        <Button
          type="submit"
          disabled={saving}
          className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white flex items-center justify-center gap-2"
        >
          <Save size={14} />
          {saving ? 'Enregistrement…' : 'Sauvegarder les préférences'}
        </Button>
      </form>
    </div>
  );
}
