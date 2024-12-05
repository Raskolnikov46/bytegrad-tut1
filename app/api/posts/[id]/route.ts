import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PostSchema } from '@/lib/validations/post';

// READ (Get single post)
export async function GET(req: Request, { params }: { params: { id: string } }) {
	try {
		const { id } = await params;

		const post = await prisma.post.findUnique({
			where: {
				id
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

// UPDATE
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	try {
		const { id } = await params;
		const json = await req.json();
		const body = PostSchema.partial().parse(json);

		const post = await prisma.post.update({
			where: {
				id
			},
			data: body
		});

		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: 'Error updating post' }, { status: 400 });
	}
}

// DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	try {
		const { id } = await params;

		await prisma.post.delete({
			where: {
				id
			}
		});

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
	}
}
