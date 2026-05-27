import { createFileRoute } from '@tanstack/react-router';
import { Construction, Calendar, AlertTriangle, CheckCircle, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/travaux')({
  component: TravauxPage,
  head: () => ({
    meta: [
      { title: "Travaux & Perturbations — Aéroport N'djili · FIH" },
      { name: 'description', content: "Avis de travaux et perturbations à l'Aéroport International de N'djili FIH — zones impactées, itinéraires alternatifs et dates prévisionnelles." },
    ],
  }),
});

type Statut = 'en_cours' | 'planifie' | 'termine';

const TRAVAUX: {
  titre: string;
  zone: string;
  periode: string;
  impact: string;
  alternatif: string;
  statut: Statut;
}[] = [
  {
    titre: 'Rénovation aile Est — Terminal International',
    zone: 'T1 — Aile Est, Portes A5 à A8',
    periode: 'Mars 2026 – Août 2026',
    impact: 'Les portes A5 à A8 sont temporairement fermées. Les vols initialement affectés à ces portes sont reportés vers les portes A1 à A4. Prévoir 5 minutes de marche supplémentaires.',
    alternatif: 'Portes A1–A4 — même terminal, signalisation mise à jour',
    statut: 'en_cours',
  },
  {
    titre: 'Réfection de la voie d\'accès principale',
    zone: 'Boulevard Lumumba km 7 à km 10',
    periode: 'Juin 2026 – Juillet 2026',
    impact: 'Circulation alternée les nuits de semaine de 22h00 à 05h00. Ralentissements importants possibles en journée. Temps de trajet allongé de 15 à 25 minutes.',
    alternatif: 'Aucune route alternative. Prévoir du temps supplémentaire et éviter les heures creuses nocturnes.',
    statut: 'planifie',
  },
  {
    titre: 'Extension zone d\'embarquement Terminal Domestique',
    zone: 'Terminal Domestique — Salle d\'attente principale',
    periode: 'Septembre 2026 – Décembre 2026',
    impact: 'Réduction temporaire de la capacité d\'assise. Possibilité d\'attente debout pour certains vols domestiques denses.',
    alternatif: 'Café Domestique adjacent reste ouvert. Cafétéria au niveau 0.',
    statut: 'planifie',
  },
  {
    titre: 'Mise à niveau système incendie T2',
    zone: 'Terminal Domestique — Zones techniques',
    periode: 'Janvier 2026 – Février 2026',
    impact: 'Aucun impact sur les passagers. Travaux effectués la nuit en dehors des heures de vol.',
    alternatif: 'Aucun itinéraire alternatif nécessaire',
    statut: 'termine',
  },
  {
    titre: 'Rénovation parkings P1 — Revêtement',
    zone: 'Parking P1 Court Séjour — Zone Nord',
    periode: 'Décembre 2025 – Janvier 2026',
    impact: 'Réduction temporaire de la capacité du P1 de 320 à 200 places. Report des excédents vers P2.',
    alternatif: 'Parking P2 Long Séjour avec navette gratuite vers les terminaux',
    statut: 'termine',
  },
];

