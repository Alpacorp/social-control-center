import Account from "@/models/accountModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { idprofile: string } }
) {
  await connectDB();

  try {
    const accounts = await Account.find({ idprofile: params.idprofile });
    accounts.sort((a, b) => -1);

    return NextResponse.json(accounts, { status: 200 });
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
    const account = await Account.findByIdAndUpdate(
      params.idprofile,
      JSON.parse(await request.text()),
      {
        new: true,
      }
    );
    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error("Failed to update the account record:", error);
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
    const account = await Account.findByIdAndDelete(params.idprofile);
    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error("Failed to delete the account record:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
