import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    proxy: {
      // Proxy AviationStack (free plan = HTTP only → Vite proxies it for us)
      '/api/av': {
        target: 'http://api.aviationstack.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/av/, '/v1'),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
  },
});
