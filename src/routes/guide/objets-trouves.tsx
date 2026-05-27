import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Phone, Mail, Clock, CheckCircle,
  AlertTriangle, MapPin, ArrowRight, ChevronRight,
  Send,
} from 'lucide-react';

export const Route = createFileRoute('/guide/objets-trouves')({
  component: ObjetsTrouvesPage,
  head: () => ({
    meta: [
      { title: "Objets trouvés — Aéroport N'djili · FIH" },
      { name: 'description', content: "Déclarez un objet perdu ou récupérez un bien trouvé à l'Aéroport International de N'djili (FIH), Kinshasa." },
    ],
  }),
});

const BUREAUX = [
  {
    terminal: 'Terminal International',
    location: 'Niveau 0 — Adjacent au bureau d\'information voyageurs, avant la zone sécurisée',
    hours: 'Tous les jours · 06h00 – 22h00',
    phone: '+243 81 XXX XXXX',
    email: 'lostnfound@fih-rva.com',
  },
  {
    terminal: 'Terminal Domestique',
    location: 'Hall principal — Guichet information, en face des comptoirs d\'enregistrement',
    hours: 'Tous les jours · 07h00 – 20h00',
    phone: '+243 81 XXX XXXX',
    email: 'lostnfound@fih-rva.com',
  },
] as const;

const STEPS = [
  {
    n: '01',
    label: 'Vérifiez auprès de votre compagnie',
    desc: 'Si l\'objet a été oublié à bord de l\'avion, contactez d\'abord la compagnie aérienne. FIH ne peut pas accéder à l\'intérieur des appareils.',
  },
  {
    n: '02',
    label: 'Rendez-vous au bureau des objets trouvés',
    desc: 'Signalez la perte au bureau du terminal concerné (International ou Domestique). Présentez-vous en personne ou appelez pour vérifier si l\'objet a été retrouvé.',
  },
  {
    n: '03',
    label: 'Remplissez la déclaration de perte',
    desc: 'Décrivez l\'objet avec précision : couleur, marque, contenu, valeur approximative, date et lieu présumé de perte. Plus votre description est précise, plus la recherche est efficace.',
  },
  {
    n: '04',
    label: 'Conservez votre récépissé',
    desc: 'Un numéro de dossier vous est attribué. Conservez ce récépissé — il est indispensable pour tout suivi et pour récupérer votre bien si retrouvé.',
  },
  {
    n: '05',
    label: 'Suivi et récupération',
    desc: 'Si l\'objet est retrouvé, FIH vous contacte par téléphone ou email dans les 72 heures. Les objets sont conservés pendant 90 jours avant d\'être remis aux autorités.',
  },
] as const;

const CATEGORIES = [
  'Téléphones portables / smartphones',
  'Ordinateurs portables / tablettes',
  'Documents officiels (passeport, visa, CNI)',
  'Bagages / sacs / valises',
  'Lunettes / bijoux / montres',
  'Vêtements',
  'Clés / documents de voyage',
  'Médicaments',
  'Jouets / peluches',
  'Autres',
];

function ObjetsTrouvesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nom: '', telephone: '', email: '', categorie: '', description: '', lieu: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main-content">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Terminal International FIH — Objets trouvés"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <nav className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={9} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'Aéroport</Link>
            <ChevronRight size={9} />
            <span className="text-white/80">Objets trouvés</span>
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Guide de l'Aéroport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Objets trouvés & perdus</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Guide</span>
        </div>
      </div>

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Bureaux */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Où se rendre</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Bureaux des objets trouvés</h2>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-2">
            {BUREAUX.map((b) => (
              <div key={b.terminal} className="bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#003DA5] mb-3">{b.terminal}</p>
                <div className="space-y-2.5 text-xs text-[#444]">
                  <p className="flex items-start gap-2">
                    <MapPin size={11} className="mt-0.5 flex-shrink-0 text-[#003DA5]" />
                    {b.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={11} className="text-[#003DA5]" />
                    {b.hours}
                  </p>
                  <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[#003DA5] hover:underline">
                    <Phone size={11} />
                    {b.phone}
                  </a>
                  <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-[#003DA5] hover:underline">
                    <Mail size={11} />
                    {b.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Procédure */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Procédure</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Que faire si vous avez perdu un objet ?</h2>
          <div className="space-y-0 border-t border-[#e8e8e8]">
            {STEPS.map((step) => (
              <div key={step.n} className="border-b border-[#e8e8e8] flex gap-5 py-5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-[#003DA5] text-[11px] font-black text-white">
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-1">{step.label}</p>
                  <p className="text-sm text-[#555] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formulaire */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Déclaration en ligne</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Déclarer un objet perdu</h2>
          <p className="text-sm text-[#555] mb-8">
            Remplissez ce formulaire pour signaler une perte. Notre équipe vous contactera dans les 72 heures si l'objet est retrouvé.
          </p>

          {submitted ? (
            <div className="border border-[#009A44]/30 bg-[#009A44]/5 p-8 text-center">
              <CheckCircle size={40} className="text-[#009A44] mx-auto mb-4" />
              <p className="text-lg font-bold text-[#1a1a1a] mb-2">Déclaration enregistrée</p>
              <p className="text-sm text-[#555] mb-4">
                Votre déclaration a bien été transmise au bureau des objets trouvés de FIH.
                Vous serez contacté par téléphone ou email dans les 72 heures si l'objet est retrouvé.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ nom: '', telephone: '', email: '', categorie: '', description: '', lieu: '' }); }}
                className="border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
              >
                Nouvelle déclaration
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-[#e8e8e8] bg-white p-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nom" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#666] mb-1.5">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Jean Mukendi"
                    className="w-full border border-[#ddd] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#003DA5] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#666] mb-1.5">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    required
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder="+243 81 XXX XXXX"
                    className="w-full border border-[#ddd] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#003DA5] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#666] mb-1.5">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean@exemple.com"
                  className="w-full border border-[#ddd] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#003DA5] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="categorie" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#666] mb-1.5">
                  Catégorie d'objet <span className="text-red-500">*</span>
                </label>
                <select
                  id="categorie"
                  name="categorie"
                  required
                  value={form.categorie}
                  onChange={handleChange}
                  className="w-full border border-[#ddd] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] focus:border-[#003DA5] focus:outline-none"
                >
                  <option value="">-- Sélectionner une catégorie --</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#666] mb-1.5">
                  Description détaillée <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Décrivez l'objet avec précision : couleur, marque, contenu, signes distinctifs, valeur approximative, date et heure approximatives de la perte..."
                  className="w-full resize-none border border-[#ddd] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#003DA5] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="lieu" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#666] mb-1.5">
                  Lieu présumé de la perte
                </label>
                <input
                  id="lieu"
                  name="lieu"
                  value={form.lieu}
                  onChange={handleChange}
                  placeholder="Ex: Terminal International, salle d'embarquement porte B3"
                  className="w-full border border-[#ddd] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#003DA5] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-[#003DA5] px-6 py-3 text-sm font-bold text-white hover:bg-[#002D8C] transition-colors"
              >
                <Send size={14} />
                Envoyer la déclaration
              </button>
            </form>
          )}

          <p className="mt-3 flex items-start gap-2 text-[11px] text-[#888]">
            <AlertTriangle size={11} className="mt-0.5 flex-shrink-0 text-amber-500" />
            Les objets non réclamés sont conservés 90 jours puis remis aux autorités portuaires compétentes. FIH n'est pas responsable des objets perdus.
          </p>
        </section>

        {/* Conservation */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Conservation</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Durée de conservation</h2>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-3">
            {[
              { label: 'Documents officiels', duree: '90 jours', note: 'Passeport, visa, CNI — remis à la DGM ensuite' },
              { label: 'Objets de valeur', duree: '90 jours', note: 'Bijoux, appareils électroniques, montres' },
              { label: 'Autres objets', duree: '30 jours', note: 'Vêtements, bagages, divers — durée réduite' },
            ].map((item) => (
              <div key={item.label} className="bg-white p-5 text-center">
                <p className="text-3xl font-bold text-[#003DA5] mb-1">{item.duree}</p>
                <p className="text-sm font-semibold text-[#1a1a1a] mb-2">{item.label}</p>
                <p className="text-[11px] text-[#777]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Liens */}
        <div className="grid gap-px bg-[#003DA5] sm:grid-cols-2">
          {[
            { label: 'Atterrir à Kinshasa', desc: 'Guide arrivée — réclamation bagages et douanes', href: '/guide/atterrir-kinshasa' },
            { label: 'Guide de l\'Aéroport', desc: 'Tous les guides pratiques FIH', href: '/guide' },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href as never}
              className="group bg-[#003DA5] p-6 flex flex-col gap-2 hover:bg-[#002D8C] transition-colors relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#FFCE00] transition-all duration-500" />
              <p className="font-bold text-white text-base group-hover:text-[#FFCE00] transition-colors">{link.label}</p>
              <p className="text-sm text-white/60">{link.desc}</p>
              <ArrowRight size={14} className="text-white/30 group-hover:text-[#FFCE00] group-hover:translate-x-1 transition-all mt-1" />
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
