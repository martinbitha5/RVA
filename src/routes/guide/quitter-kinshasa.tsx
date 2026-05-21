import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Clock, AlertTriangle, ChevronDown, ChevronUp,
  PlaneTakeoff, FileText, Syringe,
  CheckCircle, ArrowRight, User,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/guide/quitter-kinshasa')({
  component: QuitterKinshasaPage,
  head: () => ({
    meta: [
      { title: "Départ de Kinshasa — Enregistrement & Check-in · FIH" },
      { name: 'description', content: "Guide complet pour votre départ depuis l'Aéroport International de N'djili (FIH) : check-in, comptoirs, sécurité, embarquement." },
    ],
  }),
});

/* ─── Data ─────────────────────────────────────────────────────────── */

const DOCS_REQUIRED = [
  { icon: FileText, label: 'Passeport valide', note: 'Validité min. 6 mois après la date de retour', color: '#003DA5' },
  { icon: Syringe,  label: 'Carnet jaune OMS', note: 'Vaccination fièvre jaune — OBLIGATOIRE', color: '#CE1126' },
  { icon: FileText, label: 'Billet électronique', note: 'PDF ou application compagnie aérienne', color: '#009A44' },
  { icon: User,     label: 'Visa destination', note: 'Selon la nationalité et le pays de destination', color: '#FFCE00' },
] as const;

const CHECKIN_COUNTERS = [
  { airline: 'Ethiopian Airlines', counters: '6 – 9',   class: 'Economy + Business', terminal: 'International' },
  { airline: 'Brussels Airlines',  counters: '10 – 11', class: 'Economy + Business', terminal: 'International' },
  { airline: 'Air France',         counters: '12 – 13', class: 'Economy + Business', terminal: 'International' },
  { airline: 'Kenya Airways',      counters: '14 – 15', class: 'Economy',            terminal: 'International' },
  { airline: 'Qatar Airways',      counters: '16',      class: 'Economy + Business', terminal: 'International' },
  { airline: 'Congo Airways',      counters: '1 – 4',   class: 'Economy',            terminal: 'Domestique' },
  { airline: 'CAA',                counters: '5 – 6',   class: 'Economy',            terminal: 'Domestique' },
] as const;

const STEPS = [
  {
    id: 'arrivee',
    num: '01',
    title: "Arrivée à l'aéroport",
    time: '3 h avant (international) · 2 h (domestique)',
    icon: Clock,
    accent: '#003DA5',
    desc: "Présentez-vous à l'aéroport bien en avance. Le Boulevard Lumumba peut être embouteillé aux heures de pointe — prévoyez une marge.",
    tips: [
      'Terminal International : vols Brussels Airlines, Ethiopian, Air France, Kenya Airways, Qatar Airways…',
      'Terminal Domestique : vols Congo Airways, CAA vers Lubumbashi, Goma, Bukavu, Kisangani…',
      'Parking officiel RVA disponible devant les deux terminaux (tarif horaire)',
    ],
    photo: null,
  },
  {
    id: 'checkin',
    num: '02',
    title: 'Enregistrement — Check-in',
    time: 'Fermeture comptoirs : 1 h avant (international) · 45 min (domestique)',
    icon: PlaneTakeoff,
    accent: '#009A44',
    desc: "Les comptoirs d'enregistrement sont numérotés et clairement indiqués dans le hall. Présentez vos documents dès votre arrivée au comptoir.",
    tips: [
      'Passeport valide + billet électronique requis',
      'Carnet de vaccination fièvre jaune (carnet jaune OMS) OBLIGATOIRE',
      'Franchise bagage : 20–23 kg en soute (économique), 30–32 kg (affaires)',
      'Option FIH Express disponible : comptoir prioritaire sans file d\'attente',
    ],
    photo: '/images/fih-checkin.jpg',
  },
  {
    id: 'dgm',
    num: '03',
    title: 'Contrôle immigration — DGM',
    time: '15 – 25 min',
    icon: FileText,
    accent: '#FFCE00',
    desc: "La Direction Générale des Migrations (DGM) contrôle votre passeport et votre visa avant d'accéder à la zone sécurisée.",
    tips: [
      'Ressortissants RDC : passeport ou pièce d\'identité nationale',
      'Étrangers : passeport + visa RDC valide',
      'Taxe de sortie généralement incluse dans le billet (vérifiez auprès de votre compagnie)',
    ],
    photo: null,
  },
  {
    id: 'securite',
    num: '04',
    title: 'Contrôle de sécurité',
    time: '10 – 20 min',
    icon: AlertTriangle,
    accent: '#CE1126',
    desc: 'Le contrôle de sûreté est obligatoire pour tous les passagers. Préparez vos affaires à l\'avance pour faciliter l\'inspection.',
    tips: [
      'Retirez chaussures, ceinture, veste et objets métalliques',
      'Liquides max 100 ml par contenant, dans un sac plastique transparent (1 L)',
      'Ordinateurs portables et tablettes à sortir du sac',
      'Téléphones et monnaies dans le bac prévu',
    ],
    photo: null,
  },
  {
    id: 'embarquement',
    num: '05',
    title: 'Zone internationale & Embarquement',
    time: 'Embarquement : 45 – 30 min avant le départ',
    icon: PlaneTakeoff,
    accent: '#003DA5',
    desc: "En zone sécurisée, profitez des boutiques duty-free, restaurants et salons VIP. L'embarquement se fait en navette (bus de piste) ou via passerelle selon la porte.",
    tips: [
      'Vérifiez votre porte d\'embarquement sur les écrans (peut changer)',
      'Bus de piste COBUS : les passagers sont transportés jusqu\'à l\'avion en navette',
      'Présentez carte d\'embarquement + passeport à la porte',
      'Duty Free : achats autorisés en zone sécurisée',
    ],
    photo: '/images/fih-bus-cobus.jpg',
  },
] as const;

