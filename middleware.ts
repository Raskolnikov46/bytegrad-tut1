import { authMiddleware } from '@clerk/nextjs';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/posts', '/api/posts'];

export default authMiddleware({
	publicRoutes
});

export const config = {
	matcher: [
		'/((?!.*\\..*|_next).*)', // Don't run middleware on static files
		'/', // Run middleware on index page
		'/(api|trpc)(.*)'
	] // Run middleware on API routes
};
