import Profile from "@/models/profileModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const profiles = await Profile.find({});
    profiles.sort((a, b) => -1);
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    console.error("GET /api/profiles/ failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const profile = await Profile.create(JSON.parse(await request.text()));
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("Failed to create the profile record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
