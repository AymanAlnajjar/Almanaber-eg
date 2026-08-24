# Al-Mnabr — server setup (for the hosting admin)

You will host the site from **pre-built Docker images** (no building required).

## What you need on the server
- A Linux server with **Docker** + **Docker Compose** installed
- Ports **80** and **443** open to the internet
- DNS records pointing at this server's IP (set "DNS only" if behind Cloudflare):
  - `example.com`  → server IP
  - `www.example.com` → server IP
  - `api.example.com` → server IP

## The images
```
ghcr.io/aymanalnajjar/almnabr-frontend:latest
ghcr.io/aymanalnajjar/almnabr-backend:latest
```

## Files you were given
Put these three files together in one folder on the server:
- `docker-compose.registry.yml`
- `Caddyfile`
- `.env.prod.example`

## Steps
```bash
# 1. Create your environment file from the template
cp .env.prod.example .env

# 2. Edit .env and set at least these:
#      DOMAIN=example.com                       # your real domain (no https://)
#      DB_DATABASE / DB_USERNAME / DB_PASSWORD / DB_ROOT_PASSWORD   # pick strong values
#      APP_KEY=base64:...                        # generate: openssl rand -base64 32  (prefix with base64:)
#      APP_URL=https://api.example.com
#      FRONTEND_URL=https://example.com
#      ADMIN_EMAIL / ADMIN_PASSWORD              # first admin login for the panel
#      MAIL_* and CONTACT_RECIPIENT              # for the contact form (optional)
#      FRONTEND_IMAGE=ghcr.io/aymanalnajjar/almnabr-frontend:latest
#      BACKEND_IMAGE=ghcr.io/aymanalnajjar/almnabr-backend:latest

# 3. (ONLY if the images are private) log in to GHCR with a token that has read:packages
#    echo <TOKEN> | docker login ghcr.io -u <github-username> --password-stdin

# 4. Pull the images and start everything
docker compose -f docker-compose.registry.yml pull
docker compose -f docker-compose.registry.yml up -d
```

Wait ~1 minute (the backend runs its database setup on first start), then open:
- `https://example.com` — the website
- `https://api.example.com/admin` — the admin panel (log in with ADMIN_EMAIL / ADMIN_PASSWORD)

## Important note about the domain
The frontend image was built for the domain **almnabr.eg**. If you are hosting on a
**different** domain, the site's internal links/API calls won't match until the image
is rebuilt for your domain. Ask the repo owner to set the `NEXT_PUBLIC_*` repository
variables to your domain and re-run the build, then `pull` + `up -d` again. (The
backend works on any domain as-is.)

## Updating later
```bash
docker compose -f docker-compose.registry.yml pull
docker compose -f docker-compose.registry.yml up -d
```
Your data (database + uploaded images) lives in Docker volumes and is not touched.
