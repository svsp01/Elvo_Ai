import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (request: NextRequest) => {
  const session = await auth();

  // If user tries to access a protected route without a session
  if (request.nextUrl.pathname.startsWith("/dashboard") && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Protect these routes
};
