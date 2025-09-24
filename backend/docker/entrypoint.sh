#!/usr/bin/env sh
set -e

cd /var/www/html

mkdir -p storage/logs bootstrap/cache
chmod -R 777 storage bootstrap/cache || true

php artisan migrate --force --no-interaction || true

php artisan passport:keys --force || true
php artisan passport:install --force || true

php artisan storage:link || true
php artisan config:clear || true
php artisan route:clear || true
php artisan config:cache
php artisan route:cache

exec php -d variables_order=EGPCS -S 0.0.0.0:${PORT} -t public public/index.php
