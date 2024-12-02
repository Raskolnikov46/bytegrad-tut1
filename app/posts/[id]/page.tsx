import Link from 'next/link';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

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
	const post = await prisma.post.findUnique({
		where: {
			id: id
		}
	});

	if (!post) {
		notFound();
	}

	return (
		<article className="prose lg:prose-xl dark:prose-invert">
			<h1>{post.title}</h1>
			<div className="text-sm text-gray-500 mb-4">
				By {post.author} • {post.createdAt.toLocaleDateString()}
			</div>
			<p>{post.content}</p>
		</article>
	);
}

function PostSkeleton() {
	return (
		<div className="animate-pulse">
			<div className="h-8 w-48 bg-gray-200 rounded mb-8" />
			<div className="h-12 w-3/4 bg-gray-200 rounded mb-4" />
			<div className="h-4 w-48 bg-gray-200 rounded mb-8" />
			<div className="space-y-4">
				<div className="h-4 bg-gray-200 rounded w-full" />
				<div className="h-4 bg-gray-200 rounded w-full" />
				<div className="h-4 bg-gray-200 rounded w-3/4" />
			</div>
		</div>
	);
}
