import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-white">
        <div className="container flex items-center justify-between py-4">
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-rdc-blue text-rdc-yellow font-display text-base font-bold">
              FIH
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Régie des Voies Aériennes
              </p>
              <p className="font-display text-sm font-bold text-rdc-anthracite">
                Aéroport International de N&apos;djili
              </p>
            </div>
          </Link>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Étape&nbsp;1&nbsp;·&nbsp;Initialisation
          </p>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-rdc-anthracite text-white/80">
        <div className="container py-8 text-center text-xs">
          <p>
            © {new Date().getFullYear()} Régie des Voies Aériennes — République
            Démocratique du Congo
          </p>
          <p className="mt-1 text-white/50">
            Boulevard Lumumba, Commune de Nsele, Kinshasa
          </p>
        </div>
      </footer>

      {import.meta.env.DEV ? (
        <TanStackRouterDevtools position="bottom-right" />
      ) : null}
    </div>
  );
}
