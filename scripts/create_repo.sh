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
sleep 1
# Load configuration
if [ ! -f "/var/www/html/config.sh" ]; then
    echo -e "${RED}ERROR: Configuration file not found. Please run setup_config.sh first.${NC}"
    exit 1
fi
source /var/www/html/config.sh

# Check GitHub credentials
if [ -z "$GIT_UID" ] || [ -z "$GIT_TOK" ]; then
    echo -e "${RED}ERROR: GitHub configuration is incomplete. Please run setup_config.sh to set up your GitHub credentials.${NC}"
    exit 1
fi

echo -e "${YELLOW}Checking if the repository already exists in the user account on GitHub...${NC}"
sleep 1
# Check if the repository already exists in the user's account
response=$(curl -s -X GET \
    "https://api.github.com/repos/$GIT_UID/$site" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token $GIT_TOK")

echo "$response"
if echo "$response" | !grep -q "\"message\":\"Not Found\""; then
    echo -e "${RED}ERROR: Repository '$site' already exists in the user account '$GIT_UID'. Exiting...${NC}"
    exit 1
fi

echo -e "${YELLOW}==========================================================${NC}"
echo -e "${YELLOW} Creating the '$site' repository on GitHub${NC}"
echo -e "${YELLOW}==========================================================${NC}"
sleep 1
# If GIT_ORG is set, create repository in the organization; else create it for the user
if [ -z "$GIT_ORG" ]; then
    response=$(curl -s -X POST \
        "https://api.github.com/user/repos" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Authorization: token $GIT_TOK" \
        -d "{\"name\":\"$site\",\"private\":true,\"auto_init\":false}")
else
    response=$(curl -s -X POST \
        "https://api.github.com/orgs/$GIT_ORG/repos" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Authorization: token $GIT_TOK" \
        -d "{\"name\":\"$site\",\"private\":true,\"auto_init\":false}")
fi

if echo "$response" | grep -q "\"errors\""; then
    echo -e "${RED}ERROR: Failed to create the repository. Please check the API response above for details.${NC}"
    exit 1
else
    if [ -z "$GIT_ORG" ]; then
        echo -e "${GREEN}SUCCESS: Repository '$site' created successfully for user $GIT_UID.${NC}"
        repo_url="https://github.com/$GIT_UID/$site.git"
    else
        echo -e "${GREEN}SUCCESS: Repository '$site' created successfully in the '$GIT_ORG' organization.${NC}"
        repo_url="https://github.com/$GIT_ORG/$site.git"
    fi
fi
sleep 2
# Init Repo 
if [ -d ".git" ]; then
    echo -e "${YELLOW}Existing Git repository found. Removing...${NC}"
    echo -e "${YELLOW}Removing any existing .git directory...${NC}"
    sudo rm -rf .git
    echo -e "${YELLOW}Removing any symlinks...${NC}"
    find . -type l -delete
    echo -e "${YELLOW}Copying files to ensure all content is original...${NC}"
    temp_dir=$(mktemp -d)
    cp -R . "$temp_dir"
    rm -rf *
    mv "$temp_dir"/* .
    rmdir "$temp_dir"
    echo -e "${GREEN}Existing Git repository removed.${NC}"
fi

# Initialize local repository
cd ..
echo -e "${YELLOW}Initializing local Git repository...${NC}"
git init -b main
sleep 2
# Check if there are any files to commit
if [ -n "$(git status --porcelain)" ]; then
    # Add all files in the current directory
    echo -e "${YELLOW}Adding files to the repository...${NC}"
    git add .

    # Commit the files
    echo -e "${YELLOW}Committing files...${NC}"
    git commit -m "Initial commit"
else
    echo -e "${YELLOW}No changes to commit. Skipping commit step.${NC}"
fi
sleep 2
# Add the remote repository
echo -e "${YELLOW}Adding remote repository...${NC}"
sleep 1
git remote add origin $repo_url
sleep 1
# Push to the remote repository
echo -e "${YELLOW}Pushing to remote repository...${NC}"
if ! git push --set-upstream origin master; then
    echo -e "${RED}ERROR: Failed to push to the remote repository. Please check your credentials and try again.${NC}"
    exit 1
fi
sleep 1
echo -e "${GREEN}SUCCESS: Repository '$site' pushed to remote repository.${NC}"
sleep 3
