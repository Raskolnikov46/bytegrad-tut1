import Link from 'next/link';
import { Suspense } from 'react';

// Separate loading component for posts
function PostsLoadingUI() {
	return (
		<div className="space-y-8 mb-16">
			{[1, 2, 3].map((i) => (
				<article key={i} className="border rounded-lg p-6 dark:border-gray-700">
					<div className="animate-pulse">
						<div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
						<div className="space-y-2">
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

// Add error UI component
function PostsErrorUI({ error }: { error: Error }) {
	return (
		<div className="text-center py-10">
			<h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
				Something went wrong!
			</h2>
			<p className="text-gray-600 dark:text-gray-300 mb-4">{error.message}</p>
			<button
				onClick={() => window.location.reload()}
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
			>
				Try again
			</button>
		</div>
	);
}

// Separate component for posts
async function PostsList() {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
			next: { revalidate: 3600 },
			// Add timeout to prevent hanging requests
			signal: AbortSignal.timeout(5000)
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch posts (Status: ${res.status})`);
		}

		const posts = await res.json();

		if (!Array.isArray(posts) || posts.length === 0) {
			throw new Error('No posts found');
		}

		return (
			<div className="space-y-8 mb-16">
				{posts.map((post: { id: number; title: string; body: string }) => (
					<article
						key={post.id}
						className="border rounded-lg p-6 hover:shadow-lg transition-shadow dark:border-gray-700 dark:hover:shadow-gray-800"
					>
						<Link href={`/posts/${post.id}`}>
							<h2 className="text-2xl font-semibold mb-2 dark:text-white">{post.title}</h2>
							<p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.body}</p>
							<span className="text-blue-600 dark:text-blue-400 mt-2 inline-block">
								Read more →
							</span>
						</Link>
					</article>
				))}
			</div>
		);
	} catch (error) {
		return (
			<PostsErrorUI error={error instanceof Error ? error : new Error('Unknown error occurred')} />
		);
	}
}

export default function Posts() {
	return (
		<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto pt-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-5 text-center dark:text-white">
					All posts
				</h1>

				<Suspense fallback={<PostsLoadingUI />}>
					<PostsList />
				</Suspense>
			</div>
		</main>
	);
}

export const revalidate = 3600; // Revalidate every hour
