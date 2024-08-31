<?php

use App\Http\Controllers\FacebookController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscribeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Stripe\Product;
use Stripe\Stripe;

Route::prefix('facebook')->name('facebook.')->group(function () {
    Route::get('auth', [FacebookController::class, 'loginUsingFacebook'])->name('login');
    Route::get('callback', [FaceBookController::class, 'callbackFromFacebook'])->name('callback');
});

Route::prefix('google')->name('google.')->group(function () {
    Route::get('redirect', [GoogleController::class, 'redirectToGoogle'])->name('login');
    Route::get('callback', [GoogleController::class, 'handleGoogleCallback'])->name('callback');
});

Route::get('/', function () {
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    $products = \Stripe\Product::all([
        'limit' => 3,
        'active' => true,
    ]);

    // Loop through products to fetch prices
    foreach ($products->data as $product) {
        $prices = \Stripe\Price::all([
            'product' => $product->id,
        ]);

        // Attach prices to the product object
        $product->prices = $prices->data;
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'products' => $products,
        'stripeKey' => config('cashier.key'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('subscribe')->name('subscribe.')->group(function () {
        Route::get('/', function () {
            $products = Product::all([
                'limit' => 3, // Adjust the limit as needed
            ]);
            return Inertia::render('Subscribe', [
                'stripeKey' => config('cashier.key'),
                'products' => $products,
            ]);
        })->name('index');
        Route::get('/subscribe', [SubscribeController::class, 'redirectToCheckout'])->name('subscribe');
        Route::get('/subscription/success', function () {
            return view('subscription.success');
        })->name('subscription.success');

        Route::get('/subscription/cancel', function () {
            return view('subscription.cancel');
        })->name('subscription.cancel');
    });
});

require __DIR__ . '/auth.php';
