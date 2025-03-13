<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::create([
            'id' => 1,
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone_number' => '1234567890',
            'email_verified_at' => now(),
            'activation_token' => Str::random(32),
            'password' => Hash::make('password123'),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'id' => 2,
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone_number' => '0987654321',
            'email_verified_at' => now(),
            'activation_token' => Str::random(32),
            'password' => Hash::make('password123'),
            'remember_token' => Str::random(10),
        ]);
    }
}
