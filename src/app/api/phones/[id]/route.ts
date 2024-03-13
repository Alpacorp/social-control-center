import Phone from "@/models/phoneModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function PATCH({ params, body }: { params: any; body: any }) {
  await connectDB();

  try {
    const phone = await Phone.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(phone, { status: 200 });
  } catch (error) {
    console.error("Failed to update the phone record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
