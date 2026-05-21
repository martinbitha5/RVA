import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-foreground">
      {/* Header is fixed — no AlertBanner pushing it down */}
      <Header />
      <div className="flex-1 pt-[70px]">
        <Outlet />
      </div>
      <Footer />
      {import.meta.env.DEV ? (
        <TanStackRouterDevtools position="bottom-right" />
      ) : null}
    </div>
  );
}
