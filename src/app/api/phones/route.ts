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

export async function DELETE({ params }: { params: any }) {
  await connectDB();
  return NextResponse.json(
    { message: "DELETE /api/phones/:id" },
    { status: 200 }
  );
  // try {
  //   const phone = await Phone.findByIdAndDelete(params.id);
  //   return NextResponse.json(phone, { status: 200 });
  // } catch (error) {
  //   console.error("Failed to delete the phone record:", error);
  //   return NextResponse.json(
  //     { message: "Internal server error" },
  //     { status: 500 }
  //   );
  // }
}
