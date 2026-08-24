# Hosting Al-Mnabr from pre-built Docker images

This project can be hosted **without building anything on the server**. GitHub
Actions builds the frontend and backend images and pushes them to the GitHub
Container Registry (GHCR); the server admin just pulls those images and runs them.

```
  GitHub push ──▶ Actions build ──▶ GHCR images ──▶ server: docker compose pull + up
```

---

## Part A — One-time setup (repo owner)

### 1. Put the code on GitHub
From this folder:

```bash
git init
git add -A
git commit -m "Al-Mnabr website"
git branch -M main
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main
```

The push triggers `.github/workflows/docker-publish.yml` automatically.

### 2. (Optional) Set the frontend's public values
Next.js compiles `NEXT_PUBLIC_*` into the **frontend image at build time**. The
workflow reads them from **repository Variables**; if unset it falls back to the
current production values (`almnabr.eg`). To bake a different domain, go to:

**GitHub → Settings → Secrets and variables → Actions → Variables → New variable**

| Variable | Example |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://api.example.com/api` |
| `NEXT_PUBLIC_SITE_URL` | `https://example.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `201555410885` |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | `Hello, I'd like to know more.` |

Re-run the workflow (Actions tab → Run workflow) after changing these.

### 3. Find the images
After the workflow succeeds, the images appear under the repo's **Packages**:

```
ghcr.io/<owner>/almnabr-frontend:latest
ghcr.io/<owner>/almnabr-backend:latest
```

Tags produced: `latest` (main branch), `sha-<short>` (every commit), and
`vX.Y.Z` when you push a git tag like `v1.0.0`.

### 4. Make the packages pullable
By default GHCR packages are **private**. Two options:

- **Public (easiest):** each package → *Package settings* → *Change visibility* →
  Public. Anyone can then `docker pull` with no login.
- **Private:** give the server admin a GitHub Personal Access Token with the
  `read:packages` scope so they can `docker login ghcr.io`.

---

## Part B — Hosting on the server (server admin)

Requirements: a Linux box with **Docker + Docker Compose**, ports 80/443 open,
and DNS for `<domain>` and `api.<domain>` pointing at the server (set to
"DNS only" if using Cloudflare, so Caddy can get certificates).

```bash
# 1. Get the deploy files (clone the repo, or copy these three files):
#    docker-compose.registry.yml, Caddyfile, .env.prod.example

# 2. Create and edit the environment file
cp .env.prod.example .env
nano .env      # set DOMAIN, DB_* secrets, ADMIN_*, mail, and the image paths:
               #   FRONTEND_IMAGE=ghcr.io/<owner>/almnabr-frontend:latest
               #   BACKEND_IMAGE=ghcr.io/<owner>/almnabr-backend:latest
               # generate APP_KEY with: openssl rand -base64 32  (prefix "base64:")

# 3. Only if the packages are private:
echo <PAT> | docker login ghcr.io -u <github-username> --password-stdin

# 4. Pull and start
docker compose -f docker-compose.registry.yml pull
docker compose -f docker-compose.registry.yml up -d
```

The backend runs database migrations on startup. Give it a minute, then visit
`https://<domain>` (site) and `https://api.<domain>/admin` (admin panel).

### Updating to a new version
```bash
docker compose -f docker-compose.registry.yml pull
docker compose -f docker-compose.registry.yml up -d
```
Data lives in named volumes (`db_data`, `backend_uploads`) and is untouched.

---

## Notes & limits
- **Backend image is generic** — all config comes from `.env` at runtime, so the
  same image works for any domain.
- **Frontend image is domain-specific** — because `NEXT_PUBLIC_*` is compiled in.
  For a different domain, the repo owner sets the repo variables and rebuilds.
- This is an alternative to `deploy.sh` (which builds on the server via rsync).
  Use whichever fits: `deploy.sh` for the current single VPS, the registry flow
  for handing images to a third-party admin.
