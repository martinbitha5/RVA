import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Stethoscope, Syringe, AlertTriangle, CheckCircle,
  Phone, Clock, MapPin, ChevronRight, ShieldAlert, Pill,
} from 'lucide-react';

export const Route = createFileRoute('/guide/sante')({
  component: SantePage,
  head: () => ({
    meta: [
      { title: "Santé & Vaccination — Guide FIH Kinshasa" },
      { name: 'description', content: "Santé et vaccination à l'Aéroport de N'djili : fièvre jaune obligatoire, paludisme, Centre Médical FIH 24h/24." },
    ],
  }),
});

const VACCINATIONS = [
  { vaccine: 'Fièvre jaune',    status: 'OBLIGATOIRE', validity: 'À vie (depuis 2016)', note: 'Carnet jaune OMS exigé à l\'entrée ET à la sortie de RDC', level: 'mandatory' },
  { vaccine: 'Paludisme',       status: 'Recommandé',  validity: 'Prophylaxie',         note: 'Prophylaxie antipaludéenne recommandée pour tout séjour', level: 'recommended' },
  { vaccine: 'Typhoïde',        status: 'Recommandé',  validity: '3 ans (injection)',   note: 'Recommandé surtout hors de Kinshasa', level: 'recommended' },
  { vaccine: 'Hépatite A',      status: 'Recommandé',  validity: '20 ans',              note: 'Pour toute durée de séjour en RDC', level: 'recommended' },
  { vaccine: 'Hépatite B',      status: 'Recommandé',  validity: 'À vie',               note: '3 injections si non immunisé antérieurement', level: 'recommended' },
  { vaccine: 'Méningite ACYW',  status: 'Recommandé',  validity: '5 ans',               note: 'Si contact prolongé avec la population locale', level: 'recommended' },
  { vaccine: 'COVID-19',        status: 'Selon pays',  validity: 'Variable',            note: 'Vérifiez les exigences du pays de destination', level: 'optional' },
];

const MEDICAL_SERVICES = [
  'Soins d\'urgence — 24h/24, 7j/7',
  'Vaccination fièvre jaune (30 USD sur place)',
  'Tests rapides de paludisme',
  'Premiers secours & réanimation',
  'Consultation médicale générale',
  'Pharmacie de garde (médicaments courants)',
  'Certificats médicaux de voyage',
  'Ambulance vers hôpitaux de Kinshasa',
];

const HEALTH_TIPS = [
  { icon: Pill,          title: 'Antipaludéens',   text: 'Commencez la prophylaxie antipaludéenne 1 à 2 semaines avant le départ selon le médicament prescrit.' },
  { icon: ShieldAlert,   title: 'Eau potable',      text: 'Buvez uniquement de l\'eau en bouteille ou bouillie. Évitez les glaçons hors des établissements de confiance.' },
  { icon: Stethoscope,   title: 'Assurance voyage', text: 'Souscrivez une assurance incluant rapatriement médical. Les soins hospitaliers à Kinshasa peuvent nécessiter une avance de fonds.' },
];

const LEVEL_BADGE = {
  mandatory:   'bg-red-50 text-red-700 border border-red-200 font-bold',
  recommended: 'bg-amber-50 text-amber-700 border border-amber-200',
  optional:    'bg-slate-50 text-slate-500 border border-slate-200',
};