const FAQS = [
  {
    q: "Peut-on s'enregistrer en ligne pour les vols depuis FIH ?",
    a: "Oui, la plupart des compagnies internationales (Ethiopian Airlines, Brussels Airlines, Air France…) proposent l'enregistrement en ligne via leur site ou application, jusqu'à 24–48 h avant le départ. Vous devrez tout de même vous présenter au comptoir bagage si vous avez des bagages en soute.",
  },
  {
    q: "Quels documents sont absolument indispensables ?",
    a: "Le passeport valide et le carnet de vaccination (carnet jaune OMS — fièvre jaune) sont les deux documents les plus critiques. Sans l'un ou l'autre, l'accès peut vous être refusé à l'enregistrement ou au contrôle DGM.",
  },
  {
    q: "Y a-t-il un comptoir prioritaire à FIH ?",
    a: "Oui, le service FIH Express propose un enregistrement prioritaire avec assistance dédiée. Renseignez-vous auprès de la RVA ou de votre compagnie aérienne pour l'activer.",
  },
  {
    q: "Que se passe-t-il si j'ai un excédent de bagages ?",
    a: "Les frais d'excédent de bagage sont payables directement au comptoir d'enregistrement, généralement en USD. Les tarifs varient selon la compagnie — vérifiez avant de vous déplacer.",
  },
  {
    q: "Les bus de piste (COBUS) sont-ils systématiquement utilisés ?",
    a: "Cela dépend de la porte d'embarquement assignée. Certaines portes disposent d'une passerelle directe (jetway), d'autres non. Dans ce cas, les passagers sont transportés jusqu'à l'avion en navette COBUS 3000 — des bus modernes climatisés aux couleurs de la RVA.",
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display font-semibold text-rdc-anthracite text-base leading-snug pr-4">
          {q}
        </span>
        {open
          ? <ChevronUp size={18} className="shrink-0 text-rdc-blue" />
          : <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
        }
      </button>
      {open && (
        <div className="pb-5 text-sm text-muted-foreground leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

function QuitterKinshasaPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Guide départ"
        title="Quitter Kinshasa"
        subtitle="Tout ce qu'il faut savoir pour réussir votre départ depuis l'Aéroport International de N'djili : check-in, contrôles, embarquement."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: "Guide de l'aéroport", href: '/guide' },
          { label: 'Quitter Kinshasa' },
        ]}
        image="/images/fih-checkin.jpg"
        gradient="night"
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/vols/departs' as never} className="btn-primary">
              <PlaneTakeoff size={15} /> Vols en direct
            </Link>
            <Link to={'/vols/departs' as never} className="btn-outline-white">
              Voir les départs <ArrowRight size={14} />
            </Link>
          </div>
        }
      />

      {/* ── ALERTE FIÈVRE JAUNE ─────────────────────────────────────── */}
      <div className="bg-rdc-yellow border-b-2 border-rdc-yellow/60">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <Syringe size={18} className="text-rdc-anthracite shrink-0" />
            <p className="text-sm font-bold text-rdc-anthracite">
              Vaccination fièvre jaune — carnet jaune OMS exigé à l'enregistrement pour tous les vols internationaux.
            </p>
            <Link to={'/guide/sante' as never} className="ml-auto shrink-0 text-xs font-bold text-rdc-anthracite underline hover:no-underline whitespace-nowrap">
              En savoir plus
            </Link>
          </div>
        </div>
      </div>

      {/* ── DOCUMENTS REQUIS ────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Avant de partir</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-2">
            Documents indispensables
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-xl">
            Vérifiez que vous avez tous ces documents avant de quitter votre domicile.
            Leur absence peut entraîner un refus d'embarquement.
          </p>

          <div className="grid gap-0.5 bg-border sm:grid-cols-2 lg:grid-cols-4">
            {DOCS_REQUIRED.map((doc, i) => (
              <div
                key={i}
                className="group bg-white p-6 flex flex-col gap-4 relative overflow-hidden"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: doc.color }}
                />
                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ background: `${doc.color}12`, border: `1px solid ${doc.color}25` }}
                >
                  <doc.icon size={22} style={{ color: doc.color }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display font-bold text-rdc-anthracite text-base">{doc.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{doc.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉTAPES DE DÉPART ───────────────────────────────────────── */}
      <section className="section-muted py-16 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Procédure de départ</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-12">
            Les 5 étapes pas à pas
          </h2>

          <div className="space-y-0 border-t border-border">
            {STEPS.map((step) => (
              <div key={step.id} className="border-b border-border">
                {/* Step header */}
                <div className="grid gap-0 lg:grid-cols-[80px_1fr]">
                  {/* Number */}
                  <div
                    className="hidden lg:flex items-start justify-center pt-10 pb-8"
                    style={{ background: `${step.accent}08` }}
                  >
                    <span
                      className="font-display text-4xl font-bold leading-none"
                      style={{ color: `${step.accent}40` }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-white p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Text */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center lg:hidden"
                            style={{ background: step.accent }}
                          >
                            <span className="text-xs font-bold text-white">{step.num}</span>
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: step.accent }}
                          >
                            <Clock size={10} className="inline mr-1" />
                            {step.time}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-rdc-anthracite text-2xl mb-3 mt-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                          {step.desc}
                        </p>

                        <ul className="space-y-2">
                          {step.tips.map((tip) => (
                            <li key={tip} className="flex items-start gap-2.5 text-sm text-rdc-anthracite">
                              <CheckCircle
                                size={15}
                                className="shrink-0 mt-0.5"
                                style={{ color: step.accent }}
                              />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Photo (if any) */}
                      {step.photo && (
                        <div className="lg:w-[380px] shrink-0">
                          <div className="relative overflow-hidden aspect-[4/3]">
                            <img
                              src={step.photo}
                              alt={step.title}
                              className="h-full w-full object-cover"
                              style={{ filter: 'brightness(1.05) contrast(1.08) saturate(1.12)' }}
                              loading="lazy"
                            />
                            {/* Subtle frame accent */}
                            <div
                              className="absolute bottom-0 left-0 h-1 w-16"
                              style={{ backgroundColor: step.accent }}
                            />
                          </div>
                          {step.id === 'checkin' && (
                            <p className="mt-2 text-[10px] text-muted-foreground italic">
                              Hall d'enregistrement — Terminal International FIH
                            </p>
                          )}
                          {step.id === 'embarquement' && (
                            <p className="mt-2 text-[10px] text-muted-foreground italic">
                              Bus de piste COBUS 3000 — Navette airside FIH · RVA
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPTOIRS D'ENREGISTREMENT ──────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12">
            {/* Left: photo */}
            <div className="lg:w-[440px] shrink-0">
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src="/images/fih-checkin-ethiopian.jpg"
                  alt="Panneaux Ethiopian Airlines check-in FIH"
                  className="h-full w-full object-cover"
                  style={{ filter: 'brightness(1.0) contrast(1.06) saturate(1.1)' }}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    (target.parentElement as HTMLElement).style.background = 'linear-gradient(135deg, #003DA5 0%, #001E6E 100%)';
                  }}
                />
                <div className="absolute bottom-0 left-0 h-1 w-20 bg-rdc-yellow" />
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground italic">
                Ethiopian Airlines — counters Check-in Economy & Business · FIH
              </p>
            </div>

            {/* Right: table */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-blue">Comptoirs</p>
              </div>
              <h2 className="display-sub text-rdc-anthracite mb-6">
                Où s'enregistrer ?
              </h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Les comptoirs sont numérotés dans le hall principal. Repérez le numéro
                correspondant à votre compagnie sur les panneaux lumineux à l'entrée du terminal.
              </p>

              {/* Table */}
              <div className="overflow-hidden border-t border-border">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <div className="bg-white px-4 py-3">Compagnie</div>
                  <div className="bg-white px-4 py-3 text-center">Comptoirs</div>
                  <div className="bg-white px-4 py-3 hidden sm:block">Classes</div>
                  <div className="bg-white px-4 py-3 text-center">Terminal</div>
                </div>
                <div className="bg-border flex flex-col gap-px">
                  {CHECKIN_COUNTERS.map((row) => (
                    <div
                      key={row.airline}
                      className="grid grid-cols-[1fr_auto_auto_auto] gap-px bg-border"
                    >
                      <div className="bg-white px-4 py-3.5">
                        <p className="font-semibold text-rdc-anthracite text-sm">{row.airline}</p>
                      </div>
                      <div className="bg-white px-4 py-3.5 text-center">
                        <span className="font-display font-bold text-rdc-blue text-sm">{row.counters}</span>
                      </div>
                      <div className="bg-white px-4 py-3.5 hidden sm:block">
                        <span className="text-xs text-muted-foreground">{row.class}</span>
                      </div>
                      <div className="bg-white px-4 py-3.5 text-center">
                        <span className={cn(
                          'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5',
                          row.terminal === 'International'
                            ? 'bg-rdc-blue/10 text-rdc-blue'
                            : 'bg-rdc-green/10 text-rdc-green',
                        )}>
                          {row.terminal === 'International' ? 'Intl' : 'Dom'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">
                * Affectation des comptoirs susceptible de varier selon les jours et les vols. Vérifiez à votre arrivée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUS DE PISTE — feature section ─────────────────────────── */}
      <section className="section-night py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_480px] items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-yellow">À bord du tarmac</p>
              </div>
              <h2 className="display-sub text-white mb-4">
                Les bus de piste COBUS 3000
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Lorsque votre vol est assigné à une porte sans passerelle (jetway),
                vous embarquez à bord d'un <strong className="text-white">bus COBUS 3000</strong> —
                navette aéroport moderne, climatisée, aux couleurs de l'{' '}
                <strong className="text-white">Aéroport International de N'djili</strong>.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Ces véhicules transportent directement les passagers depuis le terminal
                jusqu'au pied de l'avion, en toute sécurité sur le tarmac de FIH.
                Restez à bord jusqu'à l'arrêt complet.
              </p>

              <div className="space-y-0 border-t border-white/10">
                {[
                  { label: 'Flotte disponible', value: '2 bus COBUS 3000' },
                  { label: 'Capacité', value: '100+ passagers par rotation' },
                  { label: 'Opérateur', value: 'Aéroport International de N\'djili (RVA)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/30">{item.label}</span>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div className="relative overflow-hidden aspect-[3/2] lg:aspect-auto lg:h-[400px]">
              <img
                src="/images/fih-tarmac.jpg"
                alt="Tarmac FIH — bus COBUS et avions"
                className="h-full w-full object-cover"
                style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.15)' }}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  (target.parentElement as HTMLElement).style.background = 'linear-gradient(135deg, #0D1B3E 0%, #003DA5 100%)';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                  FIH Tarmac · Kinshasa
                </span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-rdc-yellow" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Questions fréquentes</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-10">
            FAQ Départ FIH
          </h2>

          <div className="border-t border-border">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA LINKS ───────────────────────────────────────────────── */}
      <section className="section-blue py-14">
        <div className="container">
          <div className="grid gap-0.5 bg-white/15 sm:grid-cols-3">
            {[
              { label: 'Sécurité & Bagages', desc: 'Règles, dimensions, objets interdits', href: '/guide/securite-bagages' },
              { label: 'Douanes & Immigration', desc: 'Procédures DGDA et DGM au départ', href: '/guide/douanes-immigration' },
              { label: 'Vols en direct', desc: 'Départs temps réel depuis FIH', href: '/vols/departs' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href as never}
                className="group bg-rdc-blue/20 p-6 flex flex-col gap-2 hover:bg-white/10 transition-colors relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-rdc-yellow transition-all duration-500" />
                <p className="font-display font-bold text-white text-lg group-hover:text-rdc-yellow transition-colors">
                  {link.label}
                </p>
                <p className="text-sm text-white/50">{link.desc}</p>
                <ArrowRight size={14} className="text-white/30 group-hover:text-rdc-yellow group-hover:translate-x-1 transition-all mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
