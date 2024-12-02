import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface RouteParams {
	params: {
		id: string;
	};
}

export async function GET(_request: Request, { params }: RouteParams) {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: params.id
			}
		});
		if (!post) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		}
		return NextResponse.json(post);
	} catch (err) {
		console.error('Error fetching post:', err);
		return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
	}
}

export async function PUT(_request: Request, { params }: RouteParams) {
	try {
		const json = await request.json();
		const post = await prisma.post.update({
			where: {
				id: params.id
			},
			data: json
		});
		return NextResponse.json(post);
	} catch (err) {
		console.error('Error updating post:', err);
		return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
	}
}

export async function DELETE(_request: Request, { params }: RouteParams) {
	try {
		await prisma.post.delete({
			where: {
				id: params.id
			}
		});
		return NextResponse.json({ message: 'Post deleted' });
	} catch (err) {
		console.error('Error deleting post:', err);
		return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
	}
}
