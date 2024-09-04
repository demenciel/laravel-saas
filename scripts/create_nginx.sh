#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}    Nginx Configuration Creation Tool    ${NC}"
echo -e "${BLUE}=========================================${NC}"

echo -e "${YELLOW}Note: This script assumes:${NC}"
echo -e "${YELLOW}- You're using PHP 8.3 (adjust the PHP-FPM socket path if using a different version)${NC}"
echo -e "${YELLOW}- The TechnoSaas project is located at /var/www/<domain>/public${NC}"
echo -e "${YELLOW}- SSL certificates have been created using the create_ssl.sh script${NC}"
echo -e "${YELLOW}- You're running this script with sudo privileges${NC}"
echo -e "${BLUE}=========================================${NC}"

# Check if domain name is provided
if [ "$1" = "" ]; then
    echo -e "${RED}ERROR: Missing domain name${NC}"
    echo -e "${YELLOW}USAGE: $0 <domain name>${NC}"
    exit 1
fi

DOMAIN=$1
CONF_FILE="/etc/nginx/sites-available/$DOMAIN.conf"

echo -e "${BLUE}Creating Nginx configuration for ${GREEN}$DOMAIN${NC}"

# Create the Nginx configuration file
sudo tee $CONF_FILE > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    root /var/www/$DOMAIN/public;
    index index.php index.html index.htm;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Serve static files from the Vite build directory
    location /build/ {
        alias /var/www/$DOMAIN/public/build/;
        try_files \$uri =404;
        expires max;
        access_log off;
    }

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Log files
    access_log /var/log/nginx/${DOMAIN}_access.log;
    error_log /var/log/nginx/${DOMAIN}_error.log;
}
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Nginx configuration file created successfully at $CONF_FILE${NC}"
    
    # Create symbolic link to enable the site
    sudo ln -s $CONF_FILE /etc/nginx/sites-enabled/

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Symbolic link created in sites-enabled directory${NC}"
        
        # Test Nginx configuration
        echo -e "${YELLOW}Testing Nginx configuration...${NC}"
        sudo nginx -t

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Nginx configuration test passed${NC}"
            echo -e "${YELLOW}Reloading Nginx...${NC}"
            sudo systemctl reload nginx
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}Nginx reloaded successfully${NC}"
                echo -e "${BLUE}=========================================${NC}"
                echo -e "${GREEN}Nginx configuration complete for $DOMAIN!${NC}"
                echo -e "${BLUE}=========================================${NC}"
            else
                echo -e "${RED}Failed to reload Nginx. Please check the configuration and reload manually.${NC}"
            fi
        else
            echo -e "${RED}Nginx configuration test failed. Please check the configuration file for errors.${NC}"
        fi
    else
        echo -e "${RED}Failed to create symbolic link. Please check permissions and try again.${NC}"
    fi
else
    echo -e "${RED}Failed to create Nginx configuration file. Please check permissions and try again.${NC}"
fi