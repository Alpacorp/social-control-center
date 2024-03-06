import { verify, Secret } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const user = verify(
    token ?? "",
    process.env.NEXT_PUBLIC_JWT_SECRET as Secret
  );

  console.log("user test", user);

  return NextResponse.json({ message: "Profile" }, { status: 200 });
}
