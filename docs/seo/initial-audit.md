# AMCE Technical SEO & GEO Initial Audit

**Audit date:** 2026-11-17  
**Website:** https://almnabr.eg  
**Repository:** Next.js frontend plus Laravel/Filament backend

## Executive summary

The public site is rendered by a Next.js 15 App Router application with Arabic and English routes under `/ar` and `/en`. Content is supplied by a Laravel 12 API and managed in Filament. The production homepage is crawlable and its primary content is present in returned HTML.

The most urgent technical issue is metadata inheritance. Locale layouts declare a homepage canonical URL, while several child routes do not replace it. Those routes can therefore advertise `/ar` or `/en` as their canonical instead of their own URL. The sitemap also omits published blog posts, regenerates artificial modification dates, and fetches several large collections separately even though the backend already provides a purpose-built sitemap endpoint.

Existing uncommitted changes in three project/gallery backend files pre-date this audit and are being preserved:

- `backend/app/Filament/Resources/ProjectResource.php`
- `backend/app/Filament/Resources/ProjectResource/Pages/EditProject.php`
- `backend/app/Services/ProjectImportService.php`

## Confirmed architecture

- Frontend: Next.js 15.5.28, React 19, App Router, TypeScript
- Backend: Laravel 12, PHP 8.2+, Filament 3, MySQL
- Locales: Arabic and English using a `[locale]` route segment
- Public content: projects, services, news, blogs, clients, partners, company information
- Deployment: Docker Compose with Caddy, apex-domain canonicalization, separate API subdomain
- Media: Laravel public storage, consumed through `next/image`

The original project brief expected Laravel 11; the repository actually uses Laravel 12.

## Findings

### P0 — indexing and canonicalization

#### Child routes can inherit the homepage canonical

`frontend/src/app/[locale]/layout.tsx` sets canonical and hreflang URLs for only the locale root. Several nested pages either have no metadata or define metadata without their own `alternates`. Next.js metadata inheritance can therefore leave nested routes pointing at the locale homepage.

Affected examples include project, service, client, news, blog, legal, and career routes, plus dynamic detail pages.

**Fix:** create shared locale-aware metadata utilities and ensure every indexable route emits its own canonical and reciprocal hreflang URLs.

### P1 — crawling, sitemap, and discovery

#### Sitemap uses artificial timestamps and omits blogs

`frontend/src/app/sitemap.ts` uses `new Date()` as a fallback for static and dynamic content. Published blogs are absent, and projects, services, and news are fetched independently even though `/api/sitemap-data` already exists.

**Fix:** use the dedicated sitemap endpoint, real `updated_at`/`publish_date` values, include blogs, and omit unknown dates.

#### Robots configuration blocks Next.js assets

`frontend/src/app/robots.ts` disallows `/_next/`. Its fallback site domain is `almnabr.com`, while the canonical production domain is `almnabr.eg`.

**Fix:** allow public framework assets, retain private API/admin exclusions, and use the canonical `.eg` fallback.

#### News and blog listings rely on client-side fetching

`frontend/src/app/[locale]/news/page.tsx` and `blogs/page.tsx` load their collections in `useEffect`. Listing content and internal links are absent from initial server HTML when JavaScript does not run.

**Recommended implementation:** move the initial collection request to server page wrappers and pass initial results to interactive filter components while preserving client-side filters.

### P1 — structured data and entity identity

#### Organization data uses inconsistent and unsupported claims

`frontend/src/components/JsonLd.tsx` uses `AlMnaber Consulting Professional Co.` instead of the verified name. It also emits Saudi positioning, `priceRange`, service areas, exact coordinates, and a site-search action without a verified source or matching search implementation.

**Fix:** use the verified English name, Arabic name, and AMCE abbreviation; add a stable organization `@id`; remove unverified claims; keep structured data aligned with visible content.

#### Breadcrumb schema does not match visible navigation

`BreadcrumbJsonLd` is globally generated from URL segments although equivalent visible breadcrumb navigation is not present on all pages. Detail routes also use numeric IDs as generated breadcrumb names.

**Fix:** remove the global synthetic schema. Reintroduce route-specific breadcrumb schema only alongside visible, content-aware breadcrumbs.

### P1 — status and routing quality

Project, service, news, and blog detail pages call `notFound()` when their public API record is unavailable. Backend controllers restrict detail responses to published/active records and return HTTP 404 for missing records. This positive baseline behavior must be preserved.

Career detail routes are client-only and do not verify record existence server-side. Missing records may render an application-level error under HTTP 200. A real careers API should be checked server-side before this can be corrected safely.

### P2 — content and editorial quality

Production HTML observed on 2026-11-17 contains:

- all homepage counters rendered as `0`;
- placeholder service descriptions such as “Here is the Description”;
- a test blog entry (`TEST` / `إختبار`);
- inconsistent Arabic and English Cairo office address, phone, fax, and email details;
- inconsistent English brand variants (`Al Manaber`, `AlMnaber`, `AlManaber`, and `ACE`).

These items require verified business data or CMS editorial approval. They must not be silently invented or overwritten in code.

### P2 — performance and rendering

- Most page UI is implemented as client components, increasing hydration cost.
- Homepage data uses ISR with a five-minute revalidation window, which is an appropriate starting policy.
- Project and service listing pages already fetch on the server.
- Remote images use `next/image` with WebP and a long immutable cache policy.
- A later performance phase should measure field Core Web Vitals before larger component-boundary changes.

### P2 — test and tooling baseline

- `npx tsc --noEmit` passed before changes.
- The production build could not complete in the restricted audit environment because `next/font` could not reach `fonts.googleapis.com`. A second filesystem error occurred while `.next` was being generated in the OneDrive workspace.
- PHP is not installed or not available on `PATH`, so Laravel tests could not run locally.

## Production read-only observations

- `https://almnabr.eg/` redirects to `/ar`.
- `/ar` and `/en` return crawlable HTML with headings, services, projects, clients, blog links, and contact content.
- Direct production inspection of `robots.txt` and `sitemap.xml` was unavailable through the read-only retrieval service; repository implementations were inspected instead.
- The `www` endpoint could not be verified through that service. Caddy configuration declares a permanent `www` to apex redirect.

## Planned implementation order

1. Correct canonical/hreflang metadata and domain normalization.
2. Repair robots and sitemap generation.
3. Normalize verified entity structured data and remove unsupported schema.
4. Add article/project structured data and content-aware breadcrumbs.
5. Server-render news and blog listing content.
6. Add SEO regression checks and validate representative routes.
7. Continue with image, accessibility, and Core Web Vitals work.

## External or business-data blockers

- Confirm the official English spelling used in legal and public profiles.
- Confirm the complete Cairo office address and public phone/email details.
- Confirm official social profile URLs.
- Provide approved organization logo and default social image dimensions.
- Review and replace placeholder CMS content, zero counters, and test posts.
- Search Console, Bing Webmaster Tools, and Google Business Profile changes require explicit access and authorization.
