import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET ?? "";

  if (currentUser === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/test"],
};
