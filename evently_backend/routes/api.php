<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;

Route::post('createEvent',[EventController::class,'createEvent']);
Route::get('getEvents',[EventController::class,'getEvents']);
Route::get('getEvent/{id}',[EventController::class,'getEvent']);
Route::put('editEvent/{id}',[EventController::class,'editEvent']);
Route::delete('deleteEvent/{id}',[EventController::class,'deleteEvent']);