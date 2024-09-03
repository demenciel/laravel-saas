<?php

namespace App\Http\Controllers;

use App\Mail\DownloadLinkEmail;
use App\Models\DownloadLink;
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

        $downloadLink = DownloadLink::where('session_id', $session_id)->first();

        if ($session->payment_status == 'paid' && !$downloadLink) {
            $this->paymentsService->sendDownloadLink($session->customer_details->email, $session_id);
            DownloadLink::create([
                'email' => $session->customer_details->email,
                'session_id' => $session_id,
                'downloaded' => false,
                'sent_at' => now(),
            ]);

            return Inertia::render('Payments/Success', [
                'file_url' => route('payments.download', ['session_id' => $session_id]),
            ]);
        } else {
            return Inertia::render('Payments/Success', [
                'message' => 'Your payment was successful!',
                'appUrl' => env('APP_URL'),
            ]);
        }
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

    public function downloadBoilerplate(Request $request)
    {
        $session_id = $request->input('session_id');
        $downloadLink = DownloadLink::where('session_id', $session_id)->first();

        if (!$downloadLink || $downloadLink->downloaded) {
            // Either the session ID is invalid or the file has already been downloaded
            return Inertia::render('Payments/Success', [
                'message' => 'The file has already been downloaded or the link is invalid.',
                'appUrl' => env('APP_URL'),
            ]);
        }
        $downloadLink->update(['downloaded' => true]);
        $filePath = storage_path('app/technosaas.zip');
        return response()->download($filePath, 'technosaas.zip');
    }
}
