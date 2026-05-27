import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Banknote, CreditCard, MapPin, Clock,
  AlertTriangle, CheckCircle, ArrowRight,
  ChevronRight, Smartphone, Info,
} from 'lucide-react';

export const Route = createFileRoute('/guide/services-bancaires')({
  component: ServicesBancairesPage,
  head: () => ({
    meta: [
      { title: "Services Bancaires & ATM — Aéroport N'djili · FIH" },
      { name: 'description', content: "ATM, bureaux de change et services bancaires à l'Aéroport International de N'djili (FIH). Rawbank, Equity BCDC, TMB, USD/CDF." },
    ],
  }),
});

const ATMS = [
  {
    bank: 'Equity BCDC',
    location: 'Terminal International — Hall Arrivées, après la douane DGDA',
    available: true,
    currencies: ['USD', 'CDF'],
    cards: 'Visa, Mastercard, UnionPay',
    limit: '500 USD / opération',
  },
  {
    bank: 'TMB',
    location: 'Terminal Domestique — Entrée principale, face au guichet information',
    available: true,
    currencies: ['USD', 'CDF'],
    cards: 'Visa, Mastercard',
    limit: '300 USD / opération',
  },
  {
    bank: 'Rawbank',
    location: 'Terminal International — Hall Départs, après l\'enregistrement',
    available: true,
    currencies: ['USD'],
    cards: 'Visa, Mastercard, AMEX',
    limit: '500 USD / opération',
  },
  {
    bank: 'BCDC',
    location: 'Parking P1 — Entrée principale',
    available: false,
    currencies: ['USD', 'CDF'],
    cards: 'Visa, Mastercard',
    limit: 'Hors service',
  },
] as const;

const EXCHANGE_BUREAUS = [
  {
    name: 'Bureau de change Rawbank',
    location: 'Terminal International — Hall Arrivées',
    hours: '6h00 – 22h00 · 7j/7',
    devises: ['USD', 'EUR', 'CDF', 'GBP'],
    note: 'Taux officiels affichés. Vérifiez avant d\'échanger.',
  },
  {
    name: 'Bureau de change Equity BCDC',
    location: 'Terminal International — Côté Départs',
    hours: '7h00 – 21h00 · 7j/7',
    devises: ['USD', 'EUR', 'CDF'],
    note: 'Commission variable selon les devises.',
  },
] as const;

const BANKING_TIPS = [
  {
    icon: Banknote,
    title: 'USD — la devise de référence',
    text: 'Le dollar américain est la monnaie de facto pour la plupart des transactions à Kinshasa. Prévoyez suffisamment de cash en USD avant votre arrivée ou retirez dès l\'aéroport.',
    level: 'important',
  },
  {
    icon: AlertTriangle,
    title: 'Qualité des billets USD',
    text: 'Les billets de 100 USD en parfait état sont préférés. Les billets abîmés, déchirés, tachés ou émis avant 2006 sont souvent refusés par les commerçants et les banques congolaises.',
    level: 'warning',
  },
  {
    icon: CreditCard,
    title: 'Cartes bancaires en RDC',
    text: 'Les paiements par carte sont acceptés dans les grands hôtels, certaines boutiques du terminal et les établissements internationaux. Hors de ces établissements, le cash reste indispensable.',
    level: 'info',
  },
  {
    icon: Smartphone,
    title: 'Mobile Money',
    text: 'Airtel Money, M-Pesa (Vodacom) et Orange Money sont largement utilisés par la population. Le stationnement FIH, les taxis agréés et certains services acceptent le Mobile Money.',
    level: 'info',
  },
  {
    icon: Banknote,
    title: 'Franc congolais (CDF)',
    text: 'Le franc congolais est la monnaie officielle de la RDC. Requis pour les transports en commun, les marchés locaux et certains services. Des ATM délivrent du CDF à FIH.',
    level: 'info',
  },
  {
    icon: AlertTriangle,
    title: 'Limites de retrait',
    text: 'Les distributeurs ATM à FIH ont des limites par transaction (300 à 500 USD). Si vous avez besoin de grosses sommes, planifiez plusieurs retraits ou utilisez un bureau de change.',
    level: 'warning',
  },
] as const;

const TIP_STYLE = {
  important: { border: 'border-[#003DA5]/20', bg: 'bg-[#003DA5]/5', icon: 'text-[#003DA5]' },
  warning:   { border: 'border-amber-200', bg: 'bg-amber-50', icon: 'text-amber-600' },
  info:      { border: 'border-[#e8e8e8]', bg: 'bg-white', icon: 'text-[#555]' },
};

