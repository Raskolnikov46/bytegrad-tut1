'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeletePostButton({ postId }: { postId: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this post?')) {
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(`/api/posts/${postId}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to delete post');
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
		<button
			onClick={handleDelete}
			disabled={loading}
			className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
		>
			{loading ? 'Deleting...' : 'Delete'}
		</button>
	);
}
