import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface PageParams {
	params: Promise<{
		id: string;
	}>;
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostPage({ params }: PageParams) {
	// Await the params
	const { id } = await params;

	if (!id) {
		notFound();
	}

	const post = await prisma.post.findUnique({
		where: { id }
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
