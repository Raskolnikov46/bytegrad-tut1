import { Suspense } from 'react';
import PostSkeleton from '@/app/components/PostSkeleton';
import Link from 'next/link';
import prisma from '@/lib/prisma';

async function PostsList() {
	const posts = await prisma.post.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});

	return (
		<div className="space-y-6">
			{posts.map((post) => (
				<article
					key={post.id}
					className="border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
				>
					<h2 className="text-2xl font-semibold mb-2">
						<Link href={`/posts/${post.id}`} className="hover:text-blue-500">
							{post.title}
						</Link>
					</h2>
					<div className="text-sm text-gray-500 mb-4">
						By {post.author} • {post.createdAt.toLocaleDateString()}
					</div>
					<p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{post.content}</p>
					<Link
						href={`/posts/${post.id}`}
						className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center"
					>
						Read more
						<svg
							className="w-4 h-4 ml-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</Link>
				</article>
			))}
		</div>
	);
}

export default function Posts() {
	return (
		<div className="max-w-4xl mx-auto p-4">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Posts</h1>
				<Link
					href="/posts/new"
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
				>
					Create New Post
				</Link>
			</div>

			<Suspense
				fallback={
					<div className="space-y-6">
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
					</div>
				}
			>
				<PostsList />
			</Suspense>
		</div>
	);
}
