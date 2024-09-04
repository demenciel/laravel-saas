#!/bin/bash
# (bof)

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOUBLE=0

##################
# Get parameters #
##################

site=$1

echo -e "${YELLOW}Checking input parameters...${NC}"

if [ "$site" = "" ]
then
        echo -e "${RED}ERROR: Missing site parameter. Please provide a site name.${NC}"
        echo "Usage: $0 <site_name>"
        exit 1
fi

echo -e "${GREEN}Site name provided: $site${NC}"

echo -e "${YELLOW}Checking if site directory already exists...${NC}"

if [ -d "/var/www/html/$site" ]
then
        echo -e "${RED}ERROR: Site '$site' already exists at /var/www/html/$site${NC}"
        echo "Please choose a different site name or remove the existing directory."
        exit 1
fi

echo -e "${GREEN}Site directory check passed. Proceeding with repository creation...${NC}"

# Load configuration
if [ ! -f "/var/www/html/config.sh" ]; then
    echo -e "${RED}ERROR: Configuration file not found. Please run setup_config.sh first.${NC}"
    exit 1
fi

source /var/www/html/config.sh

site=$1

echo -e "${YELLOW}==========================================================${NC}"
echo -e "${YELLOW}CREATING THE '$site' REPO ON GITHUB VIA API${NC}"
echo -e "${YELLOW}==========================================================${NC}"

if [ -z "$GIT_UID" ] || [ -z "$GIT_TOK" ] || [ -z "$GIT_ORG" ]; then
    echo -e "${RED}ERROR: GitHub configuration is incomplete. Please run setup_config.sh to set up your GitHub credentials.${NC}"
    exit 1
fi

echo -e "${YELLOW}Sending request to GitHub API...${NC}"
response=$(curl -s -X POST \
    "https://api.github.com/orgs/$GIT_ORG/repos" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token $GIT_TOK" \
    -d "{\"name\":\"$site\",\"private\":true,\"auto_init\":false}")

echo -e "${YELLOW}GitHub API Response:${NC}"
echo "$response"
echo ""

if echo "$response" | grep -q "\"errors\""; then
    echo -e "${RED}ERROR: Failed to create the repository. Please check the API response above for details.${NC}"
    exit 1
else
    echo -e "${GREEN}SUCCESS: Repository '$site' created successfully in the '$GIT_ORG' organization.${NC}"
fi

echo -e "${YELLOW}==========================================================${NC}"
echo -e "${YELLOW}CREATING CNAME RECORD IN CLOUDFLARE${NC}"
echo -e "${YELLOW}==========================================================${NC}"

if [ -z "$CF_ZONE" ] || [ -z "$CF_AUTH" ] || [ -z "$CF_EMAIL" ]; then
    echo -e "${RED}ERROR: Cloudflare configuration is incomplete. Please run setup_config.sh to set up your Cloudflare credentials.${NC}"
    exit 1
fi

echo -e "${YELLOW}Sending request to Cloudflare API...${NC}"
cf_response=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/dns_records" \
    -H "X-Auth-Email: $CF_EMAIL" \
    -H "X-Auth-Key: $CF_AUTH" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"$site\",\"content\":\"@\"}")

echo -e "${YELLOW}Cloudflare API Response:${NC}"
echo "$cf_response"
echo ""

if echo "$cf_response" | grep -q "\"success\":true"; then
    echo -e "${GREEN}SUCCESS: CNAME record for '$site' created successfully in Cloudflare.${NC}"
else
    echo -e "${RED}ERROR: Failed to create CNAME record. Please check the API response above for details.${NC}"
    exit 1
fi

echo -e "${YELLOW}==========================================================${NC}"
echo -e "${YELLOW}PREPARING LOCAL FOLDERS${NC}"
echo -e "${YELLOW}==========================================================${NC}"

echo -e "${YELLOW}Creating directory: /var/www/html/$site${NC}"
mkdir -p "/var/www/html/$site"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}SUCCESS: Directory created successfully.${NC}"
    echo -e "${YELLOW}Changing to new directory...${NC}"
    cd "/var/www/html/$site"
    echo -e "${YELLOW}Current working directory: $(pwd)${NC}"
else
    echo -e "${RED}ERROR: Failed to create directory. Please check permissions and try again.${NC}"
    exit 1
fi

echo -e "${YELLOW}==========================================================${NC}"
echo -e "${YELLOW}SETUP COMPLETE${NC}"
echo -e "${YELLOW}==========================================================${NC}"
echo -e "${GREEN}Repository created on GitHub: https://github.com/$GIT_ORG/$site${NC}"
echo -e "${GREEN}CNAME record created in Cloudflare for: $site${NC}"
echo -e "${GREEN}Local directory created at: /var/www/html/$site${NC}"
echo -e "${YELLOW}You can now start working on your project!${NC}"