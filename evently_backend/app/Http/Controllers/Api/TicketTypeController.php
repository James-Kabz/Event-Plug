<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TicketType;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class TicketTypeController extends Controller
{
    // get all ticket types
    public function getTicketTypes()
    {
        $ticketTypes = TicketType::all();
        return response()->json([
            'ticketTypes' => $ticketTypes
        ]);
    }

    // get ticket types for the events
    public function getTicketType($event_id, $ticket_id)
    {
        $ticketType = TicketType::where('id', $ticket_id)
            ->where('event_id', $event_id)
            ->first();

        if (!$ticketType) {
            return response()->json(['message' => 'Ticket type not found for this event.'], 404);
        }

        return response()->json(['ticketType' => $ticketType], 200);
    }

    public function getTicketTypesForEvent($event_id)
    {
        $ticketTypes = TicketType::where('event_id', $event_id)->get();

        if ($ticketTypes->isEmpty()) {
            return response()->json(['message' => 'No ticket types found for this event.'], 404);
        }

        return response()->json(['ticketTypes' => $ticketTypes], 200);
    }



    // create ticket type
    public function createTicketType(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'complimentary' => 'required|boolean',
                'active' => 'required|boolean',
                'event_id' => 'required|exists:events,id',
            ]);

            $ticketType = TicketType::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'complimentary' => $data['complimentary'],
                'active' => $data['active'],
                'user_id' => 1,
                'event_id' => $data['event_id'],
            ]);

            return response()->json(['message' => 'Ticket type created successfully.', 'ticket_type' => $ticketType], 201);
        } catch (\Exception $e) {
            Log::error('Error creating ticket type: ' . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }


    // update ticket type
    public function editTicketType(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'name' => 'sometimes|string|max:255',
                'price' => 'sometimes|numeric|min:0',
                'complimentary' => 'sometimes|boolean',
                'active' => 'sometimes|boolean',
            ]);

            $ticketType = TicketType::findOrFail($id);
            $ticketType->update($data);

            return response()->json(['message' => 'Ticket type updated successfully.', 'ticket_type' => $ticketType], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed.', 'errors' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Ticket type not found.'], 404);
        } catch (\Exception $e) {
            Log::error('Error updating ticket type: ' . $e->getMessage());
            return response()->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    // delete ticket type
    public function deleteTicketType($id)
    {
        $ticketType = TicketType::find($id);

        if (!$ticketType) {
            return response()->json(['message' => 'Ticket type not found'], 404);
        }

        $ticketType->delete();

        return response()->json(['message' => 'Ticket type deleted successfully']);
    }
}
