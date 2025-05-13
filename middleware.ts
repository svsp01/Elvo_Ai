import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import routesConfig from "@/config/routes.json";

export default async function middleware(request: NextRequest) {
  const session = await auth()

  const route = routesConfig.find(route =>
    new RegExp(route.path.replace(":path*", ".*")).test(request.nextUrl.pathname)
  );

  if (route && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (route && session?.user) {
    const userRole = session.user.role || 'GUEST';
    if (!route.roles.includes(userRole.toLowerCase())) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// Static matcher patterns based on routes.json
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/orders/:path*'
  ]
};
