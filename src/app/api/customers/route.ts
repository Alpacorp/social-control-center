import Customer from "@/models/customerModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const customers = await Customer.find({});
    customers.sort((a, b) => -1);
    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    console.error("GET /api/customers/ failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const customer = await Customer.create(JSON.parse(await request.text()));
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("Failed to create the customer record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
