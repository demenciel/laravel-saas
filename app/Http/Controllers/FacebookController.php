<?php

namespace App\Http\Controllers;

use App\Services\FacebookService;

class FacebookController extends Controller
{
    protected $facebookService;

    public function __construct(FacebookService $facebookService)
    {
        $this->facebookService = $facebookService;
    }

    /**
     * Redirect to Facebook for authentication.
     */
    public function loginUsingFacebook()
    {
        return $this->facebookService->redirect();
    }

    /**
     * Handle the callback from Facebook authentication.
     */

    public function callbackFromFacebook()
    {
        return $this->facebookService->callback();
    }
}
