import User from "@/models/userModel";
import { connectDB } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

  try {
    const user = await User.findOne({ email });

    console.log("user", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const token = jwt.sign(
      { email, password, userName: user.username },
      jwtSecret,
      {
        expiresIn: "2h",
      }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("POST /api/auth/login failed:", error);

    return NextResponse.json(
      { message: "Internal server errorshhh" },
      { status: 500 }
    );
  }
}
