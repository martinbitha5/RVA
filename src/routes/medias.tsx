import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Newspaper, Camera, Video, Download, Mail, Phone,
  ArrowRight, Calendar, Tag, ExternalLink,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/medias')({
  component: MediasPage,
  head: () => ({
    meta: [
      { title: "Salle de presse & Médias — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Communiqués de presse, accréditation journaliste, contacts médias et ressources visuelles de l'Aéroport International de N'djili (FIH)." },
    ],
  }),
});

const PRESS_RELEASES = [
  {
    date: '12 mai 2026',
    category: 'Développement',
    title: "FIH annonce l'ouverture de deux nouvelles liaisons directes vers Paris-CDG et Dubaï",
    excerpt: "La Régie des Voies Aériennes confirme l'entrée en service de deux nouvelles liaisons opérées par Air France et Emirates à compter du 15 juin 2026.",
    tag: 'Nouveau',
  },
  {
    date: '28 avril 2026',
    category: 'Infrastructure',
    title: 'Avancement des travaux de réhabilitation de la piste 01/19 — Rapport trimestriel T1 2026',
    excerpt: "Les travaux de modernisation de la piste principale avancent conformément au calendrier. 60% des travaux sont achevés à fin avril 2026. Livraison prévue en septembre 2026.",
    tag: null,
  },
  {
    date: '15 mars 2026',
    category: 'Trafic',
    title: "FIH enregistre un record de trafic en 2025 : 2,1 millions de passagers",
    excerpt: "L'Aéroport International de N'djili a accueilli 2,1 millions de passagers en 2025, soit une hausse de +16,7% par rapport à 2024, confirmant la dynamique de croissance.",
    tag: null,
  },
  {
    date: '2 février 2026',
    category: 'Partenariat',
    title: 'Signature du partenariat entre la RVA et le groupe hôtelier Radisson pour FIH',
    excerpt: "La RVA et Radisson Hotel Group ont signé une convention de partenariat pour l'ouverture d'un hôtel aéroportuaire 4 étoiles connecté au terminal international d'ici 2028.",
    tag: null,
  },
];

const MEDIA_CONTACTS = [
  {
    name: 'Service de presse RVA',
    role: 'Relations médias — Institutions & Corporate',
    email: 'presse@rva.cd',
    phone: '+243 XX XXX XXXX',
  },
  {
    name: 'Direction de la communication FIH',
    role: "Communication aéroportuaire & urgences médias",
    email: 'communication@fih.cd',
    phone: '+243 XX XXX XXXX',
  },
];

