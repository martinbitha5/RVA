import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Volume2, AlertTriangle, MapPin, CheckCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CommuneEnum = Database['public']['Tables']['noise_complaints']['Row']['commune'];

export const Route = createFileRoute('/communaute/environnement-sonore')({
  component: EnvironnementSonorePage,
  head: () => ({ meta: [{ title: "Environnement sonore — FIH · RVA" }] }),
});

const NOISE_LEVELS = [
  { zone: 'Zone A — 75 dB+',  communes: ['Nsele centre', 'Proximité piste'],   color: 'bg-rdc-red text-white',     desc: 'Zone de nuisances sévères' },
  { zone: 'Zone B — 65–75 dB', communes: ['Masina nord', 'Kimbanseke ouest'],  color: 'bg-amber-500 text-white',   desc: 'Zone de nuisances modérées' },
  { zone: 'Zone C — 55–65 dB', communes: ['Masina sud', 'Kimbanseke est'],     color: 'bg-rdc-yellow text-rdc-anthracite', desc: 'Zone d\'influence' },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

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
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('community.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('community.noiseEnvironment')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('community.noiseSubtitle')}</p>

      {/* Noise zones */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Volume2 size={18} className="text-amber-500" /> Zones de bruit autour de FIH
      </h2>
      <div className="mb-10 space-y-3">
        {NOISE_LEVELS.map(z => (
          <div key={z.zone} className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
            <span className={`rounded-lg px-3 py-1 text-xs font-bold ${z.color}`}>{z.zone}</span>
            <div className="flex flex-wrap gap-2">
              {z.communes.map(c => (
                <span key={c} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={10} /> {c}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground ml-auto">{z.desc}</p>
          </div>
        ))}
      </div>

      {/* Noise complaint form */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <AlertTriangle size={18} className="text-amber-500" /> Déposer une plainte sonore
      </h2>

      {formStatus === 'success' ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-rdc-green/30 bg-rdc-green/5 p-10 text-center">
          <CheckCircle size={36} className="text-rdc-green" />
          <p className="font-semibold text-rdc-anthracite">{t('community.noiseComplaintSuccess')}</p>
          <p className="text-sm text-muted-foreground">{t('community.noiseComplaintSuccessDesc')}</p>
          <Button variant="outline" onClick={() => { setFormStatus('idle'); setForm({ full_name: '', email: '', phone: '', commune: '', description: '' }); }}>
            Nouvelle plainte
          </Button>
        </div>
      ) : (
        <form onSubmit={e => { void handleSubmit(e); }} className="grid gap-4 max-w-lg">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium">Nom complet *</label>
              <Input required value={form.full_name} onChange={e => setForm(f => ({...f, full_name: e.target.value}))} placeholder="Jean Mukendi" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Commune *</label>
              <select required value={form.commune} onChange={e => setForm(f => ({...f, commune: e.target.value}))}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="">Sélectionner</option>
                {['Nsele', 'Masina', 'Kimbanseke', "N'djili", 'Autre'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium">Téléphone</label>
              <Input type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+243 81 XXX XXXX" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Email</label>
              <Input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="jean@exemple.com" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Description de la nuisance *</label>
            <textarea required rows={4} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm resize-none"
              placeholder="Décrivez le type de nuisance, l'heure, la fréquence..." />
          </div>
          {formStatus === 'error' && (
            <p className="text-xs text-rdc-red">{t('common.error')}</p>
          )}
          <Button type="submit" disabled={formStatus === 'loading'} className="bg-rdc-blue hover:bg-rdc-blue/85 text-white">
            <Send size={14} className="mr-2" />
            {formStatus === 'loading' ? t('common.loading') : t('community.submitNoise')}
          </Button>
        </form>
      )}
    </div>
  );
}
