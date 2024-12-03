import { authMiddleware } from '@clerk/nextjs';

// Define public routes that don't require authentication
const publicRoutes = [
	'/',
	'/posts',
	'/api/posts',
	// Add specific patterns for reading posts
	'/posts/(.*)'
];

export default authMiddleware({
	publicRoutes,
	// Add ignoredRoutes for paths that should bypass middleware completely
	ignoredRoutes: [
		'/api/posts(.*)' // This will bypass auth checks for POST/PUT/DELETE operations
	]
});

export const config = {
	matcher: [
		'/((?!.*\\..*|_next).*)', // Don't run middleware on static files
		'/', // Run middleware on index page
		'/(api|trpc)(.*)' // Run middleware on API routes
	]
};
