import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contactez-nous — FIH · RVA" }] }),
});

const CONTACT_ITEMS = [
  {
    Icon: Phone,
    label: 'Standard téléphonique',
    value: '+243 XX XXX XXXX',
    sub: 'Disponible 24h/24, 7j/7',
  },
  {
    Icon: Mail,
    label: 'Email général',
    value: 'contact@fih-rva.com',
    href: 'mailto:contact@fih-rva.com',
    sub: 'Réponse sous 48h ouvrées',
  },
  {
    Icon: Mail,
    label: 'Email RVA',
    value: 'info@fih-rva.com',
    href: 'mailto:info@fih-rva.com',
    sub: 'Direction Générale RVA',
  },
  {
    Icon: MapPin,
    label: 'Adresse',
    value: 'Boulevard Lumumba, Commune de Nsele',
    sub: 'Kinshasa, République Démocratique du Congo',
  },
  {
    Icon: Clock,
    label: 'Horaires d\'accueil',
    value: 'Lundi – Vendredi : 08h00 – 17h00',
    sub: 'Opérations aéroport : 24h/24',
  },
] as const;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const SUBJECTS = [
  'Information générale',
  'Réservation stationnement',
  'Vol / compagnie aérienne',
  'Boutiques & restaurants',
  'Accessibilité & PMR',
  'Plainte',
  'Partenariat commercial',
  'Presse & médias',
  'Autre',
] as const;

function ContactPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      // Store in pages table as a generic CMS entry, or directly email via edge function
      // For now: insert into a contact_messages concept using noise_complaints as fallback
      const { error } = await supabase.from('noise_complaints').insert({
        full_name: form.full_name,
        email: form.email || null,
        phone: form.phone || null,
        commune: 'other' as never,
        description: `[CONTACT — ${form.subject}]\n${form.message}`,
        incident_date: new Date().toISOString(),
        status: 'received',
      } as never);
      if (error) throw error;
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <CheckCircle size={48} className="text-rdc-green" />
          <p className="font-display font-bold text-2xl text-rdc-anthracite">Message envoyé !</p>
          <p className="text-sm text-muted-foreground">Nous avons bien reçu votre message et vous répondrons dans les meilleurs délais.</p>
          <Button variant="outline" onClick={() => { setStatus('idle'); setForm({ full_name: '', email: '', phone: '', subject: '', message: '' }); }}>
            Nouveau message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">FIH · RVA</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">Contactez-nous</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">
        Une question, une suggestion ou un problème ? Notre équipe est à votre disposition.
      </p>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Contact info */}
        <div className="space-y-4">
          {CONTACT_ITEMS.map(item => (
            <div key={item.label} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rdc-blue/10">
                <item.Icon size={16} className="text-rdc-blue" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                {('href' in item) ? (
                  <a href={item.href} className="font-medium text-rdc-anthracite hover:text-rdc-blue transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-medium text-rdc-anthracite">{item.value}</p>
                )}
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-rdc-yellow/40 bg-rdc-yellow/5 p-4 text-sm text-rdc-anthracite">
            <p className="font-semibold mb-1">Urgence opérationnelle</p>
            <p className="text-xs text-muted-foreground">Pour les urgences liées à un vol en cours, contactez directement votre compagnie aérienne ou le personnel de l'aéroport sur place.</p>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={e => { void handleSubmit(e); }} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium">Nom complet *</label>
              <Input required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} placeholder="Jean Mukendi" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Email *</label>
              <Input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jean@exemple.com" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium">Téléphone (optionnel)</label>
              <Input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+243 81 XXX XXXX" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Sujet *</label>
              <select required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="">Choisir un sujet</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Message *</label>
            <textarea required rows={6} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm resize-none"
              placeholder="Décrivez votre demande..." />
          </div>

          {status === 'error' && (
            <p className="text-xs text-rdc-red">{t('common.error')}</p>
          )}

          <Button type="submit" disabled={status === 'loading'} className="bg-rdc-blue hover:bg-rdc-blue/85 text-white flex items-center gap-2">
            <Send size={14} />
            {status === 'loading' ? t('common.loading') : 'Envoyer le message'}
          </Button>
        </form>
      </div>
    </div>
  );
}
