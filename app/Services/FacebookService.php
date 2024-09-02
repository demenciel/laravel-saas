<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\FacebookProvider;

class FacebookService extends FacebookProvider
{
    /**
     * Redirect to Facebook for authentication.
     */
    public function redirect()
    {
        return Socialite::driver('facebook')->redirect();
    }

    /**
     * Handle the callback from Facebook authentication.
     */
    public function callback()
    {
        try {
            $user = Socialite::driver('facebook')->user();
        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            return redirect()->route('login')->with('error', 'Facebook authentication failed. Please try again.');
        }

        $saveUser = User::updateOrCreate([
            'facebook_id' => $user->getId(),
        ], [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'password' => Hash::make($user->getName() . '@' . $user->getId())
        ]);

        Auth::loginUsingId($saveUser->id);

        return redirect()->route('dashboard');
    }
}
