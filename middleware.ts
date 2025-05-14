import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  
  console.log("Middleware: Running for", request.nextUrl.pathname);
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value;
  console.log("Middleware: Effective token used:", token ? "Token Found" : "No Token");

  console.log("Middleware: Checking for session tokens");
  console.log(
    "  next-auth.session-token:",
    request.cookies.get("next-auth.session-token")?.value
      ? "Found"
      : "Not found"
  );
  console.log(
    "  __Secure-next-auth.session-token:",
    request.cookies.get("__Secure-next-auth.session-token")?.value
      ? "Found"
      : "Not found"
  );
  console.log(
    "  authjs.session-token:",
    request.cookies.get("authjs.session-token")?.value ? "Found" : "Not found"
  );
  console.log(
    "Middleware: Effective token used:",
    token ? "Token Found" : "No Token"
  );
  console.log("Middleware: Request path:", request.nextUrl.pathname);

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Redirect logged-in users away from the login page
  if (pathname === "/login" && token) {
    console.log(
      "Middleware: User already logged in. Redirecting to dashboard."
    );
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/profile",
    "/settings",
    "/orders",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    console.log(
      `Middleware: Protected route '${pathname}' and no token. Redirecting to login.`
    );
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  if (!isProtectedRoute && token) {
    console.log(`Middleware: User has role 'GUEST', redirecting to login.`);
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/orders/:path*",
  ],
};
