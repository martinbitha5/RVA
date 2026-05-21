import { createFileRoute } from '@tanstack/react-router';
import { Hero }               from '@/components/home/Hero';
import { ParkingWidget }      from '@/components/home/ParkingWidget';
import { TransportWaitTime }  from '@/components/home/TransportWaitTime';
import { InfosUtiles }        from '@/components/home/InfosUtiles';
import { ElevezExperience }   from '@/components/home/ElevezExperience';
import { SolutionsSurMesure } from '@/components/home/SolutionsSurMesure';

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
      {/* 1. Hero plein-écran + panel "Trouver un vol" intégré à droite */}
      <Hero />

      {/* 2. Widget réservation stationnement */}
      <ParkingWidget />

      {/* 3. Transport & Temps d'attente — 2 colonnes */}
      <TransportWaitTime />

      {/* 4. Informations utiles — 6 cartes */}
      <InfosUtiles />

      {/* 5. Élevez votre expérience FIH — 3 cartes photo */}
      <ElevezExperience />

      {/* 6. Solutions de voyage sur mesure — 4 cartes */}
      <SolutionsSurMesure />
    </>
  );
}
