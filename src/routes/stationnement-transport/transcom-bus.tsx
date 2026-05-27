import { createFileRoute } from '@tanstack/react-router';
import { Clock, DollarSign, MapPin, ArrowRight, Bus, Info } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/transcom-bus')({
  component: TranscomBusPage,
  head: () => ({
    meta: [
      { title: "Bus Transco depuis Kinshasa — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Prenez le bus Transco depuis le centre de Kinshasa jusqu'à l'Aéroport de N'djili. Lignes, horaires, tarifs et points d'arrêt." },
    ],
  }),
});

const LINES = [
  {
    code: 'L1',
    name: 'Gare Centrale → FIH',
    color: '#003DA5',
    freq: 'Toutes les 30 min',
    fare: '1 USD',
    duration: '≈ 45 – 75 min',
    firstBus: '04h30',
    lastBus: '21h00',
    stops: [
      { name: 'Gare Centrale', terminal: true },
      { name: 'Limete Industriel' },
      { name: 'Kingabwa' },
      { name: 'Masina Marché' },
      { name: 'N\'djili Benseke' },
      { name: 'Aéroport FIH', terminal: true },
    ],
  },
  {
    code: 'L2',
    name: 'Victoire → FIH',
    color: '#009A44',
    freq: 'Toutes les 45 min',
    fare: '1.50 USD',
    duration: '≈ 60 – 90 min',
    firstBus: '05h00',
    lastBus: '20h30',
    stops: [
      { name: 'Victoire / Kintambo', terminal: true },
      { name: 'Binza Météo' },
      { name: 'Lemba Terminus' },
      { name: 'Camp Luka' },
      { name: 'Masina' },
      { name: 'Aéroport FIH', terminal: true },
    ],
  },
  {
    code: 'L3',
    name: 'Ngaba / Selembao → FIH',
    color: '#CE1126',
    freq: 'Toutes les 60 min',
    fare: '2 USD',
    duration: '≈ 70 – 100 min',
    firstBus: '05h30',
    lastBus: '20h00',
    stops: [
      { name: 'Ngaba Terminus', terminal: true },
      { name: 'Selembao' },
      { name: 'Makala' },
      { name: 'Kingabwa' },
      { name: 'N\'djili' },
      { name: 'Aéroport FIH', terminal: true },
    ],
  },
];

const INFOS = [
  {
    Icon: MapPin,
    title: 'Arrêt à l\'aéroport',
    desc: 'Le terminal bus est situé à l\'entrée du parking P1, à 200 mètres de la sortie du Terminal International. Des chariots à bagages sont disponibles sur le trajet.',
  },
  {
    Icon: DollarSign,
    title: 'Paiement à bord',
    desc: 'Le tarif est payable directement au receveur à bord, en USD ou en CDF au taux du jour. Pas de réservation nécessaire — service sans billet.',
  },
  {
    Icon: Clock,
    title: 'Fréquence & ponctualité',
    desc: 'Les fréquences indiquées sont celles hors heures de pointe. En semaine entre 07h00 et 09h30, et entre 16h30 et 19h30, les délais peuvent doubler sur le Boulevard Lumumba.',
  },
  {
    Icon: Bus,
    title: 'Esprit de Vie / Transco',
    desc: 'Les lignes sont opérées conjointement par Transco (bus bleus officiels) et la société Esprit de Vie. Les deux opérateurs utilisent le même arrêt à FIH.',
  },
];

function StopDot({ terminal }: { terminal?: boolean }) {
  return (
    <div className={`h-3 w-3 rounded-full border-2 shrink-0 ${terminal ? 'border-current bg-current' : 'border-current bg-white'}`} />
  );
}

