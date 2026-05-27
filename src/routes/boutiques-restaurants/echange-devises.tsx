import { createFileRoute } from '@tanstack/react-router';
import { ArrowRightLeft, AlertTriangle, MapPin, Clock, Phone, ShieldCheck, Info } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/echange-devises')({
  component: EchangeDevisesPage,
  head: () => ({
    meta: [
      { title: "Échange de devises — Aéroport N'djili · FIH" },
      { name: 'description', content: "Bureaux de change agréés, ATM et conseils sur les devises à l'Aéroport International de N'djili FIH — USD, CDF, EUR." },
    ],
  }),
});

const TAUX = [
  { paire: 'USD → CDF', taux: '2 800', unite: 'CDF pour 1 USD', note: 'Taux indicatif BCC' },
  { paire: 'EUR → CDF', taux: '3 050', unite: 'CDF pour 1 EUR', note: 'Taux indicatif BCC' },
  { paire: 'EUR → USD', taux: '1,09', unite: 'USD pour 1 EUR', note: 'Marché international' },
  { paire: 'GBP → USD', taux: '1,27', unite: 'USD pour 1 GBP', note: 'Marché international' },
  { paire: 'ZAR → USD', taux: '0,053', unite: 'USD pour 1 ZAR', note: 'Marché international' },
  { paire: 'XAF → CDF', taux: '4,28', unite: 'CDF pour 1 XAF', note: 'Taux indicatif' },
];

const BUREAUX = [
  {
    nom: 'Rawbank Change — Aéroport',
    localisation: 'Terminal International — Hall Arrivées, Niveau 0',
    horaires: '07 h 00 – 21 h 00',
    devises: ['USD', 'EUR', 'GBP', 'CDF', 'ZAR'],
    commission: '1,5 %',
    atm: true,
    couleur: '#003DA5',
  },
  {
    nom: 'Bureau de Change FIH Officiel',
    localisation: 'Terminal International — Zone Embarquement (après sécurité)',
    horaires: '06 h 00 – 22 h 00',
    devises: ['USD', 'EUR', 'CDF', 'GBP'],
    commission: '2,0 %',
    atm: false,
    couleur: '#009A44',
  },
  {
    nom: 'Equity BCDC Change',
    localisation: 'Terminal International — Hall Départs, Niveau 1',
    horaires: '08 h 00 – 20 h 00',
    devises: ['USD', 'EUR', 'ZAR', 'CDF', 'XAF'],
    commission: '1,75 %',
    atm: true,
    couleur: '#CE1126',
  },
  {
    nom: 'TMB — Trust Merchant Bank',
    localisation: 'Terminal International — Côté Arrivées',
    horaires: '07 h 00 – 19 h 00',
    devises: ['USD', 'EUR', 'CDF'],
    commission: '2,0 %',
    atm: true,
    couleur: '#1a1a1a',
  },
];

const CONSEILS = [
  {
    titre: 'Ne changez jamais à l\'extérieur de l\'aéroport',
    desc: 'Les changeurs informels aux abords de FIH (notamment sur le Boulevard Lumumba) pratiquent des taux défavorables et des fraudes. Utilisez uniquement les bureaux agréés à l\'intérieur du terminal.',
    icon: AlertTriangle,
    couleur: '#CE1126',
    bg: 'bg-red-50 border-red-200',
  },
  {
    titre: 'L\'USD est roi en RDC',
    desc: 'Le dollar américain (USD) est la devise de facto en RDC pour la majorité des transactions. Apportez des billets propres, non déchirés et post-2000 — les billets anciens sont parfois refusés.',
    icon: ShieldCheck,
    couleur: '#003DA5',
    bg: 'bg-blue-50 border-blue-200',
  },
  {
    titre: 'Taux officiels BCC',
    desc: 'La Banque Centrale du Congo (BCC) publie chaque jour le taux officiel USD/CDF. Les bureaux de change agréés sont tenus de s\'en approcher. Comparez avant de changer.',
    icon: Info,
    couleur: '#009A44',
    bg: 'bg-green-50 border-green-200',
  },
  {
    titre: 'Mobile Money pour les petits montants',
    desc: 'Airtel Money, M-Pesa Vodacom et Orange Money sont largement utilisés à Kinshasa pour payer les petits montants. Rechargez votre crédit dès l\'arrivée si vous séjournez en RDC.',
    icon: Phone,
    couleur: '#FFCE00',
    bg: 'bg-yellow-50 border-yellow-200',
  },
];

function EchangeDevisesPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Bureaux de change à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Boutiques & Restaurants</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Échange de devises</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            USD · CDF · EUR — Bureaux agréés RVA
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Avertissement prioritaire */}
        <div className="flex items-start gap-4 bg-[#CE1126] p-5 text-white">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-base mb-1">Attention — changeurs informels dangereux</p>
            <p className="text-sm text-white/80 leading-relaxed">
              Des changeurs non agréés opèrent parfois aux abords immédiats de l'aéroport et sur le Boulevard Lumumba.
              Leurs taux sont défavorables et ils pratiquent régulièrement des escroqueries. Changez uniquement dans les
              bureaux officiels à l'intérieur du terminal, identifiés par le panneau <strong>RVA — Bureau de change agréé</strong>.
            </p>
          </div>
        </div>

        {/* Taux indicatifs */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Taux du jour</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Taux indicatifs USD / CDF / EUR</h2>
          <p className="text-xs text-[#888] mb-6">
            Taux indicatifs basés sur la Banque Centrale du Congo (BCC). Les taux réels appliqués par les bureaux de change peuvent légèrement varier.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#e8e8e8]">
              <thead>
                <tr className="bg-[#003DA5] text-white">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider">Paire de devises</th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider">Taux</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider hidden sm:table-cell">Unité</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider hidden sm:table-cell">Source</th>
                </tr>
              </thead>
              <tbody>
                {TAUX.map((t, i) => (
                  <tr key={t.paire} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'}>
                    <td className="px-5 py-3 font-semibold text-[#1a1a1a] flex items-center gap-2">
                      <ArrowRightLeft size={12} className="text-[#009A44]" /> {t.paire}
                    </td>
                    <td className="px-5 py-3 text-right font-bold text-[#003DA5]">{t.taux}</td>
                    <td className="px-5 py-3 text-[#666] hidden sm:table-cell">{t.unite}</td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <span className="bg-[#e8e8e8] px-2 py-0.5 text-[10px] text-[#666]">{t.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-[#999] flex items-center gap-1.5">
            <Info size={11} /> Ces taux sont donnés à titre indicatif et sont mis à jour quotidiennement. Consultez directement les bureaux de change pour les taux en vigueur.
          </p>
        </section>

        {/* Bureaux de change */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Où changer ?</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Bureaux de change et banques agréées</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {BUREAUX.map((b) => (
              <div key={b.nom} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-8 shrink-0" style={{ background: b.couleur }} />
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] text-sm">{b.nom}</h3>
                    {b.atm && (
                      <span className="text-[10px] font-bold text-[#009A44]">ATM disponible</span>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  <p className="flex items-start gap-1.5 text-[11px] text-[#777]">
                    <MapPin size={11} className="flex-shrink-0 text-[#003DA5] mt-0.5" />
                    {b.localisation}
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
                    <Clock size={11} className="flex-shrink-0 text-[#003DA5]" />
                    {b.horaires}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {b.devises.map((d) => (
                    <span key={d} className="bg-[#003DA5]/10 px-2 py-0.5 text-[10px] font-bold text-[#003DA5]">{d}</span>
                  ))}
                </div>
                <p className="text-[10px] text-[#999]">Commission : <span className="font-semibold text-[#1a1a1a]">{b.commission}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Conseils pratiques */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Conseils pratiques</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Bien gérer son argent à Kinshasa</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {CONSEILS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.titre} className={`border p-5 flex items-start gap-4 ${c.bg}`}>
                  <Icon size={18} className="flex-shrink-0 mt-0.5" style={{ color: c.couleur }} />
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] text-sm mb-1">{c.titre}</h3>
                    <p className="text-xs text-[#555] leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Devises acceptées synthèse */}
        <section className="border border-[#e8e8e8] bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Résumé</p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Devises acceptées à Kinshasa</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { code: 'USD', nom: 'Dollar américain', note: 'Devise principale — acceptée partout', dot: 'bg-[#003DA5]' },
              { code: 'CDF', nom: 'Franc congolais', note: 'Monnaie officielle — obligatoire dans certains commerces', dot: 'bg-[#009A44]' },
              { code: 'EUR', nom: 'Euro', note: 'Accepté dans les hôtels et boutiques internationales', dot: 'bg-[#FFCE00]' },
            ].map((d) => (
              <div key={d.code} className="text-center p-4 bg-[#f7f7f7]">
                <div className={`w-3 h-3 rounded-full ${d.dot} mx-auto mb-2`} />
                <p className="font-bold text-xl text-[#1a1a1a]">{d.code}</p>
                <p className="text-xs font-semibold text-[#555] mt-0.5">{d.nom}</p>
                <p className="text-[10px] text-[#888] mt-1">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
