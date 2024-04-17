import Account from "@/models/accountModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const accounts = await Account.find({});
    accounts.sort((a, b) => -1);
    return NextResponse.json({ accounts }, { status: 200 });
  } catch (error) {
    console.error("GET /api/accounts/ failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const account = await Account.create(JSON.parse(await request.text()));
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error("Failed to create the account record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
