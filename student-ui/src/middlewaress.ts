import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const authPaths = ["/login", "/signup", "/verification"];
const adminPathPrefix = "/admin";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  let isAuthenticated = false;
  let userRole: string | null = null;

  const path = request.nextUrl.pathname;

  try {
    if (accessToken) {
      try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN as string);
        const { payload } = await jwtVerify(accessToken as string, secret);

        userRole = payload.role as string;
        isAuthenticated = true;
      } catch (error) {
        if (refreshToken) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_ENV === "production"
                ? "https://backend-server-554347060569.asia-southeast1.run.app/api/v1/refresh-token"
                : "http://localhost:8080/api/v1/refresh-token"
              }`,
              {
                method: "GET",
                headers: {
                  Cookie: `refresh_token=${refreshToken}`,
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );

            if (!response.ok) {
              throw new Error("Failed to refresh token");
            }

            const data = await response.json();
            const nextResponse = NextResponse.next(); // ✅ FIXED: Use `NextResponse.next()` instead of redirecting to the same path

            const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "1200", 10);
            const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);

            nextResponse.cookies.set("access_token", data.accessToken, {
              expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
              maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "none", // Use 'none' for cross-site requests
              secure: true,     // Set to true for HTTPS in production
              path: "/"

            });

            nextResponse.cookies.set("refresh_token", data.refreshToken, {
              expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
              httpOnly: true,
              sameSite: "none", // Use 'none' for cross-site requests
              secure: true,     // Set to true for HTTPS in production
              path: "/"

            });

            if (authPaths.includes(path)) {
              return nextResponse;
            }

            return nextResponse; // ✅ FIXED: No unnecessary redirects
          } catch (refreshError) {
            isAuthenticated = false;
          }
        }
        isAuthenticated = false;
      }
    }
  } catch (error) {
    isAuthenticated = false;
  }

  // Admin route handling
  if (path.startsWith(adminPathPrefix)) {
    if (!isAuthenticated || userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (isAuthenticated && authPaths.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (!isAuthenticated && !authPaths.includes(path)) {
    const signinUrl = new URL("/login", request.url);
    signinUrl.searchParams.set("redirectTo", path);

    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
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
