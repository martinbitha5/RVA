import { createFileRoute, Link } from '@tanstack/react-router';
import { MapPin, AlertTriangle, Car, Navigation, Construction, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/boulevard-lumumba')({
  component: BoulevardLumumbaPage,
  head: () => ({
    meta: [
      { title: "Boulevard Lumumba — Accès Aéroport FIH · Kinshasa" },
      { name: 'description', content: "Boulevard Lumumba : seule route d'accès entre Kinshasa centre et l'Aéroport International de N'djili FIH — trafic, conseils, distances et alternatives." },
    ],
  }),
});

const TRAJETS = [
  { depuis: 'Centre-ville (Gombe)',   km: '18 km', normal: '25–35 min', pointe: '50–75 min', via: 'Blvd du 30-Juin → Blvd Lumumba direct' },
  { depuis: 'Limete / Kingabwa',      km: '12 km', normal: '15–25 min', pointe: '35–55 min', via: 'Route de Matadi → Blvd Lumumba' },
  { depuis: 'Lemba / Mont-Ngafula',   km: '22 km', normal: '30–45 min', pointe: '60–90 min', via: 'Av. Kasa-Vubu → Blvd Lumumba' },
  { depuis: 'Kintambo / Ngiri-Ngiri', km: '20 km', normal: '30–40 min', pointe: '55–80 min', via: 'Route de Matadi → Blvd Lumumba' },
  { depuis: 'Ndjili / Kimbanseke',    km: '6 km',  normal: '10–15 min', pointe: '20–35 min', via: 'Blvd Lumumba local — direct' },
  { depuis: 'Masina / Nsele',         km: '8 km',  normal: '12–18 min', pointe: '25–40 min', via: 'Av. des Poids Lourds → Blvd Lumumba' },
];

const HORAIRES_TRAFIC = [
  { plage: '05h00 – 07h00', niveau: 'Fluide', couleur: 'bg-[#009A44]', note: 'Meilleur créneau pour rejoindre FIH' },
  { plage: '07h00 – 10h00', niveau: 'Saturé', couleur: 'bg-[#CE1126]', note: 'Heure de pointe matinale — éviter si possible' },
  { plage: '10h00 – 15h00', niveau: 'Modéré', couleur: 'bg-amber-500', note: 'Trafic acceptable, légère congestion pont' },
  { plage: '15h00 – 19h00', niveau: 'Saturé', couleur: 'bg-[#CE1126]', note: 'Heure de pointe du soir — très fort encombrement' },
  { plage: '19h00 – 22h00', niveau: 'Modéré', couleur: 'bg-amber-500', note: 'Trafic décroissant, encore chargé sur km 7–10' },
  { plage: '22h00 – 05h00', niveau: 'Fluide', couleur: 'bg-[#009A44]', note: 'Trafic minimal — sauf travaux nocturnes' },
];

function BoulevardLumumbaPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Boulevard Lumumba, axe d'accès à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Stationnement & Transport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Boulevard Lumumba</h1>
          <p className="mt-2 text-sm text-white/70">Seul axe routier reliant Kinshasa à l'Aéroport International de N'djili</p>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#CE1126] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Axe principal FIH — 22 km depuis Gombe
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Présentation */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">L'axe stratégique de Kinshasa</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Comprendre le Boulevard Lumumba</h2>
          <p className="text-sm text-[#555] leading-relaxed max-w-2xl mb-4">
            Le <strong>Boulevard du 30-Juin / Boulevard Patrice Lumumba</strong> est le seul et unique axe routier
            reliant le centre de Kinshasa (Gombe) à l'Aéroport International de N'djili (FIH), en traversant les
            communes de Limete, Kingabwa et Ndjili sur environ 22 km.
          </p>
          <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
            Cet axe supporte un trafic extrêmement dense, avec plusieurs goulots d'étranglement notables (pont
            de Limete, carrefour Kingabwa, km 7–10). En heure de pointe, le trajet peut facilement doubler ou
            tripler par rapport à la durée normale. <strong>Anticipez toujours largement votre temps de trajet pour un vol.</strong>
          </p>
        </section>

        {/* Alerte trafic */}
        <div className="flex items-start gap-4 bg-[#CE1126] p-5 text-white">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-base mb-1">Conseil crucial — Ne ratez pas votre vol</p>
            <p className="text-sm text-white/85 leading-relaxed">
              Pour un vol à <strong>10h00</strong>, quittez le centre-ville (Gombe) <strong>avant 07h30</strong> en période normale,
              et <strong>avant 07h00</strong> si vous voyagez en période scolaire ou les vendredis. Ajouter systématiquement
              60 minutes de marge pour les imprévus (panne, accident, contrôle de police).
            </p>
          </div>
        </div>

        {/* Adresse */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#003DA5]/10">
              <MapPin size={20} className="text-[#003DA5]" />
            </div>
            <div>
              <p className="font-bold text-[#1a1a1a] text-base">Adresse officielle — FIH</p>
              <p className="text-sm text-[#555] mt-0.5">Boulevard Lumumba, Commune de Nsele, Kinshasa, République Démocratique du Congo</p>
              <a
                href="https://maps.google.com/?q=-4.3857,15.4446"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#003DA5] hover:underline"
              >
                <Navigation size={12} /> Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Trafic par horaire */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Trafic indicatif</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Trafic par plage horaire</h2>
          <div className="space-y-2">
            {HORAIRES_TRAFIC.map((h) => (
              <div key={h.plage} className="flex items-center gap-4 border border-[#e8e8e8] bg-white px-5 py-4">
                <div className={`w-3 h-8 shrink-0 ${h.couleur}`} />
                <div className="w-32 shrink-0">
                  <p className="font-bold text-sm text-[#1a1a1a]">{h.plage}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#666]">{h.note}</p>
                </div>
                <span className={`px-3 py-1 text-[10px] font-bold text-white ${h.couleur}`}>{h.niveau}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#888]">
            Trafic indicatif en jours ouvrés normaux. Le trafic peut être plus intense les vendredis et jours de marché (samedi matin). Travaux nocturnes possibles km 7–10 (juin–juillet 2026).
          </p>
        </section>

        {/* Distances et temps */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Distances et durées</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Depuis les principaux quartiers de Kinshasa</h2>
          <div className="overflow-x-auto border border-[#e8e8e8]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#003DA5] text-white">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider">Depuis</th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider">Distance</th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider">Hors pointe</th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider">Heure de pointe</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider hidden lg:table-cell">Itinéraire</th>
                </tr>
              </thead>
              <tbody>
                {TRAJETS.map((t, i) => (
                  <tr key={t.depuis} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'}>
                    <td className="px-5 py-3 flex items-center gap-2">
                      <Car size={12} className="text-[#888] shrink-0" />
                      <span className="font-medium text-[#1a1a1a]">{t.depuis}</span>
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-[#1a1a1a]">{t.km}</td>
                    <td className="px-5 py-3 text-center font-semibold text-[#009A44]">{t.normal}</td>
                    <td className="px-5 py-3 text-center font-semibold text-[#CE1126]">{t.pointe}</td>
                    <td className="px-5 py-3 text-xs text-[#888] hidden lg:table-cell">{t.via}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-[#888]">Durées estimatives. Les conditions réelles peuvent varier selon l'heure, la météo et les événements à Kinshasa.</p>
        </section>

        {/* Goulots d'étranglement */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Points noirs</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Goulots d'étranglement à anticiper</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                point: 'Pont de Limete',
                desc: 'Premier goulot majeur sur la route vers FIH. Souvent saturé dès 07h15. Passage inévitable — aucune alternative.',
                km: 'km 6 depuis Gombe',
              },
              {
                point: 'Carrefour Kingabwa',
                desc: 'Intersection complexe à plusieurs voies, souvent bloquée par les véhicules de transport en commun (bus Transco, taxis-bus).',
                km: 'km 10 depuis Gombe',
              },
              {
                point: 'Entrée Zone Aéroportuaire',
                desc: 'Le dernier km avant FIH peut être congestionné lors des grands vols (départ Brussels Airlines, Air France en soirée). Réservez des places.',
                km: 'km 22 depuis Gombe',
              },
            ].map((g) => (
              <div key={g.point} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} className="text-amber-600" />
                  <h3 className="font-bold text-sm text-[#1a1a1a]">{g.point}</h3>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-3">{g.desc}</p>
                <p className="text-[10px] font-bold text-[#888]">{g.km}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travaux */}
        <div className="flex items-start gap-4 border border-amber-200 bg-amber-50 p-5">
          <Construction size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Travaux km 7–10 — Juin & Juillet 2026</p>
            <p className="text-xs text-amber-700 leading-relaxed mb-3">
              Des travaux de réfection du revêtement sont planifiés sur le tronçon km 7 à km 10 du Boulevard Lumumba.
              Circulation alternée prévue les nuits de semaine de 22h00 à 05h00. Prévoir 15 à 25 minutes supplémentaires.
            </p>
            <Link to={'/stationnement-transport/travaux' as never} className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:underline">
              Détail des travaux <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Conseils pratiques */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Conseils pratiques</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Bien préparer son trajet</h2>
          <ul className="space-y-3 text-sm text-[#555]">
            {[
              'Partez toujours avec au moins 2h30 d\'avance pour les vols internationaux (3h30 recommandé aux heures de pointe).',
              'Les vols domestiques (Lubumbashi, Goma, Kisangani) : partez avec 1h30 minimum depuis Gombe.',
              'Utilisez l\'application Waze ou Google Maps — les conditions de trafic kinois y sont bien renseignées.',
              'Évitez le vendredi soir et les jours de match de football (TP Mazembe, Vita Club) — trafic exceptionnel.',
              'Les taxis officiels RVA connaissent bien l\'axe — ils peuvent parfois éviter les bouchons secondaires.',
              'En cas d\'urgence absolue, informez immédiatement la compagnie aérienne et les agents au sol de FIH.',
            ].map((c) => (
              <li key={c} className="flex items-start gap-2.5">
                <span className="text-[#003DA5] font-bold mt-0.5 shrink-0">→</span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Liens */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to={'/stationnement-transport/taxis' as never} className="group flex items-center gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/30 transition-all">
            <Car size={20} className="text-[#FFCE00] shrink-0" />
            <div>
              <p className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors">Taxis officiels agréés</p>
              <p className="text-xs text-[#888]">Tarifs réglementés RVA — conducteurs formés</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-[#ccc]" />
          </Link>
          <Link to={'/stationnement-transport/travaux' as never} className="group flex items-center gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/30 transition-all">
            <Construction size={20} className="text-amber-500 shrink-0" />
            <div>
              <p className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors">Avis de travaux FIH</p>
              <p className="text-xs text-[#888]">Perturbations en cours et planifiées</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-[#ccc]" />
          </Link>
        </div>

      </div>
    </main>
  );
}
