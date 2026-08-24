#!/bin/sh
set -e
cd /var/www

echo "[entrypoint] Waiting for database ${DB_HOST}:${DB_PORT:-3306} ..."
until php -r '$h=getenv("DB_HOST");$p=getenv("DB_PORT")?:"3306";try{new PDO("mysql:host=$h;port=$p",getenv("DB_USERNAME"),getenv("DB_PASSWORD"));exit(0);}catch(Throwable $e){exit(1);}'; do
  sleep 2
done
echo "[entrypoint] Database is up."

# Make sure the uploads dir (a mounted volume) has the right owner/perms.
mkdir -p storage/app/public
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Schema + first-boot admin (idempotent). Content seeders are NOT run in prod.
php artisan migrate --force
php artisan db:seed --class=AdminUserSeeder --force || true

# Publish Filament CSS/JS and link public/storage -> storage/app/public
php artisan filament:assets || true
php artisan storage:link || true

# Cache config/routes/views for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "[entrypoint] Boot complete. Starting web server."
exec "$@"
