import { useState } from 'react';
import { PostCreateInput } from '@/lib/validations/post';

export function usePosts() {
	const [isLoading, setIsLoading] = useState(false);

	async function createPost(data: PostCreateInput) {
		setIsLoading(true);
		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) throw new Error('Failed to create post');

			return await response.json();
		} finally {
			setIsLoading(false);
		}
	}

	async function getPosts() {
		setIsLoading(true);
		try {
			const response = await fetch('/api/posts');
			if (!response.ok) throw new Error('Failed to fetch posts');
			return await response.json();
		} finally {
			setIsLoading(false);
		}
	}

	return {
		isLoading,
		createPost,
		getPosts
	};
}
