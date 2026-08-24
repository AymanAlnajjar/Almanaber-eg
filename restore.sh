#!/usr/bin/env bash
# =============================================================================
# Al-Mnabr — RESTORE a backup onto this server (used when migrating VPS).
# Run AFTER the stack is running (docker compose ... up -d).
# Usage:  bash /root/almnabr/restore.sh /root/almnabr-backup-<date>.tar.gz
# =============================================================================
set -euo pipefail

PROJECT_DIR="/root/almnabr"
COMPOSE="docker compose -f docker-compose.prod.yml"
ARCHIVE="${1:?Usage: bash restore.sh <backup-archive.tar.gz>}"

cd "$PROJECT_DIR"
WORK="$(mktemp -d)"
tar xzf "$ARCHIVE" -C "$WORK"

echo "[1/2] Restoring database (overwrites current data)..."
$COMPOSE exec -T db sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < "$WORK/database.sql"

echo "[2/2] Restoring uploaded images/files..."
$COMPOSE exec -T backend sh -c 'mkdir -p /var/www/storage/app/public && cd /var/www/storage/app/public && tar xzf -' < "$WORK/uploads.tar.gz"

rm -rf "$WORK"
$COMPOSE restart backend >/dev/null 2>&1 || true
echo ""
echo "Restore complete. The site now has the backed-up content."
echo "Note: env.backup is inside the archive if you also need the original .env/secrets."
