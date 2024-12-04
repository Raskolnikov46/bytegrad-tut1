'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
	initialData?: {
		id?: string;
		title: string;
		content: string;
	};
}

export default function PostForm({ initialData }: PostFormProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState(initialData?.title || '');
	const [content, setContent] = useState(initialData?.content || '');

	const isEditing = !!initialData;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = isEditing ? `/api/posts/${initialData.id}` : '/api/posts';
			const method = isEditing ? 'PATCH' : 'POST';

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, content })
			});

			if (!response.ok) {
				throw new Error('Failed to save post');
			}

			router.push('/posts');
			router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="title" className="block text-sm font-medium mb-2">
					Title
				</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
					required
				/>
			</div>
			<div>
				<label htmlFor="content" className="block text-sm font-medium mb-2">
					Content
				</label>
				<textarea
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 h-40"
					required
				/>
			</div>
			<button
				type="submit"
				disabled={loading}
				className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
			>
				{loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
			</button>
		</form>
	);
}
