'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeletePostButton({ postId }: { postId: string }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleDelete = async () => {
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
			setShowModal(false);
		}
	};

	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
			>
				Delete
			</button>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm w-full mx-4">
						<h3 className="text-xl font-semibold mb-4 dark:text-white">Delete Post</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-6">
							Are you sure you want to delete this post? This action cannot be undone.
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setShowModal(false)}
								className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
								disabled={loading}
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								disabled={loading}
								className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
							>
								{loading ? 'Deleting...' : 'Delete'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
