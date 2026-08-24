import type { NextConfig } from "next";

// Allow Next/Image to load images served by the Laravel backend (uploaded
// media lives under <api-host>/storage/...). The allowed remote host is
// derived from NEXT_PUBLIC_API_URL so production "just works" once that env
// var is set — no hardcoded domain.
function imageRemotePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    // Local dev backend
    { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/**" },
    { protocol: "http", hostname: "localhost", port: "8000", pathname: "/**" },
  ];

  const api = process.env.NEXT_PUBLIC_API_URL;
  if (api) {
    try {
      const u = new URL(api);
      patterns.push({
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        ...(u.port ? { port: u.port } : {}),
        pathname: "/**",
      });
    } catch {
      // ignore malformed URL — dev patterns above still apply
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  // Emit a self-contained server build for a small production Docker image.
  output: "standalone",
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    // WebP only. AVIF encoding is 5-10x slower on CPU and this runs on a
    // single-core VPS — on-demand AVIF made images take 20-30s to appear.
    // WebP gives ~95% of the size win for a fraction of the encode cost.
    formats: ["image/webp"],
    // Keep each optimized variant cached for a year (source files are immutable
    // ULID uploads, so a given URL never changes) — encode once, serve forever.
    minimumCacheTTL: 31536000,
    remotePatterns: imageRemotePatterns(),
  },
};

export default nextConfig;
