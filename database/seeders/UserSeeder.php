<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Photo;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $adminRoleId = Role::where('name', 'admin')->first()->id;
        $userRoleId = Role::where('name', 'seeder')->first()->id;

        // Create an admin user
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role_id' => $adminRoleId,
                'status' => 'active',
            ]
        );

        // Create regular users with random data
        User::factory(10)->create([
            'role_id' => $userRoleId,
            'status' => 'active',
        ])->each(function ($user) use ($faker) {
            $user->update([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
            ]);
        });
    }
}
