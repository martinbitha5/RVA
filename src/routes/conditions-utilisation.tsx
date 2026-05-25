import { createFileRoute } from '@tanstack/react-router';
import { ScrollText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/conditions-utilisation')({
  component: ConditionsPage,
  head: () => ({ meta: [{ title: "Conditions d'utilisation — FIH · RVA" }] }),
});

const SECTIONS = [
  {
    title: '1. Objet',
    content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site web de l'Aéroport International de N'djili (FIH), exploité par la Régie des Voies Aériennes (RVA), établissement public congolais. En accédant à ce site, vous acceptez sans réserve les présentes conditions.`,
  },
  {
    title: '2. Accès au service',
    content: `Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. La RVA se réserve le droit, sans préavis ni indemnité, de fermer temporairement ou définitivement l'accès au site pour effectuer des mises à jour, des maintenances ou pour toute autre raison technique ou opérationnelle.`,
  },
  {
    title: '3. Propriété intellectuelle',
    content: `L'ensemble du contenu présent sur ce site (textes, images, graphismes, logos, icônes, sons, logiciels, etc.) est la propriété exclusive de la RVA ou de ses partenaires et est protégé par les lois congolaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans l'autorisation écrite préalable de la RVA.`,
  },
  {
    title: '4. Données personnelles',
    content: `La collecte et le traitement des données personnelles sont effectués conformément à notre Politique de Confidentialité. En utilisant ce site et ses services (espace client, alertes WhatsApp, réservations), vous consentez à la collecte et à l'utilisation de vos données dans les conditions décrites dans ladite politique.`,
  },
  {
    title: '5. Espace client',
    content: `L'accès à l'espace client nécessite la création d'un compte avec une adresse email valide et un mot de passe. Vous êtes responsable de la confidentialité de vos identifiants de connexion. Toute utilisation de votre compte est sous votre entière responsabilité. En cas d'utilisation non autorisée, vous vous engagez à en informer immédiatement la RVA.`,
  },
  {
    title: '6. Réservations et paiements',
    content: `Les réservations de stationnement effectuées via ce site sont soumises à des conditions spécifiques détaillées lors du processus de réservation. Les paiements sont traités via des prestataires tiers sécurisés (Mobile Money, carte bancaire). La RVA ne stocke aucun numéro de carte bancaire complet. Tout litige relatif à une transaction doit être signalé dans un délai de 30 jours.`,
  },
  {
    title: '7. Responsabilité',
    content: `La RVA s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, notamment concernant les horaires de vols. Toutefois, compte tenu des contraintes inhérentes au transport aérien, elle ne peut garantir l'exactitude, la complétude ou l'actualité des informations. Les informations sont fournies à titre indicatif et ne sauraient engager la responsabilité de la RVA en cas d'erreur ou d'omission.`,
  },
  {
    title: '8. Liens hypertextes',
    content: `Le site peut contenir des liens vers des sites tiers. La RVA n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur disponibilité. La présence de ces liens n'implique pas d'approbation de leur contenu par la RVA.`,
  },
  {
    title: '9. Droit applicable',
    content: `Les présentes CGU sont régies par le droit congolais. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des juridictions de Kinshasa, République Démocratique du Congo.`,
  },
  {
    title: '10. Modification des CGU',
    content: `La RVA se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications importantes par voie de notification sur le site. L'utilisation continue du site après publication des modifications vaut acceptation des nouvelles conditions.`,
  },
] as const;

function ConditionsPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14 max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <ScrollText size={18} className="text-rdc-blue" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Légal</p>
          <h1 className="font-display font-bold text-3xl text-rdc-anthracite">{t('footer.legalLinks.terms')}</h1>
        </div>
      </div>

      <p className="mb-8 text-sm text-muted-foreground">
        Dernière mise à jour : janvier 2025 · Aéroport International de N'djili (FIH) — géré par la Régie des Voies Aériennes (RVA)
      </p>

      <div className="space-y-8">
        {SECTIONS.map(s => (
          <section key={s.title}>
            <h2 className="font-display font-bold text-lg text-rdc-anthracite mb-2">{s.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.content}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        <p className="font-medium text-rdc-anthracite mb-1">Contact légal</p>
        <p>Pour toute question relative aux présentes CGU, contactez-nous :</p>
        <p className="mt-1">Email : <a href="mailto:legal@fih-rva.com" className="text-rdc-blue hover:underline">legal@fih-rva.com</a></p>
        <p>Adresse : Boulevard Lumumba, Commune de Nsele, Kinshasa, RDC</p>
      </div>
    </div>
  );
}
