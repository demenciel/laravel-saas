<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Render the dashboard view.
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'appUrl' =>  env('APP_URL'),
        ]);
    }
}
