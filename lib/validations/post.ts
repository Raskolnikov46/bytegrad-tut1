import * as z from 'zod';

export const PostSchema = z.object({
	title: z.string().min(1, 'Title is required').max(256, 'Title is too long'),
	content: z.string().min(1, 'Content is required'),
	published: z.boolean().default(false),
	author: z.string().min(1, 'Author is required'),
	slug: z.string().min(1, 'Slug is required')
});

export type PostCreateInput = z.infer<typeof PostSchema>;
