import { createFileRoute } from '@tanstack/react-router';
import { Hero } from '@/components/home/Hero';
import { FlightSearch } from '@/components/home/FlightSearch';
import { QuickAccess } from '@/components/home/QuickAccess';
import { FlightsPreview } from '@/components/home/FlightsPreview';
import { InfosUtiles } from '@/components/home/InfosUtiles';
import { ElevezExperience } from '@/components/home/ElevezExperience';
import { SolutionsSurMesure } from '@/components/home/SolutionsSurMesure';
import { NewsCarousel } from '@/components/home/NewsCarousel';
import { ExploreGrid } from '@/components/home/ExploreGrid';
import { NewsletterCTA } from '@/components/home/NewsletterCTA';

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
      { name: 'og:type', content: 'website' },
    ],
  }),
});

function HomePage() {
  return (
    <>
      {/* 1. Hero plein-écran + slideshow tarmac FIH */}
      <Hero />

      {/* 2. Recherche de vol rapide */}
      <FlightSearch />

      {/* 3. Accès rapides (icônes) */}
      <QuickAccess />

      {/* 4. Tableau vols en direct — départs / arrivées */}
      <FlightsPreview />

      {/* ── Sections style ADMTL ──────────────────────────────── */}

      {/* 5. Informations utiles — 6 cartes texte+lien (fond blanc) */}
      <InfosUtiles />

      {/* 6. Élevez votre expérience FIH — 3 cartes photo */}
      <ElevezExperience />

      {/* 7. Solutions de voyage sur mesure — 4 cartes illustrées */}
      <SolutionsSurMesure />

      {/* ── Autres sections ───────────────────────────────────── */}

      {/* 8. Actualités FIH */}
      <NewsCarousel />

      {/* 9. Tuiles éditoriales — Explorer l'aéroport FIH */}
      <ExploreGrid />

      {/* 10. Newsletter / alertes SMS */}
      <NewsletterCTA />
    </>
  );
}
