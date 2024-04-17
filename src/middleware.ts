import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? "";

  const response = await fetch(`${request.nextUrl.origin}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const result = await response.json();

  if (!result.valid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/test",
    "/signup",
    "/phones",
    "/customers",
    "/profiles",
    "/actions",
    "/accounts",
  ],
};
