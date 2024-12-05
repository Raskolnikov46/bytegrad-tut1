'use client';

import { useRouter } from 'next/navigation';

export default function EditPostButton({ postId }: { postId: string }) {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/posts/${postId}/edit`)}
			className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
		>
			Edit
		</button>
	);
}
