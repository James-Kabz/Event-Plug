<?php

use App\Http\Controllers\Api\Auth\PermissionController;
use App\Http\Controllers\Api\Auth\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TicketTypeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EventController;


// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });


// events api's
Route::get('getEvents',[EventController::class,'getEvents']);
Route::post('createEvent',[EventController::class,'createEvent']);
Route::get('getEvent/{id}',[EventController::class,'getEvent']);
Route::put('editEvent/{id}',[EventController::class,'editEvent']);
Route::delete('deleteEvent/{id}',[EventController::class,'deleteEvent']);


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
Route::post('createRole', [RoleController::class,'createRole']);
Route::get('getRoles', [RoleController::class,'getRoles']);
Route::get('getRole/{id}', [RoleController::class,'getRole']);
Route::put('editRole/{id}', [RoleController::class,'editRole']);
Route::delete('deleteRole/{id}', [RoleController::class,'deleteRole']);


// permission api's
Route::post('createPermission', [PermissionController::class,'createPermission']);
Route::get('getPermissions', [PermissionController::class,'getPermissions']);
Route::get('getPermission/{id}', [PermissionController::class,'getPermission']);
Route::put('editPermission/{id}', [PermissionController::class,'editPermission']);
Route::delete('deletePermission/{id}', [PermissionController::class,'deletePermission']);