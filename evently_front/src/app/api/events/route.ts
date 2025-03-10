import { Event } from "@/db/models/Event";
import { User } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
    return NextResponse.json({ events });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching events", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      start_time,
      end_time,
      image,
      location,
      user_id,
    } = await req.json();


    const startTime = new Date(start_time);
    const endTime = new Date(end_time);

    if (startTime > endTime) {
      return NextResponse.json(
        { message: "End time must be greater than start time" },
        { status: 400 }
      );
    }

    const utcStartTime = new Date(startTime.toISOString());
    const utcEndTime = new Date(endTime.toISOString());


    const event = await Event.create({
      name,
      description,
      start_time: utcStartTime,
      end_time: utcEndTime,
      image,
      location,
      user_id,
    });


    return NextResponse.json({
      message: "Event Created Successfully",
      id: event.id,
      event,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error submitting events:", errorMessage);
    return NextResponse.json(
      { message: "Failed to submit event", error: errorMessage },
      { status: 500 }
    );
  }
}
