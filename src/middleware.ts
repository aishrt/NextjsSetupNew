import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });

  if (
    token &&
    token?.length > 10 &&
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup") ||
      req.nextUrl.pathname.startsWith("/forgot-password") ||
      req.nextUrl.pathname.startsWith("/verify-email"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // User is authenticated so redirect to dashboard page
  }

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url)); // User is not authenticated so redirect to main domain scanner page
  }

  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/add-domain/:path*",
    "/login",
    "/signup",
    "/forgot-password/:path*",
    "/verify-email/:path*",
  ],
};

