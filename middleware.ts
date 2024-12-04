import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(['/', '/posts(.*)', '/api/posts(.*)']);

export default clerkMiddleware(async (auth, request) => {
	if (!isPublicRoute(request)) {
		// Protect all non-public routes
		await auth.protect();
	}
});

export const config = {
	matcher: [
		// Exclude files with extensions and _next
		'/((?!_next|.*\\.[\\w]+$).*)',
		'/',
		'/(api|trpc)(.*)'
	]
};
