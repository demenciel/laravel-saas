#!/bin/bash

# Start Laravel development server
echo "\e[34mStarting Laravel development server...\e[0m"
php artisan serve --host=0.0.0.0 --port=8000 &
echo "\e[32mLaravel development server started on port 8000\e[0m"

# Check if there are any pending migrations
if php artisan migrate:status | grep -q "No migrations found"; then
    echo "\e[34mNo pending migrations found.\e[0m"
else
    echo "\e[34mExecuting database migrations...\e[0m"
    php artisan migrate --force
    echo "\e[32mDatabase migrations completed.\e[0m"
fi

# Install npm dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "\e[34mInstalling npm dependencies...\e[0m"
    npm install
    echo "\e[32mnpm dependencies installed\e[0m"
fi
# Start Vite development server
echo "\e[34mStarting Vite development server...\e[0m"
npm run dev &
echo "\e[32mVite development server started\e[0m"
# Wait for all background processes to finish
wait
echo "\e[32mAll development servers started\e[0m"