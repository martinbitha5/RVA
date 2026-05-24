import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { getPendingAlert, clearPendingAlert } from '@/lib/pendingAlert';
import { Plane, Eye, EyeOff } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Connexion — Espace Client FIH" }] }),
});

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = loginSchema.safeParse({ email, password });
    if (!res.success) { setError(res.error.issues[0]?.message ?? 'Erreur de validation'); return; }
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      // Apply any pending flight alert the user saved before logging in
      const pending = getPendingAlert();
      if (pending && authData.user) {
        let flightId = pending.flightId;

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
          // Check not already following
          const { data: existing } = await supabase
            .from('flight_alerts')
            .select('id')
            .eq('user_id', authData.user.id)
            .eq('flight_id', flightId)
            .eq('active', true)
            .maybeSingle();

          if (!existing) {
            await supabase.from('flight_alerts').insert({
              user_id: authData.user.id,
              flight_id: flightId,
              alert_types: ['status_change', 'gate_change', 'delay'],
              active: true,
            } as never);
          }
          clearPendingAlert();
          // Redirect to vols-suivis so they see the alert immediately
          void navigate({ to: '/compte/vols-suivis' as never });
          return;
        }
        clearPendingAlert();
      }

      void navigate({ to: '/compte' as never });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rdc-blue">
            <Plane size={24} className="text-white" />
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-xl text-rdc-anthracite">{t('auth.login')}</p>
            <p className="text-sm text-muted-foreground mt-0.5">Espace Client FIH</p>
          </div>
        </div>

        <form onSubmit={e => { void handleLogin(e); }} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('auth.email')}</label>
            <Input
              type="email" required autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="jean@exemple.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">{t('auth.password')}</label>
            <div className="relative">
              <Input
                type={showPw ? 'text' : 'password'} required autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className="pr-10"
              />
              <button
                type="button" onClick={() => setShowPw(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <Link to={'/compte' as never} className="mt-1.5 block text-right text-xs text-rdc-blue hover:underline">
              {t('auth.forgotPassword')}
            </Link>
          </div>

          {error && <p className="rounded-lg bg-rdc-red/10 px-3 py-2 text-sm text-rdc-red">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white">
            {loading ? t('common.loading') : t('auth.login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('auth.noAccount')}{' '}
          <Link to={'/inscription' as never} className="font-semibold text-rdc-blue hover:underline">
            {t('auth.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
