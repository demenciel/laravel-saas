<?php

namespace App\Services;

use App\Mail\DownloadLinkEmail;
use App\Models\DownloadLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

    public function sendDownloadLink($email, $session_id)
    {
        // Generate the download link with the session_id as a query parameter
        $downloadLink = route('payments.download', ['session_id' => $session_id]);
        Mail::to($email)->send(new DownloadLinkEmail($downloadLink));
    }

    public function getSession($session_id)
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $session = \Stripe\Checkout\Session::retrieve([
            'id' => $session_id,
            'expand' => ['line_items.data.price.product'],
        ]);
        return $session;
    }

    public function createDownloadLink($session, $session_id)
    {
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

    public function createFilePath($downloadLink)
    {
        $filePath = storage_path('app/' . $downloadLink->product);
        if (!file_exists($filePath)) {
            Log::error('File not found: ' . $filePath);
            return Inertia::render('Payments/Success', [
                'message' => 'The file you requested is not available. Please contact support.',
                'appUrl' => env('APP_URL'),
            ]);
        }
        $downloadLink->update(['downloaded' => true]);
        return $filePath;
    }
}
