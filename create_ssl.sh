#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}       SSL Certificate Creation Tool     ${NC}"
echo -e "${BLUE}=========================================${NC}"

if [ "$1" = "" ]
then
        echo -e "${RED}ERROR: Missing domain name${NC}"
        echo -e "${YELLOW}USAGE: $0 <domain name>${NC}"
        exit 1
fi

echo -e "${BLUE}Validating domain name...${NC}"
if echo "$1" | grep -q "www"; then
        echo -e "${RED}ERROR: Do not include 'www' in the domain name${NC}"
        echo -e "${YELLOW}Example: Use 'example.com' instead of 'www.example.com'${NC}"
        exit 1
fi

echo -e "${GREEN}Domain name validated: $1${NC}"

echo -e "${YELLOW}Are you sure you want to create an SSL certificate for ${GREEN}$1${YELLOW}?${NC}"
while true
do
        read -p "Confirm? [y/N] " response
        case $response in
            [yY]) 
                echo -e "${GREEN}Proceeding with certificate creation...${NC}"
                break
                ;;
            [nN]|"")
                echo -e "${YELLOW}Operation cancelled by user.${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid input. Please enter 'y' for yes or 'n' for no.${NC}"
                ;;
        esac
done

echo -e "${BLUE}Checking for Certbot installation...${NC}"
if ! command -v certbot &> /dev/null
then
    echo -e "${YELLOW}Certbot not found. Installing Certbot...${NC}"
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Certbot installed successfully.${NC}"
    else
        echo -e "${RED}Failed to install Certbot. Please install it manually and try again.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}Certbot is already installed.${NC}"
fi

echo -e "${BLUE}Running Certbot to create SSL certificate...${NC}"
echo -e "${YELLOW}This may take a few minutes. Please wait...${NC}"
certbot --redirect --nginx -d "$1" -d "www.$1"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}SSL certificate created successfully for $1 and www.$1${NC}"
    echo -e "${BLUE}=========================================${NC}"
    echo -e "${GREEN}Certificate creation complete!${NC}"
    echo -e "${YELLOW}To delete this certificate in the future, use:${NC}"
    echo -e "${BLUE}certbot delete --cert-name $1${NC}"
    echo -e "${BLUE}=========================================${NC}"
else
    echo -e "${RED}Failed to create SSL certificate. Please check the Certbot output above for details.${NC}"
fi

exit 0