import Link from 'next/link';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PostSkeleton from '@/app/components/PostSkeleton';

export default function Post({ params }: { params: { id: string } }) {
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
