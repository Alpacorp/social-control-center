import Action from "@/models/actionModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const actions = await Action.find({});
    actions.sort((a, b) => -1);
    return NextResponse.json({ actions }, { status: 200 });
  } catch (error) {
    console.error("GET /api/actions/ failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const action = await Action.create(JSON.parse(await request.text()));
    return NextResponse.json(action, { status: 201 });
  } catch (error) {
    console.error("Failed to create the action record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
