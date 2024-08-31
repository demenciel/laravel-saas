# Laravel SaaS Boilerplate

This Laravel-based SaaS boilerplate provides a solid foundation for building your next Software-as-a-Service application. It comes pre-configured with authentication, payment processing, social login, dark mode support, and responsive design.

## Features

-   **Authentication**: Laravel Breeze with Inertia.js
-   **Payments**: Stripe integration via Laravel Cashier
-   **Social Login**: Facebook, Google, etc., via Laravel Socialite
-   **Dark Mode**: Tailwind CSS support
-   **Responsive Design**: Pre-configured UI with Tailwind CSS
-   **Database**: SQLite for simplicity and ease of setup

## Prerequisites

-   PHP 8.1+
-   Composer
-   Node.js and npm
-   SQLite

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install PHP dependencies:

    ```
    composer install
    ```

3. Install and compile frontend dependencies:

    ```
    npm install
    npm run dev
    ```

4. Copy the `.env.example` file to `.env` and configure your environment variables:

    ```
    cp .env.example .env
    ```

5. Generate an application key:

    ```
    php artisan key:generate
    ```

6. Create an empty SQLite database file:

    ```
    touch database/database.sqlite
    ```

7. Update your `.env` file to use SQLite:

    ```
    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/your/project/database/database.sqlite
    ```

    Replace `/absolute/path/to/your/project/` with the actual path to your project directory.

8. Run database migrations:
    ```
    php artisan migrate
    ```

## Configuration

### Stripe Configuration

1. Sign up for a Stripe account at https://stripe.com if you haven't already.

2. Retrieve your Stripe API keys from the Stripe Dashboard.

3. Add the following to your `.env` file:

    ```
    STRIPE_KEY=your_stripe_publishable_key
    STRIPE_SECRET=your_stripe_secret_key
    ```

4. Configure webhook handling:
    - Set up a webhook endpoint in your Stripe Dashboard pointing to `https://your-app-url.com/stripe/webhook`.
    - Add the webhook secret to your `.env` file:
        ```
        STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
        ```

### Social Login Configuration

#### Facebook

1. Create a new app at https://developers.facebook.com/apps/

2. Set up Facebook Login and retrieve your App ID and App Secret.

3. Add to your `.env` file:
    ```
    FACEBOOK_CLIENT_ID=your_facebook_app_id
    FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
    FACEBOOK_REDIRECT_URI=https://your-app-url.com/login/facebook/callback
    ```

#### Google

1. Create a new project in the Google Developers Console: https://console.developers.google.com/

2. Enable the Google+ API and create OAuth 2.0 credentials.

3. Add to your `.env` file:
    ```
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_REDIRECT_URI=https://your-app-url.com/login/google/callback
    ```

## Usage

### Running the Application

1. Start the Laravel development server:

    ```
    php artisan serve
    ```

2. In a separate terminal, compile and hot-reload frontend assets:

    ```
    npm run dev
    ```

3. Visit `http://localhost:8000` in your browser.

### Authentication

-   Standard email/password registration and login are available out of the box.
-   Social login options can be accessed from the login page.

### Subscription Management

-   Users can manage their subscriptions from the account settings page.
-   Implement subscription logic in your controllers using Laravel Cashier methods.

### Dark Mode

-   A dark mode toggle is available in the user interface.
-   Tailwind CSS classes are used to support both light and dark modes.

## Customization

-   Views are located in `resources/views`
-   Tailwind CSS configuration is in `tailwind.config.js`
-   Add new routes in `routes/web.php`
-   Modify authentication logic in `app/Http/Controllers/Auth`

## Deployment

1. Set up your production environment (e.g., Laravel Forge, DigitalOcean, etc.).
2. Ensure all environment variables are properly set in your production environment.
3. For production, consider switching to a more robust database system like MySQL or PostgreSQL.
4. Run migrations on your production database.
5. Configure your web server to serve the application.
6. Set up SSL for secure connections.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Happy coding! We hope this boilerplate helps you build amazing SaaS applications with Laravel!
