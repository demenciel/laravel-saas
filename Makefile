
# ---------------------------------------------------------------------------- #
# LARAVEL COMMANDS
# ---------------------------------------------------------------------------- #
# Create a new migration file
migration:
	php artisan make:migration

# Run database migrations
migrate:
	php artisan migrate

# Rollback the last database migration
rollback:
	php artisan migrate:rollback

# Rollback the last database migration by one step
rollback1:
	php artisan migrate:rollback --step=1

# Create a new model
model:
	php artisan make:model

# Create a new event
event:
	php artisan make:event

# Create a new controller
controller:
	php artisan make:controller

# Create a new service
service:
	php artisan make:service

# Start the Laravel development server
server:
	php artisan serve

# Start the Laravel Reverb server in debug mode
reverb:
	php artisan reverb:start --debug

# Restart the Laravel Reverb server
reverb-reup:
	php artisan reverb:restart

# Run database seeders
seed:
	php artisan db:seed

# Check the status of database migrations
status: 
	php artisan migrate:status