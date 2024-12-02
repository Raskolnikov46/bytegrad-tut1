import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
	} catch (error) {
		return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const json = await request.json();
		const post = await prisma.post.update({
			where: {
				id: params.id
			},
			data: json
		});
		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		await prisma.post.delete({
			where: {
				id: params.id
			}
		});
		return NextResponse.json({ message: 'Post deleted' });
	} catch (error) {
		return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
	}
}
