import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Bell, Save, CheckCircle, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const Route = createFileRoute('/compte/preferences')({
  component: PreferencesPage,
  head: () => ({ meta: [{ title: "Préférences — Espace Client FIH" }] }),
});

interface Prefs {
  notification_sms: boolean;
  notification_email: boolean;
}

function PreferencesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Prefs>({ notification_sms: false, notification_email: true });

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { void navigate({ to: '/login' as never }); return; }
      setUser(userData.user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('notification_sms, notification_email')
        .eq('id', userData.user.id)
        .single();

      if (profile) {
        setPrefs({
          notification_sms: (profile as Prefs).notification_sms ?? false,
          notification_email: (profile as Prefs).notification_email ?? true,
        });
      }
      setLoading(false);
    })();
  }, [navigate]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          notification_sms: prefs.notification_sms,
          notification_email: prefs.notification_email,
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
    return <div className="container py-20 text-center text-sm text-muted-foreground">{t('common.loading')}</div>;
  }

  return (
    <div className="container py-10 md:py-14 max-w-2xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <Bell size={18} className="text-rdc-blue" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Préférences</h1>
          <p className="text-sm text-muted-foreground">Gérez vos notifications et alertes</p>
        </div>
      </div>

      <form onSubmit={e => { void handleSave(e); }} className="space-y-4 max-w-md">
        {/* SMS */}
        <label className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 cursor-pointer hover:border-rdc-blue/30 transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rdc-blue/10">
            <MessageSquare size={16} className="text-rdc-blue" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-rdc-anthracite">Alertes SMS</p>
            <p className="text-sm text-muted-foreground mt-0.5">Recevez des SMS pour les changements de statut de vos vols suivis (retards, annulations, ouverture de porte).</p>
          </div>
          <div className="shrink-0 mt-0.5">
            <input type="checkbox" checked={prefs.notification_sms}
              onChange={e => setPrefs(p => ({ ...p, notification_sms: e.target.checked }))}
              className="h-4 w-4 rounded border-border accent-rdc-blue" />
          </div>
        </label>

        {/* Email */}
        <label className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 cursor-pointer hover:border-rdc-blue/30 transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rdc-blue/10">
            <Mail size={16} className="text-rdc-blue" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-rdc-anthracite">Notifications email</p>
            <p className="text-sm text-muted-foreground mt-0.5">Recevez des emails de confirmation de réservation, rappels et informations opérationnelles.</p>
          </div>
          <div className="shrink-0 mt-0.5">
            <input type="checkbox" checked={prefs.notification_email}
              onChange={e => setPrefs(p => ({ ...p, notification_email: e.target.checked }))}
              className="h-4 w-4 rounded border-border accent-rdc-blue" />
          </div>
        </label>

        {error && <p className="rounded-lg bg-rdc-red/10 px-3 py-2 text-sm text-rdc-red">{error}</p>}

        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-rdc-green/10 px-3 py-2 text-sm text-rdc-green">
            <CheckCircle size={14} /> Préférences enregistrées.
          </div>
        )}

        <Button type="submit" disabled={saving} className="bg-rdc-blue hover:bg-rdc-blue/85 text-white flex items-center gap-2">
          <Save size={14} />
          {saving ? t('common.loading') : 'Enregistrer'}
        </Button>
      </form>
    </div>
  );
}
