import Link from 'next/link';
import { Suspense } from 'react';

export default async function Post({ params }: { params: { id: string } }) {
	return (
		<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto pt-16">
				<Link href="/posts" className="text-blue-600 mb-8 inline-block hover:text-blue-800">
					← Back to all posts
				</Link>
				<Suspense fallback={<PostSkeleton />}>
					<PostContent id={params.id} />
				</Suspense>
			</div>
		</main>
	);
}

async function PostContent({ id }: { id: string }) {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch post: ${res.status}`);
	}

	const post = await res.json();

	return (
		<article className="prose lg:prose-xl">
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</article>
	);
}

function PostSkeleton() {
	return (
		<article className="prose lg:prose-xl animate-pulse">
			<div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
			<div className="space-y-3">
				<div className="h-4 bg-gray-200 rounded w-full"></div>
				<div className="h-4 bg-gray-200 rounded w-5/6"></div>
				<div className="h-4 bg-gray-200 rounded w-4/6"></div>
			</div>
		</article>
	);
}
