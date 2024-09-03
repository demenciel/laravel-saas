<?php

use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FacebookController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Welcome to TechnoSaas Routes
|--------------------------------------------------------------------------
|
| This file contains the route definitions for your TechnoSaas application.
| Here you'll find routes for various features including:
|
| - Welcome page
| - Social authentication (Facebook, Google)
| - Password reset and forgot password functionality
| - Payment processing
| - User profile management
| - Dashboard access
|
| Feel free to add or modify routes as your application grows.
| Remember to keep your routes organized and well-commented for easy maintenance.
*/

/* ------------------------------
    WELCOME ROUTES
------------------------------ */

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

/* ------------------------------
    SOCIAL ROUTES
------------------------------ */
Route::prefix('facebook')->name('facebook.')->group(function () {
    Route::get('auth', [FacebookController::class, 'loginUsingFacebook'])->name('login');
    Route::get('callback', [FacebookController::class, 'callbackFromFacebook'])->name('callback');
});

Route::prefix('google')->name('google.')->group(function () {
    Route::get('redirect', [GoogleController::class, 'redirectToGoogle'])->name('login');
    Route::get('callback', [GoogleController::class, 'handleGoogleCallback'])->name('callback');
});

/* ------------------------------
    PAYMENTS ROUTES
------------------------------ */
Route::prefix('payments')->name('payments.')->group(function () {
    Route::post('/redirect-to-one-time-checkout', [PaymentsController::class, 'redirectToOneTimeCheckout'])->name('one-time-checkout');
    Route::post('/redirect-to-subscription-checkout', [PaymentsController::class, 'redirectToSubscriptionCheckout'])->name('subscription-checkout');
    Route::get('/download', [PaymentsController::class, 'downloadBoilerplate'])->name('download');
    Route::get('/success', [PaymentsController::class, 'paymentSuccess'])->name('success');
    Route::get('/success-subscription', [PaymentsController::class, 'paymentSubscriptionSuccess'])->name('success-subscription');
    Route::get('/cancel', [PaymentsController::class, 'paymentCancel'])->name('cancel');
});

/* ------------------------------
    STRIPE WEBHOOK ROUTE
------------------------------ */
Route::post(
    'stripe/webhook',
    [PaymentsController::class, 'handleWebhook']
)->name('stripe.webhook');

/* ------------------------------
    PROTECTED ROUTES
------------------------------ */
Route::middleware('auth')->group(function () {
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


require __DIR__ . '/auth.php';