const CONFIG: Record<Statut, { label: string; couleur: string; bg: string; border: string; Icon: React.ElementType }> = {
  en_cours: { label: 'En cours', couleur: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', Icon: AlertTriangle },
  planifie: { label: 'Planifié', couleur: 'text-[#003DA5]', bg: 'bg-blue-50', border: 'border-blue-200', Icon: Calendar },
  termine:  { label: 'Terminé',  couleur: 'text-[#009A44]', bg: 'bg-green-50', border: 'border-green-200', Icon: CheckCircle },
};

function TravauxPage() {
  const travaux_en_cours = TRAVAUX.filter((t) => t.statut === 'en_cours');
  const travaux_planifies = TRAVAUX.filter((t) => t.statut === 'planifie');
  const travaux_termines = TRAVAUX.filter((t) => t.statut === 'termine');

  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Travaux à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Stationnement & Transport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Travaux & Perturbations</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-amber-500 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            {travaux_en_cours.length} chantier{travaux_en_cours.length > 1 ? 's' : ''} en cours
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Intro modernisation */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Modernisation FIH</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">L'aéroport de N'djili se modernise</h2>
          <p className="text-sm text-[#555] leading-relaxed max-w-2xl">
            La Régie des Voies Aériennes (RVA) mène un programme ambitieux de modernisation et de réhabilitation
            de l'Aéroport International de N'djili. Ces travaux visent à améliorer l'expérience passager,
            renforcer les normes de sécurité et augmenter la capacité de l'aéroport. Nous nous excusons
            pour les éventuelles perturbations et vous remercions de votre compréhension.
          </p>
        </section>

        {/* Légende */}
        <div className="flex flex-wrap gap-4">
          {(Object.entries(CONFIG) as [Statut, typeof CONFIG[Statut]][]).map(([key, cfg]) => {
            const Icon = cfg.Icon;
            return (
              <div key={key} className={`flex items-center gap-2 px-3 py-1.5 border ${cfg.border} ${cfg.bg}`}>
                <Icon size={12} className={cfg.couleur} />
                <span className={`text-[11px] font-bold ${cfg.couleur}`}>{cfg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Travaux en cours */}
        {travaux_en_cours.length > 0 && (
          <section>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-2">Actuellement</p>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Chantiers en cours</h2>
            <div className="space-y-4">
              {travaux_en_cours.map((t) => {
                const cfg = CONFIG[t.statut];
                const Icon = cfg.Icon;
                return (
                  <div key={t.titre} className={`border ${cfg.border} ${cfg.bg} p-5`}>
                    <div className="flex items-start gap-4 flex-wrap">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white">
                        <Construction size={18} className={cfg.couleur} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                          <h3 className="font-bold text-[#1a1a1a]">{t.titre}</h3>
                          <span className={`flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 bg-white border ${cfg.border} ${cfg.couleur}`}>
                            <Icon size={10} /> {cfg.label}
                          </span>
                        </div>
                        <p className="flex items-center gap-1.5 text-xs text-[#888] mb-2">
                          <MapPin size={11} /> {t.zone}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-[#888] mb-3">
                          <Calendar size={11} /> {t.periode}
                        </p>
                        <p className="text-sm text-[#555] leading-relaxed mb-3">{t.impact}</p>
                        <div className="flex items-start gap-2 bg-white/60 p-3 border border-white/80">
                          <ArrowRight size={12} className={`flex-shrink-0 mt-0.5 ${cfg.couleur}`} />
                          <p className="text-xs text-[#555]"><strong>Itinéraire alternatif :</strong> {t.alternatif}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Travaux planifiés */}
        {travaux_planifies.length > 0 && (
          <section>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">À venir</p>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Chantiers planifiés</h2>
            <div className="space-y-4">
              {travaux_planifies.map((t) => {
                const cfg = CONFIG[t.statut];
                const Icon = cfg.Icon;
                return (
                  <div key={t.titre} className={`border ${cfg.border} ${cfg.bg} p-5`}>
                    <div className="flex items-start gap-4 flex-wrap">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white">
                        <Construction size={18} className={cfg.couleur} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                          <h3 className="font-bold text-[#1a1a1a]">{t.titre}</h3>
                          <span className={`flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 bg-white border ${cfg.border} ${cfg.couleur}`}>
                            <Icon size={10} /> {cfg.label}
                          </span>
                        </div>
                        <p className="flex items-center gap-1.5 text-xs text-[#888] mb-1">
                          <MapPin size={11} /> {t.zone}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-[#888] mb-3">
                          <Calendar size={11} /> {t.periode}
                        </p>
                        <p className="text-sm text-[#555] leading-relaxed">{t.impact}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Travaux terminés */}
        {travaux_termines.length > 0 && (
          <section>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Réalisations</p>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Chantiers terminés</h2>
            <div className="space-y-3">
              {travaux_termines.map((t) => {
                const cfg = CONFIG[t.statut];
                const Icon = cfg.Icon;
                return (
                  <div key={t.titre} className={`border ${cfg.border} ${cfg.bg} p-4 flex items-center gap-4`}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white">
                      <Icon size={16} className={cfg.couleur} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1a1a1a] text-sm">{t.titre}</h3>
                      <p className="text-xs text-[#888]">{t.zone} — {t.periode}</p>
                    </div>
                    <span className={`text-[10px] font-bold ${cfg.couleur}`}>{cfg.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact info travaux */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Informations</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Renseignements travaux</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#f7f7f7] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-[#003DA5]" />
                <p className="font-bold text-sm text-[#1a1a1a]">Standard RVA Travaux</p>
              </div>
              <a href="tel:+243810000000" className="text-[#003DA5] font-bold hover:underline">+243 81 000 XXXX</a>
              <p className="text-xs text-[#888] mt-1">Lun–Ven : 08h–17h</p>
            </div>
            <div className="bg-[#f7f7f7] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Construction size={14} className="text-[#003DA5]" />
                <p className="font-bold text-sm text-[#1a1a1a]">Email travaux</p>
              </div>
              <a href="mailto:travaux@fih-rva.com" className="text-[#003DA5] font-bold hover:underline">travaux@fih-rva.com</a>
              <p className="text-xs text-[#888] mt-1">Réponse sous 48h ouvrées</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
