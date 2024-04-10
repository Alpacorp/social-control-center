import Action from "@/models/actionModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { idprofile: string } }
) {
  await connectDB();

  try {
    const actions = await Action.find({ idprofile: params.idprofile });
    actions.sort((a, b) => -1);

    return NextResponse.json(actions, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch the action record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { idprofile: string } }
) {
  await connectDB();
  try {
    const action = await Action.findByIdAndUpdate(
      params.idprofile,
      JSON.parse(await request.text()),
      {
        new: true,
      }
    );
    return NextResponse.json(action, { status: 200 });
  } catch (error) {
    console.error("Failed to update the action record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { idprofile: string } }
) {
  await connectDB();

  try {
    const action = await Action.findByIdAndDelete(params.idprofile);
    return NextResponse.json(action, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the action record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
