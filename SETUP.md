# Al-Mnabr Website — Local Dev Setup

Two apps in one repo folder:

| Folder      | Stack                                   | URL (local)                  |
|-------------|-----------------------------------------|------------------------------|
| `frontend/` | Next.js 15 + React 19 + TypeScript + Tailwind v4 | http://localhost:3000 |
| `backend/`  | Laravel 12 REST API + Filament 3 admin  | http://localhost:8000 (API), http://localhost:8000/admin (admin) |

The frontend reads content from the backend's public API (`NEXT_PUBLIC_API_URL`),
and content is managed through the Filament admin panel.

There are two ways to run it locally:

- **Native (WSL Ubuntu)** — recommended here, since WSL already has PHP 8.3,
  Node, and Composer. Uses SQLite, no Docker daemon needed. **This is what's
  currently set up and running.** See below.
- **Docker** — see [Docker option](#docker-option) at the bottom. Uses MySQL.

---

## Native (WSL Ubuntu) — current setup

All commands run inside WSL Ubuntu. The project lives on the Windows drive at
`/mnt/c/Users/ayman/.claude/projects/almnabr website`.

### One-time setup (already done)

```bash
# Backend
cd "/mnt/c/Users/ayman/.claude/projects/almnabr website/backend"
composer install
touch database/database.sqlite          # SQLite DB file (DB_CONNECTION=sqlite in .env)
php artisan key:generate
php artisan migrate --seed               # creates tables + admin user + demo blogs
php artisan storage:link

# Frontend
cd "../frontend"
npm install
```

### Start the servers

Two terminals (or background jobs):

```bash
# Terminal 1 — backend API + admin at http://localhost:8000
cd "/mnt/c/Users/ayman/.claude/projects/almnabr website/backend"
php artisan serve --host=0.0.0.0 --port=8000

# Terminal 2 — frontend at http://localhost:3000
cd "/mnt/c/Users/ayman/.claude/projects/almnabr website/frontend"
npm run dev -- -H 0.0.0.0 -p 3000
```

WSL2 forwards `localhost` to Windows automatically, so open these in your normal
Windows browser:

- Website:      http://localhost:3000
- API health:   http://localhost:8000/api/health
- Admin panel:  http://localhost:8000/admin  (login `admin@almnabr.com` / `password`)

Note: the site's homepage is at `/` (not `/en`). Localized sub-sections live under
`/en/...` and `/ar/...` (e.g. `/en/blogs`, `/ar/projects`). `/en` alone is a 404
by design — there's no `[locale]` index page.

### Handy commands

```bash
# Reset DB to a clean seeded state
php artisan migrate:fresh --seed

# Tail logs (contact-form emails land here via the "log" mailer)
tail -f storage/logs/laravel.log
```

---

## Docker option

> **Before using Docker:** `backend/.env` is currently set to `DB_CONNECTION=sqlite`
> for native dev. To use the Docker (MySQL) stack, re-enable the MySQL lines in
> `backend/.env` (set `DB_CONNECTION=mysql`, `DB_HOST=db`, `DB_DATABASE=almanabr`,
> `DB_USERNAME=almanabr_user`, `DB_PASSWORD=secret`). Also stop the native servers
> first so ports 3000/8000 are free.

### Prerequisites

- **Docker Desktop** — the only thing you need to install.
  Download: https://www.docker.com/products/docker-desktop/
  After installing, launch it and wait until the whale icon says "Docker Desktop is running".

Nothing else (PHP, Node, Composer, MySQL) needs to be installed on your machine —
it all runs in containers.

## Start everything

From this folder (`almnabr website/`):

```bash
docker compose up --build
```

First run takes a few minutes (it builds images, installs Composer + npm deps,
runs migrations, and seeds the database). When you see the Next.js "Ready" line
and Laravel "Server running", open:

- Website:      http://localhost:3000
- API health:   http://localhost:8000/api/health
- Admin panel:  http://localhost:8000/admin

**Admin login** (created automatically by the seeder):
- Email: `admin@almnabr.com`
- Password: `password`

Stop with `Ctrl+C`, or from another terminal:

```bash
docker compose down          # stop containers (keeps DB data)
docker compose down -v       # stop AND wipe the database/volumes
```

## How the pieces fit

- **db** — MySQL 8, data persisted in the `db_data` Docker volume.
- **backend** — builds from `backend/Dockerfile.dev`. On boot it runs
  `composer install`, generates `APP_KEY` (once), waits for MySQL, runs
  `php artisan migrate`, seeds an admin user + demo blogs, links storage, and
  serves on `0.0.0.0:8000`. Config comes from `backend/.env`.
- **frontend** — builds from `frontend/Dockerfile.dev`, runs `npm install` then
  `next dev`. It **shares the backend container's network namespace**
  (`network_mode: service:backend`) so `http://127.0.0.1:8000/api` resolves to
  the Laravel API both in the browser and during Next.js server-side rendering
  (SSR is used for SEO metadata and detail-page 404 handling). Because of the
  shared namespace, the frontend's port 3000 is published on the `backend`
  service in `docker-compose.yml`.

Source code is bind-mounted into both containers, so **edits on your machine hot-
reload live** — no rebuild needed for code changes. `vendor/` and `node_modules/`
live in named volumes so they don't clobber your host or slow Windows I/O.

## Config files

- `backend/.env`         — Laravel config for Docker (DB host `db`, `log` mailer,
                           admin credentials, CORS `FRONTEND_URL`).
- `frontend/.env.local`  — `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api`.
- `docker-compose.yml`   — the three services.

## Common tasks

Run an artisan command:
```bash
docker compose exec backend php artisan <command>
```
Re-seed the database:
```bash
docker compose exec backend php artisan migrate:fresh --seed --force
```
Tail Laravel logs (contact-form emails land here because of the `log` mailer):
```bash
docker compose exec backend tail -f storage/logs/laravel.log
```
Open a shell in a container:
```bash
docker compose exec backend bash
docker compose exec frontend bash
```

## Notes / gotchas

- The repos contain committed Windows `:Zone.Identifier` files (Mark-of-the-Web
  artifacts) that can't be checked out on Windows. They were skipped during
  clone; the real files are all present. Consider adding `*:Zone.Identifier` to
  `.gitignore` and `git rm --cached`-ing the tracked ones.
- Contact-form email uses the `log` mailer in dev (no SMTP). Submissions still
  save to the DB and appear under **Contact Submissions** in the admin panel.
- Change the admin password before doing anything public — it's `password` here
  purely for local dev.
