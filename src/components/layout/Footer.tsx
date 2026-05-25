import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

/* ─── Column helpers ────────────────────────────────────────── */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-1 text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      to={href as never}
      className="block py-1 text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white"
    >
      {children}
    </Link>
  );
}

/* ─── Social icons ──────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com',
    icon: Twitter,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: Youtube,
  },
];

/* ─── Footer ────────────────────────────────────────────────── */
export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-rdc-anthracite text-white" aria-label="Pied de page">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-rdc-blue via-rdc-yellow to-rdc-green" />

      {/* Main footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">

          {/* Column 1 — FIH */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo RVA + FIH */}
            <Link
              to="/"
              className="mb-5 flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <img
                src="/images/rva-logo.png"
                alt="RVA"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
              <div className="h-8 w-px bg-white/20" />
              <span className="font-display text-[36px] font-black leading-none tracking-tight text-rdc-yellow">
                FIH
              </span>
              <div className="leading-[1.2] text-[11px]">
                <p className="font-normal text-white/60">Aéroport</p>
                <p className="font-normal text-white/60">International</p>
                <p className="font-bold text-white">de N&apos;djili</p>
              </div>
            </Link>
            <p className="mb-5 text-xs leading-relaxed text-white/50">
              {t('footer.tagline')}
            </p>
            <FooterHeading>{t('footer.fihColumn')}</FooterHeading>
            <nav aria-label="Navigation FIH">
              <FooterLink href="/corporate/a-propos">{t('corporate.about')}</FooterLink>
              <FooterLink href="/corporate/historique">{t('corporate.history')}</FooterLink>
              <FooterLink href="/corporate/projets-avenir">{t('corporate.futureProjects')}</FooterLink>
              <FooterLink href="/corporate/carriere/offres-emploi">{t('corporate.careers')}</FooterLink>
            </nav>
          </div>

          {/* Column 2 — Services */}
          <div>
            <FooterHeading>{t('footer.servicesColumn')}</FooterHeading>
            <nav aria-label="Navigation Services">
              <FooterLink href="/vols">{t('nav.flights')}</FooterLink>
              <FooterLink href="/vols/departs">{t('flights.departures')}</FooterLink>
              <FooterLink href="/vols/arrivees">{t('flights.arrivals')}</FooterLink>
              <FooterLink href="/stationnement-transport/formulaire">{t('parking.parkingFih')}</FooterLink>
              <FooterLink href="/boutiques-restaurants/repertoire">{t('shops.directory')}</FooterLink>
              <FooterLink href="/guide/quitter-kinshasa">{t('guide.leavingKinshasa')}</FooterLink>
              <FooterLink href="/guide/atterrir-kinshasa">{t('guide.arrivingKinshasa')}</FooterLink>
            </nav>
          </div>

          {/* Column 3 — Corporate */}
          <div>
            <FooterHeading>{t('footer.corporateColumn')}</FooterHeading>
            <nav aria-label="Navigation Corporate">
              <FooterLink href="/corporate/gouvernance">{t('corporate.governance')}</FooterLink>
              <FooterLink href="/corporate/partenariats-commerciaux/apercu-fih">{t('corporate.partnerships')}</FooterLink>
              <FooterLink href="/corporate/services-aeriens/fret">{t('corporate.cargo')}</FooterLink>
              <FooterLink href="/corporate/surete-securite">{t('corporate.safetyAndSecurity')}</FooterLink>
              <FooterLink href="/medias">Médias</FooterLink>
            </nav>
          </div>

          {/* Column 4 — Communauté */}
          <div>
            <FooterHeading>{t('footer.communityColumn')}</FooterHeading>
            <nav aria-label="Navigation Communauté">
              <FooterLink href="/communaute/environnement-durabilite">
                {t('community.environmentSustainability')}
              </FooterLink>
              <FooterLink href="/communaute/environnement-sonore">
                {t('community.noiseEnvironment')}
              </FooterLink>
              <FooterLink href="/communaute/relations-communaute/initiatives">
                {t('community.initiatives')}
              </FooterLink>
              <FooterLink href="/communaute/relations-communaute/fih-art">
                {t('community.fihArt')}
              </FooterLink>
              <FooterLink href="/communaute/environnement-sonore/plaintes">
                {t('community.noiseComplaints')}
              </FooterLink>
            </nav>
          </div>

          {/* Column 5 — Contact */}
          <div>
            <FooterHeading>{t('footer.contactColumn')}</FooterHeading>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-rdc-yellow" />
                <span className="leading-snug">{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <Phone size={14} className="flex-shrink-0 text-rdc-yellow" />
                <a href="tel:+243000000000" className="hover:text-white transition-colors">
                  {t('footer.phone')}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <Mail size={14} className="flex-shrink-0 text-rdc-yellow" />
                <a href="mailto:contact@fih-rva.com" className="hover:text-white transition-colors">
                  {t('footer.email')}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <Clock size={14} className="flex-shrink-0 text-rdc-yellow" />
                <span>{t('footer.support24h')}</span>
              </div>
            </address>

            {/* Social */}
            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                {t('footer.followUs')}
              </p>
              <div className="flex gap-2.5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white/60 transition-colors hover:bg-rdc-blue hover:text-white"
                  >
                    <s.icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Legal bottom */}
      <div className="container py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Legal links */}
          <nav
            aria-label="Liens légaux"
            className="flex flex-wrap gap-x-4 gap-y-1.5"
          >
            {[
              { href: '/plan-de-site', label: t('footer.legalLinks.sitemap') },
              { href: '/conditions-utilisation', label: t('footer.legalLinks.terms') },
              { href: '/politique-confidentialite', label: t('footer.legalLinks.privacy') },
              { href: '/cookies', label: t('footer.legalLinks.cookies') },
              { href: '/accessibilite', label: t('footer.legalLinks.accessibility') },
              { href: '/medias', label: t('footer.legalLinks.media') },
              { href: '/contact', label: t('footer.legalLinks.contact') },
              { href: '/faq', label: t('footer.legalLinks.faq') },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href as never}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-white/30">
            {t('footer.copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
