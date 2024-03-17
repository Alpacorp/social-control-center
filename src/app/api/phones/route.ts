import Phone from "@/models/phoneModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const phones = await Phone.find({});
    phones.sort((a, b) => -1);
    return NextResponse.json({ phones }, { status: 200 });
  } catch (error) {
    console.error("GET /api/phones/ failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const phone = await Phone.create(JSON.parse(await request.text()));
    return NextResponse.json(phone, { status: 201 });
  } catch (error) {
    console.error("Failed to create the phone record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
