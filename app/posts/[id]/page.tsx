import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { id: string } }) {
	const post = await prisma.post.findUnique({
		where: {
			id: params.id
		}
	});

	if (!post) {
		notFound();
	}

	return (
		<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto pt-16">
				<Link href="/posts" className="text-blue-600 mb-8 inline-block hover:text-blue-800">
					← Back to all posts
				</Link>
				<article className="prose lg:prose-xl dark:prose-invert">
					<h1>{post.title}</h1>
					<div className="text-sm text-gray-500 mb-4">
						By {post.author} • {post.createdAt.toLocaleDateString()}
					</div>
					<p>{post.content}</p>
				</article>
			</div>
		</main>
	);
}
