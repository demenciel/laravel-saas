<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Checkout\Session;

class SubscribeController extends Controller
{
    public function redirectToCheckout(Request $request)
    {
        $user = Auth::user();
        $product_id = $request->input('product_id');

        $checkout_session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => $product_id, // Assuming you store price IDs in your Stripe dashboard
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'success_url' => route('subscription.success'),
            'cancel_url' => route('subscription.cancel'),
        ]);

        return redirect($checkout_session->url);
    }
}
