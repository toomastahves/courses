FROM php:8.3

# Install dependencies
RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Setup working directory
WORKDIR /home/laravel/app

# Create user
RUN useradd -ms /bin/bash laravel

# Give laravel user permissions and copy files over
COPY --chown=laravel:laravel . .

# Install composer dependencies inside container
RUN composer install

# Switching user from root to laravel
USER laravel

# Expose port where application runs
EXPOSE 5001

# Run application
CMD php artisan serve --host=0.0.0.0 --port=5001
