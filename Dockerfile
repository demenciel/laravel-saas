FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    git \
    nodejs \
    npm \
    zip \
    unzip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

COPY installation/init.sh /var/www/

# Install PHP dependencies
RUN composer update

RUN npm install

# Expose port 8000 and start PHP-FPM server

CMD ["php-fpm"]

# Set the init script as executable
RUN chmod +x /var/www/installation/init.sh

EXPOSE 9000 5173