#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up configuration for repository creation script...${NC}"

# GitHub configuration
echo -e "${YELLOW}GitHub Configuration:${NC}"
read -p "Enter your GitHub username: " GIT_UID
read -sp "Enter your GitHub personal access token: " GIT_TOK
echo ""
read -p "Enter your GitHub organization name: " GIT_ORG

# Cloudflare configuration
echo -e "${YELLOW}Cloudflare Configuration:${NC}"
read -p "Enter your Cloudflare zone ID: " CF_ZONE
read -sp "Enter your Cloudflare API key: " CF_AUTH
echo ""
read -p "Enter your Cloudflare account email: " CF_EMAIL

# Only export variables if they are not already exported
if [ -z "${GIT_UID+x}" ]; then export GIT_UID="$GIT_UID"; fi
if [ -z "${GIT_TOK+x}" ]; then export GIT_TOK="$GIT_TOK"; fi
if [ -z "${GIT_ORG+x}" ]; then export GIT_ORG="$GIT_ORG"; fi
if [ -z "${CF_ZONE+x}" ]; then export CF_ZONE="$CF_ZONE"; fi
if [ -z "${CF_AUTH+x}" ]; then export CF_AUTH="$CF_AUTH"; fi
if [ -z "${CF_EMAIL+x}" ]; then export CF_EMAIL="$CF_EMAIL"; fi

# Save configuration to file
echo -e "${YELLOW}==========================================================${NC}"
echo -e "${YELLOW}Saving configuration to /var/www/html/config.sh...${NC}"
echo -e "${YELLOW}==========================================================${NC}"
# Check if the config file already exists
if [ -f "/var/www/html/config.sh" ]; then
    echo -e "${YELLOW}Config file already exists. Overwriting...${NC}"
fi

# Set appropriate permissions for the config file
touch /var/www/html/config.sh
chmod 644 /var/www/html/config.sh

# Ensure the directory has the correct permissions
chmod 755 /var/www/html

cat > /var/www/html/config.sh << EOF
export GIT_UID="$GIT_UID"
export GIT_TOK="$GIT_TOK"
export GIT_ORG="$GIT_ORG"
export CF_ZONE="$CF_ZONE"
export CF_AUTH="$CF_AUTH"
export CF_EMAIL="$CF_EMAIL"
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}==========================================================${NC}"
    echo -e "${GREEN}Configuration saved successfully!${NC}"
    echo -e "${GREEN}==========================================================${NC}"
    echo -e "${GREEN}You can now run the create_repo.sh script.${NC}"
else
    echo -e "${RED}ERROR: Failed to save configuration. Please check permissions and try again.${NC}"
    exit 1
fi