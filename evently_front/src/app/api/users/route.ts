import { User } from "@/db/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await User.findAll({});
    return NextResponse.json({ users });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching users", error: errorMessage },
      { status: 500 }
    );
  }
}