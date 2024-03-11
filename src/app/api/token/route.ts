import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET ?? "";

  if (!token) {
    console.error("POST /api/token failed: No token provided if");
    return NextResponse.json({ valid: false, error: "No token provided" });
  }

  try {
    verify(token, jwtSecret);
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("POST /api/token failed:", error);
    return NextResponse.json({ valid: false });
  }
}
