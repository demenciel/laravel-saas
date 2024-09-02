<?php

namespace App\Http\Controllers;

use App\Services\GoogleService;

class GoogleController extends Controller
{
    protected $googleService;

    public function __construct(GoogleService $googleService)
    {
        $this->googleService = $googleService;
    }

    /**
     * Redirect to Google for authentication.
     */
    public function redirectToGoogle()
    {
        return $this->googleService->redirect();
    }

    /**
     * Handle the callback from Google authentication.
     */
    public function handleGoogleCallback()
    {
        return $this->googleService->callback();
    }
}
