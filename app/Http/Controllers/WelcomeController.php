<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
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
    }
}
