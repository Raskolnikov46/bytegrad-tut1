import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cache } from 'react';

export const revalidate = 60; // Revalidate every 60 seconds

const getRecentPosts = cache(async () => {
	return await prisma.post.findMany({
		take: 3,
		orderBy: {
			createdAt: 'desc'
		}
	});
});

export async function POST(request: Request) {
	try {
		// Log the incoming request
		console.log('Received POST request to /api/posts');

		// Parse the request body
		const body = await request.json();
		console.log('Request body:', body);

		// Validate the input
		if (!body.title || !body.content) {
			console.log('Validation failed: Missing title or content');
			return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
		}

		// Create the post
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				userId: 'default_user',
				slug: body.title.toLowerCase().replace(/\s+/g, '-'),
				author: 'Anonymous'
			}
		});

		console.log('Post created successfully:', post);
		return NextResponse.json(post, { status: 201 });
	} catch (error) {
		// Log the full error
		console.error('Server error in POST /api/posts:', error);

		return NextResponse.json(
			{ message: 'Internal server error', error: (error as Error).message },
			{ status: 500 }
		);
	}
}
