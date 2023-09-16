import { NextResponse } from "next/server";
export const config = {
  matcher: ["/teacher-dashboard/:path*", "/new-exam", "/exam/:path*"],
};
export async function middleware(request) {
  const token = request.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/teacher-login", request.url));
  }
  return NextResponse.next();
}
