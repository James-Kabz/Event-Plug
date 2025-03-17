<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Define roles
        $roles = [
            'super admin',
            'event organiser',
            'user'
        ];

        // Define permissions
        $permissions = [
            'create role', 'edit role', 'view role', 'delete role',
            'create permission', 'edit permission', 'view permission', 'delete permission',
            'create event', 'view event', 'edit event', 'delete event'
        ];

        // Create roles
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Create permissions
        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName]);
        }

        // Assign permissions to roles
        Role::findByName('super admin')->givePermissionTo($permissions);
        Role::findByName('event organiser')->givePermissionTo([
            'create event', 'view event', 'edit event', 'delete event'
        ]);
        Role::findByName('user')->givePermissionTo(['view event']);

        // Create users and assign roles
        $superAdmin = User::create([
            'id' => 1,
            'name' => 'James Kabz',
            'email' => 'kabogp@gmail.com',
            'phone_number' => '0740289578',
            'email_verified_at' => now(),
            'activation_token' => Str::random(32),
            'password' => Hash::make('password123'),
            'remember_token' => Str::random(10),
        ]);
        $superAdmin->assignRole('super admin');

        $eventOrganiser = User::create([
            'id' => 2,
            'name' => 'Jane Mutuku',
            'email' => 'jane@gmail.com',
            'phone_number' => '0987654321',
            'email_verified_at' => now(),
            'activation_token' => Str::random(32),
            'password' => Hash::make('password123'),
            'remember_token' => Str::random(10),
        ]);
        $eventOrganiser->assignRole('event organiser');
    }
}
