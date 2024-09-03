<?php

namespace App\Providers;

use App\Http\Controllers\FacebookController;
use Illuminate\Support\ServiceProvider;
use Laravel\Socialite\Two\FacebookProvider;
use Laravel\Socialite\Two\GoogleProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->when(FacebookProvider::class)
            ->needs('$clientId')
            ->give(fn() => config('services.facebook.client_id'));

        $this->app->when(FacebookProvider::class)
            ->needs('$clientSecret')
            ->give(fn() => config('services.facebook.client_secret'));

        $this->app->when(FacebookProvider::class)
            ->needs('$redirectUrl')
            ->give(fn() => config('services.facebook.redirect'));

        $this->app->when(GoogleProvider::class)
            ->needs('$clientId')
            ->give(fn() => config('services.google.client_id'));

        $this->app->when(GoogleProvider::class)
            ->needs('$clientSecret')
            ->give(fn() => config('services.google.client_secret'));

        $this->app->when(GoogleProvider::class)
            ->needs('$redirectUrl')
            ->give(fn() => config('services.google.redirect'));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
