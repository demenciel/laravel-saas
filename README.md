# Technosaas Boilerplate Documentation

**Version:** 1.0.0  
**Last Updated:** September 1, 2024

## Table of Contents

1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Installation](#3-installation)
    - [3.1 Local Installation](#31-local-installation)
    - [3.2 Laravel Herd Installation](#33-laravel-herd-installation)
4. [Configuration](#4-configuration)
    - [4.1 Environment Variables](#41-environment-variables)
    - [4.2 Database Setup](#42-database-setup)
5. [Project Structure](#5-project-structure)
6. [Makefile Commands](#6-makefile-commands)
7. [Key Features](#7-key-features)
    - [7.1 MUI Integration](#71-mui-integration)
    - [7.2 Authentication with Laravel Breeze](#72-authentication-with-laravel-breeze)
    - [7.3 OAuth Integration (Google & Facebook)](#73-oauth-integration-google--facebook)
    - [7.4 Stripe Integration](#74-stripe-integration)
    - [7.5 Dark and Light Mode Support](#75-dark-and-light-mode-support)
    - [7.6 Snackbar Provider](#76-snackbar-provider)
    - [7.7 Responsive Design](#77-responsive-design)
    - [7.8 SEO Head Templates](#78-seo-head-templates)
8. [Customization](#8-customization)
9. [Third-Party Services Setup](#9-third-party-services-setup)
    - [9.1 Stripe Configuration](#91-stripe-configuration)
    - [9.2 Google OAuth Configuration](#92-google-oauth-configuration)
    - [9.3 Facebook OAuth Configuration](#93-facebook-oauth-configuration)
10. [Security Considerations](#10-security-considerations)
11. [Support and Troubleshooting](#11-support-and-troubleshooting)
12. [License](#12-license)
13. [Contributing](#13-contributing)
14. [Changelog](#14-changelog)
15. [Acknowledgments](#15-acknowledgments)

---

## 1. Introduction

Welcome to the **Technosaas Boilerplate** documentation. This boilerplate is designed to accelerate the development of small SaaS applications and side projects for developers and solopreneurs. It provides a robust starting point with pre-configured integrations and features, allowing you to focus on building your application's core functionality.

**Key Highlights:**

-   Built with **Laravel** and **React** using **Inertia.js**
-   Integrated **Tailwind CSS** and **Material UI (MUI)** for rapid UI development
-   Ready-to-use **authentication** and **OAuth** setup with Laravel Breeze
-   **Stripe** integration for seamless payment processing
-   Docker support for easy environment setup and deployment
-   Responsive design with dark and light mode support
-   SEO optimization through customizable head templates

---

## 2. Prerequisites

Before setting up the Technosaas Boilerplate, ensure that your system meets the following requirements:

-   **PHP:** Version 8.2 or higher
-   **Node.js:** Latest stable version
-   **Composer:** Latest stable version
-   **Docker:** Installed and running (for Docker installation method)
-   **Laravel Herd:** Installed (for Laravel Herd installation method)

---

## 3. Installation

There are three methods to set up the Technosaas Boilerplate:

1. [Local Installation](#31-local-installation)
2. [Scripted Server Setup](#32-scripted-server-setup)
3. [Laravel Herd Installation](#33-laravel-herd-installation)

Choose the method that best fits your development environment and preferences.

### 3.1. Local Installation

#### 3.1.1. Clone the Repository

```bash
git clone https://github.com/yourusername/technosaas-boilerplate.git
cd technosaas-boilerplate
```

#### 3.1.2. Install Dependencies

**Install PHP Dependencies:**

```bash
composer install
```

**Install Node.js Dependencies:**

```bash
npm install
```

#### 3.1.3. Configure Environment Variables

-   Create a copy of the example environment file:
    ```bash
    cp .env.example .env
    ```
-   Update the `.env` file with your specific configuration details (database credentials, API keys, etc.).

#### 3.1.4. Generate Application Key

```bash
php artisan key:generate
```

#### 3.1.5. Run Database Migrations

```bash
php artisan migrate
```

#### 3.1.6. Start Development Server

```bash
php artisan serve
```

**Start Frontend Development Server:**

```bash
npm run dev
```

Your application should now be running at `http://localhost:8000`.

### 3.2. Scripted Server Setup

The Makefile provided with TechnoSaas simplifies the setup and deployment process on a server. This is ideal for setting up your project in a production environment.

#### 3.2.1. Download and Extract the Boilerplate

After purchasing, download the .zip file and extract it to your server.

#### 3.2.2. Run the Setup Script

Use the provided Makefile to automate the setup process.

**Run the Full Setup:**

```bash
  make all
```

This command will guide you through setting up your environment, creating SSL certificates with Cloudflare and Certbot, configuring Nginx, and setting up your GitHub repository.

**Alternatively, You Can Run Each Step Individually:**

- Set up Configuration:
```bash
  make setup
  ```

- Create GitHub Repository and Cloudflare CNAME:
```bash
  make create_repo
  ```

- Create SSL Certificate:
```bash
  make create_ssl
  ```

- Create Nginx Configuration:
```bash
  make create_nginx
  ```

#### 3.2.3. Access Your Application

After running the setup scripts, your application will be accessible at the domain you configured in the setup.

### 3.2. Laravel Herd Installation

#### 3.2.1. Ensure Laravel Herd is Installed

Install Laravel Herd by following the official documentation: [Laravel Herd Installation Guide](https://laravel.com/docs/herd)

#### 3.2.2. Clone the Repository

```bash
git clone https://github.com/yourusername/technosaas-boilerplate.git
cd technosaas-boilerplate
```

#### 3.2.3. Install Dependencies

**Install PHP Dependencies:**

```bash
composer install
```

**Install Node.js Dependencies:**

```bash
npm install
```

#### 3.2.4. Configure Environment Variables

-   Create a copy of the example environment file:
    ```bash
    cp .env.example .env
    ```
-   Update the `.env` file with your specific configuration details.

#### 3.2.5. Generate Application Key

```bash
php artisan key:generate
```

#### 3.2.6. Run Database Migrations

```bash
php artisan migrate
```

#### 3.2.7. Serve the Application

Laravel Herd will automatically serve your application. Access it via the URL provided by Herd, typically `http://technosaas-boilerplate.test`.

---

## 4. Configuration

### 4.1. Environment Variables

The application uses a `.env` file to manage configuration settings. After copying `.env.example` to `.env`, update the following variables:

#### 4.1.1. Application Settings

```env
APP_NAME=Technosaas
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost
```

#### 4.1.2. Database Configuration

```env
DB_CONNECTION=sqlite
DB_DATABASE=./database/database.sqlite
```

#### 4.1.3. Mail Configuration

```env
MAIL_MAILER=smtp
MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

#### 4.1.4. Third-Party Services

Refer to the [Third-Party Services Setup](#9-third-party-services-setup) section for detailed configuration of Stripe, Google, and Facebook services.

### 4.2. Database Setup

The boilerplate uses **SQLite** for easy setup and portability.

#### 4.2.1. Initializing the Database

-   Ensure the database file exists:
    ```bash
    touch database/database.sqlite
    ```
-   Run migrations to set up the database schema:
    ```bash
    php artisan migrate
    ```
    or using Makefile:
    ```bash
    make migrate
    ```

#### 4.2.2. Database Migrations Commands

-   **Run Migrations:**
    ```bash
    php artisan migrate
    ```
-   **Rollback Migrations:**
    ```bash
    php artisan migrate:rollback
    ```
-   **Check Migration Status:**
    ```bash
    php artisan migrate:status
    ```

---

## 5. Project Structure

Understanding the project structure helps in navigating and customizing the application effectively.

```bash
technosaas-boilerplate/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   ├── Providers/
│   └── Services/
├── bootstrap/
├── config/
├── database/
│   ├── migrations/
│   ├── factories/
│   └── seeders/
├── public/
├── resources/
│   ├── css/
│   ├── js/
│   │   ├── Components/
│   │   ├── Hooks/
│   │   ├── Layouts/
│   │   ├── Pages/
│   │   ├── lib/
│   │   └── types/
│   └── views/
├── routes/
│   ├── web.php
│   ├── api.php
│   └── console.php
├── storage/
├── tests/
│   ├── Feature/
│   └── Unit/
├── Makefile
├── package.json
├── composer.json
└── README.md
```

**Key Directories:**

-   **app/**: Contains the core application code including controllers, models, services, and middleware.
-   **resources/**: Contains frontend resources like React components, stylesheets, and views.
-   **database/**: Contains migration files and database factories.
-   **routes/**: Defines all application routes.
-   **tests/**: Contains unit and feature tests.
-   **docker-compose.yml**: Defines Docker services for the application.
-   **Makefile**: Provides utility commands for managing the application and Docker containers.

---

## 6. Makefile Commands

The provided **Makefile** simplifies various development tasks. Below are the available commands and their descriptions.

### 6.1. Laravel Commands

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `make migration`  | Creates a new migration file            |
| `make migrate`    | Runs database migrations                |
| `make rollback`   | Rolls back the last database migration  |
| `make model`      | Creates a new Laravel model             |
| `make controller` | Creates a new Laravel controller        |
| `make seed`       | Runs database seeders                   |
| `make server`     | Starts the Laravel development server   |
| `make generate`   | Runs custom command to generate recipes |

**Usage Example:**

```bash
make migrate
```

This command runs database migrations inside the Docker `app` container.

---

## 7. Key Features

### 7.1. MUI Integration

The boilerplate uses **Material UI (MUI)** for building responsive and accessible user interfaces quickly.

**Usage:**

-   MUI components are readily available throughout the project.
-   Customize themes and styles in `resources/js/lib/theme.js`.

**Resources:**

-   [MUI Documentation](https://mui.com/material-ui/getting-started/overview/)

### 7.2. Authentication with Laravel Breeze

**Laravel Breeze** provides a simple and minimal implementation of all Laravel's authentication features, including login, registration, password reset, email verification, and password confirmation.

**Features:**

-   Pre-built authentication routes and controllers.
-   User-friendly authentication pages built with React and Inertia.js.

**Customization:**

-   Modify authentication views in `resources/js/Pages/Auth/`.
-   Customize routes in `routes/web.php`.

**Resources:**

-   [Laravel Breeze Documentation](https://laravel.com/docs/breeze)

### 7.3. OAuth Integration (Google & Facebook)

Enable users to log in using their **Google** or **Facebook** accounts.

**Setup:**

-   Configure API credentials in the `.env` file.
-   Implemented using Laravel Socialite.

**Usage:**

-   OAuth routes and controllers are pre-configured.
-   Customize OAuth logic in `app/Http/Controllers/Auth/SocialAuthController.php`.

**Resources:**

-   [Laravel Socialite Documentation](https://laravel.com/docs/socialite)

### 7.4. Stripe Integration

Seamless payment processing integrated with **Stripe** for handling one-time payments and subscriptions.

**Setup:**

-   Add Stripe API keys to the `.env` file.
-   Payment routes and controllers are set up for immediate use for either one-time payments or subscriptions.

**Features:**

-   Secure payment processing.
-   Easy customization for different payment models.

**Resources:**

-   [Stripe PHP SDK](https://stripe.com/docs/api)
-   [Laravel Cashier](https://laravel.com/docs/cashier)

### 7.5. Dark and Light Mode Support

Built-in support for toggling between **dark and light themes** to enhance user experience.

**Usage:**

-   Theme toggle component available in the UI.
-   Themes are managed using MUI's theming capabilities.

**Customization:**

-   Update theme configurations in `resources/js/lib/theme.js`.

### 7.6. Snackbar Provider

Centralized **Snackbar** notifications for displaying brief messages to users.

**Usage:**

-   Utilize the Snackbar context provided in `resources/js/Hooks/useSnackbar.js`.
-   Easily trigger notifications from any component.

**Customization:**

-   Modify default settings such as duration and position in the Snackbar provider.

### 7.7. Responsive Design

The application is designed to be **fully responsive**, ensuring optimal user experience across all device sizes.

**Implementation:**

-   Utilizes **Tailwind CSS** and **MUI** for responsive layouts and components.
-   Mobile-first approach in design and development.

**Customization:**

-   Adjust responsive breakpoints and styles in Tailwind and MUI configurations.

### 7.8. SEO Head Templates

Pre-configured **SEO head templates** for better search engine optimization.

**Usage:**

-   Customize meta tags and titles in each page component.
-   Dynamic generation of SEO tags based on page content.

**Implementation:**

-   Leveraging React Helmet or similar libraries for managing head tags.

---

## 8. Customization

The Technosaas Boilerplate is fully customizable to suit your project's specific needs.

**Areas of Customization:**

-   **UI Components:** Modify or extend existing React components in `resources/js/Components/`.
-   **Styles:** Customize styles using Tailwind CSS classes and MUI theming.
-   **Routes:** Add or modify routes in `routes/web.php` and corresponding controllers.
-   **Services:** Implement additional services or business logic in `app/Services/`.
-   **Database:** Extend the database schema by creating new migrations and models.
-   **API Integrations:** Integrate additional third-party services as needed.

**Guidelines:**

-   Follow Laravel and React best practices for structuring and organizing code.
-   Maintain consistent coding styles and naming conventions throughout the project.
-   Leverage the existing Makefile commands for streamlined development workflows.

---

## 9. Third-Party Services Setup

This section provides detailed instructions for configuring third-party services used in the boilerplate.

### 9.1. Stripe Configuration

#### 9.1.1. Obtain API Keys

-   Sign up or log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
-   Navigate to **Developers > API keys**.
-   Copy the **Publishable key** and **Secret key**.

#### 9.1.2. Update `.env` File

```env
STRIPE_KEY=your_publishable_key
STRIPE_SECRET=your_secret_key
```

#### 9.1.3. Testing Payments

-   Use Stripe's **test mode** keys for development and testing.
-   Ensure webhook endpoints are configured if needed.

**Resources:**

-   [Stripe Documentation](https://stripe.com/docs)

### 9.2. Google OAuth Configuration

Please refer to the [Google OAuth Configuration Guide](#) for detailed setup instructions.

**(Note: Provide a separate document or section detailing the steps for setting up Google OAuth, including creating a Google Cloud project, obtaining client IDs and secrets, and configuring redirect URIs.)**

### 9.3. Facebook OAuth Configuration

Please refer to the [Facebook OAuth Configuration Guide](#) for detailed setup instructions.

**(Note: Provide a separate document or section detailing the steps for setting up Facebook OAuth, including creating a Facebook App, obtaining App IDs and secrets, and configuring redirect URIs.)**

---

## 10. Security Considerations

Ensuring the security of your application is paramount. The boilerplate includes several security features and best practices.

### 10.1. Authentication

-   **Laravel Breeze** handles standard authentication mechanisms securely.
-   **OAuth** integrations with Google and Facebook use secure protocols.

### 10.2. Authorization

-   Utilize Laravel's **Gate** and **Policy** features for fine-grained access control.
-   Define authorization logic in `app/Policies/`.

### 10.3. Data Protection

-   Sensitive data such as passwords are hashed using bcrypt.
-   HTTPS should be enforced in production environments.

### 10.4. Environment Variables

-   **Never** commit your `.env` file to version control.
-   Use environment-specific configurations and secrets management solutions.

### 10.5. Input Validation and Sanitization

-   Utilize Laravel's **Form Requests** for validating and sanitizing user input.
-   Define validation rules in `app/Http/Requests/`.

### 10.6. Preventing Common Vulnerabilities

-   Protect against **CSRF** attacks using Laravel's built-in CSRF protection.
-   Use prepared statements and ORM features to prevent **SQL Injection**.
-   Sanitize outputs to prevent **XSS** attacks.

**Resources:**

-   [Laravel Security Documentation](https://laravel.com/docs/security)

---

## 11. Support and Troubleshooting

### 11.1. Common Issues

#### 11.1.1. Docker Not Starting

-   **Symptom:** Running `make up` fails.
-   **Solution:** Ensure Docker is installed and running. Restart Docker service if necessary.

#### 11.1.2. Missing Dependencies

-   **Symptom:** Errors during `composer install` or `npm install`.
-   **Solution:** Ensure you have the latest versions of Composer and Node.js installed.

#### 11.1.3. Environment Variable Errors

-   **Symptom:** Application cannot connect to services or database.
-   **Solution:** Verify all required environment variables are correctly set in the `.env` file.

#### 11.1.4. Migration Failures

-   **Symptom:** Errors when running `php artisan migrate`.
-   **Solution:** Check database connection settings and ensure the database file exists and is writable.

### 11.2. Getting Support

-   **Issue Tracker:** Report issues on the project's GitHub repository issue tracker.
-   **Email:** Contact support at [contacttechnosaas@gmail.com](mailto:contacttechnosaas@gmail.com).
-   **Community Forum:** Join the community forum at [forum.technosaas.com](https://forum.technosaas.com).

### 11.3. Contribution Guidelines

We welcome contributions from the community. Please refer to the [Contributing](#13-contributing) section for more information.

---

## 12. License

The Technosaas Boilerplate is open-source software licensed under the **MIT License**.

**MIT License Details:**

```
Permission is hereby granted, free of charge, to any person obtaining a copy...
```

Please refer to the [LICENSE](LICENSE/LICENSE.txt) file for the full license text.

---

## 13. Changelog

**v1.0.0 - September 1, 2024**

-   Initial release with core features:
    -   Laravel and React integration using Inertia.js
    -   Authentication setup with Laravel Breeze
    -   OAuth integration with Google and Facebook
    -   Stripe payment integration
    -   Responsive design with dark and light mode
    -   SEO optimization features

---

## 14. Acknowledgments

We would like to thank the following:

-   **Laravel Team:** For providing an excellent PHP framework.
-   **React and Inertia.js Teams:** For enabling seamless frontend development.

---

**For any further assistance or inquiries, please contact [contacttechnosaas@gmail.com](mailto:contacttechnosaas@gmail.com).**
