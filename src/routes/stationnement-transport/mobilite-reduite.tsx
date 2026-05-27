import { createFileRoute } from '@tanstack/react-router';
import { Accessibility, Phone, Car, Heart, CheckCircle, MapPin, Clock, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/mobilite-reduite')({
  component: MobiliteReduitePage,
  head: () => ({
    meta: [
      { title: "Mobilité Réduite & PMR — Aéroport N'djili · FIH" },
      { name: 'description', content: "Services d'assistance aux personnes à mobilité réduite (PMR) à l'Aéroport International de N'djili FIH — places adaptées, fauteuils roulants, aide à bord." },
    ],
  }),
});

const SERVICES_PMR = [
  {
    icon: Car,
    titre: 'Places de stationnement PMR',
    desc: 'Des places réservées aux personnes à mobilité réduite sont disponibles sur chaque parking de FIH, identifiées par le pictogramme international.',
    details: [
      'P1 Court Séjour : 15 places PMR (gratuit)',
      'P2 Long Séjour : 20 places PMR (gratuit)',
      'P3 Premium : 6 places PMR (gratuit)',
      'Zones situées à proximité des entrées adaptées',
    ],
    couleur: '#003DA5',
  },
  {
    icon: Accessibility,
    titre: 'Assistance à l\'embarquement',
    desc: 'Le personnel RVA et les agents des compagnies aériennes assurent l\'assistance complète depuis l\'arrivée à FIH jusqu\'à votre siège à bord de l\'avion.',
    details: [
      'Fauteuils roulants disponibles à tous les terminaux',
      'Assistance au contrôle de sécurité et à l\'immigration',
      'Aide pour le chargement des bagages en soute',
      'Embarquement prioritaire pour tous les vols',
    ],
    couleur: '#009A44',
  },
  {
    icon: Heart,
    titre: 'Services médicaux sur place',
    desc: 'FIH dispose d\'un centre médical et d\'infirmiers formés à la prise en charge des personnes à besoins spécifiques, disponibles 24h/24.',
    details: [
      'Centre médical ouvert 24h/24, 7j/7',
      'Infirmiers et secouristes permanents',
      'Défibrillateurs dans les deux terminaux',
      'Coordination avec les services médicaux des compagnies',
    ],
    couleur: '#CE1126',
  },
  {
    icon: Phone,
    titre: 'Contact et demande d\'assistance',
    desc: 'Pour garantir une assistance optimale, il est fortement recommandé de signaler vos besoins à votre compagnie aérienne au moins 48h avant le vol.',
    details: [
      'Signalement à la compagnie aérienne : 48h avant',
      'Assistance RVA sur place : arrivée 2h avant le vol',
      'Standard FIH PMR : +243 81 PMR XXXX',
      'Email : pmr@fih-rva.com',
    ],
    couleur: '#003DA5',
  },
];

const ACCES_ADAPTES = [
  { zone: 'Entrée principale T1', equipements: 'Rampe d\'accès, portes automatiques larges, sol anti-dérapant' },
  { zone: 'Hall Arrivées T1', equipements: 'Ascenseur accessible, signalétique en Braille, guidage audio' },
  { zone: 'Contrôle de sécurité', equipements: 'Voie PMR dédiée, portique adapté, assistance personnelle garantie' },
  { zone: 'Salles d\'attente', equipements: 'Sièges PMR réservés, prises USB accessibles, toilettes adaptées' },
  { zone: 'Terminal Domestique', equipements: 'Rampe accès, ascenseur, places réservées salle d\'attente' },
  { zone: 'Parkings P1, P2, P3', equipements: 'Revêtement adapté, marquage clair, accès de plain-pied au terminal' },
];

