# Color definitions
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m

.PHONY: all welcome setup create_repo create_ssl create_nginx help menu

all: welcome check_dependencies select_option

welcome:
	@echo "${BLUE}#########################################${NC}"
	@echo "${BLUE}##                                     ##${NC}"
	@echo "${BLUE}##   Welcome to TechnoSaas Boilerplate! ##${NC}"
	@echo "${BLUE}##                                     ##${NC}"
	@echo "${BLUE}#########################################${NC}"
	@echo ""
	@echo "${YELLOW}This Makefile will guide you through the setup process.${NC}"
	@echo "${YELLOW}Please follow the prompts to configure your environment.${NC}"
	@echo ""
	@bash -c 'read -p "Press [Enter] to continue..."'

select_option:
	@echo "${YELLOW}Choose the setup process you would like to run:${NC}"
	@echo "1) Setup configuration"
	@echo "2) Create GitHub repository"
	@echo "3) Create Cloudflare CNAME record"
	@echo "4) Create SSL certificate"
	@echo "5) Create Nginx configuration"
	@echo "6) Run all steps"
	@read -p "Enter your choice: " choice; \
	case $$choice in \
		1) $(MAKE) setup ;; \
		2) $(MAKE) repo ;; \
		3) $(MAKE) cloudflare ;; \
		4) $(MAKE) ssl ;; \
		5) $(MAKE) nginx ;; \
		6) $(MAKE) all_steps ;; \
		*) echo "${RED}Invalid choice!${NC}" && $(MAKE) select_option ;; \
	esac
setup:
	@echo "${BLUE}Step 1: Setting up configuration${NC}"
	./scripts/setup_config.sh
	@echo ""

repo:
	@echo "${BLUE}Step 2: Creating GitHub repository${NC}"
	@read -p "Enter the domain name for your project: " domain; \
	./scripts/create_repo.sh $$domain
	@echo ""

cloudflare:
	@echo "${BLUE}Step 3: Creating Cloudflare CNAME record${NC}"
	@read -p "Enter the domain name for Cloudflare: " domain; \
	./scripts/create_cloudflare.sh $$domain
	@echo ""

ssl:
	@echo "${BLUE}Step 4: Creating SSL certificate${NC}"
	@read -p "Enter the domain name for SSL certificate: " domain; \
	./scripts/create_ssl.sh $$domain
	@echo ""

nginx:
	@echo "${BLUE}Step 5: Creating Nginx configuration${NC}"
	@read -p "Enter the domain name for Nginx configuration: " domain; \
	./scripts/create_nginx_conf.sh $$domain
	@echo ""

all_steps:
	@echo "${GREEN}Running all steps...${NC}"
	@make setup
	@make repo
	@make cloudflare
	@make ssl
	@make nginx

check_dependencies:
	@echo "${BLUE}Step 0: Checking and installing dependencies${NC}"
	@echo "${YELLOW}Checking if npm is installed...${NC}"
	@if ! command -v npm &> /dev/null; then \
		echo "${YELLOW}npm not found. Installing npm...${NC}"; \
		sudo apt-get update; \
		sudo apt-get install -y npm; \
		if [ $$? -eq 0 ]; then \
			echo "${GREEN}npm installed successfully.${NC}"; \
		else \
			echo "${RED}Failed to install npm. Please install it manually and try again.${NC}"; \
			exit 1; \
		fi \
	else \
		echo "${GREEN}npm is already installed.${NC}"; \
	fi
	@echo "${YELLOW}Running npm install...${NC}"
	@npm install

	@echo "${YELLOW}Checking if composer is installed...${NC}"
	@if ! command -v composer &> /dev/null; then \
		echo "${YELLOW}composer not found. Installing composer...${NC}"; \
		sudo apt-get update; \
		sudo apt-get install -y composer; \
		if [ $$? -eq 0 ]; then \
			echo "${GREEN}composer installed successfully.${NC}"; \
		else \
			echo "${RED}Failed to install composer. Please install it manually and try again.${NC}"; \
			exit 1; \
		fi \
	else \
		echo "${GREEN}composer is already installed.${NC}"; \
	fi
	@echo "${YELLOW}Running composer install...${NC}"
	@composer install

	@echo "${YELLOW}Checking if php8.3-fpm is installed...${NC}"
	@if ! dpkg -l | grep -q php8.3-fpm; then \
		echo "${YELLOW}php8.3-fpm not found. Installing php8.3-fpm...${NC}"; \
		sudo apt-get update; \
		sudo apt-get install -y php8.3-fpm; \
		if [ $$? -eq 0 ]; then \
			echo "${GREEN}php8.3-fpm installed successfully.${NC}"; \
		else \
			echo "${RED}Failed to install php8.3-fpm. Please install it manually and try again.${NC}"; \
			exit 1; \
		fi \
	else \
		echo "${GREEN}php8.3-fpm is already installed.${NC}"; \
	fi

	@echo "${YELLOW}Checking if nginx is installed...${NC}"
	@if ! command -v nginx &> /dev/null; then \
		echo "${YELLOW}nginx not found. Installing nginx...${NC}"; \
		sudo apt-get update; \
		sudo apt-get install -y nginx; \
		if [ $$? -eq 0 ]; then \
			echo "${GREEN}nginx installed successfully.${NC}"; \
		else \
			echo "${RED}Failed to install nginx. Please install it manually and try again.${NC}"; \
			exit 1; \
		fi \
	else \
		echo "${GREEN}nginx is already installed.${NC}"; \
	fi
	@echo ""

help:
	@echo "${BLUE}Available commands:${NC}"
	@echo "  ${GREEN}make all${NC}          - Run the entire setup process"
	@echo "  ${GREEN}make setup${NC}        - Set up configuration"
	@echo "  ${GREEN}make repo${NC}  - Create GitHub repository and Cloudflare CNAME"
	@echo "  ${GREEN}make ssl${NC}   - Create SSL certificate"
	@echo "  ${GREEN}make nginx${NC} - Create Nginx configuration"
	@echo "  ${GREEN}make help${NC}         - Show this help message"

.DEFAULT_GOAL := all
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
