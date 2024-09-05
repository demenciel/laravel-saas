#!/bin/bash
# create_repo.sh

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
echo -e "${YELLOW}CREATING THE '$site' REPO ON GITHUB VIA API${NC}"
echo -e "${YELLOW}==========================================================${NC}"

# Load configuration
if [ ! -f "/var/www/html/config.sh" ]; then
    echo -e "${RED}ERROR: Configuration file not found. Please run setup_config.sh first.${NC}"
    exit 1
fi
source /var/www/html/config.sh

# Check GitHub credentials
if [ -z "$GIT_UID" ] || [ -z "$GIT_TOK" ]; then
    echo "ERROR: GitHub configuration is incomplete. Please run setup_config.sh to set up your GitHub credentials."
    exit 1
fi

echo "Sending request to GitHub API..."
if [ -z "$GIT_ORG" ]; then
    # If GIT_ORG is not set, create repository for the user
    response=$(curl -s -X POST \
        "https://api.github.com/user/repos" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Authorization: token $GIT_TOK" \
        -d "{\"name\":\"$site\",\"private\":true,\"auto_init\":false}")
else
    # If GIT_ORG is set, create repository in the organization
    response=$(curl -s -X POST \
        "https://api.github.com/orgs/$GIT_ORG/repos" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Authorization: token $GIT_TOK" \
        -d "{\"name\":\"$site\",\"private\":true,\"auto_init\":false}")
fi

echo "GitHub API Response:"
echo "$response"
echo ""

if echo "$response" | grep -q "\"errors\""; then
    echo "ERROR: Failed to create the repository. Please check the API response above for details."
    exit 1
else
    if [ -z "$GIT_ORG" ]; then
        echo "SUCCESS: Repository '$site' created successfully for user $GIT_UID."
    else
        echo "SUCCESS: Repository '$site' created successfully in the '$GIT_ORG' organization."
    fi
fi

echo -e "${YELLOW}GitHub API Response:${NC}"
echo "$response"

# Init Repo 
if echo "$response" | grep -q "\"errors\""; then
    echo "ERROR: Failed to create the repository. Please check the API response above for details."
    exit 1
else
    if [ -z "$GIT_ORG" ]; then
        echo "SUCCESS: Repository '$site' created successfully for user $GIT_UID."
        repo_url="https://github.com/$GIT_UID/$site.git"
    else
        echo "SUCCESS: Repository '$site' created successfully in the '$GIT_ORG' organization."
        repo_url="https://github.com/$GIT_ORG/$site.git"
    fi

    # Initialize local repository
    cd ..
    echo "Initializing local Git repository..."
    git init

    # Add all files in the current directory
    echo "Adding files to the repository..."
    git add .

    # Commit the files
    echo "Committing files..."
    git commit -m "Initial commit"

    # Add the remote
    echo "Adding remote repository..."
    git remote add origin $repo_url

    # Push to the remote repository
    echo "Pushing to remote repository..."
    git push -u origin main

    if [ $? -eq 0 ]; then
        echo "SUCCESS: Local repository initialized and pushed to GitHub."
    else
        echo "ERROR: Failed to push to the remote repository. Please check your credentials and try again."
        exit 1
    fi
fi
