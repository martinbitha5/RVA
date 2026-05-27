import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Shuffle, Clock, CheckCircle, AlertTriangle,
  ArrowRight, ChevronRight, PlaneTakeoff, MapPin,
  Globe,
} from 'lucide-react';

export const Route = createFileRoute('/guide/correspondances')({
  component: CorrespondancesPage,
  head: () => ({
    meta: [
      { title: "Correspondances & Transit — Vols en connexion · FIH" },
      { name: 'description', content: "Vols en correspondance via l'Aéroport International de N'djili (FIH). Durées minimales, procédures transit, hubs depuis Kinshasa." },
    ],
  }),
});

const MCT_RULES = [
  {
    type: 'International → International',
    time: '90 min',
    note: 'Transit possible sans nouveau contrôle de sécurité si l\'escale est organisée sur un seul billet.',
    level: 'green',
  },
  {
    type: 'International → Domestique',
    time: '120 min',
    note: 'Récupération des bagages obligatoire, puis re-check-in au Terminal Domestique. Prévoir un déplacement entre les deux terminaux.',
    level: 'amber',
  },
  {
    type: 'Domestique → International',
    time: '120 min',
    note: 'Contrôle immigration DGM et sécurité à refaire dans le Terminal International. Ne sous-estimez pas ce délai.',
    level: 'amber',
  },
  {
    type: 'Domestique → Domestique',
    time: '60 min',
    note: 'Zone commune au Terminal Domestique. Pas de contrôle supplémentaire si la compagnie est identique.',
    level: 'blue',
  },
] as const;

const MCT_STYLE = {
  green: { badge: 'bg-emerald-50 border border-emerald-200 text-emerald-700', bar: 'bg-emerald-500' },
  amber: { badge: 'bg-amber-50 border border-amber-200 text-amber-700', bar: 'bg-amber-400' },
  blue:  { badge: 'bg-[#003DA5]/10 border border-[#003DA5]/20 text-[#003DA5]', bar: 'bg-[#003DA5]' },
};

const MAIN_HUBS = [
  {
    city: 'Addis-Abeba',
    code: 'ADD',
    airline: 'Ethiopian Airlines',
    iata: 'ET',
    note: 'Hub African Aviation — connexions vers toute l\'Afrique, Europe, Asie, Amériques. Ethiopian opère quotidiennement depuis FIH.',
    color: '#006635',
  },
  {
    city: 'Nairobi',
    code: 'NBO',
    airline: 'Kenya Airways',
    iata: 'KQ',
    note: 'Hub Afrique de l\'Est — connexions vers Afrique Australe, Moyen-Orient, Europe. Kenya Airways depuis FIH via NBO.',
    color: '#CC0000',
  },
  {
    city: 'Bruxelles',
    code: 'BRU',
    airline: 'Brussels Airlines',
    iata: 'SN',
    note: 'Hub principal vers l\'Europe — connexions Star Alliance vers toute l\'Europe et au-delà. Vols directs FIH–BRU et retour.',
    color: '#003087',
  },
  {
    city: 'Paris CDG',
    code: 'CDG',
    airline: 'Air France',
    iata: 'AF',
    note: 'Hub SkyTeam — connexions mondiales via CDG. Air France opère plusieurs vols hebdomadaires depuis FIH.',
    color: '#003087',
  },
  {
    city: 'Doha',
    code: 'DOH',
    airline: 'Qatar Airways',
    iata: 'QR',
    note: 'Hub Moyen-Orient — connexions vers Asie, Australie, Amériques, Europe via Hamad International Airport.',
    color: '#6B1831',
  },
  {
    city: 'Lomé',
    code: 'LFW',
    airline: 'ASKY Airlines',
    iata: 'KP',
    note: 'Hub Afrique de l\'Ouest — connexions vers toute l\'Afrique subsaharienne. Option économique pour l\'Afrique de l\'Ouest.',
    color: '#009A44',
  },
] as const;

const TRANSIT_STEPS = [
  {
    n: '01',
    label: 'Récupération des bagages (si nécessaire)',
    desc: 'Pour un transit international-domestique ou domestique-international, vous devez récupérer vos bagages et les ré-enregistrer. Pour un transit sur un seul billet, vos bagages peuvent être transférés directement.',
  },
  {
    n: '02',
    label: 'Contrôle DGM — Passage immigration',
    desc: 'Tout passager en transit à FIH qui change de terminal (International ↔ Domestique) doit passer par le contrôle DGM. Prévoyez votre passeport et votre carnet de vaccination fièvre jaune.',
  },
  {
    n: '03',
    label: 'Contrôle de sécurité',
    desc: 'Un passage au contrôle de sécurité est obligatoire lors de tout changement de zone. Préparez vos affaires à l\'avance : liquides en sac plastique, électroniques sortis du sac.',
  },
  {
    n: '04',
    label: 'Enregistrement et embarquement',
    desc: 'Rendez-vous au comptoir de votre compagnie pour le second vol. En cas de retard du premier vol, contactez immédiatement l\'agent au sol pour signaler votre correspondance.',
  },
] as const;

