# Going Live — Single VPS + Docker Compose

This deploys the whole site (Next.js frontend, Laravel/Filament backend, MySQL)
to one server, with automatic HTTPS via Caddy. Everything is driven by a single
root `.env` file.

```
Internet ──▶ Caddy (:80/:443, auto-HTTPS)
                ├── https://your-domain.com      ──▶ frontend  (Next.js :3000)
                └── https://api.your-domain.com  ──▶ backend   (nginx+php-fpm :80)
                                                          └──▶ db (MySQL)
```

Uploaded images/PDFs persist in the `backend_uploads` Docker volume; the
database persists in `db_data`; HTTPS certificates in `caddy_data`.

---

## 0. Prerequisites (get these first)

1. **A domain name** — buy one (e.g. Namecheap, Cloudflare, GoDaddy).
   *This is currently not purchased, so live launch is blocked until you have it.*
2. **A VPS** — Ubuntu 22.04/24.04, 2 GB RAM minimum (e.g. Hetzner CX22 ~€4/mo,
   DigitalOcean, Linode). Note its public IP.
3. **DNS records** at your domain registrar, all pointing at the VPS IP:
   | Type | Name  | Value        |
   |------|-------|--------------|
   | A    | `@`   | `<VPS_IP>`   |
   | A    | `www` | `<VPS_IP>`   |
   | A    | `api` | `<VPS_IP>`   |
4. **An SMTP provider** for the contact form (Postmark, Amazon SES, Mailgun,
   Zoho, or your email host). You'll need host/port/username/password.

---

## 1. Install Docker on the VPS

SSH in, then:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER    # log out/in so this takes effect
docker compose version           # verify the compose plugin is present
```

Open the firewall for web traffic (if using ufw):

```bash
sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow OpenSSH && sudo ufw enable
```

## 2. Get the code onto the server

```bash
git clone <your-repo-or-copy-the-folder> almnabr && cd almnabr
```
(You need both `frontend/` and `backend/` plus the root `docker-compose.prod.yml`,
`Caddyfile`, and `.env.prod.example`.)

## 3. Configure

```bash
cp .env.prod.example .env
nano .env
```
In `.env`:
- **Replace every `example.com`** with your real domain.
- Set strong `DB_PASSWORD`, `DB_ROOT_PASSWORD`, `ADMIN_PASSWORD`.
- Fill in the `MAIL_*` block with your SMTP credentials and set `CONTACT_RECIPIENT`.
- Leave `APP_KEY=` blank for now (next step).

Generate the Laravel app key and paste it into `.env`:

```bash
docker compose -f docker-compose.prod.yml run --rm backend php artisan key:generate --show
# copy the "base64:...." line into APP_KEY= in .env
```

## 4. Build and launch

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

First run builds both images, starts MySQL, runs migrations, seeds the admin
user, publishes Filament assets, and Caddy fetches HTTPS certificates
(this needs DNS already pointing at the server and ports 80/443 open).

Watch it come up:

```bash
docker compose -f docker-compose.prod.yml logs -f
```

## 5. Verify

- Site:   `https://your-domain.com`
- API:    `https://api.your-domain.com/api/health`  → `{"status":"ok"}`
- Admin:  `https://api.your-domain.com/admin`  (log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

## 6. First-launch checklist

- [ ] Log into `/admin` and **change the admin password**.
- [ ] Add real content: Hero Slides, Projects, Services, Clients, Stats, Team,
      News/Blogs, About page — the DB starts empty (no demo content in prod).
- [ ] Submit the contact form once and confirm the email arrives at
      `CONTACT_RECIPIENT`.
- [ ] Set the real `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env`, then rebuild the
      frontend (see below) — the WhatsApp button is a placeholder until then.

---

## Day-2 operations

**Deploy an update** (after `git pull`):
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

**Changed the domain or any `NEXT_PUBLIC_*` value?** Those are baked into the
frontend at build time — rebuild it:
```bash
docker compose -f docker-compose.prod.yml up -d --build frontend
```

**Run an artisan command:**
```bash
docker compose -f docker-compose.prod.yml exec backend php artisan <command>
```

**Database backup** (cron this daily):
```bash
docker compose -f docker-compose.prod.yml exec db \
  sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" almanabr' > backup-$(date +%F).sql
```

**Back up uploaded media** (the `backend_uploads` volume):
```bash
docker run --rm -v almnabr_backend_uploads:/data -v $(pwd):/out alpine \
  tar czf /out/uploads-$(date +%F).tar.gz -C /data .
```
(Volume name is `<project-folder>_backend_uploads`; check `docker volume ls`.)

**Logs / restart / stop:**
```bash
docker compose -f docker-compose.prod.yml logs -f backend
docker compose -f docker-compose.prod.yml restart backend
docker compose -f docker-compose.prod.yml down        # stop (keeps volumes/data)
```

---

## Notes & possible upgrades

- **Uploads are on a local Docker volume.** That's fine and survives redeploys on
  a single VPS. If you later move to multiple servers or want off-box durability,
  switch `FILESYSTEM_DISK=s3` and fill in the AWS S3 vars (the config already
  supports it) — region `me-south-1` (Bahrain) is closest to Saudi Arabia.
- **Contact emails send synchronously** (`QUEUE_CONNECTION=sync`) to keep the
  stack simple. If volume grows, switch to a `database` queue + a worker service.
- **Backend web server** is nginx + php-fpm (production-grade), not `artisan
  serve`. Good for a marketing site's traffic; add a load balancer only if needed.
- **Scaling / CDN:** put Cloudflare in front (proxied DNS) for CDN + DDoS
  protection later — no stack changes required.
