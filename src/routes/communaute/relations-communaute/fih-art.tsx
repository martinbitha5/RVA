import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Palette, Star, MapPin, ArrowLeft, ArrowRight,
  Music, Eye, Heart, Send,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/communaute/relations-communaute/fih-art')({
  component: FihArtPage,
  head: () => ({
    meta: [
      { title: "Programme FIH Art — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "FIH Art expose les artistes congolais dans les terminaux de l'Aéroport de N'djili — Chéri Samba, Moke, Bodo et les jeunes talents de Kinshasa." },
    ],
  }),
});

const ARTISTS = [
  {
    name: 'Chéri Samba',
    discipline: 'Peinture narrative',
    origin: 'Kinto-Mwenze, Sud-Kasaï',
    bio: "Icône mondiale de la peinture africaine contemporaine, Chéri Samba est connu pour ses œuvres colorées et politiques mêlant texte et image. Exposé dans les plus grands musées du monde, il est l'artiste emblématique du programme FIH Art.",
    works: 3,
    year: 2019,
    featured: true,
  },
  {
    name: 'Moke',
    discipline: 'Peinture populaire',
    origin: 'Kinshasa',
    bio: "Maître de la peinture populaire congolaise, Moke (1950–2001) a immortalisé la vie quotidienne kinoise. Ses tableaux vibrants de couleurs représentant les bars, les musiciens et les danseurs font partie de l'identité artistique du Congo.",
    works: 5,
    year: 2019,
    featured: true,
  },
  {
    name: 'Bodo (Baudouin Douma)',
    discipline: 'Sculpture & Installation',
    origin: 'Kinshasa',
    bio: "Sculpteur et plasticien kinois de renommée internationale, Bodo travaille le bois, le métal et les matériaux recyclés pour créer des œuvres puissantes qui interrogent l'identité africaine et la mémoire coloniale.",
    works: 2,
    year: 2020,
    featured: true,
  },
  {
    name: 'Sculpteurs Mbongo',
    discipline: 'Sculpture traditionnelle',
    origin: 'Fleuve Congo — Mbandaka',
    bio: "Collectif de sculpteurs perpétuant les traditions artistiques du fleuve Congo. Leurs œuvres en bois endémique ornent l'espace d'accueil du Terminal International, rappelant la richesse des civilisations du bassin du Congo.",
    works: 8,
    year: 2021,
    featured: false,
  },
  {
    name: 'Académie des Beaux-Arts de Kinshasa',
    discipline: 'Pluridisciplinaire',
    origin: 'Kinshasa',
    bio: "Programme de résidence offrant chaque année à 8 diplômés de l'Académie des Beaux-Arts de Kinshasa l'opportunité d'exposer leurs œuvres dans les espaces de FIH, avec un accompagnement financier de la RVA.",
    works: 12,
    year: 2022,
    featured: false,
  },
];

const LOCATIONS = [
  {
    name: 'Hall Departures Principal',
    area: 'Avant sécurité',
    works: '12 œuvres',
    desc: 'Grande galerie traversante — peintures grand format de Chéri Samba et Moke, sculptures Mbongo à l\'entrée.',
  },
  {
    name: 'Zone VIP & Salons',
    area: 'Après passeport',
    works: '8 œuvres',
    desc: 'Collection intime réservée aux passagers en zone internationale — installations de Bodo et jeunes talents.',
  },
  {
    name: 'Hall Arrivées',
    area: 'Zone accueil',
    works: '6 œuvres',
    desc: 'Première impression du Congo pour les voyageurs arrivant — fresques colorées célébrant Kinshasa et la rumba.',
  },
  {
    name: 'Corridors & Passerelles',
    area: 'Circulation',
    works: '94 œuvres',
    desc: 'Parcours artistique de 400 m à travers les couloirs du terminal — photographies, lithographies et dessins.',
  },
];

const VALUES = [
  { icon: Heart,  title: 'Valoriser l\'art congolais',     desc: 'Offrir une vitrine internationale aux artistes de RDC dans un lieu traversé par des millions de voyageurs.' },
  { icon: Eye,    title: 'Éduquer par la culture',         desc: 'Sensibiliser voyageurs et personnel à la richesse artistique et culturelle de la République Démocratique du Congo.' },
  { icon: Music,  title: 'Célébrer la rumba congolaise',   desc: 'Patrimoine UNESCO depuis 2021, la rumba est à l\'honneur dans les installations sonores et visuelles du terminal.' },
  { icon: Star,   title: 'Soutenir les jeunes talents',    desc: 'Chaque année, 8 artistes émergents bénéficient d\'une résidence et d\'un soutien financier de la RVA.' },
];

