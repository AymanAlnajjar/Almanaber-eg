#!/usr/bin/env bash
# =============================================================================
# Al-Mnabr — deploy local code changes to the LIVE site (almnabr.eg)
#
# Run from WSL Ubuntu:
#     bash "/mnt/c/Users/ayman/.claude/projects/almnabr website/deploy.sh" frontend
#
#   frontend  → rebuild the website (text, layout, components)   [default]
#   backend   → rebuild the API / admin panel (PHP changes)
#   all       → rebuild both
#
# Your database and uploaded images are NEVER touched by this.
# Takes ~2-4 minutes for the frontend (it recompiles the site).
# =============================================================================
set -euo pipefail

SERVER="root@185.203.118.28"
KEY="$HOME/.ssh/almnabr_deploy"
LOCAL="/mnt/c/Users/ayman/.claude/projects/almnabr website"
REMOTE="/root/almnabr"
TARGET="${1:-frontend}"
SSH_OPTS="-i $KEY -o BatchMode=yes -o StrictHostKeyChecking=no"

echo "==> [1/3] Syncing changed files to the server..."
# --delete mirrors local -> server so renames/removals propagate (a plain sync
# would leave stale files behind and break Next.js routing/builds).
# The excludes protect server-only files: every .env (root prod secrets +
# backend/.env), build artifacts, backups, and the handover folder are never
# touched or deleted.
rsync -az --delete --info=stats1 \
  -e "ssh $SSH_OPTS" \
  --exclude='.git' --exclude='node_modules' --exclude='vendor' \
  --exclude='.next' --exclude='.env' --exclude='.env.*' --exclude='HANDOVER' \
  --exclude='backups' --exclude='*.tar.gz' --exclude='database/database.sqlite' \
  "$LOCAL/" "$SERVER:$REMOTE/"

echo "==> [2/3] Rebuilding '$TARGET' on the server (this is the slow part)..."
if [ "$TARGET" = "all" ]; then
  ssh $SSH_OPTS "$SERVER" "cd $REMOTE && docker compose -f docker-compose.prod.yml up -d --build"
else
  ssh $SSH_OPTS "$SERVER" "cd $REMOTE && docker compose -f docker-compose.prod.yml up -d --build $TARGET"
fi

echo "==> [3/3] Verifying the live site (waiting for services to finish booting)..."
# The backend runs migrations + cache warmup on start, so poll rather than
# checking immediately (otherwise you see a misleading 502).
for i in $(seq 1 30); do
  h=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 https://api.almnabr.eg/api/health 2>/dev/null || true)
  [ "$h" = "200" ] && break
  sleep 3
done
curl -s -o /dev/null -w "  https://almnabr.eg          -> HTTP %{http_code}\n" --max-time 25 https://almnabr.eg/ || true
curl -s -o /dev/null -w "  https://api.almnabr.eg/api  -> HTTP %{http_code}\n" --max-time 25 https://api.almnabr.eg/api/health || true

echo ""
echo "Deployed. Refresh https://almnabr.eg (use Ctrl+Shift+R to bypass cache)."
