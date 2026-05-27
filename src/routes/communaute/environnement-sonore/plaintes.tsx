import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  AlertTriangle, Send, CheckCircle, ArrowLeft, ArrowRight,
  Clock, Mail, Phone, FileText, MapPin, ShieldCheck,
} from 'lucide-react';

export const Route = createFileRoute('/communaute/environnement-sonore/plaintes')({
  component: PlaintesPage,
  head: () => ({
    meta: [
      { title: "Déposer une plainte sonore — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Signalez une nuisance sonore de l'aéroport FIH auprès de la RVA. Formulaire en ligne, traitement sous 15 jours ouvrés." },
    ],
  }),
});

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const COMMUNES = ['Nsele', 'Masina', 'Kimbanseke', "N'djili", 'Autre'];

const STEPS = [
  {
    n: '01',
    Icon: FileText,
    title: 'Remplissez le formulaire',
    desc: 'Décrivez la nuisance (heure, type de bruit, fréquence, impact) et indiquez votre commune. Vos coordonnées permettent de vous répondre.',
  },
  {
    n: '02',
    Icon: ShieldCheck,
    title: 'Transmission à la RVA',
    desc: 'Votre signalement est enregistré et transmis au service Environnement de la Régie des Voies Aériennes (RVA).',
  },
  {
    n: '03',
    Icon: Clock,
    title: 'Traitement sous 15 jours',
    desc: 'Un responsable étudie votre plainte, vérifie les données des sonomètres et vous répond sous 15 jours ouvrés.',
  },
];

const NOISE_ZONES = [
  { label: 'Zone A — 75 dB+',    communes: 'Nsele centre, Abords piste 01/19', color: 'bg-[#CE1126]',    desc: 'Nuisances sévères' },
  { label: 'Zone B — 65-75 dB',  communes: 'Masina nord, Kimbanseke ouest',     color: 'bg-amber-500',   desc: 'Nuisances modérées' },
  { label: 'Zone C — 55-65 dB',  communes: "Masina sud, Kimbanseke est, N'djili", color: 'bg-[#FFCE00]', desc: "Zone d'influence" },
];

function PlaintesPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', commune: '', address: '', description: '', incident_date: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus('loading');
    // Simulation d'envoi — pas de vrai appel Supabase ici
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  }

  const reference = `FIH-BRUIT-${Date.now()}`;

  function resetForm() {
    setFormStatus('idle');
    setForm({ full_name: '', email: '', phone: '', commune: '', address: '', description: '', incident_date: '' });
  }

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Communes riveraines FIH — dépôt de plainte sonore" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Communauté · Environnement sonore</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Déposer une plainte sonore</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-amber-600 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Signalement</span>
        </div>
      </div>

      {/* Alerte travaux */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-5xl px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Travaux piste 01/19 (jan. 2025 – sep. 2026)</span> — Opérations nocturnes supplémentaires 05h30–07h (lun.–mer.). Nos excuses aux riverains de Nsele, Masina et Kimbanseke.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-14">
        <div className="grid gap-12 lg:grid-cols-3">

          {/* Colonne gauche — Infos */}
          <div className="lg:col-span-1 space-y-10">

            {/* Processus */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-4">Processus</p>
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-5">Comment ça fonctionne ?</h2>
              <div className="space-y-5">
                {STEPS.map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#003DA5] text-sm font-bold text-white">
                      {s.n}
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-bold text-[#1a1a1a] mb-1">{s.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zones de bruit */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-4">Zones affectées</p>
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Plan d'exposition au bruit</h2>
              <div className="space-y-2.5">
                {NOISE_ZONES.map(z => (
                  <div key={z.label} className="overflow-hidden border border-[#e8e8e8] bg-white">
                    <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white ${z.color}`}>
                      {z.label} — {z.desc}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <MapPin size={11} className="shrink-0 text-gray-400" />
                      <p className="text-xs text-gray-500">{z.communes}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/communaute/environnement-sonore" className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#003DA5] hover:underline">
                En savoir plus sur le bruit <ArrowRight size={11} />
              </Link>
            </div>

            {/* Contact direct */}
            <div className="border border-[#e8e8e8] bg-white p-5">
              <p className="text-sm font-bold text-[#1a1a1a] mb-3">Contact urgent</p>
              <div className="space-y-2.5">
                <a href="tel:+243000000000" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-[#003DA5] transition-colors">
                  <Phone size={13} className="text-[#003DA5]" />
                  +243 XX XXX XXXX
                </a>
                <a href="mailto:environnement@fih-rva.com" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-[#003DA5] transition-colors">
                  <Mail size={13} className="text-[#003DA5]" />
                  environnement@fih-rva.com
                </a>
              </div>
              <p className="mt-3 text-xs text-gray-400">Pour les cas urgents, appelez directement. Le formulaire reste le canal privilégié pour un traitement documenté et traçable.</p>
            </div>
          </div>

          {/* Colonne droite — Formulaire */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-2">Signalement</p>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Formulaire de plainte sonore</h2>
            <p className="text-sm text-gray-500 mb-8">
              Tous les champs marqués * sont obligatoires. Votre signalement est traité de manière confidentielle par le service Environnement de la RVA.
            </p>

            {formStatus === 'success' ? (
              <div className="flex flex-col items-center gap-6 border border-[#009A44]/30 bg-[#009A44]/5 px-8 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center bg-[#009A44]/20">
                  <CheckCircle size={32} className="text-[#009A44]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1a1a1a] mb-2">Plainte enregistrée avec succès</p>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-3">
                    Votre signalement a été transmis au service Environnement de la RVA. Un responsable vous contactera sous 15 jours ouvrés.
                  </p>
                  <div className="inline-block border border-[#009A44]/30 bg-white px-4 py-2">
                    <p className="text-xs text-gray-400">Référence de votre plainte :</p>
                    <p className="font-mono font-bold text-[#003DA5] text-sm">{reference}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-[#e8e8e8] px-5 py-2.5 text-sm font-medium text-[#1a1a1a] hover:border-[#003DA5] transition-colors"
                >
                  Déposer une nouvelle plainte
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Identité */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Nom complet *</label>
                    <input
                      required
                      value={form.full_name}
                      onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                      placeholder="Jean Mukendi"
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm placeholder-gray-300 focus:border-[#003DA5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Commune *</label>
                    <select
                      required
                      value={form.commune}
                      onChange={e => setForm(f => ({ ...f, commune: e.target.value }))}
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm focus:border-[#003DA5] focus:outline-none"
                    >
                      <option value="">Sélectionner votre commune</option>
                      {COMMUNES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Téléphone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+243 81 XXX XXXX"
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm placeholder-gray-300 focus:border-[#003DA5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jean@exemple.com"
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm placeholder-gray-300 focus:border-[#003DA5] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Adresse & date */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Adresse (quartier / avenue)</label>
                    <input
                      value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      placeholder="Ex : Avenue Kasa-Vubu, Quartier 8, Masina"
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm placeholder-gray-300 focus:border-[#003DA5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Date de l'incident</label>
                    <input
                      type="date"
                      value={form.incident_date}
                      onChange={e => setForm(f => ({ ...f, incident_date: e.target.value }))}
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm focus:border-[#003DA5] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Description de la nuisance *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full resize-none border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm placeholder-gray-300 focus:border-[#003DA5] focus:outline-none"
                    placeholder="Décrivez précisément : heure(s) d'occurrence, type de bruit (décollage, atterrissage, essai moteur, travaux piste), fréquence (quotidien, occasionnel) et impact ressenti (perturbation du sommeil, conversation impossible...)."
                  />
                  <p className="mt-1 text-[11px] text-gray-400">Plus votre description est précise, plus notre équipe pourra identifier et corriger la source du problème.</p>
                </div>

                {/* RGPD */}
                <div className="flex items-start gap-3 border border-[#e8e8e8] bg-gray-50 p-4">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#003DA5]" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Vos données personnelles sont utilisées uniquement dans le cadre du traitement de votre plainte par la RVA. Elles ne sont pas transmises à des tiers et sont conservées 3 ans conformément à la réglementation en vigueur.
                  </p>
                </div>

                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 border border-[#CE1126]/30 bg-[#CE1126]/5 px-4 py-3 text-sm text-[#CE1126]">
                    <AlertTriangle size={14} className="shrink-0" />
                    Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="flex items-center gap-2 bg-[#003DA5] px-8 py-3 text-sm font-bold text-white hover:bg-[#003DA5]/85 transition-colors disabled:opacity-60"
                >
                  <Send size={14} />
                  {formStatus === 'loading' ? 'Envoi en cours...' : 'Envoyer ma plainte'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Liens connexes */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            to="/communaute/environnement-sonore"
            className="group flex items-start gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/40 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#003DA5]/10 group-hover:bg-[#003DA5] transition-colors">
              <ArrowLeft size={16} className="text-[#003DA5] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a] mb-0.5">Environnement sonore</p>
              <p className="text-xs text-gray-500">Zones de bruit, mesures de réduction, suivi des indicateurs</p>
            </div>
          </Link>
          <Link
            to="/communaute/relations-communaute"
            className="group flex items-start gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#009A44]/40 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#009A44]/10 group-hover:bg-[#009A44] transition-colors">
              <ArrowRight size={16} className="text-[#009A44] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a] mb-0.5">Relations communautaires</p>
              <p className="text-xs text-gray-500">Initiatives locales, comité consultatif, FIH Art</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
