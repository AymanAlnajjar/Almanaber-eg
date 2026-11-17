# Technical SEO Checklist

## Implemented locally

- [x] Canonical .eg host centralized.
- [x] Locale-specific self-canonicals for primary public routes.
- [x] Reciprocal Arabic and English hreflang values.
- [x] x-default points to the Arabic default route.
- [x] Public Next.js assets allowed in robots.
- [x] Admin and API paths excluded from crawling.
- [x] Sitemap includes static pages, services, projects, news, and blogs.
- [x] Sitemap uses published/active backend records.
- [x] Unknown modification dates are omitted instead of fabricated.
- [x] Missing dynamic records use Next.js 404 behavior.
- [x] Utility and unverifiable career pages are noindex.
- [x] News and blog listings receive server-rendered initial data.
- [x] About page CMS content receives server-rendered initial data.
- [x] Organization identity uses a stable ID.
- [x] Project, service, blog, and news JSON-LD implemented.
- [x] Responsive sizes added to optimized content images.
- [x] Legacy storage path prefixes normalized in public API media URLs.
- [x] TypeScript, ESLint, and source SEO regression checks available.

## Still to verify after deployment

- [ ] Production robots response.
- [ ] Production sitemap XML and dynamic record count.
- [ ] HTTP to HTTPS and www to apex behavior.
- [ ] Canonical and hreflang tags in returned production HTML.
- [ ] Representative 404 and unpublished-content responses.
- [ ] Rich Results Test / Schema Markup Validator results.
- [ ] Search Console and Bing sitemap submissions.
- [ ] Mobile and desktop Core Web Vitals.
- [ ] Broken links and image-alt audit against production data.

## Business review required

- [ ] Replace zero homepage counters with approved figures or hide them.
- [ ] Replace placeholder service descriptions.
- [ ] Remove or rewrite test blog records.
- [ ] Reconcile Arabic/English office details.
- [ ] Confirm official English spelling, emails, social profiles, and logo.
