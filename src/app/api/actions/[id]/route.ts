import Action from "@/models/actionModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const action = await Action.findByIdAndDelete(params.id);
    return NextResponse.json(action, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the action record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
