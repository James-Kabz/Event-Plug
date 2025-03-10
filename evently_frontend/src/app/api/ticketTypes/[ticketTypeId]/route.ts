import { Event } from "@/db/models/Event";
import { TicketType } from "@/db/models/Ticket_Type";
import { User } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch ticket type by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { ticketTypeId: string } }
) {
  try {
    const { ticketTypeId } = await params; // Await params here

    const ticketType = await TicketType.findOne({
      where: { id: ticketTypeId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email"],
        },
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'name']
        }
      ],
    });

    if (!ticketType) {
      return NextResponse.json(
        { message: "Ticket Type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ticketType });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching ticket type", error: errorMessage },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: NextRequest,
  { params }: { params: { ticketTypeId: string } }
) {
  try {
    const { ticketTypeId } = await params; // Await params here
    const updatedFields = await req.json();

    const ticketType = await TicketType.findByPk(ticketTypeId);

    if (!ticketType) {
      return NextResponse.json({ message: "Ticket Type not found" }, { status: 404 });
    }

    const allowedFields = [
      "name",
      "price",
      "complimentary",
      "active",
      "user_id",
      "event_id"
    ];

    // Only update allowed fields
    const filteredUpdates = Object.fromEntries(
      Object.entries(updatedFields).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    Object.assign(ticketType, filteredUpdates);

    await ticketType.save();

    return NextResponse.json({
      message: "Ticket Type Updated Successfully",
      ticketType,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error updating Ticket Type", error: errorMessage },
      { status: 500 }
    );
  }
}

// update
export async function DELETE(
  req: NextRequest,
  { params }: { params: { ticketTypeId: string } }
) {
  try {
    const { ticketTypeId } = await params; // Await params here

    const ticketType = await TicketType.findByPk(ticketTypeId);

    if (!ticketType) {
      return NextResponse.json({ message: "Ticket Type not found" }, { status: 404 });
    }

    await ticketType.destroy();

    return NextResponse.json({ message: "Ticket Type Deleted Successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error deleting Ticket Type", error: errorMessage },
      { status: 500 }
    );
  }
}

