FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libonig-dev libxml2-dev libicu-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN composer install --no-dev --optimize-autoloader

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "php -d variables_order=EGPCS -S 0.0.0.0:${PORT} -t public public/index.php"]
