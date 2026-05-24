import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, ArrowRight, CheckCircle } from 'lucide-react';

export function NewsletterCTA() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="section-blue">
      <div className="container py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_480px] items-center">

          {/* Left text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-rdc-yellow" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rdc-yellow">
                {t('home.newsletter.eyebrow')}
              </p>
            </div>
            <h2 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              {t('home.newsletter.title')}
            </h2>
            <p className="mt-4 text-white/55 text-base leading-relaxed max-w-lg">
              {t('home.newsletter.subtitle')}
            </p>

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                t('home.newsletter.feature1'),
                t('home.newsletter.feature2'),
                t('home.newsletter.feature3'),
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <Bell size={13} className="text-rdc-yellow shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white/8 border border-white/15 p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <CheckCircle size={40} className="text-rdc-yellow" />
                <p className="font-display font-bold text-white text-xl">
                  {t('home.newsletter.successTitle')}
                </p>
                <p className="text-sm text-white/55">
                  {t('home.newsletter.successDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                    {t('auth.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jean@exemple.com"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/25 px-4 py-3 text-sm focus:outline-none focus:border-rdc-yellow transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                    Téléphone (alertes WhatsApp)
                  </label>
                  <input
                    type="tel"
                    placeholder="+243 81 XXX XXXX"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/25 px-4 py-3 text-sm focus:outline-none focus:border-rdc-yellow transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-rdc-yellow text-rdc-anthracite font-bold text-sm py-3.5 flex items-center justify-center gap-2 hover:bg-rdc-yellow/90 transition-colors tracking-wide">
                  {t('home.newsletter.cta')}
                  <ArrowRight size={14} />
                </button>
                <p className="text-[11px] text-white/30 text-center">
                  {t('home.newsletter.privacy')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
