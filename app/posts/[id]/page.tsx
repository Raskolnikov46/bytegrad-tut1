import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import DeletePostButton from '@/app/components/DeletePostButton';
import EditPostButton from '@/app/components/EditPostButton';

interface PageParams {
	params: Promise<{
		id: string;
	}>;
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostPage({ params }: PageParams) {
	const { id } = await params;
	const { userId } = await auth();

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
				<div className="flex justify-between items-center mb-8">
					<Link href="/posts" className="text-blue-600 hover:text-blue-800">
						← Back to all posts
					</Link>
					{post.userId === userId && (
						<div className="flex space-x-2">
							<EditPostButton postId={post.id} />
							<DeletePostButton postId={post.id} />
						</div>
					)}
				</div>
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
