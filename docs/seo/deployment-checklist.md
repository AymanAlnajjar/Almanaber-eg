# SEO Deployment Checklist

## Before deployment

- [ ] Review the complete Git diff, including pre-existing backend gallery changes.
- [ ] Set NEXT_PUBLIC_SITE_URL to https://almnabr.eg.
- [ ] Set NEXT_PUBLIC_API_URL to the production API endpoint.
- [ ] Run npm ci.
- [ ] Run npm run lint.
- [ ] Run npx tsc --noEmit.
- [ ] Run npm run seo:check.
- [ ] Run npm run build in an environment that can resolve Google Fonts.
- [ ] Run Laravel tests with PHP and the expected test database.
- [ ] Back up the production database and uploaded media.

## Immediately after deployment

- [ ] Check /robots.txt returns HTTP 200 and references the .eg sitemap.
- [ ] Check /sitemap.xml returns valid XML.
- [ ] Confirm dynamic sitemap entries for one project, service, news item, and blog post.
- [ ] Inspect returned HTML for /ar, /en, list pages, and representative detail pages.
- [ ] Confirm self-canonical and reciprocal hreflang tags.
- [ ] Confirm missing and unpublished dynamic records return HTTP 404.
- [ ] Validate homepage and detail JSON-LD.
- [ ] Confirm contact forms, admin uploads, project galleries, and CMS editing still work.

## External search tools

- [ ] Submit the sitemap in Google Search Console.
- [ ] Request indexing for the two homepages and key service pages.
- [ ] Review Page Indexing, HTTPS, and Core Web Vitals reports.
- [ ] Submit the sitemap in Bing Webmaster Tools.
- [ ] Reconcile Google Business Profile data only after authorization.

## Rollback trigger

Rollback the frontend release if canonical URLs point to the wrong host or route, public pages become noindex, sitemap generation returns an error, dynamic detail pages fail, or critical business functionality regresses.
