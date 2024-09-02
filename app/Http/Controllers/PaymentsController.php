<?php

namespace App\Http\Controllers;

use App\Mail\DownloadLinkEmail;
use App\Services\PaymentsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Stripe\Checkout\Session;

class PaymentsController extends Controller
{
    protected $paymentsService;

    public function __construct(PaymentsService $paymentsService)
    {
        $this->paymentsService = $paymentsService;
    }

    public function redirectToSubscriptionCheckout(Request $request)
    {
        $checkout_session = $this->paymentsService->redirectToCheckout(
            $request->input('price_id'),
            route('payments.success'),
            route('payments.cancel'),
            'subscription'
        );
        return redirect($checkout_session->url);
    }

    public function redirectToOneTimeCheckout(Request $request)
    {
        $checkout_session = $this->paymentsService->redirectToCheckout(
            $request->input('price_id'),
            route('payments.success') . '?session_id={CHECKOUT_SESSION_ID}',
            route('payments.cancel'),
            'payment'
        );
        return redirect($checkout_session->url);
    }

    public function paymentSuccess(Request $request)
    {
        $session_id = $request->input('session_id');
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $session = \Stripe\Checkout\Session::retrieve($session_id);

        if ($session->payment_status == 'paid') {
            $this->paymentsService->sendDownloadLink($session->customer_details->email);
            return Inertia::render('Payments/Success', [
                'file_url' => route('payments.download'),
            ]);
        }

        return Inertia::render('Payments/Success', [
            'message' => 'Your payment was successful!',
            'appUrl' => env('APP_URL'),
        ]);
    }

    public function paymentSubscriptionSuccess()
    {
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
