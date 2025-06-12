import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const authPaths = ["/login", "/signup", "/verification"];
const adminPathPrefix = "/admin";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  let isAuthenticated = false;
  let userRole: string | null = null;
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();

  try {
    if (accessToken) {
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN!);
      const { payload } = await jwtVerify(accessToken, secret);
      userRole = payload.role as string;
      isAuthenticated = true;
    }
  } catch (err) {
    isAuthenticated = false;
  }

  // Admin route protection
  if (path.startsWith(adminPathPrefix) && (!isAuthenticated || userRole !== "admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (authPaths.includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && !authPaths.includes(path)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", path);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard",
    "/generate",
    "/generate/:path",
    "/playlists",
    "/playlists/:path",
    "/learning-roadmap",
    "/learning-roadmap/:path",
    "/login",
    "/signup",
    "/verification",
    "/admin/:path*",
    "/events/:id/register",
    "/profile",
  ],
};
