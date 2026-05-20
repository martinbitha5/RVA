import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { User, Save, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const Route = createFileRoute('/compte/profil')({
  component: ProfilPage,
  head: () => ({ meta: [{ title: "Mon profil — Espace Client FIH" }] }),
});

function ProfilPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({ full_name: '', phone: '', preferred_language: 'fr' });

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { void navigate({ to: '/login' as never }); return; }
      setUser(data.user);
      setFields({
        full_name: (data.user.user_metadata?.['full_name'] as string | undefined) ?? '',
        phone: (data.user.user_metadata?.['phone'] as string | undefined) ?? '',
        preferred_language: 'fr',
      });
      setLoading(false);
    });
  }, [navigate]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: fields.full_name, phone: fields.phone || null },
      });
      if (updateError) throw updateError;

      // Update profiles table
      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          email: user.email ?? '',
          full_name: fields.full_name,
          phone: fields.phone || null,
          preferred_language: fields.preferred_language,
          updated_at: new Date().toISOString(),
        } as never);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
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
          <User size={18} className="text-rdc-blue" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Mon profil</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={e => { void handleSave(e); }} className="space-y-5 max-w-md">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Nom complet</label>
          <Input value={fields.full_name}
            onChange={e => setFields(f => ({ ...f, full_name: e.target.value }))}
            placeholder="Jean Mukendi" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <Input value={user?.email ?? ''} disabled className="opacity-60 cursor-not-allowed" />
          <p className="mt-1 text-xs text-muted-foreground">L'adresse email ne peut pas être modifiée ici.</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Téléphone</label>
          <Input type="tel" value={fields.phone}
            onChange={e => setFields(f => ({ ...f, phone: e.target.value }))}
            placeholder="+243 81 XXX XXXX" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Langue préférée</label>
          <select value={fields.preferred_language}
            onChange={e => setFields(f => ({ ...f, preferred_language: e.target.value }))}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        {error && <p className="rounded-lg bg-rdc-red/10 px-3 py-2 text-sm text-rdc-red">{error}</p>}

        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-rdc-green/10 px-3 py-2 text-sm text-rdc-green">
            <CheckCircle size={14} /> Profil mis à jour avec succès.
          </div>
        )}

        <Button type="submit" disabled={saving} className="bg-rdc-blue hover:bg-rdc-blue/85 text-white flex items-center gap-2">
          <Save size={14} />
          {saving ? t('common.loading') : 'Enregistrer les modifications'}
        </Button>
      </form>
    </div>
  );
}
