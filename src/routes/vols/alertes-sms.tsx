import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Bell, Phone, Plane, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/vols/alertes-sms')({
  component: AlertesSmsPage,
  head: () => ({
    meta: [
      { title: "Alertes SMS vols — Aéroport N'djili · FIH" },
      { name: 'description', content: 'Abonnez-vous aux alertes SMS pour votre vol à FIH. Recevez des notifications de statut, retard, changement de porte.' },
    ],
  }),
});

const schema = z.object({
  phone: z.string().min(9, 'Numéro trop court').regex(/^\+?[0-9\s\-()]+$/, 'Numéro invalide'),
  flight: z.string().min(3, 'Numéro de vol invalide').optional().or(z.literal('')),
});

type State = 'idle' | 'loading' | 'success' | 'error';

function AlertesSmsPage() {
  const { t } = useTranslation();
  const [phone, setPhone]   = useState('');
  const [flight, setFlight] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState]   = useState<State>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = schema.safeParse({ phone, flight: flight || undefined });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }

    setState('loading');
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ phone, notification_sms: true } as never, { onConflict: 'phone' });
      if (error) throw error;
      setState('success');
      setPhone('');
      setFlight('');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rdc-blue/10">
            <Bell size={24} className="text-rdc-blue" />
          </div>
          <h1 className="font-display text-3xl font-bold text-rdc-anthracite">{t('flights.smsAlerts')}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('vols.sms.subtitle')}</p>
        </div>

        {/* Features */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {SMS_FEATURES.map((f) => (
            <div key={f.key} className="rounded-xl border border-border bg-card p-4 text-center">
              <f.icon size={18} className="mx-auto mb-2 text-rdc-blue" />
              <p className="text-xs font-medium text-foreground">{t(f.key)}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        {state === 'success' ? (
          <div className="rounded-2xl border border-rdc-green/20 bg-rdc-green/5 p-8 text-center">
            <CheckCircle size={32} className="mx-auto mb-3 text-rdc-green" />
            <h2 className="font-display text-lg font-semibold text-rdc-anthracite">{t('vols.sms.successTitle')}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t('vols.sms.successDesc')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="space-y-5">
              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {t('vols.sms.phoneLabel')} <span className="text-rdc-red">*</span>
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+243 8X XXX XXXX"
                    className="pl-9"
                    aria-invalid={!!errors.phone}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-rdc-red">{errors.phone}</p>}
                <p className="mt-1 text-xs text-muted-foreground">{t('vols.sms.phoneHint')}</p>
              </div>

              {/* Flight number (optional) */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {t('vols.sms.flightLabel')} <span className="text-muted-foreground text-xs">({t('common.optional')})</span>
                </label>
                <div className="relative">
                  <Plane size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground -rotate-45" />
                  <Input
                    value={flight}
                    onChange={(e) => setFlight(e.target.value.toUpperCase())}
                    placeholder="SN491"
                    className="pl-9 font-mono uppercase"
                    aria-invalid={!!errors.flight}
                  />
                </div>
                {errors.flight && <p className="mt-1 text-xs text-rdc-red">{errors.flight}</p>}
              </div>

              {state === 'error' && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {t('newsletter.errorMessage')}
                </p>
              )}

              <Button
                type="submit"
                disabled={state === 'loading'}
                className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white gap-2"
              >
                <Bell size={15} />
                {state === 'loading' ? t('common.loading') : t('vols.sms.cta')}
              </Button>
            </div>
          </form>
        )}

        {/* Info */}
        <div className="mt-6 flex gap-2.5 rounded-xl border border-border bg-muted/50 p-4">
          <Info size={15} className="mt-0.5 flex-shrink-0 text-muted-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">{t('vols.sms.disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}

const SMS_FEATURES = [
  { key: 'vols.sms.featureStatus', icon: Bell },
  { key: 'vols.sms.featureGate',   icon: Plane },
  { key: 'vols.sms.featureDelay',  icon: CheckCircle },
];
