---
name: stratezik-web-performance
description: >-
  Mobile-first performance and bundle discipline for stratezik.com: lazy routes,
  split blog metadata/loaders, desktop-only 3D chrome, deferred CSS/Turnstile/cookies,
  image optimization, and Vite chunk rules. Use when changing App.tsx, homepage shell,
  vite.config, index.html, critical CSS scripts, or any work that affects PageSpeed,
  LCP, or initial JS/CSS payload. Agent must run npm run build (includes
  check:release-gates) after shell changes — never defer to the user.
---

# Stratezik web performance

## Role

Own **implementation-grade** speed for stratezik.com without breaking SEO prerender or desktop UX. Crawl/AEO stays in **`stratezik-seo-master`**; this skill is the **performance playbook**.

## Build pipeline (do not bypass)

```
npm run build
  → check:blog-author
  → tsc
  → vite build
  → postbuild-seo (prerender + Critters + sitemap + llms)
  → check:release-gates   ← fails on perf regressions
```

**Agent rule:** After any App shell, Vite chunk, critical CSS, or homepage structure change, run **`npm run build`** in the same session. Do not mark done until `check:release-gates` passes.

## Architecture (mobile vs desktop)

| Concern | Mobile path | Desktop path |
|---------|-------------|--------------|
| App shell | `MobileScrollShell` (native scroll, no Lenis) | Lazy `DesktopExperience` (Loader, Cursor, SmoothScroll, WorldCanvas) |
| 3D world | Never mount | `WorldCanvas` after loader |
| Hero | Instant paint, `bg-cream` scrim | Gradient scrim over 3D |
| Homepage below-fold | `LazyWhenVisible` + `HomeBelowFoldSections` | Same (scroll-triggered) |
| Routes | `React.lazy` in `App.tsx` | Same |
| Blog articles | `postLoaders.ts` on `/blog/:slug` only | Same |
| Blog SEO metadata | `postsMeta.ts` only on registry path | Same |
| Turnstile | `FormProtectionFields` lazy + viewport defer | Same |
| Cookie banner | Deferred ~2.4s / idle | Same |
| CSS | Inline critical (Critters) + deferred main bundle | Same |

## Import rules (hard gates — enforced by check:release-gates)

### App.tsx

- **Never** statically import: `WorldCanvas`, `Loader`, `CustomCursor`, `MoveCounterHUD`, `SmoothScroll`.
- **Use** lazy `DesktopExperience` when `!mobile && !cheatSheet`.
- **Use** `MobileScrollShell` on mobile/cheat-sheet paths.
- Keep `RouteSeoManager`, `Navbar`, `Footer`, `HomePage` eager only if they stay small.

### Blog

| File | Contains | Imported by |
|------|----------|-------------|
| `postsMeta.ts` | slug, title, dates, keywords, FAQs | `pageSeoRegistry`, `BlogPage`, `BlogDiscoveryHub`, listings |
| `postLoaders.ts` | `() => import('./Article')` map | `posts.ts` → `BlogPostPage` only |
| `posts.ts` | `getPostBySlug()` merge helper | `BlogPostPage`, prerender script |

**Never** add `import()` calls to `postsMeta.ts`. **Never** import `postLoaders.ts` or `posts.ts` from `pageSeoRegistry.ts`.

### Vite (`vite.config.ts`)

Keep manual chunks for heavy deps:

- `three-vendor` — Three.js stack (desktop only at runtime)
- `framer` — motion (homepage above-fold; acceptable preload)
- `router` — react-router
- `turnstile` — Cloudflare widget
- `markdown` — service/blog markdown (route chunks only)

Do not merge three-vendor into the main entry.

## Critical CSS (`scripts/optimize-critical-css.ts`)

Runs on all prerendered HTML after Critters:

1. Inline above-fold CSS per route.
2. Defer `/assets/index-*.css` via `rel="preload" as="style" onload=…`.
3. Defer `/fonts/fonts.css` the same way.
4. Reinject `@font-face` if Critters strips fonts.
5. **Strip** `modulepreload` for `three-vendor` and `markdown` on homepage output.

If you change Critters options, verify `dist/index.html` still passes `check:release-gates`.

## Images

- Service heroes: WebP + AVIF in `public/services/` via `npm run optimize:service-images`.
- Use `<picture>` / `ServiceHeroImage` for heroes; prefer AVIF with WebP fallback.
- Add `.avif` to long-cache rules in `vercel.json` when adding new AVIF assets.
- OG/blog images: 1200×630; do not bloat prerender HTML with full-size PNG heroes on `/`.

## Mobile motion

- Use `useMotionEnabled()` + `motionPresets` — disable scroll animations on mobile/touch.
- `prefers-reduced-motion`: respect via existing hooks.

## Forms / third-party

- Turnstile: lazy `@marsidev/react-turnstile` in `FormProtectionFields`; load when form nears viewport.
- Do not load Turnstile on initial homepage paint.

## Release checklist (shell / perf changes)

```
Performance release gate:
- [ ] npm run build passes (includes check:release-gates)
- [ ] dist/index.html: no modulepreload for three-vendor or markdown
- [ ] dist/index.html: main CSS deferred (preload + onload)
- [ ] App.tsx: no static desktop-only imports
- [ ] New blog post: metadata in postsMeta.ts, loader in postLoaders.ts
- [ ] New route: React.lazy unless proven tiny and universal
- [ ] After deploy: optional mobile PSI on / and one content URL
- [ ] scripts/verify-live-homepage.sh for prerender smoke (SEO + perf HTML)
```

## Validation commands

```bash
npm run build
npm run check:release-gates   # after postbuild only

# Live smoke (post-deploy)
bash scripts/verify-live-homepage.sh
curl -s https://www.stratezik.com/ | grep -E 'modulepreload|preload.*index-.*css'
```

## Common failures

| Symptom | Fix |
|---------|-----|
| PSI: unused three-vendor on mobile | Static import of WorldCanvas or missing lazy DesktopExperience |
| PSI: unused markdown on `/` | `import()` in postsMeta or registry importing `posts.ts` |
| Render-blocking CSS | Critters defer broken; fix `optimize-critical-css.ts` |
| Mobile LCP delayed by cookie banner | Keep defer in `CookieConsentBanner` (~2.4s) |
| Blog post 404 in prerender | Add slug to `postsMeta.ts` **and** `postLoaders.ts` |
| check:release-gates before postbuild | Run full `npm run build`, not vite alone |

## Pairing

- **Crawl / prerender / sitemap**: `stratezik-seo-master`
- **Blog content ship**: `stratezik-blog-seo-pipeline`
- **This skill**: bundle discipline, LCP/FCP, mobile shell

## Deliberate tradeoffs (do not “fix” without user approval)

- Mobile: no 3D, no loader, reduced motion — desktop unchanged.
- Below-fold homepage sections: brief placeholder before scroll load (`/#contact-form` eager).
- Full Tailwind loads deferred: tiny FOUC possible ~100ms on rare classes.
- Cookie banner appears after LCP window, not instantly.
