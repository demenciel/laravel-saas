<?php

namespace App\Http\Controllers;

use App\Services\WelcomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{

    protected $welcomeService;

    public function __construct(WelcomeService $welcomeService)
    {
        $this->welcomeService = $welcomeService;
    }

    public function index(): Response
    {
        $products = $this->welcomeService->getProducts('one_time');
        return Inertia::render('Welcome/Index', [
            'appUrl' =>  env('APP_URL'),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'products' => $products,
            'csrf'  => csrf_token(),
            'stripeKey' => config('cashier.key'),
        ]);
    }
}
