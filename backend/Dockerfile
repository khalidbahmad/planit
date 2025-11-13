# Étape 1 : image PHP officielle avec Apache
FROM php:8.2-apache

# Étape 2 : installe les dépendances système
RUN apt-get update && apt-get install -y \
    git zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Étape 3 : active mod_rewrite pour Laravel
RUN a2enmod rewrite

# Étape 4 : copie le code dans le container
COPY . /var/www/html

# Étape 5 : installe Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Étape 6 : installe les dépendances Laravel
WORKDIR /var/www/html
RUN composer install --no-dev --optimize-autoloader

# Étape 7 : configure les permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Étape 8 : expose le port
EXPOSE 80

# Étape 9 : commande de démarrage
CMD ["apache2-foreground"]
