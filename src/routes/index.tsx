import { createFileRoute } from '@tanstack/react-router';
import { Hero }               from '@/components/home/Hero';
import { ParkingWidget }      from '@/components/home/ParkingWidget';
import { TransportWaitTime }  from '@/components/home/TransportWaitTime';
import { FlightsPreview }     from '@/components/home/FlightsPreview';
import { InfosUtiles }        from '@/components/home/InfosUtiles';
import { ElevezExperience }   from '@/components/home/ElevezExperience';
import { SolutionsSurMesure } from '@/components/home/SolutionsSurMesure';
import { NewsCarousel }       from '@/components/home/NewsCarousel';
import { ExploreGrid }        from '@/components/home/ExploreGrid';
import { NewsletterCTA }      from '@/components/home/NewsletterCTA';

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Aéroport International de N'djili · FIH · Kinshasa, RDC" },
      {
        name: 'description',
        content:
          "Portail officiel de l'Aéroport International de N'djili (FIH/FZAA), Kinshasa, RDC. Vols en temps réel, stationnement, boutiques, guide du passager.",
      },
      { name: 'og:title', content: "Aéroport International de N'djili · FIH · Kinshasa" },
      { name: 'og:type',  content: 'website' },
    ],
  }),
});

function HomePage() {
  return (
    <>
      {/* 1. Hero plein-écran avec panel "Trouver un vol" intégré à droite */}
      <Hero />

      {/* 2. Widget réservation stationnement (ADMTL parking widget) */}
      <ParkingWidget />

      {/* 3. Transport links + Temps d'attente (2 colonnes ADMTL) */}
      <TransportWaitTime />

      {/* 4. Vols en direct — départs / arrivées */}
      <FlightsPreview />

      {/* 5. Informations utiles — 6 cartes texte+lien (style ADMTL) */}
      <InfosUtiles />

      {/* 6. Élevez votre expérience FIH — 3 cartes photo */}
      <ElevezExperience />

      {/* 7. Solutions de voyage sur mesure — 4 cartes illustrées */}
      <SolutionsSurMesure />

      {/* 8. Actualités FIH */}
      <NewsCarousel />

      {/* 9. Explorer l'aéroport — tuiles éditoriales illustrées */}
      <ExploreGrid />

      {/* 10. Newsletter / alertes SMS */}
      <NewsletterCTA />
    </>
  );
}
