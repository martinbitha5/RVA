import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const Route = createFileRoute('/faq')({
  component: FaqPage,
  head: () => ({ meta: [{ title: "FAQ — Foire aux questions · FIH · RVA" }] }),
});

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_SECTIONS: { category: string; items: FaqItem[] }[] = [
  {
    category: 'Vols & Horaires',
    items: [
      {
        q: 'Comment consulter les horaires de vols en temps réel ?',
        a: 'Rendez-vous sur les pages Départs ou Arrivées accessibles depuis le menu principal. Les tableaux sont mis à jour en temps réel. Vous pouvez filtrer par compagnie, destination ou plage horaire.',
      },
      {
        q: 'Mon vol est en retard, que faire ?',
        a: 'Consultez le statut de votre vol sur notre site ou contactez directement votre compagnie aérienne. Vous pouvez également vous inscrire aux alertes SMS pour recevoir des notifications automatiques sur les changements de statut.',
      },
      {
        q: 'Comment m\'abonner aux alertes SMS pour mon vol ?',
        a: 'Créez un espace client sur notre site, puis accédez à la section "Alertes SMS" dans le menu Vols. Renseignez votre numéro de téléphone congolais (Vodacom, Airtel, Orange) et le numéro de vol souhaité.',
      },
      {
        q: 'Quelles compagnies aériennes opèrent à FIH ?',
        a: 'L\'aéroport de N\'djili accueille de nombreuses compagnies dont Congo Airways, Ethiopian Airlines, Brussels Airlines, Air France, Kenya Airways, Qatar Airways, EgyptAir, Turkish Airlines, ASKY, Royal Air Maroc, RwandAir et plusieurs opérateurs domestiques.',
      },
    ],
  },
  {
    category: 'Arrivée & Départ',
    items: [
      {
        q: 'Le vaccin contre la fièvre jaune est-il obligatoire ?',
        a: 'Oui. Le certificat international de vaccination contre la fièvre jaune (carnet jaune OMS) est obligatoire pour entrer en République Démocratique du Congo. Sans ce document, l\'entrée sur le territoire peut vous être refusée ou vous pouvez être vacciné sur place moyennant frais.',
      },
      {
        q: 'Comment obtenir un visa pour la RDC ?',
        a: 'La RDC propose un système de visa électronique (e-Visa) accessible sur evisa.gouv.cd. Le visa à l\'arrivée est disponible pour certains pays. Consultez notre page Douanes & Immigration pour les détails par nationalité.',
      },
      {
        q: 'Quelle est la monnaie à utiliser en RDC ?',
        a: 'Le Dollar américain (USD) est la principale devise utilisée. Le Franc Congolais (CDF) est la monnaie nationale. Des bureaux de change agréés sont disponibles dans l\'aérogare. Évitez les changeurs informels.',
      },
      {
        q: 'Puis-je prendre un taxi à la sortie de l\'aéroport ?',
        a: 'Oui, des taxis officiels agréés par la RVA sont disponibles à la sortie des arrivées. Ils sont identifiables par leur badge officiel. Évitez les taxis informels et privilégiez les taxis agréés ou les services de navette de votre hôtel.',
      },
    ],
  },
  {
    category: 'Stationnement',
    items: [
      {
        q: 'Comment réserver une place de stationnement ?',
        a: 'Depuis la page Stationnement, sélectionnez votre parking, vos dates et horaires, puis procédez au paiement via Mobile Money (Airtel Money, M-Pesa, Orange Money) ou carte bancaire. Un code de réservation vous sera envoyé par SMS et email.',
      },
      {
        q: 'Quels sont les tarifs de stationnement ?',
        a: 'Les tarifs varient selon le type de parking (court séjour, long séjour, P+R). Consultez notre page Offres & Tarifs pour le détail des prix en USD. Les réservations en ligne bénéficient de tarifs préférentiels.',
      },
      {
        q: 'Y a-t-il des places PMR (personnes à mobilité réduite) ?',
        a: 'Oui, des places réservées PMR sont disponibles dans tous nos parkings, à proximité des entrées. Pour toute demande d\'assistance spécifique, contactez-nous 48h avant votre voyage.',
      },
    ],
  },
  {
    category: 'Services & Commodités',
    items: [
      {
        q: 'Y a-t-il du Wi-Fi gratuit à l\'aéroport ?',
        a: 'Oui, un réseau Wi-Fi gratuit « FIH-Free » est disponible dans les zones publiques de l\'aérogare. La connexion est limitée à 1 heure par session. Des forfaits étendus sont disponibles auprès des opérateurs mobiles présents dans l\'aérogare.',
      },
      {
        q: 'Où se trouvent les distributeurs automatiques de billets (ATM) ?',
        a: 'Des ATM Rawbank, Equity BCDC et TMB sont disponibles dans les zones d\'arrivées et de départs. Ils distribuent des USD et des CDF. Certains ATM peuvent ne pas être opérationnels 24h/24 — prévoyez du cash.',
      },
      {
        q: 'Y a-t-il des salons VIP à FIH ?',
        a: 'Oui, plusieurs salons sont disponibles : le Pearl Lounge (accessible tous passagers avec abonnement), le Brussels Airlines Lounge (passagers Business) et d\'autres salons compagnies. Consultez notre page Salons pour les conditions d\'accès.',
      },
      {
        q: 'Que faire si j\'ai perdu un objet à l\'aéroport ?',
        a: 'Rendez-vous au bureau des Objets Trouvés situé au rez-de-chaussée de l\'aérogare principale, ou utilisez notre formulaire en ligne accessible depuis la page Objets Trouvés. Conservez tous vos documents de voyage pour faciliter les recherches.',
      },
    ],
  },
  {
    category: 'Espace client',
    items: [
      {
        q: 'Comment créer un compte sur aindjili.com ?',
        a: 'Cliquez sur "Espace Client" dans le menu principal, puis "Créer un compte". Renseignez votre nom, email et mot de passe (minimum 8 caractères). Un email de confirmation vous sera envoyé.',
      },
      {
        q: 'J\'ai oublié mon mot de passe, que faire ?',
        a: 'Sur la page de connexion, cliquez sur "Mot de passe oublié" et entrez votre adresse email. Vous recevrez un lien de réinitialisation valable 1 heure.',
      },
    ],
  },
];

function FaqPage() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="container py-10 md:py-14 max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <HelpCircle size={18} className="text-rdc-blue" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Aide</p>
          <h1 className="font-display font-bold text-3xl text-rdc-anthracite">Foire aux questions</h1>
        </div>
      </div>

      <div className="space-y-10">
        {FAQ_SECTIONS.map(section => (
          <section key={section.category}>
            <h2 className="font-display font-bold text-lg text-rdc-anthracite mb-4 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-rdc-blue inline-block" />
              {section.category}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, idx) => {
                const key = `${section.category}-${idx}`;
                const isOpen = openKey === key;
                return (
                  <div key={key} className="rounded-xl border border-border bg-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left gap-4 hover:bg-muted/30 transition-colors">
                      <span className="font-medium text-rdc-anthracite text-sm">{item.q}</span>
                      <ChevronDown size={16} className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-rdc-blue/20 bg-rdc-blue/5 p-6 text-center">
        <p className="font-semibold text-rdc-anthracite mb-1">Vous n'avez pas trouvé votre réponse ?</p>
        <p className="text-sm text-muted-foreground mb-4">Notre équipe est disponible pour vous aider.</p>
        <a href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-rdc-blue/85 transition-colors">
          {t('nav.contact') || 'Contactez-nous'}
        </a>
      </div>
    </div>
  );
}
