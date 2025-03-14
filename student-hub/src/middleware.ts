import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // Get user role from session/token
  const userRole = request.headers.get("x-user-role") || "student";
  const proficiency = request.nextUrl.searchParams.get("proficiency");

  // // If user is a student, enforce proficiency-based access
  // if (userRole === "student" && !proficiency) {
  //   // Redirect to assessment or default proficiency level
  //   return NextResponse.redirect(
  //     new URL(`${request.nextUrl.pathname}?proficiency=beginner`, request.url)
  //   );
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
