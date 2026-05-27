import { createFileRoute } from '@tanstack/react-router';
import {
  AlertTriangle, Shield, Phone, MapPin,
  CheckCircle, Car, ArrowRight, Clock,
} from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/taxis')({
  component: TaxisPage,
  head: () => ({
    meta: [
      { title: "Taxis officiels agréés RVA — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Prenez uniquement les taxis officiels agréés par la RVA à l'Aéroport de N'djili. Tarifs, opérateurs et conseils de sécurité." },
    ],
  }),
});

const OPERATORS = [
  {
    name: 'Taxi RVA Officiel',
    phone: '+243 81 XXX XXXX',
    zone: 'Zone dépose — Terminal International',
    available: '24h/24 · 7j/7',
    color: '#003DA5',
  },
  {
    name: 'Kinatrans',
    phone: '+243 89 XXX XXXX',
    zone: 'Zone dépose — Terminaux T1 & T2',
    available: '05h00 – 23h00',
    color: '#009A44',
  },
  {
    name: 'City Cab Kinshasa',
    phone: '+243 97 XXX XXXX',
    zone: 'Zone dépose — Terminal Domestique',
    available: '06h00 – 22h00',
    color: '#CE1126',
  },
];

const TARIFFS = [
  { destination: 'FIH → Gombe (Centre-ville)',  price: '15 – 25 USD', km: '≈ 22 km' },
  { destination: 'FIH → Limete',                price: '10 – 15 USD', km: '≈ 14 km' },
  { destination: 'FIH → Kintambo / Ngaliema',   price: '20 – 30 USD', km: '≈ 28 km' },
  { destination: 'FIH → Lemba / Kalamu',         price: '12 – 18 USD', km: '≈ 16 km' },
  { destination: 'FIH → Ngaba / Selembao',       price: '18 – 28 USD', km: '≈ 25 km' },
  { destination: 'FIH → Kingabwa / Barumbu',     price: '10 – 14 USD', km: '≈ 12 km' },
];

const HOW_ITEMS = [
  { step: '01', title: 'Sortez du terminal', desc: 'À la sortie des arrivées, suivez les panneaux bleus « Taxis agréés RVA ».' },
  { step: '02', title: 'Identifiez le badge', desc: 'Chaque taxi officiel affiche un autocollant holographique RVA sur le pare-brise.' },
  { step: '03', title: 'Négociez avant de monter', desc: 'Convenez du prix en USD avant de démarrer. Aucun supplément légal au-delà du tarif affiché.' },
  { step: '04', title: 'Gardez votre reçu', desc: 'En cas de problème, le numéro de licence imprimé sur le reçu permet de déposer une plainte.' },
];

const TIPS = [
  'Ne montez jamais dans un taxi qui vous accoste à l\'intérieur du terminal.',
  'Évitez de voyager seul la nuit sur le Boulevard Lumumba après 22h.',
  'Payez toujours en USD — le taux de change en CDF doit être convenu à l\'avance.',
  'Les taxis officiels n\'ont pas le droit de prendre d\'autres passagers en route.',
  'En cas de litige, appelez directement la cellule taxi de la RVA.',
];

