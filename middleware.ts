import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Define public routes that don't require authentication
  // publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],// Match all routes except static files and assets
};