function MobiliteReduitePage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Services PMR à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Stationnement & Transport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Mobilité Réduite — PMR</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Assistance gratuite · 24h/24
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Message d'accueil */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Notre engagement</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">FIH accessible à tous les voyageurs</h2>
          <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
            La Régie des Voies Aériennes s'engage à rendre l'Aéroport International de N'djili accessible et
            accueillant pour tous les passagers, quelles que soient leurs capacités physiques. Des équipes formées,
            des équipements adaptés et un service personnalisé sont disponibles à chaque étape de votre passage à FIH.
          </p>
        </section>

        {/* Demander l'assistance — mise en avant */}
        <div className="flex items-start gap-4 bg-[#003DA5] p-6 text-white">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5 text-[#FFCE00]" />
          <div>
            <p className="font-bold text-base mb-1">Signalez vos besoins 48 heures avant votre vol</p>
            <p className="text-sm text-white/80 leading-relaxed">
              Pour garantir une assistance optimale et sans attente, informez votre compagnie aérienne de vos besoins
              spécifiques (fauteuil roulant, aide à la marche, porteur de bagage) au moins 48 heures avant le départ.
              À l'aéroport, arrivez 2 heures avant l'heure de fermeture d'enregistrement.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="tel:+243810000000" className="inline-flex items-center gap-2 bg-[#FFCE00] px-4 py-2 text-sm font-bold text-[#1a1a1a]">
                <Phone size={14} /> Appeler l'assistance PMR
              </a>
              <a href="mailto:pmr@fih-rva.com" className="inline-flex items-center gap-2 bg-white/15 border border-white/30 px-4 py-2 text-sm font-bold text-white">
                pmr@fih-rva.com
              </a>
            </div>
          </div>
        </div>

        {/* Services PMR */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Services disponibles</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Nos services pour les PMR</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES_PMR.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.titre} className="border border-[#e8e8e8] bg-white p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-11 w-11 items-center justify-center" style={{ background: `${s.couleur}15`, border: `1px solid ${s.couleur}30` }}>
                      <Icon size={20} style={{ color: s.couleur }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-[#1a1a1a]">{s.titre}</h3>
                  </div>
                  <p className="text-xs text-[#666] leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-[#555]">
                        <CheckCircle size={11} className="flex-shrink-0 mt-0.5" style={{ color: s.couleur }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Accès adaptés */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Infrastructures</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Accès adaptés dans le terminal</h2>
          <div className="space-y-3">
            {ACCES_ADAPTES.map((a) => (
              <div key={a.zone} className="flex flex-col sm:flex-row sm:items-center gap-3 border border-[#e8e8e8] bg-white p-4">
                <div className="flex items-center gap-2 sm:w-56 shrink-0">
                  <MapPin size={13} className="text-[#003DA5] shrink-0" />
                  <p className="font-semibold text-sm text-[#1a1a1a]">{a.zone}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {a.equipements.split(', ').map((e) => (
                    <span key={e} className="bg-[#f0f8f4] border border-[#009A44]/20 px-2 py-0.5 text-[10px] text-[#009A44] font-semibold">{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Procédure détaillée */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Procédure</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Comment demander l'assistance PMR ?</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                etape: '1 — Avant votre voyage',
                desc: 'Contactez votre compagnie aérienne lors de la réservation ou au moins 48h avant le vol. Précisez le type d\'aide nécessaire (fauteuil roulant, aide à la marche, porteur).',
                icone: Phone,
              },
              {
                etape: '2 — À l\'arrivée à FIH',
                desc: 'Présentez-vous à l\'accueil PMR situé à l\'entrée principale du Terminal International. Arrivez au moins 2h avant l\'heure de fermeture d\'enregistrement.',
                icone: MapPin,
              },
              {
                etape: '3 — Prise en charge',
                desc: 'Un agent dédié vous accompagnera tout au long de votre parcours : enregistrement, sécurité, immigration, salon d\'attente et embarquement prioritaire.',
                icone: Heart,
              },
            ].map((e) => {
              const Icon = e.icone;
              return (
                <div key={e.etape} className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#009A44]/10 mx-auto mb-3">
                    <Icon size={20} className="text-[#009A44]" />
                  </div>
                  <p className="font-bold text-sm text-[#1a1a1a] mb-2">{e.etape}</p>
                  <p className="text-xs text-[#666] leading-relaxed">{e.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contacts */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Contacts PMR</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Joindre l'équipe assistance</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Standard PMR FIH', valeur: '+243 81 PMR XXXX', type: 'tel', icon: Phone },
              { label: 'Email assistance', valeur: 'pmr@fih-rva.com', type: 'email', icon: Phone },
              { label: 'Accueil sur place', valeur: 'Entrée T1, 24h/24', type: null, icon: Clock },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="bg-[#f7f7f7] p-4 text-center">
                  <Icon size={20} className="text-[#003DA5] mx-auto mb-2" />
                  <p className="text-xs text-[#888]">{c.label}</p>
                  {c.type === 'tel' ? (
                    <a href={`tel:${c.valeur.replace(/\s/g, '')}`} className="font-bold text-sm text-[#003DA5] hover:underline mt-1 block">{c.valeur}</a>
                  ) : c.type === 'email' ? (
                    <a href={`mailto:${c.valeur}`} className="font-bold text-sm text-[#003DA5] hover:underline mt-1 block">{c.valeur}</a>
                  ) : (
                    <p className="font-bold text-sm text-[#1a1a1a] mt-1">{c.valeur}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
