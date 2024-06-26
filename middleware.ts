import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname === "/account") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (!req.auth && req.nextUrl.pathname === "/easy-quote/result") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (!req.auth && req.nextUrl.pathname === "/admin") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (!req.auth && req.nextUrl.pathname === "/inquiry") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (!req.auth && req.nextUrl.pathname === "/booking") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/account/:path*",
    "/easy-quote/result/:path*",
    "/inquiry",
    "/booking",
    "/admin/:path*",
  ],
};
