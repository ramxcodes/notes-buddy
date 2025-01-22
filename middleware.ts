import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").filter((email) => email.trim()) || [];

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (adminEmails.length === 0 || !adminEmails.includes(token.email || "")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
