import React from 'react';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h2 className="text-2xl font-bold mb-2">Not Found</h2>
			<p className="text-gray-600 dark:text-gray-400">Could not find requested resource</p>
		</div>
	);
}
