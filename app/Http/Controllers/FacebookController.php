<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{
    public function loginUsingFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callbackFromFacebook()
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
