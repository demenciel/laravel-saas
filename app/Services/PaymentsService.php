<?php

namespace App\Services;

use App\Mail\DownloadLinkEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Stripe\Checkout\Session;

class PaymentsService
{
    public function redirectToCheckout($price_id, $success_url, $cancel_url, $mode)
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $checkout_session = Session::create([
            'mode' => $mode,
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => $price_id,
                'quantity' => 1,
            ]],
            'success_url' => $success_url,
            'cancel_url' => $cancel_url,
        ]);
        return $checkout_session;
    }

    public function sendDownloadLink($email)
    {
        $downloadLink = route('payments.download');
        Mail::to($email)->send(new DownloadLinkEmail($downloadLink));
    }
}
