import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Accessibility, CheckCircle, Phone,
  MapPin, ArrowRight, ChevronRight,
  Users, ShieldCheck,
} from 'lucide-react';

export const Route = createFileRoute('/guide/passagers-handicap')({
  component: PassagersHandicapPage,
  head: () => ({
    meta: [
      { title: "Assistance PMR — Passagers à mobilité réduite · FIH" },
      { name: 'description', content: "Services d'assistance aux personnes à mobilité réduite (PMR) à l'Aéroport International de N'djili (FIH), Kinshasa." },
    ],
  }),
});

const SERVICES = [
  {
    title: 'Fauteuil roulant',
    desc: 'Mise à disposition de fauteuils roulants depuis la dépose-minute jusqu\'à l\'avion. Disponibles dans les deux terminaux, opérés par des agents AVSEC formés.',
    icon: Accessibility,
  },
  {
    title: 'File prioritaire',
    desc: 'Accès prioritaire au comptoir d\'enregistrement dédié PMR et au contrôle de sécurité. Évitez les longues files d\'attente.',
    icon: ShieldCheck,
  },
  {
    title: 'Embarquement prioritaire',
    desc: 'Embarquement en premier, avant les autres passagers. Un agent vous accompagne de la salle d\'attente jusqu\'au pied de l\'avion.',
    icon: CheckCircle,
  },
  {
    title: 'Transport tarmac adapté',
    desc: 'Véhicule adapté PMR disponible pour rejoindre l\'avion lorsque les bus COBUS ne conviennent pas. Lift élévateur disponible pour certains vols.',
    icon: ArrowRight,
  },
  {
    title: 'Sanitaires PMR',
    desc: 'Toilettes accessibles dans le Terminal International (2 points) et le Terminal Domestique (1 point). Signalisation adaptée.',
    icon: MapPin,
  },
  {
    title: 'Chien guide',
    desc: 'Les chiens guides d\'aveugles sont acceptés à FIH sous conditions sanitaires en vigueur (vaccins à jour, laisse, muselière). Déclarez-le à l\'avance.',
    icon: Users,
  },
] as const;

const SSR_CODES = [
  {
    code: 'WCHR',
    label: 'Wheelchair — Ramp',
    desc: 'Passager pouvant marcher, mais ne pouvant pas monter ou descendre les escaliers.',
    level: 'blue',
  },
  {
    code: 'WCHS',
    label: 'Wheelchair — Steps',
    desc: 'Passager pouvant marcher sur courte distance mais ne pouvant ni monter les escaliers ni parcourir de longues distances.',
    level: 'amber',
  },
  {
    code: 'WCHC',
    label: 'Wheelchair — Cabin',
    desc: 'Passager totalement non ambulatoire — fauteuil roulant requis pour tous les déplacements. Assistance maximale.',
    level: 'red',
  },
  {
    code: 'BLND',
    label: 'Blind Passenger',
    desc: 'Passager malvoyant ou aveugle. Accompagnement vocal et physique assuré à chaque étape.',
    level: 'purple',
  },
  {
    code: 'DEAF',
    label: 'Deaf Passenger',
    desc: 'Passager malentendant ou sourd. Communication adaptée par écrit ou gestuelle selon le cas.',
    level: 'teal',
  },
] as const;

const SSR_LEVEL_STYLE = {
  blue:   'bg-[#003DA5]/10 text-[#003DA5] border border-[#003DA5]/25',
  amber:  'bg-amber-50 text-amber-700 border border-amber-200',
  red:    'bg-red-50 text-red-700 border border-red-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  teal:   'bg-teal-50 text-teal-700 border border-teal-200',
};

const HOW_TO_REQUEST = [
  {
    n: '01',
    label: 'Lors de la réservation du billet',
    desc: 'Informez votre compagnie aérienne de vos besoins spécifiques au moment de la réservation. Précisez le code SSR approprié.',
  },
  {
    n: '02',
    label: 'Au moins 48 heures avant le vol',
    desc: 'Confirmez votre demande auprès de la compagnie, même si elle a été faite à la réservation. FIH doit être notifié suffisamment en avance.',
  },
  {
    n: '03',
    label: 'À l\'arrivée à l\'aéroport',
    desc: 'Présentez-vous au comptoir d\'enregistrement PMR ou signalez-vous à l\'entrée du terminal. Un agent RVA prendra en charge votre assistance.',
  },
  {
    n: '04',
    label: 'Contact direct FIH',
    desc: 'En cas de besoin urgent ou pour toute question, contactez directement le service assistance passagers de FIH au +243 81 XXX XXXX.',
  },
] as const;

