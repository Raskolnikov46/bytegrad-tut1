'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Unwrap params using React.use()
	const { id } = use(params);

	useEffect(() => {
		// Use unwrapped id
		fetch(`/api/posts/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setTitle(data.title);
				setContent(data.content);
				setLoading(false);
			})
			.catch((err) => {
				setError('Failed to load post');
				setLoading(false);
			});
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch(`/api/posts/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, content })
			});

			if (!res.ok) throw new Error('Failed to update post');

			router.push(`/posts/${id}`);
			router.refresh();
		} catch (error) {
			setError('Failed to update post');
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div className="text-center mt-8">Loading...</div>;
	if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

	return (
		<div className="max-w-4xl mx-auto p-4">
			<div className="mb-8">
				<Link href={`/posts/${id}`} className="text-blue-500 hover:text-blue-600">
					← Back to post
				</Link>
			</div>
			<h1 className="text-3xl font-bold mb-8">Edit Post</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="title" className="block text-sm font-medium mb-2">
						Title
					</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-3 py-2 border rounded-md"
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
						rows={8}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
					>
						{loading ? 'Saving...' : 'Save Changes'}
					</button>
				</div>
			</form>
		</div>
	);
}
