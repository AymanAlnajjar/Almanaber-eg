#!/usr/bin/env bash
# =============================================================================
# Al-Mnabr — FULL BACKUP  (database + uploaded files + config)
# Run on the server:   bash /root/almnabr/backup.sh
# Produces one file:   /root/backups/almnabr-backup-<date>.tar.gz
# Keeps the newest 7 backups and deletes older ones automatically.
# =============================================================================
set -euo pipefail

PROJECT_DIR="/root/almnabr"
COMPOSE="docker compose -f docker-compose.prod.yml"
BACKUP_DIR="/root/backups"
KEEP=7

cd "$PROJECT_DIR"
mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y-%m-%d_%H%M%S)"
WORK="$(mktemp -d)"

echo "[1/3] Dumping database..."
$COMPOSE exec -T db sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --single-transaction --routines --triggers "$MYSQL_DATABASE"' > "$WORK/database.sql"

echo "[2/3] Archiving uploaded images/files..."
$COMPOSE exec -T backend sh -c 'cd /var/www/storage/app/public && tar czf - .' > "$WORK/uploads.tar.gz"

echo "[3/3] Saving config (.env with all secrets)..."
cp "$PROJECT_DIR/.env" "$WORK/env.backup"

ARCHIVE="$BACKUP_DIR/almnabr-backup-$STAMP.tar.gz"
tar czf "$ARCHIVE" -C "$WORK" database.sql uploads.tar.gz env.backup
rm -rf "$WORK"

# keep only the newest $KEEP backups
ls -1t "$BACKUP_DIR"/almnabr-backup-*.tar.gz 2>/dev/null | tail -n +"$((KEEP+1))" | xargs -r rm -f

echo ""
echo "Backup complete:"
ls -lh "$ARCHIVE"
echo ""
echo "Copy it off the server for safety, e.g. from your PC:"
echo "  scp root@<server-ip>:$ARCHIVE ."
