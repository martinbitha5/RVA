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
  },
  build: {
    // Raise warning threshold (vendor split handles the large bundle)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          // TanStack ecosystem
          if (
            id.includes('@tanstack/react-router') ||
            id.includes('@tanstack/router-core') ||
            id.includes('@tanstack/react-query') ||
            id.includes('@tanstack/react-table') ||
            id.includes('@tanstack/react-virtual')
          ) {
            return 'tanstack';
          }
          // Supabase client
          if (id.includes('@supabase/')) {
            return 'supabase';
          }
          // Radix UI primitives (used by shadcn/ui)
          if (id.includes('@radix-ui/')) {
            return 'radix';
          }
          // Lucide icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          // Framer Motion
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          // Zod
          if (id.includes('zod')) {
            return 'zod';
          }
          // Other node_modules go into a shared vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
