import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;

  if (currentUser === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/test"],
};
