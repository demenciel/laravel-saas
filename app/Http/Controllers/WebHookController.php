<?php

namespace App\Http\Controllers;

use App\Models\DownloadLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Webhook;
use Stripe\Stripe;
use Stripe\Checkout\Session as CheckoutSession;
use App\Services\PaymentsService;

class WebHookController extends Controller
{
    protected $paymentsService;

    public function __construct(PaymentsService $paymentsService)
    {
        $this->paymentsService = $paymentsService;
    }

    public function handleWebhook(Request $request)
    {
        // Set your secret key. Remember to switch to your live secret key in production.
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Retrieve the event from Stripe's payload
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                env('STRIPE_WEBHOOK_SECRET')
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response()->json(['error' => 'Invalid Payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response()->json(['error' => 'Invalid Signature'], 400);
        }

        // Handle the event
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object; // Contains a Stripe\Checkout\Session

                // Check if the link has already been sent
                $downloadLink = DownloadLink::where('session_id', $session->id)->first();

                if (!$downloadLink) {
                    // Send the download link
                    $this->paymentsService->sendDownloadLink($session->customer_details->email);

                    // Record the sent link in the database
                    DownloadLink::create([
                        'email' => $session->customer_details->email,
                        'session_id' => $session->id,
                        'sent_at' => now(),
                    ]);
                }
                break;

                // Handle other event types as needed

            default:
                return response()->json(['status' => 'unhandled event type'], 400);
        }

        return response()->json(['status' => 'success'], 200);
    }
}
