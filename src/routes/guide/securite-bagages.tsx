import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  ChevronDown, ChevronUp, XCircle, CheckCircle,
  ArrowRight, AlertTriangle, Luggage, Ruler,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/guide/securite-bagages')({
  component: SecuriteBagagesPage,
  head: () => ({
    meta: [
      { title: "Sécurité & Bagages — Guide FIH" },
      { name: 'description', content: "Règles bagages à FIH : franchises par classe, dimensions cabine, objets interdits, règle des 100 ml. Guide complet." },
    ],
  }),
});

/* ─── Data ─────────────────────────────────────────────────────────── */

type BaggageClass = 'economy' | 'business' | 'domestic';

const CLASSES: { id: BaggageClass; label: string; sub: string }[] = [
  { id: 'economy',  label: 'Classe Économique', sub: 'Economy Class' },
  { id: 'business', label: 'Classe Affaires',   sub: 'Business Class' },
  { id: 'domestic', label: 'Vols Domestiques',  sub: 'Congo Airways · CAA' },
];

const BAGGAGE_DATA: Record<BaggageClass, {
  cabin: { weight: string; pieces: string; dimensions: string };
  hold:  { weight: string; pieces: string; dimensions: string };
  note: string;
}> = {
  economy: {
    cabin: { weight: '7 – 10 kg',  pieces: '1 bagage',  dimensions: '55 × 40 × 23 cm (max)' },
    hold:  { weight: '20 – 23 kg', pieces: '1 – 2 pièces', dimensions: '158 cm linéaires (L+l+H)' },
    note: 'Les franchises varient selon la compagnie aérienne et la destination. Vérifiez auprès de votre transporteur.',
  },
  business: {
    cabin: { weight: '12 – 15 kg', pieces: '2 bagages', dimensions: '55 × 40 × 23 cm (max)' },
    hold:  { weight: '30 – 32 kg', pieces: '2 pièces',  dimensions: '158 cm linéaires (L+l+H)' },
    note: 'Les passagers Business bénéficient souvent d\'une franchise bagage majorée et d\'un service prioritaire en soute.',
  },
  domestic: {
    cabin: { weight: '5 – 7 kg',   pieces: '1 bagage',  dimensions: '45 × 35 × 20 cm (max)' },
    hold:  { weight: '15 – 20 kg', pieces: '1 pièce',   dimensions: '158 cm linéaires (L+l+H)' },
    note: 'Vols intérieurs Congo Airways et CAA vers Lubumbashi, Goma, Bukavu, Kisangani, Mbuji-Mayi, etc.',
  },
};

const FORBIDDEN_CABIN = [
  { item: 'Couteaux, ciseaux, objets tranchants > 6 cm', note: 'Autorisé en soute' },
  { item: 'Armes à feu et munitions', note: 'Soute autorisée avec déclaration préalable' },
  { item: 'Liquides > 100 ml par contenant', note: 'Sauf achats duty-free emballés' },
  { item: 'Batteries lithium > 160 Wh', note: 'Interdites en soute également' },
  { item: 'Gaz comprimés — déodorants aérosol > 100 ml', note: 'Petites bouteilles tolérées' },
  { item: 'Produits chimiques corrosifs ou explosifs', note: 'Interdits partout' },
  { item: 'Briquets à gaz non sécurisés', note: '1 briquet max dans les poches' },
] as const;

const LIQUIDS_RULES = [
  'Chaque contenant : maximum 100 ml / 100 g',
  'Sac plastique transparent refermable : capacité max 1 litre',
  'Un seul sac plastique par passager',
  'Médicaments liquides : exonérés — déclaration et ordonnance recommandées',
  'Aliments bébé (lait, purées) : exonérés pour le vol concerné',
  'Achats duty-free : autorisés dans emballage scellé avec reçu d\'achat',
] as const;

