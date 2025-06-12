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
  const response = NextResponse.next(); // Always use this base response

  try {
    if (accessToken) {
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN!);
      const { payload } = await jwtVerify(accessToken, secret);
      userRole = payload.role as string;
      isAuthenticated = true;
    } else if (refreshToken) {
      // Attempt token refresh
      const refreshEndpoint =
        process.env.NEXT_PUBLIC_ENV === "production"
          ? "https://backend-server-554347060569.asia-southeast1.run.app/api/v1/refresh-token"
          : "http://localhost:8080/api/v1/refresh-token";

      const refreshRes = await fetch(refreshEndpoint, {
        method: "GET",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
        credentials: "include",
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();

        const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "1200", 10);
        const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "30", 10);

        // Re-set both cookies
        response.cookies.set("access_token", data.accessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          maxAge: accessTokenExpire * 60 * 60,
        });

        response.cookies.set("refresh_token", data.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          maxAge: refreshTokenExpire * 24 * 60 * 60,
        });

        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN!);
        const { payload } = await jwtVerify(data.accessToken, secret);
        userRole = payload.role as string;
        isAuthenticated = true;
      }
    }
  } catch (err) {
    console.error("Middleware error:", err);
    isAuthenticated = false;
  }

  // Routing Logic
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
