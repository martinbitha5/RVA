import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Volume2, AlertTriangle, MapPin, CheckCircle, Send, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CommuneEnum = Database['public']['Tables']['noise_complaints']['Row']['commune'];

export const Route = createFileRoute('/communaute/environnement-sonore')({
  component: EnvironnementSonoreLayout,
  head: () => ({ meta: [{ title: "Environnement sonore — Aéroport International de N'djili · FIH" }] }),
});

const NOISE_ZONES = [
  {
    zone: 'Zone A — 75 dB et plus',
    communes: ['Nsele centre', 'Abords immédiats piste 01/19'],
    color: 'bg-rdc-red text-white',
    barColor: 'bg-rdc-red',
    desc: 'Nuisances sévères — restrictions de construction résidentielle',
    width: 100,
  },
  {
    zone: 'Zone B — 65 à 75 dB',
    communes: ['Masina nord', 'Kimbanseke ouest'],
    color: 'bg-amber-500 text-white',
    barColor: 'bg-amber-500',
    desc: 'Nuisances modérées — isolation acoustique obligatoire',
    width: 68,
  },
  {
    zone: 'Zone C — 55 à 65 dB',
    communes: ['Masina sud', 'Kimbanseke est', 'N\'djili'],
    color: 'bg-rdc-yellow text-rdc-anthracite',
    barColor: 'bg-rdc-yellow',
    desc: 'Zone d\'influence — recommandations d\'isolation',
    width: 42,
  },
];

