import React from 'react';
import prisma from '../../../../lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import PostForm from '../../../components/PostForm';

export default async function EditPostPage({ params }: { params: { id: string } }) {
	const { userId } = await auth();

	if (!userId) {
		redirect('/sign-in?redirectUrl=/posts');
	}

	const post = await prisma.post.findUnique({
		where: {
			id: params.id
		}
	});

	if (!post) {
		redirect('/posts');
	}

	if (post.userId !== userId) {
		redirect('/posts');
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-8">Edit Post</h1>
			<PostForm initialData={post} />
		</div>
	);
}
