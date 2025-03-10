import { TicketType } from "@/db/models/Ticket_Type";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const ticketType = await TicketType.findAll();
    return NextResponse.json({ ticketType });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching ticket types", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, complimentary, active, user_id ,event_id} =
      await req.json();

    const ticketType = await TicketType.create({
      name,
      price,
      complimentary,
      active,
      user_id,
      event_id,
    });

    return NextResponse.json({
      message: "Ticket Type Created Successfully",
      ticketType,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error submitting ticket types");
    return NextResponse.json(
      { message: "Failed to submit ticket types", error: errorMessage },
      { status: 500 }
    );
  }
}
