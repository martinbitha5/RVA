import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { User, Save, CheckCircle, Mail, Phone, Globe, Shield, CalendarDays, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const Route = createFileRoute('/compte/profil')({
  component: ProfilPage,
  head: () => ({ meta: [{ title: 'Mon profil — Espace Client FIH' }] }),
});

function ProfilPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({ full_name: '', phone: '', preferred_language: 'fr' });

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      setUser(data.user);
      setFields({
        full_name: (data.user.user_metadata?.['full_name'] as string | undefined) ?? '',
        phone: (data.user.user_metadata?.['phone'] as string | undefined) ?? '',
        preferred_language: 'fr',
      });
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: fields.full_name, phone: fields.phone || null },
      });
      if (updateError) throw updateError;

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
    return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;
  }

  const displayName = fields.full_name || user?.email?.split('@')[0] || 'U';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Mon profil</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez vos informations personnelles</p>
      </div>

      {/* ── Avatar card ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-rdc-blue to-rdc-blue/60 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {initials}
          </div>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-rdc-green border-2 border-card flex items-center justify-center">
            <CheckCircle size={12} className="text-white" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-xl text-rdc-anthracite truncate">{displayName}</p>
          <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <CalendarDays size={12} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Membre depuis {memberSince}</p>
          </div>
        </div>
      </div>

      {/* ── Form ────────────────────────────────────────────────────────── */}
      <form onSubmit={e => { void handleSave(e); }} className="space-y-4">

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <User size={13} className="text-muted-foreground" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Informations personnelles</p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Full name */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <User size={11} /> Nom complet
              </label>
              <Input
                value={fields.full_name}
                onChange={e => setFields(f => ({ ...f, full_name: e.target.value }))}
                placeholder="Jean Mukendi Kabila"
              />
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Mail size={11} /> Adresse email
              </label>
              <Input value={user?.email ?? ''} disabled className="opacity-60 cursor-not-allowed" />
              <p className="mt-1 text-xs text-muted-foreground">
                L'email ne peut pas être modifié ici ·{' '}
                <Link to={'/compte/securite' as never} className="text-rdc-blue hover:underline">
                  Sécurité du compte
                </Link>
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Phone size={11} /> Téléphone
              </label>
              <Input
                type="tel"
                value={fields.phone}
                onChange={e => setFields(f => ({ ...f, phone: e.target.value }))}
                placeholder="+243 81 XXX XXXX"
              />
              <p className="mt-1 text-xs text-muted-foreground">Numéros Vodacom, Airtel, Orange acceptés pour les alertes WhatsApp</p>
            </div>

            {/* Language */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Globe size={11} /> Langue préférée
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'fr', label: '🇫🇷 Français' },
                  { value: 'en', label: '🇬🇧 English' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFields(f => ({ ...f, preferred_language: value }))}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      fields.preferred_language === value
                        ? 'border-rdc-blue bg-rdc-blue/5 text-rdc-blue'
                        : 'border-border text-muted-foreground hover:border-rdc-blue/30'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-rdc-red/10 px-3 py-2.5 text-sm text-rdc-red">
            <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-2 rounded-lg bg-rdc-green/10 px-3 py-2.5 text-sm text-rdc-green">
            <CheckCircle size={14} /> Profil mis à jour avec succès.
          </div>
        )}

        <Button type="submit" disabled={saving} className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white flex items-center justify-center gap-2">
          <Save size={14} />
          {saving ? 'Enregistrement…' : 'Sauvegarder le profil'}
        </Button>
      </form>

      {/* ── Quick links ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Accès rapide</p>
        <div className="grid grid-cols-2 gap-2">
          <Link to={'/compte/securite' as never}
            className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-rdc-anthracite hover:border-rdc-blue/30 transition-all">
            <Shield size={13} className="text-rdc-blue" /> Sécurité
          </Link>
          <Link to={'/compte/preferences' as never}
            className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-rdc-anthracite hover:border-rdc-blue/30 transition-all">
            <Globe size={13} className="text-rdc-blue" /> Préférences
          </Link>
        </div>
      </div>
    </div>
  );
}
