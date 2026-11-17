# Structured Data Reference

## Entity IDs

- Organization: https://almnabr.eg/#organization
- Website: https://almnabr.eg/#website

The environment-configured canonical host is used outside production.

## Implemented types

| Type | Location | Source |
| --- | --- | --- |
| Organization | Locale homepages | Verified brand names, site URL, logo, Cairo/Egypt locality |
| WebSite | Locale homepages | Site identity, languages, publisher relationship |
| Service | Service details | CMS service title, description, image, canonical URL |
| CreativeWork | Project details | CMS project title, description, image, location |
| BlogPosting | Blog details | CMS article fields, author, date, canonical URL |
| NewsArticle | News details | CMS news fields, author, date, canonical URL |

## Intentionally excluded

- Ratings and reviews
- Awards and certifications not verified for schema use
- Exact coordinates
- Price range
- Unsupported city locations
- SearchAction without an actual site-search result page
- LocalBusiness hours, phone, and full address until business data is reconciled

## Rules

1. Schema values must match visible page content.
2. Dynamic records must be published or active.
3. Every entity relationship uses the shared organization ID.
4. JSON-LD validation is required after deployment.
5. Valid markup does not guarantee rich results or AI citations.
