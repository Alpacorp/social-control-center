import { Secret, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No token" }, { status: 404 });
  }

  try {
    verify(token ?? "", process.env.NEXT_PUBLIC_JWT_SECRET as Secret);
    return NextResponse.json({ message: "Logged out" }, { status: 200 });
  } catch (error) {
    console.error("POST /api/auth/logout failed:", error);

    return NextResponse.json({ message: "Invalid token" }, { status: 500 });
  }
}
