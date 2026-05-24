import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  AlertTriangle, Send, CheckCircle, ArrowLeft, ArrowRight,
  Clock, Mail, Phone, FileText, MapPin, ShieldCheck,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';
import { useTranslation } from 'react-i18next';

type CommuneEnum = Database['public']['Tables']['noise_complaints']['Row']['commune'];
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export const Route = createFileRoute('/communaute/environnement-sonore/plaintes')({
  component: PlaintesPage,
  head: () => ({
    meta: [
      { title: "Déposer une plainte sonore — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Signalez une nuisance sonore de l'aéroport FIH auprès de la RVA. Formulaire en ligne, traitement sous 15 jours ouvrés." },
    ],
  }),
});

const STEPS = [
  {
    n: '01',
    icon: FileText,
    title: 'Remplissez le formulaire',
    desc: 'Décrivez la nuisance (heure, type de bruit, fréquence, impact) et indiquez votre commune. Vos coordonnées nous permettent de vous répondre.',
  },
  {
    n: '02',
    icon: ShieldCheck,
    title: 'Transmission à la RVA',
    desc: 'Votre signalement est transmis automatiquement au service Environnement de la Régie des Voies Aériennes, en charge de la gestion sonore de FIH.',
  },
  {
    n: '03',
    icon: Clock,
    title: 'Traitement sous 15 jours',
    desc: 'Un responsable étudie votre plainte, vérifie les données des sonomètres et vous répond par email ou téléphone dans un délai de 15 jours ouvrés.',
  },
];

const NOISE_ZONES = [
  { label: 'Zone A — 75 dB+',   communes: 'Nsele centre, Abords piste 01/19', color: 'bg-rdc-red',   desc: 'Nuisances sévères' },
  { label: 'Zone B — 65-75 dB', communes: 'Masina nord, Kimbanseke ouest',     color: 'bg-amber-500', desc: 'Nuisances modérées' },
  { label: 'Zone C — 55-65 dB', communes: "Masina sud, Kimbanseke est, N'djili", color: 'bg-rdc-yellow', desc: "Zone d'influence" },
];

const COMMUNES = ['Nsele', 'Masina', 'Kimbanseke', "N'djili", 'Autre'];

