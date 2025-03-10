// import { Event, TicketType } from "../../../../../db/models/index";
import { NextRequest, NextResponse } from "next/server";
import TicketType from "../../../../../db/models/Ticket_Type"; // Adjust the import path
import Event from "../../../../../db/models/Event"; // Adjust the import path
export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params; // Destructure eventId from params

    // Fetch the event to ensure it exists
    const event = await Event.findOne({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Fetch all ticket types associated with the event
    const ticketTypes = await TicketType.findAll({
      where: { event_id:eventId },
      attributes: ["id", "name", "price", "complimentary", "active"], // Include only necessary fields
    });

    // Return the ticket types
    return NextResponse.json({ ticketTypes });
  } catch (error) {
    // Handle errors and return a 500 response
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching ticket types", error: errorMessage },
      { status: 500 }
    );
  }
}