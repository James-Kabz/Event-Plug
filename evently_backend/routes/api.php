<?php

use App\Http\Controllers\Api\TicketTypeController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\EventController;

// events api's
Route::post('createEvent',[EventController::class,'createEvent']);
Route::get('getEvents',[EventController::class,'getEvents']);
Route::get('getEvent/{id}',[EventController::class,'getEvent']);
Route::put('editEvent/{id}',[EventController::class,'editEvent']);
Route::delete('deleteEvent/{id}',[EventController::class,'deleteEvent']);


// ticket types api's

Route::post('createTicketType', [TicketTypeController::class, 'createTicketType']);
Route::get('getTicketTypes', [TicketTypeController::class, 'getTicketTypes']);
Route::get('getTicketType/{id}', [TicketTypeController::class, 'getTicketType']);
Route::put('editTicketType/{id}', [TicketTypeController::class, 'editTicketType']);
Route::delete('deleteTicketType/{id}', [TicketTypeController::class, 'deleteTicketType']);

Route::get('/events/{event_id}/ticket-types', [TicketTypeController::class, 'getTicketTypesForEvent']);
// Route::get('/events/{event_id}/ticket-types/{ticket_id}', [TicketTypeController::class, 'getTicketType']);

// users api

Route::get('getUsers', [UserController::class, 'getUsers']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
