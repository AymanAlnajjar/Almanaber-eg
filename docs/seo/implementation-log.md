# SEO & GEO Implementation Log

## 2026-11-17 — Baseline and indexing foundation

### Canonical and hreflang metadata

- **Problem:** nested routes could inherit the locale homepage canonical.
- **Root cause:** canonical metadata lived in the locale layout while child routes did not consistently override it.
- **Implementation:** added frontend/src/lib/seo.ts and route-specific metadata for public static and dynamic pages.
- **Result:** Arabic and English pages now emit self-canonical URLs plus reciprocal ar, en, and x-default alternates.
- **Tests:** TypeScript passed; ESLint passed; source regression checks added.

### Robots and sitemap

- **Problem:** robots blocked /_next/, used the wrong fallback domain, and sitemap omitted blogs while fabricating modification dates.
- **Implementation:** allowed public framework assets, normalized the canonical host, used /api/sitemap-data, included blogs, and accepted only real content timestamps.
- **Failure behavior:** sitemap still returns static URLs if the CMS endpoint is temporarily unavailable.

### Structured data

- **Problem:** organization schema contained inconsistent naming and unsupported Saudi, coordinate, service-area, price, and search-action claims.
- **Implementation:** introduced a stable organization ID, verified English/Arabic names and AMCE alias, removed unsupported claims, and added reusable project, service, blog, and news schemas.
- **Limitation:** full LocalBusiness data remains blocked pending verification of the complete office address, phone, email, opening hours, and official profiles.

### Server-rendered listing content

- **Problem:** news and blog cards were populated only after client-side effects.
- **Implementation:** added server page wrappers that fetch the initial collections and pass them to client filter components.
- **Result:** published titles, descriptions, images, and internal links are represented in initial HTML.

The About page now also receives its company settings, values, awards, team, and partners from server-side requests before hydration. A client retry remains available when one of those CMS requests fails.

### Images and media URLs

- Added responsive image sizes to full-width, gallery, and grid images so Next.js does not assume every image renders at the full viewport width.
- Replaced CSS service background downloads with optimized Next.js images while preserving the existing card interaction.
- Added a shared Laravel storage URL normalizer for public API controllers.
- Legacy values such as storage/projects/image.webp no longer become /storage/storage/projects/image.webp.
- Existing absolute media URLs remain unchanged.
- Replaced references to missing local fallback images with the existing placeholder asset.
- Added one semantic main landmark around page content and preserved a homepage H1 when hero data is unavailable.
- Added expanded-state and language labels to navigation controls.

### Tooling

- Replaced obsolete next lint with eslint.
- Excluded generated Next.js output from lint.
- Removed an accidental trailing character from postcss.config.mjs.
- Added npm run seo:check.

### Verification results

- npx tsc --noEmit: passed.
- npm run lint: passed.
- npm run seo:check: passed.
- npm run build: blocked by restricted access to Google Fonts and OneDrive build-output permissions in the current environment.
- Laravel tests and PHP syntax checks: blocked because PHP is unavailable and the installed Docker client has no running Docker engine.

### Preserved pre-existing work

The audit did not overwrite or revert the existing uncommitted project/gallery changes in the backend.
