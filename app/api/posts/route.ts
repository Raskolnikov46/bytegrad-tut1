import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(request: Request) {
	try {
		const { userId } = await auth();
		const user = await currentUser();

		if (!userId || !user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json();

		if (!body.title || !body.content) {
			return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
		}

		// Use the user's full name, or fallback to their first name, or email
		const authorName =
			`${user.firstName} ${user.lastName}`.trim() ||
			user.firstName ||
			user.emailAddresses[0].emailAddress;

		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				userId: userId,
				slug: body.title.toLowerCase().replace(/\s+/g, '-'),
				author: authorName
			}
		});

		return NextResponse.json(post, { status: 201 });
	} catch (error) {
		console.error('Server error in POST /api/posts:', error);
		return NextResponse.json(
			{ message: 'Internal server error', error: (error as Error).message },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		// Get the post ID from the URL
		const id = request.url.split('/').pop();

		// Check if post exists and belongs to user
		const post = await prisma.post.findUnique({
			where: { id }
		});

		if (!post) {
			return NextResponse.json({ message: 'Post not found' }, { status: 404 });
		}

		if (post.userId !== userId) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		// Delete the post
		await prisma.post.delete({
			where: { id }
		});

		return NextResponse.json({ message: 'Post deleted successfully' });
	} catch (error) {
		console.error('Server error in DELETE /api/posts:', error);
		return NextResponse.json(
			{ message: 'Internal server error', error: (error as Error).message },
			{ status: 500 }
		);
	}
}
