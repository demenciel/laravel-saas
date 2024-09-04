# Use PHP 8.2 FPM Alpine as base image
FROM php:8.3-fpm

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    nodejs \
    npm \
    nvm \
    git \
    zip \
    unzip \
    libpng-dev \
    libzip-dev \
    sqlite-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite zip gd pcntl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install project dependencies
RUN composer install --no-interaction --no-scripts --no-progress --prefer-dist
RUN npm install && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public/build
RUN chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public/build 

# Expose port 443 and 80 for Nginx
EXPOSE 443 80

# Start Nginx and PHP-FPM
CMD ["sh", "-c", "nginx && php-fpm"]