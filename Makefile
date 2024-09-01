# Set the default goal to 'help' when running make without arguments
.DEFAULT_GOAL := help

# Check if Docker is running and set DOCKER_RUNNING variable accordingly
DOCKER_RUNNING := $(shell docker info > /dev/null 2>&1 && echo true || echo false)

# ---------------------------------------------------------------------------- #
# Utility functions

# Check if Docker is running
check_docker_status:
	@if [ "$(DOCKER_RUNNING)" != "true" ]; then exit 1; fi

# Check if .env file exists and validate its contents
check_env:
	@if [ ! -f .env ]; then \
		echo -e "\033[31m.env file is missing.\033[0m"; \
		exit 1; \
	fi
	@bash ./utils/check_env.sh

# Display help information
help: check_docker_status
	@if [ "$(CHECK_ENV)" ]; then exit 1; fi
	@echo -e "\033[36mUsage: make [target]\033[0m"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Start the containers in development mode
up:
	echo -e "\033[34mStarting containers...\033[0m"
	docker compose up -d --build
	echo -e "\033[32mContainers started successfully.\033[0m"

# Build a specific container
build-%: check_docker_status
	@docker compose build $*

# Run a single container
run-%: check_docker_status
	@docker compose up -d $*
	
# Stop the containers
down: check_docker_status ## Stop the containers
	@echo -e "\033[34mStopping containers...\033[0m"
	docker compose down

# Restart the containers
reup: down up ## Restart the containers

# Check the status of the containers
status: check_docker_status ## Check the status of the containers
	echo -e "\033[34mChecking status...\033[0m"
	@docker compose ps
	echo -e "\033[32mStatus checked successfully.\033[0m"

# ---------------------------------------------------------------------------- #
# Open a bash shell in the specified container
shell-%: check_docker_status ## Open a bash shell in the container
	echo -e "\033[34mOpening shell in $*...\033[0m"
	@docker compose exec $* sh

# ----------------------------------------------------------------------------
# Show logs for all containers
logs: ## Shows logs lively in the container
	@docker compose logs --follow --tail 100

# Show logs for a specific container
logs-%: check_docker_status ## Shows logs lively in the selected container
	echo -e "\033[34mShowing logs in $*...\033[0m"
	@while true; do docker compose logs --tail 100 --follow $*; sleep 1; done

# ---------------------------------------------------------------------------- #
# Remove all Docker images
rm_images: check_docker_status ## Remove all images
	@docker compose down --rmi local
	@echo -e "\033[32mAll images removed.\033[0m"

# Stop the containers and remove the volumes
clean: check_docker_status ## Stop the containers and remove the volumes
	-@docker compose rm -svf

# Stop the containers, remove volumes and images, and prune the system
fclean: check_docker_status clean	## Stop the containers and remove the volumes and images
	-@docker compose down --rmi local --volumes
	-@docker rmi -f $(docker compose images -q)
	-@docker system prune -f
	@echo -e "\033[32mAll containers, volumes and images removed.\033[0m"

# Define PHONY targets (targets that don't represent files)
.PHONY: up down reup rm_images psql prisma seed shell-% logs logs-% check_docker_status check_env help clean fclean

# ---------------------------------------------------------------------------- #
# LARAVEL COMMANDS
# ---------------------------------------------------------------------------- #
# Create a new migration file
migration:
	docker compose exec -it app php artisan make:migration

# Run database migrations
migrate:
	docker compose exec -it app php artisan migrate

# Rollback the last database migration
rollback:
	docker compose exec -it app php artisan migrate:rollback

# Rollback the last database migration by one step
rollback1:
	docker compose exec -it app php artisan migrate:rollback --step=1

# Create a new model
model:
	docker compose exec -it app php artisan make:model

# Create a new event
event:
	docker compose exec -it app php artisan make:event

# Create a new controller
controller:
	docker compose exec -it app php artisan make:controller

# Create a new service
service:
	docker compose exec -it app php artisan make:service

# Start the Laravel development server
server:
	docker compose exec -it app php artisan serve

# Start the Laravel Reverb server in debug mode
reverb:
	docker compose exec -it app php artisan reverb:start --debug

# Restart the Laravel Reverb server
reverb-reup:
	docker compose exec -it app php artisan reverb:restart

# Run database seeders
seed:
	docker compose exec -it app php artisan db:seed

# Check the status of database migrations
status: 
	docker compose exec -it app php artisan migrate:status

# Generate recipes (custom command)
generate:
	docker compose exec -it app php artisan app:generate-recipes