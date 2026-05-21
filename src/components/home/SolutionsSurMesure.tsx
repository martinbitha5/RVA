import { Link } from '@tanstack/react-router';
import { ArrowRight, Baby, Accessibility, HeartPulse, Package } from 'lucide-react';

/* ─── 4 service cards — style ADMTL "Solutions de voyage sur mesure" ── */
const CARDS = [
  {
    Icon: Baby,
    title: 'Voyager avec des enfants',
    desc: "Pour un voyage en famille en toute sérénité. Mineurs non accompagnés, poussettes, espaces famille.",
    link: 'Découvrir nos services',
    href: '/guide/passagers-mineurs',
    image: '/images/fih-checkin.jpg',
    accent: '#003DA5',
  },
  {
    Icon: Accessibility,
    title: 'Services adaptés',
    desc: "Des solutions sur mesure pour les passagers à mobilité réduite — assistance, fauteuils, accès PMR.",
    link: 'En savoir plus',
    href: '/guide/passagers-handicap',
    image: '/images/fih-tarmac.jpg',
    accent: '#009A44',
  },
  {
    Icon: HeartPulse,
    title: 'Santé & Vaccinations',
    desc: "Centre médical 24h/24 — fièvre jaune obligatoire, soins d'urgence et certificats médicaux de voyage.",
    link: 'Centre médical FIH',
    href: '/guide/sante',
    image: '/images/fih-bagages.jpg',
    accent: '#CE1126',
  },
  {
    Icon: Package,
    title: 'Porteur de bagage',
    desc: "Un service personnalisé de porteur disponible à l'arrivée et au départ pour vous faciliter le voyage.",
    link: "Réserver ce service",
    href: '/boutiques-restaurants/repertoire/centre-medical-fih',
    image: '/images/fih-bus-cobus.jpg',
    accent: '#FFCE00',
  },
] as const;

export function SolutionsSurMesure() {
  return (
    <section className="bg-white border-t border-[#E8E8E8]">
      <div className="container py-14 md:py-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-5 w-1 bg-[#CE1126]" />
          <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">
            Solutions de voyage sur mesure
          </h2>
        </div>

        {/* 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5" style={{ background: '#E0E0E0' }}>
          {CARDS.map(card => (
            <Link
              key={card.href}
              to={card.href as never}
              className="group flex flex-col bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Small photo */}
              <div className="relative h-36 overflow-hidden flex-shrink-0">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: 'brightness(0.75) saturate(1.1)' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement as HTMLElement;
                    parent.style.background = '#1A1A1A';
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                  }}
                />
                {/* Icon overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${card.accent}30` }}
                >
                  <card.Icon size={32} style={{ color: card.accent }} strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-5 flex-1">
                {/* Icon accent */}
                <div
                  className="flex h-7 w-7 items-center justify-center mb-1"
                  style={{ background: `${card.accent}18` }}
                >
                  <card.Icon size={14} style={{ color: card.accent }} strokeWidth={1.5} />
                </div>

                <h3 className="font-bold text-sm text-[#1A1A1A] leading-snug group-hover:text-[#003DA5] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed flex-1">
                  {card.desc}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#003DA5] group-hover:gap-2.5 transition-all">
                  {card.link}
                  <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
