import { NextResponse } from "next/server";
export const config = {
  matcher: [
    "/teacher-dashboard/:path*",
    "/new-exam",
    "/exam/:path*",
    "/student-dashboard/:path*",
  ],
};
export async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/teacher") ||
    request.nextUrl.pathname.startsWith("/new") ||
    request.nextUrl.pathname.startsWith("/exam")
  ) {
    const token = request.cookies.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/teacher-login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/student")) {
    const studentToken = request.cookies.get("student-token");
    if (!studentToken) {
      return NextResponse.redirect(new URL("/student-login", request.url));
    }
  }
  return NextResponse.next();
}
