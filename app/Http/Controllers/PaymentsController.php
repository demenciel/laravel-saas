<?php

namespace App\Http\Controllers;

use App\Models\DownloadLink;
use App\Services\PaymentsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class PaymentsController extends Controller
{
    protected $paymentsService;

    public function __construct(PaymentsService $paymentsService)
    {
        $this->paymentsService = $paymentsService;
    }

    /* 
        Redirect to the subscription checkout page
        @param Request $request
        @return \Illuminate\Http\RedirectResponse
    */
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

    /* 
        Redirect to the one-time checkout page
        @param Request $request
        @return \Illuminate\Http\RedirectResponse
    */
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

    /* 
        Handle the payment success page
        @param Request $request
        @return \Inertia\Response
    */
    public function paymentSuccess(Request $request)
    {
        try {
            $session_id = $request->input('session_id');
            $session = $this->paymentsService->getSession($session_id);
            $downloadLink = DownloadLink::where('session_id', $session_id)->first();
            if ($session->payment_status == 'paid' && !$downloadLink) {
                $this->paymentsService->createDownloadLink($session, $session_id);
                // Send the download link
                $this->paymentsService->sendDownloadLink($session->customer_details->email, $session_id);

                return Inertia::render('Payments/Success', [
                    'file_url' => route('payments.download', ['session_id' => $session_id]),
                ]);
            } else {
                return Inertia::render('Payments/Success', [
                    'message' => 'Your payment was successful!',
                    'appUrl' => env('APP_URL'),
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error processing payment: ' . $e);
            return Inertia::render('Payments/Cancel', [
                'message' => 'An error occurred while processing your payment. Please try again.',
                'appUrl' => env('APP_URL'),
            ]);
        }
    }

    /* 
        Handle the payment subscription success page
        @param Request $request
        @return \Inertia\Response
    */
    public function paymentSubscriptionSuccess()
    {
        return Inertia::render('Payments/Success', [
            'message' => 'Your payment was successful!',
            'appUrl' => env('APP_URL'),
        ]);
    }

    /* 
        Handle the payment cancel page
        @param Request $request
        @return \Inertia\Response
    */
    public function paymentCancel()
    {
        return Inertia::render('Payments/Cancel', [
            'message' => 'Your payment was unsuccessful. Please try again.',
            'appUrl' => env('APP_URL'),
        ]);
    }

    /* 
        Handle the download boilerplate page
        @param Request $request
        @return \Inertia\Response
    */
    public function downloadBoilerplate(Request $request)
    {
        $session_id = $request->input('session_id');
        $downloadLink = DownloadLink::where('session_id', $session_id)->first();
        if (!$downloadLink || $downloadLink->downloaded) {
            return Inertia::render('Payments/Success', [
                'message' => 'The file has already been downloaded or the link is invalid.',
                'appUrl' => env('APP_URL'),
            ]);
        }
        $filePath = $this->paymentsService->createFilePath($downloadLink);
        return response()->download($filePath);
    }
}