function PlaintesPage() {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', commune: '', address: '', description: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const { error } = await supabase.from('noise_complaints').insert({
        full_name:     form.full_name,
        email:         form.email     || null,
        phone:         form.phone     || null,
        commune:       form.commune   as CommuneEnum,
        address:       form.address   || null,
        description:   form.description,
        incident_date: new Date().toISOString(),
        status:        'received',
      } as never);
      if (error) throw error;
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }

  function resetForm() {
    setFormStatus('idle');
    setForm({ full_name: '', email: '', phone: '', commune: '', address: '', description: '' });
  }

  return (
    <main id="main-content">

      <PageHero
        image="/images/fih-tarmac.jpg"
        eyebrow="Environnement sonore"
        title="Déposer une plainte"
        subtitle="Vous résidez dans une commune riveraine et souffrez des nuisances de l'aéroport ? Signalez-le directement à la RVA — chaque plainte est prise en compte."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Communauté', href: '/communaute' },
          { label: 'Environnement sonore', href: '/communaute/environnement-sonore' },
          { label: 'Déposer une plainte' },
        ]}
      />

      {/* Bandeau alerte travaux */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="container py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={15} className="mt-0.5 flex-shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Travaux piste 01/19 (jan. 2025 – sep. 2026)</span> — Opérations nocturnes supplémentaires 05h30–07h (lun.–mer.). Nos excuses aux riverains.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-14 md:py-20">
        <div className="grid gap-14 lg:grid-cols-3">

          {/* Colonne gauche — Infos */}
          <div className="lg:col-span-1 space-y-10">

            {/* Processus */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-blue">Processus</p>
              </div>
              <h2 className="font-display mb-6 text-xl font-bold text-rdc-anthracite">
                Comment ça fonctionne ?
              </h2>
              <div className="space-y-6">
                {STEPS.map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rdc-blue/10 font-display text-sm font-black text-rdc-blue">
                      {s.n}
                    </div>
                    <div className="pt-1.5">
                      <p className="mb-1 text-sm font-semibold text-rdc-anthracite">{s.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zones de bruit */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="accent-line" />
                <p className="eyebrow text-amber-600">Zones affectées</p>
              </div>
              <h2 className="font-display mb-4 text-lg font-bold text-rdc-anthracite">
                Plan d'exposition au bruit
              </h2>
              <div className="space-y-2.5">
                {NOISE_ZONES.map(z => (
                  <div key={z.label} className="overflow-hidden rounded-lg border border-border bg-white">
                    <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white ${z.color}`}>
                      {z.label} — {z.desc}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <MapPin size={11} className="flex-shrink-0 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{z.communes}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/communaute/environnement-sonore"
                className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-rdc-blue hover:underline"
              >
                En savoir plus sur le bruit <ArrowRight size={11} />
              </Link>
            </div>

            {/* Contact direct */}
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <p className="mb-3 text-sm font-bold text-rdc-anthracite">Contact urgent</p>
              <div className="space-y-2.5">
                <a href="tel:+243000000000" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-rdc-blue transition-colors">
                  <Phone size={13} className="text-rdc-blue" />
                  +243 XX XXX XXXX
                </a>
                <a href="mailto:environnement@aindjili.com" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-rdc-blue transition-colors">
                  <Mail size={13} className="text-rdc-blue" />
                  environnement@aindjili.com
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Pour les cas urgents (nuisances exceptionnelles), vous pouvez nous appeler directement. Le formulaire reste le canal privilégié pour un traitement documenté.
              </p>
            </div>

          </div>

          {/* Colonne droite — Formulaire */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="accent-line" />
              <p className="eyebrow text-amber-600">Signalement</p>
            </div>
            <h2 className="font-display mb-2 text-2xl font-bold text-rdc-anthracite md:text-3xl">
              Formulaire de plainte
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Tous les champs marqués * sont obligatoires. Votre signalement est traité de manière confidentielle par le service Environnement de la RVA.
            </p>

            {formStatus === 'success' ? (
              /* Succès */
              <div className="flex flex-col items-center gap-6 rounded-2xl border border-rdc-green/30 bg-rdc-green/5 px-8 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rdc-green/20">
                  <CheckCircle size={32} className="text-rdc-green" />
                </div>
                <div>
                  <p className="font-display mb-2 text-xl font-bold text-rdc-anthracite">
                    Plainte enregistrée avec succès
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
                    Votre signalement a été transmis au service Environnement de la RVA. Un responsable vous contactera sous 15 jours ouvrés.
                  </p>
                </div>
                <Button variant="outline" onClick={resetForm}>
                  Déposer une nouvelle plainte
                </Button>
              </div>
            ) : (
              <form onSubmit={e => { void handleSubmit(e); }} className="space-y-5">

                {/* Identité */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-rdc-anthracite">
                      Nom complet *
                    </label>
                    <Input
                      required
                      value={form.full_name}
                      onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                      placeholder="Jean Mukendi"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-rdc-anthracite">
                      Commune *
                    </label>
                    <select
                      required
                      value={form.commune}
                      onChange={e => setForm(f => ({ ...f, commune: e.target.value }))}
                      className="flex h-9 w-full border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                    >
                      <option value="">Sélectionner votre commune</option>
                      {COMMUNES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-rdc-anthracite">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+243 81 XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-rdc-anthracite">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                {/* Adresse */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-rdc-anthracite">
                    Adresse (quartier / avenue)
                  </label>
                  <Input
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    placeholder="Ex : Avenue Kasa-Vubu, Quartier 8, Masina"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-rdc-anthracite">
                    Description de la nuisance *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full resize-none border border-input bg-background px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                    placeholder="Décrivez précisément : heure(s) d'occurrence, type de bruit (décollage, atterrissage, essai moteur, travaux piste), fréquence (quotidien, occasionnel) et impact ressenti (perturbation du sommeil, conversation impossible...)."
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Plus votre description est précise, plus notre équipe pourra identifier et corriger la source du problème.
                  </p>
                </div>

                {/* RGPD */}
                <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/30 p-4">
                  <ShieldCheck size={14} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Vos données personnelles sont utilisées uniquement dans le cadre du traitement de votre plainte par la RVA. Elles ne sont pas transmises à des tiers et sont conservées pendant 3 ans conformément à la réglementation en vigueur.
                  </p>
                </div>

                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg border border-rdc-red/30 bg-rdc-red/5 px-4 py-3 text-sm text-rdc-red">
                    <AlertTriangle size={14} className="flex-shrink-0" />
                    Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="h-11 w-full bg-rdc-blue text-white hover:bg-rdc-blue/85 sm:w-auto sm:min-w-[200px]"
                >
                  <Send size={14} className="mr-2" />
                  {formStatus === 'loading' ? t('common.loading') : 'Envoyer ma plainte'}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Liens connexes */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            to="/communaute/environnement-sonore"
            className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:border-rdc-blue/30 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rdc-blue/8 text-rdc-blue transition-colors group-hover:bg-rdc-blue group-hover:text-white">
              <ArrowLeft size={18} />
            </div>
            <div>
              <p className="mb-0.5 text-sm font-semibold text-rdc-anthracite">Environnement sonore</p>
              <p className="text-xs text-muted-foreground">Zones de bruit, mesures de réduction, suivi en temps réel</p>
            </div>
          </Link>
          <Link
            to="/communaute/relations-communaute"
            className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:border-rdc-blue/30 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rdc-green/8 text-rdc-green transition-colors group-hover:bg-rdc-green group-hover:text-white">
              <ArrowRight size={18} />
            </div>
            <div>
              <p className="mb-0.5 text-sm font-semibold text-rdc-anthracite">Relations communautaires</p>
              <p className="text-xs text-muted-foreground">Initiatives locales, comité consultatif, FIH Art</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
