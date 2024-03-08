// create service for phones get list from mongo database and return to client

import Phone from "@/models/phoneModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const phones = await Phone.find({});
    return NextResponse.json({ phones }, { status: 200 });
  } catch (error) {
    console.error("GET /api/phones/ failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
