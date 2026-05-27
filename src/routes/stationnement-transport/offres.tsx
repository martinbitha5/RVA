import { createFileRoute, Link } from '@tanstack/react-router';
import { Tag, Clock, Calendar, Smartphone, CheckCircle, ArrowRight, Shield, CreditCard } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/offres')({
  component: OffresPage,
  head: () => ({
    meta: [{ title: "Tarifs & Offres Stationnement — Aéroport N'djili · FIH" }],
  }),
});

const TARIFS = [
  {
    parking: 'P1 — Court Séjour',
    desc: 'Terminal International, 200 m',
    horaire: '$2',
    journalier: '$15',
    hebdo: '$80',
    mensuel: 'Sur demande',
    badge: null,
  },
  {
    parking: 'P2 — Long Séjour',
    desc: 'Boulevard Lumumba, navette gratuite',
    horaire: '$1',
    journalier: '$10',
    hebdo: '$55',
    mensuel: '$180',
    badge: 'Économique',
  },
  {
    parking: 'P3 — Premium Couvert',
    desc: 'Terminal VIP, 100 m, abri + EV',
    horaire: '$3',
    journalier: '$22',
    hebdo: '$110',
    mensuel: '$320',
    badge: 'Premium',
  },
];

const AVANTAGES = [
  { icon: Tag,        titre: 'Tarifs fixes garantis',    desc: 'Les tarifs RVA sont officiels et réglementés. Aucun frais caché ni surprice.' },
  { icon: Clock,      titre: 'Sécurité 24h/24',          desc: 'Agents de sécurité RVA présents en permanence sur tous les parkings de FIH.' },
  { icon: Calendar,   titre: 'Abonnements disponibles',  desc: 'Réductions pour longue durée. Abonnements mensuels disponibles au bureau RVA.' },
  { icon: Smartphone, titre: 'Mobile Money accepté',     desc: 'Airtel Money, M-Pesa Vodacom et Orange Money acceptés aux caisses de chaque parking.' },
];

const MOBILE_MONEY = [
  { nom: 'Airtel Money',   couleur: '#DC2626', operateur: 'Réseau Airtel RDC', numero: '*126#' },
  { nom: 'M-Pesa Vodacom', couleur: '#16A34A', operateur: 'Réseau Vodacom RDC', numero: '*111#' },
  { nom: 'Orange Money',   couleur: '#EA580C', operateur: 'Réseau Orange RDC', numero: '*144#' },
];

const OFFRES_PROMO = [
  {
    titre: 'Offre Retour Rapide',
    duree: 'Moins de 4 heures',
    tarif: '$5 forfait',
    parking: 'P1 uniquement',
    conditions: 'Valable du lundi au vendredi, hors jours fériés',
  },
  {
    titre: 'Pack Semaine',
    duree: '5 jours consécutifs',
    tarif: '$60 (P2) — économie de $10',
    parking: 'P2 Long Séjour',
    conditions: 'Réservation en ligne obligatoire 24h à l\'avance',
  },
  {
    titre: 'Abonnement Mensuel',
    duree: '30 jours calendaires',
    tarif: '$180 (P2) · $320 (P3)',
    parking: 'P2 et P3',
    conditions: 'Contrat mensuel renouvelable — bureau RVA Parking',
  },
];

function OffresPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Tarifs et offres de stationnement à FIH"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Stationnement & Transport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Tarifs & Offres Stationnement</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            −15 % en réservant en ligne
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Avantages */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Pourquoi choisir FIH</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Les avantages du stationnement officiel</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AVANTAGES.map(({ icon: Icon, titre, desc }) => (
              <div key={titre} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center bg-[#003DA5]/10 mb-3">
                  <Icon size={18} className="text-[#003DA5]" />
                </div>
                <p className="font-bold text-sm text-[#1a1a1a] mb-1">{titre}</p>
                <p className="text-xs text-[#666] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grille tarifaire */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Tarification officielle</p>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Grille tarifaire RVA</h2>
            <Link to={'/stationnement-transport/formulaire' as never} className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-[#003DA5] hover:underline">
              Réserver maintenant <ArrowRight size={11} />
            </Link>
          </div>
          <div className="overflow-x-auto border border-[#e8e8e8]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1a1a] text-white">
                  <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider">Parking</th>
                  <th className="px-5 py-4 text-center text-[10px] font-bold uppercase tracking-wider">Horaire</th>
                  <th className="px-5 py-4 text-center text-[10px] font-bold uppercase tracking-wider">Journalier</th>
                  <th className="px-5 py-4 text-center text-[10px] font-bold uppercase tracking-wider">Hebdomadaire</th>
                  <th className="px-5 py-4 text-center text-[10px] font-bold uppercase tracking-wider">Mensuel</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {TARIFS.map((t, i) => (
                  <tr key={t.parking} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#1a1a1a]">{t.parking}</p>
                        {t.badge && (
                          <span className="bg-[#FFCE00] px-2 py-0.5 text-[10px] font-bold text-[#1a1a1a]">{t.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-[#888] mt-0.5">{t.desc}</p>
                    </td>
                    <td className="px-5 py-4 text-center font-bold text-[#003DA5]">{t.horaire}</td>
                    <td className="px-5 py-4 text-center font-bold text-[#003DA5]">{t.journalier}</td>
                    <td className="px-5 py-4 text-center font-bold text-[#003DA5]">{t.hebdo}</td>
                    <td className="px-5 py-4 text-center font-bold text-[#003DA5]">{t.mensuel}</td>
                    <td className="px-5 py-4">
                      <Link
                        to={'/stationnement-transport/formulaire' as never}
                        className="inline-flex items-center gap-1 bg-[#003DA5] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#002a7a] transition-colors"
                      >
                        Réserver <ArrowRight size={10} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-[#888]">
            * Tarifs en USD — Équivalent CDF disponible aux caisses selon le taux BCC du jour. Réservation en ligne : −15 %.
          </p>
        </section>

        {/* Offres promotionnelles */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Promotions</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Offres et abonnements</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {OFFRES_PROMO.map((o) => (
              <div key={o.titre} className="border border-[#e8e8e8] bg-white p-5 flex flex-col gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Tag size={14} className="text-[#009A44]" />
                    <h3 className="font-bold text-[#1a1a1a] text-sm">{o.titre}</h3>
                  </div>
                  <p className="text-[10px] text-[#888]">{o.parking}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#999] mb-1">Durée</p>
                  <p className="text-xs text-[#555]">{o.duree}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#999] mb-1">Tarif</p>
                  <p className="font-bold text-[#003DA5]">{o.tarif}</p>
                </div>
                <p className="text-[10px] text-[#888] italic mt-auto">{o.conditions}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Money */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Paiement mobile</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Mobile Money accepté à FIH</h2>
          <p className="text-sm text-[#555] mb-6 max-w-xl">
            Payez votre stationnement directement avec votre téléphone — sans espèces, sans carte bancaire.
            Toutes les caisses des parkings RVA acceptent les trois opérateurs Mobile Money de RDC.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {MOBILE_MONEY.map((m) => (
              <div key={m.nom} className="border border-[#e8e8e8] bg-white p-5 flex items-start gap-4">
                <div className="w-3 h-10 shrink-0" style={{ background: m.couleur }} />
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm">{m.nom}</p>
                  <p className="text-xs text-[#888]">{m.operateur}</p>
                  <p className="text-xs font-mono font-bold text-[#003DA5] mt-1">{m.numero}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-[#009A44] font-semibold">
                    <CheckCircle size={10} /> Accepté
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conditions générales */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <div className="flex items-center gap-3 mb-5">
            <Shield size={18} className="text-[#003DA5]" />
            <h2 className="text-xl font-bold text-[#1a1a1a]">Conditions de stationnement</h2>
          </div>
          <ul className="space-y-3 text-sm text-[#555]">
            {[
              'Le ticket de stationnement doit être conservé et présenté à la caisse avant de quitter le parking.',
              'Tout dépassement de la durée réservée est facturé au tarif horaire normal.',
              'La RVA décline toute responsabilité pour les objets laissés dans les véhicules.',
              'En cas de perte du ticket, un forfait fixe de 30 USD est appliqué (P3 : 50 USD).',
              'Les véhicules non réclamés après 30 jours font l\'objet d\'une mise en fourrière.',
              'Remboursement possible jusqu\'à 48h avant la date de réservation (moins 10 % de frais).',
            ].map((c) => (
              <li key={c} className="flex items-start gap-2.5">
                <span className="text-[#003DA5] font-bold mt-0.5">→</span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA final */}
        <div className="bg-[#003DA5] p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-bold text-white text-xl">Prêt à réserver votre place ?</p>
            <p className="text-sm text-white/70 mt-1">Économisez 15 % en réservant en ligne avant votre voyage.</p>
          </div>
          <div className="flex gap-3">
            <Link to={'/stationnement-transport/formulaire' as never} className="inline-flex items-center gap-2 bg-[#FFCE00] px-5 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#e6b800] transition-colors">
              <CreditCard size={14} /> Réserver maintenant
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
