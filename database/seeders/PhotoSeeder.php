<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Photo;
use App\Models\User;

class PhotoSeeder extends Seeder
{
    public function run()
    {
        // Create a photo for each user
        User::all()->each(function ($user) {
            Photo::create([
                'path' => '/images/default-avatar.webp',
            ])->user()->associate($user)->save();
        });
    }
}
