import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

/* ─── 6 info cards — style ADMTL "Informations utiles" ──────────────── */
const CARDS = [
  {
    title: "Travaux à FIH",
    desc: "Consultez les avis de travaux actifs sur les voies d'accès et les terminaux.",
    link: "En savoir plus",
    href: '/stationnement-transport/travaux',
    accent: '#CE1126',
  },
  {
    title: "Douanes & Immigration",
    desc: "Procédures DGM et DGDA, documents requis, déclaration de devises à l'arrivée.",
    link: "En savoir plus",
    href: '/guide/douanes-immigration',
    accent: '#003DA5',
  },
  {
    title: "Alertes WhatsApp",
    desc: "Recevez les mises à jour de votre vol directement sur WhatsApp, en temps réel.",
    link: "Inscrivez-vous gratuitement",
    href: '/vols/alertes-whatsapp',
    accent: '#009A44',
  },
  {
    title: "Temps d'attente",
    desc: "Obtenez une estimation du temps d'attente aux contrôles de sécurité et d'immigration.",
    link: "Voir les temps d'attente",
    href: '/vols/temps-attente',
    accent: '#CE1126',
  },
  {
    title: "Se rendre à l'aéroport",
    desc: "Découvrez les options de transport pour rejoindre ou quitter FIH depuis Kinshasa.",
    link: "Toutes les options",
    href: '/stationnement-transport/boulevard-lumumba',
    accent: '#003DA5',
  },
  {
    title: "Objets perdus",
    desc: "Si vous avez perdu un objet à bord ou dans l'aérogare, déposez une réclamation.",
    link: "Déposer une demande",
    href: '/guide/objets-trouves',
    accent: '#009A44',
  },
] as const;

export function InfosUtiles() {
  return (
    <section className="bg-white border-t border-[#E8E8E8]">
      <div className="container py-14 md:py-16">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-5 w-1 bg-[#CE1126]" />
          <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">
            Informations utiles
          </h2>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#E8E8E8]">
          {CARDS.map(card => (
            <Link
              key={card.href}
              to={card.href as never}
              className="group flex flex-col gap-3 p-7 border-b border-r border-[#E8E8E8] hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Colored accent bar */}
              <div
                className="h-0.5 w-8 transition-all duration-300 group-hover:w-14"
                style={{ background: card.accent }}
              />

              {/* Title */}
              <h3 className="font-bold text-[#1A1A1A] text-base leading-snug group-hover:text-[#003DA5] transition-colors">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#666] leading-relaxed flex-1">
                {card.desc}
              </p>

              {/* Link */}
              <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-[#003DA5] group-hover:gap-2.5 transition-all">
                {card.link}
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
