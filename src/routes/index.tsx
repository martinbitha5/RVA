import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="container py-16 md:py-24">
      <p className="font-medium text-xs uppercase tracking-[0.25em] text-rdc-blue">
        Mbote · Bienvenue · Welcome
      </p>
      <h1 className="font-display mt-4 text-5xl font-bold leading-[1.05] text-rdc-anthracite md:text-7xl">
        Votre porte d&apos;entrée
        <br />
        vers le <span className="text-rdc-blue">Congo</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rdc-anthracite/75">
        L&apos;Aéroport International de N&apos;djili — code IATA{' '}
        <strong className="font-semibold">FIH</strong>, code OACI{' '}
        <strong className="font-semibold">FZAA</strong> — relie Kinshasa au
        monde et à l&apos;ensemble du territoire congolais. Ce portail vous
        accompagne avant, pendant et après votre vol.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PaletteCard label="Bleu RDC" hex="#003DA5" textClass="text-white" bgClass="bg-rdc-blue" />
        <PaletteCard label="Jaune solaire" hex="#FFCE00" textClass="text-rdc-anthracite" bgClass="bg-rdc-yellow" />
        <PaletteCard label="Rouge sang" hex="#CE1126" textClass="text-white" bgClass="bg-rdc-red" />
        <PaletteCard label="Vert drapeau" hex="#009A44" textClass="text-white" bgClass="bg-rdc-green" />
      </div>

      <div className="mt-16 rounded-lg border border-border bg-card p-6">
        <p className="font-display text-sm uppercase tracking-wider text-muted-foreground">
          État du chantier
        </p>
        <p className="mt-2 text-rdc-anthracite">
          <strong>ÉTAPE 1 / 14</strong> — Initialisation du projet. Stack Vite +
          React 18 + TypeScript strict + TanStack Router/Query/Table/Form +
          Tailwind v3 + shadcn/ui + Supabase opérationnelle. Prochaine étape :
          schéma de base de données + migrations Supabase.
        </p>
      </div>
    </section>
  );
}

function PaletteCard({
  label,
  hex,
  bgClass,
  textClass,
}: {
  label: string;
  hex: string;
  bgClass: string;
  textClass: string;
}) {
  return (
    <div
      className={`rounded-lg ${bgClass} ${textClass} p-5 transition-transform hover:-translate-y-1`}
    >
      <p className="font-display text-lg font-semibold">{label}</p>
      <p className="mt-1 font-mono text-xs opacity-80">{hex}</p>
    </div>
  );
}
