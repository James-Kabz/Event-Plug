<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'string'],
            ]);

            if (!Auth::attempt($validated)) {
                return response()->json(['message' => 'Invalid login credentials'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->roles->pluck('name')->first(), // ✅ Ensure role is a string
                    'permissions' => $user->getAllPermissions()->pluck('name')->toArray(), // ✅ Convert permissions to array
                ],
                'status' => 'Login successful',
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Something went wrong', 'error' => $e->getMessage()], 500);
        }
    }





    // public function destroy(Request $request)
    // {
    //     $request->user()->currentAccessToken()->delete();

    //     return response()->json(['message' => 'Logout successful']);
    // }

    public function destroy(Request $request)
    {
        // Logout the user
        auth()->guard('web')->logout();

        // Invalidate session and regenerate CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // public function store(LoginRequest $request): Response
    // {
    //     $validatedData = $request->validate([
    //         'email' => ['required', 'string', 'email'],
    //         'password' => ['required', 'string'],
    //     ]);

    //     $user = User::where('email', $request->email)->first();

    //     if(!Auth::attempt($validatedData)) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Login failed. Please check your credentials.'
    //         ], 401);
    //     }

    //     $token = $user->createToken($user->name)->plainTextToken;

    //     return response()->json([
    //         'success' => true,
    //         'user' => $user,
    //         'access_token' => $token
    //     ], 200);
    // }

    /**
     * Destroy an authenticated session.
     */
    // public function destroy(Request $request): Response
    // {
    //     Auth::guard('web')->logout();

    //     $request->session()->invalidate();

    //     $request->session()->regenerateToken();

    //     return response()->noContent();
    // }
}