function TranscomBusPage() {
  return (
    <main id="main-content">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Bus Transco Kinshasa — Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">
            Stationnement &amp; Transport
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Bus Transco depuis Kinshasa
          </h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Transport en commun
          </span>
        </div>
      </div>

      {/* ── Bandeau intro ─────────────────────────────────────────── */}
      <div className="bg-[#003DA5]">
        <div className="mx-auto max-w-5xl px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
          <div className="flex items-center gap-3 shrink-0">
            <Bus size={22} className="text-[#FFCE00]" />
            <span className="font-bold text-white text-sm">Service Transco · Esprit de Vie</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            La solution la plus économique pour rejoindre ou quitter l'Aéroport de N'djili depuis plusieurs quartiers de Kinshasa — à partir de <strong className="text-white">1 USD</strong> le trajet.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-16">

        {/* ── Lignes ────────────────────────────────────────────── */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Lignes desservies
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            Au départ de Kinshasa vers FIH
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {LINES.map((line) => (
              <div key={line.code} className="border border-[#e8e8e8] bg-white overflow-hidden">

                {/* En-tête ligne */}
                <div className="px-5 py-4" style={{ backgroundColor: line.color }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                      Ligne {line.code}
                    </span>
                    <span className="bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                      {line.fare}
                    </span>
                  </div>
                  <p className="font-bold text-white text-sm leading-snug">{line.name}</p>
                </div>

                {/* Infos rapides */}
                <div className="grid grid-cols-3 divide-x divide-[#e8e8e8] border-b border-[#e8e8e8] text-center">
                  <div className="py-3 px-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5">Fréquence</p>
                    <p className="text-xs font-bold text-[#1a1a1a] leading-tight">{line.freq.replace('Toutes les ', '')}</p>
                  </div>
                  <div className="py-3 px-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5">Durée</p>
                    <p className="text-xs font-bold text-[#1a1a1a] leading-tight">{line.duration}</p>
                  </div>
                  <div className="py-3 px-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#999] mb-0.5">Dernier bus</p>
                    <p className="text-xs font-bold text-[#1a1a1a] leading-tight">{line.lastBus}</p>
                  </div>
                </div>

                {/* Arrêts — timeline verticale */}
                <div className="p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#999] mb-4">Arrêts</p>
                  <div className="relative pl-4">
                    {/* Ligne verticale */}
                    <div
                      className="absolute left-[5px] top-1.5 bottom-1.5 w-px"
                      style={{ backgroundColor: line.color + '40' }}
                    />
                    <div className="space-y-3">
                      {line.stops.map((stop, i) => (
                        <div key={stop.name} className="flex items-center gap-3">
                          <div
                            className="relative z-10 shrink-0"
                            style={{ color: line.color }}
                          >
                            <StopDot terminal={stop.terminal} />
                          </div>
                          <span
                            className={`text-xs leading-tight ${
                              stop.terminal
                                ? 'font-bold text-[#1a1a1a]'
                                : 'text-[#666]'
                            } ${i === line.stops.length - 1 ? 'text-[#003DA5] font-bold' : ''}`}
                          >
                            {stop.name}
                            {i === line.stops.length - 1 && (
                              <span className="ml-1.5 text-[9px] font-black uppercase tracking-wide text-[#003DA5]/60">
                                · FIH
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Premier / dernier bus */}
                  <div className="mt-5 pt-4 border-t border-[#e8e8e8] flex justify-between text-[10px] text-[#999]">
                    <span>Premier bus : <strong className="text-[#1a1a1a]">{line.firstBus}</strong></span>
                    <span>Dernier bus : <strong className="text-[#1a1a1a]">{line.lastBus}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Informations pratiques ────────────────────────────── */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Informations pratiques
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            Tout savoir avant de prendre le bus
          </h2>
          <div className="grid gap-px bg-[#e8e8e8] sm:grid-cols-2 border border-[#e8e8e8]">
            {INFOS.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#003DA5]/8">
                    <Icon size={16} className="text-[#003DA5]" />
                  </div>
                  <p className="font-bold text-[#1a1a1a] text-sm">{title}</p>
                </div>
                <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Note circulation ──────────────────────────────────── */}
        <section className="bg-[#1a1a1a] p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex h-10 w-10 items-center justify-center bg-[#FFCE00]">
              <Info size={18} className="text-[#1a1a1a]" />
            </div>
            <div>
              <p className="font-bold text-white text-base mb-2">
                Boulevard Lumumba — Prévoyez large
              </p>
              <p className="text-sm text-white/65 leading-relaxed mb-4">
                Le Boulevard Lumumba est l'axe unique reliant le centre-ville de Kinshasa à l'aéroport. En heure de pointe, le trajet peut dépasser 1h30. <strong className="text-white">Nous recommandons d'arriver à l'arrêt de bus au moins 3h avant le départ de votre vol</strong> pour les liaisons du matin et du soir.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
                {[
                  { period: '04h30 – 06h30', label: 'Fluide' },
                  { period: '07h00 – 09h30', label: 'Dense' },
                  { period: '10h00 – 16h00', label: 'Normal' },
                  { period: '16h30 – 19h30', label: 'Très dense' },
                ].map(({ period, label }) => (
                  <div key={period} className="bg-white/8 p-3">
                    <p className="text-[10px] font-bold text-white/50 mb-1">{period}</p>
                    <div className="flex items-center justify-center gap-1.5">
                      <ArrowRight size={10} className="text-[#FFCE00]" />
                      <p className="text-xs font-bold text-white">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
