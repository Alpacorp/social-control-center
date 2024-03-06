import User from "@/models/userModel";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: { json: () => Promise<any> }, res: any) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();
    console.log("username", username, "email", email, "password", password);
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return NextResponse.json(
        { message: "Username or email already taken" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/auth/signup failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
