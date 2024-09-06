<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Collection;


class WelcomeService
{

    public function getProducts(): \Stripe\Collection
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $products = \Stripe\Product::all([
            'limit' => 10,
            'active' => true,
        ]);
        foreach ($products->data as $product) {
            $prices = \Stripe\Price::all([
                'product' => $product->id,
            ]);
            $product->prices = $prices->data;
        }
        return $products;
    }

    public function getOneTimeProducts($products)
    {
        return array_filter($products, function ($product) {
            return !empty(array_filter($product->prices, function ($price) {
                return $price->recurring === null;
            }));
        });
    }

    public function getSubscriptionProducts($products)
    {
        return array_filter($products, function ($product) {
            return !empty(array_filter($product->prices, function ($price) {
                return $price->recurring !== null;
            }));
        });
    }
}
