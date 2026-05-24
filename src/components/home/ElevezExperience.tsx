import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

/* ─── 3 photo cards — style ADMTL "Élevez votre expérience YUL" ─────── */
const CARDS = [
  {
    title: 'Hors Taxes',
    desc: "Profitez d'une large sélection de parfums, alcools, cosmétiques et confiseries hors taxes avant votre envol.",
    link: 'Découvrir le Duty Free',
    href: '/boutiques-restaurants/hors-taxes',
    image: '/images/fih-checkin-ethiopian.jpg',
    gradient: 'linear-gradient(135deg,#1E3A5F,#2E4E7E)',
  },
  {
    title: 'Salons VIP',
    desc: "Détendez-vous dans nos salons VIP — buffet chaud, bar open, Wi-Fi haut débit et espaces repos.",
    link: "Voir les salons",
    href: '/boutiques-restaurants/salons',
    image: '/images/fih-checkin.jpg',
    gradient: 'linear-gradient(135deg,#78350F,#A16207)',
  },
  {
    title: 'Vols en temps réel',
    desc: "Suivez vos départs et arrivées en direct. Compagnies, portes, statuts et alertes WhatsApp intégrés.",
    link: 'Voir les vols',
    href: '/vols',
    image: '/images/fih-hero-1.jpg',
    gradient: 'linear-gradient(135deg,#003DA5,#001E6E)',
  },
] as const;

export function ElevezExperience() {
  return (
    <section className="bg-[#FAFAFA] border-t border-[#E8E8E8]">
      <div className="container py-14 md:py-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-5 w-1 bg-[#CE1126]" />
          <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">
            Élevez votre expérience{' '}
            <span className="text-[#003DA5]">FIH</span>
          </h2>
        </div>

        {/* 3 photo cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5" style={{ background: '#E0E0E0' }}>
          {CARDS.map(card => (
            <Link
              key={card.href}
              to={card.href as never}
              className="group flex flex-col bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'brightness(0.85) saturate(1.1)' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.parentElement as HTMLElement).style.background = card.gradient;
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-6 flex-1">
                <h3 className="font-bold text-base text-[#1A1A1A] group-hover:text-[#003DA5] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed flex-1">
                  {card.desc}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#003DA5] group-hover:gap-3 transition-all">
                  {card.link}
                  <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
