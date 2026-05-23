import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const { nextUrl } = request;
  const isLoginPage = nextUrl.pathname === "/admin/login";
  const isAuthenticated = Boolean(request.auth);

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/admin") && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"]
};
