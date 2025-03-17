<?php

use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\TicketTypeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EventController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/**
 * -------------------------------
 * Authentication Routes
 * -------------------------------
 */
Route::post('register', [RegisteredUserController::class, 'store']);
Route::post('login', [AuthenticatedSessionController::class, 'store']);
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

/**
 * -------------------------------
 * Event Routes
 * -------------------------------
 */
Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('events')->group(function () {
        // Route::get('/', [EventController::class, 'getEvents']);
        Route::get('/', [EventController::class, 'getEvents'])->middleware('permission:view event');
        Route::post('/', [EventController::class, 'createEvent']);
        Route::get('{id}', [EventController::class, 'getEvent']);
        Route::put('{id}', [EventController::class, 'editEvent']);
        Route::delete('{id}', [EventController::class, 'deleteEvent']);
    });
});

/**
 * -------------------------------
 * Ticket Type Routes
 * -------------------------------
 */
Route::middleware(['auth:sanctum'])->prefix('ticket-types')->group(function () {
    Route::post('/', [TicketTypeController::class, 'createTicketType']);
    Route::get('/', [TicketTypeController::class, 'getTicketTypes']);
    Route::get('{id}', [TicketTypeController::class, 'getTicketType']);
    Route::put('{id}', [TicketTypeController::class, 'editTicketType']);
    Route::delete('{id}', [TicketTypeController::class, 'deleteTicketType']);
});

Route::get('/events/{event_id}/ticket-types', [TicketTypeController::class, 'getTicketTypesForEvent']);

/**
 * -------------------------------
 * User Routes
 * -------------------------------
 */
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('users', [UserController::class, 'getUsers'])->middleware('role:super admin');
});

/**
 * -------------------------------
 * Role Routes
 * -------------------------------
 */
Route::middleware(['auth:sanctum'])->prefix('roles')->group(function () {
    Route::post('/', [RoleController::class, 'createRole']);
    Route::get('/', [RoleController::class, 'getRoles']);
    Route::get('{role}', [RoleController::class, 'getRole']);
    Route::put('{role}', [RoleController::class, 'editRole']);
    Route::delete('{role}', [RoleController::class, 'deleteRole']);
    
    // Role-Permission Management
    Route::get('{role}/permissions', [RoleController::class, 'addPermissionToRole']);
    Route::post('{role}/permissions', [RoleController::class, 'givePermissionToRole']);
});

/**
 * -------------------------------
 * Permission Routes
 * -------------------------------
 */
Route::middleware(['auth:sanctum'])->prefix('permissions')->group(function () {
    Route::post('/', [PermissionController::class, 'createPermission']);
    Route::get('/', [PermissionController::class, 'getPermissions']);
    Route::get('{permission}', [PermissionController::class, 'getPermission']);
    Route::put('{permission}', [PermissionController::class, 'editPermission']);
    Route::delete('{permission}', [PermissionController::class, 'deletePermission']);
});
