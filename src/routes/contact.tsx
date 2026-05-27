import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contactez-nous — Aéroport International de N'djili · FIH · RVA" },
      { name: 'description', content: "Contactez l'Aéroport International de N'djili (FIH) — formulaire en ligne, téléphone, email, adresse. Boulevard Lumumba, Commune de Nsele, Kinshasa." },
    ],
  }),
});

const CONTACT_ITEMS = [
  {
    Icon: Phone,
    label: 'Standard téléphonique',
    value: '+243 XX XXX XXXX',
    sub: 'Disponible 24h/24, 7j/7',
    color: '#003DA5',
  },
  {
    Icon: Mail,
    label: 'Email général',
    value: 'contact@fih-rva.com',
    href: 'mailto:contact@fih-rva.com',
    sub: 'Réponse sous 48h ouvrées',
    color: '#003DA5',
  },
  {
    Icon: Mail,
    label: 'Direction Générale RVA',
    value: 'info@fih-rva.com',
    href: 'mailto:info@fih-rva.com',
    sub: 'Correspondance institutionnelle',
    color: '#009A44',
  },
  {
    Icon: MapPin,
    label: 'Adresse postale',
    value: 'Boulevard Lumumba, Commune de Nsele',
    sub: 'Kinshasa, République Démocratique du Congo',
    color: '#CE1126',
  },
  {
    Icon: Clock,
    label: 'Horaires d\'accueil',
    value: 'Lundi – Vendredi : 08h00 – 17h00',
    sub: 'Opérations aéroport : 24h/24, 7j/7',
    color: '#d97706',
  },
] as const;

const SERVICES_CONTACTS = [
  { label: 'Objets trouvés', email: 'objets-trouves@fih-rva.com', tel: '+243 XX XXX XXXX' },
  { label: 'Assistance PMR', email: 'pmr@fih-rva.com', tel: '+243 XX XXX XXXX' },
  { label: 'Plaintes environnement sonore', email: 'bruit@fih-rva.com', tel: null },
  { label: 'Presse & Médias', email: 'presse@fih-rva.com', tel: null },
  { label: 'Partenariats commerciaux', email: 'commercial@fih-rva.com', tel: null },
  { label: 'Ressources humaines / Carrières', email: 'rh@fih-rva.com', tel: null },
];

const SUBJECTS = [
  'Information générale',
  'Réservation stationnement',
  'Vol / compagnie aérienne',
  'Boutiques & restaurants',
  'Accessibilité & PMR',
  'Environnement sonore / Bruit',
  'Plainte',
  'Partenariat commercial',
  'Presse & médias',
  'Candidature / Emploi',
  'Autre',
] as const;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    // Simulation — pas de vraie connexion Supabase pour l'instant
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  }

  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Contactez l'Aéroport International de N'djili — FIH" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">FIH · RVA</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Contactez-nous</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Contact</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Urgence opérationnelle */}
        <section className="flex items-start gap-4 border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Urgence opérationnelle</p>
            <p className="text-sm text-amber-700">
              Pour les urgences liées à un vol en cours (retard, annulation, bagage perdu immédiat), contactez directement votre compagnie aérienne ou le personnel de l'aéroport sur place. Notre formulaire de contact est destiné aux demandes non urgentes.
            </p>
          </div>
        </section>

        {/* Coordonnées + Formulaire */}
        <section className="grid gap-10 lg:grid-cols-5">

          {/* Coordonnées — col 2/5 */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-3">Nos coordonnées</p>

            {CONTACT_ITEMS.map(item => (
              <div key={item.label} className="flex items-start gap-4 border border-[#e8e8e8] bg-white p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <item.Icon size={15} style={{ color: item.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 mb-0.5 font-medium uppercase tracking-wide">{item.label}</p>
                  {'href' in item ? (
                    <a href={item.href} className="font-semibold text-[#1a1a1a] hover:text-[#003DA5] transition-colors text-sm break-all">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-[#1a1a1a] text-sm">{item.value}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="border border-[#e8e8e8] bg-gray-50 p-5 text-center">
              <MapPin size={20} className="mx-auto text-[#CE1126] mb-2" />
              <p className="text-xs font-bold text-[#1a1a1a] mb-1">Boulevard Lumumba</p>
              <p className="text-xs text-gray-500 mb-3">Commune de Nsele · Kinshasa, RDC</p>
              <a
                href="https://www.openstreetmap.org/?mlat=-4.3855&mlon=15.4446&zoom=14"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003DA5] hover:underline"
              >
                Voir sur OpenStreetMap <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Formulaire — col 3/5 */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-3">Formulaire de contact</p>

            {status === 'success' ? (
              <div className="border border-[#009A44]/20 bg-[#009A44]/5 p-8 text-center">
                <CheckCircle size={36} className="mx-auto text-[#009A44] mb-4" />
                <p className="font-bold text-[#1a1a1a] text-lg mb-2">Message envoyé</p>
                <p className="text-sm text-gray-600 mb-6">
                  Nous avons bien reçu votre message. Notre équipe vous répondra dans un délai de 48 heures ouvrées.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ full_name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="border border-[#e8e8e8] bg-white px-6 py-2.5 text-sm font-bold text-[#1a1a1a] hover:border-[#003DA5]/40 transition-colors"
                >
                  Nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Nom complet *</label>
                    <input
                      required
                      value={form.full_name}
                      onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                      placeholder="Jean Mukendi"
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-400 focus:border-[#003DA5] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Adresse email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jean@exemple.com"
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-400 focus:border-[#003DA5] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Téléphone (optionnel)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+243 81 XXX XXXX"
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-400 focus:border-[#003DA5] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Sujet *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] focus:border-[#003DA5] focus:outline-none transition-colors"
                    >
                      <option value="">Choisir un sujet</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#1a1a1a]">Message *</label>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder-gray-400 focus:border-[#003DA5] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Vos données sont utilisées uniquement pour traiter votre demande. Conformément à la politique de confidentialité de la RVA, elles ne sont pas transmises à des tiers.
                </p>

                {status === 'error' && (
                  <p className="text-xs text-[#CE1126] font-medium">Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 bg-[#003DA5] px-6 py-3 text-sm font-bold text-white hover:bg-[#003DA5]/85 transition-colors disabled:opacity-60"
                >
                  <Send size={14} />
                  {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Contacts par service */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Contacts directs</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Contacter un service spécifique</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_CONTACTS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white px-5 py-4">
                <p className="font-bold text-[#1a1a1a] text-sm mb-2">{s.label}</p>
                <a href={`mailto:${s.email}`} className="flex items-center gap-1.5 text-xs text-[#003DA5] hover:underline mb-1">
                  <Mail size={10} /> {s.email}
                </a>
                {s.tel && (
                  <a href={`tel:${s.tel}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:underline">
                    <Phone size={10} /> {s.tel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
