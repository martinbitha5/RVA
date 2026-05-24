import { createFileRoute } from '@tanstack/react-router';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/politique-confidentialite')({
  component: PolitiqueConfidentialitePage,
  head: () => ({ meta: [{ title: "Politique de confidentialité — FIH · RVA" }] }),
});

const SECTIONS = [
  {
    title: '1. Responsable du traitement',
    content: `La Régie des Voies Aériennes (RVA), établissement public de droit congolais, dont le siège social est situé Boulevard Lumumba, Commune de Nsele, Kinshasa, RDC, est responsable du traitement de vos données personnelles collectées via le site de l'Aéroport International de N'djili (FIH).`,
  },
  {
    title: '2. Données collectées',
    content: `Nous collectons les données suivantes :\n• Données d'identification : nom complet, adresse email, numéro de téléphone\n• Données de navigation : adresse IP, pages visitées, durée de visite (via outils d'analyse anonymisés)\n• Données de transaction : informations de réservation de stationnement, méthode de paiement (hors données bancaires sensibles)\n• Données de communication : messages envoyés via le formulaire de contact ou de plainte sonore`,
  },
  {
    title: '3. Finalités du traitement',
    content: `Vos données sont utilisées pour :\n• Gestion de votre espace client (authentification, profil)\n• Traitement de vos réservations de stationnement\n• Envoi d'alertes SMS et notifications email sur les vols\n• Traitement des plaintes d'environnement sonore\n• Amélioration de nos services et de l'expérience utilisateur\n• Respect de nos obligations légales`,
  },
  {
    title: '4. Base légale',
    content: `Le traitement de vos données repose sur :\n• L'exécution du contrat : pour les réservations et services que vous avez demandés\n• Votre consentement : pour les notifications marketing et les cookies non essentiels\n• Notre intérêt légitime : pour la sécurité du site et l'amélioration de nos services\n• Le respect d'une obligation légale : pour la conservation de certains documents`,
  },
  {
    title: '5. Destinataires des données',
    content: `Vos données peuvent être partagées avec :\n• Supabase (hébergement de la base de données — serveurs Europe)\n• Prestataires Mobile Money (Airtel Money, M-Pesa Vodacom, Orange Money) pour le traitement des paiements\n• Africa's Talking ou Twilio pour l'envoi de SMS\n• Nos partenaires techniques dans la stricte mesure nécessaire à la fourniture du service\n\nNous ne vendons jamais vos données à des tiers à des fins commerciales.`,
  },
  {
    title: '6. Durée de conservation',
    content: `• Données de compte : conservées pendant la durée de vie du compte + 3 ans après suppression\n• Données de réservation : 5 ans (obligation comptable et légale)\n• Logs de navigation : 12 mois\n• Plaintes sonores : 10 ans (archivage légal RVA)\n• Données de candidature : 2 ans après la clôture du recrutement`,
  },
  {
    title: '7. Vos droits',
    content: `Conformément à la réglementation applicable, vous disposez des droits suivants :\n• Droit d'accès à vos données personnelles\n• Droit de rectification des données inexactes\n• Droit à l'effacement (« droit à l'oubli »)\n• Droit à la limitation du traitement\n• Droit à la portabilité de vos données\n• Droit d'opposition au traitement\n\nPour exercer ces droits, contactez-nous à privacy@aindjili.com`,
  },
  {
    title: '8. Sécurité',
    content: `La RVA met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre toute perte, accès non autorisé, divulgation, altération ou destruction. Notre infrastructure utilise HTTPS, un chiffrement au repos, une authentification à deux facteurs pour les accès administrateurs et des sauvegardes quotidiennes.`,
  },
  {
    title: '9. Cookies',
    content: `Notre site utilise des cookies et technologies similaires. Pour plus d'informations, veuillez consulter notre Politique de Cookies accessible depuis le bas de chaque page.`,
  },
  {
    title: '10. Modifications',
    content: `La présente politique peut être mise à jour. Toute modification substantielle sera notifiée par email aux utilisateurs ayant un compte actif. La date de dernière mise à jour est indiquée en en-tête de ce document.`,
  },
] as const;

function PolitiqueConfidentialitePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14 max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <Shield size={18} className="text-rdc-blue" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Légal</p>
          <h1 className="font-display font-bold text-3xl text-rdc-anthracite">{t('footer.legalLinks.privacy')}</h1>
        </div>
      </div>

      <p className="mb-8 text-sm text-muted-foreground">
        Dernière mise à jour : janvier 2025 · Aéroport International de N'djili (FIH) — géré par la Régie des Voies Aériennes (RVA)
      </p>

      <div className="space-y-8">
        {SECTIONS.map(s => (
          <section key={s.title}>
            <h2 className="font-display font-bold text-lg text-rdc-anthracite mb-2">{s.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{s.content}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        <p className="font-medium text-rdc-anthracite mb-1">Délégué à la Protection des Données</p>
        <p>Email : <a href="mailto:privacy@aindjili.com" className="text-rdc-blue hover:underline">privacy@aindjili.com</a></p>
        <p>Adresse : Direction Générale RVA, Boulevard Lumumba, Kinshasa, RDC</p>
      </div>
    </div>
  );
}
