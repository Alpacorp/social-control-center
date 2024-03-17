import Phone from "@/models/phoneModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const phone = await Phone.findByIdAndUpdate(
      params.id,
      JSON.parse(await request.text()),
      {
        new: true,
      }
    );
    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error("Failed to update the phone record:", error);
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
    const phone = await Phone.findByIdAndDelete(params.id);
    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the phone record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