const CHECKLIST = [
  { item: 'Vérifiez que votre billet inclut la correspondance (billet unique ou billets séparés)', critical: true },
  { item: 'Assurez-vous que vos bagages sont enregistrés jusqu\'à la destination finale', critical: true },
  { item: 'Carnet de vaccination fièvre jaune — obligatoire même pour une escale à FIH', critical: true },
  { item: 'Visa RDC valide pour la durée de votre escale (si vous sortez de la zone internationale)', critical: false },
  { item: 'En cas de retard : informez immédiatement votre compagnie ou un agent FIH', critical: false },
  { item: 'Correspondance courte : prévenez l\'équipage du premier vol dès l\'embarquement', critical: false },
  { item: 'Evitez les correspondances de moins de 90 minutes à FIH si possible', critical: false },
] as const;

function CorrespondancesPage() {
  return (
    <main id="main-content">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Tarmac FIH — vols en correspondance"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <nav className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={9} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'Aéroport</Link>
            <ChevronRight size={9} />
            <span className="text-white/80">Correspondances</span>
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Guide de l'Aéroport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Vols en correspondance & Transit</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Guide</span>
        </div>
      </div>

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* MCT — durées minimales */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Durées minimales</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Temps de correspondance minimum (MCT)</h2>
          <p className="text-sm text-[#555] mb-8 max-w-xl">
            Ces durées sont les minimums recommandés. Planifiez toujours au-delà de ces seuils
            pour tenir compte des retards potentiels, des files d'attente et des distances entre les terminaux.
          </p>
          <div className="border border-[#e8e8e8] bg-white">
            {MCT_RULES.map((r, i) => {
              const s = MCT_STYLE[r.level];
              return (
                <div
                  key={r.type}
                  className={`flex flex-col sm:flex-row sm:items-start gap-4 p-5 ${i < MCT_RULES.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Shuffle size={13} className="text-[#003DA5]" />
                      <p className="font-semibold text-[#1a1a1a] text-sm">{r.type}</p>
                    </div>
                    <p className="text-xs text-[#555] leading-relaxed">{r.note}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-black ${s.badge}`}>
                      <Clock size={12} />
                      {r.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Hubs depuis FIH */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Hubs de correspondance</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Principaux hubs depuis Kinshasa</h2>
          <p className="text-sm text-[#555] mb-8 max-w-xl">
            FIH n'étant pas un hub de connexion majeur, la plupart des voyages intercontinentaux
            depuis Kinshasa nécessitent une escale dans l'un de ces aéroports.
          </p>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-2 lg:grid-cols-3">
            {MAIN_HUBS.map((hub) => (
              <div key={hub.code} className="bg-white p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[#1a1a1a]">{hub.city}</p>
                    <p className="text-[11px] text-[#888]">{hub.airline} · {hub.iata}</p>
                  </div>
                  <span className="text-xs font-black text-white px-2 py-1" style={{ backgroundColor: hub.color }}>
                    {hub.code}
                  </span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">{hub.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Procédure transit */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Procédure</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Étapes du transit à FIH</h2>
          <div className="space-y-0 border-t border-[#e8e8e8]">
            {TRANSIT_STEPS.map((step) => (
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

        {/* Checklist */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Checklist</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Avant votre correspondance</h2>
          <div className="border border-[#e8e8e8] bg-white">
            {CHECKLIST.map((c, i) => (
              <div
                key={c.item}
                className={`flex items-start gap-3 px-5 py-4 ${i < CHECKLIST.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}
              >
                <CheckCircle
                  size={14}
                  className={`mt-0.5 flex-shrink-0 ${c.critical ? 'text-red-500' : 'text-[#009A44]'}`}
                />
                <p className={`text-sm ${c.critical ? 'font-semibold text-red-900' : 'text-[#444]'}`}>
                  {c.item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Note importante */}
        <div className="bg-amber-50 border border-amber-200 p-5 flex items-start gap-3">
          <AlertTriangle size={15} className="mt-0.5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold text-amber-900 mb-1">Important — Carnet de vaccination</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Le carnet de vaccination contre la fièvre jaune est exigé de tous les passagers
              en transit à FIH, même pour une escale courte en zone internationale.
              Sans ce document, vous risquez d'être refusé à l'embarquement ou soumis à une vaccination sur place.
            </p>
          </div>
        </div>

        {/* Salons en attente */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">En attente de correspondance</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Services disponibles lors de votre escale</h2>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Globe, label: 'Wi-Fi gratuit', desc: 'RAM WiFi illimité dans toutes les zones' },
              { icon: MapPin, label: 'Salons VIP', desc: 'Pearl Lounge, Brussels Airlines Lounge' },
              { icon: PlaneTakeoff, label: 'Boutiques & Restaurants', desc: 'Duty-free, restaurants, cafés en zone sécurisée' },
              { icon: Clock, label: 'Hôtels proches', desc: 'Hôtels à 15–30 min de FIH pour les escales longues' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center bg-[#003DA5]/10 mb-3">
                  <Icon size={15} className="text-[#003DA5]" />
                </div>
                <p className="font-semibold text-[#1a1a1a] text-sm mb-1">{label}</p>
                <p className="text-xs text-[#555]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Liens utiles */}
        <div className="grid gap-px bg-[#003DA5] sm:grid-cols-3">
          {[
            { label: 'Douanes & Immigration', desc: 'Formalités DGM pour le transit à FIH', href: '/guide/douanes-immigration' },
            { label: 'Compagnies aériennes', desc: 'Ethiopian, Brussels, Air France, Kenya Airways…', href: '/vols/compagnies-aeriennes' },
            { label: 'Salons VIP', desc: 'Pearl Lounge et salons partenaires à FIH', href: '/boutiques-restaurants/salons' },
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
