FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpq-dev libonig-dev libxml2-dev libicu-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . /var/www/html/

RUN cp .env.example .env \
    && composer install --no-interaction \
    && php artisan key:generate