import { createFileRoute, Link } from '@tanstack/react-router';
import { Building2, Plane, Users, Globe, Award, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/a-propos')({
  component: AProposPage,
  head: () => ({
    meta: [
      { title: "À propos de la RVA et FIH — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Présentation de l'Aéroport International de N'djili (FIH/FZAA), Kinshasa, RDC — géré par la Régie des Voies Aériennes (RVA) depuis 1970." },
    ],
  }),
});

const STATS = [
  { value: '1953',    label: 'Inauguré en',               sub: "Sous l'administration belge", Icon: Building2 },
  { value: '4 700 m', label: 'Piste 06/24',               sub: 'Code OACI — Cat. 4E',          Icon: Plane },
  { value: '1 M+',    label: 'Passagers / an (capacité)', sub: 'Terminal international 2015',   Icon: Users },
  { value: '313 m',   label: 'Altitude',                  sub: '1 027 ft — Commune de Nsele',  Icon: Globe },
];

const MISSIONS = [
  'Gestion, développement et exploitation des infrastructures aéroportuaires de la République Démocratique du Congo',
  'Garantir la sécurité, la sûreté et la fluidité du trafic aérien conformément aux normes OACI',
  'Offrir aux passagers et aux compagnies aériennes un service de qualité internationale',
  "Contribuer au développement économique de Kinshasa, de la RDC et de l'Afrique centrale",
  'Modernisation continue des équipements selon les standards internationaux (OACI Annexe 14)',
  'Engagement envers les communautés riveraines de Nsele, Masina et Kimbanseke',
];

const FIH_NUMBERS = [
  { label: 'Compagnies aériennes', value: '17+', color: '#003DA5' },
  { label: 'Destinations directes', value: '34', color: '#003DA5' },
  { label: 'Aéroports RVA en RDC', value: '47', color: '#CE1126' },
  { label: 'Employés directs RVA', value: '1 200+', color: '#009A44' },
];

const CERTIFICATIONS = [
  { name: 'OACI — Conformité aux normes et pratiques recommandées (SARP)', status: 'active' },
  { name: 'IATA — Membre actif et certifié depuis 1974', status: 'active' },
  { name: 'BASA — Accords bilatéraux avec plus de 30 États', status: 'active' },
  { name: 'ISO 9001 — Certification qualité (dossier en cours)', status: 'pending' },
  { name: 'ACA — Airport Carbon Accreditation (en préparation)', status: 'pending' },
];

function AProposPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Terminal international de l'Aéroport N'djili, Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · RVA</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">À propos de la RVA et de l'Aéroport FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">À propos</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map(({ value, label, sub, Icon }) => (
              <div key={label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center bg-[#003DA5]/10">
                  <Icon size={18} className="text-[#003DA5]" />
                </div>
                <p className="text-3xl font-bold text-[#003DA5] leading-none">{value}</p>
                <p className="mt-1.5 text-xs font-bold text-[#1a1a1a]">{label}</p>
                <p className="mt-0.5 text-[10px] text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Présentation RVA */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Régie des Voies Aériennes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">L'Aéroport International de N'djili</h2>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                L'Aéroport International de N'djili (code IATA : <strong className="text-[#1a1a1a]">FIH</strong>, code OACI : <strong className="text-[#1a1a1a]">FZAA</strong>) est le principal aéroport de la République Démocratique du Congo et le hub aérien majeur de l'Afrique centrale. Il est situé dans la Commune de Nsele, à environ 25 km à l'est du centre-ville de Kinshasa, accessible par le Boulevard Lumumba.
              </p>
              <p>
                Inauguré en 1953 comme base secondaire de la <strong className="text-[#1a1a1a]">Sabena</strong> belge, l'aéroport a traversé toutes les grandes étapes de l'histoire congolaise. Il accueille aujourd'hui <strong className="text-[#1a1a1a]">plus de 17 compagnies aériennes internationales</strong> desservant 34 destinations directes sur 4 continents. Le terminal international, ouvert en juin 2015, offre une capacité d'un million de passagers par an.
              </p>
              <p>
                L'aéroport est géré par la <strong className="text-[#1a1a1a]">Régie des Voies Aériennes (RVA)</strong>, établissement public congolais fondé en <strong className="text-[#1a1a1a]">1970</strong> par décret présidentiel, qui administre l'ensemble du réseau aéroportuaire national — 47 aéroports et aérodromes opérationnels, dont Lubumbashi (FBM), Goma (GOM), Bukavu (BKY), Mbuji-Mayi (MJM) et Kisangani (FKI).
              </p>
            </div>

            {/* Mission */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-3">Notre mission</p>
              <ul className="space-y-3">
                {MISSIONS.map(m => (
                  <li key={m} className="flex items-start gap-3 text-sm text-gray-600">
                    <Award size={13} className="mt-0.5 shrink-0 text-[#FFCE00]" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FIH en chiffres */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">FIH en chiffres</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Le hub de l'Afrique centrale</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FIH_NUMBERS.map(n => (
              <div key={n.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold leading-none" style={{ color: n.color }}>{n.value}</p>
                <p className="mt-2 text-xs text-gray-500 leading-snug">{n.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Qualité & conformité</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Certifications & Affiliations</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map(c => (
              <div key={c.name} className="flex items-center gap-3 border border-[#e8e8e8] bg-white px-4 py-3">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.status === 'active' ? 'bg-[#009A44]' : 'bg-amber-400'}`} />
                <p className="text-sm text-[#1a1a1a]">{c.name}</p>
                {c.status === 'pending' && (
                  <span className="ml-auto text-[10px] font-bold text-amber-600 shrink-0">En cours</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Direction générale & Coordonnées */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Direction générale RVA</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Coordonnées officielles</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 border border-[#e8e8e8] bg-white p-5">
              <MapPin size={16} className="shrink-0 text-[#003DA5] mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#1a1a1a] mb-1">Adresse</p>
                <p className="text-sm text-gray-500 leading-relaxed">Boulevard Lumumba, Commune de Nsele<br />Kinshasa, République Démocratique du Congo</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-[#e8e8e8] bg-white p-5">
              <Phone size={16} className="shrink-0 text-[#003DA5] mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#1a1a1a] mb-1">Standard téléphonique</p>
                <p className="text-sm text-gray-500">+243 XX XXX XXXX</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Disponible 24h/24, 7j/7</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border border-[#e8e8e8] bg-white p-5">
              <Mail size={16} className="shrink-0 text-[#003DA5] mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#1a1a1a] mb-1">Contact</p>
                <a href="mailto:info@fih-rva.com" className="text-sm text-[#003DA5] hover:underline">info@fih-rva.com</a>
                <br />
                <a href="mailto:contact@fih-rva.com" className="text-sm text-[#003DA5] hover:underline">contact@fih-rva.com</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">En savoir plus</p>
              <h2 className="text-xl font-bold text-white mb-1">Histoire et projets de l'aéroport</h2>
              <p className="text-sm text-white/55 max-w-lg">Découvrez 70 ans d'histoire de FIH et le programme d'investissement 2024–2028 pour la modernisation de l'aéroport.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/corporate/historique" className="flex items-center gap-2 border border-white/30 px-5 py-2.5 text-sm font-bold text-white hover:border-white transition-colors">
                Historique <ArrowRight size={13} />
              </Link>
              <Link to="/corporate/projets-avenir" className="flex items-center gap-2 bg-[#FFCE00] px-5 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
                Projets d'avenir <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
