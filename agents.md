# agents.md — AI Agent Guidance

> **For AI coding agents working in this codebase.**
> Read this file first, then read the sub-folder `agents.md` closest to the file you're editing.

---

## Project Snapshot

- **Type**: Single Next.js 16 frontend application (not a monorepo)
- **Tech**: Next.js 16 App Router, React 19, TypeScript 5, Tailwind v4, shadcn/ui, GSAP
- **Package Manager**: pnpm
- **Sub-packages**: `app/` has its own [`agents.md`](app/agents.md)
- **Conventions**: `rules.md` (code), `design-system.md` (UI), `animations.md` (GSAP)

---

## Project Rules Reference

> **Before creating or modifying ANY file, read [`rules.md`](./rules.md).**
> It defines folder structure, naming, documentation headers, imports, commits,
> and all other code conventions. These rules are NOT repeated here.

**Quick links into `rules.md`:**
- Folder & hybrid architecture → `rules.md § 1-2`
- Feature module rules → `rules.md § 3`
- File & component naming → `rules.md § 4-5`
- Variable & function naming → `rules.md § 5`
- Documentation & comments → `rules.md § 6`
- Imports → `rules.md § 7`
- Git & commits → `rules.md § 9`

---

## Design System Reference

> **Before building ANY user-facing UI, read [`design-system.md`](./design-system.md).**
> It defines typography (4 sizes, 2 weights), spacing (8pt grid), colors
> (60/30/10 rule), shadcn/ui patterns, Tailwind v4 setup, dark mode, and
> accessibility. These rules are NOT repeated here.

**Quick links into `design-system.md`:**
- Typography → `design-system.md § 2`
- Spacing (8pt grid) → `design-system.md § 3`
- Color (60/30/10) → `design-system.md § 4`
- Tailwind v4 setup → `design-system.md § 5`
- Component architecture → `design-system.md § 6`
- UI review checklist → `design-system.md § 10`

---

## Animation System Reference

> **Before creating or modifying ANY animation, read [`animations.md`](./animations.md).**
> It defines GSAP setup, the mandatory useGSAP hook pattern, tween and timeline rules,
> stagger, ScrollTrigger, gsap.matchMedia() for responsive animations, animation tokens,
> and performance rules. These rules are NOT repeated here.

**Quick links into `animations.md`:**
- Setup & plugin registration → `animations.md § 1`
- Folder structure & file placement → `animations.md § 2`
- Naming (`anim-` prefix, `Tl`/`St`/`Mm` suffixes) → `animations.md § 3`
- Mandatory `useGSAP` pattern (all 5 rules) → `animations.md § 4`
- Tween methods + `gsap.set()` + `clearProps` → `animations.md § 5-6`
- Timeline, stagger, ScrollTrigger → `animations.md § 7-9`
- `gsap.matchMedia()` responsive animations → `animations.md § 10`
- `gsap.utils` toolkit → `animations.md § 11`
- Reactive animations + dependencies → `animations.md § 12`
- Performance & `prefers-reduced-motion` → `animations.md § 15`

---

## Root Setup Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Lint
pnpm lint

# Type check (add to package.json if needed)
npx tsc --noEmit
```

---

## Security & Secrets

- **Never** commit API keys, tokens, or passwords.
- `.env.example` (committed, dummy values) → `.env` / `.env.local` (gitignored).
- `UPPER_SNAKE_CASE` for all env vars.
- Client-exposed vars: prefix with `NEXT_PUBLIC_`.
- Never log PII in production.
- See `rules.md § 10` for full details.

---

## JIT Index — Directory Map

| Area | Path | Agent Guidance | UI? | Anim? |
|------|------|----------------|-----|-------|
| App Router | `app/` | [`app/agents.md`](app/agents.md) | Yes | Yes |

**Quick-find commands:**

```bash
# Find all TypeScript/TSX files
Get-ChildItem -Recurse -Include *.ts,*.tsx

# Find all animation hooks
Get-ChildItem -Recurse -Filter "use*Animation.ts"

# Find GSAP imports (should all come from gsapConfig)
Select-String -Path "*.ts","*.tsx" -Pattern "from ['\"]gsap['\"]"

# Find anim- prefixed classes
Select-String -Path "*.tsx" -Pattern "anim-"
```

---

## Definition of Done

Run this validation before submitting changes:

```bash
pnpm lint; if($?) { npx tsc --noEmit }; if($?) { pnpm build }
```

**Checklist:**
- [ ] Code follows all rules in [`rules.md`](./rules.md)
- [ ] UI follows all rules in [`design-system.md`](./design-system.md) (if UI-facing)
- [ ] Animations follow all rules in [`animations.md`](./animations.md) (if animation-facing)
- [ ] New files have required documentation headers
- [ ] Commits follow Conventional Commits format
- [ ] No secrets or PII in the diff

---

*Last updated: 2026-02-25*

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output AGENTS.md|01-app:{04-glossary.mdx}|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-cache-components.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mcp.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,public-static-pages.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,proxy.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-params.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->