function TaxisPage() {
  return (
    <main id="main-content">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Zone taxis officiels — Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">
            Stationnement &amp; Transport
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Taxis officiels agréés RVA
          </h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Transport
          </span>
        </div>
      </div>

      {/* ── Alerte taxis non agréés ────────────────────────────── */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-5xl px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="font-bold text-amber-900 text-sm">
                Attention aux taxis non officiels
              </p>
              <p className="mt-0.5 text-xs text-amber-800 leading-relaxed">
                De nombreux chauffeurs non agréés opèrent aux abords de l'aéroport. Ils peuvent pratiquer des tarifs abusifs ou présenter des risques de sécurité. Utilisez uniquement les taxis portant le badge holographique <strong>RVA agréé</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-16">

        {/* ── Comment identifier un taxi officiel ───────────────── */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Identification
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            Comment reconnaître un taxi officiel&nbsp;?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Badge holographique', desc: 'Autocollant RVA sur le pare-brise avant, avec numéro de licence unique.' },
              { icon: Car,    title: 'Plaque d\'immatriculation verte', desc: 'Les taxis agréés affichent une plaque verte avec le code province KN.' },
              { icon: CheckCircle, title: 'Comptoir officiel', desc: 'Ils stationnent exclusivement dans la zone délimitée par des barrières bleues à la sortie des arrivées.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 border border-[#e8e8e8] bg-white p-5">
                <div className="shrink-0 flex h-10 w-10 items-center justify-center bg-[#003DA5]/8">
                  <Icon size={18} className="text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm mb-1">{title}</p>
                  <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Opérateurs agréés ─────────────────────────────────── */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Opérateurs
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            Nos partenaires officiels
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {OPERATORS.map((op) => (
              <div key={op.name} className="border border-[#e8e8e8] bg-white overflow-hidden">
                {/* Bande couleur */}
                <div className="h-1.5" style={{ backgroundColor: op.color }} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <p className="font-bold text-[#1a1a1a] text-base">{op.name}</p>
                    <span className="shrink-0 flex items-center gap-1 bg-[#009A44]/10 px-2 py-0.5 text-[10px] font-bold text-[#009A44] uppercase tracking-wide">
                      <Shield size={8} /> Agréé
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-[#555]">
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="shrink-0 text-[#003DA5]" />
                      <a href={`tel:${op.phone}`} className="hover:text-[#003DA5] transition-colors font-medium">
                        {op.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={12} className="shrink-0 mt-0.5 text-[#003DA5]" />
                      <span>{op.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="shrink-0 text-[#003DA5]" />
                      <span>{op.available}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comment ça marche ─────────────────────────────────── */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Étapes
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            Comment prendre votre taxi
          </h2>
          <div className="grid gap-px bg-[#e8e8e8] sm:grid-cols-2 lg:grid-cols-4 border border-[#e8e8e8]">
            {HOW_ITEMS.map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-6">
                <p className="text-4xl font-black text-[#003DA5]/12 mb-3 leading-none">{step}</p>
                <p className="font-bold text-[#1a1a1a] text-sm mb-2">{title}</p>
                <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tarifs indicatifs ─────────────────────────────────── */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Tarification
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
            Tarifs indicatifs depuis FIH
          </h2>
          <p className="text-sm text-[#666] mb-8">
            Tarifs en dollars américains (USD). Les prix peuvent varier selon le trafic sur le Boulevard Lumumba, l'heure et le nombre de bagages.
          </p>
          <div className="border border-[#e8e8e8] overflow-hidden">
            <div className="grid grid-cols-3 bg-[#003DA5] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
              <span className="col-span-1">Destination</span>
              <span className="text-center">Distance</span>
              <span className="text-right">Prix indicatif</span>
            </div>
            {TARIFFS.map((t, i) => (
              <div
                key={t.destination}
                className={`grid grid-cols-3 items-center px-5 py-3.5 border-t border-[#e8e8e8] text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}`}
              >
                <span className="text-[#1a1a1a] font-medium col-span-1 text-xs sm:text-sm">{t.destination}</span>
                <span className="text-center text-xs text-[#888]">{t.km}</span>
                <span className="text-right font-bold text-[#003DA5]">{t.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#999]">
            * Ces tarifs sont fournis à titre indicatif. Convenez toujours du prix avant de monter dans le véhicule.
          </p>
        </section>

        {/* ── Conseils de sécurité ──────────────────────────────── */}
        <section className="bg-[#1a1a1a] p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
            Sécurité
          </p>
          <h2 className="text-xl font-bold text-white mb-6">
            Conseils pour voyager en toute sérénité
          </h2>
          <div className="space-y-3">
            {TIPS.map((tip) => (
              <div key={tip} className="flex items-start gap-3">
                <ArrowRight size={13} className="shrink-0 mt-0.5 text-[#FFCE00]" />
                <p className="text-sm text-white/70 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/40 mb-0.5">Cellule taxi RVA · Signalement</p>
              <p className="font-bold text-white">+243 81 XXX XXXX</p>
            </div>
            <a
              href="tel:+243810000000"
              className="flex items-center gap-2 bg-[#003DA5] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#002a7a] transition-colors"
            >
              <Phone size={13} /> Appeler
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
