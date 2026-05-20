import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Bell, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email(),
});

type State = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterCTA() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [fieldError, setFieldError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldError('');

    const result = schema.safeParse({ email });
    if (!result.success) {
      setFieldError(t('newsletter.invalidEmail'));
      return;
    }

    setState('loading');
    try {
      // Store in profiles (upsert on email — harmless if user exists)
      // We simply store the email interest; full auth flow is in ÉTAPE 8
      const { error } = await supabase
        .from('profiles')
        .upsert({ email, notification_email: true } as never, { onConflict: 'email' });
      if (error) throw error;
      setState('success');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  return (
    <section className="bg-rdc-anthracite py-14">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rdc-blue/20">
            <Bell size={20} className="text-rdc-blue" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            {t('newsletter.title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {t('newsletter.subtitle')}
          </p>

          {state === 'success' ? (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-rdc-green/30 bg-rdc-green/10 py-4 text-rdc-green">
              <CheckCircle size={18} />
              <span className="font-medium">{t('newsletter.successMessage')}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.emailPlaceholder')}
                    className="border-white/20 bg-white/10 pl-9 text-white placeholder:text-white/40 focus-visible:border-rdc-blue focus-visible:ring-rdc-blue/30"
                    disabled={state === 'loading'}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? 'email-error' : undefined}
                  />
                </div>
                {fieldError && (
                  <p id="email-error" className="mt-1.5 text-left text-xs text-red-400">
                    {fieldError}
                  </p>
                )}
                {state === 'error' && (
                  <p className="mt-1.5 text-left text-xs text-red-400">
                    {t('newsletter.errorMessage')}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={state === 'loading'}
                className="bg-rdc-blue hover:bg-rdc-blue/85 text-white sm:flex-shrink-0"
              >
                {state === 'loading' ? t('common.loading') : t('newsletter.cta')}
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/30">{t('newsletter.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
}
