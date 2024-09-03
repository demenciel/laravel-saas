<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\FacebookService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{

    /**
     * Redirect to Facebook for authentication.
     */
    public function loginUsingFacebook()
    {
        try {
            return Socialite::driver('facebook')->redirect();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Facebook authentication failed. Please try again.');
        }
    }

    /**
     * Handle the callback from Facebook authentication.
     */

    public function callbackFromFacebook()
    {
        try {
            $user = Socialite::driver('facebook')->user();
        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            return redirect()->route('login')->with('error', 'Facebook authentication failed. Please try again.');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Facebook authentication failed. Please try again.');
        }

        $existingUser = User::where('email', $user->getEmail())->first();
        if (!$existingUser) {
            $existingUser = User::create([
                'facebook_id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'password' => Hash::make($user->getName() . '@' . $user->getId())
            ]);
        } else {
            $existingUser->facebook_id = $user->getId();
            $existingUser->save();
        }

        Auth::loginUsingId($existingUser->id);

        return redirect()->route('dashboard');
    }
}
