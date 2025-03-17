<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // get all users
    public function getUsers()
    {
        $users = User::with(['roles', 'permissions'])->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name'),
                'permissions' => $user->permissions->pluck('name')
            ];
        });

        return response()->json([
            'users' => $users
        ]);
    }



    // create user
}
