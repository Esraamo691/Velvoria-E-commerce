import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", "/wishlist", "/allorders"];
const authPages = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret:
      process.env.NEXTAUTH_SECRET ||
      "67Y4bDlmHVUHiIhzYE5IbYINm5+xQLSuWLy86lpxN/o=",
  });

  const { pathname } = req.nextUrl;

  if (protectedPages.some((page) => pathname.startsWith(page))) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("callback-url", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authPages.some((page) => pathname.startsWith(page))) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/allorders/:path*",
    "/login",
    "/register",
  ],
};