function ServicesBancairesPage() {
  return (
    <main id="main-content">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Terminal International FIH — Services bancaires"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <nav className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={9} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'Aéroport</Link>
            <ChevronRight size={9} />
            <span className="text-white/80">Services bancaires</span>
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Guide de l'Aéroport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Services bancaires & ATM</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Guide</span>
        </div>
      </div>

      {/* ── Alerte USD ───────────────────────────────────────────────────── */}
      <div className="bg-[#FFCE00]">
        <div className="mx-auto max-w-5xl px-5 py-4">
          <div className="flex items-start gap-3">
            <Banknote size={15} className="mt-0.5 flex-shrink-0 text-[#1a1a1a]" />
            <p className="text-sm font-bold text-[#1a1a1a]">
              Le dollar américain (USD) est la devise principale en RDC. Prévoyez du cash — nombreux commerces à Kinshasa n'acceptent pas les cartes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* ATM */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Distributeurs</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Distributeurs ATM à FIH</h2>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-2">
            {ATMS.map((atm) => (
              <div
                key={atm.bank}
                className={`bg-white p-5 ${!atm.available ? 'opacity-55' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#003DA5]/10">
                      <CreditCard size={16} className="text-[#003DA5]" />
                    </div>
                    <p className="font-bold text-[#1a1a1a]">{atm.bank}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold border ${atm.available ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-[#f5f5f5] text-[#888] border-[#ddd]'}`}>
                    {atm.available ? 'Disponible' : 'Hors service'}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#555]">
                  <p className="flex items-start gap-2"><MapPin size={10} className="mt-0.5 flex-shrink-0 text-[#003DA5]" /> {atm.location}</p>
                  <p className="flex items-center gap-2"><Clock size={10} className="text-[#003DA5]" /> 24h/24 — 7j/7</p>
                  <p className="flex items-center gap-2"><CreditCard size={10} className="text-[#003DA5]" /> {atm.cards}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {atm.currencies.map((c) => (
                    <span key={c} className="px-2 py-0.5 text-[10px] font-bold bg-[#003DA5]/10 text-[#003DA5]">{c}</span>
                  ))}
                  <span className="px-2 py-0.5 text-[10px] bg-[#f5f5f5] text-[#666]">Plafond : {atm.limit}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bureaux de change */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Change de devises</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Bureaux de change</h2>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-2">
            {EXCHANGE_BUREAUS.map((b) => (
              <div key={b.name} className="bg-white p-5">
                <p className="font-bold text-[#1a1a1a] mb-3">{b.name}</p>
                <div className="space-y-2 text-xs text-[#555] mb-4">
                  <p className="flex items-start gap-2"><MapPin size={10} className="mt-0.5 flex-shrink-0 text-[#003DA5]" /> {b.location}</p>
                  <p className="flex items-center gap-2"><Clock size={10} className="text-[#003DA5]" /> {b.hours}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {b.devises.map((d) => (
                    <span key={d} className="px-2 py-0.5 text-[10px] font-bold bg-[#FFCE00]/20 text-[#8B6B00]">{d}</span>
                  ))}
                </div>
                <p className="text-[11px] text-[#777] italic">{b.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conseils */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Conseils pratiques</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Gérer votre argent en RDC</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {BANKING_TIPS.map(({ icon: Icon, title, text, level }) => {
              const s = TIP_STYLE[level];
              return (
                <div key={title} className={`border ${s.border} ${s.bg} p-5`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className={s.icon} />
                    <p className="font-semibold text-[#1a1a1a] text-sm">{title}</p>
                  </div>
                  <p className="text-xs text-[#555] leading-relaxed">{text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mobile Money */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Paiement mobile</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Mobile Money à FIH</h2>
          <p className="text-sm text-[#555] mb-6 max-w-xl">
            Le Mobile Money est le moyen de paiement principal pour des millions de Congolais.
            À FIH, il est accepté pour le stationnement, les taxis agréés RVA et certains commerces.
          </p>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-3">
            {[
              { name: 'Airtel Money', op: 'Airtel Congo', color: '#CC0000' },
              { name: 'M-Pesa', op: 'Vodacom Congo', color: '#D50000' },
              { name: 'Orange Money', op: 'Orange Congo', color: '#E05000' },
            ].map((mm) => (
              <div key={mm.name} className="bg-white p-5">
                <div className="h-1 w-10 mb-3" style={{ backgroundColor: mm.color }} />
                <p className="font-bold text-[#1a1a1a] mb-0.5">{mm.name}</p>
                <p className="text-xs text-[#555]">{mm.op}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <CheckCircle size={11} className="text-[#009A44]" />
                  <span className="text-[11px] text-[#444]">Accepté à FIH</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note finale */}
        <div className="bg-amber-50 border border-amber-200 p-5 flex items-start gap-3">
          <Info size={15} className="mt-0.5 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800 leading-relaxed">
            Pour les gros montants en USD, privilégiez les transactions dans les banques officielles.
            Évitez les cambistes informels à l'extérieur de l'aéroport — les risques d'escroquerie sont réels.
          </p>
        </div>

        {/* Liens utiles */}
        <div className="grid gap-px bg-[#003DA5] sm:grid-cols-2">
          {[
            { label: 'Change de devises', desc: 'Bureaux de change USD/CDF dans les terminaux', href: '/boutiques-restaurants/echange-devises' },
            { label: 'Atterrir à Kinshasa', desc: 'Procédures d\'arrivée — ATM et taxis officiels', href: '/guide/atterrir-kinshasa' },
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
