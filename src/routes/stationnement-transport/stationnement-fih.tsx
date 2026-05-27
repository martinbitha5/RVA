import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Car, Bus, Shield, Zap, MapPin,
  CheckCircle, CreditCard, ArrowRight, Accessibility,
} from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/stationnement-fih')({
  component: StationnementFihPage,
  head: () => ({
    meta: [
      { title: "Stationnement Officiel FIH — Aéroport N'djili" },
      { name: 'description', content: "Parkings officiels RVA à l'Aéroport International de N'djili (FIH) — tarifs en USD, réservation en ligne, Mobile Money accepté." },
    ],
  }),
});

const LOTS = [
  {
    code: 'P1',
    nom: 'Parking Court Séjour',
    soustitre: 'Terminal International',
    description: 'Parking officiel RVA situé à 200 m du terminal international. Idéal pour les dépose-minute, courtes durées et récupération de passagers. Accès direct au hall arrivées.',
    spots: 320,
    disponibles: 280,
    distance: '200 m à pied',
    navette: false,
    couvert: false,
    pmr: 15,
    ev: false,
    securite: 'CCTV 24h/24',
    tarif_horaire: 2,
    tarif_journalier: 15,
    tarif_hebdo: 80,
    badge: null,
  },
  {
    code: 'P2',
    nom: 'Parking Long Séjour',
    soustitre: 'Boulevard Lumumba',
    description: 'Grand parking extérieur sécurisé sur le Boulevard Lumumba. Tarifs dégressifs pour séjours longs. Navette gratuite vers les terminaux toutes les 15 minutes.',
    spots: 480,
    disponibles: 350,
    distance: '600 m (navette)',
    navette: true,
    couvert: false,
    pmr: 20,
    ev: false,
    securite: 'CCTV 24h/24',
    tarif_horaire: 1,
    tarif_journalier: 10,
    tarif_hebdo: 55,
    badge: 'Économique',
  },
  {
    code: 'P3',
    nom: 'Parking Premium Couvert',
    soustitre: 'Terminal VIP',
    description: 'Parking couvert avec surveillance premium 24h/24. Protection optimale de votre véhicule contre les intempéries. Bornes de recharge pour véhicules électriques.',
    spots: 60,
    disponibles: 48,
    distance: '100 m à pied',
    navette: false,
    couvert: true,
    pmr: 6,
    ev: true,
    securite: 'Sécurité premium',
    tarif_horaire: 3,
    tarif_journalier: 22,
    tarif_hebdo: 110,
    badge: 'Premium',
  },
];

const FEATURES = [
  { icon: Shield, label: 'Sécurité 24h/24', desc: 'Agents RVA et caméras CCTV sur tous les parkings' },
  { icon: CreditCard, label: 'Mobile Money', desc: 'Airtel Money, M-Pesa, Orange Money acceptés aux caisses' },
  { icon: Car, label: 'Tarifs réglementés', desc: 'Prix officiels RVA — aucun frais caché' },
  { icon: Accessibility, label: 'Accès PMR', desc: 'Places réservées PMR sur chaque parking, rampes d\'accès' },
];

function StationnementFihPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Parking officiel à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Stationnement & Transport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Stationnement Officiel FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            3 parkings · Tarifs en USD
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Avantages rapides */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="border border-[#e8e8e8] bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center bg-[#003DA5]/10 mb-3">
                <Icon size={18} className="text-[#003DA5]" />
              </div>
              <p className="font-bold text-sm text-[#1a1a1a] mb-1">{label}</p>
              <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>

        {/* Parkings détaillés */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Disponibilité en temps réel</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Les parkings disponibles</h2>
          <div className="space-y-5">
            {LOTS.map((lot) => (
              <div key={lot.code} className="border border-[#e8e8e8] bg-white overflow-hidden">
                {/* Code parking + badge */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f0f0f0] bg-[#f7f7f7]">
                  <span className="text-3xl font-bold text-[#003DA5]/20">{lot.code}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1a1a1a]">{lot.nom}</h3>
                    <p className="text-xs text-[#888]">{lot.soustitre}</p>
                  </div>
                  {lot.badge && (
                    <span className="bg-[#FFCE00] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]">
                      {lot.badge}
                    </span>
                  )}
                  <div className="text-right">
                    <p className="text-xs text-[#888]">{lot.disponibles}/{lot.spots} places</p>
                    <div className="mt-1 h-1.5 w-24 bg-[#e8e8e8]">
                      <div
                        className="h-1.5 bg-[#009A44]"
                        style={{ width: `${(lot.disponibles / lot.spots) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-0">
                  {/* Description + caractéristiques */}
                  <div className="sm:col-span-2 p-6 border-b sm:border-b-0 sm:border-r border-[#f0f0f0]">
                    <p className="text-sm text-[#555] leading-relaxed mb-4">{lot.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="flex items-center gap-1.5 text-xs text-[#777]">
                        <MapPin size={11} className="text-[#003DA5]" /> {lot.distance}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-[#777]">
                        <Shield size={11} className="text-[#009A44]" /> {lot.securite}
                      </p>
                      {lot.navette && (
                        <p className="flex items-center gap-1.5 text-xs text-[#777]">
                          <Bus size={11} className="text-[#003DA5]" /> Navette gratuite / 15 min
                        </p>
                      )}
                      {lot.couvert && (
                        <p className="flex items-center gap-1.5 text-xs text-[#777]">
                          <Car size={11} className="text-[#003DA5]" /> Parking couvert
                        </p>
                      )}
                      {lot.ev && (
                        <p className="flex items-center gap-1.5 text-xs text-[#777]">
                          <Zap size={11} className="text-[#FFCE00]" /> Bornes de recharge EV
                        </p>
                      )}
                      <p className="flex items-center gap-1.5 text-xs text-[#777]">
                        <Accessibility size={11} className="text-[#003DA5]" /> {lot.pmr} places PMR
                      </p>
                    </div>
                  </div>

                  {/* Prix + CTA */}
                  <div className="p-6 bg-[#1a1a1a] text-white flex flex-col gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Horaire</span>
                        <span className="font-bold">{lot.tarif_horaire} $/h</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Journalier</span>
                        <span className="font-bold">{lot.tarif_journalier} $/j</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-white/15 pt-2">
                        <span className="text-white/60">Hebdomadaire</span>
                        <span className="font-bold">{lot.tarif_hebdo} $/sem</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-white/40 bg-white/5 px-2 py-1.5 text-center">
                      −15 % en réservant en ligne
                    </div>
                    <Link
                      to={'/stationnement-transport/formulaire' as never}
                      className="block text-center bg-[#003DA5] hover:bg-[#002a7a] transition-colors py-2.5 text-sm font-bold text-white"
                    >
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tableau tarifaire synthèse */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Tarification officielle</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Grille tarifaire RVA</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#e8e8e8]">
              <thead>
                <tr className="bg-[#003DA5] text-white">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider">Parking</th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider">Horaire</th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider">Journalier</th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider">Hebdomadaire</th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider">Places PMR</th>
                </tr>
              </thead>
              <tbody>
                {LOTS.map((lot, i) => (
                  <tr key={lot.code} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'}>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-[#1a1a1a]">{lot.code} — {lot.nom}</p>
                      <p className="text-xs text-[#888]">{lot.spots} places totales</p>
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-[#003DA5]">{lot.tarif_horaire} $</td>
                    <td className="px-5 py-3 text-center font-bold text-[#003DA5]">{lot.tarif_journalier} $</td>
                    <td className="px-5 py-3 text-center font-bold text-[#003DA5]">{lot.tarif_hebdo} $</td>
                    <td className="px-5 py-3 text-center text-[#888]">{lot.pmr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-[#888]">
            * Tarifs en USD. Équivalent CDF disponible aux caisses selon le taux du jour BCC.
            Mobile Money accepté (Airtel, M-Pesa, Orange).
          </p>
        </section>

        {/* Comment réserver */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Réservation</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Comment réserver votre place ?</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { num: '01', titre: 'Choisir les dates', desc: 'Sélectionnez votre date et heure d\'arrivée et de départ.' },
              { num: '02', titre: 'Choisir le parking', desc: 'Comparez P1, P2, P3 selon tarif, distance et équipements.' },
              { num: '03', titre: 'Vos informations', desc: 'Immatriculation du véhicule, coordonnées de contact.' },
              { num: '04', titre: 'Paiement & Confirmation', desc: 'USD, carte bancaire ou Mobile Money. QR code envoyé par SMS.' },
            ].map((e) => (
              <div key={e.num} className="text-center">
                <div className="flex h-10 w-10 items-center justify-center bg-[#003DA5] text-white font-bold text-sm mx-auto mb-3">
                  {e.num}
                </div>
                <p className="font-bold text-sm text-[#1a1a1a] mb-1">{e.titre}</p>
                <p className="text-xs text-[#666] leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to={'/stationnement-transport/formulaire' as never} className="inline-flex items-center gap-2 bg-[#003DA5] px-6 py-3 text-sm font-bold text-white hover:bg-[#002a7a] transition-colors">
              <CheckCircle size={14} /> Réserver maintenant
            </Link>
          </div>
        </section>

        {/* Liens connexes */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to={'/stationnement-transport/offres' as never} className="group flex items-center gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/30 transition-all">
            <CreditCard size={20} className="text-[#003DA5] shrink-0" />
            <div>
              <p className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors">Offres & Abonnements</p>
              <p className="text-xs text-[#888]">Réductions longue durée et abonnements mensuels</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-[#888] group-hover:text-[#003DA5] transition-colors" />
          </Link>
          <Link to={'/stationnement-transport/mobilite-reduite' as never} className="group flex items-center gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/30 transition-all">
            <Accessibility size={20} className="text-[#009A44] shrink-0" />
            <div>
              <p className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors">Mobilité Réduite</p>
              <p className="text-xs text-[#888]">Assistance PMR et places adaptées</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-[#888] group-hover:text-[#003DA5] transition-colors" />
          </Link>
        </div>

      </div>
    </main>
  );
}
