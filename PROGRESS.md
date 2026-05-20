# PROGRESS — Site Aéroport International de N'djili (FIH)

> Journal d'avancement du chantier. Une ligne par étape, déviation ou décision structurante.

---

## Légende

- ✅ Terminé et validé
- 🚧 En cours
- ⏳ En attente (dépendance externe)
- ⚠️ Déviation du CLAUDE.md (justifiée)
- ❌ Bloqué

---

## ÉTAPE 0 — Lecture et préparation ✅

- ✅ `CLAUDE.md` lu intégralement (v1.0, 14 sections)
- ✅ Compréhension confirmée auprès du commanditaire
- ✅ Décisions opérationnelles arrêtées (voir « Déviations » ci-dessous)

## ÉTAPE 1 — Initialisation du projet 🚧

- ✅ Scaffolding manuel Vite + React 18 + TypeScript strict à la racine `C:\Users\GOBLAIRE\Desktop\vie\`
  - `package.json`, `tsconfig.json` (avec references), `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `public/favicon.svg`
  - `src/main.tsx`, `src/App.tsx` (placeholder identité visuelle RDC)
- ✅ Structure de dossiers complète conforme à `CLAUDE.md` §5
  - `src/routes/{vols, stationnement-transport, boutiques-restaurants, guide, corporate/*, communaute/*, compte}`
  - `src/components/{layout, flights, ui, home, forms}`
  - `src/{lib, lib/mocks, hooks, stores, types, locales, styles}`
  - `supabase/{migrations, functions}`
- ✅ Tailwind v3 configuré avec thème RDC custom (palette bleu/jaune/rouge/vert + sand/cream/anthracite, fonts Inter + Playfair Display)
- ✅ shadcn/ui scaffolded (`components.json`, `src/lib/utils.ts` avec `cn()`), CSS variables HSL calibrées sur l'identité RDC
- ✅ ESLint v9 (flat config) + TypeScript ESLint + Prettier (preset 2 espaces, single quotes, plugin tailwindcss)
- ✅ `.env.example` complet (CLAUDE.md §12 — toutes vars frontend + Edge Functions)
- ✅ `.gitignore`, `.editorconfig`, `.prettierignore`
- ⏳ `npm install` à exécuter
- ⏳ TanStack Router file-based routing (Tâche #4)
- ⏳ Vérification build + `git init` (Tâche #8)

---

## Déviations du CLAUDE.md (validées avec le commanditaire)

| # | Sujet | Spécifié | Choisi | Raison |
|---|---|---|---|---|
| D1 | Tailwind CSS | v4 + `@tailwindcss/vite` | **v3.4.x** + PostCSS classique | Compat shadcn/ui — v4 encore jeune en mai 2026 pour ce preset |
| D2 | Package manager | non spécifié (implicite npm/pnpm) | **npm** | pnpm non installé sur le poste — pas de blocage |
| D3 | Repo GitHub | « Conventional Commits » + « PR reviews » §11 | Repo distant créé manuellement par le commanditaire (URL à fournir), `gh` CLI absent | Outil non disponible sur le poste |

Ces déviations restent compatibles avec les exigences globales : TypeScript strict, accessibilité, performance, identité visuelle, stack TanStack/Supabase intactes.

---

## Prochaines étapes

- ÉTAPE 2 — Supabase (schéma + migrations + RLS + seeds) → clés API à fournir
- ÉTAPE 3 — Layout racine + Header (mega-menu) + Footer + i18n FR/EN
- ÉTAPE 4 — Page d'accueil complète (`/`)
- ÉTAPE 5 — Section Vols (Départs / Arrivées / Compagnies / Alertes / Temps d'attente / Plans)
- … (voir prompt maître)
