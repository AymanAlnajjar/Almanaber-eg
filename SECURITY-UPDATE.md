# Runtime security update

The frontend now uses Node.js 24 LTS instead of the end-of-life Node.js 20.
Use Node.js 24 locally (`nvm use`), then run `npm ci` in `frontend`.
Next.js stays on the 15.5 release line. The PostCSS override selects a patched
8.x release because Next.js 15 pins an older copy. Review this override when
upgrading Next.js. Both npm projects have lockfiles for repeatable installs.

All backend Dockerfiles require PHP 8.3.36, the PHP 8.3 security release for
PHP2Shell (CVE-2026-109618 and CVE-2026-109619).

## Deploy and verify

Changing source files does not update running containers. For builds on the
server, update the checkout and run:

```sh
docker compose -f docker-compose.prod.yml build --pull frontend backend
docker compose -f docker-compose.prod.yml up -d --no-deps frontend backend
docker compose -f docker-compose.prod.yml exec frontend node --version
docker compose -f docker-compose.prod.yml exec backend php --version
```

For registry deployments, first wait for the main-branch image publishing
workflow to succeed, then run:

```sh
docker compose -f docker-compose.registry.yml pull frontend backend
docker compose -f docker-compose.registry.yml up -d --no-deps frontend backend
docker compose -f docker-compose.registry.yml exec frontend node --version
docker compose -f docker-compose.registry.yml exec backend php --version
```

Confirm Node.js reports v24.x and PHP reports 8.3.36, then check the website,
admin login and `/api/health`. Watchtower can only pull newly published images;
it cannot rebuild an existing application image when its base image changes.

References:
- https://nodejs.org/en/about/eol
- https://www.php.net/releases/8_3_36.php
