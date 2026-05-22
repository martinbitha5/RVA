import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Clock, ChevronDown, ChevronUp,
  PlaneLanding, Syringe, CreditCard, Car,
  CheckCircle, ArrowRight, Globe,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/guide/atterrir-kinshasa')({
  component: AtterrirKinshasaPage,
  head: () => ({
    meta: [
      { title: "Atterrir à Kinshasa — Guide Arrivée FIH" },
      { name: 'description', content: "Guide complet pour votre arrivée à l'Aéroport International de N'djili (FIH) : immigration DGM, bagages, douanes DGDA, taxis officiels." },
    ],
  }),
});

/* ─── Data ─────────────────────────────────────────────────────────── */

const KEY_INFO = [
  {
    icon: Syringe,
    label: 'Fièvre jaune obligatoire',
    desc: 'Carnet jaune OMS exigé. Sans vaccination valide : vaccination sur place (30 USD) + quarantaine possible.',
    accent: '#CE1126',
    href: '/guide/sante',
  },
  {
    icon: CreditCard,
    label: 'USD recommandé',
    desc: 'Le dollar américain est la devise principale en RDC. Prévoyez des billets de petite coupure.',
    accent: '#003DA5',
    href: '/boutiques-restaurants/echange-devises',
  },
  {
    icon: Globe,
    label: 'Visa électronique',
    desc: 'Visa disponible sur evisa.gouv.cd avant le départ ou à l\'arrivée pour certaines nationalités (85 USD).',
    accent: '#009A44',
    href: '/guide/douanes-immigration',
  },
  {
    icon: Car,
    label: 'Taxis officiels RVA',
    desc: 'Utilisez uniquement les taxis agréés RVA. Refusez tout démarcheur non-officiel à la sortie.',
    accent: '#1A1A1A',
    href: '/stationnement-transport/taxis',
  },
] as const;

const ARRIVAL_STEPS = [
  {
    id: 'debarquement',
    num: '01',
    title: 'Débarquement',
    time: '5 – 10 min',
    accent: '#003DA5',
    desc: "À l'atterrissage, vous serez conduit au terminal via un bus de piste COBUS ou une passerelle directe, selon la porte assignée.",
    tips: [
      'Suivez les panneaux "Arrivées / Arrivals" vers le hall de transit',
      'Bus COBUS disponible pour les vols sans passerelle directe',
      'Préparez : passeport, carnet de vaccination, formulaire d\'arrivée si requis',
    ],
    photo: '/images/fih-bus-cobus.jpg',
    photoCaption: 'Bus COBUS 3000 — navette airside · FIH · RVA',
  },
  {
    id: 'sante',
    num: '02',
    title: 'Contrôle Santé — Vaccination',
    time: '5 – 15 min',
    accent: '#CE1126',
    desc: "Le contrôle sanitaire est la première étape après le débarquement. Le carnet de vaccination est vérifié pour chaque passager.",
    tips: [
      'Carnet jaune OMS (fièvre jaune) — valide à vie depuis 2016',
      'Vaccination obligatoire pour tout voyageur arrivant de zones endémiques',
      'Vaccination sur place possible mais fortement déconseillée (30 USD + délai)',
    ],
    photo: null,
    photoCaption: null,
  },
  {
    id: 'dgm',
    num: '03',
    title: 'Contrôle Immigration — DGM',
    time: '20 – 40 min',
    accent: '#009A44',
    desc: "La Direction Générale des Migrations vérifie passeport et visa. Deux files distinctes : nationaux RDC et étrangers.",
    tips: [
      'Ressortissants RDC : passeport ou carte d\'identité nationale',
      'CEDEAO / UA : visa à l\'arrivée possible pour certains pays',
      'Autres nationalités : visa requis — préférez le visa électronique (evisa.gouv.cd)',
      'Visa à l\'arrivée : 85 USD — disponible pour certaines nationalités',
    ],
    photo: null,
    photoCaption: null,
  },
  {
    id: 'bagages',
    num: '04',
    title: 'Récupération des bagages',
    time: '20 – 40 min',
    accent: '#1A1A1A',
    desc: "Le hall de réclamation des bagages dispose de plusieurs bandes de livraison. Votre numéro de bande est affiché sur les écrans.",
    tips: [
      'Numéro de bande affiché sur les écrans du hall arrivées',
      'Gardez votre ticket bagage — contrôlé à la sortie',
      'Bagage manquant : signalez immédiatement au comptoir de votre compagnie',
      'Délai de livraison : 20–40 min selon le vol',
    ],
    photo: '/images/fih-bagages.jpg',
    photoCaption: 'Hall réclamation bagages — Terminal International FIH',
  },
  {
    id: 'douanes',
    num: '05',
    title: 'Contrôle Douanier — DGDA',
    time: '5 – 15 min',
    accent: '#FFCE00',
    desc: "La Direction Générale des Douanes et Accises (DGDA) contrôle les biens importés. Déclarez tout ce qui dépasse les franchises.",
    tips: [
      'Déclarez tout montant supérieur à 10 000 USD en espèces',
      'Produits commerciaux, équipements professionnels : déclaration obligatoire',
      'Médicaments en grande quantité : ordonnance médicale recommandée',
      'Alcools et tabac : franchises en vigueur selon la réglementation RDC',
    ],
    photo: null,
    photoCaption: null,
  },
  {
    id: 'sortie',
    num: '06',
    title: 'Sortie & Transport',
    time: 'Variable',
    accent: '#003DA5',
    desc: "Le hall d'accueil vous propose taxis officiels, bureaux de change et ATM. Restez dans la zone officielle et ignorez les démarcheurs.",
    tips: [
      'Taxis RVA agréés — comptoir officiel à la sortie du hall',
      'Bureau de change Rawbank — avant la sortie',
      'ATM Equity BCDC et TMB dans le hall arrivées',
      'Navettes hôtels — panneaux d\'accueil avec votre prénom si réservé',
    ],
    photo: null,
    photoCaption: null,
  },
] as const;