function FihArtPage() {
  return (
    <main id="main-content">

      {/* Hero artistique sombre */}
      <PageHero
        gradient="dark"
        eyebrow="Culture congolaise"
        title="Programme FIH Art"
        subtitle="L'Aéroport de N'djili est une galerie d'art à ciel ouvert. FIH Art expose les maîtres et jeunes talents de Kinshasa pour accueillir chaque voyageur avec la fierté culturelle de la RDC."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Communauté', href: '/communaute' },
          { label: 'Relations communautaires', href: '/communaute/relations-communaute' },
          { label: 'Programme FIH Art' },
        ]}
      />

      {/* Bande stats — fond sombre */}
      <div className="bg-[#0D0D14] border-b border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {[
              { v: '120+',  l: 'Œuvres exposées' },
              { v: '25',    l: 'Artistes partenaires' },
              { v: '4',     l: 'Espaces d\'exposition' },
              { v: '2019',  l: 'Année de lancement' },
            ].map(s => (
              <div key={s.l} className="flex flex-col items-center justify-center py-7 text-center">
                <span className="font-display text-3xl font-black text-rdc-yellow">{s.v}</span>
                <span className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-white/40">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="bg-[#0D0D14] py-16 md:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-rdc-yellow" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-yellow">Mission</p>
              </div>
              <h2 className="font-display mb-5 text-2xl font-bold text-white md:text-3xl">
                Kinshasa commence ici
              </h2>
              <p className="mb-4 leading-relaxed text-white/60">
                FIH Art est né d'une conviction simple : l'aéroport est la première impression que le voyageur garde d'un pays. À N'djili, cette impression est celle de la RDC dans toute sa magnificence — couleurs, formes, histoires.
              </p>
              <p className="leading-relaxed text-white/60">
                En partenariat avec l'Académie des Beaux-Arts de Kinshasa, la RVA acquiert et expose des œuvres originales dans tous les espaces du terminal, transformant chaque attente en expérience culturelle.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map(v => (
                <div key={v.title} className="border border-white/10 bg-white/5 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center bg-rdc-yellow/20">
                    <v.icon size={18} className="text-rdc-yellow" />
                  </div>
                  <p className="mb-1.5 text-sm font-bold text-white">{v.title}</p>
                  <p className="text-xs leading-relaxed text-white/50">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artistes */}
      <section className="bg-[#111118] py-16 md:py-20">
        <div className="container">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-rdc-yellow" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-yellow">Les artistes</p>
          </div>
          <h2 className="font-display mb-10 text-2xl font-bold text-white md:text-3xl">
            Maîtres & jeunes talents
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ARTISTS.map(a => (
              <div
                key={a.name}
                className={`flex flex-col border bg-[#0D0D14] overflow-hidden transition-colors hover:border-rdc-yellow/30 ${
                  a.featured ? 'border-rdc-yellow/30' : 'border-white/10'
                }`}
              >
                {/* Top bar */}
                <div className={`h-1 ${a.featured ? 'bg-rdc-yellow' : 'bg-white/10'}`} />

                <div className="flex flex-1 flex-col p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center bg-rdc-yellow/15">
                      <Palette size={18} className="text-rdc-yellow" />
                    </div>
                    {a.featured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-rdc-yellow/20 text-rdc-yellow">
                        <Star size={8} fill="currentColor" /> Vedette
                      </span>
                    )}
                  </div>

                  <h3 className="font-display mb-0.5 text-base font-bold text-white">{a.name}</h3>
                  <p className="mb-1 text-xs font-semibold text-rdc-yellow">{a.discipline}</p>
                  <div className="mb-4 flex items-center gap-1.5 text-xs text-white/40">
                    <MapPin size={10} />
                    <span>{a.origin}</span>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-white/55">{a.bio}</p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="text-center">
                      <p className="font-display text-xl font-bold text-white">{a.works}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Œuvres</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-xl font-bold text-white">{a.year}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Depuis</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lieux d'exposition */}
      <section className="bg-[#0D0D14] py-16 md:py-20">
        <div className="container">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-rdc-yellow" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-yellow">Parcours artistique</p>
          </div>
          <h2 className="font-display mb-10 text-2xl font-bold text-white md:text-3xl">
            4 espaces d'exposition dans le terminal
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {LOCATIONS.map((loc, i) => (
              <div key={loc.name} className="border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-start gap-4">
                  <span className="font-display text-4xl font-black text-rdc-yellow/20 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-bold text-white">{loc.name}</p>
                    <p className="text-xs text-white/40">{loc.area}</p>
                  </div>
                  <span className="ml-auto flex-shrink-0 rounded-full border border-rdc-yellow/30 px-2.5 py-0.5 text-[10px] font-bold text-rdc-yellow">
                    {loc.works}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/55">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidature artistes */}
      <section className="bg-[#111118] py-16 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-rdc-yellow" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-yellow">Artistes — Candidature</p>
              </div>
              <h2 className="font-display mb-4 text-2xl font-bold text-white md:text-3xl">
                Vous êtes artiste congolais ?
              </h2>
              <p className="mb-6 leading-relaxed text-white/60">
                FIH Art sélectionne chaque année de nouveaux artistes émergents en partenariat avec l'Académie des Beaux-Arts de Kinshasa. Si vous êtes artiste plasticien congolais et souhaitez exposer vos œuvres dans les terminaux de N'djili, envoyez votre dossier au service culturel de la RVA.
              </p>
              <div className="space-y-3">
                {[
                  'Portfolio de 10 à 20 œuvres récentes (photos HD)',
                  'Note biographique et démarche artistique (max 500 mots)',
                  'Références et expositions précédentes si applicable',
                  'Contact : culturel@fih-rva.com — Objet : Candidature FIH Art',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rdc-yellow" />
                    <p className="text-sm text-white/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="border border-rdc-yellow/20 bg-rdc-yellow/5 p-8">
              <Palette size={36} className="mb-5 text-rdc-yellow" />
              <h3 className="font-display mb-2 text-xl font-bold text-white">Postuler à FIH Art</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/60">
                Appel à candidatures ouvert en permanence. La prochaine sélection aura lieu en janvier 2026.
              </p>
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-rdc-yellow px-6 py-3 text-sm font-bold text-rdc-anthracite transition-colors hover:bg-rdc-yellow/85"
              >
                <Send size={14} /> Envoyer ma candidature
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Liens retour */}
      <div className="bg-[#0D0D14] border-t border-white/10">
        <div className="container py-8">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/communaute/relations-communaute"
              className="flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={13} /> Relations communautaires
            </Link>
            <Link
              to="/communaute/relations-communaute/initiatives"
              className="flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            >
              Initiatives locales <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
