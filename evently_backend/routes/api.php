<?php

use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TicketTypeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EventController;


// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// authentication


Route::post('register', [RegisteredUserController::class, 'store']);
Route::post('login', [AuthenticatedSessionController::class, 'store']);
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');





// events api's
Route::get('getEvents', [EventController::class, 'getEvents']);
Route::post('createEvent', [EventController::class, 'createEvent']);
Route::get('getEvent/{id}', [EventController::class, 'getEvent']);
Route::put('editEvent/{id}', [EventController::class, 'editEvent']);
Route::delete('deleteEvent/{id}', [EventController::class, 'deleteEvent']);


// ticket types api's

Route::post('createTicketType', [TicketTypeController::class, 'createTicketType']);
Route::get('getTicketTypes', [TicketTypeController::class, 'getTicketTypes']);
Route::get('getTicketType/{id}', [TicketTypeController::class, 'getTicketType']);
Route::put('editTicketType/{id}', [TicketTypeController::class, 'editTicketType']);
Route::delete('deleteTicketType/{id}', [TicketTypeController::class, 'deleteTicketType']);

// ticket types for event
Route::get('/events/{event_id}/ticket-types', [TicketTypeController::class, 'getTicketTypesForEvent']);
// Route::get('/events/{event_id}/ticket-types/{ticket_id}', [TicketTypeController::class, 'getTicketType']);

// users api
Route::get('getUsers', [UserController::class, 'getUsers']);


// roles api's
Route::prefix('roles')->group(function () {
    Route::post('/', [RoleController::class, 'createRole']);
    Route::get('/', [RoleController::class, 'getRoles']);
    Route::get('{role}', [RoleController::class, 'getRole']);
    Route::put('{role}', [RoleController::class, 'editRole']);
    Route::delete('{role}', [RoleController::class, 'deleteRole']);

    // Role-Permission APIs
    Route::get('{role}/permissions', [RoleController::class, 'addPermissionToRole']);
    Route::post('{role}/permissions', [RoleController::class, 'givePermissionToRole']);
});

// Permission APIs
Route::prefix('permissions')->group(function () {
    Route::post('/', [PermissionController::class, 'createPermission']);
    Route::get('/', [PermissionController::class, 'getPermissions']);
    Route::get('{permission}', [PermissionController::class, 'getPermission']);
    Route::put('{permission}', [PermissionController::class, 'editPermission']);
    Route::delete('{permission}', [PermissionController::class, 'deletePermission']);
});