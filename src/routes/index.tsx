import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Hero } from '@/components/home/Hero';
import { FlightSearch } from '@/components/home/FlightSearch';
import { QuickAccess } from '@/components/home/QuickAccess';
import { FlightsPreview } from '@/components/home/FlightsPreview';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { NewsCarousel } from '@/components/home/NewsCarousel';
import { CommunityHighlight } from '@/components/home/CommunityHighlight';
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
      {
        name: 'og:title',
        content: "Aéroport International de N'djili · FIH · Kinshasa",
      },
      {
        name: 'og:type',
        content: 'website',
      },
    ],
  }),
});

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Flight search (overlaps hero bottom) */}
      <FlightSearch />

      {/* 3. Quick Access grid */}
      <QuickAccess />

      {/* 4. Yellow fever mandatory alert */}
      <div className="container -mt-2 pb-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            {t('guide.yellowFeverAlert')}
          </p>
          <p className="mt-1 text-sm text-amber-800/80">{t('guide.yellowFeverDetails')}</p>
        </div>
      </div>

      {/* 5. Live flights preview */}
      <FlightsPreview />

      {/* 6. Services grid */}
      <ServicesGrid />

      {/* 7. Latest news */}
      <NewsCarousel />

      {/* 8. Community highlight */}
      <CommunityHighlight />

      {/* 9. Newsletter / SMS CTA */}
      <NewsletterCTA />
    </>
  );
}
