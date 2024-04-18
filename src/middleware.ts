import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const url = request.nextUrl.clone(); // Clona la URL para modificarla si es necesario.

  // Si el usuario está accediendo a la página de login con un token válido, redirigirlo.
  if (url.pathname === "/login") {
    if (token) {
      const response = await fetch(`${request.nextUrl.origin}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.value }),
      });

      const result = await response.json();
      if (result.valid) {
        url.pathname = "/dashboard"; // Cambia a la ruta de dashboard o donde prefieras.
        return NextResponse.redirect(url);
      }
    }
  } else {
    // Para todas otras rutas protegidas, verifica la validez del token.
    if (token) {
      const response = await fetch(`${request.nextUrl.origin}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.value }),
      });

      const result = await response.json();
      if (!result.valid) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    } else {
      // Si no hay token y la ruta requiere protección, redirige a login.
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
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
    "/login", // Asegúrate de incluir login aquí para que el middleware lo maneje.
  ],
};
