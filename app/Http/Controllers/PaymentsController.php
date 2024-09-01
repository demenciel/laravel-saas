<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Checkout\Session;

class PaymentsController extends Controller
{

    public function redirectToOneTimeCheckout(Request $request)
    {
        $price_id = $request->input('price_id');
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $checkout_session = Session::create([
            'mode' => 'payment',
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => $price_id, // Assuming you store price IDs in your Stripe dashboard
                'quantity' => 1,
            ]],
            'success_url' => route('payments.success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('payments.cancel'),
        ]);
        return redirect($checkout_session->url);
    }

    public function paymentSuccess(Request $request)
    {
        $session_id = $request->input('session_id');
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $session = \Stripe\Checkout\Session::retrieve($session_id);

        if ($session->payment_status == 'paid') {
            return Inertia::render('Payments/Success', [
                'file_url' => route('payments.download'), // Pass download URL
            ]);
        }

        return Inertia::render('Payments/Success', [
            'message' => 'Your payment was successful!',
            'appUrl' => env('APP_URL'),
        ]);
    }

    public function paymentCancel()
    {
        return Inertia::render('Payments/Cancel', [
            'message' => 'Your payment was unsuccessful. Please try again.',
            'appUrl' => env('APP_URL'),
        ]);
    }

    public function downloadBoilerplate()
    {
        $filePath = storage_path('app/boilerplate.zip');
        return response()->download($filePath, 'boilerplate.zip');
    }
}
