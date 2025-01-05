// export { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { authRoutes, authApiRoute, protectedRoutes } from "@/lib/constant";

export default auth((req) => {
  const url = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAuthApiRoute = url.pathname.startsWith(authApiRoute);
  const isAuthRoute = authRoutes.includes(url.pathname);
  const isProtectedRoute = protectedRoutes.includes(url.pathname);

  if (isAuthApiRoute) return NextResponse.next();

  if (isLoggedIn) {
    if (isAuthRoute) {
      const redirectUrl = new URL("/notes", url.origin);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    if (isProtectedRoute) {
      const redirectUrl = new URL("/sign-in", url.origin);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
