import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = ["/auth/signin", "/auth/callback", "/api/callback"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname !== "/") {
    const urlMatch = isPublicRoute.some((route) =>
      request.nextUrl.pathname.includes(route),
    );
    console.log(request.nextUrl.pathname);
    console.log({ urlMatch, session });
    if (!urlMatch && !session)
      return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|signin)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
