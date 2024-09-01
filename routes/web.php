<?php

use App\Http\Controllers\FacebookController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ProfileController;
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

    foreach ($products->data as $product) {
        $prices = \Stripe\Price::all([
            'product' => $product->id,
        ]);
        $product->prices = $prices->data;
    }
    return Inertia::render('Welcome', [
        'appUrl' =>  env('APP_URL'),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => $products,
        'csrf'  => csrf_token(),
        'stripeKey' => config('cashier.key'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'appUrl' =>  env('APP_URL'),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('payments')->name('payments.')->group(function () {
    Route::post('/redirect-to-one-time-checkout', [PaymentsController::class, 'redirectToOneTimeCheckout'])->name('one-time-checkout');
    Route::get('/download', [PaymentsController::class, 'downloadBoilerplate'])->name('download');
    Route::get('/success', [PaymentsController::class, 'paymentSuccess'])->name('success');
    Route::get('/cancel', [PaymentsController::class, 'paymentCancel'])->name('cancel');
});

Route::middleware('auth')->group(function () {
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});


require __DIR__ . '/auth.php';