const MEASURES = [
  { title: 'Procédures de vol silencieux', desc: 'Trajectoires optimisées la nuit (22h–06h) pour limiter l\'exposition sonore des communes de Nsele et Masina.' },
  { title: 'Couvre-feu sélectif', desc: 'Restriction des opérations d\'aéronefs bruyants (Cat. 3) entre 23h et 05h LMT sauf urgence ou raison opérationnelle.' },
  { title: 'Suivi en temps réel', desc: 'Réseau de 8 sonomètres permanents dans les communes riveraines — données transmises en temps réel au centre de contrôle.' },
  { title: 'Isolation acoustique', desc: 'Programme d\'aide à l\'insonorisation des habitations en zone A (75 dB+) — 120 logements traités en 2023.' },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function EnvironnementSonoreLayout() {
  const matches = useMatches();
  const isLeaf = matches.at(-1)?.routeId === '/communaute/environnement-sonore';
  return isLeaf ? <EnvironnementSonorePage /> : <Outlet />;
}

function EnvironnementSonorePage() {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', commune: '', description: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const payload = {
        full_name: form.full_name,
        email: form.email || null,
        phone: form.phone || null,
        commune: form.commune as CommuneEnum,
        description: form.description,
        incident_date: new Date().toISOString(),
        status: 'received' as const,
      };
      const { error } = await supabase.from('noise_complaints').insert(payload as never);
      if (error) throw error;
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <main id="main-content">
      <PageHero
        gradient="dark"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Communauté', href: '/communaute' },
          { label: 'Environnement sonore' },
        ]}
        eyebrow="Gestion du bruit"
        title={t('community.noiseEnvironment')}
        subtitle={t('community.noiseSubtitle')}
      />

      {/* Alert band */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container py-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Travaux en cours — impact sonore</p>
              <p className="text-sm text-amber-700">
                La réhabilitation de la piste 01/19 (jan. 2025 – sep. 2026) entraîne des opérations nocturnes supplémentaires entre 05h30 et 07h LMT (lun.–mer.). Nous présentons nos excuses aux riverains.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Noise zones */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Plan d'exposition au bruit</p>
          </div>
          <h2 className="font-display mb-3 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            <Volume2 size={22} className="inline mr-2 text-amber-500" />
            Zones de bruit autour de FIH
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
            Le Plan d'Exposition au Bruit (PEB) de l'Aéroport de N'djili délimite trois zones selon le niveau sonore moyen (indice Lden — jour/soirée/nuit).
          </p>

          <div className="space-y-4">
            {NOISE_ZONES.map(z => (
              <div key={z.zone} className="border border-border bg-card overflow-hidden">
                <div className="h-1.5 bg-muted">
                  <div className={`h-full ${z.barColor}`} style={{ width: `${z.width}%` }} />
                </div>
                <div className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <span className={`flex-shrink-0 px-3 py-1.5 text-xs font-bold ${z.color}`}>{z.zone}</span>
                  <div className="flex flex-wrap gap-2">
                    {z.communes.map(c => (
                      <span key={c} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={10} /> {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground ml-auto">{z.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Measures */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Atténuation</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">Mesures de réduction du bruit</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {MEASURES.map(m => (
              <div key={m.title} className="flex gap-4 border border-border bg-background p-6">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-rdc-blue/10">
                  <CheckCircle size={16} className="text-rdc-blue" />
                </div>
                <div>
                  <p className="font-bold text-rdc-anthracite mb-2">{m.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complaint form */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Signalement</p>
          </div>
          <h2 className="font-display mb-3 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            <AlertTriangle size={20} className="inline mr-2 text-amber-500" />
            Déposer une plainte sonore
          </h2>
          <p className="mb-8 max-w-xl text-sm text-muted-foreground">
            Vous résidez dans une commune riveraine et souhaitez signaler une nuisance ? Remplissez ce formulaire — votre plainte est transmise directement au service environnement de la RVA.
          </p>

          {formStatus === 'success' ? (
            <div className="flex flex-col items-center gap-4 border border-rdc-green/30 bg-rdc-green/5 p-12 text-center max-w-lg">
              <CheckCircle size={40} className="text-rdc-green" />
              <p className="font-bold text-xl text-rdc-anthracite">{t('community.noiseComplaintSuccess')}</p>
              <p className="text-sm text-muted-foreground">{t('community.noiseComplaintSuccessDesc')}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFormStatus('idle');
                  setForm({ full_name: '', email: '', phone: '', commune: '', description: '' });
                }}
              >
                Nouvelle plainte
              </Button>
            </div>
          ) : (
            <form
              onSubmit={e => { void handleSubmit(e); }}
              className="grid gap-4 max-w-lg"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">Nom complet *</label>
                  <Input
                    required
                    value={form.full_name}
                    onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                    placeholder="Jean Mukendi"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">Commune *</label>
                  <select
                    required
                    value={form.commune}
                    onChange={e => setForm(f => ({ ...f, commune: e.target.value }))}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="">Sélectionner</option>
                    {['Nsele', 'Masina', 'Kimbanseke', "N'djili", 'Autre'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">Téléphone</label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+243 81 XXX XXXX"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold">Description de la nuisance *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm resize-none focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                  placeholder="Décrivez la nuisance : type de bruit, heure, fréquence, impact ressenti..."
                />
              </div>

              {formStatus === 'error' && (
                <p className="text-xs text-rdc-red">{t('common.error')}</p>
              )}

              <Button
                type="submit"
                disabled={formStatus === 'loading'}
                className="bg-rdc-blue hover:bg-rdc-blue/85 text-white"
              >
                <Send size={14} className="mr-2" />
                {formStatus === 'loading' ? t('common.loading') : t('community.submitNoise')}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Related links */}
      <div className="bg-muted/40 border-t border-border">
        <div className="container py-8">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/communaute/travaux-pistes"
              className="flex items-center gap-2 text-sm font-medium text-rdc-blue hover:text-rdc-blue/80 transition-colors"
            >
              Travaux sur pistes <ArrowRight size={13} />
            </Link>
            <Link
              to="/communaute/relations-communaute"
              className="flex items-center gap-2 text-sm font-medium text-rdc-blue hover:text-rdc-blue/80 transition-colors"
            >
              Relations communautaires <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
