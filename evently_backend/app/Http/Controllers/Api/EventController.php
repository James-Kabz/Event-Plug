<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    // create event 
    public function createEvent(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'start_time' => 'required|date',
                'end_time' => 'required|date|after:start_time',
                'location' => 'required|string|max:255',
                'image' => 'nullable|string|url',
            ]);

            $event = Event::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'start_time' => Carbon::parse($data['start_time'])->format('Y-m-d H:i:s'),
                'end_time' => Carbon::parse($data['end_time'])->format('Y-m-d H:i:s'),
                'location' => $data['location'],
                'image' => $data['image'] ?? null,
                'user_id' => 1,
            ]);

            return response()->json(['message' => 'Event created successfully.', 'event' => $event], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error creating event: ' . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }
    // get events

    public function getEvents()
    {
        $events = Event::all();

        return response()->json([
            'events' => $events
        ], 200);

    }

    // get event

    public function getEvent($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json([
            'event' => $event
        ]);
    }

    // edit event

    public function editEvent(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'start_time' => 'sometimes|date',
                'end_time' => 'sometimes|date|after:start_time',
                'location' => 'sometimes|string|max:255',
                'image' => 'sometimes|string|url',
            ]);

            $event = Event::findOrFail($id);
            $event->update($data);

            return response()->json([
                'message' => 'Event updated successfully.',
                'event' => $event
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Event not found.'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error updating event: ' . $e->getMessage());
            return response()->json([
                'message' => 'An unexpected error occurred while updating the event.'
            ], 500);
        }
    }


    // delete event

    public function deleteEvent($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}