const FAQS = [
  {
    q: 'Puis-je emporter des médicaments liquides en quantité supérieure à 100 ml ?',
    a: 'Oui, les médicaments sont exemptés de la règle des 100 ml. Vous devrez les déclarer au contrôle de sécurité et présenter une ordonnance médicale si demandé. Prévoyez une quantité raisonnablement justifiée par la durée du voyage.',
  },
  {
    q: 'Mon téléphone et mon ordinateur portable peuvent-ils être en soute ?',
    a: 'Oui, les appareils électroniques peuvent être en soute. Cependant, les batteries de rechange lithium-ion (power banks) ne sont autorisées qu\'en cabine — elles sont interdites en soute. Éteignez votre appareil si vous le mettez en soute.',
  },
  {
    q: 'Quelle est la taille maximale d\'un bagage cabine à FIH ?',
    a: 'La norme générale est 55 × 40 × 23 cm pour le bagage principal. Certaines compagnies acceptent des dimensions légèrement différentes. Vérifiez les dimensions précises auprès de votre compagnie aérienne avant de partir.',
  },
  {
    q: 'Que faire en cas de bagage endommagé à l\'arrivée ?',
    a: 'Signalez immédiatement les dommages au comptoir de votre compagnie, avant de quitter le hall arrivées. Un rapport d\'irrégularité bagage (PIR) doit être complété sur place. Conservez tous vos tickets de bagage et reçus.',
  },
  {
    q: 'Les denrées alimentaires congolaises peuvent-elles être emportées ?',
    a: 'Les denrées alimentaires transformées (conserves, produits secs) sont généralement autorisées. Les produits frais (viandes, poissons, fruits) peuvent être soumis à des restrictions selon la réglementation phytosanitaire du pays de destination. Vérifiez auprès des autorités du pays d\'arrivée.',
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
        <span className="font-display font-semibold text-rdc-anthracite text-base leading-snug pr-4">{q}</span>
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

function BaggageIcon({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="text-center border border-border p-5 bg-white">
      <p className="font-display text-3xl font-bold text-rdc-blue leading-none">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-rdc-anthracite">{label}</p>
    </div>
  );
}

function SecuriteBagagesPage() {
  const { t } = useTranslation();
  const [activeClass, setActiveClass] = useState<BaggageClass>('economy');
  const data = BAGGAGE_DATA[activeClass];

  return (
    <>
      {/* ── HERO — baggage claim photo ──────────────────────────────── */}
      <PageHero
        eyebrow={t('nav.guide')}
        title={t('guide.luggageSecurity')}
        subtitle={t('guide.securitySubtitle')}
        breadcrumbs={[
          { label: t('home.hero.cta'), href: '/' },
          { label: t('nav.guide'), href: '/guide' },
          { label: t('guide.luggageSecurity') },
        ]}
        image="/images/fih-bagages.jpg"
        gradient="night"
      />

      {/* ── 100 ML ALERT ──────────────────────────────────────────────── */}
      <div className="bg-amber-50 border-b-2 border-amber-400">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0" />
            <p className="text-sm font-bold text-amber-800">
              Règle des 100 ml — Tout liquide en cabine doit être conditionné dans un
              contenant de maximum 100 ml, dans un sac plastique transparent d'1 litre max.
            </p>
          </div>
        </div>
      </div>

      {/* ── FRANCHISES BAGAGES ─────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Franchises bagage</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-3">
            Ce que vous pouvez emporter
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-xl leading-relaxed">
            Les franchises ci-dessous sont indicatives. Vérifiez toujours les conditions
            exactes auprès de votre compagnie aérienne, car elles varient.
          </p>

          {/* Class tabs */}
          <div className="flex gap-0 border border-border mb-10 w-fit">
            {CLASSES.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setActiveClass(cls.id)}
                className={cn(
                  'px-6 py-3 text-sm font-bold transition-colors',
                  activeClass === cls.id
                    ? 'bg-rdc-blue text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-rdc-anthracite',
                )}
              >
                {cls.label}
              </button>
            ))}
          </div>

          {/* Data panels */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Cabin */}
            <div className="border border-border">
              <div className="bg-rdc-blue/5 border-b border-border px-6 py-4 flex items-center gap-3">
                <Luggage size={18} className="text-rdc-blue" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-rdc-anthracite">Bagage cabine</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <BaggageIcon label="Poids max" value={data.cabin.weight.split(' ')[0]} sub={data.cabin.weight.split(' ').slice(1).join(' ')} />
                  <BaggageIcon label="Pièces" value={data.cabin.pieces.split(' ')[0]} sub={data.cabin.pieces.split(' ').slice(1).join(' ')} />
                  <div className="text-center border border-border p-5 bg-white">
                    <div className="flex justify-center mb-1">
                      <Ruler size={22} className="text-rdc-blue" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Dimensions</p>
                    <p className="mt-1 text-xs font-bold text-rdc-anthracite leading-snug">{data.cabin.dimensions}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-rdc-blue/5 border border-rdc-blue/15 p-3">
                  <AlertTriangle size={13} className="text-rdc-blue shrink-0 mt-0.5" />
                  <p className="text-xs text-rdc-blue/80 leading-relaxed">
                    Le bagage doit tenir dans le compartiment supérieur ou sous le siège.
                  </p>
                </div>
              </div>
            </div>

            {/* Hold */}
            <div className="border border-border">
              <div className="bg-rdc-green/5 border-b border-border px-6 py-4 flex items-center gap-3">
                <Luggage size={18} className="text-rdc-green" strokeWidth={1.5} />
                <h3 className="font-display font-bold text-rdc-anthracite">Bagage en soute</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <BaggageIcon label="Poids max" value={data.hold.weight.split(' – ')[0]} sub={data.hold.weight.includes(' – ') ? `à ${data.hold.weight.split(' – ')[1]}` : ''} />
                  <BaggageIcon label="Pièces" value={data.hold.pieces.split(' ')[0]} sub={data.hold.pieces.split(' ').slice(1).join(' ')} />
                  <div className="text-center border border-border p-5 bg-white">
                    <div className="flex justify-center mb-1">
                      <Ruler size={22} className="text-rdc-green" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Linéaire max</p>
                    <p className="mt-1 text-xs font-bold text-rdc-anthracite leading-snug">{data.hold.dimensions}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-rdc-green/5 border border-rdc-green/15 p-3">
                  <CheckCircle size={13} className="text-rdc-green shrink-0 mt-0.5" />
                  <p className="text-xs text-rdc-green/80 leading-relaxed">
                    Enregistrez vos bagages au comptoir de votre compagnie lors du check-in.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs text-muted-foreground italic">{data.note}</p>
        </div>
      </section>

      {/* ── BAGGAGE CLAIM PHOTO SECTION ────────────────────────────────── */}
      <section className="section-night py-0">
        <div className="grid lg:grid-cols-[480px_1fr]">
          {/* Photo */}
          <div className="relative min-h-[300px] lg:min-h-auto overflow-hidden">
            <img
              src="/images/fih-bagages.jpg"
              alt="Hall réclamation bagages FIH"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'brightness(0.85) contrast(1.1) saturate(1.1)' }}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                (target.parentElement as HTMLElement).style.background = 'linear-gradient(135deg, #0D1B3E 0%, #003DA5 100%)';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-rdc-anthracite/70 hidden lg:block" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-black/50 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                Livraison bagages n°1 · FIH
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-yellow">Hall arrivées</p>
            </div>
            <h2 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
              Récupération des bagages
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Le hall de réclamation des bagages du Terminal International de FIH
              dispose de plusieurs bandes de livraison. Le numéro de votre bande
              est affiché sur les écrans dès votre arrivée dans le hall.
            </p>

            <div className="space-y-0 border-t border-white/10">
              {[
                { label: 'Bandes disponibles', value: '3 tapis de livraison' },
                { label: 'Délai moyen', value: '20 – 40 minutes' },
                { label: 'Bagage manquant', value: 'Comptoir compagnie — avant douanes' },
                { label: 'Ticket bagage', value: 'Gardez-le jusqu\'à la sortie' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-4 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/30">{item.label}</span>
                  <span className="text-sm font-semibold text-white text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJETS INTERDITS ───────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Forbidden in cabin */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <p className="eyebrow text-rdc-red">Objets interdits en cabine</p>
              </div>
              <h2 className="font-display font-bold text-rdc-anthracite text-2xl mb-6">
                Ce qui n'est pas autorisé
              </h2>

              <div className="space-y-0 border-t border-border">
                {FORBIDDEN_CABIN.map((item) => (
                  <div key={item.item} className="border-b border-border py-4 flex items-start gap-4">
                    <XCircle size={16} className="text-rdc-red shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-rdc-anthracite">{item.item}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Liquids */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="accent-line" />
                <p className="eyebrow text-amber-600">Règle des liquides</p>
              </div>
              <h2 className="font-display font-bold text-rdc-anthracite text-2xl mb-6">
                La règle des 100 ml
              </h2>

              {/* Visual 100ml */}
              <div className="mb-6 bg-amber-50 border border-amber-200 p-6 flex items-center gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-amber-400 text-white">
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold leading-none">100</p>
                    <p className="text-xs font-bold">ml</p>
                  </div>
                </div>
                <div>
                  <p className="font-display font-bold text-amber-900 text-lg">Par contenant</p>
                  <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                    Chaque récipient doit contenir<br />
                    au maximum <strong>100 ml ou 100 g</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-0 border-t border-border">
                {LIQUIDS_RULES.map((rule) => (
                  <div key={rule} className="border-b border-border py-4 flex items-start gap-3">
                    <CheckCircle size={15} className="text-rdc-green shrink-0 mt-0.5" />
                    <p className="text-sm text-rdc-anthracite">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="section-muted py-16 lg:py-20">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Questions fréquentes</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-10">
            FAQ Bagages
          </h2>
          <div className="bg-white border-t border-border">
            {FAQS.map((faq) => (
              <div key={faq.q} className="px-6">
                <FaqItem q={faq.q} a={faq.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LINKS ───────────────────────────────────────────────────── */}
      <section className="section-blue py-14">
        <div className="container">
          <div className="grid gap-0.5 bg-white/15 sm:grid-cols-3">
            {[
              { label: 'Quitter Kinshasa', desc: 'Guide complet départ — check-in et embarquement', href: '/guide/quitter-kinshasa' },
              { label: 'Atterrir à Kinshasa', desc: 'Guide arrivée — bagages, immigration, taxis', href: '/guide/atterrir-kinshasa' },
              { label: 'Compagnies aériennes', desc: 'Franchises exactes par compagnie', href: '/vols/compagnies-aeriennes' },
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
