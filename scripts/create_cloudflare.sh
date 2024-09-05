#!/bin/bash
# create_cloudflare.sh

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get site name
site=$1

if [ "$site" = "" ]; then
    echo -e "${RED}ERROR: Missing site parameter. Please provide a site name.${NC}"
    echo "Usage: $0 <site_name>"
    exit 1
fi

echo -e "${YELLOW}==========================================================${NC}"
echo -e "${YELLOW}CREATING CNAME RECORD IN CLOUDFLARE${NC}"
echo -e "${YELLOW}==========================================================${NC}"

# Load configuration
if [ ! -f "/var/www/html/config.sh" ]; then
    echo -e "${RED}ERROR: Configuration file not found. Please run setup_config.sh first.${NC}"
    exit 1
fi
source /var/www/html/config.sh

# Check Cloudflare credentials
if [ -z "$CF_ZONE" ] || [ -z "$CF_AUTH" ] || [ -z "$CF_EMAIL" ]; then
    echo -e "${RED}ERROR: Cloudflare configuration is incomplete. Please run setup_config.sh to set up your Cloudflare credentials.${NC}"
    exit 1
fi

# Create Cloudflare DNS record
cf_response=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/dns_records" \
    -H "X-Auth-Email: $CF_EMAIL" \
    -H "X-Auth-Key: $CF_AUTH" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"$site\",\"content\":\"@\"}")

echo -e "${YELLOW}Cloudflare API Response:${NC}"
echo "$cf_response"

if echo "$cf_response" | grep -q "\"success\":true"; then
    echo -e "${GREEN}SUCCESS: CNAME record for '$site' created successfully in Cloudflare.${NC}"
else
    echo -e "${RED}ERROR: Failed to create CNAME record. Please check the API response above for details.${NC}"
    exit 1
fi