const FAQS = [
  {
    q: "Faut-il avoir un visa avant d'arriver à Kinshasa ?",
    a: "Cela dépend de votre nationalité. Les ressortissants de certains pays africains peuvent obtenir un visa à l'arrivée (85 USD). La majorité des autres nationalités doit obtenir un visa avant le départ, idéalement via le visa électronique sur evisa.gouv.cd. Les ressortissants RDC n'ont bien sûr pas besoin de visa.",
  },
  {
    q: "Que faire si mon bagage n'arrive pas ?",
    a: "Rendez-vous immédiatement au comptoir de votre compagnie aérienne dans le hall arrivées, avant de passer les douanes. Remplissez un rapport d'irrégularité bagage (PIR). Votre bagage sera localisé et livré à votre adresse kinoise dans les 24–72 h en général.",
  },
  {
    q: "Les bus de piste (COBUS) sont-ils toujours utilisés ?",
    a: "Les bus COBUS 3000 de la RVA sont utilisés lorsque votre vol est garé loin d'une passerelle directe. C'est courant à FIH pour les vols internationaux. Les bus sont climatisés, modernes et sécurisés.",
  },
  {
    q: "Puis-je retirer des dollars USD à l'aéroport ?",
    a: "Oui, des ATM Rawbank, Equity BCDC et TMB sont disponibles dans le hall arrivées. Les distributeurs délivrent principalement des USD. Un bureau de change Rawbank est également disponible pour convertir vos devises.",
  },
  {
    q: "Comment distinguer un taxi officiel d'un taxi non agréé ?",
    a: "Les taxis officiels RVA portent des signes distinctifs (logo, plaque réglementée) et sont stationnés dans la zone officielle de la sortie arrivées. Ne suivez jamais un inconnu qui vous aborde à l'intérieur du terminal ou dans le hall. Refusez tout démarcheur.",
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
        <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</div>
      )}
    </div>
  );
}

