'use client';
import React from 'react';
import { useEffect } from 'react';

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
			<button
				onClick={() => reset()}
				className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
			>
				Try again
			</button>
		</div>
	);
}
