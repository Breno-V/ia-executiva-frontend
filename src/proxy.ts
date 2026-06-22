import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/",
  "/gestao",
  "/alertas",
  "/relatorios",
  "/geografica",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/gestao", "/alertas", "/relatorios", "/geografica"],
};
