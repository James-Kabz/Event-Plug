import { Event, User, TicketType } from "../../../../db/models/index";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch an Event by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params; // Await params here

    const event = await Event.findOne({
      where: { id: eventId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email"],
        },
        {
          model: TicketType,
          as: "ticketTypes",
          attributes: ["id", "name", "price", "complimentary", "active"],
        },
      ],
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching event", error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update an Event by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params;
    const updatedFields = await req.json();

    const event = await Event.findByPk(eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Preserve existing values if the field is not provided in the request
    event.name = updatedFields.name ?? event.name;
    event.description = updatedFields.description ?? event.description;
    event.start_time = updatedFields.start_time
      ? new Date(updatedFields.start_time)
      : event.start_time;
    event.end_time = updatedFields.end_time
      ? new Date(updatedFields.end_time)
      : event.end_time;
    event.image = updatedFields.image ?? event.image;
    event.location = updatedFields.location ?? event.location;
    event.user_id = updatedFields.user_id ?? event.user_id;

    await event.save();

    return NextResponse.json({
      message: "Event Updated Successfully",
      event,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error updating event", error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete an Event by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params; // Await params here

    const event = await Event.findByPk(eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    await event.destroy();

    return NextResponse.json({ message: "Event Deleted Successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error deleting event", error: errorMessage },
      { status: 500 }
    );
  }
}