const RESOURCES = [
  {
    icon: Camera,
    title: 'Photothèque officielle',
    desc: "Images haute résolution de l'aéroport, des terminaux, des pistes et des opérations. Libre d'utilisation avec crédit RVA/FIH.",
    action: 'Télécharger le pack photos',
    color: 'text-rdc-blue',
    bg: 'bg-rdc-blue/10',
  },
  {
    icon: Video,
    title: 'Vidéothèque',
    desc: "Séquences vidéo et b-roll des terminaux, pistes, opérations et événements de l'aéroport. Format MP4 HD et 4K disponibles.",
    action: 'Accéder aux vidéos',
    color: 'text-rdc-red',
    bg: 'bg-rdc-red/10',
  },
  {
    icon: Download,
    title: 'Kit de presse',
    desc: "Dossier de presse complet : fiche descriptive FIH, statistiques clés 2025, biographies direction RVA, logos et charte graphique.",
    action: 'Télécharger le kit (PDF)',
    color: 'text-rdc-green',
    bg: 'bg-rdc-green/10',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Développement': 'bg-rdc-blue/10 text-rdc-blue',
  'Infrastructure': 'bg-amber-100 text-amber-700',
  'Trafic':        'bg-rdc-green/10 text-rdc-green',
  'Partenariat':   'bg-purple-100 text-purple-700',
};

function MediasPage() {
  return (
    <main id="main-content">

      <PageHero
        image="/images/fih-hero-2.jpg"
        eyebrow="Salle de presse"
        title="Médias & Presse"
        subtitle="Retrouvez les derniers communiqués de presse de la RVA, les ressources visuelles officielles et les contacts de notre service de communication."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Médias' },
        ]}
      />

      {/* Contacts rapides */}
      <div className="bg-rdc-anthracite">
        <div className="container py-8">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Contacts presse :</p>
            {MEDIA_CONTACTS.map(c => (
              <div key={c.email} className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <a href={`mailto:${c.email}`} className="text-xs text-rdc-yellow hover:text-white transition-colors">
                    {c.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-14 md:py-20">
        <div className="grid gap-14 lg:grid-cols-3">

          {/* Communiqués de presse */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-rdc-blue" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Communiqués</p>
            </div>
            <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
              Dernières actualités presse
            </h2>

            <div className="space-y-5">
              {PRESS_RELEASES.map(pr => (
                <article key={pr.title} className="group border border-border bg-white p-6 transition-all hover:border-rdc-blue/30 hover:shadow-sm">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${CATEGORY_COLORS[pr.category] ?? 'bg-muted text-muted-foreground'}`}>
                      {pr.category}
                    </span>
                    {pr.tag && (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-rdc-red text-white">
                        <Tag size={8} /> {pr.tag}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                      <Calendar size={10} /> {pr.date}
                    </span>
                  </div>
                  <h3 className="font-display mb-2 text-base font-bold text-rdc-anthracite group-hover:text-rdc-blue transition-colors leading-snug">
                    {pr.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pr.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rdc-blue">
                    Lire le communiqué <ArrowRight size={11} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-8">

            {/* Ressources */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-rdc-blue" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Ressources</p>
              </div>
              <h2 className="font-display mb-5 text-lg font-bold text-rdc-anthracite">
                Ressources médias
              </h2>
              <div className="space-y-3">
                {RESOURCES.map(r => (
                  <div key={r.title} className="border border-border bg-white p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center ${r.bg}`}>
                        <r.icon size={16} className={r.color} />
                      </div>
                      <p className="font-bold text-rdc-anthracite text-sm">{r.title}</p>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                    <button className={`flex items-center gap-1.5 text-xs font-bold ${r.color}`}>
                      <Download size={11} /> {r.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Accréditation */}
            <div className="border border-border bg-rdc-blue/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Newspaper size={16} className="text-rdc-blue" />
                <p className="font-bold text-rdc-anthracite">Accréditation presse</p>
              </div>
              <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                Journalistes et photographes souhaitant accéder aux zones de reportage de FIH (piste, tarmac, salles d'embarquement) : envoyez votre demande au service communication.
              </p>
              <div className="space-y-2.5">
                <a
                  href="mailto:presse@rva.cd"
                  className="flex items-center gap-2 text-sm text-rdc-blue hover:text-rdc-blue/80 transition-colors"
                >
                  <Mail size={13} /> presse@rva.cd
                </a>
                <a
                  href="tel:+243000000000"
                  className="flex items-center gap-2 text-sm text-rdc-blue hover:text-rdc-blue/80 transition-colors"
                >
                  <Phone size={13} /> +243 XX XXX XXXX
                </a>
              </div>
            </div>

            {/* Contacts détaillés */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Contacts détaillés</p>
              <div className="space-y-4">
                {MEDIA_CONTACTS.map(c => (
                  <div key={c.email} className="border-l-2 border-rdc-blue pl-4">
                    <p className="text-sm font-bold text-rdc-anthracite">{c.name}</p>
                    <p className="mb-2 text-xs text-muted-foreground">{c.role}</p>
                    <a href={`mailto:${c.email}`} className="block text-xs text-rdc-blue hover:underline">
                      {c.email}
                    </a>
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="text-xs text-muted-foreground">
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Liens connexes */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { to: '/corporate/a-propos', label: 'À propos de FIH', desc: 'Histoire, mission et gouvernance de la RVA' },
            { to: '/corporate/projets-avenir', label: 'Projets & Avenir', desc: 'Extension terminale 2027, modernisation piste' },
            { to: '/contact', label: 'Contactez-nous', desc: 'Service général et demandes institutionnelles' },
          ].map(l => (
            <Link
              key={l.to}
              to={l.to as never}
              className="group flex items-start gap-4 border border-border bg-white p-5 transition-all hover:border-rdc-blue/30 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-rdc-blue/8 text-rdc-blue transition-colors group-hover:bg-rdc-blue group-hover:text-white">
                <ExternalLink size={16} />
              </div>
              <div>
                <p className="mb-0.5 text-sm font-semibold text-rdc-anthracite">{l.label}</p>
                <p className="text-xs text-muted-foreground">{l.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
