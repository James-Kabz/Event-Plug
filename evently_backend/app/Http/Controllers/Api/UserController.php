<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // get all users
    public function getUsers(){
        $users = User::all();
        return response()->json([
            'users' => $users
        ]);
    }
}
