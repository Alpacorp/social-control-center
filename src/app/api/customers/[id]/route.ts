import Customer from "@/models/customerModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const customer = await Customer.findByIdAndUpdate(
      params.id,
      JSON.parse(await request.text()),
      {
        new: true,
      }
    );
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("Failed to update the customer record:", error);
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
    const customer = await Customer.findByIdAndDelete(params.id);
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the customer record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
