'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, content })
			});

			console.log('Response status:', response.status, response.statusText);

			const responseText = await response.text();
			console.log('Response text:', responseText);

			const data = responseText ? JSON.parse(responseText) : null;

			if (!response.ok) {
				throw new Error(data?.message || `Server error: ${response.status}`);
			}

			router.push('/posts');
			router.refresh();
		} catch (error) {
			console.error('Error details:', {
				name: error.name,
				message: error.message,
				stack: error.stack
			});
			setError(error instanceof Error ? error.message : 'Failed to create post. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/20 p-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
					Create New Post
				</h1>

				{error && (
					<div className="mb-4 p-4 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 
								bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
								focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
								dark:focus:ring-blue-400 dark:focus:border-blue-400
								transition-colors duration-200 ease-in-out
								dark:placeholder-gray-400"
							placeholder="Enter your post title"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="content"
							className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
						>
							Content
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={8}
							className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 
								bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
								focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
								dark:focus:ring-blue-400 dark:focus:border-blue-400
								transition-colors duration-200 ease-in-out
								dark:placeholder-gray-400"
							placeholder="Write your post content here..."
							required
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 
							text-white px-6 py-3 rounded-lg font-medium 
							hover:from-blue-600 hover:to-blue-700 
							dark:hover:from-blue-500 dark:hover:to-blue-600 
							focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
							dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800
							disabled:opacity-50 disabled:cursor-not-allowed 
							transition-all duration-200 ease-in-out 
							shadow-md hover:shadow-lg dark:shadow-gray-700/20"
					>
						{isLoading ? (
							<span className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Creating...
							</span>
						) : (
							'Create Post'
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