function SantePage() {
  return (
    <main id="main-content">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#0A1F14]">
        <img
          src="/images/fih-checkin.jpg"
          loading="eager"
          className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[#0A1F14]"
          style={{ clipPath: 'polygon(0 0, 58% 0, 72% 100%, 0 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />

        <div className="container relative z-10 py-14 md:py-20">
          <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'Aéroport</Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Santé & Vaccination</span>
          </nav>
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className="inline-block h-4 w-5 bg-rdc-green"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            />
            <span className="text-sm font-semibold tracking-wider text-white/70">Guide de l'Aéroport</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
            Santé &amp;<br />Vaccination
          </h1>
          <p className="mt-3 max-w-sm text-white/60">
            Voyagez en bonne santé. Informations médicales essentielles pour entrer et sortir de la RDC.
          </p>

          {/* Alert chip */}
          <div className="mt-6 inline-flex items-center gap-2 border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
            <Syringe size={13} className="text-red-300" />
            Fièvre jaune — OBLIGATOIRE pour tout voyageur
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">

        {/* ── Yellow fever mandatory alert ─────────────────────── */}
        <div className="mb-10 overflow-hidden border-2 border-red-300 bg-red-50">
          <div className="flex items-center gap-3 bg-red-600 px-5 py-3">
            <Syringe size={16} className="text-white" />
            <p className="text-sm font-black uppercase tracking-wider text-white">
              Vaccination OBLIGATOIRE — Fièvre Jaune
            </p>
          </div>
          <div className="p-5">
            <p className="text-sm leading-relaxed text-red-900">
              Le <strong>carnet international de vaccination contre la fièvre jaune (carnet jaune OMS)</strong> est{' '}
              <strong>obligatoire en République Démocratique du Congo</strong>. Il est systématiquement vérifié à l'arrivée
              et au départ à l'Aéroport de N'djili.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                { label: 'Validité', value: 'À vie (vaccin administré après 1 an, depuis 2016)' },
                { label: 'Coût sur place', value: '30 USD au Centre Médical FIH (Zone publique)' },
                { label: 'Délai', value: 'Immunité acquise 10 jours après la vaccination' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">{label}</p>
                  <p className="mt-1 text-xs text-red-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* ── LEFT: vaccinations table + tips ──────────────── */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-rdc-blue">
                <Syringe size={14} className="text-white" />
              </div>
              <h2 className="font-display text-xl font-bold text-rdc-anthracite">
                Vaccinations recommandées pour la RDC
              </h2>
            </div>

            {/* Table */}
            <div className="mb-10 overflow-hidden border border-[#E8E8E8]">
              <div className="grid grid-cols-[1fr_auto_auto] gap-0 border-b border-[#E8E8E8] bg-[#F5F5F5] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#888]">
                <span>Vaccin</span>
                <span className="text-right pr-4">Statut</span>
                <span className="hidden sm:block">Validité</span>
              </div>
              {VACCINATIONS.map((v, i) => (
                <div
                  key={v.vaccine}
                  className={`grid grid-cols-[1fr_auto_auto] items-start gap-0 px-4 py-3 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                  } ${i < VACCINATIONS.length - 1 ? 'border-b border-[#F0F0F0]' : ''}`}
                >
                  <div>
                    <p className="text-sm font-semibold text-rdc-anthracite">{v.vaccine}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 pr-4">{v.note}</p>
                  </div>
                  <span className={`self-start rounded-full px-2.5 py-1 text-[10px] mr-4 whitespace-nowrap ${LEVEL_BADGE[v.level as keyof typeof LEVEL_BADGE]}`}>
                    {v.status}
                  </span>
                  <span className="hidden sm:block self-start text-xs text-muted-foreground whitespace-nowrap">
                    {v.validity}
                  </span>
                </div>
              ))}
            </div>

            {/* Health tips */}
            <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Conseils santé pour votre séjour
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {HEALTH_TIPS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="border border-[#E8E8E8] bg-white p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center bg-rdc-blue/10">
                    <Icon size={15} className="text-rdc-blue" />
                  </div>
                  <p className="mb-1.5 text-sm font-bold text-rdc-anthracite">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Medical center card ────────────────────── */}
          <div>
            <div className="sticky top-[90px]">
              {/* Card header */}
              <div className="bg-[#0A1F14] px-5 py-4">
                <div className="mb-1 flex items-center gap-2">
                  <Stethoscope size={14} className="text-rdc-green" />
                  <p className="text-xs font-bold uppercase tracking-wider text-rdc-green">Urgences médicales</p>
                </div>
                <h3 className="font-display text-lg font-bold text-white">Centre Médical FIH</h3>
                <p className="text-xs text-white/60 mt-0.5">Soins et vaccination sur place</p>
              </div>

              {/* Infos */}
              <div className="border border-[#E8E8E8] border-t-0 bg-white p-5">
                <div className="mb-4 space-y-2.5 text-sm text-[#444]">
                  <p className="flex items-center gap-2">
                    <Clock size={13} className="flex-shrink-0 text-rdc-blue" />
                    Ouvert <strong>24h/24 · 7j/7</strong>
                  </p>
                  <a href="tel:+243810000000" className="flex items-center gap-2 text-rdc-blue hover:underline">
                    <Phone size={13} className="flex-shrink-0" />
                    +243 81 XXX XXXX
                  </a>
                  <p className="flex items-start gap-2">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                    Terminal International · Niveau 0 (avant sécurité)
                  </p>
                </div>

                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#999]">
                  Services disponibles
                </p>
                <ul className="space-y-1.5">
                  {MEDICAL_SERVICES.map((s) => (
                    <li key={s} className="flex items-start gap-1.5 text-xs text-[#555]">
                      <CheckCircle size={11} className="mt-0.5 flex-shrink-0 text-rdc-green" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency note */}
              <div className="mt-4 flex items-start gap-2.5 bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800">
                <AlertTriangle size={13} className="mt-0.5 flex-shrink-0 text-amber-600" />
                <p>
                  En cas d'urgence grave, le centre assure le transfert vers les hôpitaux partenaires de Kinshasa (Cliniques Ngaliema, Hôpital du Cinquantenaire).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
