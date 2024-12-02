import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// CREATE
export async function POST(request: NextRequest) {
	const { userId } = getAuth(request);

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const json = await request.json();
		const post = await prisma.post.create({
			data: {
				...json,
				userId,
				author: json.author || userId
			}
		});

		return NextResponse.json(post);
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
	}
}

// READ (Get all posts)
export async function GET() {
	try {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});
		return NextResponse.json(posts);
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
	}
}
