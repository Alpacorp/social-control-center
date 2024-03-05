import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connectDB } from "@/utils/connect";
import { generateToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generar JWT
      const token = generateToken(user._id.toString());
      NextResponse.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("POST /api/auth/login failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
