import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["ar", "en"] as const;
const DEFAULT_LOCALE = "ar";

// Ensures every page URL is locale-prefixed. A request to "/", "/about",
// "/services/x", etc. is redirected to the Arabic-prefixed equivalent
// ("/ar", "/ar/about", ...). Requests already under /ar or /en pass through.
// This also backstops any internal link that isn't locale-prefixed.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except API routes, Next internals, and static files
  // (anything with a dot, e.g. .png, robots.txt, sitemap.xml, favicon).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
