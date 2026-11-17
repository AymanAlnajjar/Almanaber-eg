import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) =>
  readFile(new URL("../" + path, import.meta.url), "utf8");

const [robots, sitemap, jsonLd, seo] = await Promise.all([
  read("src/app/robots.ts"),
  read("src/app/sitemap.ts"),
  read("src/components/JsonLd.tsx"),
  read("src/lib/seo.ts"),
]);

assert.match(robots, /sitemap:/);
assert.match(robots, /SITE_URL/);
assert.doesNotMatch(robots, /\/_next\//);
assert.match(sitemap, /data\.blogs/);
assert.match(sitemap, /item\.updated_at \|\| item\.publish_date/);
assert.doesNotMatch(sitemap, /lastModified:\s*opts\.lastModified \?\? new Date/);
assert.match(seo, /canonical/);
assert.match(seo, /"x-default"/);
assert.match(jsonLd, /ORGANIZATION_ID/);
assert.doesNotMatch(jsonLd, /GeoCircle|priceRange|SearchAction/);

const routeChecks = [
  ["src/app/[locale]/about/page.tsx", 'path: "/about"'],
  ["src/app/[locale]/services/page.tsx", 'path: "/services"'],
  ["src/app/[locale]/projects/page.tsx", 'path: "/projects"'],
  ["src/app/[locale]/clients/page.tsx", 'path: "/clients"'],
  ["src/app/[locale]/contact/page.tsx", 'path: "/contact"'],
  ["src/app/[locale]/careers/page.tsx", 'path: "/careers"'],
  ["src/app/[locale]/news/layout.tsx", 'path: "/news"'],
  ["src/app/[locale]/blogs/layout.tsx", 'path: "/blogs"'],
];

for (const [file, expected] of routeChecks) {
  const source = await read(file);
  assert.match(source, /pageMetadata\(\{/);
  assert.ok(source.includes(expected), file + " is missing " + expected);
}

const [newsPage, blogsPage] = await Promise.all([
  read("src/app/[locale]/news/page.tsx"),
  read("src/app/[locale]/blogs/page.tsx"),
]);
assert.doesNotMatch(newsPage, /^"use client"/);
assert.doesNotMatch(blogsPage, /^"use client"/);
assert.match(newsPage, /initialNews/);
assert.match(blogsPage, /initialBlogs/);

console.log("SEO source regression checks passed.");