function AtterrirKinshasaPage() {
  const { t } = useTranslation();
  return (
    <>
      {/* ── HERO — tarmac photo ─────────────────────────────────────── */}
      <PageHero
        eyebrow={t('nav.guide')}
        title={t('guide.arrivingKinshasa')}
        subtitle={t('guide.arrivingSubtitle')}
        breadcrumbs={[
          { label: t('home.hero.cta'), href: '/' },
          { label: t('nav.guide'), href: '/guide' },
          { label: t('guide.arrivingKinshasa') },
        ]}
        image="/images/fih-tarmac.jpg"
        gradient="night"
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/vols/arrivees' as never} className="btn-primary">
              <PlaneLanding size={15} /> Voir les arrivées en direct
            </Link>
            <Link to={'/guide/douanes-immigration' as never} className="btn-outline-white">
              Douanes & Immigration <ArrowRight size={14} />
            </Link>
          </div>
        }
      />

      {/* ── KEY INFO CARDS ──────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">À savoir avant d'atterrir</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-10">
            Informations essentielles
          </h2>

          <div className="grid gap-0.5 bg-border sm:grid-cols-2 lg:grid-cols-4">
            {KEY_INFO.map((info) => (
              <Link
                key={info.label}
                to={info.href as never}
                className="group relative bg-white p-7 flex flex-col gap-4 overflow-hidden hover:bg-[#F8F9FB] transition-colors"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: info.accent }}
                />
                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ background: `${info.accent}12`, border: `1px solid ${info.accent}25` }}
                >
                  <info.icon size={22} style={{ color: info.accent }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display font-bold text-rdc-anthracite text-base mb-1.5">
                    {info.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{info.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold mt-auto" style={{ color: info.accent }}>
                  En savoir plus <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉTAPES D'ARRIVÉE ─────────────────────────────────────────── */}
      <section className="section-muted py-16 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Procédure d'arrivée</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-12">
            Les 6 étapes à FIH
          </h2>

          <div className="space-y-0 border-t border-border">
            {ARRIVAL_STEPS.map((step) => (
              <div key={step.id} className="border-b border-border">
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
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center lg:hidden"
                            style={{ background: step.accent }}
                          >
                            <span className="text-xs font-bold text-white">{step.num}</span>
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                            style={{ color: step.accent }}
                          >
                            <Clock size={10} /> {step.time}
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

                      {/* Photo */}
                      {step.photo && (
                        <div className="lg:w-[380px] shrink-0">
                          <div className="relative overflow-hidden aspect-[4/3]">
                            <img
                              src={step.photo}
                              alt={step.title}
                              className="h-full w-full object-cover"
                              style={{ filter: 'brightness(1.05) contrast(1.08) saturate(1.12)' }}
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                (target.parentElement as HTMLElement).style.background = `linear-gradient(135deg, ${step.accent} 0%, #0D0D14 100%)`;
                              }}
                            />
                            <div
                              className="absolute bottom-0 left-0 h-1 w-16"
                              style={{ backgroundColor: step.accent }}
                            />
                          </div>
                          {step.photoCaption && (
                            <p className="mt-2 text-[10px] text-muted-foreground italic">
                              {step.photoCaption}
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

      {/* ── BUS COBUS — feature ─────────────────────────────────────── */}
      <section className="section-night overflow-hidden py-0">
        <div className="grid lg:grid-cols-2">
          {/* Photo */}
          <div className="relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
            <img
              src="/images/fih-bus-cobus.jpg"
              alt="Bus COBUS 3000 — navette aéroport FIH"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'brightness(0.88) contrast(1.12) saturate(1.18)' }}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                (target.parentElement as HTMLElement).style.background = 'linear-gradient(135deg, #0D1B3E 0%, #003DA5 100%)';
              }}
            />
            {/* Gradient overlay on right side */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-rdc-anthracite/80 hidden lg:block" />
            {/* Bottom tag */}
            <div className="absolute bottom-6 left-6">
              <span className="bg-black/50 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                COBUS 3000 · FIH
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-yellow">Navette airside</p>
            </div>
            <h2 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
              Bus de piste COBUS 3000
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              À l'arrivée comme au départ, certains vols nécessitent une navette
              sur le tarmac. Les <strong className="text-white">COBUS 3000</strong> de la RVA
              sont des bus aéroport modernes, climatisés, spécialement conçus
              pour la circulation sur le tarmac de FIH.
            </p>
            <ul className="space-y-3">
              {[
                'Climatisé et confortable',
                'Capacité : 100+ passagers',
                'Conduit directement au pied de l\'avion',
                'Personnel RVA à bord pour guider les passagers',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                  <CheckCircle size={14} className="text-rdc-yellow shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
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
            FAQ Arrivée FIH
          </h2>
          <div className="border-t border-border">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LINKS ───────────────────────────────────────────────────── */}
      <section className="section-blue py-14">
        <div className="container">
          <div className="grid gap-0.5 bg-white/15 sm:grid-cols-3">
            {[
              { label: 'Douanes & Immigration', desc: 'DGM, DGDA, visa à l\'arrivée', href: '/guide/douanes-immigration' },
              { label: 'Taxis officiels', desc: 'Taxis RVA agréés depuis FIH', href: '/stationnement-transport/taxis' },
              { label: 'Change de devises', desc: 'USD, CDF, EUR — bureaux de change', href: '/boutiques-restaurants/echange-devises' },
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