function PassagersHandicapPage() {
  return (
    <main id="main-content">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Terminal International FIH — Assistance PMR"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <nav className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={9} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'Aéroport</Link>
            <ChevronRight size={9} />
            <span className="text-white/80">Mobilité réduite</span>
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Guide de l'Aéroport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Assistance — Mobilité réduite (PMR)</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Guide</span>
        </div>
      </div>

      {/* ── Bandeau d'information ─────────────────────────────────────────── */}
      <div className="bg-[#003DA5]">
        <div className="mx-auto max-w-5xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Accessibility size={16} className="text-white flex-shrink-0" />
            <p className="text-sm font-semibold text-white">
              L'assistance PMR doit être demandée au moins 48 heures avant le départ auprès de votre compagnie aérienne.
            </p>
            <a href="tel:+243810000000" className="ml-auto flex-shrink-0 text-xs font-bold text-[#FFCE00] whitespace-nowrap hover:underline">
              +243 81 XXX XXXX
            </a>
          </div>
        </div>
      </div>

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Services disponibles */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Prestations</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Services disponibles à FIH</h2>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white p-5 flex flex-col gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[#003DA5]/10">
                  <s.icon size={15} className="text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-[#555] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comment demander */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Procédure</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Comment demander l'assistance PMR</h2>
          <div className="space-y-0 border-t border-[#e8e8e8]">
            {HOW_TO_REQUEST.map((step) => (
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

        {/* Codes SSR */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Codes techniques</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Codes de réservation spéciaux (SSR)</h2>
          <p className="text-sm text-[#555] mb-8 max-w-xl">
            Lors de la réservation, mentionnez le code SSR correspondant à votre situation.
            Ces codes standards permettent à la compagnie et à FIH de préparer l'assistance adéquate.
          </p>
          <div className="border border-[#e8e8e8] bg-white">
            {SSR_CODES.map((c, i) => (
              <div
                key={c.code}
                className={`flex items-start gap-4 px-5 py-4 ${i < SSR_CODES.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}
              >
                <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-black font-mono ${SSR_LEVEL_STYLE[c.level]}`}>
                  {c.code}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">{c.label}</p>
                  <p className="text-xs text-[#666] mt-0.5 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#999]">
            Les codes SSR doivent être mentionnés au moment de la réservation et confirmés 48 h avant le départ.
          </p>
        </section>

        {/* Infrastructures PMR */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Infrastructures</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Infrastructures PMR à FIH</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-[#e8e8e8] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#003DA5] mb-3">Terminal International</p>
              <ul className="space-y-2">
                {[
                  'Rampe d\'accès depuis la dépose-minute',
                  'Ascenseur entre le rez-de-chaussée et le niveau 1',
                  'Toilettes PMR — Niveau 0 (avant sécurité) et Niveau 1 (après sécurité)',
                  'Fauteuils roulants disponibles à l\'entrée principale',
                  'Comptoir d\'enregistrement PMR dédié (comptoir 2)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#444]">
                    <CheckCircle size={11} className="mt-0.5 flex-shrink-0 text-[#009A44]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#e8e8e8] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#009A44] mb-3">Terminal Domestique</p>
              <ul className="space-y-2">
                {[
                  'Accès de plain-pied depuis le parking',
                  'Toilettes PMR — Hall principal',
                  'Fauteuils roulants sur demande au guichet',
                  'Embarquement prioritaire vols Congo Airways et CAA',
                  'Agent AVSEC dédié assistance PMR',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#444]">
                    <CheckCircle size={11} className="mt-0.5 flex-shrink-0 text-[#009A44]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="bg-[#003DA5] p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-white text-lg mb-1">Besoin d'assistance ?</p>
            <p className="text-sm text-white/70">Contactez le service PMR de FIH en avance pour garantir votre confort et votre sécurité.</p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="tel:+243810000000"
              className="flex items-center gap-2 bg-[#FFCE00] px-5 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-[#FFCE00]/90 transition-colors whitespace-nowrap"
            >
              <Phone size={14} /> +243 81 XXX XXXX
            </a>
            <p className="text-[10px] text-white/50 text-center">24h/24 · 7j/7</p>
          </div>
        </div>

      </div>
    </main>
  );
}
