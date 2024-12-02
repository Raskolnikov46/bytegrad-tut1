import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
	try {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});
		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const json = await request.json();
		const post = await prisma.post.create({
			data: {
				title: json.title,
				content: json.content,
				slug: json.slug
			}
		});
		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
	}
}
