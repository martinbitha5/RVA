import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { getPendingAlert, clearPendingAlert } from '@/lib/pendingAlert';
import { Plane, CheckCircle, MessageCircle } from 'lucide-react';

export const Route = createFileRoute('/inscription')({
  component: InscriptionPage,
  head: () => ({ meta: [{ title: "Créer un compte — Espace Client FIH" }] }),
});

const registerSchema = z.object({
  fullName: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Mot de passe minimum 8 caractères'),
});

function InscriptionPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pending = getPendingAlert();           // read once at render time
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = registerSchema.safeParse(fields);
    if (!res.success) { setError(res.error.issues[0]?.message ?? 'Erreur'); return; }
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: fields.email,
        password: fields.password,
        options: {
          data: { full_name: fields.fullName, phone: fields.phone || null },
        },
      });
      if (authError) throw authError;

      // If there's a pending flight alert, register it immediately
      if (pending && authData.user) {
        let flightId = pending.flightId;

        // If we only stored a flight number (guest searched but wasn't logged in),
        // look up the flight now
        if (flightId.startsWith('__lookup__')) {
          const num = flightId.replace('__lookup__', '');
          const { data: flight } = await supabase
            .from('flights')
            .select('id')
            .ilike('flight_number', num)
            .gte('scheduled_time', new Date().toISOString())
            .order('scheduled_time', { ascending: true })
            .limit(1)
            .maybeSingle();
          flightId = (flight as { id: string } | null)?.id ?? '';
        }

        if (flightId && !flightId.startsWith('__')) {
          await supabase.from('flight_alerts').insert({
            user_id: authData.user.id,
            flight_id: flightId,
            alert_types: ['status_change', 'gate_change', 'delay'],
            active: true,
          } as never);
          setAlertSaved(true);
        }
        clearPendingAlert();
      }

      setSuccess(true);
      setTimeout(() => {
        void navigate({ to: '/login' as never });
      }, 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <CheckCircle size={48} className="text-rdc-green" />
          <p className="font-display font-bold text-2xl text-rdc-anthracite">Compte créé !</p>
          <p className="text-sm text-muted-foreground">
            Vérifiez votre boîte email pour confirmer votre adresse.
          </p>
          {alertSaved && (
            <div className="flex items-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-4 py-3 text-sm text-[#25D366]">
              <MessageCircle size={16} className="shrink-0" />
              <span>
                Votre alerte WhatsApp pour le vol{' '}
                <span className="font-bold font-mono">{pending?.flightNumber}</span>{' '}
                a été enregistrée dans votre espace client.
              </span>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Redirection dans 4 secondes…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rdc-blue">
            <Plane size={24} className="text-white" />
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-xl text-rdc-anthracite">{t('auth.register')}</p>
            <p className="text-sm text-muted-foreground mt-0.5">Créez votre espace client FIH</p>
          </div>
        </div>

        {/* Show pending alert hint */}
        {pending && (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-3 py-2.5">
            <MessageCircle size={14} className="text-[#25D366] shrink-0" />
            <p className="text-xs text-muted-foreground">
              Après inscription, votre alerte WhatsApp pour le vol{' '}
              <span className="font-bold font-mono text-rdc-anthracite">{pending.flightNumber}</span>{' '}
              sera automatiquement enregistrée.
            </p>
          </div>
        )}

        <form onSubmit={e => { void handleRegister(e); }} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Nom complet *</label>
            <Input
              required
              value={fields.fullName}
              onChange={e => setFields(f => ({ ...f, fullName: e.target.value }))}
              placeholder="Jean Mukendi"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('auth.email')} *</label>
            <Input
              type="email" required autoComplete="email"
              value={fields.email}
              onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
              placeholder="jean@exemple.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Numéro WhatsApp <span className="text-muted-foreground text-xs">(optionnel)</span>
            </label>
            <Input
              type="tel"
              value={fields.phone}
              onChange={e => setFields(f => ({ ...f, phone: e.target.value }))}
              placeholder="+243 81 XXX XXXX"
            />
            <p className="mt-1 text-xs text-muted-foreground">Pour recevoir vos alertes de vol via WhatsApp</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('auth.password')} *</label>
            <Input
              type="password" required autoComplete="new-password"
              value={fields.password}
              onChange={e => setFields(f => ({ ...f, password: e.target.value }))}
              placeholder="8 caractères minimum"
            />
          </div>

          {error && <p className="rounded-lg bg-rdc-red/10 px-3 py-2 text-sm text-rdc-red">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white">
            {loading ? t('common.loading') : 'Créer mon compte'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('auth.haveAccount')}{' '}
          <Link to={'/login' as never} className="font-semibold text-rdc-blue hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
