<?php

namespace App\Http\Controllers;

use App\Mail\DownloadLinkEmail;
use App\Models\DownloadLink;
use App\Services\PaymentsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        try {
            $session_id = $request->input('session_id');
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

            // Retrieve the session and expand line_items
            $session = \Stripe\Checkout\Session::retrieve([
                'id' => $session_id,
                'expand' => ['line_items.data.price.product'],
            ]);

            $downloadLink = DownloadLink::where('session_id', $session_id)->first();

            if ($session->payment_status == 'paid' && !$downloadLink) {
                // Get product id from session line items
                $lineItem = $session->line_items->data[0];

                // Get the product directly from the expanded line item
                $product = $lineItem->price->product;

                // Map the product ID to the correct file
                $productFile = $this->mapProductIdToProductFile($product->id);
                DownloadLink::create([
                    'email' => $session->customer_details->email,
                    'session_id' => $session_id,
                    'downloaded' => false,
                    'sent_at' => now(),
                    'product' => $productFile,
                ]);

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

    protected function mapProductIdToProductFile($productId)
    {
        // Example logic for mapping price ID to product file
        $mapping = [
            env('STRIPE_PRODUCT_ID_ONE') => 'v1.zip',
            env('STRIPE_PRODUCT_ID_TWO') => 'v2.zip',
        ];
        if (isset($mapping[$productId])) {
            return $mapping[$productId];
        } else {
            throw new \Exception('Product file not found for product ID: ' . $productId);
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

        info('DOWNLAOD PRODUCT: ' . $downloadLink->product);
        $filePath = storage_path('app/' . $downloadLink->product);
        if (!file_exists($filePath)) {
            Log::error('File not found: ' . $filePath);
            return Inertia::render('Payments/Success', [
                'message' => 'The file you requested is not available. Please contact support.',
                'appUrl' => env('APP_URL'),
            ]);
        }
        $downloadLink->update(['downloaded' => true]);
        return response()->download($filePath);
    }
}
