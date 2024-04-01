import Profile from "@/models/profileModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const profile = await Profile.findByIdAndUpdate(
      params.id,
      JSON.parse(await request.text()),
      {
        new: true,
      }
    );
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Failed to update the profile record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const profile = await Profile.findByIdAndDelete(params.id);
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the profile record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
