import { Component, type ReactNode } from 'react';
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const Route = createRootRoute({
  component: RootLayout,
});

/* ── Error boundary pour éviter les écrans blancs sur erreur JS ── */
interface EBState { hasError: boolean; message: string }

class AppErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  state: EBState = { hasError: false, message: '' };

  static getDerivedStateFromError(err: unknown): EBState {
    const message = err instanceof Error ? err.message : String(err);
    return { hasError: true, message };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="h-1 w-20 bg-gradient-to-r from-rdc-blue via-rdc-yellow to-rdc-red" />
        <h1 className="font-display text-2xl font-bold text-rdc-anthracite">
          Une erreur est survenue
        </h1>
        {import.meta.env.DEV && (
          <pre className="max-w-lg rounded-xl bg-red-50 p-4 text-left text-xs text-red-700 overflow-auto">
            {this.state.message}
          </pre>
        )}
        <Link to="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    );
  }
}

function RootLayout() {
  return (
    <AppErrorBoundary>
      <div className="flex min-h-screen flex-col bg-white text-foreground">
        <Header />
        <div className="flex-1 pt-16 md:pt-[70px]">
          <Outlet />
        </div>
        <Footer />
        {import.meta.env.DEV ? (
          <TanStackRouterDevtools position="bottom-right" />
        ) : null}
      </div>
    </AppErrorBoundary>
  );
}
