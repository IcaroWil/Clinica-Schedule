#!/usr/bin/env sh
set -e

cd /var/www/html

mkdir -p storage/logs bootstrap/cache
chmod -R 777 storage bootstrap/cache || true

php artisan migrate --force --no-interaction || true

[ -f storage/oauth-private.key ] || php artisan passport:keys --force || true

php artisan storage:link || true
php artisan config:cache
php artisan route:cache

exec php -d variables_order=EGPCS -S 0.0.0.0:${PORT} -t public public/index.php
